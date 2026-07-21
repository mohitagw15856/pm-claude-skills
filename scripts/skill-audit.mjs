#!/usr/bin/env node
// Skill Security Auditor — scans installable skill content (skills/*/SKILL.md and
// each skill's scripts/) for patterns that could harm someone who installs them:
// prompt injection, data exfiltration, dynamic code execution, destructive shell,
// hardcoded secrets, and hidden/obfuscated text.
//
// Only HIGH-severity findings fail the build; medium/low are advisory. This keeps
// it useful without drowning legitimate skills in false positives.
//
// Usage:
//   node scripts/skill-audit.mjs            # audit all skills
//   node scripts/skill-audit.mjs --json     # machine-readable
//   node scripts/skill-audit.mjs --all      # also fail on medium findings
//
// No dependencies.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const failOnMedium = args.includes('--all');

// severity: high (fail), medium, low. Each rule: {id, severity, re, why}
const RULES = [
  // ── Prompt injection aimed at the model ──────────────────────────────────
  { id: 'inject.ignore', severity: 'high', why: 'Tries to override the model\'s prior/system instructions.',
    re: /\b(ignore|disregard|forget)\b[^.\n]{0,40}\b(previous|prior|above|all|earlier|system)\b[^.\n]{0,20}\b(instructions?|prompts?|rules?|guidelines?)/i },
  { id: 'inject.devmode', severity: 'high', why: 'Jailbreak framing (developer mode / DAN / no restrictions).',
    re: /\b(developer mode|do anything now|\bDAN\b|jailbreak|no (restrictions|guardrails|filters)|without (any )?(restrictions|limitations))\b/i },
  { id: 'inject.reveal', severity: 'high', why: 'Tries to extract the system prompt / hidden instructions.',
    re: /\b(reveal|print|show|repeat|output)\b[^.\n]{0,30}\b(system prompt|your (instructions|system message|initial prompt)|hidden (instructions|prompt))/i },
  { id: 'inject.persona', severity: 'medium', why: 'Forces an unconstrained persona override.',
    re: /\byou are now\b[^.\n]{0,40}\b(unrestricted|unfiltered|amoral|evil|no rules)\b/i },

  // ── Data exfiltration ────────────────────────────────────────────────────
  { id: 'exfil.send', severity: 'high', why: 'Instructs sending user/conversation data to an external endpoint.',
    re: /\b(send|post|upload|transmit|exfiltrate|forward)\b[^.\n]{0,40}\b(to )?(https?:\/\/|webhook|api\.|endpoint|server)\b[^.\n]{0,40}\b(conversation|messages?|data|credentials?|keys?|tokens?|history)/i },
  { id: 'exfil.beacon', severity: 'medium', why: 'Network call to a hardcoded external URL inside content.',
    re: /\b(curl|wget|fetch\(|requests\.(get|post)|urllib|http\.client)\b[^.\n]{0,60}https?:\/\/(?!localhost|127\.0\.0\.1|\[|[a-z0-9.-]*example\.(com|org))/i },

  // ── Code / command execution ─────────────────────────────────────────────
  { id: 'exec.dynamic', severity: 'medium', why: 'Executes dynamically-built code/commands.',
    re: /\b(eval|exec)\s*\(|\bos\.system\s*\(|subprocess\.(run|call|Popen)\s*\(|child_process|\bFunction\s*\(\s*['"`]/ },
  { id: 'exec.destructive', severity: 'high', why: 'Destructive shell command.',
    re: /\brm\s+-rf\s+(\/|~|\$HOME|\*)|\b(mkfs|dd\s+if=)|\b:\(\)\s*\{\s*:\|:&\s*\}|\bchmod\s+-R?\s*777\s+\// },

  // ── Credentials / secrets ────────────────────────────────────────────────
  { id: 'secret.aws', severity: 'high', why: 'Looks like a hardcoded AWS access key.', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'secret.private-key', severity: 'high', why: 'Embedded private key.', re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { id: 'secret.harvest', severity: 'medium', why: 'Asks the user/model to hand over secrets.',
    re: /\b(send|share|paste|provide|enter)\b[^.\n]{0,30}\b(your )?(api[_ ]?key|password|secret|access token|ssh key|private key|seed phrase)\b/i },

  // ── Obfuscation / hidden text ────────────────────────────────────────────
  { id: 'hidden.zerowidth', severity: 'high', why: 'Contains zero-width / invisible Unicode (can hide instructions).',
    re: /[​-‏‪-‮⁠-⁤﻿]/ },
  { id: 'hidden.base64blob', severity: 'medium', why: 'Long base64 blob (possible hidden payload).',
    re: /\b[A-Za-z0-9+/]{220,}={0,2}\b/ },
];

function auditText(rel, text, findings) {
  const lines = text.split('\n');
  for (const rule of RULES) {
    // search line-by-line so we can report a location and a snippet
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(rule.re);
      if (m) {
        findings.push({ file: rel, line: i + 1, id: rule.id, severity: rule.severity, why: rule.why, snippet: lines[i].trim().slice(0, 120) });
        break; // one hit per rule per file is enough
      }
    }
    // zero-width can sit anywhere incl. between lines — also test whole text
    if (rule.id === 'hidden.zerowidth' && !findings.some((f) => f.file === rel && f.id === rule.id) && rule.re.test(text)) {
      findings.push({ file: rel, line: 0, id: rule.id, severity: rule.severity, why: rule.why, snippet: '(invisible characters)' });
    }
  }
}

function walk(dir, exts, out) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some((x) => p.endsWith(x))) out.push(p);
  }
}

// Skills whose job is to *document* attack patterns (so they legitimately contain
// the phrases the rules look for — e.g. a threat model listing "jailbreak" or a rule
// to "never reveal the system prompt"). Audited by humans, skipped by the scanner.
// pm-seatbelt skills teach agent safety, so they quote the very injection/override
// phrases the rules match — they are the human-audited exception, not a violation.
const ALLOWLIST = new Set(['skill-security-auditor', 'llm-guardrails-spec',
  'injection-spotter', 'email-agent-preflight', 'browser-agent-preflight',
  'file-access-preflight', 'tool-permission-review', 'blast-radius-drill']);

const findings = [];
if (existsSync(skillsDir)) {
  for (const name of readdirSync(skillsDir)) {
    if (ALLOWLIST.has(name)) continue;
    const sdir = join(skillsDir, name);
    if (!statSync(sdir).isDirectory()) continue;
    const files = [];
    const skillMd = join(sdir, 'SKILL.md');
    if (existsSync(skillMd)) files.push(skillMd);
    const scripts = join(sdir, 'scripts');
    if (existsSync(scripts)) walk(scripts, ['.py', '.mjs', '.js', '.sh'], files);
    for (const f of files) auditText(relative(root, f), readFileSync(f, 'utf8'), findings);
  }
}

const counts = findings.reduce((a, f) => ((a[f.severity] = (a[f.severity] || 0) + 1), a), {});
const high = counts.high || 0, medium = counts.medium || 0, low = counts.low || 0;

if (asJson) {
  console.log(JSON.stringify({ scanned: 'skills/**', high, medium, low, findings }, null, 2));
} else {
  const icon = { high: '🔴', medium: '🟠', low: '🟡' };
  const RANK = { high: 0, medium: 1, low: 2 };
  for (const f of findings.sort((a, b) => RANK[a.severity] - RANK[b.severity])) {
    console.log(`  ${icon[f.severity]} [${f.severity}] ${f.file}:${f.line} (${f.id}) — ${f.why}`);
    if (f.snippet) console.log(`      ↳ ${f.snippet}`);
  }
  console.log(`\nSkill Security Audit — ${high} high · ${medium} medium · ${low} low across skills/**`);
}

const failed = high > 0 || (failOnMedium && medium > 0);
if (failed) {
  if (!asJson) console.log('FAILED — review the findings above. (False positive? Tune scripts/skill-audit.mjs.)');
  process.exit(1);
} else if (!asJson) {
  console.log('No high-severity issues found. ✓');
}
