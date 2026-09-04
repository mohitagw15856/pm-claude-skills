#!/usr/bin/env python3
"""decision_tree — roll back a decision tree to expected values, with sensitivity.

Takes a tree of decision / chance / outcome nodes, computes the expected value
of every branch by backward induction, names the best choice at each decision,
and — for two-branch chance nodes — finds the break-even probability at which
the recommended decision would flip. Deterministic, standard library only.

Examples:
    python3 decision_tree.py --demo
    python3 decision_tree.py --input tree.json
    python3 decision_tree.py --input tree.json --json

Input JSON shape (probabilities on chance children must sum to 1):
    {"type": "decision", "name": "Lawsuit",
     "children": [
       {"name": "Settle", "type": "outcome", "value": -50000},
       {"name": "Go to trial", "cost": 30000, "type": "chance", "children": [
         {"name": "Win",  "prob": 0.6, "type": "outcome", "value": 0},
         {"name": "Lose", "prob": 0.4, "type": "outcome", "value": -200000}]}]}
`cost` on any node is subtracted from its expected value. No network access.
"""

import argparse
import json
import sys


def rollback(node, path=""):
    """Backward induction. Returns (ev, annotated_node)."""
    kind = node.get("type")
    name = node.get("name", "?")
    here = f"{path}/{name}"
    cost = float(node.get("cost", 0))

    if kind == "outcome":
        ev = float(node["value"]) - cost
        return ev, {"name": name, "type": kind, "ev": round(ev, 2)}

    if kind == "chance":
        kids = node.get("children", [])
        if not kids:
            raise ValueError(f"chance node {here} has no children")
        probs = [float(k.get("prob", -1)) for k in kids]
        if any(p < 0 for p in probs):
            raise ValueError(f"chance node {here}: every child needs a prob")
        if abs(sum(probs) - 1.0) > 1e-6:
            raise ValueError(f"chance node {here}: probs sum to {sum(probs)}, not 1")
        sub = [rollback(k, here) for k in kids]
        ev = sum(p * s[0] for p, s in zip(probs, sub)) - cost
        return ev, {"name": name, "type": kind, "ev": round(ev, 2),
                    "children": [dict(s[1], prob=p) for p, s in zip(probs, sub)]}

    if kind == "decision":
        kids = node.get("children", [])
        if not kids:
            raise ValueError(f"decision node {here} has no children")
        sub = [rollback(k, here) for k in kids]
        # Ties break toward the earlier-listed option, so output is reproducible.
        best_i = max(range(len(sub)), key=lambda i: (sub[i][0], -i))
        ev = sub[best_i][0] - cost
        return ev, {"name": name, "type": kind, "ev": round(ev, 2),
                    "best": kids[best_i].get("name", "?"),
                    "children": [s[1] for s in sub]}

    raise ValueError(f"unknown node type {kind!r} at {here}")


def _with_prob(tree, target, p):
    """Copy of tree with the two-branch chance node `target` set to (p, 1-p)."""
    node = json.loads(json.dumps(tree))

    def walk(n):
        if n.get("type") == "chance" and n.get("name") == target and len(n.get("children", [])) == 2:
            n["children"][0]["prob"] = p
            n["children"][1]["prob"] = 1 - p
        for k in n.get("children", []):
            walk(k)
    walk(node)
    return node


def sensitivity(tree, annotated):
    """For each 2-branch chance node, scan p in [0,1] for where the root
    decision's best choice flips. Coarse (0.001 steps) but honest about it."""
    if annotated.get("type") != "decision":
        return []
    base_best = annotated["best"]
    targets = []

    def collect(n):
        if n.get("type") == "chance" and len(n.get("children", [])) == 2:
            targets.append(n["name"])
        for k in n.get("children", []):
            collect(k)
    collect(tree)

    out = []
    for t in targets:
        flip = None
        for i in range(0, 1001):
            p = i / 1000
            _, ann = rollback(_with_prob(tree, t, p))
            if ann["best"] != base_best:
                flip = p
                break
        out.append({"chance_node": t, "first_branch_prob_where_choice_flips": flip})
    return out


DEMO = {
    "type": "decision", "name": "Lawsuit",
    "children": [
        {"name": "Settle now", "type": "outcome", "value": -50000},
        {"name": "Go to trial", "type": "chance", "cost": 30000, "children": [
            {"name": "Win", "prob": 0.6, "type": "outcome", "value": 0},
            {"name": "Lose", "prob": 0.4, "type": "outcome", "value": -200000},
        ]},
    ],
}


def render(ann, indent=0):
    pad = "  " * indent
    tag = {"decision": "▣", "chance": "◔", "outcome": "•"}[ann["type"]]
    prob = f" p={ann['prob']}" if "prob" in ann else ""
    best = f"  → best: {ann['best']}" if ann.get("best") else ""
    print(f"{pad}{tag} {ann['name']}{prob}  EV={ann['ev']:,.2f}{best}")
    for k in ann.get("children", []):
        render(k, indent + 1)


def main():
    ap = argparse.ArgumentParser(
        description="Expected-value rollback for decision trees, with break-even "
                    "probability sensitivity on two-branch chance nodes.")
    ap.add_argument("--input", help="JSON tree file (see module docstring); - for stdin")
    ap.add_argument("--demo", action="store_true", help="run the built-in settle-vs-trial example")
    ap.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    ap.add_argument("--no-sensitivity", action="store_true", help="skip the break-even scan")
    args = ap.parse_args()

    if args.demo:
        tree = DEMO
    elif args.input:
        raw = sys.stdin.read() if args.input == "-" else open(args.input, encoding="utf-8").read()
        tree = json.loads(raw)
    else:
        ap.error("provide --input FILE or --demo")

    try:
        ev, ann = rollback(tree)
        sens = [] if args.no_sensitivity else sensitivity(tree, ann)
    except (KeyError, ValueError, TypeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps({"ev": round(ev, 2), "tree": ann, "sensitivity": sens}, indent=2))
        return

    render(ann)
    if sens:
        print("\nBreak-even scan (first branch of each 2-way chance node):")
        for s in sens:
            f = s["first_branch_prob_where_choice_flips"]
            print(f"  {s['chance_node']}: " + (f"choice flips at p≈{f:.3f}" if f is not None else "no flip in [0,1]"))


if __name__ == "__main__":
    main()
