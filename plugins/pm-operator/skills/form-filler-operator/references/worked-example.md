# Worked Example — Form Filler Operator

## The brief

Amara is registering her LLC as a vendor in a county procurement portal — a 6-page form due Friday: business identity, insurance, banking for payments, two reference contracts, and a certifications page. She stages the docs (formation cert, W-9, insurance COI, two contract PDFs) and says: "fill what you can; I'll type the sensitive stuff."

## The output

# Form Run: Ellis County Vendor Registration — Nov 14

**Fact sheet:** 23 facts confirmed from staged documents (legal name, EIN-*location noted but value user-typed*, formation date, NAICS 541511, addresses, insurance carrier/policy/limits/expiry, reference contract numbers + contacts + values) · **Fields:** 31 mapped, **4 user-typed (sensitive)**, **3 open questions**

**Open questions (batched, one interruption):**
1. "Small business certification — county defines it as <$4M avg revenue; do you qualify and want to claim it?" → *Yes, claim it.*
2. "Payment method: ACH or check? ACH requires the banking page (user-typed)." → *ACH.*
3. "Reference #2 contact left that company per your notes — substitute the project manager?" → *Yes, use PM.*

| Field (sample of 31) | Entered | Fact source |
|---|---|---|
| Legal business name | Amara Digital Services LLC | Formation cert, line 1 |
| EIN | **[user-typed]** | W-9 staged — value never handled by agent |
| NAICS code | 541511 | Confirmed sheet (prior filings) |
| Insurance carrier / policy | Hartwell Mutual / CPP-88214-B | COI |
| Policy expiry | 2027-03-31 | COI — *form auto-reformatted to 03/31/2027; verified equivalent* |
| Reference 1 value | $86,500 | Contract PDF p.1 |
| Bank routing/account | **[user-typed]** | Banking page paused; Amara typed both |
| Certification attestation checkbox | **[left unchecked — yours]** | Legal declaration; per protocol |

**Checkpoints:** pages 1–5 verified against the mapping (screenshots attached per page). Page 4 (banking) paused for user-typing as agreed. Page 6 attestation checkbox and e-signature left untouched.

**Status: held at review** — [screenshot: review page, all sections green except signature] — the county's review screen shows all 31 entered fields; the two document uploads (COI, W-9) attached and previewed. **Awaiting your read-through and submit.** One field the form transformed: phone rendered as (512) 555-0184 from 512-555-0184 — equivalent, noted.

## Why it's shaped this way

- **Sheet before form** — 23 facts confirmed up front; the three unknowns were batched into ONE interruption instead of surfacing mid-page, per the framework.
- **Sensitive floor held without being asked twice** — EIN and banking were *located* by the agent but *typed* by Amara; the transcript marks them `[user-typed]`, never their values.
- **The attestation checkbox is structurally hers** — accepting declarations is the banned move; the run ends at the review screen with visual proof.
- **Form transformations are read back** (date and phone reformatting) — verification means reading the form's rendering, not trusting the keystrokes.
- **The substituted reference contact traces to her answer** — nothing entered exists outside the confirmed sheet plus her three batched decisions.
