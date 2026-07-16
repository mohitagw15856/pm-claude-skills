// PM Skills — Google Assistant / Actions on Google conversational webhook
// (Cloudflare Worker or any HTTPS endpoint; no deps). Handles the Dialogflow /
// Actions Builder webhook shape: reads the user's task from a parameter, finds
// the best-fit skill, and speaks its name plus a deep link (and, with a key, a
// short spoken draft). Same design as the Alexa handler: name it out loud, push
// the full artifact to the phone.
//
// Deploy: wrangler deploy (or any function host). Point your Action's fulfilment
// webhook at this URL. Env: ANTHROPIC_API_KEY (optional).

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';

function reply(text, { endConversation = true } = {}) {
  // Actions Builder webhook response shape.
  return {
    prompt: {
      firstSimple: { speech: text, text },
    },
    scene: endConversation ? undefined : { next: { name: 'actions.scene.END_CONVERSATION' } },
  };
}

async function search(q) {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}&limit=3`);
  return r.ok ? (await r.json()).skills || [] : [];
}
async function getSkill(name) {
  const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}`);
  return r.ok ? r.json() : null;
}
async function draft(instructions, task, key) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6', max_tokens: 350,
      system: instructions + '\n\nYou are read aloud by a voice assistant. Give a SHORT spoken answer under 90 words, plain sentences, no markdown. End by saying the full version is on their phone.',
      messages: [{ role: 'user', content: task }],
    }),
  });
  if (!r.ok) return null;
  const j = await r.json();
  return (j.content || []).map((c) => c.text).join('').trim();
}

async function handle(body, env) {
  // Task parameter comes from the intent slot; support a couple of shapes.
  const params = (body.intent && body.intent.params) || {};
  const task = (params.task && (params.task.resolved || params.task.original)) ||
    (body.session && body.session.params && body.session.params.task) || '';
  if (!task) return reply('What task can I help with? Say, for example, which skill for explaining a metric drop.', { endConversation: false });
  const hits = await search(task);
  if (!hits.length) return reply('I couldn\'t find a matching skill. Try naming the deliverable — a launch plan, a status update.', { endConversation: false });
  const top = hits[0];
  const link = `${SITE}/?skill=${top.name}`;
  if (!env.ANTHROPIC_API_KEY) {
    return reply(`For that, use the ${top.title} skill. I\'ve sent a link to run it. ${link}`);
  }
  const full = await getSkill(top.name);
  const spoken = full ? await draft(full.instructions, task, env.ANTHROPIC_API_KEY) : null;
  return reply(spoken || `Use the ${top.title} skill — the full version is on your phone.`);
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('PM Skills Google Assistant webhook', { status: 200 });
    let body = {};
    try { body = await request.json(); } catch { /* ignore */ }
    const out = await handle(body, env);
    return new Response(JSON.stringify(out), { headers: { 'content-type': 'application/json' } });
  },
};
