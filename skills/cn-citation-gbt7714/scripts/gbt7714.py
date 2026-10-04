#!/usr/bin/env python3
"""Format references to GB/T 7714 (2015 edition). Standard library only.

Input: a JSON file holding a list of references, each an object with "type" and fields:
  type     J journal | M book | D thesis | C conference | S standard | R report | N newspaper | EB online
  authors  list of names ("张三" or "Smith John" or "Smith, J."); up to three are printed, then 等 / et al.
  title, journal, year, volume, issue, pages, publisher, place, school, url, accessed, doi, number, date

Usage:
  python3 gbt7714.py refs.json            numbered list (顺序编码制)
  python3 gbt7714.py refs.json --author-year
  python3 gbt7714.py --selftest

Missing required fields are flagged as 【缺失:field】 and listed on stderr; nothing is invented.
"""
import argparse
import json
import re
import sys

REQUIRED = {
    "J": ["authors", "title", "journal", "year"],
    "M": ["authors", "title", "place", "publisher", "year"],
    "D": ["authors", "title", "place", "school", "year"],
    "C": ["authors", "title", "place", "publisher", "year"],
    "S": ["title", "number", "place", "publisher", "year"],
    "R": ["authors", "title", "place", "publisher", "year"],
    "N": ["authors", "title", "journal", "date"],
    "EB": ["authors", "title", "url", "accessed"],
}
CJK = re.compile(r"[㐀-鿿]")


def is_cjk(text):
    return bool(CJK.search(text or ""))


def fmt_name(name):
    """Chinese names unchanged; Western names as SURNAME plus initials without full stops."""
    name = (name or "").strip()
    if not name or is_cjk(name):
        return name
    if "," in name:
        surname, given = [p.strip() for p in name.split(",", 1)]
    else:
        parts = name.split()
        surname, given = (parts[0], " ".join(parts[1:])) if len(parts) > 1 else (name, "")
    initials = "".join(p[0].upper() for p in re.split(r"[\s.\-]+", given) if p)
    return f"{surname.upper()} {initials}".strip()


def fmt_authors(authors, cjk):
    names = [fmt_name(a) for a in (authors or []) if str(a).strip()]
    if not names:
        return ""
    more = len(names) > 3
    shown = ", ".join(names[:3])
    return shown + ((", 等" if cjk else ", et al.") if more else "")


def entry(ref, missing):
    t = str(ref.get("type", "")).upper()
    if t not in REQUIRED:
        missing.append(f"unknown type {t!r}")
        return f"【未知文献类型:{t}】 {ref.get('title', '')}"
    get = lambda k: (str(ref.get(k)).strip() if ref.get(k) not in (None, "") else "")
    for field in REQUIRED[t]:
        if not (ref.get(field) if field != "authors" else ref.get("authors")):
            missing.append(field)
    v = lambda k: get(k) or f"【缺失:{k}】"
    cjk = is_cjk(get("title"))
    au = fmt_authors(ref.get("authors"), cjk) or ("【缺失:authors】" if "authors" in REQUIRED[t] else "")
    lead = (au if au.endswith(".") else au + ".") + " " if au else ""
    if t == "J":
        vol = get("volume") + (f"({get('issue')})" if get("issue") else "")
        tail = f"{v('journal')}, {v('year')}" + (f", {vol}" if vol else "") + (f": {get('pages')}" if get("pages") else "")
        out = f"{lead}{v('title')}[J]. {tail}."
    elif t in ("M", "C", "R"):
        out = f"{lead}{v('title')}[{t}]. {v('place')}: {v('publisher')}, {v('year')}" + (f": {get('pages')}" if get("pages") else "") + "."
    elif t == "D":
        out = f"{lead}{v('title')}[D]. {v('place')}: {v('school')}, {v('year')}."
    elif t == "S":
        out = f"{v('number')}, {v('title')}[S]. {v('place')}: {v('publisher')}, {v('year')}."
    elif t == "N":
        out = f"{lead}{v('title')}[N]. {v('journal')}, {v('date')}" + (f"({get('pages')})" if get("pages") else "") + "."
    else:  # EB
        out = f"{lead}{v('title')}[EB/OL]. " + (f"({get('date')})" if get("date") else "") + f"[{v('accessed')}]. {v('url')}."
    if get("doi"):
        out += f" DOI:{get('doi')}."
    return out


def format_all(refs, author_year=False):
    lines, problems = [], []
    if author_year:
        refs = sorted(refs, key=lambda r: (not is_cjk(str(r.get("title", ""))), fmt_authors(r.get("authors"), True), str(r.get("year", ""))))
    for i, ref in enumerate(refs, 1):
        missing = []
        text = entry(ref, missing) if isinstance(ref, dict) else "【不是一个对象】"
        lines.append(text if author_year else f"[{i}] {text}")
        if missing:
            problems.append(f"entry {i}: missing {', '.join(missing)}")
    return lines, problems


def selftest():
    refs = [
        {"type": "J", "authors": ["张三", "李四"], "title": "短视频对大学生消费行为的影响", "journal": "消费经济", "year": 2024, "volume": 40, "issue": 2, "pages": "45-53"},
        {"type": "M", "authors": ["Smith John", "Doe, Jane", "Roe Richard", "Poe Edgar"], "title": "Consumer Behaviour", "place": "London", "publisher": "Routledge", "year": 2021},
        {"type": "EB", "authors": ["国家统计局"], "title": "2025年国民经济和社会发展统计公报", "url": "https://www.stats.gov.cn", "accessed": "2026-10-04"},
        {"type": "D", "authors": ["王五"], "title": "直播电商信任机制研究", "year": 2023},
    ]
    lines, problems = format_all(refs)
    assert lines[0] == "[1] 张三, 李四. 短视频对大学生消费行为的影响[J]. 消费经济, 2024, 40(2): 45-53.", lines[0]
    assert lines[1].startswith("[2] SMITH J, DOE J, ROE R, et al. Consumer Behaviour[M]. London: Routledge, 2021."), lines[1]
    assert "[EB/OL]" in lines[2] and "[2026-10-04]" in lines[2]
    assert "【缺失:place】" in lines[3] and any("entry 4" in p for p in problems), problems
    print("gbt7714 selftest: 4 passed")


def main(argv=None):
    ap = argparse.ArgumentParser(description="Format references to GB/T 7714 (2015). Input is a JSON list of reference objects.")
    ap.add_argument("file", nargs="?", help="JSON file with a list of references")
    ap.add_argument("--author-year", action="store_true", help="use 著者-出版年制 instead of numbered 顺序编码制")
    ap.add_argument("--selftest", action="store_true", help="run built-in checks")
    args = ap.parse_args(argv)
    if args.selftest:
        selftest()
        return 0
    if not args.file:
        ap.print_help()
        return 2
    try:
        with open(args.file, encoding="utf-8") as f:
            refs = json.load(f)
    except (OSError, ValueError) as e:
        print(f"error: cannot read {args.file}: {e}", file=sys.stderr)
        return 2
    if not isinstance(refs, list):
        print("error: the file must contain a JSON list of reference objects", file=sys.stderr)
        return 2
    lines, problems = format_all(refs, args.author_year)
    print("\n".join(lines))
    for p in problems:
        print("warning: " + p, file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
