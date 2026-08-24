// Attribution footer policy (growth idea #3).
//
// DEFAULT OFF. Returns the one-line attribution footer for a skill's rendered
// output ONLY when attribution is enabled AND the skill is not on the sensitive
// exclusion list. This is a signpost, never a tracker — the footer is a plain
// URL with no identifiers.
//
// Precedence (most to least authoritative):
//   1. env PM_SKILLS_ATTRIBUTION=off  -> always OFF (hard opt-out)
//   2. env PM_SKILLS_ATTRIBUTION=on   -> ON (unless excluded)
//   3. runtime opt-in (opts.enabled)  -> per-user preference (e.g. localStorage)
//   4. config/attribution.json enabled
//   5. default: OFF
//
// Exclusions (sensitive skills where a branded footer would be inappropriate)
// come from config/attribution.json: excludeBundles + excludeSkills.
//
// Usage:
//   import { attributionFor } from './attribution.mjs';
//   const footer = attributionFor({ skill: 'prd-template', bundle: 'pm-essentials' });
//   // footer === '' when off or excluded; otherwise the footer line.
//
// Self-test:  node scripts/attribution.mjs --selftest

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = join(HERE, '..', 'config', 'attribution.json');

let _cfg = null;
export function loadConfig(path = CONFIG_PATH) {
  if (_cfg && path === CONFIG_PATH) return _cfg;
  const cfg = JSON.parse(readFileSync(path, 'utf8'));
  cfg.excludeBundles = new Set(cfg.excludeBundles || []);
  cfg.excludeSkills = new Set(cfg.excludeSkills || []);
  if (path === CONFIG_PATH) _cfg = cfg;
  return cfg;
}

// Is a skill excluded from attribution regardless of the on/off state?
export function isExcluded({ skill, bundle } = {}, cfg = loadConfig()) {
  if (bundle && cfg.excludeBundles.has(bundle)) return true;
  if (skill && cfg.excludeSkills.has(skill)) return true;
  return false;
}

// Resolve whether attribution is ON, honoring precedence.
export function isEnabled(opts = {}, cfg = loadConfig(), env = process.env) {
  const flag = (env.PM_SKILLS_ATTRIBUTION || '').toLowerCase();
  if (flag === 'off' || flag === '0' || flag === 'false') return false; // hard opt-out
  if (flag === 'on' || flag === '1' || flag === 'true') return true;
  if (typeof opts.enabled === 'boolean') return opts.enabled;            // runtime preference
  return !!cfg.enabled;                                                   // config default (off)
}

// The public entry point: the footer string, or '' if it should not be shown.
export function attributionFor(target = {}, opts = {}, cfg = loadConfig(), env = process.env) {
  if (isExcluded(target, cfg)) return '';
  if (!isEnabled(opts, cfg, env)) return '';
  return cfg.footer;
}

// Append the footer to output text (no-op when off/excluded).
export function withAttribution(output, target = {}, opts = {}, cfg = loadConfig(), env = process.env) {
  const footer = attributionFor(target, opts, cfg, env);
  return footer ? `${output.replace(/\s+$/, '')}\n\n${footer}\n` : output;
}

// ---- self-test ----
function selftest() {
  const cfg = loadConfig();
  let pass = 0, fail = 0;
  const ok = (cond, msg) => { if (cond) { pass++; } else { fail++; console.error('  ✗', msg); } };
  const noEnv = {};

  // Default OFF for a normal skill.
  ok(attributionFor({ skill: 'prd-template', bundle: 'pm-essentials' }, {}, cfg, noEnv) === '',
     'default off for a normal skill');
  // Runtime opt-in turns it on for a normal skill.
  ok(attributionFor({ skill: 'prd-template', bundle: 'pm-essentials' }, { enabled: true }, cfg, noEnv) === cfg.footer,
     'runtime opt-in enables a normal skill');
  // Excluded BUNDLE stays off even when enabled.
  ok(attributionFor({ skill: 'the-year-of-firsts', bundle: 'pm-grief' }, { enabled: true }, cfg, noEnv) === '',
     'excluded bundle (pm-grief) never shows footer');
  // Excluded SKILL stays off even when enabled.
  ok(attributionFor({ skill: 'medical-bill-decoder', bundle: 'pm-decoders' }, { enabled: true }, cfg, noEnv) === '',
     'excluded skill (medical-bill-decoder) never shows footer');
  // Hard opt-out env wins over runtime opt-in.
  ok(attributionFor({ skill: 'prd-template', bundle: 'pm-essentials' }, { enabled: true }, cfg, { PM_SKILLS_ATTRIBUTION: 'off' }) === '',
     'PM_SKILLS_ATTRIBUTION=off overrides opt-in');
  // Env on enables.
  ok(attributionFor({ skill: 'prd-template', bundle: 'pm-essentials' }, {}, cfg, { PM_SKILLS_ATTRIBUTION: 'on' }) === cfg.footer,
     'PM_SKILLS_ATTRIBUTION=on enables');
  // withAttribution appends only when on.
  ok(withAttribution('Body.', { skill: 'x', bundle: 'pm-essentials' }, { enabled: true }, cfg, noEnv).includes(cfg.footer),
     'withAttribution appends when on');
  ok(withAttribution('Body.', { skill: 'x', bundle: 'pm-essentials' }, {}, cfg, noEnv) === 'Body.',
     'withAttribution is a no-op when off');
  // Config default really is off (protects the "no telemetry / low-key" promise).
  ok(cfg.enabled === false, 'config ships with enabled:false');

  console.log(`attribution self-test: ${pass} passed · ${fail} failed`);
  return fail === 0 ? 0 : 1;
}

if (process.argv.includes('--selftest')) {
  process.exit(selftest());
}
