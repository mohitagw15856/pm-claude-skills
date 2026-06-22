#!/usr/bin/env python3
"""Deterministic recall over a Professional Brain folder — no embeddings, just grep.

Searches every markdown file under a brain/ directory for a query and returns the
matching lines with their file, line number, and any detected provenance tag
(``[data]``, ``[interview]``, ``[external]``, ``[verbal]``, ``[hunch]``). This keeps
recall transparent and auditable: the skill synthesises an answer on top of these
grounded matches rather than guessing.

Examples:
    # Plain-text matches, strongest-provenance first
    python3 brain_query.py ./brain "activation"

    # Restrict to one section of the brain
    python3 brain_query.py ./brain "SSO" --section decisions

    # JSON for chaining into another step
    python3 brain_query.py ./brain "enterprise" --json

Standard library only. Reads files, prints results — never writes or touches the network.
"""
import argparse
import json
import os
import re
import sys

# Provenance tags ordered strongest → weakest, so results can be ranked by evidence strength.
TAGS = ["data", "interview", "external", "verbal", "hunch"]
TAG_RE = re.compile(r"\[(" + "|".join(TAGS) + r")\]", re.IGNORECASE)


def find_tag(line):
    """Return the strongest provenance tag present in a line, or None."""
    found = {m.group(1).lower() for m in TAG_RE.finditer(line)}
    for tag in TAGS:  # TAGS is already strongest-first
        if tag in found:
            return tag
    return None


def search(brain_dir, query, section=None):
    matches = []
    root = os.path.join(brain_dir, section) if section else brain_dir
    if not os.path.isdir(root):
        sys.stderr.write("No such brain directory: %s\n" % root)
        sys.exit(2)
    needle = query.lower()
    for dirpath, _dirs, files in os.walk(root):
        for name in sorted(files):
            if not name.endswith(".md"):
                continue
            path = os.path.join(dirpath, name)
            try:
                with open(path, "r", encoding="utf-8") as fh:
                    for lineno, line in enumerate(fh, 1):
                        if needle in line.lower():
                            text = line.strip()
                            matches.append({
                                "file": os.path.relpath(path, brain_dir),
                                "line": lineno,
                                "tag": find_tag(text),
                                "text": text,
                            })
            except (OSError, UnicodeDecodeError):
                continue
    # Rank: tagged matches first, by provenance strength; untagged last.
    strength = {t: i for i, t in enumerate(TAGS)}
    matches.sort(key=lambda m: strength.get(m["tag"], len(TAGS)))
    return matches


def main():
    ap = argparse.ArgumentParser(description="Deterministic recall over a Professional Brain folder.")
    ap.add_argument("brain", help="Path to the brain/ directory")
    ap.add_argument("query", help="Word or phrase to recall")
    ap.add_argument("--section", help="Limit to one subfolder (e.g. decisions, hypotheses)")
    ap.add_argument("--json", action="store_true", help="Emit JSON instead of text")
    args = ap.parse_args()

    results = search(args.brain, args.query, args.section)

    if args.json:
        print(json.dumps({"query": args.query, "count": len(results), "matches": results}, indent=2))
        return

    if not results:
        print('No matches for "%s". The brain may not know this yet — say so rather than inventing.' % args.query)
        return

    print('Recall: "%s" — %d match(es), strongest provenance first\n' % (args.query, len(results)))
    for m in results:
        tag = "[%s]" % m["tag"] if m["tag"] else "[untagged]"
        print("  %-10s %s:%d" % (tag, m["file"], m["line"]))
        print("             %s" % m["text"])


if __name__ == "__main__":
    main()
