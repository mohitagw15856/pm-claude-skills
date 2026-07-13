// Email-native operator (off-web reach). A Cloudflare Email Worker: forward a
// thread (or write a fresh mail) to your routing address and get the drafted
// artifact back as a reply — PRD, summary, board minutes, a drafted response.
//
//   Subject:  prd-template
//   (or just describe the task in the subject/body and it picks a skill)
//
// The skill runs on the email body; the reply lands in the same thread.
//
// Deploy:  cd integrations/email && npm install && npx wrangler deploy
// Secret:  npx wrangler secret put ANTHROPIC_API_KEY
// Then in Cloudflare → Email Routing, route an address (e.g. do@yourdomain)
// to this Worker.
import { EmailMessage } from 'cloudflare:email';
import PostalMime from 'postal-mime';
import { createMimeMessage } from 'mimetext';

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';

async function searchSkill(q) {
  const r = await fetch(`${API}/v1/search?q=${encodeURIComponent(q)}`, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!r.ok) return null;
  const j = await r.json();
  return (j.skills && j.skills[0]) || null;
}
async function skillBody(name) {
  const r = await fetch(`${API}/v1/skills/${encodeURIComponent(name)}?format=md`, { cf: { cacheTtl: 300, cacheEverything: true } });
  return r.ok ? await r.text() : null;
}
async function runSkill(md, userText, key) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: md + '\n\nYou are replying by email. Produce the deliverable directly, no preamble. If required inputs are missing, ask for them briefly at the top.',
      messages: [{ role: 'user', content: userText.slice(0, 40000) }],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const j = await res.json();
  return (j.content || []).map((c) => c.text || '').join('').trim();
}

export default {
  async email(message, env) {
    const key = env.ANTHROPIC_API_KEY;
    const parsed = await PostalMime.parse(message.raw);
    const subject = (parsed.subject || '').trim();
    const body = (parsed.text || parsed.html || '').replace(/<[^>]+>/g, ' ').trim();

    // Route: an explicit skill name in the subject wins; else search subject+body.
    let name, footerNote = '';
    const m = subject.match(/^\s*([a-z0-9][a-z0-9-]{2,40})\s*$/i);
    if (m) name = m[1].toLowerCase();
    if (!name) { const s = await searchSkill(subject + ' ' + body.slice(0, 400)); name = s && s.name; }

    let replyText;
    if (!key) {
      replyText = 'The email operator is not configured yet (missing ANTHROPIC_API_KEY).';
    } else if (!name) {
      replyText = `Couldn't match a skill. Put a skill name in the subject (e.g. "meeting-notes") or describe the task.\n\nBrowse all skills: ${SITE}`;
    } else {
      try {
        const md = await skillBody(name);
        if (!md) { replyText = `Unknown skill "${name}". Browse: ${SITE}`; }
        else {
          const out = await runSkill(md, `${subject ? 'Subject: ' + subject + '\n\n' : ''}${body}`, key);
          footerNote = `\n\n— drafted with the "${name}" skill · run it yourself: ${SITE}/?skill=${encodeURIComponent(name)}\nReview before sending; verify anything marked [to confirm].`;
          replyText = out + footerNote;
        }
      } catch (e) {
        replyText = `Sorry — that failed (${e.message}). Try again, or run it at ${SITE}/?skill=${encodeURIComponent(name)}`;
      }
    }

    // Reply in-thread using Cloudflare's native email reply.
    const msg = createMimeMessage();
    const inReplyTo = message.headers.get('Message-ID');
    if (inReplyTo) { msg.setHeader('In-Reply-To', inReplyTo); msg.setHeader('References', inReplyTo); }
    msg.setSender({ name: 'PM Skills', addr: message.to });
    msg.setRecipient(message.from);
    msg.setSubject('Re: ' + (subject || 'your request'));
    msg.addMessage({ contentType: 'text/plain', data: replyText });

    await message.reply(new EmailMessage(message.to, message.from, msg.asRaw()));
  },
};
