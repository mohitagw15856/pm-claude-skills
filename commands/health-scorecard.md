---
description: Build a weighted customer health scorecard for an account.
argument-hint: [account name + usage/support/commercial signals]
---

Apply the **cs-health-scorecard** skill to: $ARGUMENTS

Score each dimension 1–5 with specific evidence, then run `skills/cs-health-scorecard/scripts/health_score.py` to compute the weighted /100 total and RAG band. Produce the scorecard, top risks (specific, not vague), owned/dated actions, and a calibrated renewal forecast with ARR at risk.
