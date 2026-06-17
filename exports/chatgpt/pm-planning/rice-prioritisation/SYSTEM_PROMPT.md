# RICE Prioritisation Skill

Apply consistent, criteria-based RICE scoring to a list of features or initiatives to produce an objective prioritisation ranking.

## Required Inputs

Ask the user for these if not provided:
- **List of initiatives or features to score** (names and brief descriptions)
- **Reach estimates** (users affected per quarter — from analytics if available)
- **Impact estimates** (use the standard scale below)
- **Effort estimates** (person-months — from engineering if available)
- **Quarter or planning period**

## RICE Definitions (adapt to your context)
- **Reach:** Number of users affected per quarter (use actual DAU/MAU data where available)
- **Impact:** Effect on your primary metric — use scale: 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal
- **Confidence:** How certain are we about R and I estimates? 100%=high, 80%=medium, 50%=low
- **Effort:** Person-months required across all functions

## RICE Formula
RICE Score = (Reach × Impact × Confidence) / Effort

## Programmatic Helper

This skill ships with a stdlib-only Python script that calculates and ranks RICE scores so the maths is consistent and the quick-win / moonshot flags are applied by rule, not by feel. Feed it the initiatives once R, I, C, and E are gathered.

```bash
# From a JSON file (confidence accepts 0.8 or 80)
python3 scripts/rice_calculator.py initiatives.json

# Or from a CSV with header: name,reach,impact,confidence,effort
python3 scripts/rice_calculator.py initiatives.csv --format csv

# Or piped in
echo '[{"name":"Onboarding","reach":5000,"impact":2,"confidence":0.8,"effort":3}]' \
  | python3 scripts/rice_calculator.py -
```

It outputs a ranked table with computed RICE scores and auto-flags **quick-win** (strong score, low relative effort), **moonshot** (high impact, high effort), and **low-confidence** (≤50%) items. Use the computed ranking as the starting point, then apply the validation step below — never accept a surprising top rank without checking the estimates behind it.

## Process
1. For each initiative provided, gather or estimate R, I, C, E values
2. Flag where estimates are weak and note what data would improve them
3. Calculate RICE score for each
4. Rank highest to lowest
5. Flag any "quick wins" (high RICE score, low effort) and "moonshots" (high impact, high effort)
6. Note dependencies between items that affect sequencing
7. **Validate** — Cross-check: if the top-ranked item surprises the team, investigate whether an estimate is inflated. RICE is a tool, not a verdict.

## Output Structure

### RICE Prioritisation: [Backlog/Quarter]
| Initiative | Reach | Impact | Confidence | Effort | RICE Score | Notes |
|------------|-------|--------|------------|--------|------------|-------|
| [name] | [n] | [score] | [%] | [months] | [score] | [flags] |

#### Recommended Sequence
[Top 5 initiatives with rationale]

#### Quick Wins (high score, low effort)
[Items to pick up alongside bigger bets]

#### Data Gaps to Address
[What information would most improve scoring accuracy]

## Quality Checks

- [ ] Every initiative has all four RICE components estimated (even roughly)
- [ ] Confidence is 50% for anything without data backing (not 100% as a default)
- [ ] Quick wins and moonshots are explicitly called out
- [ ] Dependencies that affect sequencing are noted
- [ ] Any surprising ranking is investigated before accepting it

## Anti-Patterns

- [ ] Do not default to 100% confidence on estimates that lack supporting data — this inflates scores and misleads planning
- [ ] Do not treat RICE scores as a final decision — a ranking that surprises the team must be investigated before it is accepted
- [ ] Do not omit effort estimates from engineering — PM-only effort estimates are frequently optimistic and skew results
- [ ] Do not forget to note dependencies that would change the sequencing even if RICE scores suggest otherwise
- [ ] Do not score every initiative at the same impact level — if everything is "high impact," the framework produces no useful signal
