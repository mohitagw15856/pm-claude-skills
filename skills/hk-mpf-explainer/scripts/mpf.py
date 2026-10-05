#!/usr/bin/env python3
"""Hong Kong MPF mandatory contributions (強積金強制性供款) for a monthly-paid employee.

- Employer: 5% of relevant income, capped at HK$1,500 a month (income above
  HK$30,000 is not counted).
- Employee: nothing below HK$7,100 a month; otherwise 5%, capped at HK$1,500.
- Tax: the employee's mandatory contributions are deductible up to HK$18,000 a
  year; tax-deductible voluntary contributions (TVC) and qualifying deferred
  annuity premiums share a separate HK$60,000 a year limit.

Levels as set by the MPF Schemes Ordinance; confirm them with the MPFA before
relying on them. Since 1 May 2025 employers can no longer offset severance or
long service payments against the employer's mandatory contributions for
service from that date. An estimate, not financial advice.
Standard library only, no network access.

Usage
-----
    python3 mpf.py --income 40000
    python3 mpf.py --income 6500 --json
    python3 mpf.py --income 25000 --months 12
    python3 mpf.py --selftest
"""
from __future__ import annotations

import argparse
import json
import sys

MIN_LEVEL = 7100
MAX_LEVEL = 30000
RATE = 0.05
EMPLOYEE_DEDUCTION_CAP = 18000


def contributions(income) -> dict:
    inc = float(income)
    if inc < 0:
        raise ValueError("income cannot be negative")
    counted = min(inc, MAX_LEVEL)
    employer = round(counted * RATE, 2)
    employee = 0.0 if inc < MIN_LEVEL else round(counted * RATE, 2)
    return {"income": inc, "employer": employer, "employee": employee, "total": round(employer + employee, 2)}


def calculate(income, months=1) -> dict:
    m = contributions(income)
    n = int(months)
    if n < 1:
        raise ValueError("--months must be at least 1")
    yearly_employee = m["employee"] * n
    notes = []
    if float(income) < MIN_LEVEL:
        notes.append(f"Below the minimum level of HK${MIN_LEVEL:,}: the employee pays nothing, the employer still pays 5%.")
    if float(income) > MAX_LEVEL:
        notes.append(f"Above the maximum level of HK${MAX_LEVEL:,}: both sides pay the HK$1,500 cap.")
    notes.append(f"Employee mandatory contributions are tax-deductible up to HK${EMPLOYEE_DEDUCTION_CAP:,} a year; TVC has its own HK$60,000 limit shared with deferred annuities.")
    notes.append("Confirm the levels with the MPFA (mpfa.org.hk); not financial advice.")
    return {**m, "months": n, "employer_total": round(m["employer"] * n, 2), "employee_total": round(yearly_employee, 2),
            "employee_deductible": round(min(yearly_employee, EMPLOYEE_DEDUCTION_CAP), 2), "notes": notes}


def selftest() -> int:
    t = []
    eq = lambda name, got, want: t.append((name, abs(got - want) < 0.01, got, want))
    eq("40,000 employer capped", contributions(40000)["employer"], 1500)
    eq("40,000 employee capped", contributions(40000)["employee"], 1500)
    eq("6,000 employee nothing", contributions(6000)["employee"], 0)
    eq("6,000 employer 5%", contributions(6000)["employer"], 300)
    eq("20,000 employee 5%", contributions(20000)["employee"], 1000)
    eq("7,100 employee pays", contributions(7100)["employee"], 355)
    eq("deduction capped at 18,000", calculate(30000, 12)["employee_deductible"], 18000)
    failed = [x for x in t if not x[1]]
    for name, _, got, want in failed:
        print(f"  FAIL {name}: got {got}, want {want}")
    print(f"mpf selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Hong Kong MPF mandatory contributions for a monthly-paid employee.")
    p.add_argument("--income", help="monthly relevant income, HK$")
    p.add_argument("--months", default=1, help="number of months to total (12 for a year)")
    p.add_argument("--json", action="store_true", help="print JSON")
    p.add_argument("--selftest", action="store_true", help="run the built-in checks")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if a.income is None:
        p.error("--income is required")
    try:
        r = calculate(a.income, a.months)
    except ValueError as e:
        p.error(str(e))
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    print(f"Monthly: employer HK${r['employer']:,.2f} · employee HK${r['employee']:,.2f}")
    if r["months"] > 1:
        print(f"Over {r['months']} months: employer HK${r['employer_total']:,.2f} · employee HK${r['employee_total']:,.2f} (deductible HK${r['employee_deductible']:,.2f})")
    for n in r["notes"]:
        print(f"- {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
