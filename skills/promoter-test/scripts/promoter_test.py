#!/usr/bin/env python3
"""Test a skill's trigger description against positive and negative phrases.

usage: promoter_test.py [-h] [--threshold T] [--rewrite] [--selftest] SKILL_MD EVALS_JSON

EVALS_JSON: {"should_fire": [...], "should_not_fire": [...], "golden": [{"input": ..., "expect": [...]}]}
Scores each phrase against the SKILL.md description with the same keyword overlap the
library's suggest-skill hook uses, predicts "fires" above the threshold, and reports
precision and recall. --rewrite proposes an amended "Use when" clause that adds the missed
trigger terms and drops terms that only occur in the negatives. Stdlib only.
"""
import argparse, json, re, sys

STOP = set("a an the and or but if for to of in on at by with from into this that these those it its is are was were be i me my we our you your they them their he she his her not no so as than too very just also please help want need like make get let about out up down here there when where which who what why how some any all each every both more most other such only own same can could should would will".split())


def terms(text):
    return {w for w in re.findall(r"[a-z][a-z0-9'-]{2,}", text.lower()) if w not in STOP}


def description_of(md):
    m = re.search(r'^description:\s*"?(.*?)"?\s*$', md, re.M | re.S)
    if not m:
        return ""
    d = m.group(1)
    return d.split("\n---")[0].strip().strip('"')


def fires(phrase, desc_terms, threshold):
    ts = terms(phrase)
    if not ts:
        return False, 0.0
    hit = len(ts & desc_terms) / len(ts)
    return hit >= threshold, round(hit, 2)


def evaluate(desc, evals, threshold):
    dt = terms(desc)
    tp = [p for p in evals.get("should_fire", []) if fires(p, dt, threshold)[0]]
    fn = [p for p in evals.get("should_fire", []) if not fires(p, dt, threshold)[0]]
    fp = [p for p in evals.get("should_not_fire", []) if fires(p, dt, threshold)[0]]
    tn = [p for p in evals.get("should_not_fire", []) if not fires(p, dt, threshold)[0]]
    precision = len(tp) / (len(tp) + len(fp)) if (tp or fp) else 0.0
    recall = len(tp) / (len(tp) + len(fn)) if (tp or fn) else 0.0
    return {"precision": round(precision, 2), "recall": round(recall, 2), "tp": tp, "fn": fn, "fp": fp, "tn": tn}


def rewrite(desc, evals):
    dt = terms(desc)
    pos = [terms(p) for p in evals.get("should_fire", [])]
    neg = [terms(p) for p in evals.get("should_not_fire", [])]
    pos_all = set().union(*pos) if pos else set()
    neg_all = set().union(*neg) if neg else set()
    missing = sorted(w for w in pos_all - dt if sum(w in p for p in pos) >= 2 and w not in neg_all)
    noisy = sorted(w for w in dt & neg_all if w not in pos_all)
    add = ", ".join(missing[:8])
    new = desc
    if add:
        if "Use when" in new:
            new = re.sub(r"(Use when[^.]*)", lambda m: m.group(1) + f", or when the ask mentions {add}", new, count=1)
        else:
            new = new.rstrip(". ") + f". Use when the ask mentions {add}."
    return new, missing, noisy


def selftest():
    md = 'name: x\ndescription: "Turn a git log into release notes. Use when asked for release notes, a changelog entry, or to summarise commits. Produces a grouped changelog."\n---\n'
    evals = {"should_fire": ["write release notes from this git log", "changelog entry from these commits", "turn the commits into release notes", "release notes for v3"],
             "should_not_fire": ["what is the weather", "fix the failing test", "write a haiku about deploys", "explain this regex"]}
    r = evaluate(description_of(md), evals, 0.34)
    assert r["precision"] >= 0.8 and r["recall"] >= 0.75, r
    new, missing, noisy = rewrite(description_of(md), {"should_fire": ["draft the announcement post for the launch", "announcement post from release notes"], "should_not_fire": []})
    assert "announcement" in new, new
    print("promoter_test self-test: 2 passed")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Precision/recall of a skill's trigger description against labelled phrases.")
    ap.add_argument("skill_md", nargs="?", help="path to SKILL.md")
    ap.add_argument("evals_json", nargs="?", help="path to evals.json")
    ap.add_argument("--threshold", type=float, default=0.34, help="share of a phrase's terms that must appear in the description (default 0.34)")
    ap.add_argument("--rewrite", action="store_true", help="propose an amended description when precision or recall is below 0.8")
    ap.add_argument("--selftest", action="store_true", help="run the built-in checks and exit")
    a = ap.parse_args()
    if a.selftest:
        return selftest()
    if not (a.skill_md and a.evals_json):
        ap.error("give SKILL_MD and EVALS_JSON (or --selftest)")
    md = open(a.skill_md, encoding="utf-8").read()
    evals = json.load(open(a.evals_json, encoding="utf-8"))
    desc = description_of(md)
    r = evaluate(desc, evals, a.threshold)
    print(f"precision {r['precision']}  recall {r['recall']}  (threshold {a.threshold})")
    for k, title in (("fn", "missed (should fire, did not)"), ("fp", "false alarms (fired, should not)")):
        if r[k]:
            print(f"\n{title}:")
            for p in r[k]:
                print(f"  - {p}")
    if a.rewrite and (r["precision"] < 0.8 or r["recall"] < 0.8):
        new, missing, noisy = rewrite(desc, evals)
        r2 = evaluate(new, evals, a.threshold)
        print(f"\nproposed description (precision {r2['precision']}, recall {r2['recall']}):\n  {new}")
        if noisy:
            print(f"terms that only appear in negatives, consider removing: {', '.join(noisy)}")
    return 0 if r["precision"] >= 0.8 else 2


if __name__ == "__main__":
    sys.exit(main())
