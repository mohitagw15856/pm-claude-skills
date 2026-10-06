# Example: tornado-sensitivity

## What this skill does

Runs one-at-a-time sensitivity on a model's drivers and ranks them into a tornado: which assumption actually moves the answer, each driver's share of total swing, and a real .xlsx via a bundled zero-dependency script.

## How to trigger it

### Example 1: ending an LTV argument

**You say:**
> "Our LTV model: ARPU £42/month (range £38-48), gross margin 71% (68-74%), monthly churn 2.1% (1.6-3.0%), CAC £310 (280-360). The team keeps arguing about CAC. Which driver actually matters?"

**Claude produces (excerpt):**

Running the bundled sensitivity script (LTV = ARPU × margin / churn, each driver swung low to high):

**The tornado table:**

| Driver | Low → High | LTV at low | LTV at high | Swing | Share of total swing |
|---|---|---|---|---|---|
| Monthly churn | 3.0% → 1.6% | £994 | £1,864 | £870 | 58% |
| ARPU | £38 → £48 | £1,284 | £1,623 | £339 | 23% |
| Gross margin | 68% → 74% | £1,360 | £1,480 | £120 | 8% |
| CAC | £360 → £280 | (payback only) | | £80 equiv. | 5% |

**The meeting verdict:** churn owns 58% of the uncertainty; CAC, the thing the room is debating, owns 5%. The next diligence hour goes to tightening the churn range (1.6 to 3.0% is wide because it mixes monthly and annual-plan customers); ARPU can be decided and moved on. Nobody should present an LTV without saying which churn it assumes.

**The interaction caveat:** one-at-a-time treats price and churn as independent; if the £48 ARPU case comes from a price rise, churn will not stay at 2.1%. Model price-and-churn as one paired driver before anyone banks the top-right corner.

### Example 2: finding out the range is the problem

**You say:**
> "Same model, but honestly we don't know churn: finance says 1.5%, support says 3.5%."

**Claude produces (excerpt):**

**Re-run with the honest range (1.5 to 3.5%):** churn's share of swing rises to 71%, and LTV spans £852 to £1,988, a 2.3× range. 

**What the tornado is telling you:** this is no longer a sensitivity finding; it is a measurement finding. The bounds are the problem; no decision downstream of LTV is safe until finance and support reconcile whose churn number is real (likely a cohort definition mismatch). That reconciliation is worth more than any modelling.

## Tips for best results

- Give a low and high per driver, not just the point estimate; the ranges are the input, the point is decoration.
- Say what the room is arguing about; the verdict names whether the argument is worth having.
- Flag drivers that move together; paired drivers should be swung as one.

## Related skills

- `runway-monte-carlo` when the question is survival over time rather than which input matters
- `pricing-sensitivity-model` when the driver under the microscope is price specifically
