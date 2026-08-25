"""Local FastAPI inference service for a trained CultureCanvas adapter."""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

import torch
from fastapi import FastAPI, HTTPException
from peft import PeftModel
from pydantic import BaseModel, Field
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

SYSTEM = Path("model/SYSTEM_BEHAVIOR.md").read_text(encoding="utf-8")
BASE_MODEL_ID = os.environ.get("CULTURECANVAS_BASE_MODEL", "Qwen/Qwen2.5-3B-Instruct")
ADAPTER_PATH = os.environ.get("CULTURECANVAS_ADAPTER_PATH", "model/artifacts/culturecanvas-lora")


class MentorRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    age: int = Field(default=10, ge=7, le=14)
    topic: str | None = Field(default=None, max_length=80)


class MentorResponse(BaseModel):
    response: str
    model: str
    adapter: str


@lru_cache(maxsize=1)
def load_model():
    if not Path(ADAPTER_PATH).exists():
        raise RuntimeError(f"Adapter not found at {ADAPTER_PATH}. Train it first or keep the web mock enabled.")
    dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float16
    quant = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4", bnb_4bit_compute_dtype=dtype, bnb_4bit_use_double_quant=True)
    tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL_ID)
    base = AutoModelForCausalLM.from_pretrained(BASE_MODEL_ID, device_map="auto", quantization_config=quant)
    return tokenizer, PeftModel.from_pretrained(base, ADAPTER_PATH)


app = FastAPI(title="Art4Good CultureCanvas Model Service", version="1.0.0")


@app.get("/health")
def health():
    return {"status": "ok", "base_model": BASE_MODEL_ID, "adapter_ready": Path(ADAPTER_PATH).exists()}


@app.post("/v1/mentor", response_model=MentorResponse)
def mentor(request: MentorRequest):
    try:
        tokenizer, model = load_model()
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
    user = f"Yaş: {request.age}\nKonu: {request.topic or 'serbest keşif'}\nÇocuk: {request.message}"
    prompt = tokenizer.apply_chat_template([{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}], tokenize=False, add_generation_prompt=True)
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    with torch.inference_mode():
        output = model.generate(**inputs, max_new_tokens=220, temperature=0.65, top_p=0.9, do_sample=True, repetition_penalty=1.08)
    reply = tokenizer.decode(output[0][inputs.input_ids.shape[1]:], skip_special_tokens=True).strip()
    return MentorResponse(response=reply, model=BASE_MODEL_ID, adapter=ADAPTER_PATH)
