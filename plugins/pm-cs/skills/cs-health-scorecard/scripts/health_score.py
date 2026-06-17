#!/usr/bin/env python3
"""Customer health score calculator for the cs-health-scorecard skill.

Takes per-dimension scores (1-5), applies the standard weights, and returns a
weighted total out of 100 plus a RAG status — so the headline number in a health
scorecard is computed the same way every time. Pure Python standard library —
no dependencies, no network access.

Standard dimensions and weights (override with --weights or in the JSON):

    Product Adoption  30%
    Engagement        20%
    Outcomes          20%
    Support Health    15%
    Commercial        15%

Usage
-----
Quick scoring from flags (order: adoption engagement outcomes support commercial):

    python3 health_score.py --scores 4 3 4 2 5

From a JSON file that can also override weights:

    python3 health_score.py --input account.json

account.json:

    {
      "account": "Acme Corp",
      "scores": {"Product Adoption": 4, "Engagement": 3, "Outcomes": 4,
                 "Support Health": 2, "Commercial": 5},
      "weights": {"Product Adoption": 0.30, "Engagement": 0.20, "Outcomes": 0.20,
                  "Support Health": 0.15, "Commercial": 0.15}
    }
"""
from __future__ import annotations

import argparse
import json
import sys

DEFAULT_WEIGHTS = {
    "Product Adoption": 0.30,
    "Engagement": 0.20,
    "Outcomes": 0.20,
    "Support Health": 0.15,
    "Commercial": 0.15,
}
MAX_DIMENSION_SCORE = 5


def rag(total: float) -> str:
    if total >= 80:
        return "Green"
    if total >= 60:
        return "Amber"
    return "Red"


def compute(scores: dict[str, float], weights: dict[str, float] | None = None) -> dict:
    weights = weights or DEFAULT_WEIGHTS
    weight_sum = sum(weights.values())
    if abs(weight_sum - 1.0) > 0.001:
        raise ValueError(f"Weights must sum to 1.0 (got {weight_sum:.3f}).")

    breakdown = []
    total = 0.0
    for dimension, weight in weights.items():
        if dimension not in scores:
            raise ValueError(f"Missing score for dimension '{dimension}'.")
        raw = float(scores[dimension])
        if not 1 <= raw <= MAX_DIMENSION_SCORE:
            raise ValueError(f"Score for '{dimension}' must be between 1 and {MAX_DIMENSION_SCORE} (got {raw}).")
        # Normalise the 1-5 score to a 0-100 contribution weighted by importance.
        weighted = (raw / MAX_DIMENSION_SCORE) * weight * 100
        total += weighted
        breakdown.append({
            "dimension": dimension,
            "score": raw,
            "weight": weight,
            "weighted_points": round(weighted, 1),
        })

    total = round(total, 1)
    return {"total": total, "rag": rag(total), "breakdown": breakdown}


def _render(result: dict, account: str | None) -> str:
    title = f"Customer Health Scorecard: {account}" if account else "Customer Health Scorecard"
    lines = [title, "=" * len(title)]
    lines.append(f"{'Dimension':<18} {'Score':>5} {'Weight':>7} {'Weighted':>9}")
    lines.append("-" * 41)
    for row in result["breakdown"]:
        lines.append(
            f"{row['dimension']:<18} {row['score']:>5g} {row['weight']*100:>6.0f}% {row['weighted_points']:>9g}"
        )
    lines.append("-" * 41)
    badge = {"Green": "🟢", "Amber": "🟡", "Red": "🔴"}[result["rag"]]
    lines.append(f"{'TOTAL':<18} {'':>5} {'100%':>7} {result['total']:>9g}/100")
    lines.append("")
    lines.append(f"Overall health: {badge} {result['rag']} — {result['total']}/100")
    guidance = {
        "Green": "Healthy — renew likely. Look for expansion signals.",
        "Amber": "At risk — needs attention. Build a save/grow plan before renewal.",
        "Red": "High churn risk — escalate now and assign an executive sponsor.",
    }[result["rag"]]
    lines.append(guidance)
    return "\n".join(lines)


def _load_inputs(args: argparse.Namespace) -> tuple[dict, dict | None, str | None]:
    if args.input:
        raw = sys.stdin.read() if args.input == "-" else open(args.input).read()
        data = json.loads(raw)
        return data["scores"], data.get("weights"), data.get("account")

    if args.scores:
        dims = list(DEFAULT_WEIGHTS.keys())
        if len(args.scores) != len(dims):
            raise ValueError(f"--scores needs {len(dims)} values in order: {', '.join(dims)}")
        return dict(zip(dims, args.scores)), None, args.account

    raise ValueError("Provide --input or --scores.")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--input", help="Path to a JSON file (or '-' for stdin).")
    parser.add_argument("--scores", nargs="+", type=float,
                        help="Five scores 1-5 in order: adoption engagement outcomes support commercial.")
    parser.add_argument("--account", help="Account name for the report header.")
    parser.add_argument("--json", action="store_true", dest="as_json", help="Emit JSON instead of a report.")
    args = parser.parse_args(argv)

    try:
        scores, weights, account = _load_inputs(args)
        result = compute(scores, weights)
    except (ValueError, KeyError, json.JSONDecodeError, OSError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    if args.as_json:
        result["account"] = account
        print(json.dumps(result, indent=2))
    else:
        print(_render(result, account))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
