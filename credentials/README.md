# The Operator's Exam — an open, verifiable credential

Most "AI skills" are ungraded. This is the opposite: a public exam of **professional judgment** — five real situations with no single right answer but clearly better and worse ones — and an open credential you can put on your profile and anyone can verify.

Sit it at **[certified.html](https://mohitagw15856.github.io/pm-claude-skills/certified.html)**.

## How it works

1. **Sit the exam.** Five situations (prioritisation under a forced trade-off, catching a lying metric, a hard message, a premortem, an ethical line). You answer in your own words.
2. **An AI examiner grades each answer** against the fixed rubric in [`exam-1.json`](exam-1.json) — specific, decisive, honest reasoning scores well; vagueness and filler don't. You need **75/100** to pass.
3. **Pass → mint a credential.** You get a badge and a tamper-evident **credential block**: your handle, per-item scores, total, the exam version, an ISO date, and a SHA-256 hash over the exact text of your answers.
4. **Claim a permanent entry** by opening a PR/issue that appends your block to [`registry.json`](registry.json).

## The trust model — public record, not a secret key

This is deliberately **not** a gatekept, proctored exam, and it doesn't pretend to be forge-proof by cryptography. The scores are AI-graded in your browser. What makes a credential here *credible* is that it's **public and auditable**:

- Your **answers are published** in the registry — anyone can read them and judge whether the score is fair.
- CI ([`check-credentials.mjs`](../scripts/check-credentials.mjs)) recomputes the **transcript hash**, so the answers on record are provably the exact ones that were graded — you can't attach a good score to answers you later changed.
- The rubric is **fixed and public**, so grading is consistent and contestable.

In short: the credential is a durable, honest link to *work you did in public*. That's worth more than an unverifiable claim.

## Verify a credential

Anyone can paste a credential block into the **Verify** tab at [certified.html](https://mohitagw15856.github.io/pm-claude-skills/certified.html) — it recomputes the hash locally and confirms the answers weren't altered, the total matches the item scores, and the verdict matches the pass mark.

## Files

| File | What it is |
| --- | --- |
| `exam-1.json` | The exam: items, prompts, rubrics, pass mark. Versioned. |
| `registry.json` | Public list of credential holders (append via PR). |
| `../scripts/check-credentials.mjs` | CI validator (shape, bounds, hash recomputation). |
| `../.github/workflows/credentials-check.yml` | Runs the validator on PRs touching `credentials/**`. |
