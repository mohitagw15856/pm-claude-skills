# Worked Example — Expense Filer

## The brief

After a 3-day customer-visit trip to Chicago, Yuki dumps 14 receipt photos and two forwarded email receipts into a folder. Policy: meals cap $75/day, alcohol non-reimbursable, itemized receipts over $25. System: Expensify, report in USD, cost center CS-114. "File it — draft only, I'll hit submit."

## The output

# Expense Report: Chicago customer visit — Nov 11–13 · CS-114

| # | Date | Merchant | Amount | Curr | → USD | Category | Receipt | Flags |
|---|---|---|---|---|---|---|---|---|
| 1 | 11/11 | United Airlines | 428.60 | USD | 428.60 | Airfare | ✓ email | — |
| 2 | 11/11 | Palmer House | 3 × 189.00 + tax = 634.19 | USD | 634.19 | Lodging | ✓ folio | — |
| 3 | 11/11 | Girl & the Goat | 96.40 | USD | 96.40 | Meals | ✓ itemized | 🔴 Two flags: exceeds $75 daily cap by $21.40; line 4 of the itemization is "Malbec glass ×2, $24" — alcohol non-reimbursable. Reimbursable portion: **$72.40** — under cap once wine is removed |
| 4 | 11/12 | Lou Mitchell's | 18.75 | USD | 18.75 | Meals | ✓ | — |
| 5 | 11/12 | Sepia | 71.20 | USD | 71.20 | Meals | ✓ itemized | — |
| 6 | 11/12 | Uber ×3 | 14.20 / 22.85 / 9.75 | USD | 46.80 | Ground transport | ✓ | — |
| 7 | 11/13 | Uber | 22.85 | USD | — | — | ✓ | 🔴 Duplicate suspicion: identical amount+route to #6b, timestamps 4 minutes apart — likely a double-capture. **Excluded pending your confirm** |
| 8 | 11/13 | Argo Tea | 6.40 | USD | 6.40 | Meals | ✓ | — |
| 9 | 11/13 | O'Hare parking | 78.00 | USD | 78.00 | Parking | ✓ | 🟡 Over $25 with a summary receipt only — attach the credit-card line or the itemized kiosk receipt |
| 10 | 11/11 | "IMG_4482.jpg" | 12.00? | ? | — | — | ✗ blurry | 🔴 Unreadable — amount uncertain, merchant unknown. **Not entered** — reshoot or drop |

**Reconciliation:** receipts total (excl. #7 dup, #10 unreadable, wine removed) = **$1,382.74** · report total = **$1,382.74** ✓ to the cent.

**Flags needing you (4):** ① Confirm wine removal on #3 (entered at $72.40) ② Confirm #7 is the duplicate (excluded) ③ Better receipt for parking ④ Reshoot or drop IMG_4482.

**Filing plan (draft only, per your instruction):** create 9 entries in Expensify under CS-114, attach receipts per line, save as **draft** — submit stays yours.

*[Executed: draft report "Chicago Nov 11-13" created; system shows 9 entries, $1,382.74, every entry with attachment. System total matches approved total. Not submitted.]*

## Why it's shaped this way

- **The wine came off the line, with the arithmetic shown** ($96.40 → $72.40) — policy screening that *adjusts and explains* beats both silent inclusion (audit risk) and silent exclusion (missing money).
- **The duplicate is excluded pending confirmation, not deleted** — 4-minutes-apart identical Ubers is a flag, not a verdict; ambiguity asks, per the framework.
- **The unreadable receipt refuses to become a number** — a guessed $12 fails the provenance rule; "not entered" is the honest state.
- **Reconciliation is to the cent, printed** — the report doesn't ship on "$3 off is close."
- **Draft-only was the instruction, so submit doesn't happen** — and the verification says so explicitly; the gate is the feature.
