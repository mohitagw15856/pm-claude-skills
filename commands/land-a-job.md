---
description: Workflow recipe — go after a specific role end to end by chaining 4 skills: decode the JD, research the company, tailor your application, and prep the interview.
argument-hint: "[the role + company, or paste the job description]"
---

Run the **Land a Job** workflow recipe for: $ARGUMENTS

This is a *chain* of skills. Run each stage in order and **carry every stage's output forward as context** for the next — that shared context is the whole point. Open with a one-line plan of the 4 stages, then ask once for any essential missing inputs (the job description, the company, and the candidate's CV / background). Don't re-ask between stages.

Run each stage under a clear `## Stage N — <name>` heading:

1. **Decode the role** — apply the `jd-decoder` skill to the job description: the real must-haves vs. nice-to-haves, hidden priorities, an honest fit assessment, and the exact phrases to mirror.
2. **Research the company** — apply the `company-brief` skill to build a candidate's brief: how they make money, their trajectory, and the challenges this role would touch.
3. **Tailor the application** — apply the `job-application` skill, using the decode + company brief, to produce an ATS-tailored CV summary and a cover letter aligned to what this employer actually wants.
4. **Prep the interview** — apply the `interview-prep` skill to build a prep pack tailored to this role and round: likely questions, STAR answers from the candidate's background, a story bank, and sharp questions to ask.

Do not invent the candidate's experience, the company's facts, or metrics — work with what's given and mark assumptions. After the last stage, end with a 4-bullet **"What you now have"** recap linking each artifact to the stage that produced it, and a one-line "next step" (e.g. send it, or follow up).
