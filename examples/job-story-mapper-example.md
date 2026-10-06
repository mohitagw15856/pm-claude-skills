# Example: job-story-mapper

## What this skill does

Maps customer jobs in the Jobs-to-be-Done frame: a core job statement, the job map with pain and underservice ratings, and prioritised job stories across functional, social and emotional dimensions.

## How to trigger it

### Example 1: mapping the job behind a feature request

**You say:**
> "Customers keep asking for 'better reporting' in our field-service app. Map the job for the owner-operator who runs 4 technicians."

**Claude produces (excerpt):**

### Job Story Map: field-service reporting

**Core Job Statement:**
> When the week ends and invoices are due, the owner-operator wants to know which jobs made money and which bled hours, so they can quote and staff the next month profitably.

**Job Map:**

| Step | Sub-Job | Current Solution | Pain Points | Underserved? |
|---|---|---|---|---|
| Define | Decide what "profitable job" means | Gut feel | No consistent cost basis | H |
| Locate | Gather hours per job | Texts techs, paper sheets | Chasing people, evening work | H |
| Execute | Compare quote vs actual | Spreadsheet, monthly at best | Too late to fix the quote | H |
| Monitor | Spot a job going over mid-week | None | Finds out after invoicing | H |

**Job Stories (prioritised by underservice):**
1. When a job passes 80% of quoted hours mid-week, I want to be told before it closes, so I can call the customer about scope rather than eat the overrun. (functional + emotional: dread of that call)
2. When I quote a similar job, I want last quarter's actuals beside the quote, so my price reflects reality, not optimism.

**Opportunity read:** "better reporting" decodes as *mid-job cost visibility*, not prettier month-end charts.

### Example 2: adding social and emotional dimensions

**You say:**
> "Same user. What are the social and emotional jobs around showing these numbers to anyone else?"

**Claude produces (excerpt):**

- **Social:** when the bank or a buyer asks for figures, the owner wants reports that look professionally produced, so the business reads as well-run, not kitchen-table. (Current: embarrassment about hand-made spreadsheets, M underserved)
- **Emotional:** when quoting against bigger firms, they want confidence the number is defensible, so they stop undercutting themselves out of fear. (H underserved; ties to job story 2)

**Product implication:** an export that looks bank-ready is a social-job feature; it would be invisible in a functional-only map.

## Tips for best results

- Anchor on one user in one situation; job maps for "all users" flatten into nothing.
- Describe what they do today, however manual; current workarounds locate the underservice.
- Ask for the functional, social and emotional cut; the second two carry the pricing power.

## Related skills

- `discovery-interview-guide` to gather the evidence behind each rating
- `user-story-writer` to turn the prioritised job stories into buildable stories
