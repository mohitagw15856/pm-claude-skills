#!/usr/bin/env python3
"""Check a list of flashcards and export it as tab-separated files for import.

Cards are a JSON list. A basic card has "front" and "back"; a cloze card has
"cloze" with at least one {{c1::gap}}. Either may carry a "tag".

  [{"front": "What lowers activation energy?", "back": "An enzyme", "tag": "enzymes"},
   {"cloze": "The powerhouse of the cell is the {{c1::mitochondrion}}.", "tag": "cells"}]

Example:
  python3 flashcards.py check cards.json
  python3 flashcards.py export cards.json --out deck.tsv

Export writes deck.tsv for basic cards and, when there are cloze cards,
deck-cloze.tsv beside it, because the two note types are imported separately.
Tabs, quotes and line breaks inside a card are made safe so they cannot shift
a column or split a card.
"""
import argparse
import html
import json
import re
import sys
from pathlib import Path

CLOZE_RE = re.compile(r"\{\{c\d+::.+?\}\}")
TAG_BAD = re.compile(r"[^\w\-:]+", re.UNICODE)
LONG_FRONT = 200
LONG_BACK = 300


def load(path):
    try:
        raw = json.loads(Path(path).read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path} is not valid JSON: {exc}") from exc
    if not isinstance(raw, list) or not raw:
        raise ValueError("the card file must be a non-empty JSON list")
    cards = []
    for i, item in enumerate(raw, start=1):
        if not isinstance(item, dict):
            raise ValueError(f"card {i}: must be an object")
        for key in ("front", "back", "cloze", "tag"):
            if key in item and not isinstance(item[key], str):
                raise ValueError(f"card {i}: '{key}' must be text")
        has_cloze = bool(item.get("cloze", "").strip())
        has_basic = bool(item.get("front", "").strip()) or bool(item.get("back", "").strip())
        if has_cloze and has_basic:
            raise ValueError(f"card {i}: use either front and back, or cloze, not both")
        cards.append({"n": i, "front": item.get("front", "").strip(), "back": item.get("back", "").strip(),
                      "cloze": item.get("cloze", "").strip(), "tag": item.get("tag", "").strip()})
    return cards


def problems(cards):
    """Things a student should fix before studying. Each is (card number, level, message)."""
    found = []
    seen = {}
    for c in cards:
        n = c["n"]
        if c["cloze"]:
            if not CLOZE_RE.search(c["cloze"]):
                found.append((n, "error", "cloze card has no {{c1::gap}}"))
            key = ("cloze", c["cloze"].lower())
        else:
            if not c["front"]:
                found.append((n, "error", "front is empty"))
            if not c["back"]:
                found.append((n, "error", "back is empty"))
            if len(c["front"]) > LONG_FRONT:
                found.append((n, "warning", f"front is {len(c['front'])} characters; split it into smaller cards"))
            if len(c["back"]) > LONG_BACK:
                found.append((n, "warning", f"back is {len(c['back'])} characters; a card should test one fact"))
            key = ("basic", c["front"].lower())
        if key[1]:
            if key in seen:
                found.append((n, "warning", f"same question as card {seen[key]}"))
            else:
                seen[key] = n
    return found


def field(text):
    """One import field: HTML-escaped, line breaks kept as <br>, tabs flattened."""
    text = text.replace("\r\n", "\n").replace("\r", "\n").replace("\t", " ")
    return html.escape(text, quote=False).replace("\n", "<br>")


def cloze_field(text):
    """Escape a cloze sentence but leave the {{c1::…}} markers working."""
    parts, last = [], 0
    for m in CLOZE_RE.finditer(text):
        parts.append(field(text[last:m.start()]))
        inner = m.group(0)[2:-2]
        head, _, body = inner.partition("::")
        parts.append("{{" + head + "::" + field(body) + "}}")
        last = m.end()
    parts.append(field(text[last:]))
    return "".join(parts)


def tag(text):
    """A tag is one word for the importer: spaces become hyphens, odd characters go."""
    return TAG_BAD.sub("-", text.strip()).strip("-")


def render(cards):
    basic = ["#separator:tab", "#html:true", "#tags column:3"]
    cloze = ["#separator:tab", "#html:true", "#notetype:Cloze", "#tags column:2"]
    nb = nc = 0
    for c in cards:
        if c["cloze"]:
            cloze.append(f"{cloze_field(c['cloze'])}\t{tag(c['tag'])}")
            nc += 1
        else:
            basic.append(f"{field(c['front'])}\t{field(c['back'])}\t{tag(c['tag'])}")
            nb += 1
    return ("\n".join(basic) + "\n" if nb else ""), ("\n".join(cloze) + "\n" if nc else ""), nb, nc


def main(argv=None):
    parser = argparse.ArgumentParser(description="Check and export flashcards.")
    sub = parser.add_subparsers(dest="cmd", required=True)
    check = sub.add_parser("check", help="report cards that are empty, duplicated or too long")
    check.add_argument("cards", help="path to the cards JSON file")
    export = sub.add_parser("export", help="write tab-separated import files")
    export.add_argument("cards", help="path to the cards JSON file")
    export.add_argument("--out", default="deck.tsv", help="output file for basic cards (default: deck.tsv)")
    args = parser.parse_args(argv)

    try:
        cards = load(args.cards)
        found = problems(cards)
        errors = [p for p in found if p[1] == "error"]
        for n, level, message in found:
            print(f"card {n}: {level}: {message}")
        if args.cmd == "check":
            print(f"{len(cards)} cards, {len(errors)} error(s), {len(found) - len(errors)} warning(s)")
            return 1 if errors else 0
        if errors:
            raise ValueError(f"{len(errors)} card(s) have errors; nothing was written")
        basic, cloze, nb, nc = render(cards)
        out = Path(args.out)
        written = []
        if nb:
            out.write_text(basic, encoding="utf-8")
            written.append(f"{out} ({nb} basic)")
        if nc:
            cloze_path = out.with_name(out.stem + "-cloze" + out.suffix)
            cloze_path.write_text(cloze, encoding="utf-8")
            written.append(f"{cloze_path} ({nc} cloze)")
    except (ValueError, OSError) as exc:
        parser.error(str(exc))
    print("wrote " + " and ".join(written))
    return 0


if __name__ == "__main__":
    sys.exit(main())
