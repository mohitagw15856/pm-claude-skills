#!/usr/bin/env python3
"""Wedding budget calculator for the wedding-budget skill.

Allocates a total budget across categories using typical shares, computes the
per-guest cost lever, and surfaces the routinely-forgotten line items that
wreck budgets in month eleven. Deterministic, stdlib only.

Usage
-----
    python3 wedding_budget.py --budget 30000 --guests 110
    python3 wedding_budget.py --budget 30000 --guests 110 --venue-food-pct 45 --json
"""
from __future__ import annotations
import argparse, json, sys

CATEGORIES = [  # (name, default pct of budget)
    ("venue_and_catering", 42.0),
    ("photography_video", 12.0),
    ("attire_and_beauty", 8.0),
    ("music_entertainment", 7.0),
    ("flowers_decor", 7.0),
    ("rings", 5.0),
    ("stationery_postage", 3.0),
    ("transport", 3.0),
    ("officiant_ceremony", 2.0),
    ("favors_gifts", 2.0),
    ("contingency", 9.0),
]

FORGOTTEN = [
    "vendor meals (count your vendors as guests for catering)",
    "alterations (often rivals the garment)",
    "overtime fees (venue/photo/band per-hour past contract)",
    "service charges + gratuities (often 20%+ on catering, quoted separately)",
    "marriage license and officiant travel",
    "postage (heavy invitations cost extra per piece)",
    "day-of transport for the wedding party",
    "hair/makeup trials (charged separately from day-of)",
]

def main(argv=None):
    ap = argparse.ArgumentParser(description="Wedding budget allocation with the per-guest lever and forgotten items.")
    ap.add_argument("--budget", type=float, required=True, help="All-in total budget")
    ap.add_argument("--guests", type=int, required=True, help="Guest count (the biggest lever)")
    for name, pct in CATEGORIES:
        ap.add_argument(f"--{name.replace('_','-')}-pct", type=float, default=pct,
                        help=f"Pct of budget (default {pct:g})")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)

    shares = [(name, getattr(a, f"{name}_pct")) for name, _ in CATEGORIES]
    total_pct = sum(p for _, p in shares)
    rows = [{"category": n, "pct": p, "amount": round(a.budget * p / total_pct)} for n, p in shares]
    vf = next(r["amount"] for r in rows if r["category"] == "venue_and_catering")
    per_guest = vf / a.guests if a.guests else 0
    cut10 = round(10 * per_guest)
    out = {"budget": a.budget, "guests": a.guests,
           "allocation": rows, "total_pct": round(total_pct, 1),
           "venue_catering_per_guest": round(per_guest, 2),
           "cutting_10_guests_saves_about": cut10,
           "forgotten_items": FORGOTTEN,
           "note": "shares are planning defaults, not rules — override any --*-pct to match real quotes"}
    if a.json:
        print(json.dumps(out, indent=1)); return 0
    print(f"budget {a.budget:,.0f} · {a.guests} guests")
    print(f"{'category':<24}{'pct':>6}{'amount':>12}")
    for r in rows:
        print(f"{r['category']:<24}{r['pct']:>5.1f}%{r['amount']:>12,}")
    print(f"venue+catering per guest: {per_guest:,.2f} — cutting 10 guests frees ~{cut10:,}")
    print("routinely forgotten: " + "; ".join(FORGOTTEN[:4]) + "; ...")
    print("shares are planning defaults — override with --<category>-pct to match real quotes. Educational model, not financial advice.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
