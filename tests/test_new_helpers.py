#!/usr/bin/env python3
"""Tests for the demo video planner and the document graph builder.

Each expected value is written out by hand, not computed by the code under test.

Run:  python3 -m unittest tests/test_new_helpers.py -v
"""
import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load(skill, name):
    path = ROOT / "skills" / skill / "scripts" / f"{name}.py"
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod, path


video, VIDEO = load("demo-video-kit", "demo_video")
graph, GRAPH = load("product-knowledge-graph", "knowledge_graph")
capture, CAPTURE = load("live-competitor-capture", "capture_log")


class DemoVideoTests(unittest.TestCase):
    def write(self, directory, shots):
        path = Path(directory) / "shots.json"
        path.write_text(json.dumps(shots), encoding="utf-8")
        return path

    def test_captions_sit_on_the_assembled_timeline(self):
        shots = [{"file": "a.mov", "start": 12, "end": 20, "caption": "One"},
                 {"file": "a.mov", "start": 45.5, "end": 58, "caption": ""},
                 {"file": "b.mov", "start": 0, "end": 2, "caption": "Three"}]
        with tempfile.TemporaryDirectory() as d:
            srt, total = video.build_srt(video.load_shots(self.write(d, shots)))
        self.assertEqual(total, 22.5)
        self.assertIn("1\n00:00:00,000 --> 00:00:08,000\nOne\n", srt)
        # the silent second shot still moves the clock: 8.0 + 12.5 = 20.5
        self.assertIn("2\n00:00:20,500 --> 00:00:22,500\nThree\n", srt)

    def test_timestamp_rolls_over_hours(self):
        self.assertEqual(video.timestamp(3661.25), "01:01:01,250")

    def test_file_names_cannot_inject_commands(self):
        shots = [{"file": "x; rm -rf ~ #.mov", "start": 0, "end": 1}, {"file": "-y.mov", "start": 0, "end": 1}]
        with tempfile.TemporaryDirectory() as d:
            script = video.build_commands(video.load_shots(self.write(d, shots)), 1920, 1080, 30)
        self.assertIn("-i 'x; rm -rf ~ #.mov'", script)
        self.assertIn("-i ./-y.mov", script)

    def test_bad_shot_lists_write_nothing(self):
        bad = ([], {}, [{"file": "a", "start": 5, "end": 5}], [{"file": "a", "start": -1, "end": 2}],
               [{"file": "", "start": 0, "end": 1}], [{"file": "a", "start": "0", "end": 1}],
               [{"file": "a", "start": True, "end": 2}], [{"file": "a\nb", "start": 0, "end": 1}])
        for shots in bad:
            with self.subTest(shots=shots), tempfile.TemporaryDirectory() as d:
                out = Path(d) / "build"
                result = subprocess.run([sys.executable, str(VIDEO), "plan", str(self.write(d, shots)), "--out", str(out)],
                                        capture_output=True, text=True)
                self.assertNotEqual(result.returncode, 0)
                self.assertFalse(out.exists())
                self.assertNotIn("Traceback", result.stderr)

    def test_odd_sizes_and_silly_fps_are_refused(self):
        for bad in ("1081x1920", "wide", "0x0"):
            with self.assertRaises(ValueError):
                video.parse_size(bad)
        with tempfile.TemporaryDirectory() as d:
            shots = self.write(d, [{"file": "a", "start": 0, "end": 1}])
            result = subprocess.run([sys.executable, str(VIDEO), "plan", str(shots), "--out", str(Path(d) / "o"), "--fps", "0"],
                                    capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)


class KnowledgeGraphTests(unittest.TestCase):
    def make(self, directory):
        docs = Path(directory) / "docs"
        (docs / "sub").mkdir(parents=True)
        (docs / ".hidden").mkdir()
        (docs / "prd.md").write_text(
            "# Checkout PRD\r\nSee [metrics](metrics.md) and [[Roadmap]]. Uses Stripe.\n"
            "```\n[in code](alone.md)\n```\n[escape](../../outside.md) ![img](metrics.md)\n", encoding="utf-8")
        (docs / "metrics.md").write_text("# Metrics\nStripe conversion. [abs](/prd.md) [web](https://a.b/prd.md)\n", encoding="utf-8")
        (docs / "sub" / "roadmap.md").write_text("No heading here. Striped shirts.\n", encoding="utf-8")
        (docs / "alone.md").write_text("# Alone\n", encoding="utf-8")
        (docs / ".hidden" / "secret.md").write_text("# Secret [x](../prd.md)\n", encoding="utf-8")
        return docs

    def test_edges_come_only_from_real_links_and_terms(self):
        with tempfile.TemporaryDirectory() as d:
            g = graph.build_graph(self.make(d), ["Stripe", ""])
        self.assertEqual([n["id"] for n in g["nodes"]], ["alone.md", "metrics.md", "prd.md", "sub/roadmap.md"])
        self.assertEqual(g["edges"], [
            {"from": "metrics.md", "to": "prd.md", "kind": "term:Stripe"},
            {"from": "prd.md", "to": "metrics.md", "kind": "link"},
            {"from": "prd.md", "to": "sub/roadmap.md", "kind": "wiki"},
        ])
        # "Striped" is not the term "Stripe"
        self.assertEqual(g["terms"], {"Stripe": ["metrics.md", "prd.md"]})
        self.assertEqual(graph.orphans(g), ["alone.md"])

    def test_titles_fall_back_to_the_file_name(self):
        with tempfile.TemporaryDirectory() as d:
            g = graph.build_graph(self.make(d))
        titles = {n["id"]: n["title"] for n in g["nodes"]}
        self.assertEqual(titles["prd.md"], "Checkout PRD")
        self.assertEqual(titles["sub/roadmap.md"], "roadmap")

    def test_two_builds_give_identical_output(self):
        with tempfile.TemporaryDirectory() as d:
            docs = self.make(d)
            self.assertEqual(json.dumps(graph.build_graph(docs, ["Stripe"])), json.dumps(graph.build_graph(docs, ["Stripe"])))

    def test_cli_errors_are_messages_not_tracebacks(self):
        with tempfile.TemporaryDirectory() as d:
            empty = Path(d) / "empty"
            empty.mkdir()
            notgraph = Path(d) / "x.json"
            notgraph.write_text("[]", encoding="utf-8")
            for argv in (["build", str(empty)], ["build", str(Path(d) / "missing")], ["orphans", str(notgraph)],
                         ["neighbours", str(notgraph), "a.md"]):
                with self.subTest(argv=argv):
                    result = subprocess.run([sys.executable, str(GRAPH), *argv], capture_output=True, text=True, cwd=d)
                    self.assertNotEqual(result.returncode, 0)
                    self.assertNotIn("Traceback", result.stderr)

    def test_unknown_node_suggests_a_match(self):
        with tempfile.TemporaryDirectory() as d:
            g = graph.build_graph(self.make(d))
        with self.assertRaisesRegex(ValueError, "Did you mean: prd.md"):
            graph.neighbours(g, "prd")



class CaptureLogTests(unittest.TestCase):
    def empty(self):
        return {"competitor": "Acme", "question": "Steps?", "entries": []}

    def test_entries_are_numbered_and_cleaned(self):
        log = self.empty()
        capture.add_entry(log, " signup ", "https://example.com/a", "Start  free", "Create account", "email, password,,", "a.png", "2026-11-27", "")
        capture.add_entry(log, "signup", "https://example.com/b", "", "", "", "", "2026-11-28", "")
        self.assertEqual([e["step"] for e in log["entries"]], [1, 2])
        self.assertEqual(log["entries"][0]["flow"], "signup")
        self.assertEqual(log["entries"][0]["headline"], "Start free")
        self.assertEqual(log["entries"][0]["fields"], ["email", "password"])

    def test_bad_addresses_and_dates_are_refused(self):
        for url in ("javascript:alert(1)", "example.com", "", "ftp://x.y", "https://a b"):
            with self.subTest(url=url), self.assertRaises(ValueError):
                capture.add_entry(self.empty(), "x", url, "", "", "", "", "2026-11-27", "")
        for date in ("27/11/2026", "2026-02-30", "today"):
            with self.subTest(date=date), self.assertRaises(ValueError):
                capture.add_entry(self.empty(), "x", "https://a.b", "", "", "", "", date, "")
        with self.assertRaises(ValueError):
            capture.add_entry(self.empty(), "  ", "https://a.b", "", "", "", "", "2026-11-27", "")

    def test_report_counts_and_escapes_table_pipes(self):
        log = self.empty()
        capture.add_entry(log, "signup", "https://example.com/a", "Start | free", "Go", "email,password", "a.png", "2026-11-27", "")
        capture.add_entry(log, "pricing", "https://example.com/p", "Plans", "", "", "", "2026-11-29", "")
        text = capture.render(log)
        self.assertIn('"Start \\| free" / "Go"', text)
        self.assertIn("**Captured:** 2026-11-27 to 2026-11-29", text)
        self.assertIn("- signup: 1 screen(s), 2 field(s) asked for", text)
        self.assertIn("- pricing: 1 screen(s), 0 field(s) asked for", text)
        self.assertIn("Entries with no screenshot: 2", text)

    def test_init_never_overwrites_and_errors_are_messages(self):
        with tempfile.TemporaryDirectory() as d:
            log = Path(d) / "log.json"
            run = lambda *argv: subprocess.run([sys.executable, str(CAPTURE), *argv], capture_output=True, text=True)
            self.assertEqual(run("init", str(log), "--competitor", "Acme").returncode, 0)
            self.assertEqual(run("add", str(log), "--flow", "signup", "--url", "https://example.com").returncode, 0)
            again = run("init", str(log))
            self.assertNotEqual(again.returncode, 0)
            self.assertEqual(len(json.loads(log.read_text(encoding="utf-8"))["entries"]), 1)
            for argv in (["report", str(Path(d) / "missing.json")], ["add", str(log), "--flow", "x", "--url", "nope"]):
                result = run(*argv)
                self.assertNotEqual(result.returncode, 0)
                self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()
