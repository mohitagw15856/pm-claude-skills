#!/usr/bin/env node
// Localization pipeline: translate SKILL.md files into a target language,
// preserving structure, frontmatter contract, and the SkillCheck quality bar.
// Output lands in i18n/<lang>/skills/<name>/SKILL.md with translation
// provenance in the frontmatter metadata (machine-translated, review: pending).
//
//   ANTHROPIC_API_KEY=… node scripts/translate-skills.mjs --lang es
//   … --lang pt --skills prd-template,meeting-notes     # subset
//   … --lang hi --tier production                        # Production-Ready tier only (default)
//   … --lang ja --all                                    # the whole library (costs real tokens)
//   … --lang de --descriptions --all                     # descriptions only — the discovery layer
//   … --check                                            # validate existing i18n/ files, no API
//
// Two units of translation, deliberately:
//   full body      the whole SKILL.md. Expensive, and only worth it for skills
//                  a speaker of that language will actually sit and read.
//   descriptions   just the frontmatter description, into
//                  i18n/<lang>/descriptions.json. The description is the entire
//                  basis on which a model decides a skill is relevant, so
//                  translating it is what makes the library *findable* in a
//                  language — at roughly 2% of the tokens of a full pass.
//
// Rules the translator enforces (in the prompt AND post-checked here):
//   • frontmatter `name` stays identical (routing key, never translated)
//   • all ## headings keep an English anchor: "## Salidas requeridas (Required Inputs)"
//     …no — headings are translated fully; SECTION ORDER and counts must match source
//   • code blocks, script paths, URLs, and skill cross-references stay untouched
//   • the description is translated but keeps the three-part shape (what / use when / produces)
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes(`--${n}`);

const LANGS = { es: 'Spanish', pt: 'Brazilian Portuguese', hi: 'Hindi', ja: 'Japanese', de: 'German', fr: 'French', zh: 'Simplified Chinese', ko: 'Korean' };
const lang = arg('lang', '');
const checkOnly = has('check');
const model = arg('model', 'claude-haiku-4-5-20251001'); // translation is Haiku-shaped work
const apiKey = process.env.ANTHROPIC_API_KEY || '';

// ── --check: validate existing translations, no network ──────────────────────
function structure(md) {
  const body = md.replace(/^---[\s\S]*?---\n/, '');
  return {
    headings: (body.match(/^## /gm) || []).length,
    codeBlocks: (body.match(/^```/gm) || []).length,
    name: (md.match(/^name:\s*["']?([\w-]+)/m) || [])[1] || '',
  };
}
if (checkOnly) {
  const i18nDir = join(root, 'i18n');
  if (!existsSync(i18nDir)) { console.log('No i18n/ directory yet — nothing to check.'); process.exit(0); }
  let errs = 0, n = 0;
  for (const lg of readdirSync(i18nDir)) {
    const skillsDir = join(i18nDir, lg, 'skills');
    if (!existsSync(skillsDir)) continue;
    for (const name of readdirSync(skillsDir)) {
      const tf = join(skillsDir, name, 'SKILL.md'), sf = join(root, 'skills', name, 'SKILL.md');
      if (!existsSync(tf)) continue;
      n++;
      if (!existsSync(sf)) { console.error(`✗ ${lg}/${name}: source skill no longer exists`); errs++; continue; }
      const t = structure(readFileSync(tf, 'utf8')), s = structure(readFileSync(sf, 'utf8'));
      if (t.name !== name) { console.error(`✗ ${lg}/${name}: frontmatter name "${t.name}" was translated/changed`); errs++; }
      if (t.headings !== s.headings) { console.error(`✗ ${lg}/${name}: ${t.headings} sections vs source ${s.headings}`); errs++; }
      if (t.codeBlocks !== s.codeBlocks) { console.error(`✗ ${lg}/${name}: code-block count drifted`); errs++; }
    }
  }
  console.log(errs ? `${errs} error(s) across ${n} translations` : `All ${n} translation(s) structurally consistent ✓`);
  process.exit(errs ? 1 : 0);
}

// ── Translate ─────────────────────────────────────────────────────────────────
if (!LANGS[lang]) { console.error(`--lang required. Supported: ${Object.keys(LANGS).join(', ')} (add more in LANGS).`); process.exit(1); }
if (!apiKey) { console.error('ANTHROPIC_API_KEY required (translation calls the API).'); process.exit(1); }

const tiers = JSON.parse(readFileSync(join(root, 'skill-tiers.json'), 'utf8'));
let names;
if (arg('skills', '')) names = arg('skills').split(',').map((s) => s.trim());
else if (has('all')) names = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md')));
else names = tiers.productionReady; // default: the flagship tier — best ROI per token

const langName = LANGS[lang];
const SYSTEM = `You are a professional technical translator localising AI skill definitions into ${langName}.
Translate the document faithfully and naturally — a native professional should not smell translation.
HARD RULES:
1. The YAML frontmatter "name:" value stays EXACTLY as-is (it is a routing key).
2. Translate the "description:" but preserve its three-part shape: what it does / "Use when…" triggers (translated to what a ${langName}-speaking user would actually type) / "Produces…".
3. Keep every ## section, in the same order — translate the heading text, never drop or merge sections.
4. Code blocks, shell commands, file paths, URLs, skill names in backticks (like \`rice-prioritisation\`), and [links](…) targets stay untranslated; link LABELS are translated.
5. Checklists keep their "- [ ]" markers. Tables keep their column count.
6. Domain terms with established English usage in ${langName} professional settings (e.g. "PRD", "OKR", "churn", "sprint") stay in English where that is what professionals say.
Output ONLY the translated document, starting with ---.`;

async function translate(md) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: 8192, system: SYSTEM, messages: [{ role: 'user', content: md }] }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(j.error?.message || res.status);
  return j.content?.[0]?.text || '';
}

// ── --descriptions: translate the discovery layer only ───────────────────────
if (has('descriptions')) {
  const outFile = join(root, 'i18n', lang, 'descriptions.json');
  const existing = existsSync(outFile) ? JSON.parse(readFileSync(outFile, 'utf8')) : { lang, review: 'pending', descriptions: {} };
  const pending = names.filter((n) => !existing.descriptions[n] || has('force'));
  console.log(`Translating ${pending.length} description(s) → ${langName} (${model}); ${names.length - pending.length} already present.`);

  const DESC_SYSTEM = `You translate one-line AI skill descriptions into ${langName}.
Preserve the three-part shape exactly: what it does / "Use when…" triggers / "Produces…".
The triggers must be what a ${langName}-speaking professional would actually type, not a literal translation of the English.
Keep domain terms that ${langName} professionals use in English (PRD, OKR, sprint, churn) in English.
Output ONLY the translated description, as one line, with no quotes around it and no preamble.`;

  let dOk = 0, dFail = 0;
  // Batched to keep the request count sane over 1153 skills.
  const BATCH = 20;
  for (let i = 0; i < pending.length; i += BATCH) {
    const chunk = pending.slice(i, i + BATCH);
    const payload = chunk.map((n) => {
      const src = readFileSync(join(root, 'skills', n, 'SKILL.md'), 'utf8');
      const d = (src.match(/^description:\s*"?([\s\S]*?)"?\s*$/m) || [, ''])[1];
      return { name: n, description: d.trim() };
    }).filter((x) => x.description);
    if (!payload.length) continue;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model, max_tokens: 8192,
          system: `${DESC_SYSTEM}\n\nYou will receive a JSON array of {name, description}. Reply with ONLY a JSON object mapping each name to its translated description.`,
          messages: [{ role: 'user', content: JSON.stringify(payload) }],
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error?.message || res.status);
      const text = (j.content?.[0]?.text || '').trim();
      const parsed = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
      for (const { name } of payload) {
        if (parsed[name]) { existing.descriptions[name] = parsed[name]; dOk++; }
        else dFail++;
      }
      process.stdout.write(`  ${Math.min(i + BATCH, pending.length)}/${pending.length}\r`);
    } catch (e) {
      console.error(`\n  ✗ batch ${i / BATCH + 1}: ${e.message}`);
      dFail += payload.length;
    }
  }
  existing.lang = lang;
  existing.source = 'machine-translated; review: pending';
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify(existing, null, 1) + '\n');
  console.log(`\n${dOk} description(s) → i18n/${lang}/descriptions.json · ${dFail} failed · ${Object.keys(existing.descriptions).length} total`);
  process.exit(dFail && !dOk ? 1 : 0);
}

const outBase = join(root, 'i18n', lang, 'skills');
let ok = 0, failed = 0;
console.log(`Translating ${names.length} skill(s) → ${langName} (${model})…`);
for (const name of names) {
  const sf = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(sf)) { console.error(`  ✗ ${name}: no such skill`); failed++; continue; }
  const src = readFileSync(sf, 'utf8');
  process.stdout.write(`  ${name} … `);
  try {
    let out = (await translate(src)).trim();
    if (!out.startsWith('---')) out = out.slice(out.indexOf('---'));
    // Post-checks mirror --check: same name, same section/code counts.
    const t = structure(out), s = structure(src);
    if (t.name !== name) throw new Error(`name drifted to "${t.name}"`);
    if (t.headings !== s.headings) throw new Error(`${t.headings} sections vs ${s.headings}`);
    if (t.codeBlocks !== s.codeBlocks) throw new Error('code-block count drifted');
    // Stamp translation provenance into frontmatter metadata.
    out = out.replace(/^---\n/, `---\n# machine-translated to ${lang} from skills/${name}/SKILL.md — review: pending. Native fixes welcome via PR.\n`);
    const dir = join(outBase, name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'SKILL.md'), out + '\n');
    console.log('✓');
    ok++;
  } catch (e) { console.log('✗ ' + e.message); failed++; }
}
console.log(`\n${ok} translated → i18n/${lang}/skills/ · ${failed} failed`);
console.log('Next: node scripts/translate-skills.mjs --check   (and get a native speaker to review — the frontmatter marks review: pending)');
