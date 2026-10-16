# Example: Lost Documents Replacement

## What this skill does
Finds the first document to replace when everything is lost, and the order that unlocks the rest.

## How to trigger it

### Example 1: House fire
**You say:**
> "Our house burned down. Passports, birth certificates, bank cards, everything is gone. I have a photo of my passport on my phone."

**Claude produces:**
**1. Start here**
Ask the fire service for an incident report: most offices accept it as proof of what happened. Then apply for a replacement passport or national ID using the photo on your phone and the incident report. Check the official website for the current form, and whether fees are reduced after a disaster *(assumed, confirm)*.

**2. Replacement order**
| # | Document | Unlocks |
|---|---|---|
| 1 | National ID or passport | Everything else |
| 2 | Bank card | Paying fees, receiving aid |
| 3 | Children's birth certificates | Their IDs, school and health records |
| 4 | Property and insurance papers | The insurance claim |

---

### Example 2: Stolen bag
**You say:**
> "My bag was stolen with my ID and bank cards."

**Claude produces:**
1. Call your bank now to block the cards.
2. Report the theft to the police and get a reference.
3. Ask a credit agency for a fraud alert where available, and change passwords for accounts linked to your phone.

---

## Tips for best results
- Say what survives, including photos or emails of documents
- Say who in the household needs documents
- Mention anything urgent, such as travel or a job start date

## Related skills
- `emergency-doc-kit`: keep copies ready before anything happens
- `after-the-disaster`: the first days after a disaster
