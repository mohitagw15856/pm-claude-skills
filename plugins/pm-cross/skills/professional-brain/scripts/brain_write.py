#!/usr/bin/env python3
"""Append a provenance-tagged record to a Professional Brain — the write-back half of the loop.

Append-only by design: decisions get a new numbered file; knowledge / hypotheses / stakeholders /
entities append to a named file (created if absent). Nothing is ever overwritten, so the audit
trail accretes. Pair with brain_query.py (read) to close recall → run → record.

Safety: this is the action surface, so it defaults to a DRY RUN — it prints exactly what it would
write and changes nothing. Pass --commit to actually write. The skill proposes records, the user
approves, then the skill calls this with --commit.

Examples:
    # See what would be written (default — no change):
    python3 brain_write.py ./brain decisions "Prioritise mobile over dashboard" \\
        --tag data --body "Q3 analytics: 68% of churn is mobile." --source "Q3 analytics export"

    # Actually write it:
    python3 brain_write.py ./brain decisions "Prioritise mobile over dashboard" \\
        --tag data --body "..." --source "Q3 analytics" --commit

    # Append a hypothesis:
    python3 brain_write.py ./brain hypotheses "Mobile onboarding drives retention" --tag hunch --commit

Standard library only. Reads/writes local files; never touches the network.
"""
import argparse
import datetime
import os
import re
import sys

TAGS = ["data", "interview", "external", "verbal", "hunch"]
# Sections that accrete one file per record vs. append to a single named file.
NUMBERED = {"decisions"}
SECTIONS = {"knowledge", "decisions", "hypotheses", "stakeholders", "entities"}


def slug(text):
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:60] or "entry"


def next_number(section_dir):
    n = 0
    if os.path.isdir(section_dir):
        for name in os.listdir(section_dir):
            m = re.match(r"(\d{4})-", name)
            if m:
                n = max(n, int(m.group(1)))
    return n + 1


def build_record(section, title, tag, body, source):
    stamp = datetime.date.today().isoformat()
    prov = "[%s]" % tag if tag else ""
    if section in NUMBERED:
        # A decision record (ADR-lite).
        return (
            "# %s\n\n"
            "- **Date:** %s\n"
            "- **Status:** accepted\n"
            "- **Evidence:** %s%s\n\n"
            "## Decision\n%s\n\n"
            "## Reopen when\n<!-- the condition that would make us revisit this -->\n"
            % (title, stamp, prov, (" — source: " + source) if source else "", body or title)
        )
    # An appended bullet for knowledge/hypotheses/stakeholders/entities.
    line = "- %s %s%s" % (prov, body or title, (" _(%s, %s)_" % (source, stamp)) if source else (" _(%s)_" % stamp))
    return line


def target_path(brain, section, title):
    section_dir = os.path.join(brain, section)
    if section in NUMBERED:
        return os.path.join(section_dir, "%04d-%s.md" % (next_number(section_dir), slug(title)))
    return os.path.join(section_dir, "%s.md" % slug(title))


def main():
    ap = argparse.ArgumentParser(description="Append a provenance-tagged record to a Professional Brain.")
    ap.add_argument("brain", help="Path to the brain/ directory")
    ap.add_argument("section", choices=sorted(SECTIONS), help="Where the record belongs")
    ap.add_argument("title", help="Short title / subject of the record")
    ap.add_argument("--tag", choices=TAGS, help="Provenance: %s (strongest→weakest)" % ", ".join(TAGS))
    ap.add_argument("--body", default="", help="The fact/decision text")
    ap.add_argument("--source", default="", help="Where it came from (a source/ file, a meeting, an export)")
    ap.add_argument("--commit", action="store_true", help="Actually write (default is a dry run)")
    args = ap.parse_args()

    if not os.path.isdir(args.brain):
        sys.stderr.write("No such brain directory: %s\n" % args.brain)
        sys.exit(2)
    if not args.tag:
        sys.stderr.write("Warning: no --tag given; the record will be untagged (weakest evidence).\n")

    path = target_path(args.brain, args.section, args.title)
    record = build_record(args.section, args.title, args.tag, args.body, args.source)
    exists = os.path.exists(path)
    action = "append to" if (exists and args.section not in NUMBERED) else "create"

    if not args.commit:
        print("DRY RUN — would %s %s:\n" % (action, os.path.relpath(path, args.brain)))
        print(record)
        print("\n(Re-run with --commit to write.)")
        return

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "a", encoding="utf-8") as fh:
        if exists and args.section not in NUMBERED:
            fh.write("\n" + record + "\n")
        else:
            fh.write(record + "\n")
    print("%s %s" % ("Appended to" if action == "append to" else "Wrote", os.path.relpath(path, args.brain)))


if __name__ == "__main__":
    main()
