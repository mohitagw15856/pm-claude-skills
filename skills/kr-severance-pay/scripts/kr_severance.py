#!/usr/bin/env python3
"""Statutory severance pay in Korea (퇴직금) under the Employee Retirement Benefit Security Act.

- Eligibility: at least one year of continuous service and, on average, at least
  15 hours of work a week.
- 평균임금 (average daily wage): wages paid in the three calendar months before
  the leaving date, plus 3/12 of the bonuses and of the annual-leave allowance
  paid in the 12 months before it, divided by the number of days in those three
  months. If it is lower than 통상임금 (ordinary daily wage), 통상임금 is used.
- 퇴직금 = 평균임금 x 30 x (days of service / 365).

The leaving date (퇴직일) is the day after the last day worked. Under a DC-type
retirement pension the employer's contributions replace this calculation, so
the result is a check, not the payout. An estimate, not legal advice; confirm
with 고용노동부 (국번없이 1350). Standard library only, no network access.

Usage
-----
    python3 kr_severance.py --start 2023-03-02 --leave 2026-05-02 --wages-3m 9600000 --annual-bonus 12800000
    python3 kr_severance.py --start 2023-03-02 --leave 2026-05-02 --wages-3m 9600000 --ordinary-daily 120000 --json
    python3 kr_severance.py --selftest
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date


def parse_date(text: str) -> date:
    try:
        return date.fromisoformat(str(text))
    except ValueError:
        raise ValueError(f"not a date (YYYY-MM-DD): {text!r}")


def minus_months(d: date, months: int) -> date:
    y, m = divmod(d.month - 1 - months, 12)
    year, month = d.year + y, m + 1
    for day in (d.day, 30, 29, 28):
        try:
            return date(year, month, day)
        except ValueError:
            continue
    raise ValueError("unreachable")


def calculate(start, leave, wages_3m, annual_bonus=0, leave_allowance=0, ordinary_daily=None, weekly_hours=40) -> dict:
    s, lv = parse_date(start), parse_date(leave)
    if lv <= s:
        raise ValueError("the leaving date must be after the start date")
    for name, v in (("wages-3m", wages_3m), ("annual-bonus", annual_bonus), ("leave-allowance", leave_allowance)):
        if float(v) < 0:
            raise ValueError(f"--{name} cannot be negative")
    service_days = (lv - s).days
    period_days = (lv - minus_months(lv, 3)).days
    avg_daily = (float(wages_3m) + float(annual_bonus) * 3 / 12 + float(leave_allowance) * 3 / 12) / period_days
    used = avg_daily
    used_ordinary = False
    if ordinary_daily is not None and float(ordinary_daily) > avg_daily:
        used, used_ordinary = float(ordinary_daily), True
    eligible = service_days >= 365 and float(weekly_hours) >= 15
    severance = used * 30 * service_days / 365 if eligible else 0.0
    notes = []
    if not eligible:
        notes.append("Not eligible: needs at least one year of service and 15 or more hours a week on average.")
    if used_ordinary:
        notes.append("평균임금 was lower than 통상임금, so 통상임금 was used.")
    notes.append("Payment is due within 14 days of leaving unless both sides agree to extend it; under a DC pension the contributions replace this amount.")
    notes.append("An estimate, not legal advice: confirm with 고용노동부 (1350) or a 노무사.")
    return {"service_days": service_days, "period_days": period_days, "average_daily_wage": round(avg_daily, 2),
            "daily_wage_used": round(used, 2), "eligible": eligible, "severance": round(severance), "notes": notes}


def selftest() -> int:
    t = []
    r = calculate("2023-03-02", "2026-05-02", 9600000, 12800000)
    # the three calendar months before 2 May 2026: 2 Feb to 1 May = 89 days
    t.append(("period days", r["period_days"] == 89, r["period_days"], 89))
    want_daily = (9600000 + 12800000 * 3 / 12) / 89
    t.append(("average daily wage", abs(r["average_daily_wage"] - round(want_daily, 2)) < 0.01, r["average_daily_wage"], round(want_daily, 2)))
    want = round(want_daily * 30 * r["service_days"] / 365)
    t.append(("severance", r["severance"] == want, r["severance"], want))
    short = calculate("2025-09-01", "2026-05-01", 9000000)
    t.append(("under a year not eligible", short["eligible"] is False and short["severance"] == 0, short["severance"], 0))
    floor = calculate("2023-03-02", "2026-05-02", 6000000, ordinary_daily=100000)
    t.append(("ordinary wage floor", floor["daily_wage_used"] == 100000, floor["daily_wage_used"], 100000))
    failed = [x for x in t if not x[1]]
    for name, _, got, want in failed:
        print(f"  FAIL {name}: got {got}, want {want}")
    print(f"kr_severance selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Estimate statutory severance pay (퇴직금) in Korea.")
    p.add_argument("--start", help="first day of service, YYYY-MM-DD")
    p.add_argument("--leave", help="leaving date (퇴직일, the day after the last day worked), YYYY-MM-DD")
    p.add_argument("--wages-3m", help="wages paid in the three calendar months before leaving, KRW")
    p.add_argument("--annual-bonus", default=0, help="bonuses paid in the 12 months before leaving, KRW")
    p.add_argument("--leave-allowance", default=0, help="annual-leave allowance paid in the 12 months before leaving, KRW")
    p.add_argument("--ordinary-daily", help="통상임금 per day, KRW (used if higher than 평균임금)")
    p.add_argument("--weekly-hours", default=40, help="average weekly working hours")
    p.add_argument("--json", action="store_true", help="print JSON")
    p.add_argument("--selftest", action="store_true", help="run the built-in checks")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if not (a.start and a.leave and a.wages_3m is not None):
        p.error("--start, --leave and --wages-3m are required")
    try:
        r = calculate(a.start, a.leave, a.wages_3m, a.annual_bonus, a.leave_allowance, a.ordinary_daily, a.weekly_hours)
    except ValueError as e:
        p.error(str(e))
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    print(f"Service: {r['service_days']} days · 평균임금 KRW {r['average_daily_wage']:,.0f}/day (used {r['daily_wage_used']:,.0f})")
    print(f"퇴직금 estimate: KRW {r['severance']:,}")
    for n in r["notes"]:
        print(f"- {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
