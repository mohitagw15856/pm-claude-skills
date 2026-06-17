#!/usr/bin/env python3
"""Sprint capacity calculator for the sprint-planning skill.

Turns team and availability inputs into a recommended sprint commitment so the
numbers in a sprint plan are computed, not guessed. Pure Python standard
library — no dependencies, no network access.

Examples
--------
Quick estimate from flags:

    python3 capacity_calculator.py --team 5 --days 10 --velocity 30 \
        --availability 0.8 --carryover 5

Detailed estimate from a JSON file describing each team member:

    python3 capacity_calculator.py --input team.json

Where team.json looks like:

    {
      "sprint_days": 10,
      "focus_hours_per_day": 6,
      "historical_velocity": 30,
      "carryover_points": 5,
      "commit_ratio": 0.8,
      "members": [
        {"name": "Ada",  "available_days": 10},
        {"name": "Linus", "available_days": 7, "note": "2 days PTO, 1 day interview"}
      ]
    }

The recommended commitment deliberately leaves slack for unplanned work — it
never commits 100% of theoretical capacity.
"""
from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, field


@dataclass
class Member:
    name: str
    available_days: float
    note: str = ""


@dataclass
class CapacityInputs:
    sprint_days: int = 10
    focus_hours_per_day: float = 6.0
    historical_velocity: float | None = None
    carryover_points: float = 0.0
    commit_ratio: float = 0.8
    team_size: int | None = None
    availability_factor: float = 0.8
    members: list[Member] = field(default_factory=list)


def _availability_from_members(inp: CapacityInputs) -> float:
    """Return the blended availability factor (0-1) from per-member days."""
    if not inp.members:
        return inp.availability_factor
    theoretical = len(inp.members) * inp.sprint_days
    if theoretical == 0:
        return 0.0
    actual = sum(m.available_days for m in inp.members)
    return actual / theoretical


def compute(inp: CapacityInputs) -> dict:
    team_size = inp.team_size if inp.team_size is not None else len(inp.members)
    if not team_size:
        raise ValueError("Provide --team or a non-empty members list.")

    availability = _availability_from_members(inp)
    focus_hours = team_size * inp.sprint_days * inp.focus_hours_per_day * availability

    result: dict = {
        "team_size": team_size,
        "sprint_days": inp.sprint_days,
        "focus_hours_per_day": inp.focus_hours_per_day,
        "availability_factor": round(availability, 3),
        "available_focus_hours": round(focus_hours, 1),
    }

    if inp.historical_velocity is not None:
        velocity_adjusted = inp.historical_velocity * availability
        recommended = velocity_adjusted * inp.commit_ratio
        new_work_capacity = max(recommended - inp.carryover_points, 0.0)
        result.update(
            {
                "historical_velocity": inp.historical_velocity,
                "velocity_adjusted_for_availability": round(velocity_adjusted, 1),
                "commit_ratio": inp.commit_ratio,
                "carryover_points": inp.carryover_points,
                "recommended_commitment_points": round(recommended, 1),
                "capacity_for_new_work_points": round(new_work_capacity, 1),
            }
        )
        if inp.carryover_points > recommended:
            result["warning"] = (
                "Carry-over alone exceeds the recommended commitment — "
                "pull in little or no new work this sprint."
            )

    return result


def _parse_inputs(args: argparse.Namespace) -> CapacityInputs:
    if args.input:
        raw = sys.stdin.read() if args.input == "-" else open(args.input).read()
        data = json.loads(raw)
        members = [
            Member(
                name=m.get("name", f"member-{i+1}"),
                available_days=float(m.get("available_days", data.get("sprint_days", 10))),
                note=m.get("note", ""),
            )
            for i, m in enumerate(data.get("members", []))
        ]
        return CapacityInputs(
            sprint_days=int(data.get("sprint_days", 10)),
            focus_hours_per_day=float(data.get("focus_hours_per_day", 6.0)),
            historical_velocity=(
                float(data["historical_velocity"])
                if data.get("historical_velocity") is not None
                else None
            ),
            carryover_points=float(data.get("carryover_points", 0.0)),
            commit_ratio=float(data.get("commit_ratio", 0.8)),
            team_size=data.get("team_size"),
            availability_factor=float(data.get("availability_factor", 0.8)),
            members=members,
        )

    return CapacityInputs(
        sprint_days=args.days,
        focus_hours_per_day=args.focus_hours,
        historical_velocity=args.velocity,
        carryover_points=args.carryover,
        commit_ratio=args.commit_ratio,
        team_size=args.team,
        availability_factor=args.availability,
    )


def _render(result: dict) -> str:
    lines = ["Sprint Capacity Estimate", "=" * 24]
    label = {
        "team_size": "Team size",
        "sprint_days": "Sprint days",
        "focus_hours_per_day": "Focus hours/day",
        "availability_factor": "Availability factor",
        "available_focus_hours": "Available focus hours",
        "historical_velocity": "Historical velocity (pts)",
        "velocity_adjusted_for_availability": "Velocity adj. for availability",
        "commit_ratio": "Commit ratio",
        "carryover_points": "Carry-over (pts)",
        "recommended_commitment_points": "RECOMMENDED commitment (pts)",
        "capacity_for_new_work_points": "Capacity for NEW work (pts)",
    }
    for key, text in label.items():
        if key in result:
            lines.append(f"{text:<32}: {result[key]}")
    if "warning" in result:
        lines.append("")
        lines.append(f"⚠️  {result['warning']}")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--input", help="Path to a JSON file describing the team (or '-' for stdin).")
    parser.add_argument("--team", type=int, help="Number of team members.")
    parser.add_argument("--days", type=int, default=10, help="Working days in the sprint (default: 10).")
    parser.add_argument("--focus-hours", type=float, default=6.0, dest="focus_hours",
                        help="Focus hours per person per day (default: 6).")
    parser.add_argument("--velocity", type=float, help="Historical average velocity in story points.")
    parser.add_argument("--carryover", type=float, default=0.0, help="Carry-over story points from last sprint.")
    parser.add_argument("--availability", type=float, default=0.8,
                        help="Availability factor 0-1 when not using per-member days (default: 0.8).")
    parser.add_argument("--commit-ratio", type=float, default=0.8, dest="commit_ratio",
                        help="Fraction of velocity to commit, leaving slack (default: 0.8).")
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of a formatted report.")
    args = parser.parse_args(argv)

    try:
        result = compute(_parse_inputs(args))
    except (ValueError, json.JSONDecodeError, OSError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(json.dumps(result, indent=2) if args.json else _render(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
