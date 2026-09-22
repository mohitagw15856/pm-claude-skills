# Contextual discovery — "there's a skill for the page you're on"

The extension already lets people **insert** a skill into ChatGPT/Claude/Gemini. This adds the other half: **suggesting** the right skill from the page they're already on — a lease PDF, a job posting, a medical bill, a benefits site, a collections notice. It's the everyone-else equivalent of the VS Code extension for developers.

## How it works
`context-rules.json` is a data file of rules. Each rule matches a page by **host fragment**, **URL regex**, or **on-page keywords** (a rule fires on any host/URL hit, or on **≥2 keyword** hits — the 2-keyword threshold is what keeps it from being noisy). A fired rule shows a small, dismissible nudge with one line and 1–3 suggested skills; clicking a skill opens the existing picker with it pre-selected.

## Wiring it into the extension (small change to `content.js`)
1. Load the rules: `const { rules, never } = await (await fetch(chrome.runtime.getURL('context-rules.json'))).json();`
2. **Bail on `never` hosts** (auth/banking) before anything else.
3. Score the page: for each rule, host/URL match → fire; else count keyword hits in `document.body.innerText.toLowerCase()` (cap the scan at ~50 KB) → fire at ≥2.
4. Show at most **one** nudge per page load, for the highest-scoring rule; remember dismissals per rule in `chrome.storage.local` so a user is never nagged twice by the same rule.
5. Add `context-rules.json` to the manifest's `web_accessible_resources`.

## Privacy rules (this runs on every page — be strict)
- **All matching is local.** Nothing about the page ever leaves the browser. No URL, no text, no beacon. State it in `STORE.md` and the listing.
- **Never on auth or banking pages** (`never` list) — extend it rather than shrink it.
- **Dismissible, once.** A dismissed rule stays dismissed.
- Keyword lists stay short and specific; a rule that fires on generic pages gets removed, not tuned.

## Adding a rule
Copy an entry in `context-rules.json`. Keep `keywords` to distinctive phrases (`"security deposit"`, not `"deposit"`), `suggest` to real skill names (validate with `node scripts/skillcheck.mjs`), and `label` to one sentence that names the situation, not the product.

## v2 — the model picks the situation (opt-in)
`jev-suggest.js` adds an **opt-in** second path: when the user has saved a decision-model key in the extension's storage (`chrome.storage.local.jevApiKey`), the page's **title, host and first 500 words** are sent with one Choice question over the rule labels (plus `none`), and the model picks the situation with a probability. The rules in `context-rules.json` remain the zero-network default and the fallback; the `never` list is honoured before anything is read.

Wiring (after step 5 above): `const jev = pmJevSuggest; const key = await jev.loadKey(chrome.storage.local); const pick = key ? await jev.pickSkillForPage({ rules, never, doc: document, host: location.hostname, apiKey: key }) : null;` — use `pick` if non-null, else the rule scorer. Add `jev-suggest.js` before `content.js` in the manifest's content script list, add an options field for the key, and **update `STORE.md`**: "with a key saved, page title + host + first 500 words are sent to the decision model; never on auth/banking pages; nothing stored." Node self-test: `node extension/jev-suggest.js --selftest`.
