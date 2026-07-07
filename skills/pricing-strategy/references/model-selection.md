# Pricing Model Selection — the decision tree and its regrets

Choosing the model matters more than choosing the number: numbers move quarterly, models are near-irreversible (every migration burns trust with your best customers).

## The tree
1. **Does value scale with usage the customer can predict?**
   Yes, predictable (seats, contacts stored) → **per-unit/per-seat**. Buyers can budget; finance can forecast.
   Yes, unpredictable (API calls, compute) → **usage-based with a committed floor** — pure usage terrifies procurement; the floor converts terror into a negotiable number.
   No → keep walking.
2. **Is value concentrated in identifiable feature tiers?** (Some customers need SSO/audit/compliance, most don't) → **good-better-best tiering**, where the enterprise tier is priced on the *cost of not having* compliance, not cost-plus.
3. **Is value diffuse and hard to meter?** → **flat platform fee**, reviewed annually. Boring and under-rated; it sells when the metered alternatives all create adoption anxiety.

## The regrets table (what each model's veterans warn about)
- **Per-seat:** punishes viral adoption inside the account — the customer's rational move is sharing logins. Watch the seats-to-employees ratio; when it stalls, the model is suppressing your growth.
- **Usage-based:** revenue inherits the customer's seasonality, and one efficiency improvement in your product cuts your own revenue ("we optimised ourselves into a down quarter"). Pair with commit floors and expansion triggers.
- **Tiering:** the middle tier eats everything if the top tier's fence is soft. The fence must be a *need* (compliance, scale) not a *nicety* (priority support) — niceties get negotiated away.
- **Flat fee:** silently underprices your biggest accounts for years. Schedule the annual review contractually at signing, when goodwill is maximal.

## The one test before committing
For your 10 most recent deals, compute what each would have paid under the candidate model. If the model would have *cut* revenue from your best-fit customers or *blocked* the two fastest-growing ones, the model is optimised for the customers you don't want.
