#!/usr/bin/env python3
"""Worked-value tests for the rule-based calculators behind the regional skills.

A rule change (a new tax table, a different cap) should break a test here, not a
user's sums. Each case is a worked example a reader can check by hand; the
expected values are written out, not computed by the code under test.

Run:  python3 -m unittest tests/test_calculators.py -v
"""

import importlib.util
import io
import unittest
from contextlib import redirect_stdout
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load(skill, name):
    path = ROOT / "skills" / skill / "scripts" / f"{name}.py"
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


cn_sev = load("cn-severance-calculator", "cn_severance")
bonus = load("cn-year-end-bonus", "bonus_tax")
kr = load("kr-severance-pay", "kr_severance")
tw = load("tw-labour-standards", "tw_severance")
mpf = load("hk-mpf-explainer", "mpf")


class SelfTests(unittest.TestCase):
    def test_every_selftest_passes(self):
        for mod in (cn_sev, bonus, kr, tw, mpf):
            with self.subTest(mod.__name__), redirect_stdout(io.StringIO()):
                self.assertEqual(mod.selftest(), 0)


class ChinaSeverance(unittest.TestCase):
    def test_n_eight_years_seven_months_counts_nine(self):
        r = cn_sev.calculate("2018-03-01", "2026-09-30", 25000, "n")
        self.assertEqual(r["years_used"], 9)
        self.assertAlmostEqual(r["total"], 225000)

    def test_high_earner_cap(self):
        # 60,000 > 3 x 12,000, so the base is 36,000
        r = cn_sev.calculate("2018-03-01", "2026-09-30", 60000, "n", local_avg=12000)
        self.assertAlmostEqual(r["monthly_base"], 36000)
        self.assertTrue(r["capped"])

    def test_unlawful_doubles(self):
        n = cn_sev.calculate("2020-01-01", "2026-06-30", 20000, "n")["total"]
        self.assertAlmostEqual(cn_sev.calculate("2020-01-01", "2026-06-30", 20000, "unlawful")["total"], 2 * n)


class ChinaBonusTax(unittest.TestCase):
    def test_separate_brackets(self):
        self.assertAlmostEqual(bonus.separate_tax(36000), 1080)       # 3,000/month at 3%
        self.assertAlmostEqual(bonus.separate_tax(38000), 3590)       # 3,166.67/month at 10% less 210
        self.assertAlmostEqual(bonus.separate_tax(100000), 9790)      # 8,333.33/month at 10% less 210

    def test_threshold_traps(self):
        traps = bonus.traps()
        self.assertEqual([t["from"] for t in traps], [36000, 144000, 300000, 420000, 660000, 960000])
        self.assertAlmostEqual(traps[0]["to"], 38566.67, places=2)
        self.assertAlmostEqual(traps[-1]["to"], 1120000, places=2)

    def test_combined(self):
        # 150,000 taxable: 30,000 - 16,920 = 13,080; 250,000: 50,000 - 16,920 = 33,080
        self.assertAlmostEqual(bonus.combined_tax(100000, 150000), 20000)

    def test_negative_bonus_rejected(self):
        with self.assertRaises(ValueError):
            bonus.separate_tax(-1)


class KoreaSeverance(unittest.TestCase):
    def test_worked_example(self):
        r = kr.calculate("2023-03-02", "2026-05-02", 9600000, 12800000)
        self.assertEqual(r["period_days"], 89)            # 2 Feb to 1 May 2026
        self.assertEqual(r["service_days"], 1157)
        daily = (9600000 + 12800000 * 3 / 12) / 89
        self.assertEqual(r["severance"], round(daily * 30 * 1157 / 365))

    def test_short_service_not_eligible(self):
        self.assertFalse(kr.calculate("2025-09-01", "2026-05-01", 9000000)["eligible"])

    def test_part_time_under_15_hours_not_eligible(self):
        self.assertFalse(kr.calculate("2020-01-01", "2026-05-01", 3000000, weekly_hours=14)["eligible"])


class TaiwanSeverance(unittest.TestCase):
    def test_four_and_a_quarter_years(self):
        r = tw.calculate("2022-05-01", "2026-07-31", 50000)
        self.assertEqual((r["service"]["years"], r["service"]["months"], r["service"]["days"]), (4, 3, 0))
        self.assertEqual(r["severance"], 106250)          # 50,000 x 0.5 x 4.25

    def test_cap_six_months(self):
        self.assertEqual(tw.calculate("2008-01-01", "2026-12-31", 40000)["severance"], 240000)

    def test_notice_bands(self):
        self.assertEqual(tw.calculate("2026-01-01", "2026-05-31", 30000)["notice_days"], 10)
        self.assertEqual(tw.calculate("2024-01-01", "2026-05-31", 30000)["notice_days"], 20)
        self.assertEqual(tw.calculate("2020-01-01", "2026-05-31", 30000)["notice_days"], 30)


class HongKongMPF(unittest.TestCase):
    def test_levels(self):
        self.assertEqual(mpf.contributions(7099)["employee"], 0)
        self.assertAlmostEqual(mpf.contributions(7100)["employee"], 355)
        self.assertAlmostEqual(mpf.contributions(30000)["employer"], 1500)
        self.assertAlmostEqual(mpf.contributions(45000)["employee"], 1500)

    def test_yearly_deduction_cap(self):
        self.assertAlmostEqual(mpf.calculate(30000, 12)["employee_deductible"], 18000)


if __name__ == "__main__":
    unittest.main()
