// PM Skills — Alexa skill handler (AWS Lambda, Node 18+, no deps).
// "Alexa, ask PM Skills which skill for explaining a metric drop" → it names the
// best-fit skill and, if you have a run key configured, reads back a short draft.
// Voice is a lousy medium for a full PRD, so the design is: NAME the skill out
// loud, and push the full artifact to the companion card / your phone via the
// playground deep link.
//
// Deploy: zip this file, upload as a Lambda, set it as the skill's endpoint.
// Env:    ANTHROPIC_API_KEY (optional — enables spoken drafts; without it the
//         skill still finds and names the right tool).

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';

function speak(text, { card, endSession = true } = {}) {
  const r = {
    version: '1.0',
    response: {
      outputSpeech: { type: 'PlainText', text },
      shouldEndSession: endSession,
    },
  };
  if (card) r.response.card = { type: 'Simple', title: card.title, content: card.content };
  return r;
}

async function search(q) {
  const res = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}&limit=3`);
  if (!res.ok) return [];
  return (await res.json()).skills || [];
}
async function getSkill(name) {
  const res = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}`);
  return res.ok ? res.json() : null;
}
async function draft(instructions, task, key) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6', max_tokens: 350,
      system: instructions + '\n\nYou are being read aloud by a voice assistant. Give a SHORT spoken answer: the 3–5 first moves for this task, in plain sentences, no markdown, under 90 words. End by saying the full version is on their phone.',
      messages: [{ role: 'user', content: task }],
    }),
  });
  if (!res.ok) return null;
  const j = await res.json();
  return (j.content || []).map((c) => c.text).join('').trim();
}

exports.handler = async (event) => {
  const req = event.request || {};
  const type = req.type;
  if (type === 'LaunchRequest') {
    return speak('PM Skills. Tell me the task — like, which skill for explaining a metric drop to my CEO.', { endSession: false });
  }
  if (type === 'IntentRequest') {
    const intent = req.intent || {};
    if (['AMAZON.StopIntent', 'AMAZON.CancelIntent'].includes(intent.name)) return speak('Okay.');
    if (intent.name === 'AMAZON.HelpIntent') {
      return speak('Say the task you need help with, and I\'ll name the professional skill that fits — a P R D, an exec update, a postmortem. Ask "which skill for" to just get the name.', { endSession: false });
    }
    const task = (((intent.slots || {}).task) || {}).value || '';
    if (!task) return speak('What\'s the task?', { endSession: false });
    const hits = await search(task);
    if (!hits.length) return speak('I couldn\'t find a matching skill. Try describing the deliverable — like a launch plan, or a status update.', { endSession: false });
    const top = hits[0];
    const deepLink = `${SITE}/?skill=${top.name}`;
    // FindSkillIntent, or no run key → just name it (+ card with the link).
    if (intent.name === 'FindSkillIntent' || !process.env.ANTHROPIC_API_KEY) {
      const also = hits.length > 1 ? ` Or maybe ${hits[1].title}.` : '';
      return speak(`For that, use the ${top.title} skill.${also} I\'ve put a link on your phone to run it.`,
        { card: { title: top.title, content: `${top.description}\n\nRun it: ${deepLink}` } });
    }
    // RunSkillIntent with a key → read a short draft aloud, full version on card.
    const full = await getSkill(top.name);
    const spoken = full ? await draft(full.instructions, task, process.env.ANTHROPIC_API_KEY) : null;
    return speak(spoken || `Use the ${top.title} skill — the full version is on your phone.`,
      { card: { title: top.title, content: `Task: ${task}\n\nRun the full skill: ${deepLink}` } });
  }
  return speak('Okay.');
};
