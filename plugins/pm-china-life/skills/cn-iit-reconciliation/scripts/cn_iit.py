#!/usr/bin/env python3
"""China individual income tax annual reconciliation estimate (个税年度汇算).

Computes tax on annual comprehensive income (综合所得) and compares it with
the tax already withheld, to estimate a refund or an amount to pay. Optionally
compares the two treatments of an annual one-off bonus (全年一次性奖金):
taxed separately or merged into comprehensive income.

Rates and the basic deduction are the national figures in force since 2019.
The separate bonus treatment was extended to 31 December 2027 (Ministry of
Finance and State Taxation Administration Announcement 2023 No. 30). Check the
current rules before relying on any figure. Special additional deductions
(专项附加扣除) are entered as annual totals, because eligibility depends on
facts the script cannot check.

It is an estimate, not tax advice. The official calculation is the one in the
个人所得税 app. Standard library only, no network access.

Usage
-----
    python3 cn_iit.py --wages 360000 --social-insurance 40000 --special 36000 --withheld 30000
    python3 cn_iit.py --wages 300000 --bonus 60000 --social-insurance 35000 --withheld 20000 --json
    python3 cn_iit.py --wages 200000 --labour 50000 --withheld 12000
    python3 cn_iit.py --selftest
"""
from __future__ import annotations

import argparse
import json
import sys

BASIC_DEDUCTION = 60000  # 5,000 a month
# Annual comprehensive income table: (upper bound of taxable income, rate, quick deduction)
ANNUAL = [
    (36000, 0.03, 0),
    (144000, 0.10, 2520),
    (300000, 0.20, 16920),
    (420000, 0.25, 31920),
    (660000, 0.30, 52920),
    (960000, 0.35, 85920),
    (float("inf"), 0.45, 181920),
]
# Monthly table, used for the separately taxed bonus on bonus / 12
MONTHLY = [
    (3000, 0.03, 0),
    (12000, 0.10, 210),
    (25000, 0.20, 1410),
    (35000, 0.25, 2660),
    (55000, 0.30, 4410),
    (80000, 0.35, 7160),
    (float("inf"), 0.45, 15160),
]


def tax_from_table(taxable: float, table) -> tuple[float, float]:
    if taxable <= 0:
        return 0.0, 0.0
    for upper, rate, quick in table:
        if taxable <= upper:
            return round(taxable * rate - quick, 2), rate
    raise AssertionError("unreachable")


def amount(value, name: str) -> float:
    if value is None:
        return 0.0
    try:
        v = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a number")
    if v != v or v in (float("inf"), float("-inf")):
        raise ValueError(f"{name} must be a finite number")
    if v < 0:
        raise ValueError(f"{name} cannot be negative")
    return v


def calculate(wages=0, labour=0, author=0, royalty=0, bonus=0, social_insurance=0, special=0, other=0, withheld=0) -> dict:
    w = amount(wages, "wages")
    lab = amount(labour, "labour")
    auth = amount(author, "author")
    roy = amount(royalty, "royalty")
    b = amount(bonus, "bonus")
    si = amount(social_insurance, "social_insurance")
    sp = amount(special, "special")
    ot = amount(other, "other")
    paid = amount(withheld, "withheld")

    # Income counted in comprehensive income: labour and royalties at 80%,
    # author's remuneration at 80% then 70%.
    counted = w + lab * 0.8 + auth * 0.8 * 0.7 + roy * 0.8
    deductions = BASIC_DEDUCTION + si + sp + ot

    def merged():
        taxable = max(counted + b - deductions, 0)
        tax, rate = tax_from_table(taxable, ANNUAL)
        return {"taxable": round(taxable, 2), "rate": rate, "tax": tax, "bonus_tax": 0.0, "total_tax": tax}

    def separate():
        taxable = max(counted - deductions, 0)
        tax, rate = tax_from_table(taxable, ANNUAL)
        bonus_tax = 0.0
        if b > 0:
            _, brate = tax_from_table(b / 12, MONTHLY)
            quick = next(q for upper, r, q in MONTHLY if b / 12 <= upper)
            bonus_tax = round(b * brate - quick, 2)
        return {"taxable": round(taxable, 2), "rate": rate, "tax": tax, "bonus_tax": bonus_tax, "total_tax": round(tax + bonus_tax, 2)}

    options = {"merged": merged()}
    if b > 0:
        options["separate"] = separate()
    best = min(options, key=lambda k: options[k]["total_tax"])
    due = options[best]["total_tax"]
    return {
        "counted_income": round(counted, 2),
        "deductions": round(deductions, 2),
        "options": options,
        "best": best,
        "tax_due": due,
        "withheld": paid,
        "refund": round(max(paid - due, 0), 2),
        "to_pay": round(max(due - paid, 0), 2),
        "notes": [
            "Estimate only, not tax advice. File through the 个人所得税 app, which is authoritative.",
            "Rates and the 60,000 basic deduction are the national figures in force since 2019; check for changes.",
            "The separate bonus treatment applies until 31 December 2027 under Announcement 2023 No. 30; check it is still available.",
            "Special additional deductions were entered as you gave them; eligibility is not checked.",
        ],
    }


def selftest() -> int:
    t = []

    def check(name, got, want):
        t.append((name, got == want, got, want))

    check("table: 36000 at 3%", tax_from_table(36000, ANNUAL)[0], 1080.0)
    check("table: 100000 at 10%", tax_from_table(100000, ANNUAL)[0], 7480.0)
    check("table: zero", tax_from_table(0, ANNUAL)[0], 0.0)
    check("table: negative", tax_from_table(-5, ANNUAL)[0], 0.0)
    r = calculate(wages=360000, social_insurance=40000, special=36000, withheld=30000)
    # taxable = 360000 - 60000 - 40000 - 36000 = 224000 -> 20%: 44800 - 16920 = 27880
    check("taxable", r["options"]["merged"]["taxable"], 224000.0)
    check("tax due", r["tax_due"], 27880.0)
    check("refund", r["refund"], 2120.0)
    check("to pay is 0, not missing", r["to_pay"], 0.0)
    r = calculate(wages=300000, bonus=60000, social_insurance=35000, withheld=20000)
    # separate: taxable 205000 -> 20%: 41000-16920 = 24080; bonus 60000/12=5000 -> 10%: 6000-210 = 5790 -> 29870
    # merged: 265000 -> 20%: 53000-16920 = 36080
    check("separate bonus total", r["options"]["separate"]["total_tax"], 29870.0)
    check("merged total", r["options"]["merged"]["total_tax"], 36080.0)
    check("best is separate", r["best"], "separate")
    r = calculate(wages=50000, bonus=30000)
    # merged: 80000-60000 = 20000 -> 600; separate: 0 + 30000 at 3% = 900 -> merged better
    check("low income: merged is better", r["best"], "merged")
    check("labour at 80%", calculate(labour=100000)["counted_income"], 80000.0)
    check("author at 56%", calculate(author=100000)["counted_income"], 56000.0)
    check("no income, no tax", calculate()["tax_due"], 0.0)
    for name, kw in [("negative rejected", {"wages": -1}), ("text rejected", {"wages": "lots"}), ("nan rejected", {"wages": "nan"})]:
        try:
            calculate(**kw)
            t.append((name, False, "no error", "ValueError"))
        except ValueError:
            t.append((name, True, None, None))
    failed = [x for x in t if not x[1]]
    for name, _, got, want in failed:
        print(f"FAIL {name}: got {got!r}, want {want!r}", file=sys.stderr)
    print(f"cn_iit selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Estimate China individual income tax annual reconciliation.")
    p.add_argument("--wages", help="annual wages and salaries, RMB, before tax, excluding the one-off bonus")
    p.add_argument("--labour", help="labour remuneration (劳务报酬), RMB")
    p.add_argument("--author", help="author's remuneration (稿酬), RMB")
    p.add_argument("--royalty", help="royalties (特许权使用费), RMB")
    p.add_argument("--bonus", help="annual one-off bonus (全年一次性奖金), RMB")
    p.add_argument("--social-insurance", help="personal social insurance and housing fund contributions for the year, RMB")
    p.add_argument("--special", help="special additional deductions for the year, RMB total")
    p.add_argument("--other", help="other deductions (personal pension, qualifying health insurance), RMB")
    p.add_argument("--withheld", help="tax already withheld or prepaid for the year, RMB")
    p.add_argument("--json", action="store_true")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    try:
        r = calculate(a.wages, a.labour, a.author, a.royalty, a.bonus, a.social_insurance, a.special, a.other, a.withheld)
    except ValueError as e:
        p.error(str(e))
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    print(f"Income counted: RMB {r['counted_income']:,.2f}")
    print(f"Deductions: RMB {r['deductions']:,.2f}")
    for name, o in r["options"].items():
        label = "Bonus merged into income" if name == "merged" else "Bonus taxed separately"
        print(f"{label}: taxable RMB {o['taxable']:,.2f}, total tax RMB {o['total_tax']:,.2f}")
    print(f"Lower option: {r['best']}")
    print(f"Tax due: RMB {r['tax_due']:,.2f}; already withheld: RMB {r['withheld']:,.2f}")
    if r["refund"]:
        print(f"Estimated refund: RMB {r['refund']:,.2f}")
    elif r["to_pay"]:
        print(f"Estimated amount to pay: RMB {r['to_pay']:,.2f}")
    else:
        print("Nothing to refund or pay.")
    for n in r["notes"]:
        print(f"- {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
