# Publishing the extension (owner runbook)

Build the zip from `extension/` (command at the bottom). Current version: 1.2.0, MV3.

## Chrome Web Store (~20 min + review days)
1. https://chrome.google.com/webstore/devconsole → pay the one-time $5 dev fee.
2. New item → upload the zip.
3. Listing: name as in manifest; description from README; category **Productivity/Tools**; screenshots: the picker over ChatGPT + Claude (1280×800).
4. Privacy tab: no data collected (truthful: everything is local). Single purpose: "help people use professional skill prompts: insert them into AI chats and suggest the right one for the page they are on".
   Permission justifications:
   - `activeTab` + `scripting`: when the user clicks the toolbar button, the popup reads the current tab's text **in the browser** to suggest a matching skill (and to prefill Lint with selected text). Nothing is sent anywhere.
   - optional `<all_urls>` (host permission, requested only when the user ticks "Suggest skills as I browse"): registers a content script that matches the page against bundled rules locally and shows one dismissible suggestion. Never on sign-in or banking pages. Unticking it removes the script and the permission.
   - `storage`: dismissed suggestions and the optional Lint key, on the device.
5. Submit — first review typically 1–3 days.

## Firefox AMO (free)
1. https://addons.mozilla.org/developers/ → submit the same zip (MV3 supported).
2. Same listing copy; AMO review is usually same-day.

## Edge Add-ons (free)
Same zip at https://partner.microsoft.com/dashboard/microsoftedge — Edge auto-approves Chrome-compatible MV3 quickly.

Future releases: bump manifest version → re-zip (`cd extension && zip -r ../ext.zip . -x sync-skills.mjs README.md`) → upload to each dashboard.
