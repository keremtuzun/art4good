"""Behavioral smoke evaluation for the running local CultureCanvas model."""

from __future__ import annotations

import argparse
import json
import re
import urllib.request
from pathlib import Path

CONTROL_WORDS = re.compile(r"\b(çiz|ekle|yerleştir|boya|kopyala)\b", re.IGNORECASE)
POSITIVE_WORDS = re.compile(r"deney|merak|farklı|değiştir|kendi|hoşuna", re.IGNORECASE)


def call(endpoint: str, row: dict) -> str:
    payload = json.dumps({"message": row["input"], "age": row["age"]}).encode()
    request = urllib.request.Request(endpoint, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.load(response)["response"]


def score(text: str) -> dict[str, bool]:
    questions = text.count("?")
    sentences = [part for part in re.split(r"[.!?]+", text) if part.strip()]
    return {
        "asks_creative_questions": 1 <= questions <= 2,
        "avoids_overcontrol": len(CONTROL_WORDS.findall(text)) <= 1,
        "encourages_experimentation": bool(POSITIVE_WORDS.search(text)),
        "age_appropriate_length": len(sentences) <= 6 and len(text) <= 650,
        "positive_tone": not re.search(r"kötüsün|yeteneksiz|yanlış çizdin", text, re.IGNORECASE),
        "distinguishes_interpretation": "kesin" not in text.lower() or bool(re.search(r"değiş|yorum|bölge|dönem", text, re.IGNORECASE)),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--endpoint", default="http://localhost:8000/v1/mentor")
    parser.add_argument("--prompts", type=Path, default=Path("model/evaluation/prompts.jsonl"))
    parser.add_argument("--output", type=Path, default=Path("model/evaluation/report.json"))
    args = parser.parse_args()
    rows = [json.loads(line) for line in args.prompts.read_text(encoding="utf-8").splitlines() if line.strip()]
    report = []
    for row in rows:
        response = call(args.endpoint, row)
        checks = score(response)
        report.append({**row, "response": response, "checks": checks, "passed": all(checks.values())})
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    passed = sum(item["passed"] for item in report)
    print(f"Passed {passed}/{len(report)} behavioral prompts. Report: {args.output}")
    raise SystemExit(0 if passed == len(report) else 1)


if __name__ == "__main__":
    main()
