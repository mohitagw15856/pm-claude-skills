// The PM-8B held-out split, shared by build-pm-8b-mix.mjs and teacher-pass.mjs.
// Deterministic (a hash of the skill name): about 10% of skills never reach
// training, so the held-out evaluation measures generalisation, not recall.
import { createHash } from 'node:crypto';

export const HOLDOUT_PCT = 10;
export const heldOut = (skill) => createHash('sha256').update(`pm-8b:${skill}`).digest()[0] % 100 < HOLDOUT_PCT;
