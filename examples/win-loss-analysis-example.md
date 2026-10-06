# Example: win-loss-analysis

## What this skill does

Analyses why deals are won and lost: ranked win and loss reasons with prevalence and buyer quotes, win rates cut by segment and competitor, a competitive read, and prioritised actions for product, marketing and sales.

## How to trigger it

### Example 1: a quarterly win/loss report from CRM notes

**You say:**
> "Win/loss for Q3: 18 won, 31 lost, close notes pasted below. We mostly lose to Vantix in mid-market. What are the patterns and what do we fix first?"

**Claude produces (excerpt):**

# Win/Loss Analysis: Q3

**Scope:** 18 won · 31 lost · ~£1.4m total value · **Source:** CRM close notes

## Headline
Win rate 37% overall but 21% against Vantix in mid-market, where 19 of the 31 losses sit. The single biggest controllable factor is security review readiness: it appears in 11 losses and zero wins. Fix the review pack first; it is cheaper than any product change on this list.

## Why We Lose (ranked)
| # | Reason | % of losses | Controllable? | Est. value at stake |
|---|---|---|---|---|
| 1 | Failed/slow security review | 35% | Yes | £420k |
| 2 | Vantix price undercut (~20%) | 26% | Partly | £310k |
| 3 | Missing SSO/SCIM | 19% | Yes | £240k |

**Evidence:** *"Your team took 6 weeks on the questionnaire; Vantix came pre-filled."* (lost, mid-market)

## Win Rate by Cut
| Cut | Win rate | Read |
|---|---|---|
| SMB | 52% | product sells itself below the review threshold |
| Mid-market vs Vantix | 21% | the strategic problem; see actions |

## Actions
| Theme | Recommended action | Owner | Effort | Expected impact |
|---|---|---|---|---|
| Security review | Pre-filled CAIQ pack + named owner, 5-day SLA | PMM | S | recovers most of reason 1 |
| Pricing | Approved mid-market discount floor instead of ad-hoc | Sales | S | stops panic discounting |

### Example 2: challenging the official loss reasons

**You say:**
> "Sales logs 80% of losses as 'price'. The notes are pasted; is that real?"

**Claude produces (excerpt):**

**What the notes support:** price is the *recorded* reason in 24 of 31 losses but the *described* reason in 8. In 11, the note mentions the security questionnaire before price appears; price is the polite reason buyers give after the real disqualification. Reclassified, "price" drops to 26% and "review readiness" becomes the top loss driver.

**Why it matters:** fixing the logged reason (discounting) costs margin forever; fixing the described reason (the review pack) costs one PMM-week once.

## Tips for best results

- Paste the raw close notes, not the dropdown reasons; recorded and real reasons diverge.
- Include won deals too; reasons that appear in both columns are hygiene, not differentiators.
- Name the competitor; a generic loss analysis produces generic actions.

## Related skills

- `competitive-analysis` for the full competitor picture beyond closed deals
- `product-positioning-doc` when the losses point to a messaging rather than capability gap
