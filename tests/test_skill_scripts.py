#!/usr/bin/env python3
"""Contract tests for every skills/*/scripts/*.py helper.

tests/scripts-smoke.mjs already proves the scripts *run*: --help exits 0, a
handful have asserted functional cases, and none hang on garbage. This file
tests the properties the authoring standard promises but nothing enforced —
across all 53 scripts at once, so a new helper inherits the coverage rather
than needing its own test written.

What is asserted, and why each one is here:

  stdlib only        SKILL-AUTHORING-STANDARD.md §5 says "no pip install". It
                     was a convention with no check; one `import requests`
                     would break every consumer at runtime, not at review.
  importable         Importing a helper must not do the work or touch the
                     filesystem. A script whose body runs at import time cannot
                     be tested, reused, or safely inspected.
  documented flags   Every argparse option must appear in --help. A flag you
                     cannot discover is a flag nobody uses.
  seeded randomness  A script importing `random` must accept --seed, or its
                     output is unreproducible and the skill cannot be verified.
  docstring example  §5 requires a module docstring with runnable examples.
  no shell           subprocess with shell=True in a script that takes user
                     input is the injection path; none of these need a shell.

Run:  python3 -m unittest discover -s tests -p 'test_*.py' -v
"""

import ast
import io
import os
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "skills"


def find_scripts():
    return sorted(SKILLS.glob("*/scripts/*.py"))


SCRIPTS = find_scripts()

# Modules that ship with CPython. sys.stdlib_module_names is exact and needs no
# import, but only exists from 3.10. Below that, ask the import system where a
# module lives rather than maintaining a hand-written list — the first version
# of this used a list, and it was missing `shutil` and `tempfile`, which failed
# two perfectly correct scripts on 3.9.
try:
    STDLIB = set(sys.stdlib_module_names)
except AttributeError:  # pragma: no cover - only on <3.10
    import importlib.util
    import sysconfig

    _STDLIB_DIR = sysconfig.get_paths().get("stdlib", "")

    def _is_stdlib(name):
        if name in sys.builtin_module_names:
            return True
        try:
            spec = importlib.util.find_spec(name)
        except (ImportError, ValueError, ModuleNotFoundError):
            return False
        if spec is None:
            return False
        origin = spec.origin or ""
        if origin in ("built-in", "frozen"):
            return True
        # Site-packages lives under the stdlib prefix on some layouts, so an
        # installed third-party package must not read as stdlib.
        return origin.startswith(_STDLIB_DIR) and "site-packages" not in origin

    class _StdlibSet:
        """Set-like, resolved lazily so nothing is probed unless asked."""

        def __init__(self):
            self._cache = {}

        def __contains__(self, name):
            if name not in self._cache:
                self._cache[name] = _is_stdlib(name)
            return self._cache[name]

    STDLIB = _StdlibSet()


def top_level_imports(tree):
    """Every module name imported anywhere in the file, top level only."""
    names = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for a in node.names:
                names.add(a.name.split(".")[0])
        elif isinstance(node, ast.ImportFrom):
            if node.level:      # relative import — local, not a dependency
                continue
            if node.module:
                names.add(node.module.split(".")[0])
    return names


class TestScriptsExist(unittest.TestCase):
    def test_scripts_found(self):
        self.assertGreater(len(SCRIPTS), 0, "no skills/*/scripts/*.py found — wrong root?")


class TestScriptContracts(unittest.TestCase):
    """One test method, looped over every script, reporting each failure."""

    def _each(self, check):
        failures = []
        for path in SCRIPTS:
            try:
                msg = check(path)
            except Exception as exc:                      # noqa: BLE001
                msg = f"raised {type(exc).__name__}: {exc}"
            if msg:
                failures.append(f"{path.relative_to(ROOT)}: {msg}")
        if failures:
            self.fail(f"{len(failures)} of {len(SCRIPTS)} script(s) failed:\n  " + "\n  ".join(failures))

    def test_stdlib_only(self):
        def check(path):
            tree = ast.parse(path.read_text(encoding="utf-8"))
            third_party = sorted(
                n for n in top_level_imports(tree)
                if n not in STDLIB and n != "__future__" and not (path.parent / f"{n}.py").exists()
            )
            return f"imports non-stdlib {third_party}" if third_party else None
        self._each(check)

    def test_parses_on_this_python(self):
        def check(path):
            ast.parse(path.read_text(encoding="utf-8"))
            return None
        self._each(check)

    def test_no_work_at_import_time(self):
        """Anything executable must sit behind `if __name__ == '__main__'`."""
        def check(path):
            tree = ast.parse(path.read_text(encoding="utf-8"))
            for node in tree.body:
                if isinstance(node, (ast.Import, ast.ImportFrom, ast.FunctionDef,
                                     ast.AsyncFunctionDef, ast.ClassDef, ast.Assign,
                                     ast.AnnAssign, ast.Expr)):
                    continue
                if isinstance(node, ast.If):
                    continue    # the __main__ guard, or a compat branch
                return f"top-level {type(node).__name__} executes on import"
            return None
        self._each(check)

    def test_flags_are_documented(self):
        """Every long option reaching add_argument appears in --help output."""
        def check(path):
            src = path.read_text(encoding="utf-8")
            tree = ast.parse(src)
            declared = set()
            for node in ast.walk(tree):
                if not isinstance(node, ast.Call):
                    continue
                fn = node.func
                if not (isinstance(fn, ast.Attribute) and fn.attr == "add_argument"):
                    continue
                for arg in node.args:
                    if isinstance(arg, ast.Constant) and isinstance(arg.value, str) and arg.value.startswith("--"):
                        declared.add(arg.value)
            if not declared:
                return None
            # Scripts using subparsers put most flags under a subcommand, so the
            # top-level --help legitimately omits them. Collect every
            # add_parser("name") and check those help screens too.
            subcommands = []
            for node in ast.walk(tree):
                if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                        and node.func.attr == "add_parser" and node.args
                        and isinstance(node.args[0], ast.Constant)
                        and isinstance(node.args[0].value, str)):
                    subcommands.append(node.args[0].value)

            help_text = ""
            for argv in [["--help"]] + [[c, "--help"] for c in subcommands]:
                proc = subprocess.run([sys.executable, str(path)] + argv,
                                      capture_output=True, text=True, timeout=60)
                if proc.returncode != 0:
                    return f"{' '.join(argv)} exited {proc.returncode}"
                help_text += proc.stdout + proc.stderr
            missing = sorted(f for f in declared if f not in help_text)
            return f"flags absent from --help: {missing}" if missing else None
        self._each(check)

    def test_randomness_is_seedable(self):
        """Unreproducible output cannot be verified, so `random` implies --seed."""
        def check(path):
            src = path.read_text(encoding="utf-8")
            tree = ast.parse(src)
            if "random" not in top_level_imports(tree):
                return None
            return None if "--seed" in src else "imports random but offers no --seed"
        self._each(check)

    def test_has_module_docstring_with_example(self):
        def check(path):
            tree = ast.parse(path.read_text(encoding="utf-8"))
            doc = ast.get_docstring(tree)
            if not doc:
                return "no module docstring"
            if path.name not in doc and "python" not in doc.lower():
                return "docstring has no runnable example"
            return None
        self._each(check)

    def test_no_shell_true(self):
        def check(path):
            tree = ast.parse(path.read_text(encoding="utf-8"))
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    for kw in node.keywords:
                        if kw.arg == "shell" and isinstance(kw.value, ast.Constant) and kw.value.value is True:
                            return "uses subprocess with shell=True"
            return None
        self._each(check)

    def test_no_network_calls(self):
        """Helpers read input and print output. Nothing here should dial out."""
        banned = {"urlopen", "urlretrieve", "socket"}
        def check(path):
            tree = ast.parse(path.read_text(encoding="utf-8"))
            hits = set()
            for node in ast.walk(tree):
                if isinstance(node, ast.Attribute) and node.attr in banned:
                    hits.add(node.attr)
                if isinstance(node, ast.Name) and node.id in banned:
                    hits.add(node.id)
            return f"appears to make network calls: {sorted(hits)}" if hits else None
        self._each(check)


if __name__ == "__main__":
    unittest.main(verbosity=2)
