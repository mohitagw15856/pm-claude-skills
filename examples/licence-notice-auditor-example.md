# Example: licence-notice-auditor

## What this skill does

Inventories every code, data and media component a project ships, flags licence conflicts and unclear ownership, and drafts NOTICE.md. The output is not legal advice.

## How to trigger it

### Example 1: an Electron app going commercial

**You say:**
> "We're selling a desktop app (Electron, MIT-licensed core). Here's `npx license-checker --summary` output, and we bundle Inter, some icons from a site I forget, and a dataset of UK postcodes. Anything to worry about?"

**Claude produces (excerpt):**

> **This is not legal advice.** It is an inventory to take to a lawyer before you sell.

| Rating | Component | Issue | Why it matters for this distribution | Suggested action |
|---|---|---|---|---|
| red | `node-pdfkit-lite` 0.4 | GPL-3.0 | You distribute binaries; the combined app would need to be offered under the GPL | Replace with an MIT or Apache-2.0 PDF library, or get legal advice |
| red | Icons (source unknown) | No licence found | No licence means all rights reserved | Find the source and its terms, or replace with an openly licensed set |
| amber | `electron` | MIT, plus Chromium's notices | Chromium's licence file must ship with the app | Include `LICENSES.chromium.html` from the Electron build |
| amber | UK postcode dataset | Open Government Licence v3.0 | Attribution required | Add the OGL attribution statement to NOTICE.md and the About screen |
| green | Inter font | OFL-1.1 | Bundling allowed | Keep the OFL text with the font files |

---

### Example 2: the NOTICE file

**You say:**
> "Draft the NOTICE file for the green and amber items."

**Claude produces (excerpt):**

```markdown
# Notices

Ledgerline is licensed under the MIT Licence. It includes the following third-party components:

## Inter 4.0
- Licence: OFL-1.1
- Source: https://github.com/rsms/inter
- Copyright: The Inter Project Authors

## UK postcode data
- Licence: Open Government Licence v3.0
- Contains public sector information licensed under the Open Government Licence v3.0.
```

Gaps to close: the origin of the icons (only you can find this), and whether the PDF library
can be replaced before launch.

## Tips for best results

- Paste the licence tool's output rather than a list of names; versions matter.
- Say how you distribute (source, binaries, hosted); the same licence can be fine for one and not the other.
- Include assets and copied snippets, not just packages.

## Related skills

- `self-host-packager`: once licences are clear, package the app for self-hosting.
- `readme-benefit-writer`: state the project's licence plainly in the README.
