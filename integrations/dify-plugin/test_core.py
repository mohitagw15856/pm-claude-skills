"""Run: python3 test_core.py (after scripts/build-dify-plugin.mjs has written data/)."""
import pm_skills_core as core

hits = core.find("帮我写周报", 3)
assert hits and hits[0]["name"] == "cn-weekly-report", hits
assert core.find("my landlord kept my deposit", 3)[0]["name"] == "security-deposit-recovery"
for bad in ["../etc/passwd", "Cn-Weekly", "", "a/b", "x" * 3]:
    try:
        core.fetch(bad)
        raise SystemExit(f"accepted bad name {bad!r}")
    except ValueError:
        pass
text = core.fetch("cn-weekly-report")
assert text.startswith("---") and "name: cn-weekly-report" in text
zh = core.fetch("cn-weekly-report", "zh")
assert "language: zh" in zh
print("core ok:", hits[0]["name"], len(text), "chars en,", len(zh), "chars zh")
