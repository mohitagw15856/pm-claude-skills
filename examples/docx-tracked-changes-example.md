# Example: docx-tracked-changes

## What this skill does

Produces a proper redline for a Word document: a summary with change counts and an overall assessment, the meaning-affecting changes with reasons, line-by-line tracked changes (original, marked-up, clean), and margin comments for issues without a proposed wording.

## How to trigger it

### Example 1: redlining a vendor contract

**You say:**
> "Redline this services agreement [uploaded .docx] from our side as the customer. Biggest concerns: the auto-renewal, unlimited liability on our side, and they can change prices with 30 days' notice."

**Claude produces (excerpt):**

### 1. Redline Summary

**Document:** Master Services Agreement, [vendor]
**Review type:** customer-side markup | **Reviewer:** customer
**Total changes:** Insertions: 9 / Deletions: 6 / Comments: 4
**Overall assessment:** close to usable, but three clauses transfer disproportionate risk to the customer; all three have standard market alternatives the vendor is likely to accept.

### 2. Top-Level Changes

**Change 1: Section 11.2 (Renewal)**
- Original: "This Agreement shall automatically renew for successive twelve (12) month terms unless either party provides notice ninety (90) days prior to expiry."
- Suggested: "This Agreement shall renew for successive twelve (12) month terms upon the Customer's written confirmation no later than thirty (30) days prior to expiry."
- Reason: substantive; converts a miss-the-window trap into an opt-in, and 90 days is beyond the customer's budget cycle.

### 3. Line-by-Line Tracked Changes (excerpt)

**Section 14.1, Liability**

Original:
> The Customer's liability under this Agreement shall be unlimited in respect of all claims arising.

Tracked changes:
> The Customer's liability under this Agreement shall be ~~unlimited in respect of all claims arising~~ **limited to the fees paid or payable in the twelve (12) months preceding the claim, except for claims arising from breach of confidentiality or wilful misconduct**.

Clean version:
> The Customer's liability under this Agreement shall be limited to the fees paid or payable in the twelve (12) months preceding the claim, except for claims arising from breach of confidentiality or wilful misconduct.

### 4. Margin Comments

**Comment 2: Section 8.3 (price changes):** 30 days' notice for price increases with a 90-day termination notice means you can be priced up without a practical exit. No wording proposed; this is a commercial point to negotiate (cap increases at CPI or align the two notice periods). Flagging rather than drafting, since the right answer depends on your leverage.

### Example 2: a light-touch review of a policy doc

**You say:**
> "Tracked changes on our 6-page remote work policy; tone should stay friendly, just fix ambiguity and contradictions."

**Claude produces (excerpt):**

**Overall assessment:** near-final; one real contradiction and three ambiguities. Section 2 says "core hours 10-3" while section 5's example references "the 9-4 core window"; proposed harmonising to 10-3 throughout (the more recently edited section), with a margin comment asking which was intended rather than silently picking.

## Tips for best results

- Say which side you're on and your top concerns; a redline has a direction, not just corrections.
- Keep the clean-version blocks; whoever applies the changes in Word works from those.
- Expect comments instead of edits where the fix is a business decision; drafting it would hide the choice.

## Related skills

- `word-document` to generate a fresh .docx rather than mark up an existing one
- `lease-decoder` for decoding a contract you're reading rather than redlining one you're negotiating
