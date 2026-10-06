# Example: competitive-analysis

## What this skill does

Builds a full competitive landscape: competitor profiles, a feature and pricing matrix, win/loss patterns and prioritised strategic recommendations, structured for roadmap and sales use.

## How to trigger it

### Example 1: a landscape for the roadmap offsite

**You say:**
> "Competitive analysis for our scheduling tool against [Competitor A], [Competitor B] and [Competitor C]. We win on calendar integrations, lose on mobile. Deals lost last quarter: 7 to A (6 cited mobile), 2 to B (price)."

**Claude produces (excerpt):**

### 1. Executive Summary
- **Market position:** strong in integration depth, exposed on mobile experience in mid-market deals.
- **Key findings:** mobile is the stated reason in 67% of competitive losses; A ships mobile-first; B is winning only on price, not capability.
- **Strategic implication:** one mobile release changes more revenue than any pricing response.

### 3. Feature Comparison Matrix

| Feature | Us | [A] | [B] | [C] |
|---|---|---|---|---|
| Two-way calendar sync | ✅ Full | ⚠️ Limited | ✅ Full | ❌ None |
| Native mobile app | ⚠️ Limited | ✅ Full | ⚠️ Limited | ✅ Full |
| Round-robin routing | ✅ Full | ✅ Full | ❌ None | ⚠️ Beta |

### 5. Win/Loss Patterns
- Losses to A cluster in companies over 200 seats where field staff schedule from phones.
- B's price wins are sub-£5k deals; defending them costs more margin than they return.

### 6. Recommendations (prioritised)
1. Mobile parity release within two quarters (addresses 6 of 9 losses)
2. Battlecard update: lead integrations against A, total cost against B

### Example 2: refreshing after a competitor announcement

**You say:**
> "[Competitor A] just announced an AI meeting-notes feature. Update the analysis and tell sales what to say this week."

**Claude produces (excerpt):**

**Change to the matrix:** AI notes: A ⚠️ (announced, not shipped; waitlist only per their changelog of [date]).

**Sales guidance (this week):** announced is not available; ask prospects to request a live demo of it. Our position: notes land inside the calendar workflow the team already uses, theirs adds another app.

**Watch item:** if A ships within 60 days with transcript accuracy users accept, revisit roadmap item [ref].

## Tips for best results

- Name 3 to 5 real competitors; a landscape of ten is a directory, not an analysis.
- Bring win/loss notes, even rough ones; they turn feature rows into revenue statements.
- Mark every unverified cell; a battlecard with guessed facts loses deals.

## Related skills

- `competitor-teardown` for a deep one-off teardown of a single rival
- `product-positioning-doc` to turn the landscape's white space into positioning
