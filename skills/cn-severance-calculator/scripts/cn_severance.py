#!/usr/bin/env python3
"""Economic compensation estimate under China's Labour Contract Law (经济补偿金).

Implements the general national rules:
- Article 47: one month's wage per full year of service; a part year of six
  months or more counts as one year; less than six months counts as half.
  The monthly wage is the average of the 12 months before termination.
  If that average exceeds three times the local average monthly wage, the base
  is capped at three times that figure and the years are capped at 12.
- Article 40: if the employer terminates under Art. 40 without 30 days' written
  notice, it pays one extra month's wage in lieu of notice (the "+1").
- Article 87: unlawful termination is compensated at twice the Art. 47 amount.

It is an estimate, not legal advice. Local rules and court practice differ, the
wage used for the "+1" varies by locality, and service before 1 January 2008
can be calculated under older rules. The script flags these cases.
Standard library only, no network access.

Usage
-----
    python3 cn_severance.py --start 2018-03-01 --end 2026-09-30 --avg-wage 25000 --scenario n
    python3 cn_severance.py --start 2018-03-01 --end 2026-09-30 --avg-wage 25000 \
        --scenario n_plus_1 --last-month-wage 26000
    python3 cn_severance.py --start 2015-07-01 --end 2026-09-30 --avg-wage 60000 \
        --local-avg 12000 --scenario unlawful --json
    python3 cn_severance.py --selftest

Scenarios
---------
    n          compensation N (e.g. mutual agreement proposed by the employer,
               Art. 41 economic layoff, Art. 40 with 30 days' notice,
               resignation for employer fault under Art. 38)
    n_plus_1   N plus one month in lieu of notice (Art. 40 without notice)
    unlawful   2N, unlawful termination (Art. 87)
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date

SCENARIOS = {
    "n": "N (Art. 47)",
    "n_plus_1": "N + 1 (Art. 47 plus one month in lieu of notice, Art. 40)",
    "unlawful": "2N (Art. 87)",
}
NEW_LAW = date(2008, 1, 1)


def parse_date(text: str) -> date:
    try:
        return date.fromisoformat(text)
    except (TypeError, ValueError):
        raise ValueError(f"{text!r} is not a date in YYYY-MM-DD form")


def months_between(start: date, end: date) -> tuple[int, bool]:
    """Full months of service, and whether days remain beyond the last full month."""
    months = (end.year - start.year) * 12 + (end.month - start.month)
    end_is_month_end = (date.fromordinal(end.toordinal() + 1)).day == 1
    if end.day < start.day and not end_is_month_end:
        months -= 1
    months = max(months, 0)
    # The date the last full month ended on, clamped for short months.
    y, m = divmod(start.month - 1 + months, 12)
    y += start.year
    m += 1
    last_day = [31, 29 if (y % 4 == 0 and y % 100 != 0) or y % 400 == 0 else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
    boundary = date(y, m, min(start.day, last_day))
    return months, end > boundary


def service_years(start: date, end: date) -> dict:
    """Years counted for compensation under Art. 47.

    A part year of six months or more counts as one year; any shorter part,
    even days, counts as half a year.
    """
    if end < start:
        raise ValueError("the end date is before the start date")
    # The end date is the last day of service, so it counts: service from
    # 1 January to 30 June is six full months.
    full_months, days_left = months_between(start, date.fromordinal(end.toordinal() + 1))
    years, extra = divmod(full_months, 12)
    if extra >= 6:
        counted = years + 1.0
    elif extra > 0 or days_left:
        counted = years + 0.5
    else:
        counted = float(years)
    return {"full_years": years, "extra_months": extra, "days_beyond": days_left, "counted_years": counted}


def number(value, name: str, allow_zero: bool = False) -> float:
    if value is None:
        raise ValueError(f"{name} is required")
    try:
        v = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a number")
    if v != v or v in (float("inf"), float("-inf")):
        raise ValueError(f"{name} must be a finite number")
    if v < 0 or (v == 0 and not allow_zero):
        raise ValueError(f"{name} must be greater than 0")
    return v


def calculate(start: str, end: str, avg_wage, scenario: str = "n", local_avg=None, last_month_wage=None) -> dict:
    if scenario not in SCENARIOS:
        raise ValueError(f"scenario must be one of: {', '.join(SCENARIOS)}")
    s, e = parse_date(start), parse_date(end)
    wage = number(avg_wage, "avg_wage")
    local = number(local_avg, "local_avg") if local_avg is not None else None
    service = service_years(s, e)
    years = service["counted_years"]
    notes = []

    base = wage
    capped = False
    if local is not None and wage > 3 * local:
        base = 3 * local
        if years > 12:
            years = 12.0
        capped = True
        notes.append("High earner cap applied (Art. 47): base is 3 times the local average monthly wage and years are capped at 12.")
    elif local is None:
        notes.append("Local average monthly wage not given, so the high earner cap was not checked. Look up the figure published for the city of the workplace.")

    n_amount = round(base * years, 2)
    extra = 0.0
    if scenario == "n_plus_1":
        plus_wage = number(last_month_wage, "last_month_wage") if last_month_wage is not None else wage
        if last_month_wage is None:
            notes.append("The wage for the +1 was taken as the 12-month average. Many localities use the previous month's wage; pass --last-month-wage to use it.")
        extra = round(plus_wage, 2)
    total = n_amount + extra
    if scenario == "unlawful":
        total = round(n_amount * 2, 2)

    if s < NEW_LAW:
        notes.append("Service began before 1 January 2008. That part may be calculated under the rules in force at the time; ask a local labour lawyer or the labour arbitration commission.")
    notes.append("Estimate only, not legal advice. Local regulations and court practice differ; check with the local labour authority or a labour lawyer.")

    return {
        "scenario": scenario,
        "scenario_label": SCENARIOS[scenario],
        "service": service,
        "years_used": years,
        "monthly_base": round(base, 2),
        "capped": capped,
        "n": n_amount,
        "plus_one": extra,
        "total": round(total, 2),
        "notes": notes,
    }


def selftest() -> int:
    t = []

    def check(name, got, want):
        t.append((name, got == want, got, want))

    check("1 Mar 2018 to 30 Sep 2026 is 8y7m, counts as 9", service_years(date(2018, 3, 1), date(2026, 9, 30))["counted_years"], 9.0)
    check("1 Jan 2020 to 28 Feb 2023 counts as 3.5", service_years(date(2020, 1, 1), date(2023, 2, 28))["counted_years"], 3.5)
    check("10 May 2021 to 9 May 2023 is exactly 2", service_years(date(2021, 5, 10), date(2023, 5, 9))["counted_years"], 2.0)
    check("1 Jan to 30 Apr counts as 0.5", service_years(date(2026, 1, 1), date(2026, 4, 30))["counted_years"], 0.5)
    check("1 Jan to 30 Jun is six months, counts as 1", service_years(date(2020, 1, 1), date(2020, 6, 30))["counted_years"], 1.0)
    check("1 Jan 2020 to 15 Jan 2023 counts as 3.5", service_years(date(2020, 1, 1), date(2023, 1, 15))["counted_years"], 3.5)
    check("5 years 6 months counts as 6", service_years(date(2020, 1, 1), date(2025, 6, 30))["counted_years"], 6.0)
    check("a single day counts as 0.5", service_years(date(2025, 1, 1), date(2025, 1, 1))["counted_years"], 0.5)
    r = calculate("2020-01-01", "2023-02-28", 20000, "n")
    check("N for 3.5 years at 20000", r["total"], 70000.0)
    r = calculate("2020-01-01", "2023-02-28", 20000, "n_plus_1", last_month_wage=22000)
    check("N+1 uses last month wage", r["total"], 92000.0)
    r = calculate("2020-01-01", "2023-02-28", 20000, "unlawful")
    check("2N", r["total"], 140000.0)
    r = calculate("2005-01-01", "2026-01-01", 60000, "n", local_avg=12000)
    check("cap: base 36000, years 12", (r["monthly_base"], r["years_used"], r["total"]), (36000.0, 12.0, 432000.0))
    check("pre-2008 flagged", any("2008" in n for n in r["notes"]), True)
    r = calculate("2020-01-01", "2023-03-01", 30000, "n", local_avg=12000)
    check("at exactly 2.5x no cap", r["capped"], False)
    for bad, kwargs in [
        ("zero wage rejected", dict(start="2020-01-01", end="2021-01-01", avg_wage=0)),
        ("negative wage rejected", dict(start="2020-01-01", end="2021-01-01", avg_wage=-5)),
        ("end before start rejected", dict(start="2022-01-01", end="2021-01-01", avg_wage=1000)),
        ("bad date rejected", dict(start="2022-13-01", end="2023-01-01", avg_wage=1000)),
        ("unknown scenario rejected", dict(start="2020-01-01", end="2021-01-01", avg_wage=1000, scenario="3n")),
        ("NaN wage rejected", dict(start="2020-01-01", end="2021-01-01", avg_wage="nan")),
    ]:
        try:
            calculate(**kwargs)
            t.append((bad, False, "no error", "ValueError"))
        except ValueError:
            t.append((bad, True, None, None))
    failed = [x for x in t if not x[1]]
    for name, _, got, want in failed:
        print(f"FAIL {name}: got {got!r}, want {want!r}", file=sys.stderr)
    print(f"cn_severance selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main() -> int:
    p = argparse.ArgumentParser(description="Estimate economic compensation under China's Labour Contract Law.")
    p.add_argument("--start", help="first day of service, YYYY-MM-DD")
    p.add_argument("--end", help="last day of service, YYYY-MM-DD (counted as worked)")
    p.add_argument("--avg-wage", help="average monthly wage over the last 12 months, RMB, before tax")
    p.add_argument("--scenario", default="n", choices=sorted(SCENARIOS))
    p.add_argument("--local-avg", help="local average monthly wage published for the city, RMB")
    p.add_argument("--last-month-wage", help="previous month's wage, for the +1, RMB")
    p.add_argument("--json", action="store_true")
    p.add_argument("--selftest", action="store_true")
    a = p.parse_args()
    if a.selftest:
        return selftest()
    if not (a.start and a.end and a.avg_wage is not None):
        p.error("--start, --end and --avg-wage are required")
    try:
        r = calculate(a.start, a.end, a.avg_wage, a.scenario, a.local_avg, a.last_month_wage)
    except ValueError as e:
        p.error(str(e))
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2))
        return 0
    sv = r["service"]
    print(f"Scenario: {r['scenario_label']}")
    print(f"Service: {sv['full_years']} years {sv['extra_months']} months, counted as {r['years_used']} years")
    print(f"Monthly base: RMB {r['monthly_base']:,.2f}{' (capped)' if r['capped'] else ''}")
    print(f"N: RMB {r['n']:,.2f}")
    if r["plus_one"]:
        print(f"+1: RMB {r['plus_one']:,.2f}")
    print(f"Total estimate: RMB {r['total']:,.2f}")
    for n in r["notes"]:
        print(f"- {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
