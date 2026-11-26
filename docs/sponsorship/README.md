# Sponsorship playbook

Working notes for selling and running sponsor placements. The public offer is the "Sponsor this project" section of the [README](../../README.md#-sponsor-this-project) and, in full, [SPONSORS.md](../../SPONSORS.md); this folder is how to operate it.

## The monthly cycle

| When | What | How |
|---|---|---|
| Every week or two | Record traffic, because GitHub keeps only 14 days, and refresh the reach table sponsors see | `node scripts/sponsor-report.mjs --update-docs` (updates `data/sponsor-traffic.json` and the table in `README.md` and `SPONSORS.md`; commit them) |
| First day of a term | Put the new sponsor's banner up, take the old one down | Replace the files in `assets/sponsors/`, update the block in `README.md`, add the sponsor to `sponsors.json` with its `since` date |
| Within five days of a term ending | Send the report for that term | `node scripts/sponsor-report.mjs --month YYYY-MM --sponsor Name --out report.md`, then the cover note in [report-email.md](report-email.md) |
| Two weeks before a term ends | Ask the current sponsor about renewal | They have first refusal until ten days before the end |
| After that | If not renewed, offer the slot to the next sponsor | Templates in [pitch-templates.md](pitch-templates.md) |

## Recording traffic automatically

The weekly data workflow records repository traffic by itself once a secret named `TRAFFIC_TOKEN` exists: a fine-grained personal access token for this repository with **Administration: read**. Without it the step is skipped and you run the script by hand. The workflow records the daily figures only; refreshing the reach tables in the READMEs stays a manual `--update-docs` run, so those edits are reviewed.

## Changing the banner

1. Ask for two PNGs at 1200 by 300 (light and dark), alt text and a link. Check the size: `sips -g pixelWidth -g pixelHeight file.png`.
2. Put them in `assets/sponsors/<name>-light.png` and `<name>-dark.png`.
3. Replace the sponsor block under the README title. Keep the "Sponsored by" label.
4. Commit as "Add <Name> sponsor banner (<Mon YYYY>)" so the term is in the history.
5. Update the "Current sponsor" section of `SPONSORS.md`, the "Current sponsor" line in the README's sponsor section, and the `sponsors` list in `sponsors.json`.

## What a sponsor may and may not buy

The rules are in [SPONSORS.md](../../SPONSORS.md#sponsored-skills-the-rules). In short: visibility and a labelled skill about their own product, yes; scores, rankings and mentions inside other skills, no.

## Who to approach

Companies whose product a reader would use next to a skill, so the placement is useful and not noise:

| Category | Why it fits | A skill to point at |
|---|---|---|
| Screen recording and demo tools | Readers make product demos | `demo-video-kit`, `demo-script` |
| Design and prototyping tools | Readers hand off designs | `stitch-design-handoff`, `figma-design-brief` |
| Product analytics | Readers define metrics and run tests | `metrics-framework`, `ab-test-planner`, `cohort-curve-model` |
| AI coding tools and agent platforms | The library installs into them | The install section of the README |
| Product management software | Readers write PRDs, roadmaps and updates | `prd-template`, `roadmap-narrative`, `stakeholder-update` |
| User research tools | Readers run and synthesise interviews | `user-interview-synthesis`, `discovery-interview-guide` |

Do not approach two direct competitors for the same month: the slot is exclusive.
