#!/usr/bin/env python3
"""pm-skills-router: a small, dependency-free skill router for the PM Skills library.

Given a request in English or Chinese, it returns the best-matching skills. It is a
TF-IDF nearest-centroid model: word unigrams and bigrams for Latin text, character
bigrams for Chinese, one weighted centroid per skill built from the skill's trigger
phrases (dataset/routing.jsonl), its description, and its Simplified Chinese
description where a translation exists. Standard library only.

    python pm_router.py train --repo . --out router.json      # build + evaluate
    python pm_router.py route "帮我写周报" --model router.json  # top matches

    from pm_router import Router
    Router.load("router.json").route("prepare my promotion defence", k=3)
"""
import json
import math
import os
import random
import re
import sys
from collections import Counter, defaultdict

STOP = set("""a an and are as at be by can do does for from get help how i in into is it its me my
need of on or our please should so that the their them this to us use want we what when which
with write you your""".split())
LATIN = re.compile(r"[a-z0-9][a-z0-9+#.-]*")
CJK = re.compile(r"[㐀-鿿]+")
MAX_FEATURES = 80  # per skill centroid, after weighting


def tokens(text):
    """Latin word unigrams and bigrams, plus CJK character bigrams (unigram for a lone character)."""
    text = text.lower()
    words = [w.strip(".-") for w in LATIN.findall(text)]
    words = [w for w in words if len(w) > 1 and w not in STOP]
    out = list(words) + [a + "_" + b for a, b in zip(words, words[1:])]
    for run in CJK.findall(text):
        out += [run] if len(run) == 1 else [run[i:i + 2] for i in range(len(run) - 1)]
    return out


def _frontmatter_description(path):
    try:
        with open(path, encoding="utf-8") as f:
            head = f.read(6000).replace("\r\n", "\n")
    except OSError:
        return ""
    m = re.search(r'^description:\s*"?(.*?)"?\s*$', head.split("\n---", 1)[0], re.M)
    return m.group(1) if m else ""


def load_corpus(repo):
    """{skill: [(text, weight), ...]} from routing phrases and descriptions."""
    corpus = defaultdict(list)
    skills_dir = os.path.join(repo, "skills")
    try:
        with open(os.path.join(repo, "data", "zh-aliases.json"), encoding="utf-8") as f:
            aliases = json.load(f).get("aliases", {})
    except (OSError, ValueError):
        aliases = {}
    for name in sorted(os.listdir(skills_dir)):
        desc = _frontmatter_description(os.path.join(skills_dir, name, "SKILL.md"))
        if not desc:
            continue
        corpus[name].append((name.replace("-", " "), 1.0))
        corpus[name].append((desc, 1.0))
        zh = (_frontmatter_description(os.path.join(repo, "skills-i18n", "zh", name, "SKILL.md"))
              or _frontmatter_description(os.path.join(repo, "skills-i18n", "zh-TW", name, "SKILL.md"))
              or aliases.get(name, ""))
        if zh:
            corpus[name].append((zh, 1.0))
    routing = []
    with open(os.path.join(repo, "dataset", "routing.jsonl"), encoding="utf-8") as f:
        for line in f:
            msgs = json.loads(line)["messages"]
            user = next(m["content"] for m in msgs if m["role"] == "user")
            skill = next(m["content"] for m in msgs if m["role"] == "assistant").strip()
            if skill in corpus:
                routing.append((user, skill))
    return corpus, routing


def fit(corpus, phrases):
    """Build idf and pruned, L2-normalised centroids. phrases: [(text, skill)] weighted 2x."""
    docs = {s: list(items) for s, items in corpus.items()}
    for text, skill in phrases:
        docs[skill].append((text, 2.0))
    df = Counter()
    for items in docs.values():
        df.update(set(t for text, _ in items for t in tokens(text)))
    n = len(docs)
    idf = {t: math.log((1 + n) / (1 + c)) + 1.0 for t, c in df.items()}
    centroids = {}
    for skill, items in docs.items():
        v = Counter()
        for text, w in items:
            tf = Counter(tokens(text))
            for t, c in tf.items():
                v[t] += w * (1 + math.log(c)) * idf[t]
        top = v.most_common(MAX_FEATURES)
        norm = math.sqrt(sum(x * x for _, x in top)) or 1.0
        centroids[skill] = {t: round(x / norm, 5) for t, x in top}
    used = set(t for c in centroids.values() for t in c)
    return {"version": 1, "idf": {t: round(idf[t], 4) for t in used}, "centroids": centroids}


class Router:
    def __init__(self, model):
        self.idf = model["idf"]
        self.index = defaultdict(list)
        for skill, vec in model["centroids"].items():
            for t, w in vec.items():
                self.index[t].append((skill, w))

    @classmethod
    def load(cls, path):
        with open(path, encoding="utf-8") as f:
            return cls(json.load(f))

    def route(self, text, k=5):
        """Return [(skill, score)] best first. Score is cosine similarity in [0, 1]."""
        tf = Counter(t for t in tokens(text) if t in self.idf)
        q = {t: (1 + math.log(c)) * self.idf[t] for t, c in tf.items()}
        norm = math.sqrt(sum(x * x for x in q.values())) or 1.0
        scores = Counter()
        for t, x in q.items():
            for skill, w in self.index[t]:
                scores[skill] += (x / norm) * w
        return [(s, round(v, 4)) for s, v in scores.most_common(k)]


def _accuracy(router, cases):
    top1 = top3 = 0
    for text, skill in cases:
        got = [s for s, _ in router.route(text, k=3)]
        top1 += bool(got) and got[0] == skill
        top3 += skill in got
    n = len(cases) or 1
    return round(top1 / n, 3), round(top3 / n, 3), len(cases)


def evaluate(corpus, routing, repo):
    """Hold out one routing phrase per skill that has two or more; also test on Chinese eval inputs."""
    rng = random.Random(7)
    by_skill = defaultdict(list)
    for text, skill in routing:
        by_skill[skill].append(text)
    held, train = [], []
    for skill, texts in by_skill.items():
        texts = texts[:]
        rng.shuffle(texts)
        if len(texts) >= 2:
            held.append((texts[0], skill))
            texts = texts[1:]
        train += [(t, skill) for t in texts]
    router = Router(fit(corpus, train))
    report = {"held_out_phrases": dict(zip(("top1", "top3", "n"), _accuracy(router, held)))}
    cases_path = os.path.join(repo, "evals", "cases.json")
    if os.path.exists(cases_path):
        with open(cases_path, encoding="utf-8") as f:
            cases = json.load(f)["cases"]
        zh = [(c["input"], c["skill"]) for c in cases if CJK.search(c.get("input", "")) and c["skill"] in corpus]
        report["chinese_eval_inputs"] = dict(zip(("top1", "top3", "n"), _accuracy(router, zh)))
    return report


def main(argv):
    if len(argv) >= 2 and argv[1] == "train":
        repo = argv[argv.index("--repo") + 1] if "--repo" in argv else "."
        out = argv[argv.index("--out") + 1] if "--out" in argv else "router.json"
        corpus, routing = load_corpus(repo)
        report = evaluate(corpus, routing, repo)
        model = fit(corpus, routing)
        model["skills"] = len(model["centroids"])
        model["evaluation"] = report
        with open(out, "w", encoding="utf-8") as f:
            json.dump(model, f, ensure_ascii=False, separators=(",", ":"))
        print(json.dumps({"skills": model["skills"], "features": len(model["idf"]), **report}, ensure_ascii=False, indent=2))
        return 0
    if len(argv) >= 3 and argv[1] == "route":
        path = argv[argv.index("--model") + 1] if "--model" in argv else "router.json"
        for skill, score in Router.load(path).route(argv[2], k=5):
            print(f"{score:.3f}  {skill}")
        return 0
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
