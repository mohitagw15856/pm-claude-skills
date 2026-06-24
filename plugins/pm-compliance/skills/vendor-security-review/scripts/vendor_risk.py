#!/usr/bin/env python3
"""Vendor risk tiering for the vendor-security-review skill.

Computes a consistent risk tier (Low/Medium/High/Critical) from data sensitivity,
access level, and business criticality, then lists the baseline evidence the tier
demands and any gap between that and the certs the vendor actually holds. Standard
library only, no network.

Input
-----
A JSON object (file path or '-' for stdin):
  name             : vendor name
  data_sensitivity : none | internal | customer_pii | sensitive | regulated
  access           : none | limited | privileged
  criticality      : low | medium | high
  certs            : optional list, e.g. ["soc2_type2","iso27001","pentest","dpa"]

Usage
-----
  python3 vendor_risk.py vendor.json
  python3 vendor_risk.py vendor.json --json
"""
import argparse
import json
import sys

DATA = {"none": 0, "internal": 1, "customer_pii": 3, "sensitive": 4, "regulated": 5}
ACCESS = {"none": 0, "limited": 1, "privileged": 3}
CRIT = {"low": 0, "medium": 1, "high": 2}

REQUIRED = {
    "Low": ["self-attestation questionnaire"],
    "Medium": ["security questionnaire", "DPA (if personal data)"],
    "High": ["SOC 2 Type II or ISO 27001", "pen-test summary", "DPA + sub-processor list", "breach-notification SLA"],
    "Critical": ["SOC 2 Type II or ISO 27001", "recent pen-test report", "DPA + sub-processor list",
                 "breach-notification SLA", "right-to-audit clause", "incident-response review"],
}


def load(path):
    text = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("Expected a JSON object describing the vendor.")
    return data


def assess(v):
    def lk(table, key, field):
        val = str(v.get(field, "")).lower()
        if val not in table:
            raise ValueError(f"{field} must be one of {sorted(table)} (got {val!r}).")
        return table[val]

    score = lk(DATA, None, "data_sensitivity") + lk(ACCESS, None, "access") + lk(CRIT, None, "criticality")
    tier = "Low" if score <= 1 else "Medium" if score <= 4 else "High" if score <= 7 else "Critical"
    required = REQUIRED[tier]
    certs = {str(c).lower() for c in (v.get("certs") or [])}
    # crude "do they have independent assurance?" check for High/Critical
    has_assurance = bool(certs & {"soc2_type2", "iso27001"})
    missing = []
    if tier in ("High", "Critical") and not has_assurance:
        missing.append("independent assurance (SOC 2 Type II / ISO 27001)")
    if "soc2_type1" in certs and "soc2_type2" not in certs and tier in ("High", "Critical"):
        missing.append("SOC 2 Type I provided but Type II required at this tier")
    return {"vendor": v.get("name", "(unnamed)"), "score": score, "tier": tier,
            "required_evidence": required, "evidence_gaps": missing}


def main():
    ap = argparse.ArgumentParser(description="Tier a vendor's security risk.")
    ap.add_argument("input", help="vendor JSON file, or - for stdin")
    ap.add_argument("--json", action="store_true", help="emit JSON")
    args = ap.parse_args()
    try:
        r = assess(load(args.input))
    except Exception as e:  # noqa: BLE001
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.json:
        print(json.dumps(r, indent=2))
        return

    icon = {"Low": "🟢", "Medium": "🟡", "High": "🟠", "Critical": "🔴"}[r["tier"]]
    print(f"{r['vendor']}: {icon} {r['tier']} risk (score {r['score']})")
    print("\nRequired diligence at this tier:")
    for req in r["required_evidence"]:
        print(f"  • {req}")
    if r["evidence_gaps"]:
        print("\n⚠ Evidence gaps:")
        for g in r["evidence_gaps"]:
            print(f"  🔴 {g}")


if __name__ == "__main__":
    main()
