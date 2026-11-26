#!/usr/bin/env python3
"""Keep the dated evidence log for a competitor walkthrough, one entry per screen.

The log is a JSON file you can check into your notes. Each entry records when a
screen was captured, its address, what it said (quoted) and the screenshot file.
The script never opens a browser or a network connection: you, or your browser
tool, do the capturing, and this keeps the record straight.

Example:
  python3 capture_log.py init log.json --competitor "Acme" --question "Steps before first task?"
  python3 capture_log.py add log.json --flow signup --url https://example.com/signup \
      --headline "Start free" --action "Create account" --fields "email,password" --shot acme-signup-01.png
  python3 capture_log.py report log.json
"""
import argparse
import datetime
import json
import re
import sys
from pathlib import Path

URL_RE = re.compile(r"^https?://[^\s]+$")


def today():
    return datetime.date.today().isoformat()


def load(path):
    try:
        log = json.loads(Path(path).read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ValueError(f"{path} does not exist; create it with: capture_log.py init {path}") from exc
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path} is not valid JSON: {exc}") from exc
    if not isinstance(log, dict) or not isinstance(log.get("entries"), list):
        raise ValueError(f"{path} is not a capture log written by this script")
    return log


def save(path, log):
    Path(path).write_text(json.dumps(log, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def clean(text):
    """One line, trimmed. Table pipes are escaped when the report is rendered, not here."""
    return " ".join(str(text or "").split())


def add_entry(log, flow, url, headline, action, fields, shot, date, note):
    if not URL_RE.match(url or ""):
        raise ValueError("--url must be a full http or https address")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", date):
        raise ValueError("--date must look like 2026-11-27")
    datetime.date.fromisoformat(date)        # rejects 2026-02-30
    field_list = [f for f in (clean(x) for x in (fields or "").split(",")) if f]
    entry = {
        "step": len(log["entries"]) + 1,
        "date": date,
        "flow": clean(flow),
        "url": url,
        "headline": clean(headline),
        "action": clean(action),
        "fields": field_list,
        "screenshot": clean(shot),
        "note": clean(note),
    }
    if not entry["flow"]:
        raise ValueError("--flow is required")
    log["entries"].append(entry)
    return entry


def cell(text):
    return str(text).replace("|", "\\|") if text else ""


def render(log):
    entries = log["entries"]
    lines = [f"# Capture: {log.get('competitor') or 'competitor'}", ""]
    if log.get("question"):
        lines += [f"**Question:** {log['question']}", ""]
    if entries:
        dates = sorted(e["date"] for e in entries)
        lines += [f"**Captured:** {dates[0]}" + (f" to {dates[-1]}" if dates[-1] != dates[0] else ""), ""]
    lines += ["## Evidence Log", "",
              "| # | Date | Flow | Address | Headline and primary action (quoted) | Fields asked for | Screenshot |",
              "|---|------|------|---------|--------------------------------------|------------------|------------|"]
    for e in entries:
        quoted = " / ".join(f'"{cell(x)}"' for x in (e["headline"], e["action"]) if x)
        lines.append(f"| {e['step']} | {e['date']} | {cell(e['flow'])} | {cell(e['url'])} | {quoted} | "
                     f"{cell(', '.join(e['fields']))} | {cell(e['screenshot'])} |")
    lines += ["", "## Counts", ""]
    flows = []
    for e in entries:
        if e["flow"] not in flows:
            flows.append(e["flow"])
    for flow in flows:
        rows = [e for e in entries if e["flow"] == flow]
        lines.append(f"- {flow}: {len(rows)} screen(s), {sum(len(e['fields']) for e in rows)} field(s) asked for")
    if not entries:
        lines.append("- nothing captured yet")
    missing = [e["step"] for e in entries if not e["screenshot"]]
    if missing:
        lines += ["", f"Entries with no screenshot: {', '.join(str(m) for m in missing)}"]
    lines += ["", "These are observations. Keep inferences in a separate table and point each one at the rows it rests on.", ""]
    return "\n".join(lines)


def main(argv=None):
    parser = argparse.ArgumentParser(description="Keep a dated evidence log for a competitor walkthrough.")
    sub = parser.add_subparsers(dest="cmd", required=True)
    init = sub.add_parser("init", help="create an empty log")
    init.add_argument("log", help="path of the log file to create")
    init.add_argument("--competitor", default="", help="the product being captured")
    init.add_argument("--question", default="", help="what the evidence is meant to answer")
    add = sub.add_parser("add", help="record one screen")
    add.add_argument("log", help="path of the log file")
    add.add_argument("--flow", required=True, help="which flow this screen belongs to, for example signup or pricing")
    add.add_argument("--url", required=True, help="the full address of the screen")
    add.add_argument("--headline", default="", help="the headline on the screen, copied exactly")
    add.add_argument("--action", default="", help="the label of the primary button, copied exactly")
    add.add_argument("--fields", default="", help="comma-separated fields the screen asks for")
    add.add_argument("--shot", default="", help="the screenshot file name")
    add.add_argument("--date", default=None, help="capture date as YYYY-MM-DD (default: today)")
    add.add_argument("--note", default="", help="anything else observed on the screen")
    report = sub.add_parser("report", help="print the log as a Markdown table with counts")
    report.add_argument("log", help="path of the log file")
    args = parser.parse_args(argv)

    try:
        if args.cmd == "init":
            if Path(args.log).exists():
                raise ValueError(f"{args.log} already exists; it was not overwritten")
            save(args.log, {"schema": "capture-log/1", "competitor": clean(args.competitor),
                            "question": clean(args.question), "created": today(), "entries": []})
            print(f"created {args.log}")
        elif args.cmd == "add":
            log = load(args.log)
            entry = add_entry(log, args.flow, args.url, args.headline, args.action, args.fields,
                              args.shot, args.date or today(), args.note)
            save(args.log, log)
            print(f"added step {entry['step']} ({entry['flow']}) dated {entry['date']}")
        else:
            print(render(load(args.log)))
    except (ValueError, OSError) as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    sys.exit(main())
