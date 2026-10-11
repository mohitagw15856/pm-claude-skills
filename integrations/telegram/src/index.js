// PM Skills — Telegram bot (Cloudflare Worker). The Slack app's twin for the
// audiences Slack doesn't reach: /find searches the library, /skill fetches a
// skill's full instructions, /run drafts the artifact with the deployer's
// Anthropic key (optional — without the key the bot is search/fetch only).
// Plain text is treated as /run when the key is set, /find otherwise.
//
// Forward it: send a photo or PDF of a document (a lease, a bill, a contract) and
// the bot reads it with the matching skill (integrations/shared/forward-doc.js).
// Needs the Anthropic key, like /run.
//
// Stateless: nothing is stored; the worker sees only the messages Telegram
// forwards to the webhook and replies via sendMessage.

import { documentBlock, readDocument, MAX_BYTES, PRIVACY_NOTE } from '../../shared/forward-doc.js';

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const CHUNK = 3900; // Telegram caps messages at 4096 chars; leave header room

async function tg(token, method, payload) {
  const r = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return r.json();
}

// Plain text on purpose: MarkdownV2 escaping breaks on the underscores and
// dashes skill bodies are full of, and a failed parse drops the whole message.
async function send(token, chatId, text) {
  for (let i = 0; i < text.length; i += CHUNK) {
    await tg(token, 'sendMessage', { chat_id: chatId, text: text.slice(i, i + CHUNK), disable_web_page_preview: true });
  }
}

const search = async (q, limit = 5) => {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}&limit=${limit}`);
  return r.ok ? (await r.json()).skills || [] : [];
};
const getSkill = async (name) => {
  const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}`);
  return r.ok ? r.json() : null;
};

async function runSkill(instructions, userText, key) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-5', max_tokens: 2000,
      system: instructions + '\n\nYou are replying in a Telegram chat. Produce the deliverable directly, no preamble, plain text (no markdown tables). If required inputs are missing, ask for them briefly.',
      messages: [{ role: 'user', content: userText.slice(0, 30000) }],
    }),
  });
  if (!r.ok) throw new Error(`model ${r.status}`);
  const j = await r.json();
  return (j.content || []).map((c) => c.text).join('').trim();
}

const HELP = [
  'PM Skills bot: over a thousand professional skills on tap.',
  '',
  '/find <task>  — search the library (e.g. /find churn analysis)',
  '/skill <name> — full instructions for one skill',
  '/run <name or task> — draft the artifact here (when the deployer configured a key)',
  '📄 Send a photo or PDF of a document (a lease, a bill, a contract, a letter) and get it read with the right skill. Add a caption to say what you want.',
  '',
  'Plain text works too. Library: ' + REPO,
].join('\n');

async function handleDocument(token, chatId, file, caption, env, canRun) {
  if (!canRun) return send(token, chatId, 'Reading documents is not enabled on this deployment (no Anthropic key configured).');
  if (file.size && file.size > MAX_BYTES) return send(token, chatId, 'That file is over 8 MB. Send a photo of the page, or a smaller PDF.');
  const info = await tg(token, 'getFile', { file_id: file.id });
  const path = info?.result?.file_path;
  if (!path) return send(token, chatId, 'Could not download that file from Telegram. Try sending it again.');
  const res = await fetch(`https://api.telegram.org/file/bot${token}/${path}`);
  const block = res.ok ? documentBlock(await res.arrayBuffer(), file.type || res.headers.get('content-type')) : null;
  if (!block) return send(token, chatId, 'I can read photos (JPEG, PNG, WebP) and PDFs up to 8 MB.');
  await send(token, chatId, `Reading it… ${PRIVACY_NOTE}`);
  try {
    const { skill, text } = await readDocument({ block, note: caption, key: env.ANTHROPIC_API_KEY, channel: 'a Telegram chat' });
    return send(token, chatId, (skill ? `(${skill})\n\n` : '') + (text || 'The model returned nothing. Try a clearer photo.'));
  } catch {
    return send(token, chatId, 'The model call failed. Try again in a minute.');
  }
}

async function handleUpdate(update, env) {
  const msg = update.message || update.edited_message;
  const chatId = msg?.chat?.id;
  const text = (msg?.text || '').trim();
  const token = env.TELEGRAM_BOT_TOKEN;
  const canRun = !!env.ANTHROPIC_API_KEY;
  // A photo arrives in several sizes (the last is the largest); a PDF or an
  // uncompressed image arrives as a document.
  const file = msg?.photo?.length ? { id: msg.photo[msg.photo.length - 1].file_id, type: 'image/jpeg', size: msg.photo[msg.photo.length - 1].file_size }
    : msg?.document ? { id: msg.document.file_id, type: msg.document.mime_type, size: msg.document.file_size } : null;
  if (chatId && file) return handleDocument(token, chatId, file, (msg.caption || '').trim(), env, canRun);
  if (!chatId || !text) return;

  const [, cmd, rest = ''] = text.match(/^\/(\w+)(?:@\w+)?\s*([\s\S]*)$/) || [null, null, text];

  if (cmd === 'start' || cmd === 'help' || (!cmd && !text)) return send(token, chatId, HELP);

  if (cmd === 'find' || (!cmd && !canRun)) {
    const q = (cmd ? rest : text).trim();
    if (!q) return send(token, chatId, 'What task? e.g. /find prioritise a messy backlog');
    const hits = await search(q);
    if (!hits.length) return send(token, chatId, `No matches for "${q}". Try different keywords.`);
    return send(token, chatId, hits.map((s) => `• ${s.name} — ${s.description}`).join('\n\n') + '\n\nGet one: /skill <name>' + (canRun ? '  ·  Draft it: /run <name> <your input>' : ''));
  }

  if (cmd === 'skill') {
    const name = rest.trim().split(/\s+/)[0];
    if (!name) return send(token, chatId, 'Which one? e.g. /skill rice-prioritisation (find names with /find)');
    const s = await getSkill(name);
    if (!s) return send(token, chatId, `No skill named "${name}". Try /find ${name}`);
    return send(token, chatId, `${s.title}\n\n${s.instructions}`);
  }

  if (cmd === 'run' || !cmd) {
    if (!canRun) return send(token, chatId, 'Running skills is not enabled on this deployment (no Anthropic key configured). /find and /skill still work — run the instructions in your own assistant.');
    const input = (cmd ? rest : text).trim();
    if (!input) return send(token, chatId, 'Give me the task: /run executive-update churn up 2pts, shipped referral, hiring paused');
    const maybeName = input.split(/\s+/)[0];
    let s = /^[a-z0-9-]+$/.test(maybeName) ? await getSkill(maybeName) : null;
    const userText = s ? input.slice(maybeName.length).trim() || input : input;
    if (!s) {
      const hits = await search(input, 1);
      if (!hits.length) return send(token, chatId, `Couldn't match a skill to that. Browse with /find <keywords>.`);
      s = await getSkill(hits[0].name);
    }
    await send(token, chatId, `Drafting with ${s.name}…`);
    try {
      const out = await runSkill(s.instructions, userText, env.ANTHROPIC_API_KEY);
      return send(token, chatId, out || 'The model returned nothing — try rephrasing.');
    } catch {
      return send(token, chatId, 'The model call failed — try again in a minute.');
    }
  }

  return send(token, chatId, `Unknown command /${cmd}.\n\n${HELP}`);
}

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ bot: 'pm-skills-telegram', hint: 'Telegram webhook endpoint. Setup: see integrations/telegram/README.md', library: REPO }), { headers: { 'content-type': 'application/json' } });
    }
    // Only Telegram knows this secret (it echoes what setWebhook registered).
    if (env.TELEGRAM_WEBHOOK_SECRET && request.headers.get('x-telegram-bot-api-secret-token') !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response('forbidden', { status: 403 });
    }
    let update;
    try { update = await request.json(); } catch { return new Response('bad json', { status: 400 }); }
    // ACK immediately; process after — Telegram retries webhooks that answer slowly.
    ctx.waitUntil(handleUpdate(update, env).catch(() => {}));
    return new Response('ok');
  },
};
