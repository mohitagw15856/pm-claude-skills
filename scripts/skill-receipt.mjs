#!/usr/bin/env node
// skill-receipt — a signed provenance receipt for a skill run. Answers "what
// produced this artifact?" verifiably: which skill, which version, which model,
// a hash of the inputs and the output, and a timestamp — signed with an ed25519
// key so it can't be forged or altered. As AI-authorship disclosure becomes
// expected, a receipt turns "trust me" into "check it."
//
//   node scripts/skill-receipt.mjs keygen                       # create/print your signing key
//   node scripts/skill-receipt.mjs sign --skill executive-update --version 1.2.0 \
//        --model claude-sonnet-4-6 --input-file notes.txt --output-file update.md > receipt.json
//   node scripts/skill-receipt.mjs verify receipt.json --output-file update.md
//
// No dependencies (node:crypto). Key stored at ~/.pm-skills/receipt-ed25519.json
// (override with PM_RECEIPT_KEY). Only hashes are stored — never your content.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { createHash, generateKeyPairSync, sign as edSign, verify as edVerify, createPublicKey, createPrivateKey } from 'node:crypto';

const args = process.argv.slice(2);
const cmd = args[0];
const arg = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const KEY_PATH = process.env.PM_RECEIPT_KEY || join(homedir(), '.pm-skills', 'receipt-ed25519.json');
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const readMaybe = (n) => { const f = arg(n + '-file'); if (f) return readFileSync(f); const t = arg(n); return t != null ? Buffer.from(t, 'utf8') : null; };

function loadOrCreateKey() {
  if (existsSync(KEY_PATH)) return JSON.parse(readFileSync(KEY_PATH, 'utf8'));
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const rec = {
    publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
    privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }),
  };
  mkdirSync(dirname(KEY_PATH), { recursive: true });
  writeFileSync(KEY_PATH, JSON.stringify(rec, null, 2), { mode: 0o600 });
  return rec;
}

// Canonical bytes to sign: the receipt payload with keys sorted, no signature block.
const canonical = (payload) => Buffer.from(JSON.stringify(payload, Object.keys(payload).sort()), 'utf8');

if (cmd === 'keygen') {
  const k = loadOrCreateKey();
  console.log(`Key at ${KEY_PATH}\n\nPublic key (share this so others can verify your receipts):\n${k.publicKey}`);
  process.exit(0);
}

if (cmd === 'sign') {
  const input = readMaybe('input');
  const output = readMaybe('output');
  if (!output) { console.error('Provide the output via --output-file <f> or --output "..."'); process.exit(1); }
  const skill = arg('skill');
  if (!skill) { console.error('--skill is required.'); process.exit(1); }
  const payload = {
    spec: 'pm-skills-receipt/1',
    skill,
    version: arg('version', 'unversioned'),
    model: arg('model', 'unknown'),
    inputSha256: input ? sha256(input) : null,
    outputSha256: sha256(output),
    outputBytes: output.length,
    generatedAt: new Date().toISOString(),
    generator: arg('generator', 'pm-claude-skills'),
  };
  const key = loadOrCreateKey();
  const signature = edSign(null, canonical(payload), createPrivateKey(key.privateKey)).toString('base64');
  console.log(JSON.stringify({ ...payload, publicKey: key.publicKey, signature }, null, 2));
  process.exit(0);
}

if (cmd === 'verify') {
  const file = args.find((a) => !a.startsWith('--') && a !== 'verify');
  if (!file || !existsSync(file)) { console.error('Usage: skill-receipt verify <receipt.json> [--output-file f] [--input-file f]'); process.exit(1); }
  const receipt = JSON.parse(readFileSync(file, 'utf8'));
  const { publicKey, signature, ...payload } = receipt;
  let ok = false;
  try { ok = edVerify(null, canonical(payload), createPublicKey(publicKey), Buffer.from(signature, 'base64')); } catch (e) { console.error(`Signature check errored: ${e.message}`); }
  if (!ok) { console.error('✗ INVALID — signature does not match the receipt (tampered or wrong key).'); process.exit(1); }
  console.log(`✓ Signature valid — this receipt was signed by the holder of its key and not altered.`);
  console.log(`  ${payload.skill} v${payload.version} · model ${payload.model} · ${payload.generatedAt}`);
  // Optionally confirm the actual files still match the receipt's hashes.
  const out = readMaybe('output');
  if (out) console.log(`  output file ${sha256(out) === payload.outputSha256 ? '✓ matches' : '✗ DOES NOT MATCH'} the receipt's outputSha256`);
  const inp = readMaybe('input');
  if (inp && payload.inputSha256) console.log(`  input file ${sha256(inp) === payload.inputSha256 ? '✓ matches' : '✗ DOES NOT MATCH'} the receipt's inputSha256`);
  process.exit(0);
}

console.error('Usage: skill-receipt <keygen|sign|verify> …  (see the header of this file)');
process.exit(1);
