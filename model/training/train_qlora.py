"""Train a configurable CultureCanvas QLoRA adapter."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import torch
import yaml
from datasets import Dataset
from peft import LoraConfig
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from trl import SFTConfig, SFTTrainer

SYSTEM = Path("model/SYSTEM_BEHAVIOR.md").read_text(encoding="utf-8")


def load_jsonl(path: str) -> Dataset:
    rows = [json.loads(line) for line in Path(path).read_text(encoding="utf-8").splitlines() if line.strip()]
    return Dataset.from_list(rows)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, required=True)
    args = parser.parse_args()
    config = yaml.safe_load(args.config.read_text(encoding="utf-8"))
    model_cfg, adapter_cfg, train_cfg = config["model"], config["adapter"], config["training"]
    dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16
    quant = BitsAndBytesConfig(load_in_4bit=model_cfg["load_in_4bit"], bnb_4bit_quant_type=model_cfg["bnb_4bit_quant_type"], bnb_4bit_compute_dtype=dtype, bnb_4bit_use_double_quant=model_cfg["use_double_quant"])
    tokenizer = AutoTokenizer.from_pretrained(model_cfg["base_model_id"], trust_remote_code=model_cfg["trust_remote_code"])
    tokenizer.pad_token = tokenizer.pad_token or tokenizer.eos_token
    model = AutoModelForCausalLM.from_pretrained(model_cfg["base_model_id"], quantization_config=quant, device_map="auto", trust_remote_code=model_cfg["trust_remote_code"])
    peft_config = LoraConfig(r=adapter_cfg["rank"], lora_alpha=adapter_cfg["alpha"], lora_dropout=adapter_cfg["dropout"], target_modules=adapter_cfg["target_modules"], task_type="CAUSAL_LM")

    def format_record(row: dict) -> str:
        user = f"Yaş: {row.get('age', 'belirtilmedi')}\nGörev: {row['instruction']}\nÇocuk: {row['input']}"
        messages = [{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}, {"role": "assistant", "content": row["output"]}]
        return tokenizer.apply_chat_template(messages, tokenize=False)

    training_args = SFTConfig(output_dir=train_cfg["output_dir"], num_train_epochs=train_cfg["epochs"], learning_rate=train_cfg["learning_rate"], per_device_train_batch_size=train_cfg["batch_size"], gradient_accumulation_steps=train_cfg["gradient_accumulation_steps"], warmup_ratio=train_cfg["warmup_ratio"], logging_steps=train_cfg["logging_steps"], save_steps=train_cfg["save_steps"], eval_steps=train_cfg["eval_steps"], eval_strategy="steps", bf16=dtype == torch.bfloat16, fp16=dtype == torch.float16, max_length=model_cfg["max_seq_length"], seed=train_cfg["seed"], report_to="none")
    trainer = SFTTrainer(model=model, args=training_args, train_dataset=load_jsonl(train_cfg["train_file"]), eval_dataset=load_jsonl(train_cfg["eval_file"]), peft_config=peft_config, formatting_func=format_record)
    trainer.train()
    trainer.save_model(train_cfg["output_dir"])
    tokenizer.save_pretrained(train_cfg["output_dir"])


if __name__ == "__main__":
    main()
