// Daily caps for a public bot instance, so a shared Telegram bot, WhatsApp
// number or phone line cannot run up the deployer's Anthropic bill. Turned on by
// binding a KV namespace as CAPS_KV; without it (a private deployment) every
// request is allowed. Limits come from env vars, with safe defaults:
//   CAP_PER_USER_PER_DAY (default 5)   CAP_GLOBAL_PER_DAY (default 200)
// Only a hash of the user id is stored, with the count, for two days.

async function sha(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s)));
  return [...new Uint8Array(d)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// { ok: true } or { ok: false, message } for one model call by this user today.
export async function allow(env, user, channel) {
  if (!env.CAPS_KV) return { ok: true };
  const day = new Date().toISOString().slice(0, 10);
  const perUser = Number(env.CAP_PER_USER_PER_DAY || 5), global = Number(env.CAP_GLOBAL_PER_DAY || 200);
  const uk = `cap:${channel}:${day}:${await sha(user)}`, gk = `cap:all:${day}`;
  const [u, g] = await Promise.all([env.CAPS_KV.get(uk), env.CAPS_KV.get(gk)]);
  if (+(g || 0) >= global) return { ok: false, message: "Today's free answers are used up for everyone. It resets at midnight UTC. Deploy your own copy for unlimited use: https://github.com/mohitagw15856/pm-claude-skills/tree/main/integrations" };
  if (+(u || 0) >= perUser) return { ok: false, message: `That's your ${perUser} free answers for today. It resets at midnight UTC.` };
  await Promise.all([env.CAPS_KV.put(uk, String(+(u || 0) + 1), { expirationTtl: 172800 }), env.CAPS_KV.put(gk, String(+(g || 0) + 1), { expirationTtl: 172800 })]);
  return { ok: true };
}
