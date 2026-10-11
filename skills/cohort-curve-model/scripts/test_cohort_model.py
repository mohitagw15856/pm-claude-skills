"""Regression tests for input rejection before workbook creation."""
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import zipfile

SCRIPT = Path(__file__).with_name("cohort_model.py")
spec = importlib.util.spec_from_file_location("cohort_model", SCRIPT)
model = importlib.util.module_from_spec(spec)
spec.loader.exec_module(model)


class InputValidationTests(unittest.TestCase):
    def run_cli(self, args, valid=False):
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory) / "model.xlsx"
            result = subprocess.run(
                [sys.executable, "-X", "utf8", str(SCRIPT), "fit", str(out), *args],
                capture_output=True, text=True, encoding="utf-8",
            )
            if valid:
                self.assertEqual(result.returncode, 0, result.stderr)
                with zipfile.ZipFile(out) as workbook:
                    return workbook.read("xl/worksheets/sheet2.xml")
            self.assertNotEqual(result.returncode, 0)
            self.assertFalse(out.exists(), result.stderr)
            self.assertNotIn("Traceback", result.stderr)

    def test_invalid_observations_do_not_write(self):
        for raw in ([], {}, [100, 50, 40], [0, .5, .4, .3],
                    [100, 50, 40, 0], [100, 50, 40, -10],
                    [100, 50, 40, float("inf")],
                    [100, 50, 40, float("nan")],
                    [100, 50, 40, True], [100, 50, 40, "30"],
                    [100, 120, 40, 30], [1e308, 1e-308, 1, 1]):
            with self.subTest(raw=raw):
                self.run_cli(["--observed", json.dumps(raw)])

    def test_invalid_options_do_not_write(self):
        base = ["--observed", "[100,50,40,30]"]
        for args in (["--arpu", "nan"], ["--arpu", "inf"],
                     ["--arpu", "-1"], ["--horizon", "0"],
                     ["--horizon", "-1"]):
            with self.subTest(args=args):
                self.run_cli(base + args)

    def test_input_source_is_required_and_exclusive(self):
        self.run_cli([])
        self.run_cli(["--observed", "[100,50,40,30]", "--observed-file", "missing.json"])
        self.run_cli(["--observed-file", "missing.json"])
        self.run_cli(["--observed", "bad json"])

    def test_percent_fraction_and_count_curves_agree(self):
        curves = [self.run_cli(["--observed", json.dumps(raw), "--arpu", "40"], valid=True)
                  for raw in ([100, 50, 40, 30], [1, .5, .4, .3], [1000, 500, 400, 300])]
        self.assertEqual(curves[0], curves[1])
        self.assertEqual(curves[1], curves[2])

    def test_direct_fit_rejects_zero_and_nonfinite(self):
        for raw in ([1, .5, .4, 0], [1, .5, .4, float("inf")]):
            with self.subTest(raw=raw), self.assertRaises(ValueError):
                model.fit_power(raw)


if __name__ == "__main__":
    unittest.main()
