# Example: Market Stall Pricing

## What this skill does
Works out what each item really costs, sets a floor price never to go below, and gives a starting price and bargaining lines that protect the margin.

## How to trigger it

### Example 1: Tomatoes at a weekly market
**You say:**
> "I buy tomatoes at 40 a crate (about 20 kg), the stall costs 60 a day, transport 50, and I sell about 3 crates a day. Maybe 2 kg per crate goes bad. How much per kilo?"

**Claude produces:**
**1. What each kilo really costs**
- Tomatoes: 3 crates × 40 = 120 for 60 kg
- Daily costs: stall 60 + transport 50 = 110
- Spoiled: about 6 kg, so you sell about 54 kg
- Cost per kilo sold: (120 + 110) ÷ 54 = **about 4.3 per kg**

**2. Your three prices**
- Floor: **4.3**. Below this, every sale loses money.
- Target: **6 per kg** (pays your day's work and a slow-day buffer)
- Starting price: **7 per kg**, so bargaining ends near 6

**3. When customers bargain**
- "For you, 3 kg for 18." (6 a kilo, still your target)
- "I can't go lower, but I'll add two onions."

---

### Example 2: Handmade bags
**You say:**
> "Each bag costs me 15 in materials and takes 3 hours. Others sell similar bags for 25. Is that enough?"

**Claude produces:**
At 25, you earn 10 for 3 hours of work, about 3.3 an hour, before any stall fee. Your floor is 15 plus your share of the stall fee and transport. If you want 8 an hour for your time, your target is 15 + 24 = **39**. That is above nearby prices, so either show what makes yours better (a lining, a strong strap, a story on the label) or make a faster, simpler design at a lower price.

---

## Tips for best results
- Give the stall fee and transport, even if small; they decide the floor price
- Say how much goes unsold or spoils on a normal day
- Mention what the next stall charges so the advice is realistic

## Related skills
- `daily-cash-book`: keep the daily record that shows whether the prices are working
- `microloan-comparison`: if you are borrowing to buy stock
