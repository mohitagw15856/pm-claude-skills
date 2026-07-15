# 📦 Print products — the Handbook and the Operator's Deck as real objects

Both artifacts are print-ready today; this is the press-go runbook for putting them on shelves. Physical objects recruit people the internet can't reach, and both are margin-positive without sponsorship.

## The Handbook (paperback)
- **Interior:** `node docs/print/build-interior.mjs` renders `web/handbook.html` to `handbook-interior-6x9.pdf` — 6×9" trade with gutter-safe 0.625" margins. **Currently 342 pages.** (The A4 `web/docs-assets/handbook.pdf` is the free digital edition, not the print interior.)
- **Cover:** `node docs/print/build-covers.mjs --pages <N>` renders front/back/spine to `handbook-cover.pdf`; the interior script prints the N to use. Current: see build output — spine derives from the printed page count. **Re-run both after big releases.**
- **Route A — Lulu (fastest, no inventory): ✅ PUBLISHED** → **[The Professional Work Handbook (paperback)](https://www.lulu.com/shop/mohit-aggarwal/the-professional-work-handbook/paperback/product-65kwrpk.html)**. (For re-uploads after a big release: lulu.com → paperback → 6×9 US Trade, black & white → upload `handbook-interior-6x9.pdf` + `handbook-cover.pdf`, using Lulu's stated spine width.)
- **Route B — Amazon KDP (reach): ⬜ TODO** — same interior + cover files (build the cover with the KDP spine + a free KDP ISBN). See the step-by-step below. Royalty ~$4-7 at $24.99, ~72h review.

### Amazon KDP — step by step

KDP reaches far more readers than Lulu and costs nothing to list. The catch is two mechanical requirements that differ from Lulu, both already handled by the build scripts:

1. **Build the KDP interior** (wider gutter — KDP demands 0.75" once a book passes ~300 pages):
   ```bash
   node docs/print/build-interior.mjs --kdp     # → handbook-interior-6x9-kdp.pdf
   ```
   Note the **page count** it prints — you need it for the cover.
2. **Build the KDP cover** with the spine sized for *KDP's* page count and paper. KDP's own cover calculator will state the exact spine; pass it through so the art matches:
   ```bash
   node docs/print/build-covers.mjs --pages <N> --spine <inches-from-KDP>   # → handbook-cover.pdf
   ```
3. **Create the paperback** at [kdp.amazon.com](https://kdp.amazon.com) → *Create* → *Paperback*:
   - **ISBN:** choose **"Get a free KDP ISBN"** (free, Amazon-owned; fine unless you want to sell to bookstores under your own imprint).
   - **Trim size:** 6×9 in. **Bleed:** yes. **Interior:** black & white on white paper. **Cover finish:** matte or glossy.
   - Upload `handbook-interior-6x9-kdp.pdf` and `handbook-cover.pdf`.
   - Run the **online previewer** — fix any "content in margin" flags (that's what the `--kdp` gutter prevents).
4. **Pricing & rights:** territories → all; list at **$24.99** (royalty ≈ $4–7 after print cost). You hold the copyright; you're only granting Amazon non-exclusive distribution, so keeping the Lulu edition and the free digital versions is allowed.
5. **Publish** → ~72h review → live on Amazon. Add the product link back into this file and the README hero, next to the Lulu link.

> Optional: enrol in **KDP Select** only if you want Kindle exclusivity perks — not needed for a paperback, and it would restrict where else you can sell, so skip it here.

## The Operator's Deck (cards)
- **Cards:** the deck builder (`scripts/build-deck.mjs`, shipped in #133) already renders per-skill cards with QR codes; `node docs/print/build-covers.mjs --deck` lays them out 9-up on A4 + singles at 63×88mm (poker standard) for print services.
- **Route — MakePlayingCards.com / printerstudio:** upload the singles PDF, 54-card deck (the 50 production skills + 4 arena cards), ~$12/deck at qty 1, ~$6 at 50. The QR on every card lands on that skill's playground page — the deck is a distribution channel disguised as a gift.

## House rules for physical goods
- Price transparently (cost + stated margin, published here); proceeds route like sponsorship — the free-runs pool first.
- The digital versions remain free forever; print is a format, not a paywall.

**Owner actions:** ✅ Lulu paperback is [live](https://www.lulu.com/shop/mohit-aggarwal/the-professional-work-handbook/paperback/product-65kwrpk.html). ⬜ Amazon KDP (follow the step-by-step above) and ⬜ MakePlayingCards for the deck remain — upload, then publish the store links back into this file and the README. Everything else is generated.
