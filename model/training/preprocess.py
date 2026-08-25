"""Validate CultureCanvas JSONL and create deterministic train/eval splits."""

from __future__ import annotations

import argparse
import json
import random
from pathlib import Path

REQUIRED = {"id", "category", "instruction", "input", "output", "status"}


def read_records(path: Path) -> list[dict]:
    records: list[dict] = []
    seen: set[str] = set()
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        record = json.loads(line)
        missing = REQUIRED - record.keys()
        if missing:
            raise ValueError(f"line {number}: missing {sorted(missing)}")
        if record["id"] in seen:
            raise ValueError(f"line {number}: duplicate id {record['id']}")
        seen.add(record["id"])
        if record["status"] == "approved":
            records.append(record)
    if len(records) < 2:
        raise ValueError("At least two approved records are required")
    return records


def write_jsonl(path: Path, records: list[dict]) -> None:
    path.write_text("\n".join(json.dumps(row, ensure_ascii=False) for row in records) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--eval-ratio", type=float, default=0.15)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()
    records = read_records(args.input)
    random.Random(args.seed).shuffle(records)
    eval_size = max(1, round(len(records) * args.eval_ratio))
    args.output.mkdir(parents=True, exist_ok=True)
    write_jsonl(args.output / "eval.jsonl", records[:eval_size])
    write_jsonl(args.output / "train.jsonl", records[eval_size:])
    print(f"Wrote {len(records) - eval_size} train and {eval_size} eval records")


if __name__ == "__main__":
    main()
