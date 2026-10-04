#!/usr/bin/env python3
"""Detect the applicant tracking system behind a job application link.

Matches the address against known vendor patterns. It does not fetch the page:
the address is the only evidence, so an unknown address is reported as unknown
rather than guessed. Standard library only, no network access.

Usage
-----
    python3 ats_detect.py "https://jobs.lever.co/acme/1234"
    python3 ats_detect.py --json "https://acme.wd3.myworkdayjobs.com/en-US/careers/job/123"
    echo "https://boards.greenhouse.io/acme/jobs/1" | python3 ats_detect.py -
    python3 ats_detect.py --selftest
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from urllib.parse import urlsplit

# (system, host pattern, path or query pattern or None, confidence)
# Host patterns are matched against the host only, so a vendor name in a path
# or a query string cannot fake a match.
RULES = [
    ("Workday", r"(^|\.)myworkdayjobs\.com$", None, "high"),
    ("Workday", r"(^|\.)myworkdaysite\.com$", None, "high"),
    ("Greenhouse", r"(^|\.)greenhouse\.io$", None, "high"),
    ("Lever", r"(^|\.)lever\.co$", None, "high"),
    ("Ashby", r"(^|\.)ashbyhq\.com$", None, "high"),
    ("SmartRecruiters", r"(^|\.)smartrecruiters\.com$", None, "high"),
    ("iCIMS", r"(^|\.)icims\.com$", None, "high"),
    ("Oracle Taleo", r"(^|\.)taleo\.net$", None, "high"),
    ("Oracle Recruiting Cloud", r"(^|\.)oraclecloud\.com$", r"hcmUI|CandidateExperience", "high"),
    ("SAP SuccessFactors", r"(^|\.)successfactors\.(com|eu)$", None, "high"),
    ("SAP SuccessFactors", r"^jobs\.sap\.com$", None, "medium"),
    ("BambooHR", r"(^|\.)bamboohr\.com$", None, "high"),
    ("Workable", r"(^|\.)workable\.com$", None, "high"),
    ("Teamtailor", r"(^|\.)teamtailor\.com$", None, "high"),
    ("Personio", r"(^|\.)personio\.(de|com)$", None, "high"),
    ("Recruitee", r"(^|\.)recruitee\.com$", None, "high"),
    ("Jobvite", r"(^|\.)jobvite\.com$", None, "high"),
    ("Breezy HR", r"(^|\.)breezy\.hr$", None, "high"),
    ("Moka", r"(^|\.)mokahr\.com$", None, "high"),
    ("Beisen", r"(^|\.)zhiye\.com$", None, "medium"),
]

# A Greenhouse job embedded on a company's own careers page carries gh_jid.
QUERY_HINTS = [("Greenhouse", r"(^|&)gh_jid=", "medium")]


def detect(url: str) -> dict:
    text = (url or "").strip()
    if not text:
        return {"url": text, "system": None, "confidence": "unknown", "evidence": "no address given"}
    if "://" not in text:
        text = "https://" + text
    try:
        parts = urlsplit(text)
    except ValueError:
        return {"url": url, "system": None, "confidence": "unknown", "evidence": "not a valid address"}
    host = (parts.hostname or "").lower()
    if not host:
        return {"url": url, "system": None, "confidence": "unknown", "evidence": "no host in the address"}
    for system, host_re, path_re, confidence in RULES:
        if re.search(host_re, host):
            if path_re and not re.search(path_re, parts.path + "?" + parts.query):
                continue
            return {"url": url, "system": system, "confidence": confidence, "evidence": f"host {host}"}
    for system, query_re, confidence in QUERY_HINTS:
        if re.search(query_re, parts.query):
            return {"url": url, "system": system, "confidence": confidence, "evidence": "gh_jid in the query string"}
    return {
        "url": url,
        "system": None,
        "confidence": "unknown",
        "evidence": f"host {host} matches no known vendor; apply the strict rules",
    }


def selftest() -> int:
    cases = [
        ("https://acme.wd3.myworkdayjobs.com/en-US/careers/job/123", "Workday"),
        ("https://boards.greenhouse.io/acme/jobs/1", "Greenhouse"),
        ("https://job-boards.greenhouse.io/acme/jobs/1", "Greenhouse"),
        ("https://jobs.lever.co/acme/1234", "Lever"),
        ("jobs.ashbyhq.com/acme/1", "Ashby"),
        ("https://careers-acme.icims.com/jobs/1/job", "iCIMS"),
        ("https://acme.taleo.net/careersection/2/jobdetail.ftl", "Oracle Taleo"),
        ("https://eeho.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/1", "Oracle Recruiting Cloud"),
        ("https://eeho.fa.us2.oraclecloud.com/other", None),
        ("https://acme.com/careers?gh_jid=42", "Greenhouse"),
        ("https://acme.com/careers?page=1&gh_jid=42", "Greenhouse"),
        ("https://acme.com/careers/role", None),
        ("https://evil.com/myworkdayjobs.com/fake", None),
        ("https://myworkdayjobs.com.evil.com/x", None),
        ("https://app.mokahr.com/apply/acme/1", "Moka"),
        ("", None),
        ("not a url at all", None),
    ]
    failed = 0
    for url, want in cases:
        got = detect(url)["system"]
        if got != want:
            failed += 1
            print(f"FAIL {url!r}: got {got!r}, want {want!r}", file=sys.stderr)
    print(f"ats_detect selftest: {len(cases) - failed} passed, {failed} failed")
    return 1 if failed else 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Detect the applicant tracking system from a job application link.")
    parser.add_argument("url", nargs="?", help="the application link, or - to read from stdin")
    parser.add_argument("--json", action="store_true", help="print JSON")
    parser.add_argument("--selftest", action="store_true", help="run the built-in tests")
    args = parser.parse_args()
    if args.selftest:
        return selftest()
    if args.url is None:
        parser.error("give an application link, or - to read one from stdin")
    url = sys.stdin.read().strip() if args.url == "-" else args.url
    result = detect(url)
    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print(f"System: {result['system'] or 'unknown'}")
        print(f"Confidence: {result['confidence']}")
        print(f"Evidence: {result['evidence']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
