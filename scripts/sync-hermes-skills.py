#!/usr/bin/env python3
"""Install this library's skills into Hermes Agent (Nous Research).

Hermes reads the same `SKILL.md` standard as Claude Code — it auto-discovers
skills from its skills directory (default `~/.hermes/skills/`) using the
`description` frontmatter. So there is **no format conversion**: this script just
places the canonical `skills/<name>/` folders (SKILL.md + any scripts/) where
Hermes can find them.

Pure Python standard library — no dependencies, no network access.

Examples
--------
    # Copy all skills into ~/.hermes/skills/pm-claude-skills/
    python3 scripts/sync-hermes-skills.py

    # Symlink instead (so `git pull` updates them in place)
    python3 scripts/sync-hermes-skills.py --link

    # Install into a custom location, un-namespaced (flat)
    python3 scripts/sync-hermes-skills.py --target ./my-project/skills --flat

    # See what would happen without writing anything
    python3 scripts/sync-hermes-skills.py --dry-run

Uninstall: delete the `pm-claude-skills/` folder inside the target directory.
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO_ROOT / "skills"
DEFAULT_TARGET = Path.home() / ".hermes" / "skills"
NAMESPACE = "pm-claude-skills"


def discover_skills() -> list[Path]:
    """Return every skills/<name>/ folder that contains a SKILL.md."""
    if not SKILLS_DIR.is_dir():
        raise FileNotFoundError(f"Cannot find skills directory at {SKILLS_DIR}")
    return sorted(p for p in SKILLS_DIR.iterdir() if (p / "SKILL.md").is_file())


def install(skills: list[Path], dest: Path, *, link: bool, dry_run: bool) -> int:
    count = 0
    for skill in skills:
        target = dest / skill.name
        action = "symlink" if link else "copy"
        if dry_run:
            print(f"  would {action}: {skill.name} -> {target}")
            count += 1
            continue

        # Replace any existing install so re-running is idempotent.
        if target.is_symlink() or target.is_file():
            target.unlink()
        elif target.is_dir():
            shutil.rmtree(target)

        if link:
            target.symlink_to(skill, target_is_directory=True)
        else:
            shutil.copytree(skill, target)
        count += 1
    return count


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--target", type=Path, default=DEFAULT_TARGET,
                        help=f"Hermes skills directory (default: {DEFAULT_TARGET}).")
    parser.add_argument("--flat", action="store_true",
                        help=f"Install directly into --target instead of a '{NAMESPACE}/' subfolder.")
    parser.add_argument("--link", action="store_true",
                        help="Symlink each skill instead of copying (updates follow git pull).")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would happen without writing anything.")
    args = parser.parse_args(argv)

    try:
        skills = discover_skills()
    except FileNotFoundError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    if not skills:
        print("No skills found to install.", file=sys.stderr)
        return 1

    dest = args.target if args.flat else args.target / NAMESPACE
    print(f"{'[dry-run] ' if args.dry_run else ''}Installing {len(skills)} skills into {dest}")
    if not args.dry_run:
        dest.mkdir(parents=True, exist_ok=True)

    count = install(skills, dest, link=args.link, dry_run=args.dry_run)

    print(f"\n{'Would install' if args.dry_run else 'Installed'} {count} skills "
          f"({'symlinked' if args.link else 'copied'}).")
    if not args.dry_run:
        print(f"Restart Hermes Agent — it auto-discovers SKILL.md skills from {args.target} "
              f"and activates them by their description.")
    return 0


if __name__ == "__main__":
    try:
        rc = main()
    except BrokenPipeError:
        # Output was truncated by a closed pipe (e.g. `| head`); exit quietly.
        try:
            sys.stdout.close()
        except Exception:
            pass
        rc = 0
    raise SystemExit(rc)
