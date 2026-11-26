# Example: Form Explainer

## What this skill does
Explains an official form box by box in plain words: what it is for, what to put, what to have ready, and what happens next.

## How to trigger it

### Example 1: A P45 after leaving a job
**You say:**
> "I just left my job in the UK and they gave me a P45. What is it and what do I do with it?"

**Claude produces:**
**1. What this form is**
A P45 is the form your employer gives you when you stop working for them. It shows your pay and the tax taken so far this tax year, and your tax code. It has several parts: one you keep, and one you give to your next employer.

**2. Box by box**
| Part | What it means | What to do |
|---|---|---|
| Tax code | The code used to work out your tax | Check it matches your last payslip |
| Total pay and tax to date | What you earned and paid this tax year | Your next employer uses these figures |
| Your copy | Your record | Keep it; you may need it for a tax refund |

**5. Next steps**
Give the new-employer part to your next employer when you start. If you do not start a new job, keep it; you may need it to claim a refund or benefits *(assumed, confirm the current guidance on GOV.UK)*.

---

### Example 2: A W-4 in the United States
**You say:**
> "My new employer wants a W-4. I have two kids. What do I put in the dependants step?"

**Claude produces:**
The W-4 tells your employer how much federal income tax to withhold from your pay. The dependants step is where you can claim credits for qualifying children, which reduces the tax withheld. Check the current year's form and instructions on IRS.gov for the amounts per child, and fill in only the steps that apply to you; leaving optional steps blank is allowed.

---

## Tips for best results
- Say which country issued the form, and the year or version if you can see it
- Photograph the whole form, both sides
- Say what you need: to understand it, to fill in particular boxes, or what to do next

## Related skills
- `form-filler-operator`: an agent fills a web form for you from approved facts
- `lost-documents-replacement`: when the form asks for documents you no longer have
