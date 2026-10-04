# Example: demo-clip-storyboard

## What this skill does

Scripts the 20-second video that sells a repo: the two-second hook, a timed shot list with on-screen text and what to record, captions, and post copy for X and LinkedIn.

## How to trigger it

### Example 1: a CLI that cleans messy CSVs

**You say:**
> "Storyboard a 20-second clip for `csvsnap`: it turns a messy CSV into a clean chart in the terminal. Audience is data people on X. CTA is `pipx install csvsnap`."

**Claude produces (excerpt):**

Hook (use A): a terminal full of a garbled 2,000-row CSV, text "This is your export." Then a hard cut.
Alternative B: the finished chart first, text "One command."

| # | Time | Shot | What to record | On-screen text | Cut or motion |
|---|---|---|---|---|---|
| 1 | 0.0 to 2.0 | Raw CSV scrolling | `cat sales.csv` at 18 px font | This is your export. | Hard cut |
| 2 | 2.0 to 5.0 | Typing the command | `csvsnap sales.csv --by region` | One command. | Keystrokes visible |
| 3 | 5.0 to 10.0 | Chart renders | The bar chart drawing in | Clean chart, in the terminal. | Hold |
| 4 | 10.0 to 14.0 | Switching grouping | `--by month`, chart redraws | Re-slice instantly. | Quick cut |
| 5 | 14.0 to 17.0 | Export | `--png chart.png`, then the PNG opens | Export to PNG. | Cut |
| 6 | 17.0 to 20.0 | CTA | `pipx install csvsnap` centred | pipx install csvsnap | Hold 3 s |

**X:** Messy CSV to a clean chart without leaving the terminal. `csvsnap sales.csv --by region`
and you are done. Free and open source: github.com/example/csvsnap #dataviz

---

### Example 2: the LinkedIn version

**Claude produces:**

> Every analyst knows the moment: someone sends a CSV and you just want to see the shape of it.
>
> csvsnap draws a clean chart from a CSV in one terminal command, then lets you re-slice it by
> any column and export a PNG for the deck.
>
> It is free and open source. Try it, and tell me which chart type to add next:
> github.com/example/csvsnap

## Tips for best results

- Name the single moment that impresses people; the whole clip is built around it.
- Record at 1280 by 720 with a large font; most viewers are on phones.
- Make a square export for LinkedIn and a GIF under 5 MB for the README.

## Related skills

- `demo-script`: a live demo in front of an audience.
- `clip-factory`: cutting short clips out of a long recording or talk.
