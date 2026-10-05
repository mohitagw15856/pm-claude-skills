// A personal profile the skills can read, so outputs fit the person without
// re-explaining every time: role, seniority, industry, company size, location,
// language and tone. City matters a lot for China's 社保, 公积金 and 落户 rules.
// Stored locally only (never uploaded): $XDG_CONFIG_HOME/pm-skills/profile.json,
// ~/.config/pm-skills/profile.json, or %APPDATA%\pm-skills\profile.json on Windows.
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';

export const FIELDS = {
  role: 'Job title or role, e.g. Senior Product Manager, 后端工程师, teacher',
  seniority: 'Level, e.g. graduate, mid, senior, lead, director',
  industry: 'Industry, e.g. fintech, manufacturing, public sector, education',
  company_size: 'Company size or type, e.g. startup of 20, 国企, multinational',
  country: 'Country or region, e.g. United Kingdom, 中国大陆, Hong Kong, Korea',
  city: 'City, e.g. Shanghai, 深圳, Manchester (local rules often depend on it)',
  language: 'Preferred output language, e.g. British English, 简体中文, 繁體中文',
  tone: 'Preferred writing tone, e.g. concise and direct, formal, warm',
};
const MAX = 120;

export function profilePath(env = process.env) {
  if (env.PM_SKILLS_PROFILE) return env.PM_SKILLS_PROFILE;
  const base = env.XDG_CONFIG_HOME || (process.platform === 'win32' && env.APPDATA) || join(homedir(), '.config');
  return join(base, 'pm-skills', 'profile.json');
}

export function validate(key, value) {
  if (!Object.prototype.hasOwnProperty.call(FIELDS, key)) throw new Error(`Unknown field "${key}". Fields: ${Object.keys(FIELDS).join(', ')}.`);
  const v = String(value ?? '').trim();
  if (v.length > MAX) throw new Error(`"${key}" is longer than ${MAX} characters.`);
  if (/[\r\n<>`]/.test(v)) throw new Error(`"${key}" cannot contain line breaks, angle brackets or backticks.`);
  return v;
}

export function loadProfile(env) {
  const p = profilePath(env);
  if (!existsSync(p)) return null;
  try {
    const raw = JSON.parse(readFileSync(p, 'utf8'));
    const out = {};
    for (const k of Object.keys(FIELDS)) if (raw[k]) out[k] = validate(k, raw[k]);
    return out;
  } catch (e) {
    throw new Error(`Could not read the profile at ${p}: ${e.message}`);
  }
}

export function saveProfile(profile, env) {
  const p = profilePath(env);
  const clean = {};
  for (const [k, v] of Object.entries(profile)) { const c = validate(k, v); if (c) clean[k] = c; }
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(clean, null, 2) + '\n', { mode: 0o600 });
  return p;
}

export function clearProfile(env) {
  const p = profilePath(env);
  rmSync(p, { force: true });
  return p;
}

const LABEL = { role: 'Role', seniority: 'Seniority', industry: 'Industry', company_size: 'Company', country: 'Country or region', city: 'City', language: 'Write in', tone: 'Tone' };

/** The context block agents read alongside the skills. */
export function profileMarkdown(profile) {
  const rows = Object.keys(FIELDS).filter((k) => profile[k]).map((k) => `- **${LABEL[k]}:** ${profile[k]}`);
  return `# About the person you are working for

Use this when running any PM Skills skill: fit examples, terminology, numbers and local rules to it. Where a skill asks for one of these inputs, take it from here instead of asking again; ask only for what is missing. Where location decides a rule (tax, social insurance, labour law), use this location and say so.

${rows.join('\n')}

Set with \`npx pm-claude-skills profile\`; stored only on this computer.
`;
}

export const PROFILE_DESCRIPTION = 'Use alongside any PM Skills skill when producing work for this user: their role, seniority, industry, company, location, language and tone. Produces nothing on its own; it personalises the other skills and saves asking for the same inputs again.';
