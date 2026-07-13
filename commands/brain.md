---
description: Set up or use your Professional Brain — init, ingest, recall, or review.
argument-hint: "[init | ingest <thing> | recall <query> | review]"
---

Apply the **professional-brain** skill to: $ARGUMENTS

- `init` — scaffold `brain/` (copy from `templates/brain/`) and migrate any existing `pm-context.md`.
- `ingest <thing>` — save the original to `source/`, synthesise facts into the durable layer, tag each with provenance.
- `recall <query>` — answer from memory using `scripts/brain_query.py`, citing each fact's file and tag; say so if memory is thin.
- `review` — weekly sweep: flag stale hypotheses, decisions due to reopen, and contradictions.

Default the brain location to `./brain/`. Never invent facts the brain doesn't hold, and never drop provenance tags.
