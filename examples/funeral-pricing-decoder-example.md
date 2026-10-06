# Example: funeral-pricing-decoder

## What this skill does

Decodes a funeral home price list while you're grieving: the non-declinable basic fee found first, packages re-priced against the home's own itemised list, a decline-safely list, warm questions for the director, and a like-for-like comparison across homes. Consumer information, not legal advice.

## How to trigger it

### Example 1: "is this price fair?"

**You say:**
> "Help me read this price list; dad died Tuesday and we meet the funeral director tomorrow. Their 'Tribute Package' is $9,800. The itemised list is attached. Burial, one viewing, nothing elaborate."

**Claude produces (excerpt):**

### Funeral price decode: [home] · burial · [date]

First, briefly: sorry about your dad. The list below exists so tomorrow's meeting spends your attention on him, not on arithmetic.

**The non-declinable floor:** basic-services fee **$2,495** (applies whatever you choose; it is the real price of this home) · immediate-burial benchmark $3,890.

**Package check:** "Tribute Package" $9,800 vs the same items priced off their own itemised list: **$8,435**, a **$1,365 premium for bundling**. The package also contains three declinable items presented as included care: the "protective" casket upgrade ($1,200 over the standard it replaces), 'memorial stationery suite' ($345), and a second limousine ($425).

**Line-by-line (excerpt)**

| Item | Price | Class | Note |
|---|---|---|---|
| Basic services fee | $2,495 | mandatory | compare this number across homes |
| Embalming | $895 | required-if-chosen | for one viewing, ask; refrigeration ($295) often suffices; verify locally |
| "Protective" casket | $3,495 | declinable upgrade | gasketed caskets do not preserve remains; where the US Rule applies, homes may not claim otherwise |
| Cemetery fees | $2,100 | pass-through | ask if marked up; payable directly |

**Decline-safely list:** the casket upgrade (the $2,295 standard serves the same purpose), stationery, second car, and possibly embalming given one viewing; each question below is phrased so it is easy to ask.

**Questions for the director (warm phrasings):** "We'd like to work from the itemised list rather than a package; can we go line by line?" · "Is embalming required for the viewing we're planning, or is refrigeration an option?" · "If we provide a casket, is there any handling fee?"

> Consumer information, not legal advice; itemisation rights and embalming rules vary by country (strongest stated protections are US, FTC Funeral Rule); verify locally. None of this arithmetic is a comment on how much anyone loved anyone.

### Example 2: comparing two homes without ten phone calls

**You say:**
> "Two homes quoted: A's basic fee $1,895, direct cremation $2,400. B's basic fee $3,250, direct cremation $4,900. B feels nicer. Mum wanted cremation and a small gathering."

**Claude produces (excerpt):**

**The two floors tell the story:** B prices every service from a baseline roughly double A's; the niceness of the building is in that number. For a direct cremation plus a gathering you host yourselves (which can be anywhere; the home is only needed for the cremation), home A's path costs ~$2,400 + venue, against B's $4,900 before the gathering. If B's rooms matter to the family, ask B to price *only* the cremation and compare again; the $2,500 gap is the price of the lobby, and it is a fine thing to pay for only if you choose it knowingly.

> Consumer information, not legal advice; verify local rules. The gathering's warmth comes from who is in the room, not which room.

## Tips for best results

- Ask for the itemised general price list before the meeting; decoding works on it, not the brochure.
- Compare basic-services fees across homes first; it is the fastest meaningful comparison grief allows.
- Bring one non-family friend to the meeting; they can ask the money questions kindly on your behalf.

## Related skills

- `care-home-contract-decoder` for the contract that often precedes this conversation
- `claim-denial-decoder` if a funeral-expense insurance claim is refused
