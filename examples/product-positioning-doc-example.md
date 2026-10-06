# Example: product-positioning-doc

## What this skill does

Writes the positioning document behind all messaging: category, target customer, differentiation with proof, messaging pillars and persona-specific messages, as a sign-off-able artefact.

## How to trigger it

### Example 1: positioning a category change

**You say:**
> "Positioning doc for [Product]. We're moving from 'time-tracking tool' to 'profitability software for agencies'. Buyers: agency founders, 10-50 staff. Proof: margin reports per client, utilisation forecasts, rate-card modelling. Main competitor frame: spreadsheets plus [Competitor]."

**Claude produces (excerpt):**

# Positioning Document: [Product]

**Status:** Draft, for product, marketing and sales sign-off

## 1. Background & Context
[Product] is perceived as a time tracker, a category with heavy price pressure. Usage data shows the margin and utilisation reports are the retention drivers. **Positioning objective:** be the default answer to "how do we know which clients make us money".

## 2. Market Category
**Agency profitability software.** Chosen over "time tracking" (commoditised) and "agency management" (implies replacing the whole stack, raising switching fear).

## 3. Target Customer
Founders and ops leads of 10-to-50-person agencies who price on day rates and discover margin problems at year-end.

## 4. Differentiation & Proof
| Claim | Proof |
|---|---|
| See margin per client monthly, not yearly | live margin report; [Customer] cut two loss-making retainers in Q1 |
| Forecast utilisation before hiring | 12-week forecast; accuracy stat *(to verify)* |

## 6. Persona messaging
- **Founder:** "Know which clients make you money while you can still act."
- **Ops lead:** "Utilisation and rates in one view, without the spreadsheet."

### Example 2: the sign-off review

**You say:**
> "Sales says the positioning ignores that most deals start when an agency loses money on one big client. Revise what that changes."

**Claude produces (excerpt):**

**What changes (and what does not):** category and audience hold. The *entry point* sharpens:

- **Primary message (was general, now moment-led):** "Find out which client is losing you money, in your first week."
- **Pillar reorder:** per-client margin moves to pillar 1; forecasting becomes the expansion story, not the door.
- **Sales implication:** discovery question becomes "which client do you suspect?", a named-suspect demo converts the pain the deals already start with.

**Sign-off note:** record this as v1.1 with sales' trigger insight credited; positioning that sales co-owns gets used.

## Tips for best results

- Bring the real proof points; unproven claims get marked *(to verify)* and should block sign-off.
- Name the category you are leaving and why; the rejected categories are half the document's value.
- Ask sales what moment starts deals; positioning that ignores the entry moment stays on the shelf.

## Related skills

- `go-to-market` to generate the launch messaging pack from this document
- `competitor-teardown` to test the differentiation claims against a named rival
