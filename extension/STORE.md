# Publishing the extension (owner runbook)

`pm-skills-extension-1.1.0.zip` is on your Desktop — MV3, store-ready.

## Chrome Web Store (~20 min + review days)
1. https://chrome.google.com/webstore/devconsole → pay the one-time $5 dev fee.
2. New item → upload the zip.
3. Listing: name as in manifest; description from README; category **Productivity/Tools**; screenshots: the picker over ChatGPT + Claude (1280×800).
4. Privacy tab: no data collected (truthful — everything is local); single purpose: "insert professional skill prompts".
5. Submit — first review typically 1–3 days.

## Firefox AMO (free)
1. https://addons.mozilla.org/developers/ → submit the same zip (MV3 supported).
2. Same listing copy; AMO review is usually same-day.

## Edge Add-ons (free)
Same zip at https://partner.microsoft.com/dashboard/microsoftedge — Edge auto-approves Chrome-compatible MV3 quickly.

Future releases: bump manifest version → re-zip (`cd extension && zip -r ../ext.zip . -x sync-skills.mjs README.md`) → upload to each dashboard.
