#!/usr/bin/env python3
"""RICE score calculator for the rice-prioritisation skill.

Computes RICE = (Reach × Impact × Confidence) / Effort for a list of
initiatives, ranks them, and flags quick wins and moonshots so the ranking in a
prioritisation doc is calculated consistently rather than eyeballed. Pure Python
standard library — no dependencies, no network access.

Input
-----
A JSON or CSV list of initiatives. Each needs: name, reach, impact, confidence,
effort.

- impact uses the standard RICE scale (3, 2, 1, 0.5, 0.25) but any number works.
- confidence is a fraction (0.8) or a percentage (80) — both are accepted.
- effort is in person-months and must be > 0.

JSON example (rice.json):

    [
      {"name": "Onboarding redesign", "reach": 5000, "impact": 2, "confidence": 0.8, "effort": 3},
      {"name": "Dark mode",           "reach": 8000, "impact": 0.5, "confidence": 1.0, "effort": 1}
    ]

CSV example (header row required):

    name,reach,impact,confidence,effort
    Onboarding redesign,5000,2,0.8,3
    Dark mode,8000,0.5,1.0,1

Usage
-----
    python3 rice_calculator.py rice.json
    python3 rice_calculator.py rice.csv --format csv
    cat rice.json | python3 rice_calculator.py - --json
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import sys
from dataclasses import dataclass


@dataclass
class Initiative:
    name: str
    reach: float
    impact: float
    confidence: float
    effort: float

    @property
    def score(self) -> float:
        if self.effort <= 0:
            raise ValueError(f"Effort for '{self.name}' must be greater than 0.")
        return (self.reach * self.impact * self.confidence) / self.effort


def _normalise_confidence(value: float) -> float:
    """Accept 80 or 0.8; return a fraction between 0 and 1."""
    return value / 100.0 if value > 1 else value


def _to_initiative(row: dict) -> Initiative:
    try:
        return Initiative(
            name=str(row["name"]).strip(),
            reach=float(row["reach"]),
            impact=float(row["impact"]),
            confidence=_normalise_confidence(float(row["confidence"])),
            effort=float(row["effort"]),
        )
    except KeyError as exc:
        raise ValueError(f"Missing required field {exc} in row: {row}") from None


def load(text: str, fmt: str) -> list[Initiative]:
    if fmt == "csv":
        rows = list(csv.DictReader(io.StringIO(text)))
    else:
        rows = json.loads(text)
    if not isinstance(rows, list):
        raise ValueError("Input must be a list of initiatives.")
    return [_to_initiative(r) for r in rows]


def rank(initiatives: list[Initiative]) -> list[dict]:
    scored = []
    for i in initiatives:
        scored.append({
            "name": i.name,
            "reach": i.reach,
            "impact": i.impact,
            "confidence": round(i.confidence, 2),
            "effort": i.effort,
            "rice_score": round(i.score, 1),
        })
    scored.sort(key=lambda d: d["rice_score"], reverse=True)

    if scored:
        max_score = max(d["rice_score"] for d in scored) or 1
        max_effort = max(d["effort"] for d in scored) or 1
        for rank_index, d in enumerate(scored, start=1):
            d["rank"] = rank_index
            flags = []
            # Quick win: strong score relative to the field, low relative effort.
            if d["rice_score"] >= 0.5 * max_score and d["effort"] <= 0.33 * max_effort:
                flags.append("quick-win")
            # Moonshot: high raw impact, high relative effort.
            if d["impact"] >= 2 and d["effort"] >= 0.66 * max_effort:
                flags.append("moonshot")
            # Low-confidence estimates should be revisited before acting.
            if d["confidence"] <= 0.5:
                flags.append("low-confidence")
            d["flags"] = flags
    return scored


def _render(scored: list[dict]) -> str:
    header = f"{'#':>2}  {'Initiative':<32} {'Reach':>8} {'Imp':>4} {'Conf':>5} {'Eff':>5} {'RICE':>8}  Flags"
    lines = ["RICE Prioritisation", "=" * len(header), header, "-" * len(header)]
    for d in scored:
        lines.append(
            f"{d['rank']:>2}  {d['name'][:32]:<32} {d['reach']:>8g} {d['impact']:>4g} "
            f"{d['confidence']:>5.2f} {d['effort']:>5g} {d['rice_score']:>8g}  {', '.join(d['flags'])}"
        )
    quick = [d["name"] for d in scored if "quick-win" in d["flags"]]
    moon = [d["name"] for d in scored if "moonshot" in d["flags"]]
    lowc = [d["name"] for d in scored if "low-confidence" in d["flags"]]
    lines.append("")
    lines.append(f"Quick wins (do alongside bigger bets): {', '.join(quick) or 'none'}")
    lines.append(f"Moonshots (high impact, high effort):  {', '.join(moon) or 'none'}")
    lines.append(f"Low confidence — revisit estimates:    {', '.join(lowc) or 'none'}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input", help="Path to a JSON/CSV file of initiatives, or '-' for stdin.")
    parser.add_argument("--format", choices=["json", "csv"], help="Input format (inferred from extension if omitted).")
    parser.add_argument("--json", action="store_true", dest="as_json", help="Emit ranked JSON instead of a table.")
    args = parser.parse_args(argv)

    text = sys.stdin.read() if args.input == "-" else None
    fmt = args.format
    if text is None:
        try:
            text = open(args.input).read()
        except OSError as exc:
            print(f"Error: {exc}", file=sys.stderr)
            return 1
        if fmt is None:
            fmt = "csv" if args.input.lower().endswith(".csv") else "json"
    fmt = fmt or "json"

    try:
        scored = rank(load(text, fmt))
    except (ValueError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(scored, indent=2) if args.as_json else _render(scored))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
