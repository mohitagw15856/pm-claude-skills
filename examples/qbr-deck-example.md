# Example: qbr-deck

## What this skill does

Builds a slide-by-slide QBR structure and narrative for a customer account: last quarter's results against goals, the value story in the customer's numbers, roadmap preview and mutual commitments.

## How to trigger it

### Example 1: a QBR for a healthy enterprise account

**You say:**
> "QBR deck for [Account], Q3 review. They wanted to cut onboarding admin 30%; we measured 26%. Usage up 40%, 2 open feature requests (SSO group mapping, audit export). Their VP People attends. We want to open an expansion conversation about the recruiting module."

**Claude produces (excerpt):**

# QBR: [Account] × [Your Company]

## Slide 1: Agenda (5 min)
| Time | Topic | Owner |
|---|---|---|
| 0:05 | Q3: how did we do against your goals? | CSM + Customer |
| 0:20 | Value delivered in your numbers | CSM |
| 0:35 | Roadmap preview (your two requests) | Product |
| 0:45 | Q4 goals and the recruiting workflow discussion | Customer + AE |

## Slide 3: Against your goals
Goal: onboarding admin down 30%. Measured: 26% (from 7.5 to 5.6 hours per hire, your HRIS data).
Talking point: own the gap: the remaining 4 points sit in the reference-check step, which leads into the roadmap slide rather than an apology.

## Slide 4: Value in their numbers
At 180 hires/quarter, 1.9 hours saved per hire ≈ 340 hours of People-team time. Say it in headcount terms only if the VP does first.

## Slide 6: Mutual commitments
| Commitment | Owner | Date |
|---|---|---|
| SSO group mapping beta access | [Product] | [date] |
| Q4 goal baseline agreed (reference-check time) | [Customer ops] | [date] |

### Example 2: a QBR where the quarter went badly

**You say:**
> "Same account, but the truth is: two outages, the admin-time goal was missed (12% vs 30%), and the champion is frustrated. Structure it honestly."

**Claude produces (excerpt):**

**Structural change:** the bad news moves to slide 2, before anything self-congratulatory.

## Slide 2: What did not go well (10 min)
- Outages [date] and [date]: cause in one sentence each, and the completed fix actions (link, not slideware)
- Goal missed: 12% vs 30%; the two drivers we can name, and the one we got wrong

Talking point: let the champion add to the list; a QBR where they say it beats one where they sit on it.

## Slide 3 becomes "the plan to earn Q4": three commitments, each with an owner and a date the customer can hold.

**What to cut:** the roadmap preview; showing futures before repairing the present reads as deflection.

## Tips for best results

- Bring the customer's goal and the measured result; a QBR without their baseline is a product demo.
- Convert value into the attendee's unit (hours, hires, revenue) before the meeting, not live.
- If the quarter was bad, say so on slide 2; order is the message.

## Related skills

- `customer-success-plan` for the plan the QBR reports against
- `renewal-playbook` when the QBR is the setup for a renewal motion
