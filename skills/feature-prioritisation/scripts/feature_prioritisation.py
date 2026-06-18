#!/usr/bin/env python3
"""Feature prioritisation helper for the feature-prioritisation skill.

Computes ranking for common scoring frameworks so the same formulas and ordering
are applied consistently. Supports RICE and ICE with JSON input.

Input formats:
- JSON list (default): each item includes `name` and framework-specific fields.
- CSV: header-driven input when using --format csv.

RICE fields:
    name,reach,impact,confidence,effort

ICE fields:
    name,impact,confidence,ease

Examples:
    python3 feature_prioritisation.py --framework rice initiatives.json
    python3 feature_prioritisation.py initiatives.csv --framework rice --format csv
    printf '%s\n' '[{"name":"API refactor","impact":8,"confidence":80,"ease":5}]' \
      | python3 feature_prioritisation.py --framework ice -
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import sys
from dataclasses import dataclass


@dataclass
class Feature:
    name: str
    scores: dict[str, float]

    def rice_score(self) -> float:
        return (self.scores["reach"] * self.scores["impact"] * self.scores["confidence"]) / self.scores["effort"]

    def ice_score(self) -> float:
        return self.scores["impact"] + self.scores["confidence"] + self.scores["ease"]


def _normalise_confidence(value: float, framework: str) -> float:
    """Normalize confidence depending on framework conventions."""
    if framework == "rice":
        return value / 100.0 if value > 1 else value
    # ICE uses a 1-10 convention in this skill; accept 0-1 and 1-10, 80/100 as percent fallback.
    if value > 1:
        if value > 10:
            return value / 10.0
        return value
    return value


def _to_feature(name: str, values: dict[str, object], framework: str) -> Feature:
    try:
        if framework == "rice":
            reach = float(values["reach"])
            effort = float(values["effort"])
            if effort <= 0:
                raise ValueError("effort must be greater than 0")
            return Feature(
                name=name,
                scores={
                    "reach": reach,
                    "impact": float(values["impact"]),
                    "confidence": _normalise_confidence(float(values["confidence"]), "rice"),
                    "effort": effort,
                },
            )

        # ICE
        return Feature(
            name=name,
            scores={
                "impact": float(values["impact"]),
                "confidence": _normalise_confidence(float(values["confidence"]), "ice"),
                "ease": float(values["ease"]),
            },
        )
    except KeyError as exc:
        raise ValueError(f"Missing required field {exc} in feature '{name}'.") from None


def load_rice_json(rows: list[dict[str, object]]) -> list[Feature]:
    return [_to_feature(str(row["name"]).strip(), row, "rice") for row in rows]


def load_ice_json(rows: list[dict[str, object]]) -> list[Feature]:
    return [_to_feature(str(row["name"]).strip(), row, "ice") for row in rows]


def _load_csv(text: str, framework: str) -> list[dict[str, str]]:
    rows = list(csv.DictReader(io.StringIO(text)))
    if not rows:
        return []
    expected = {"rice": {"name", "reach", "impact", "confidence", "effort"},
                "ice": {"name", "impact", "confidence", "ease"}}
    present = set(rows[0].keys())
    missing = expected[framework] - present
    if missing:
        raise ValueError(f"CSV format missing required columns: {', '.join(sorted(missing))}")
    return rows


def load(text: str, fmt: str, framework: str) -> list[Feature]:
    if fmt == "csv":
        rows = _load_csv(text, framework)
        if framework == "rice":
            return load_rice_json(rows)
        return load_ice_json(rows)

    rows = json.loads(text)
    if not isinstance(rows, list):
        raise ValueError("Input must be a list of feature objects.")
    if framework == "rice":
        return load_rice_json(rows)
    return load_ice_json(rows)


def rank(features: list[Feature], framework: str) -> list[dict]:
    scored = []
    for feature in features:
        score = feature.rice_score() if framework == "rice" else feature.ice_score()
        row = {"name": feature.name, "score": round(float(score), 2)}
        row.update({k: v for k, v in feature.scores.items() if k != "score"})
        scored.append(row)

    scored.sort(key=lambda d: d["score"], reverse=True)
    for index, row in enumerate(scored, start=1):
        row["rank"] = index
    return scored


def _render(ranked: list[dict], framework: str) -> str:
    if framework == "rice":
        header = f"{'#':>2}  {'Feature':<30} {'Reach':>10} {'Impact':>7} {'Conf':>7} {'Effort':>7} {'RICE':>8}"
        lines = ["Feature Prioritisation (RICE)", "=" * len(header), header, "-" * len(header)]
        for row in ranked:
            lines.append(
                f"{row['rank']:>2}  {row['name'][:30]:<30} "
                f"{row['reach']:>10g} {row['impact']:>7g} {row['confidence']:>6.2f} {row['effort']:>7g} {row['score']:>8g}"
            )
        return "\n".join(lines)

    header = f"{'#':>2}  {'Feature':<30} {'Impact':>7} {'Conf':>7} {'Ease':>7} {'ICE':>8}"
    lines = ["Feature Prioritisation (ICE)", "=" * len(header), header, "-" * len(header)]
    for row in ranked:
        lines.append(
            f"{row['rank']:>2}  {row['name'][:30]:<30} "
            f"{row['impact']:>7g} {row['confidence']:>6.2f} {row['ease']:>7g} {row['score']:>8g}"
        )
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input", help="Path to input JSON/CSV file, or '-' for stdin.")
    parser.add_argument("--framework", choices=["rice", "ice"], default="rice",
                        help="Scoring framework to use.")
    parser.add_argument("--format", choices=["json", "csv"], help="Input format (inferred from extension when omitted).")
    parser.add_argument("--json", action="store_true", dest="as_json", help="Emit ranked JSON instead of a table.")
    args = parser.parse_args(argv)

    if args.input == "-":
        text = sys.stdin.read()
        fmt = args.format or "json"
    else:
        try:
            with open(args.input, "r", encoding="utf-8") as f:
                text = f.read()
        except OSError as exc:
            print(f"Error: {exc}", file=sys.stderr)
            return 1
        if args.format:
            fmt = args.format
        else:
            fmt = "csv" if args.input.lower().endswith(".csv") else "json"

    try:
        ranked = rank(load(text, fmt, args.framework), args.framework)
    except (ValueError, json.JSONDecodeError, KeyError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(ranked, indent=2) if args.as_json else _render(ranked, args.framework))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
