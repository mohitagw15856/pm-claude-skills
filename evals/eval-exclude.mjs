// Skills an LLM-as-judge can't fairly score on a text "artifact" rubric — they need
// an image, a live URL/account, or they activate a behaviour rather than produce a
// document. Scoring them yields a misleading low (grounding tanks because there's
// nothing to ground on), so we exclude them from the leaderboard and treat them as
// "not eval-applicable" instead.
//
// Single source of truth — imported by scripts/gen-eval-cases.mjs (which builds the
// eval cases) and scripts/eval-status.mjs (which reports unevaluated bundles), so the
// two never disagree about what's scorable.
export const EVAL_EXCLUDE = new Set([
  'chart-data-extractor',        // needs an image to read
  'substack-notes-scraper',      // needs a live URL
  'instagram-post-downloader',   // needs a live URL / tool
  'thumbnail-creator',           // produces an image
  'email-triage',                // needs a connected Gmail
  'notebooklm-connector',        // external tool / live source
  'morning-intelligence',        // needs live web data
  'context-mode',                // activates a session behaviour, not an artifact
  'claude-superpowers',          // activates a coding discipline, not an artifact
]);
