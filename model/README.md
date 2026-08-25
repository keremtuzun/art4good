# CultureCanvas open-weight model service

This directory is independent from the Next.js interface. It contains the first
production-shaped pipeline for turning a configurable open-weight instruction
model into the Art4Good CultureCanvas mentor with LoRA/QLoRA.

No OpenAI, Gemini, Claude, or other commercial chatbot API is used. The public
site currently calls a deliberately labeled deterministic local mock route. Set
up and train an adapter before switching the UI to this FastAPI service.

## Layout

- `configs/train.yaml`: configurable base model and adapter settings
- `dataset/examples.jsonl`: seed instruction/input/output records
- `training/preprocess.py`: schema validation and deterministic train/eval split
- `training/train_qlora.py`: 4-bit QLoRA fine-tuning with Transformers, PEFT, TRL
- `inference/server.py`: adapter loading and local FastAPI inference
- `evaluation/prompts.jsonl`: behavioral regression prompts
- `evaluation/evaluate.py`: automated rubric checks and report output
- `SYSTEM_BEHAVIOR.md`: authoritative mentor behavior specification

## Local workflow

```bash
python -m venv .venv
.venv/Scripts/activate
pip install -r model/requirements.txt
python model/training/preprocess.py --input model/dataset/examples.jsonl --output model/dataset/processed
python model/training/train_qlora.py --config model/configs/train.yaml
python model/evaluation/evaluate.py --endpoint http://localhost:8000/v1/mentor
uvicorn model.inference.server:app --host 0.0.0.0 --port 8000
```

The default model ID in `train.yaml` is only a replaceable starting point. Use a
Turkish-capable, commercially compatible open-weight model after licensing,
hardware, cultural-source, and child-safety review. The training script never
downloads or selects a hosted chatbot API.
