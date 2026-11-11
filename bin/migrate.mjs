// `pm-claude-skills migrate <dir>` — the onramp for prompt graveyards. Point it
// at a folder of prompts, templates, or SOPs and it batch-converts each into a
// SkillSpec-conformant SKILL.md (frontmatter with "Use when" triggers, declared
// inputs/outputs, Quality Checks, Anti-Patterns), grades the results, and
// reports what needs a human pass.
//
//   pm-claude-skills migrate ./prompts --dry-run     # plan + cost preview, no API calls
//   pm-claude-skills migrate ./prompts               # convert (1 call per file, your key)
//   pm-claude-skills migrate ./prompts --out ./my-skills --model claude-haiku-5-5
//
// Output: <out>/<skill-name>/SKILL.md per source file. Nothing is overwritten.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { complete } from './lib/anthropic.mjs';
import { modelFor } from './lib/models.mjs';

const getArg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const slug = (s) => s.toLowerCase().replace(/\.(md|txt|prompt)$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'untitled-skill';

function grade(text) {
  const fm = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);
  if (!fm || !/^name:/m.test(fm[1]) || !/^description:/m.test(fm[1])) return 0;
  const body = fm[2] || '';
  const l2 = /##\s*(What This Skill Produces|Required Inputs|Input)/i.test(body) && /##\s*(Output|Deliverable)|##[^\n]*\b(Template|Structure|Format)\b/i.test(body);
  return (l2 && /##\s*Quality Checks/i.test(body) && /##\s*Anti-Patterns/i.test(body)) ? 3 : l2 ? 2 : 1;
}

export async function run(argv) {
  const dir = argv[0] && !argv[0].startsWith('--') ? argv[0] : '';
  if (!dir || argv.includes('--help')) {
    console.log(`Convert a folder of prompts/templates/SOPs into SkillSpec skills.

Usage: pm-claude-skills migrate <dir> [--out ./migrated-skills] [--model <m>] [--dry-run]
One API call per file (your ANTHROPIC_API_KEY). --dry-run previews the plan for free.`);
    return dir ? 0 : 1;
  }
  if (!existsSync(dir) || !statSync(dir).isDirectory()) { console.error(`Not a directory: ${dir}`); return 1; }

  const files = readdirSync(dir)
    .filter((f) => ['.md', '.txt', '.prompt'].includes(extname(f).toLowerCase()) && f !== 'README.md')
    .map((f) => join(dir, f))
    .filter((p) => { const n = statSync(p).size; return n > 100 && n < 64 * 1024; })
    .slice(0, 50);
  if (!files.length) { console.error(`No convertible files in ${dir} (.md/.txt/.prompt, 100 B – 64 KB).`); return 1; }

  const outDir = getArg(argv, 'out', './migrated-skills');
  const model = getArg(argv, 'model', modelFor('default'));
  const dryRun = argv.includes('--dry-run');

  console.error(`📥 migrate — ${files.length} file(s) from ${dir} → ${outDir}${dryRun ? '  [DRY RUN]' : ''}`);
  if (dryRun) {
    for (const f of files) console.error(`  would convert ${basename(f)} → ${outDir}/${slug(basename(f))}/SKILL.md`);
    console.error(`\nPlan: ${files.length} API call(s) on ${model} (one per file). Re-run without --dry-run to execute.`);
    return 0;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { console.error('ANTHROPIC_API_KEY not set. (--dry-run previews for free.)'); return 1; }

  const SPEC_SYSTEM = `You convert existing prompts, templates, and SOPs into SkillSpec-conformant Agent Skills. Given a source document, produce a complete SKILL.md:
- YAML frontmatter: \`name\` (lowercase-kebab, from the content's purpose, NOT the filename if the filename is vague) and \`description\` (what it does, then "Use when …" trigger conditions, then what it produces — 150-350 chars).
- Body sections, in order: "## Required Inputs" (what the user must supply), the core instructions (preserve the source's actual knowledge and voice — you are RESTRUCTURING, not rewriting; keep domain specifics verbatim where possible), "## Output Format", "## Quality Checks" (5 checkboxes derived from what the source implies good output looks like), "## Anti-Patterns" (5 checkboxes: the mistakes this document exists to prevent).
- If the source is too thin to support a real skill, produce it anyway but add "## Migration Notes" listing what a human must fill in.
Output ONLY the SKILL.md content.`;

  let converted = 0; const results = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    process.stderr.write(`  ${basename(f)} … `);
    try {
      let out = await complete({ apiKey, model, maxTokens: 6000, system: SPEC_SYSTEM,
        messages: [{ role: 'user', content: `SOURCE FILE (${basename(f)}):\n\n${src}` }] });
      out = out.replace(/^```(markdown|md)?\n/, '').replace(/\n```\s*$/, '');
      const nameM = out.match(/^name:\s*["']?([a-z0-9-]+)["']?\s*$/m);
      const name = nameM ? nameM[1] : slug(basename(f));
      const dest = join(outDir, name, 'SKILL.md');
      if (existsSync(dest)) { console.error(`↷ exists (${name}) — skipped`); continue; }
      mkdirSync(join(outDir, name), { recursive: true });
      writeFileSync(dest, out.endsWith('\n') ? out : out + '\n');
      const level = grade(out);
      results.push({ name, level, notes: /## Migration Notes/i.test(out) });
      converted++;
      console.error(`✔ ${name}  [L${level}${/## Migration Notes/i.test(out) ? ' · needs a human pass' : ''}]`);
    } catch (e) { console.error(`✗ ${e.message}`); }
  }
  const l3 = results.filter((r) => r.level === 3).length;
  console.error(`\n✅ ${converted}/${files.length} converted → ${outDir}  (${l3} × L3)`);
  console.error(`Verify them: npx skillspec-check ${outDir}   · then publish via the community registry or install with: pm-claude-skills add --target …`);
  return 0;
}
