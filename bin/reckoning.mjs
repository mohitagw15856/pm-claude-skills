// `pm-claude-skills reckoning` — the calibration ledger. Predictions are cheap;
// being right at the rate you claimed is the skill. This command keeps score:
// it scans brain/predictions/ (written by you, the Firm's staff, or the web
// workspace bridge), resurfaces what's due, records hits and misses, and
// computes your calibration curve and Brier score over time.
//
//   pm-claude-skills reckoning                        # ledger: due first, then pending, then the record
//   pm-claude-skills reckoning add "Churn drops below 3% by Q4" --confidence 70 --due 2026-10-01
//   pm-claude-skills reckoning score <file> hit|miss  # settle one
//   pm-claude-skills reckoning curve                  # calibration by confidence bucket + Brier score
//
// Files: brain/predictions/*.md with frontmatter (status, recorded, optional
// by/confidence/due). Pure Node, no API, works on the same folder the web
// arenas write into.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const DIR = join(process.cwd(), 'brain', 'predictions');
const getArg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const today = () => new Date().toISOString().slice(0, 10);

function parse(file) {
  const text = readFileSync(join(DIR, file), 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  if (m) for (const line of m[1].split(/\r?\n/)) { const kv = line.match(/^([\w-]+):\s*(.*)$/); if (kv) meta[kv[1]] = kv[2].trim(); }
  const body = (m ? m[2] : text).trim();
  // Confidence: frontmatter wins; else "(70%)" or "(100%)" in the text.
  let conf = meta.confidence !== undefined ? parseFloat(meta.confidence) : NaN;
  if (!Number.isFinite(conf)) { const c = body.match(/\((\d{1,3})\s*%\)/); if (c) conf = parseFloat(c[1]); }
  return { file, text: body.split('\n')[0].slice(0, 120), status: meta.status || 'pending', by: meta.by || 'you',
    recorded: meta.recorded || file.slice(0, 10), due: meta.due || null, resolved: meta.resolved || null,
    confidence: Number.isFinite(conf) && conf >= 0 && conf <= 100 ? conf : null, raw: text };
}
function load() {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR).filter((f) => f.endsWith('.md')).map(parse)
    .sort((a, b) => (a.recorded < b.recorded ? -1 : 1));
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'prediction';

function brier(scored) {
  // Brier: mean (forecast - outcome)^2 over predictions that stated a confidence.
  const withConf = scored.filter((p) => p.confidence);
  if (!withConf.length) return null;
  return withConf.reduce((s, p) => s + ((p.confidence / 100) - (p.status === 'hit' ? 1 : 0)) ** 2, 0) / withConf.length;
}

export async function run(argv) {
  const cmd = argv[0] && !argv[0].startsWith('--') ? argv[0] : 'ledger';

  if (cmd === 'add') {
    const text = argv[1];
    if (!text || text.startsWith('--')) { console.error('Usage: reckoning add "the prediction" [--confidence 70] [--due YYYY-MM-DD] [--by name]'); return 1; }
    mkdirSync(DIR, { recursive: true });
    const conf = getArg(argv, 'confidence'); const due = getArg(argv, 'due'); const by = getArg(argv, 'by', 'you');
    const file = `${today()}-${slug(text)}.md`;
    const fm = ['---', `by: ${by}`, 'status: pending', `recorded: ${today()}`, conf ? `confidence: ${conf}` : null, due ? `due: ${due}` : null, '---'].filter(Boolean).join('\n');
    writeFileSync(join(DIR, file), `${fm}\n\n${text}\n`);
    console.log(`📌 Recorded brain/predictions/${file}${conf ? ` at ${conf}% confidence` : ' (no confidence stated — add one; calibration needs it)'}${due ? `, due ${due}` : ''}`);
    return 0;
  }

  const preds = load();
  if (!preds.length) { console.log(`No predictions in ${DIR}.\nStart the ledger:  pm-claude-skills reckoning add "…" --confidence 70 --due YYYY-MM-DD\n(The Firm's staff and the web workspace bridge write here too.)`); return 0; }

  if (cmd === 'score') {
    const key = argv[1]; const verdict = argv[2];
    if (!key || !['hit', 'miss'].includes(verdict)) { console.error('Usage: reckoning score <file-or-substring> hit|miss'); return 1; }
    const matches = preds.filter((p) => p.status === 'pending' && (p.file === key || p.file.includes(key) || p.text.toLowerCase().includes(key.toLowerCase())));
    if (matches.length !== 1) { console.error(matches.length ? `Ambiguous — matches: ${matches.map((m) => m.file).join(', ')}` : `No pending prediction matches "${key}".`); return 1; }
    const p = matches[0];
    const updated = p.raw.replace(/^status:\s*pending$/m, `status: ${verdict}`).replace(/^---\n/, `---\nresolved: ${today()}\n`);
    writeFileSync(join(DIR, p.file), updated);
    console.log(`${verdict === 'hit' ? '✅ HIT' : '❌ MISS'} — ${p.text}${p.confidence ? `  (you said ${p.confidence}%)` : ''}`);
    return 0;
  }

  const scored = preds.filter((p) => p.status === 'hit' || p.status === 'miss');
  const hits = scored.filter((p) => p.status === 'hit').length;

  if (cmd === 'curve') {
    if (!scored.length) { console.log('Nothing scored yet — settle some predictions first (reckoning score <file> hit|miss).'); return 0; }
    console.log(`⚖️  Calibration — ${scored.length} scored, ${hits} hits (${Math.round(100 * hits / scored.length)}%)\n`);
    const buckets = [[50, 60], [60, 70], [70, 80], [80, 90], [90, 100]];
    for (const [lo, hi] of buckets) {
      const b = scored.filter((p) => p.confidence >= lo && p.confidence < hi);
      if (!b.length) continue;
      const rate = b.filter((p) => p.status === 'hit').length / b.length;
      const bar = '█'.repeat(Math.round(rate * 20)).padEnd(20, '·');
      console.log(`  said ${String(lo).padStart(2)}-${hi}%  ${bar}  actually ${Math.round(rate * 100)}%  (n=${b.length})`);
    }
    const bs = brier(scored);
    if (bs !== null) console.log(`\n  Brier score: ${bs.toFixed(3)}  (0 = oracle · 0.25 = coin-flip guessing · lower is better)`);
    const noConf = scored.length - scored.filter((p) => p.confidence).length;
    if (noConf) console.log(`  (${noConf} scored prediction(s) had no stated confidence — they count for hit rate, not calibration)`);
    return 0;
  }

  // ── Default: the ledger ─────────────────────────────────────────────────────
  const pending = preds.filter((p) => p.status === 'pending');
  const due = pending.filter((p) => p.due && p.due <= today());
  console.log(`⚖️  The Reckoning — ${preds.length} prediction(s): ${scored.length} settled, ${pending.length} open${due.length ? `, \x1b[1m${due.length} DUE\x1b[0m` : ''}\n`);
  for (const p of due) console.log(`  🔔 DUE ${p.due}  ${p.text}${p.confidence ? ` (${p.confidence}%)` : ''}  — settle it:  reckoning score "${p.file.slice(11, 30)}" hit|miss`);
  for (const p of pending.filter((x) => !due.includes(x)).slice(-10)) console.log(`  ⏳ ${p.due ? 'due ' + p.due : 'open'}  ${p.text}${p.confidence ? ` (${p.confidence}%)` : ''}  [${p.by}]`);
  if (scored.length) {
    console.log(`\n  Record: ${hits}/${scored.length} hits (${Math.round(100 * hits / scored.length)}%)`);
    const bs = brier(scored);
    if (bs !== null) console.log(`  Brier: ${bs.toFixed(3)} — see the curve:  pm-claude-skills reckoning curve`);
  }
  return 0;
}
