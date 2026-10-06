# The severity scale

Every decoder skill in the library (the [pm-decoders](../plugins/pm-decoders/) family: leases, medical bills, job offers, insurance policies, contracts) rates each finding on the same three-level scale, ordered by real-world cost. The colours are deliberate: a reader skimming a decode should be able to find the expensive lines in seconds.

## The levels

- 🔴 **Can cost you real money.** Clauses and line items with a direct, computable downside: auto-renewal into a full new term, break penalties beyond re-rental costs, repair or maintenance burden shifted to you, deposit-return conditions written to fail, fee stacking, liability waivers, uncapped escalation formulas. Where the cost can be computed, the decode shows the arithmetic, not just the flag.
- 🟡 **Unusual: push back or clarify.** Terms outside common practice that a counterparty will often amend when asked: entry with short or no notice, "discretionary" bonus language, mandatory providers, unilateral change-of-terms rights, vague wear-and-tear or "excessive use" standards. The decode pairs each with the question or amendment to ask for.
- 🟢 **Standard boilerplate.** Said plainly, so the reader knows what not to worry about. Half the value of a decode is the list of things that are fine; a decode that flags everything flags nothing.

## Rules the scale follows

1. **Ordered by cost, not by outrage.** A clause that reads badly but costs nothing is 🟢 with a note; a bland-sounding clause that silently costs a month's rent is 🔴.
2. **Arithmetic shown.** A 🔴 finding carries the realistic worst case in money or hassle, with assumptions labelled.
3. **Enforceability is flagged, never declared.** Where a clause is commonly unenforceable, decodes say "often unenforceable; ask a local [tenant organisation / regulator / lawyer]; enforceability varies by jurisdiction" and never state it as universal fact.
4. **The disclaimer is part of the output.** Every decoder ends with its verbatim not-advice line; the scale informs, it does not advise.

## Where it is used

See any decoder's `SKILL.md` for the scale applied to its document type, for example [lease-decoder](../skills/lease-decoder/SKILL.md), [benefits-decoder](../skills/benefits-decoder/SKILL.md) or [claim-denial-decoder](../skills/claim-denial-decoder/SKILL.md). Risk tiers for the library as a whole (which skills are high-stakes and queue for human review) are a separate system: [RISK-TIERS.md](RISK-TIERS.md).
