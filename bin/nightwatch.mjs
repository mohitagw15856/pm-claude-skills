// `pm-claude-skills nightwatch` — your AI staff work while you sleep.
// A scheduled Agent SDK run (YOUR key, YOUR machine, this directory) where the
// Firm's discipline meets real files: triage the brain, draft what the open
// hypotheses and due predictions imply, file memos to firm-minutes/, and leave
// a morning brief of WORK DONE, not work suggested.
//
//   pm-claude-skills nightwatch --once            # run right now, watch it work
//   pm-claude-skills nightwatch --once --dry-run  # show the shift plan, no API calls
//   pm-claude-skills nightwatch install [--hour 5 --minute 30]   # schedule nightly
//   pm-claude-skills nightwatch uninstall | status
//
// Requires: ANTHROPIC_API_KEY in the environment (for scheduled runs, launchd/cron
// must see it — the installer checks and tells you). Spend is bounded by
// --max-turns (default 30) and the model (default Sonnet). All writes stay in
// this directory: artifacts/, firm-minutes/, brain/.
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { install, uninstall, list } from './lib/scheduler.mjs';

const getArg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const today = () => new Date().toISOString().slice(0, 10);

function shiftPlan(cwd) {
  // The night shift's standing orders, grounded in what's actually on file.
  const read = (p) => { try { return readFileSync(join(cwd, p), 'utf8'); } catch { return ''; } };
  const ctx = read('brain/context.md') || read('pm-context.md');
  const duties = [];
  const predDir = join(cwd, 'brain', 'predictions');
  if (existsSync(predDir)) {
    const due = readdirSync(predDir).filter((f) => {
      const t = read('brain/predictions/' + f);
      const d = (t.match(/^due:\s*(\S+)/m) || [])[1];
      return /^status:\s*pending$/m.test(t) && d && d <= today();
    });
    if (due.length) duties.push(`RECKON: ${due.length} prediction(s) are due (${due.join(', ')}). For each: search this directory's files for evidence, then either settle it by editing its status to hit/miss with a one-line justification appended, or write why it cannot be settled from available evidence.`);
  }
  const hyp = read('brain/hypotheses.md');
  const hunches = (hyp.match(/^- \[hunch\].*$/gm) || []).slice(0, 2);
  if (hunches.length) duties.push(`INVESTIGATE: for each open hunch (${hunches.map((h) => '"' + h.slice(0, 60) + '"').join('; ')}), gather whatever evidence exists in this directory's files and append a dated [data]/[external] line to brain/ if anything upgrades or kills it.`);
  duties.push('DRAFT: pick the ONE most useful artifact this workspace obviously needs next (an overdue update, the doc a settled prediction implies, the summary firm-minutes/ has been circling) and draft it properly to artifacts/' + today() + '-<slug>.md using the matching installed skill\'s structure — its Quality Checks are your acceptance test.');
  duties.push('REPORT: write firm-minutes/nightwatch-' + today() + '.md — the morning brief: what was DONE (with file paths), what was settled, what needs a human decision (max 3 items), each with your recommendation.');
  return { ctx, duties };
}

export async function run(argv) {
  const cmd = argv.find((a) => !a.startsWith('--')) || (argv.includes('--once') ? 'once' : 'help');
  const cwd = process.cwd();

  if (cmd === 'install') {
    if (!process.env.ANTHROPIC_API_KEY) console.error('⚠ ANTHROPIC_API_KEY is not in this shell — the scheduled job needs it. Add it to the plist/cron environment or a .env this directory loads.');
    const r = install('nightwatch', [process.execPath, join(new URL('.', import.meta.url).pathname, 'cli.mjs'), 'nightwatch', '--once'],
      { hour: +getArg(argv, 'hour', 5), minute: +getArg(argv, 'minute', 30) });
    mkdirSync(join(cwd, '.pm-skills'), { recursive: true });
    console.log(`🌙 Nightwatch scheduled (${r.kind}, ${r.when}) for ${cwd}\n   Logs: .pm-skills/nightwatch.log · remove: pm-claude-skills nightwatch uninstall`);
    return 0;
  }
  if (cmd === 'uninstall') { console.log(uninstall('nightwatch') ? '🌙 Nightwatch unscheduled.' : 'Nothing scheduled.'); return 0; }
  if (cmd === 'status') { const l = list(); console.log(l.length ? 'Scheduled: ' + l.join(', ') : 'Nothing scheduled.'); return 0; }

  if (cmd === 'once' || argv.includes('--once')) {
    const { ctx, duties } = shiftPlan(cwd);
    if (argv.includes('--dry-run')) {
      console.log(`🌙 Nightwatch shift plan for ${cwd} (dry run — no API calls):\n`);
      duties.forEach((d, i) => console.log(`  ${i + 1}. ${d.split(':')[0]}: ${d.split(': ').slice(1).join(': ').slice(0, 140)}…\n`));
      console.log(`Context loaded: ${ctx ? 'brain/context.md (' + ctx.length + ' chars)' : 'NONE — run pm-claude-skills init'}`);
      return 0;
    }
    if (!process.env.ANTHROPIC_API_KEY) { console.error('ANTHROPIC_API_KEY not set. (--dry-run shows the shift plan for free.)'); return 1; }
    let query;
    try { ({ query } = await import('@anthropic-ai/claude-agent-sdk')); }
    catch { console.error('The Nightwatch needs the Agent SDK:  npm install -g @anthropic-ai/claude-agent-sdk  (or run from a directory that has it)'); return 1; }
    mkdirSync(join(cwd, 'artifacts'), { recursive: true });
    console.error(`🌙 Nightwatch shift starting in ${cwd} — ${duties.length} standing orders…`);
    const prompt = `You are the Nightwatch — the professional staff working this workspace overnight. Complete these standing orders IN ORDER, doing real file work (read, then write), never inventing facts not found in the files:\n\n${duties.map((d, i) => `${i + 1}. ${d}`).join('\n\n')}`;
    const append = `\nSTANDING CONTEXT:\n${(ctx || '(none)').slice(0, 4000)}\n\nHOUSE RULES: honour brain/ provenance tags; artifacts follow installed skill structures where one matches; every claim in the morning brief cites the file it came from; if evidence is insufficient, say so rather than padding.`;
    let cost = 0, turns = 0;
    for await (const message of query({ prompt, options: {
      systemPrompt: { type: 'preset', preset: 'claude_code', append },
      allowedTools: ['Read', 'Write', 'Edit', 'Glob', 'Grep'],
      permissionMode: 'acceptEdits',
      maxTurns: +getArg(argv, 'max-turns', 30),
      model: getArg(argv, 'model', undefined),
    } })) {
      if (message.type === 'result') { cost = message.total_cost_usd ?? 0; turns = message.num_turns; }
    }
    const brief = join(cwd, 'firm-minutes', `nightwatch-${today()}.md`);
    console.error(`🌙 Shift complete — ${turns} turns, $${cost.toFixed(4)}. Morning brief: ${existsSync(brief) ? brief : '(not filed — check the log)'}`);
    return 0;
  }

  console.log(`The Nightwatch — AI staff that work this directory while you sleep.

  pm-claude-skills nightwatch --once              run a shift now
  pm-claude-skills nightwatch --once --dry-run    see the shift plan, no API calls
  pm-claude-skills nightwatch install             schedule nightly (5:30am default; --hour/--minute)
  pm-claude-skills nightwatch uninstall | status

A shift: settle due predictions against file evidence · investigate open hunches ·
draft the one artifact the workspace needs · file the morning brief of work DONE.
Writes only inside this directory. Your key, bounded turns.`);
  return 0;
}
