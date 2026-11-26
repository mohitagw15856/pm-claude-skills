#!/usr/bin/env node
// The shared Claude client, against a local stand-in server (ANTHROPIC_BASE_URL).
// No network and no API spend: the server records each request body and replies
// with canned responses, so the request shape per model is checked exactly.
import { createServer } from 'node:http';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let pass = 0, fail = 0;
const check = (name, ok) => { if (ok) pass++; else { fail++; console.error('  ✗ ' + name); } };

const seen = [];
let reply = () => ({ content: [{ type: 'text', text: 'ok' }], stop_reason: 'end_turn', usage: { input_tokens: 1, output_tokens: 1 } });
const server = createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    const body = JSON.parse(raw);
    seen.push(body);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ model: body.model, ...reply(body) }));
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
process.env.ANTHROPIC_BASE_URL = `http://127.0.0.1:${server.address().port}`;

try {
  const { complete } = await import(join(root, 'bin', 'lib', 'anthropic.mjs'));
  const { modelFor, modelInfo, requestShape, knownModelIds, REGISTRY, THINKING_HEADROOM } = await import(join(root, 'bin', 'lib', 'models.mjs'));
  const messages = [{ role: 'user', content: 'hi' }];
  const last = () => seen[seen.length - 1];

  // Registry sanity.
  for (const role of ['default', 'fast', 'deep', 'frontier', 'judge']) check(`role ${role} names a listed model`, modelInfo(modelFor(role)) !== null);
  check('every role except judge points at a current model', ['default', 'fast', 'deep', 'frontier'].every((r) => modelInfo(modelFor(r)).status === 'current'));
  check('the judge role is marked pinned with a reason', REGISTRY.roles.judge.pinned === true && REGISTRY.roles.judge.why.length > 40);
  check('an unknown role throws', (() => { try { modelFor('nope'); return false; } catch { return true; } })());
  check('no id is listed as both current and legacy', REGISTRY.current.every((c) => !REGISTRY.legacy.some((l) => l.id === c.id)));
  check('every legacy model names a current replacement', REGISTRY.legacy.every((l) => REGISTRY.current.some((c) => c.id === l.replacedBy)));
  check('aliases resolve to listed ids', Object.values(REGISTRY.aliases).every((id) => modelInfo(id)));
  check('a dated alias is known', knownModelIds().includes('claude-haiku-4-5-20251001'));

  // Default model and headroom.
  await complete({ apiKey: 'k', messages, maxTokens: 300 });
  check('the default model is the default role', last().model === modelFor('default'));
  check('a current model gets thinking headroom on max_tokens', last().max_tokens === 300 + THINKING_HEADROOM);
  check('no effort is sent unless asked for', last().output_config === undefined);
  check('no sampling or thinking parameters are sent', !('temperature' in last()) && !('top_p' in last()) && !('thinking' in last()));

  await complete({ apiKey: 'k', model: modelFor('judge'), messages, maxTokens: 300 });
  check('a legacy model keeps exactly the requested max_tokens', last().max_tokens === 300 && last().output_config === undefined);

  await complete({ apiKey: 'k', model: modelFor('frontier'), messages, maxTokens: 200000, effort: 'low' });
  check('max_tokens is capped at the model output limit', last().max_tokens === modelInfo(modelFor('frontier')).maxOutput);
  check('effort is sent inside output_config', last().output_config && last().output_config.effort === 'low');
  check('a bad effort is rejected before any request', (() => { try { requestShape(modelFor('default'), 100, 'turbo'); return false; } catch { return true; } })());

  await complete({ apiKey: 'k', model: 'some-other-model', messages, maxTokens: 300 });
  check('an unlisted model is passed through untouched', last().max_tokens === 300);

  // Thinking blocks are skipped; the text is returned.
  reply = () => ({ content: [{ type: 'thinking', thinking: '' }, { type: 'text', text: 'answer' }], stop_reason: 'end_turn' });
  check('thinking blocks are not joined into the answer', (await complete({ apiKey: 'k', messages })) === 'answer');

  // Empty answers with a failure stop reason are errors, not empty strings.
  reply = () => ({ content: [{ type: 'thinking', thinking: '' }], stop_reason: 'max_tokens' });
  check('running out of tokens before answering throws', await complete({ apiKey: 'k', messages }).then(() => false, (e) => /max_tokens/.test(e.message)));
  reply = () => ({ content: [], stop_reason: 'refusal' });
  check('a refusal throws', await complete({ apiKey: 'k', messages }).then(() => false, (e) => /declined/.test(e.message)));
  reply = () => ({ content: [{ type: 'text', text: 'partial' }], stop_reason: 'max_tokens' });
  check('a truncated but non-empty answer is still returned', (await complete({ apiKey: 'k', messages })) === 'partial');

  reply = () => ({ content: [{ type: 'text', text: 'x' }], stop_reason: 'end_turn', usage: { input_tokens: 3, output_tokens: 4 } });
  const u = await complete({ apiKey: 'k', messages, withUsage: true });
  check('withUsage returns text, usage and stop reason', u.text === 'x' && u.usage.output_tokens === 4 && u.stopReason === 'end_turn');
} finally {
  server.close();
}
console.log(`anthropic client: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
