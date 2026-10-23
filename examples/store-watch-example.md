# Example: Store Watch

## What this skill does
Have a proactive agent watch an online shop (Shopify, WooCommerce, Etsy) for what needs the owner: best-sellers about to run out, a spike in refunds or returns on one product, bad reviews, failed orders and checkout problems, with interrupts only for what cannot wait and drafted replies for reviews.

## How to trigger it

### Example 1: A candle shop on Shopify
**You say:**
> "Watch my Shopify candle shop: ~40 orders a day, fig and cedar are best-sellers, 10-day restock."

**Claude produces (excerpt):**

| Line | Today | Usual | Note |
|---|---|---|---|
| Orders | 37 | 41 (30-day avg, Tuesdays) | normal |
| Refunds | 4, all "Cedar 300g" | 0.6 a day | spike: possible bad batch |
| New reviews | 6 (one 2-star: "cracked jar") | | reply drafted |

**Stock at risk:** Fig 300g, 8 days of cover against 10-day lead time: reorder today (supplier note drafted).

---

### Example 2: From a one-line brief
**You say:**
> "Monitor my Shopify store for me"

**Claude produces (excerpt):** the full watch with default thresholds marked [inferred], the morning brief lines, the interrupt rules, and three questions that would sharpen it.

## Tips for best results
- Give one real number (usual daily volume, a floor, a lead time) and the thresholds stop being guesses
- Start with interrupts off for a week; read the brief lines, then switch on only the interrupts you missed
- Pair with `interrupt-rules` so this watch shares one alert policy with everything else

## Related skills
- `morning-brief-designer`: where these lines sit in the brief
- `interrupt-rules`: the shared alert policy
- `approval-policy-designer`: what the agent may do alone
