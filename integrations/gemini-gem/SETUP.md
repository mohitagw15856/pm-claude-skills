# Publish "PM Skills" as a Gemini Gem

A ~5-minute setup that packages the library as a custom **Gem** in the Gemini app — another discovery surface with its own audience.

## Prerequisites

- A Google account with access to **[gemini.google.com](https://gemini.google.com/)** → **Gems**.

## Steps

1. In Gemini, open **Gems** (left sidebar) → **New Gem** (or **Gem manager → New**).
2. **Name:** `PM Skills`
3. **Instructions:** paste the entire contents of [`instructions.md`](instructions.md).
4. **Knowledge:** upload the library index so the Gem knows every available skill:
   - Download it: **[`llms.txt`](https://mohitagw15856.github.io/pm-claude-skills/llms.txt)** (right-click → Save As), then attach the file.
   - Optional: also attach **[`llms-full.txt`](https://mohitagw15856.github.io/pm-claude-skills/llms-full.txt)** for the *full* instruction body of every skill (larger, but gives the Gem the exact templates to follow — recommended if within the upload limit).
5. **Preview / test:** ask *"Draft board minutes from these notes…"* and confirm it picks the right skill and follows the structure.
6. **Save.** Share the Gem link, or keep it private to your account.

## Keeping it current

Re-upload `llms.txt` / `llms-full.txt` after a big release to refresh the Gem's knowledge (Gems don't fetch live). A quarterly refresh is plenty.

## Why two files?

- `llms.txt` — compact **index** (every skill + one-line purpose). Small, always fits.
- `llms-full.txt` — every skill's **full Markdown instructions**. Best fidelity; upload it if the size is within Gemini's Knowledge limit.
