#!/usr/bin/env python3
"""Scan Claude Code transcripts (JSONL) and claude.ai exports for recurring request patterns.

usage: promoter_scan.py [-h] [--min-count N] [--threshold T] [--json PATH] [--selftest] PATH [PATH ...]

Reads every *.jsonl under the given paths as Claude Code session transcripts and every
conversations.json / *.json export as a claude.ai export. Extracts the user's own turns,
redacts secrets and personal data, normalises the text, clusters by intent, and prints a
ranked markdown report with a promotability score per cluster. Stdlib only.
"""
import argparse, json, os, re, sys
from collections import Counter

STOP = set("""a an the and or but if then else for to of in on at by with from into onto over under this that these
those it its is are was were be been being have has had do does did can could should would will may might must
i me my mine we our you your they them their he she his her not no yes so as than too very just also please
help me want need like make get let us about out up down here there when where which who whom what why how
some any all each every both few more most other such only own same"""
.split())
VERBS = {"write", "draft", "summarise", "summarize", "review", "rewrite", "explain", "plan", "list", "convert",
         "generate", "create", "fix", "translate", "outline", "compare", "rank", "prioritise", "prioritize",
         "estimate", "debug", "refactor", "document", "analyse", "analyze", "decode", "prepare", "prep", "turn"}
REDACT = [
    (re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+"), "[email]"),
    (re.compile(r"\b(?:sk|pk|rk|ghp|gho|xox[bap]|AKIA|vck)[-_][A-Za-z0-9_-]{8,}"), "[api-key]"),
    (re.compile(r"\b[A-Fa-f0-9]{32,}\b"), "[hex-token]"),
    (re.compile(r"\b(?:\d[ -]?){13,19}\b"), "[card]"),
    (re.compile(r"\b\d{3}-\d{2}-\d{4}\b"), "[ssn]"),
    (re.compile(r"\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b"), "[iban]"),
    (re.compile(r"\b(?:\+?\d[\d\s().-]{8,}\d)\b"), "[phone]"),
    (re.compile(r"https?://[^\s)]+"), "[url]"),
    (re.compile(r"(?i)(password|passwd|secret|token|bearer)\s*[:=]\s*\S+"), r"\1: [redacted]"),
]


def redact(text):
    for rx, rep in REDACT:
        text = rx.sub(rep, text)
    return text


def user_turns_from_jsonl(path):
    out = []
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            if row.get("type") != "user":
                continue
            msg = row.get("message", {})
            content = msg.get("content", "")
            if isinstance(content, list):
                content = " ".join(b.get("text", "") for b in content if isinstance(b, dict) and b.get("type") == "text")
            content = str(content).strip()
            if content and not content.startswith("<") and len(content) < 4000:
                out.append(content)
    return out


def user_turns_from_export(path):
    out = []
    try:
        with open(path, encoding="utf-8", errors="replace") as fh:
            data = json.load(fh)
    except (json.JSONDecodeError, OSError):
        return out
    convs = data if isinstance(data, list) else data.get("conversations", [])
    for conv in convs:
        for m in conv.get("chat_messages", []) or conv.get("messages", []):
            if m.get("sender") == "human" or m.get("role") == "user":
                text = str(m.get("text") or m.get("content") or "").strip()
                if text and len(text) < 4000:
                    out.append(text)
    return out


def collect(paths):
    turns = []
    for p in paths:
        if os.path.isdir(p):
            for root, _, files in os.walk(p):
                for f in files:
                    fp = os.path.join(root, f)
                    if f.endswith(".jsonl"):
                        turns += user_turns_from_jsonl(fp)
                    elif f.endswith(".json"):
                        turns += user_turns_from_export(fp)
        elif p.endswith(".jsonl"):
            turns += user_turns_from_jsonl(p)
        elif p.endswith(".json"):
            turns += user_turns_from_export(p)
    return turns


def terms(text):
    words = re.findall(r"[a-z][a-z0-9'-]{2,}", text.lower())
    return [w for w in words if w not in STOP]


def signature(text):
    ts = terms(text)
    verb = next((w for w in ts if w in VERBS), None)
    nouns = [w for w in ts if w not in VERBS][:6]
    return verb, set(ts), nouns


def jaccard(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def cluster(turns, threshold):
    clusters = []  # each: {"verb", "terms", "items"}
    for t in turns:
        verb, ts, _ = signature(t)
        best, best_sim = None, 0.0
        for c in clusters:
            sim = jaccard(ts, c["terms"])
            if c["verb"] and verb and c["verb"] != verb:
                sim *= 0.6
            if sim > best_sim:
                best, best_sim = c, sim
        if best is not None and best_sim >= threshold:
            best["items"].append(t)
            best["terms"] = best["terms"] | ts if len(best["items"]) < 3 else best["terms"] & ts or best["terms"]
        else:
            clusters.append({"verb": verb, "terms": ts, "items": [t]})
    return clusters


def score(c, total):
    n = len(c["items"])
    freq = min(1.0, n / max(3, total * 0.15))
    sims = []
    for i in range(min(n, 8)):
        for j in range(i + 1, min(n, 8)):
            sims.append(jaccard(set(terms(c["items"][i])), set(terms(c["items"][j]))))
    consistency = sum(sims) / len(sims) if sims else 0.0
    cues = sum(1 for t in c["items"] if re.search(r"(?i)\b(from|given|using|into|as a|format|table|bullets|markdown)\b", t)) / n
    s = round(100 * (0.5 * freq + 0.3 * consistency + 0.2 * cues))
    return s, round(freq, 2), round(consistency, 2), round(cues, 2)


def label(c):
    verbs = Counter(w for t in c["items"] for w in terms(t) if w in VERBS)
    verb = verbs.most_common(1)[0][0] if verbs else (c["verb"] or "handle")
    common = Counter(w for t in c["items"] for w in set(terms(t)) if w not in VERBS)
    top = [w for w, _ in common.most_common(3)]
    return f"{verb} {' '.join(top)}".strip()


def report(turns, clusters, min_count):
    total = len(turns)
    rows = []
    for c in clusters:
        if len(c["items"]) < min_count:
            continue
        s, freq, cons, cues = score(c, total)
        rows.append((s, c, freq, cons, cues))
    rows.sort(key=lambda r: (-r[0], -len(r[1]["items"])))
    lines = ["# Promoter scan", "", f"{total} user turns scanned, {len(clusters)} intent clusters, {len(rows)} recurring (min {min_count}).", "",
             "| # | Pattern | Times | Score | Frequency | Consistency | Clear I/O |", "|---:|---|---:|---:|---:|---:|---:|"]
    for i, (s, c, freq, cons, cues) in enumerate(rows, 1):
        lines.append(f"| {i} | {label(c)} | {len(c['items'])} | **{s}** | {freq} | {cons} | {cues} |")
    lines.append("")
    for i, (s, c, freq, cons, cues) in enumerate(rows, 1):
        lines.append(f"## {i}. {label(c)}  (score {s}, {len(c['items'])} times)")
        lines.append("")
        lines.append("Example prompts (redacted):")
        for t in c["items"][:3]:
            lines.append(f"- {redact(t)[:220]}")
        verdict = "promote: high frequency, low variation" if s >= 60 else "maybe: recurring but the asks vary" if s >= 35 else "leave: too rare or too varied"
        lines.append(f"\nVariation: {'low' if cons >= 0.5 else 'medium' if cons >= 0.3 else 'high'}. Verdict: {verdict}.")
        lines.append("")
    data = [{"rank": i, "pattern": label(c), "count": len(c["items"]), "score": s, "frequency": freq, "consistency": cons, "clear_io": cues,
             "examples": [redact(t) for t in c["items"][:5]]} for i, (s, c, freq, cons, cues) in enumerate(rows, 1)]
    return "\n".join(lines), data


def selftest():
    ok = 0
    r = redact("mail me at bob@example.com, key sk-abcdefghijklmnop, card 4111 1111 1111 1111, password: hunter2")
    assert "[email]" in r and "[api-key]" in r and "[card]" in r and "hunter2" not in r, r
    ok += 1
    turns = ["write release notes from this git log", "draft the release notes for v3 from the git log",
             "turn this git log into release notes", "summarise this thread into decisions", "summarise the thread as decisions and owners",
             "what is the weather"]
    cl = cluster(turns, 0.25)
    assert any(len(c["items"]) >= 3 for c in cl), [len(c["items"]) for c in cl]
    ok += 1
    md, data = report(turns, cl, 2)
    assert data and data[0]["count"] >= 3 and "release" in data[0]["pattern"], data[:1]
    ok += 1
    print(f"promoter_scan self-test: {ok} passed")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Rank recurring request patterns in Claude Code transcripts and claude.ai exports.")
    ap.add_argument("paths", nargs="*", help="transcript files or folders (*.jsonl, conversations.json)")
    ap.add_argument("--min-count", type=int, default=3, help="minimum occurrences to report (default 3)")
    ap.add_argument("--threshold", type=float, default=0.25, help="cluster similarity threshold 0-1 (default 0.25)")
    ap.add_argument("--json", help="also write the ranked clusters as JSON to this path")
    ap.add_argument("--selftest", action="store_true", help="run the built-in checks and exit")
    a = ap.parse_args()
    if a.selftest:
        return selftest()
    if not a.paths:
        ap.error("give at least one transcript path (or --selftest)")
    turns = collect(a.paths)
    if not turns:
        print("No user turns found. Expected Claude Code *.jsonl transcripts or a claude.ai conversations.json export.", file=sys.stderr)
        return 1
    clusters = cluster(turns, a.threshold)
    md, data = report(turns, clusters, a.min_count)
    print(md)
    if a.json:
        with open(a.json, "w", encoding="utf-8") as fh:
            json.dump({"turns": len(turns), "clusters": data}, fh, indent=1)
    return 0


if __name__ == "__main__":
    sys.exit(main())
