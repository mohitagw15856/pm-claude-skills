# Measurement (#19) — know your funnel without breaking the no-telemetry promise

You can't optimize 55.5k blind. But the README promises *no telemetry, no accounts.* The reconciliation: **measure only aggregate, public, or server-side signals — never anything on the user's machine.**

## What you CAN measure (all privacy-safe)
| Signal | Source | Privacy |
|---|---|---|
| Downloads | clawhub / npm / PyPI public stats | Public, aggregate |
| GitHub stars over time | GitHub API | Public |
| Playground runs served | your stats worker (`/try/stats`) | Server-side aggregate, already exists |
| Newsletter subs + open/click | newsletter tool | Consented (they opted in) |
| Registry rank per keyword | manual/periodic check | Public |
| Post-install page views | hosted site analytics (aggregate) | No per-user ID |

## What you must NOT do
- ❌ No phone-home from the installed CLI or skills.
- ❌ No per-user identifiers, fingerprints, or beacons in outputs.
- ❌ No tracking that would make "no telemetry" a lie.

## The one funnel number to watch
**Download → star conversion** = stars ÷ downloads. Today ≈ 1.3k ÷ 55.5k ≈ **2.3%** (upper bound). Every change in this playbook is judged by whether this ratio moves. Track it monthly.

## The dashboard (see `impact-dashboard.md`)
A single page pulling the public/aggregate numbers into one view — for you (optimization), for visitors (social proof), and for sponsors (ROI). It uses only the signals above.

## A note on honesty as a moat
"No telemetry" is a genuine differentiator in an AI-tools market full of surveillance. Measuring within these limits keeps that moat intact. If a measurement would require breaking the promise, the answer is: don't measure it — the trust is worth more than the datapoint.
