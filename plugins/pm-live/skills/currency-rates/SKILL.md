---
name: currency-rates
description: "Convert currencies and fetch live exchange rates with zero API keys — Frankfurter (ECB rates) primary, open.er-api.com fallback, via plain curl. Use when asked convert 500 dollars to euros, what's the USD-INR rate, how much is this in my currency, or historical exchange rate for a date. Produces the conversion with the rate and its date quoted, the rerunnable command, and the not-a-trading-quote caveat."
---

# Currency Rates Skill

Currency conversion is a daily agent chore with a clean keyless answer: Frankfurter serves European Central Bank reference rates (current and historical) over bare HTTPS, and open.er-api.com covers the long tail of currencies Frankfurter doesn't track. This skill knows both, always quotes the rate *and its date*, and never confuses a reference rate with the rate any bank will actually give.

## What This Skill Produces

- **The conversion** — the amount, converted, stated first
- **The rate and its date** — reference rates update on banking days; the date is part of the answer
- **The command** — exact curl, rerunnable and scriptable
- **The caveat** — reference rates ≠ what a card, bank, or exchange desk will charge; the spread is real

## Required Inputs

Ask for these if not provided:
- **From, to, and amount** — ISO codes resolved from natural language ("dollars" → USD unless context says AUD/CAD/SGD — ask when genuinely ambiguous)
- **When** — today (default) or a historical date (Frankfurter serves history back to 1999)
- **The purpose, if it matters** — budgeting tolerance vs. invoice-precision changes how hard to caveat the spread

## Framework: The Two Sources

1. **Frankfurter — primary (ECB reference rates):** latest: `curl -s "https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR,INR"` · convert directly: `...?amount=500&base=USD&symbols=EUR` · historical: `https://api.frankfurter.dev/v1/2024-03-15?base=USD&symbols=EUR` · a date range for trends: `.../v1/2026-01-01..2026-07-01?base=USD&symbols=EUR`. ~30 major currencies, updated ~16:00 CET on ECB working days.
2. **open.er-api.com — fallback and long tail:** `curl -s "https://open.er-api.com/v6/latest/USD"` → 160+ currencies in one response. Use when Frankfurter lacks the currency (many African, Asian, Latin American currencies) or is down. Quote its `time_last_update_utc` field.
3. **Date honesty:** both responses carry the rate's date — quote it verbatim. A Saturday question gets Friday's rate, and the answer says so.
4. **The spread sentence:** consumer conversions happen 1–4% worse than reference (card networks near the low end, airport desks at the high end). For "how much will I get" questions, give the reference number *and* the realistic band.
5. **Arithmetic discipline:** for cross rates neither API serves directly, convert through the base and show the two hops; round to sensible precision (whole yen, cents for EUR/USD) rather than echoing eight decimals of false precision.

## Output Format

# Conversion: [amount] [FROM] → [TO]

**[Converted amount] at [rate], ECB/reference rate dated [date].**

[If relevant: "expect roughly X–Y after typical consumer spread"]
[Historical/trend questions: the series or the two dates compared]

Source: [Frankfurter (ECB) / open.er-api.com] · rerun: `[exact curl]`
*Reference rates for information — not a trading quote; actual bank/card rates include a spread.*

## Quality Checks

- [ ] The rate's date is quoted, not implied
- [ ] Ambiguous currency words ("dollars", "francs") resolved or asked about
- [ ] "How much will I get" questions include the spread band
- [ ] The fallback engaged silently when needed, and the answer names its source
- [ ] Precision is sensible for the currency pair

## Anti-Patterns

- [ ] Do not answer from memory — rates move; no network means hand over the command
- [ ] Do not present reference rates as attainable consumer rates
- [ ] Do not silently serve a stale weekend rate as "today's" — date it
- [ ] Do not echo full API precision — eight decimals on a lunch bill is theater
- [ ] Do not give currency-trading advice — conversion is arithmetic; timing the market is not this skill
