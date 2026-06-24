#!/usr/bin/env python3
"""Total-comp comparator for the salary-negotiation skill.

Compares job offers on total annual compensation instead of base alone — base +
bonus + amortised equity + annualised signing bonus — so equity and bonuses can't
hide the real ranking. Standard library only, no network.

Input
-----
A JSON list of offers (file path or '-' for stdin). Per offer:
  name         : label (required)
  base         : annual base salary (required)
  bonus        : annual target bonus (default 0; absolute amount, not %)
  equity_total : total equity grant value (default 0)
  equity_years : vesting years for the grant (default 4)
  signing      : one-time signing bonus (default 0)

Options
-------
  --signing-years N   amortise the signing bonus over N years (default 1)
  --json              machine-readable output

Usage
-----
  python3 comp_compare.py offers.json
  python3 comp_compare.py offers.json --signing-years 2 --json
"""
import argparse
import json
import sys


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, list) or not data:
        raise ValueError("Expected a non-empty JSON list of offers.")
    return data


def annualise(offers, signing_years):
    rows = []
    for o in offers:
        base = float(o.get("base", 0) or 0)
        bonus = float(o.get("bonus", 0) or 0)
        eq_total = float(o.get("equity_total", 0) or 0)
        eq_years = float(o.get("equity_years", 4) or 4)
        signing = float(o.get("signing", 0) or 0)
        equity_yr = eq_total / eq_years if eq_years else 0.0
        signing_yr = signing / signing_years if signing_years else 0.0
        total = base + bonus + equity_yr + signing_yr
        rows.append({
            "name": o.get("name", "(unnamed)"), "base": base, "bonus": bonus,
            "equity_per_year": round(equity_yr), "signing_per_year": round(signing_yr),
            "total_annual": round(total),
        })
    rows.sort(key=lambda r: r["total_annual"], reverse=True)
    return rows


def main():
    ap = argparse.ArgumentParser(description="Compare job offers on total annual comp.")
    ap.add_argument("input", help="offers JSON file, or - for stdin")
    ap.add_argument("--signing-years", type=float, default=1, help="amortise signing bonus over N years (default 1)")
    ap.add_argument("--json", action="store_true", help="emit JSON")
    args = ap.parse_args()
    try:
        rows = annualise(load(args.input), args.signing_years)
    except Exception as e:  # noqa: BLE001
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps({"signing_years": args.signing_years, "offers": rows}, indent=2))
        return

    top = rows[0]["total_annual"]
    print(f"Total annual comp (signing amortised over {args.signing_years:g}y):\n")
    print(f"  {'Offer':<22}{'Base':>10}{'Bonus':>9}{'Equity/y':>10}{'Sign/y':>9}{'TOTAL':>11}   vs. top")
    for r in rows:
        gap = r["total_annual"] - top
        gaps = "—" if gap == 0 else f"{gap:+,}"
        print(f"  {r['name'][:22]:<22}{r['base']:>10,.0f}{r['bonus']:>9,.0f}{r['equity_per_year']:>10,}{r['signing_per_year']:>9,}{r['total_annual']:>11,}   {gaps}")
    print(f"\nHighest total comp: {rows[0]['name']} ({rows[0]['total_annual']:,}/yr).")
    if len(rows) > 1 and rows[0]["base"] < rows[1]["base"]:
        print("Note: the top total-comp offer does NOT have the highest base — equity/bonus flipped the ranking.")


if __name__ == "__main__":
    main()
