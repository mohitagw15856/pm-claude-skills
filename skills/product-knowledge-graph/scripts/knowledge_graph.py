#!/usr/bin/env python3
"""Build a queryable graph from a folder of Markdown documents. No vector store.

Nodes are documents. Edges come from three places that can each be checked by
eye: Markdown links between documents, [[wiki links]], and (optionally) shared
terms from a list you supply, one term per line. Output is plain JSON.

Example:
  python3 knowledge_graph.py build docs/ --out graph.json --terms terms.txt
  python3 knowledge_graph.py neighbours graph.json "prd-checkout.md"
  python3 knowledge_graph.py orphans graph.json
"""
import argparse
import json
import os
import re
import sys
from pathlib import Path

LINK_RE = re.compile(r"(?<!\!)\[[^\]]*\]\(([^)\s]+)\)")
WIKI_RE = re.compile(r"\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]")
HEADING_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
FENCE_RE = re.compile(r"```.*?```", re.DOTALL)


def find_documents(root):
    """Markdown files under root, as sorted POSIX-style relative paths. Symlinks are not followed."""
    found = []
    for folder, dirs, files in os.walk(root, followlinks=False):
        dirs[:] = sorted(d for d in dirs if not d.startswith("."))
        for name in sorted(files):
            if name.lower().endswith(".md"):
                found.append(Path(folder, name).relative_to(root).as_posix())
    return sorted(found)


def resolve_link(root, source, target):
    """A link target as a document path inside root, or None if it points anywhere else."""
    target = target.split("#", 1)[0].split("?", 1)[0]
    if not target or re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", target) or target.startswith("/"):
        return None
    candidate = os.path.normpath(os.path.join(os.path.dirname(source), target))
    rel = Path(candidate).as_posix()
    if rel.startswith("..") or os.path.isabs(candidate) or not rel or rel == ".":
        return None
    return rel


def build_graph(root, terms=None):
    root = Path(root)
    if not root.is_dir():
        raise ValueError(f"{root} is not a folder")
    documents = find_documents(root)
    if not documents:
        raise ValueError(f"no Markdown files found under {root}")
    known = set(documents)
    by_stem = {}
    for doc in documents:
        by_stem.setdefault(Path(doc).stem.lower(), []).append(doc)
    terms = [t for t in (terms or []) if t]

    nodes, edges, mentions = [], set(), {}
    for doc in documents:
        text = (root / doc).read_text(encoding="utf-8", errors="replace").replace("\r\n", "\n")
        heading = HEADING_RE.search(text)
        prose = FENCE_RE.sub(" ", text)
        nodes.append({"id": doc, "title": heading.group(1) if heading else Path(doc).stem,
                      "words": len(prose.split())})
        for target in LINK_RE.findall(prose):
            rel = resolve_link(root, doc, target)
            if rel in known and rel != doc:
                edges.add((doc, rel, "link"))
        for name in WIKI_RE.findall(prose):
            for rel in by_stem.get(name.strip().lower(), []):
                if rel != doc:
                    edges.add((doc, rel, "wiki"))
        lowered = prose.lower()
        for term in terms:
            if re.search(r"(?<!\w)" + re.escape(term.lower()) + r"(?!\w)", lowered):
                mentions.setdefault(term, []).append(doc)

    for term in sorted(mentions):
        docs = mentions[term]
        for i, left in enumerate(docs):
            for right in docs[i + 1:]:
                edges.add((left, right, f"term:{term}"))
    return {
        "schema": "product-knowledge-graph/1",
        "nodes": nodes,
        "edges": [{"from": a, "to": b, "kind": k} for a, b, k in sorted(edges)],
        "terms": {t: sorted(d) for t, d in sorted(mentions.items())},
    }


def load_graph(path):
    try:
        graph = json.loads(Path(path).read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path} is not valid JSON: {exc}") from exc
    if not isinstance(graph, dict) or "nodes" not in graph or "edges" not in graph:
        raise ValueError(f"{path} is not a graph written by this script")
    return graph


def neighbours(graph, node):
    ids = {n["id"] for n in graph["nodes"]}
    if node not in ids:
        close = sorted(i for i in ids if node.lower() in i.lower())
        hint = f" Did you mean: {', '.join(close[:5])}?" if close else ""
        raise ValueError(f"no document called {node!r} in the graph.{hint}")
    out = sorted((e["to"], e["kind"]) for e in graph["edges"] if e["from"] == node)
    inc = sorted((e["from"], e["kind"]) for e in graph["edges"] if e["to"] == node)
    return out, inc


def orphans(graph):
    linked = {e["from"] for e in graph["edges"]} | {e["to"] for e in graph["edges"]}
    return sorted(n["id"] for n in graph["nodes"] if n["id"] not in linked)


def main(argv=None):
    parser = argparse.ArgumentParser(description="Build and query a document graph from Markdown.")
    sub = parser.add_subparsers(dest="cmd", required=True)
    build = sub.add_parser("build", help="scan a folder and write the graph")
    build.add_argument("folder", help="folder of Markdown documents")
    build.add_argument("--out", default="graph.json", help="where to write the graph (default: graph.json)")
    build.add_argument("--terms", help="text file with one term per line; documents sharing a term are connected")
    near = sub.add_parser("neighbours", help="list what a document links to and what links to it")
    near.add_argument("graph", help="graph JSON written by build")
    near.add_argument("node", help="document path as it appears in the graph")
    orphan = sub.add_parser("orphans", help="list documents with no connections")
    orphan.add_argument("graph", help="graph JSON written by build")
    args = parser.parse_args(argv)

    try:
        if args.cmd == "build":
            terms = None
            if args.terms:
                terms = [line.strip() for line in Path(args.terms).read_text(encoding="utf-8").splitlines()]
            graph = build_graph(args.folder, terms)
            Path(args.out).write_text(json.dumps(graph, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print(f"wrote {args.out}: {len(graph['nodes'])} documents, {len(graph['edges'])} edges, "
                  f"{len(orphans(graph))} orphans")
        elif args.cmd == "neighbours":
            out, inc = neighbours(load_graph(args.graph), args.node)
            print(f"{args.node} links to {len(out)}:")
            for target, kind in out:
                print(f"  -> {target}  ({kind})")
            print(f"linked from {len(inc)}:")
            for source, kind in inc:
                print(f"  <- {source}  ({kind})")
        else:
            lonely = orphans(load_graph(args.graph))
            print(f"{len(lonely)} orphan document(s)")
            for doc in lonely:
                print(f"  {doc}")
    except (ValueError, OSError) as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    sys.exit(main())
