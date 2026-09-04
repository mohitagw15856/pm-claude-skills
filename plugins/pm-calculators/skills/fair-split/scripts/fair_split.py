#!/usr/bin/env python3
"""fair_split — divide indivisible things fairly using sealed bids (Knaster).

Each person privately values every item; each item goes to its highest
valuer, and cash transfers rebalance so that everyone ends up with MORE than
their fair share of their own total valuation — the classic Knaster
adjusted-winner procedure. Supports unequal entitlements (e.g. a 50/25/25
estate split). Deterministic: no randomness, ties broken by name order.

Examples:
    python3 fair_split.py --demo
    python3 fair_split.py --input split.json
    python3 fair_split.py --input split.json --json

Input JSON shape:
    {
      "people": [{"name": "Ana", "weight": 0.5}, {"name": "Ben"}, {"name": "Cy"}],
      "items":  [{"name": "House", "bids": {"Ana": 240000, "Ben": 210000, "Cy": 225000}},
                 {"name": "Boat",  "bids": {"Ana": 8000,  "Ben": 12000,  "Cy": 5000}}]
    }
Weights are optional (default equal) and are normalised to sum to 1.
Money is in whatever unit the bids use. No network, no files written.
"""

import argparse
import json
import sys


def normalise_people(people):
    """Return [(name, weight)] with weights normalised to sum to 1."""
    if not people:
        raise ValueError("at least one person is required")
    names = [p["name"] for p in people]
    if len(set(names)) != len(names):
        raise ValueError("duplicate person names")
    raw = [float(p.get("weight", 1.0)) for p in people]
    if any(w <= 0 for w in raw):
        raise ValueError("weights must be positive")
    total = sum(raw)
    return [(n, w / total) for n, w in zip(names, raw)]


def solve(people, items):
    """Run the Knaster procedure. Returns a dict with awards and transfers."""
    folks = normalise_people(people)
    names = [n for n, _ in folks]

    for item in items:
        missing = [n for n in names if n not in item.get("bids", {})]
        if missing:
            raise ValueError(f"item {item['name']!r} missing bids from: {', '.join(missing)}")
        for n, v in item["bids"].items():
            if n not in names:
                raise ValueError(f"item {item['name']!r} has a bid from unknown person {n!r}")
            if float(v) < 0:
                raise ValueError(f"negative bid on {item['name']!r}")

    # Each item to its highest valuer; ties go to the earliest name alphabetically
    # so the outcome is reproducible.
    awards = {n: [] for n in names}
    for item in sorted(items, key=lambda i: i["name"]):
        winner = max(sorted(item["bids"]), key=lambda n: float(item["bids"][n]))
        awards[winner].append(item["name"])

    totals = {n: sum(float(i["bids"][n]) for i in items) for n in names}
    fair = {n: w * totals[n] for n, w in folks}
    got = {n: sum(float(i["bids"][n]) for i in items if i["name"] in awards[n]) for n in names}
    surplus = sum(got[n] - fair[n] for n in names)  # >= 0 by highest-bidder assignment
    weight = dict(folks)

    rows = []
    for n in names:
        final_value = fair[n] + weight[n] * surplus
        cash = final_value - got[n]  # positive = receives, negative = pays
        rows.append({
            "person": n,
            "weight": round(weight[n], 6),
            "own_total_valuation": round(totals[n], 2),
            "fair_share": round(fair[n], 2),
            "items_won": awards[n],
            "items_value_to_them": round(got[n], 2),
            "cash": round(cash, 2),
            "final_value_to_them": round(final_value, 2),
            "above_fair_share": round(final_value - fair[n], 2),
        })
    assert abs(sum(r["cash"] for r in rows)) < 0.01, "transfers must sum to zero"
    return {"surplus": round(surplus, 2), "people": rows}


DEMO = {
    "people": [{"name": "Ana", "weight": 0.5}, {"name": "Ben", "weight": 0.25}, {"name": "Cy", "weight": 0.25}],
    "items": [
        {"name": "House", "bids": {"Ana": 240000, "Ben": 210000, "Cy": 225000}},
        {"name": "Boat", "bids": {"Ana": 8000, "Ben": 12000, "Cy": 5000}},
        {"name": "Piano", "bids": {"Ana": 1500, "Ben": 500, "Cy": 4000}},
    ],
}


def main():
    ap = argparse.ArgumentParser(
        description="Fair division of indivisible items via Knaster sealed bids, "
                    "with optional unequal entitlements.")
    ap.add_argument("--input", help="JSON file with people and items (see module docstring); - for stdin")
    ap.add_argument("--demo", action="store_true", help="run the built-in three-way estate example")
    ap.add_argument("--json", action="store_true", help="emit machine-readable JSON instead of the table")
    args = ap.parse_args()

    if args.demo:
        data = DEMO
    elif args.input:
        raw = sys.stdin.read() if args.input == "-" else open(args.input, encoding="utf-8").read()
        data = json.loads(raw)
    else:
        ap.error("provide --input FILE or --demo")

    try:
        result = solve(data["people"], data["items"])
    except (KeyError, ValueError, TypeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"{'Person':10} {'Share':>6} {'Items won':28} {'Cash':>12} {'Ends with':>12} {'Over fair':>10}")
    for r in result["people"]:
        items = ", ".join(r["items_won"]) or "—"
        print(f"{r['person']:10} {r['weight']*100:5.1f}% {items[:28]:28} "
              f"{r['cash']:12,.2f} {r['final_value_to_them']:12,.2f} {r['above_fair_share']:10,.2f}")
    print(f"\nSurplus shared: {result['surplus']:,.2f}  (positive cash = receives; everyone ends above their fair share)")


if __name__ == "__main__":
    main()
