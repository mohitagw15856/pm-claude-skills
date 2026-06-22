#!/usr/bin/env python3
"""Dry-run preview + risk classification for a proposed actions plan — the gate before any
external action (open a ticket, post a message, etc.) is executed.

This script NEVER executes anything. It reads a JSON plan, prints a readable preview, classifies
each action's risk, and exits non-zero if a high-risk (outbound/destructive) action is present
without --allow-high — so the skill must surface and get explicit approval for the scary ones.
Execution itself is delegated to whatever action MCP is connected (GitHub, Composio, Linear…);
this is the "show the plan, hold the gate" half.

Plan shape (JSON array, via file arg or stdin):
    [
      {"target": "github", "op": "create_issue", "repo": "acme/app",
       "title": "Set up status page", "why": "launch checklist item", "args": {...}},
      {"target": "slack", "op": "post_message", "channel": "#launch", "args": {...}}
    ]

Usage:
    python3 action_preview.py plan.json
    echo '[...]' | python3 action_preview.py -
    python3 action_preview.py plan.json --allow-high   # after the user approved the risky ones

Standard library only. Reads a plan, prints a preview — no network, no side effects.
"""
import argparse
import json
import re
import sys

# Risk by operation verb. Outbound/destructive default to HIGH and require explicit approval.
HIGH = re.compile(r"(delete|remove|close|merge|deploy|release|send|email|post|dm|publish|archive|revoke|pay|charge|refund)", re.I)
MED = re.compile(r"(create|open|add|file|new|update|edit|invite|assign)", re.I)


def risk_of(op):
    op = op or ""
    if HIGH.search(op):
        return "high"
    if MED.search(op):
        return "medium"
    return "low"


def load(src):
    raw = sys.stdin.read() if src in ("-", None) else open(src, "r", encoding="utf-8").read()
    plan = json.loads(raw)
    if isinstance(plan, dict):
        plan = plan.get("actions", [plan])
    if not isinstance(plan, list):
        raise ValueError("plan must be a JSON array of actions")
    return plan


def summarize(a):
    bits = [a.get("target", "?") + " · " + a.get("op", "?")]
    for k in ("repo", "channel", "title", "name", "to"):
        if a.get(k):
            bits.append("%s=%s" % (k, a[k]))
    return " | ".join(bits)


def main():
    ap = argparse.ArgumentParser(description="Dry-run preview + risk gate for an actions plan.")
    ap.add_argument("plan", nargs="?", default="-", help="Path to a JSON plan, or - for stdin")
    ap.add_argument("--allow-high", action="store_true", help="Proceed even if high-risk actions are present (use only after explicit approval)")
    args = ap.parse_args()

    try:
        plan = load(args.plan)
    except Exception as e:  # noqa
        sys.stderr.write("Could not read plan: %s\n" % e)
        sys.exit(2)

    if not plan:
        print("No actions proposed.")
        return

    icon = {"low": "🟢", "medium": "🟡", "high": "🔴"}
    highs = []
    print("DRY RUN — proposed actions (nothing executed):\n")
    for i, a in enumerate(plan, 1):
        r = a.get("risk") or risk_of(a.get("op"))
        if r == "high":
            highs.append(i)
        print("  %d. %s %s" % (i, icon.get(r, "⚪"), summarize(a)))
        if a.get("why"):
            print("       why: %s" % a["why"])
    counts = {}
    for a in plan:
        r = a.get("risk") or risk_of(a.get("op"))
        counts[r] = counts.get(r, 0) + 1
    print("\nSummary: %d action(s) — %s" % (len(plan), ", ".join("%s %s" % (counts[k], k) for k in ("low", "medium", "high") if counts.get(k))))

    if highs and not args.allow_high:
        print("\n🔴 %d high-risk (outbound/destructive) action(s): %s" % (len(highs), highs))
        print("These need explicit, per-action approval before executing. Re-run with --allow-high once approved.")
        sys.exit(1)
    print("\nApproved to execute via the connected action MCP. Record each executed action back to the brain.")


if __name__ == "__main__":
    main()
