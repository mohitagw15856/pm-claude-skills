#!/usr/bin/env python3
"""Severance pay (資遣費) in Taiwan when an employer dismisses for business reasons.

- New pension system (勞工退休金條例 第12條, service from 1 July 2005): half a month's
  average wage per year of service, part years in proportion, capped at six months'
  average wage.
- Old-system years kept by the worker (勞動基準法 第17條): one month per year.
- Notice (勞動基準法 第16條): 10 days for 3 months to 1 year of service, 20 days for
  1 to 3 years, 30 days for 3 years or more; pay in lieu if no notice was given.

Average wage (平均工資) is the total wages in the six months before the end of
employment divided by the number of days in that period; this script takes the
monthly figure. Part years are counted as years, months/12 and days/365.
An estimate, not legal advice; confirm with the 勞動部 or the 1955 hotline.
Standard library only, no network access.

Usage
-----
    python3 tw_severance.py --start 2022-05-01 --end 2026-07-31 --avg-monthly 50000
    python3 tw_severance.py --start 2022-05-01 --end 2026-07-31 --avg-monthly 50000 --no-notice --json
    python3 tw_severance.py --selftest
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


def service(start: date, end: date) -> dict:
    """Years, months and days of service, counting the end date as worked."""
    if end < start:
        raise ValueError("the end date must not be before the start date")
    stop = date.fromordinal(end.toordinal() + 1)  # the day after the last day worked
    y, m, d = stop.year - start.year, stop.month - start.month, stop.day - start.day
    if d < 0:
        m -= 1
        d += (date(stop.year, stop.month, 1) - date.fromordinal(date(stop.year, stop.month, 1).toordinal() - 1).replace(day=1)).days
    if m < 0:
        y -= 1
        m += 12
    return {"years": y, "months": m, "days": d, "in_years": y + m / 12 + d / 365}


def notice_days(sv: dict) -> int:
    total_months = sv["years"] * 12 + sv["months"]
    if total_months >= 36:
        return 30
    if total_months >= 12:
        return 20
    if total_months >= 3:
        return 10
    return 0


def calculate(start, end, avg_monthly, old_years=0.0, no_notice=False) -> dict:
    sv = service(parse_date(start), parse_date(end))
    w = float(avg_monthly)
    if w < 0 or float(old_years) < 0:
        raise ValueError("amounts cannot be negative")
    new_months = min(0.5 * sv["in_years"], 6.0)
    old_months = float(old_years)
    severance = w * (new_months + old_months)
    nd = notice_days(sv)
    notice_pay = round(w / 30 * nd) if no_notice else 0
    notes = ["Part years are counted in proportion (months/12); confirm how the local labour bureau counts days."]
    if new_months == 6.0:
        notes.append("Capped at six months' average wage under the new pension system.")
    notes.append("An estimate, not legal advice: confirm with the 勞動部, your local labour bureau or 1955.")
    return {"service": sv, "severance_months": round(new_months + old_months, 4), "severance": round(severance),
            "notice_days": nd, "notice_pay": notice_pay, "total": round(severance) + notice_pay, "notes": notes}


def selftest() -> int:
    t = []
    r = calculate("2022-05-01", "2026-07-31", 50000)
    t.append(("4 years 3 months", (r["service"]["years"], r["service"]["months"]) == (4, 3), (r["service"]["years"], r["service"]["months"]), (4, 3)))
    t.append(("4.25 years x half month", r["severance"] == 106250, r["severance"], 106250))
    t.append(("notice 30 days", r["notice_days"] == 30, r["notice_days"], 30))
    cap = calculate("2008-01-01", "2026-12-31", 40000)
    t.append(("capped at six months", cap["severance"] == 240000, cap["severance"], 240000))
    nn = calculate("2025-01-01", "2026-06-30", 36000, no_notice=True)
    t.append(("notice pay 20 days", nn["notice_pay"] == 24000, nn["notice_pay"], 24000))
    failed = [x for x in t if not x[1]]
    for name, _, got, want in failed:
        print(f"  FAIL {name}: got {got}, want {want}")
    print(f"tw_severance selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Estimate severance pay (資遣費) in Taiwan.")
    p.add_argument("--start", help="first day of service, YYYY-MM-DD")
    p.add_argument("--end", help="last day of service, YYYY-MM-DD (counted as worked)")
    p.add_argument("--avg-monthly", help="average monthly wage over the last six months, NTD")
    p.add_argument("--old-years", default=0, help="old-system (勞基法) years kept, one month each")
    p.add_argument("--no-notice", action="store_true", help="add pay in lieu of notice")
    p.add_argument("--json", action="store_true", help="print JSON")
    p.add_argument("--selftest", action="store_true", help="run the built-in checks")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if not (a.start and a.end and a.avg_monthly is not None):
        p.error("--start, --end and --avg-monthly are required")
    try:
        r = calculate(a.start, a.end, a.avg_monthly, a.old_years, a.no_notice)
    except ValueError as e:
        p.error(str(e))
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    sv = r["service"]
    print(f"Service: {sv['years']} years {sv['months']} months {sv['days']} days")
    print(f"資遣費: {r['severance_months']} months' wage = NTD {r['severance']:,}")
    if r["notice_pay"]:
        print(f"預告工資 ({r['notice_days']} days): NTD {r['notice_pay']:,}")
    print(f"Total: NTD {r['total']:,}")
    for n in r["notes"]:
        print(f"- {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
