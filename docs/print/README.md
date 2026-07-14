# 📦 Print products — the Handbook and the Operator's Deck as real objects

Both artifacts are print-ready today; this is the press-go runbook for putting them on shelves. Physical objects recruit people the internet can't reach, and both are margin-positive without sponsorship.

## The Handbook (paperback)
- **Interior:** `node docs/print/build-interior.mjs` renders `web/handbook.html` to `handbook-interior-6x9.pdf` — 6×9" trade with gutter-safe 0.625" margins. **Currently 342 pages.** (The A4 `web/docs-assets/handbook.pdf` is the free digital edition, not the print interior.)
- **Cover:** `node docs/print/build-covers.mjs --pages <N>` renders front/back/spine to `handbook-cover.pdf`; the interior script prints the N to use. Current: see build output — spine derives from the printed page count. **Re-run both after big releases.**
- **Route A — Lulu (fastest, no inventory):** lulu.com → paperback → 6×9 (US Trade), black & white, 342 pages → upload `handbook-interior-6x9.pdf` + `handbook-cover.pdf` → price at cost+$6 → get a storefront link for the README. ~30 minutes.
- **Route B — Amazon KDP (reach):** same files; needs an ISBN (KDP gives you one free) and 72h review. Royalty ~$4-7 at $24.99.

## The Operator's Deck (cards)
- **Cards:** the deck builder (`scripts/build-deck.mjs`, shipped in #133) already renders per-skill cards with QR codes; `node docs/print/build-covers.mjs --deck` lays them out 9-up on A4 + singles at 63×88mm (poker standard) for print services.
- **Route — MakePlayingCards.com / printerstudio:** upload the singles PDF, 54-card deck (the 50 production skills + 4 arena cards), ~$12/deck at qty 1, ~$6 at 50. The QR on every card lands on that skill's playground page — the deck is a distribution channel disguised as a gift.

## House rules for physical goods
- Price transparently (cost + stated margin, published here); proceeds route like sponsorship — the free-runs pool first.
- The digital versions remain free forever; print is a format, not a paywall.

**Owner actions:** create the Lulu/KDP/MPC accounts, upload, publish the store links back into this file and the README. Everything else is generated.
