// Write-back to real tools — close the last mile. The playground makes the
// artifact; this puts it where the work actually lives: a GitHub issue, a Notion
// page, a Linear ticket, a Slack message, a Jira issue or a Confluence page. One POST,
// one destination adapter.
//
// It's a thin, honest relay: it holds NO data of its own. You send it the
// finished markdown + a destination; it calls that tool's API with a token YOU
// provide (as a Worker secret) and returns the created object's URL.
//
//   POST /writeback
//   { "dest": "github", "title": "...", "markdown": "...", "target": { "repo": "owner/name", "labels": ["ai-drafted"] } }
//
// Deploy:  cd integrations/writeback && npm install && npx wrangler deploy
// Secrets (only the ones you use):
//   npx wrangler secret put GITHUB_TOKEN
//   npx wrangler secret put NOTION_TOKEN
//   npx wrangler secret put LINEAR_TOKEN
//   npx wrangler secret put SLACK_BOT_TOKEN
//   npx wrangler secret put ATLASSIAN_EMAIL    (Jira and Confluence Cloud)
//   npx wrangler secret put ATLASSIAN_TOKEN    (an Atlassian API token)
//   and set the variable ATLASSIAN_SITE in wrangler.toml, for example your-team.atlassian.net

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
};
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', ...CORS } });

// ---- destination adapters ---------------------------------------------------
// Each returns { url } of the thing it created, or throws with a clear message.

async function toGitHub(env, { title, markdown, target }) {
  if (!env.GITHUB_TOKEN) throw new Error('Set GITHUB_TOKEN secret to write to GitHub.');
  const repo = target && target.repo;
  if (!repo) throw new Error('target.repo ("owner/name") is required for GitHub.');
  const r = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.GITHUB_TOKEN}`, accept: 'application/vnd.github+json', 'user-agent': 'pm-skills-writeback', 'content-type': 'application/json' },
    body: JSON.stringify({ title: title || 'AI-drafted', body: markdown, labels: (target && target.labels) || ['ai-drafted'] }),
  });
  if (!r.ok) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return { url: (await r.json()).html_url };
}

async function toNotion(env, { title, markdown, target }) {
  if (!env.NOTION_TOKEN) throw new Error('Set NOTION_TOKEN secret to write to Notion.');
  const parent = target && (target.database_id || target.page_id);
  if (!parent) throw new Error('target.database_id or target.page_id is required for Notion.');
  // Split markdown into paragraph blocks (Notion caps rich_text length; keep it simple).
  const blocks = markdown.split(/\n{2,}/).slice(0, 90).map((chunk) => ({
    object: 'block', type: 'paragraph',
    paragraph: { rich_text: [{ type: 'text', text: { content: chunk.slice(0, 1900) } }] },
  }));
  const body = target.database_id
    ? { parent: { database_id: target.database_id }, properties: { Name: { title: [{ text: { content: title || 'AI-drafted' } }] } }, children: blocks }
    : { parent: { page_id: target.page_id }, properties: {}, children: blocks };
  const r = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.NOTION_TOKEN}`, 'notion-version': '2022-06-28', 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Notion ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return { url: (await r.json()).url };
}

async function toLinear(env, { title, markdown, target }) {
  if (!env.LINEAR_TOKEN) throw new Error('Set LINEAR_TOKEN secret to write to Linear.');
  const teamId = target && target.team_id;
  if (!teamId) throw new Error('target.team_id is required for Linear.');
  const q = `mutation($t:String!,$d:String!,$team:String!){issueCreate(input:{title:$t,description:$d,teamId:$team}){success issue{url}}}`;
  const r = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { authorization: env.LINEAR_TOKEN, 'content-type': 'application/json' },
    body: JSON.stringify({ query: q, variables: { t: title || 'AI-drafted', d: markdown, team: teamId } }),
  });
  const j = await r.json();
  if (!r.ok || j.errors) throw new Error(`Linear: ${JSON.stringify(j.errors || j).slice(0, 200)}`);
  return { url: j.data.issueCreate.issue.url };
}

async function toSlack(env, { title, markdown, target }) {
  if (!env.SLACK_BOT_TOKEN) throw new Error('Set SLACK_BOT_TOKEN secret to post to Slack.');
  const channel = target && target.channel;
  if (!channel) throw new Error('target.channel is required for Slack.');
  const text = (title ? `*${title}*\n` : '') + markdown;
  const r = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.SLACK_BOT_TOKEN}`, 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ channel, text: text.slice(0, 38000), unfurl_links: false }),
  });
  const j = await r.json();
  if (!j.ok) throw new Error(`Slack: ${j.error}`);
  return { url: `slack://channel?team=&id=${channel}`, ts: j.ts };
}

// ---- Atlassian (Jira and Confluence Cloud) ----------------------------------
// The site is fixed by configuration (ATLASSIAN_SITE), never taken from the request:
// a caller who could name the host could have your token sent anywhere.
// Request builders are pure and exported so they can be tested without a network.

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function atlassianBase(env) {
  const site = String(env.ATLASSIAN_SITE || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
  if (!site) throw new Error('Set ATLASSIAN_SITE (for example your-team.atlassian.net).');
  if (!/^[a-z0-9][a-z0-9-]{0,61}\.atlassian\.net$/i.test(site)) throw new Error('ATLASSIAN_SITE must be a Cloud site such as your-team.atlassian.net.');
  if (!env.ATLASSIAN_EMAIL || !env.ATLASSIAN_TOKEN) throw new Error('Set ATLASSIAN_EMAIL and ATLASSIAN_TOKEN secrets to write to Jira or Confluence.');
  return { base: `https://${site}`, auth: `Basic ${btoa(`${env.ATLASSIAN_EMAIL}:${env.ATLASSIAN_TOKEN}`)}` };
}

// Markdown paragraphs as an Atlassian Document Format document (plain paragraphs only).
export function toAdf(markdown) {
  const paragraphs = String(markdown).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).slice(0, 200);
  return { type: 'doc', version: 1, content: paragraphs.map((p) => ({ type: 'paragraph', content: [{ type: 'text', text: p.slice(0, 30000) }] })) };
}

export function jiraRequest(env, { title, markdown, target }) {
  const { base, auth } = atlassianBase(env);
  const project = target && target.project_key;
  if (!project || !/^[A-Z][A-Z0-9_]{1,19}$/.test(project)) throw new Error('target.project_key (for example "PAY") is required for Jira.');
  const issueType = (target && target.issue_type) || 'Task';
  if (!/^[\w .-]{1,40}$/.test(issueType)) throw new Error('target.issue_type is not a valid issue type name.');
  const labels = Array.isArray(target.labels) ? target.labels.filter((l) => typeof l === 'string' && /^[\w.-]{1,50}$/.test(l)) : ['ai-drafted'];
  return {
    base,
    url: `${base}/rest/api/3/issue`,
    init: {
      method: 'POST',
      headers: { authorization: auth, accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ fields: { project: { key: project }, summary: String(title || 'AI-drafted').slice(0, 250), issuetype: { name: issueType }, description: toAdf(markdown), labels } }),
    },
  };
}

export function confluenceRequest(env, { title, markdown, target }) {
  const { base, auth } = atlassianBase(env);
  const spaceId = target && target.space_id;
  if (!spaceId || !/^\d{1,20}$/.test(String(spaceId))) throw new Error('target.space_id (the numeric space id) is required for Confluence.');
  const parentId = target.parent_id;
  if (parentId !== undefined && !/^\d{1,20}$/.test(String(parentId))) throw new Error('target.parent_id must be a numeric page id.');
  const value = String(markdown).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).slice(0, 400)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br />')}</p>`).join('');
  const body = { spaceId: String(spaceId), status: 'current', title: String(title || 'AI-drafted').slice(0, 250), body: { representation: 'storage', value } };
  if (parentId !== undefined) body.parentId = String(parentId);
  return {
    base,
    url: `${base}/wiki/api/v2/pages`,
    init: { method: 'POST', headers: { authorization: auth, accept: 'application/json', 'content-type': 'application/json' }, body: JSON.stringify(body) },
  };
}

async function toJira(env, payload) {
  const { base, url, init } = jiraRequest(env, payload);
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`Jira ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const key = (await r.json()).key;
  return { url: `${base}/browse/${key}`, key };
}

async function toConfluence(env, payload) {
  const { base, url, init } = confluenceRequest(env, payload);
  const r = await fetch(url, init);
  if (!r.ok) throw new Error(`Confluence ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const page = await r.json();
  const webui = page && page._links && page._links.webui;
  return { url: webui ? `${base}/wiki${webui}` : `${base}/wiki/pages/viewpage.action?pageId=${page.id}`, id: page.id };
}

const ADAPTERS = { github: toGitHub, notion: toNotion, linear: toLinear, slack: toSlack, jira: toJira, confluence: toConfluence };

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    if (request.method === 'GET') {
      return json({ service: 'pm-skills-writeback', dests: Object.keys(ADAPTERS), post: '/writeback { dest, title, markdown, target }' });
    }
    if (request.method !== 'POST' || url.pathname !== '/writeback') return json({ error: 'POST /writeback' }, 404);
    let payload;
    try { payload = await request.json(); } catch { return json({ error: 'Body must be JSON.' }, 400); }
    const { dest, markdown } = payload;
    const adapter = ADAPTERS[dest];
    if (!adapter) return json({ error: `Unknown dest "${dest}". One of: ${Object.keys(ADAPTERS).join(', ')}` }, 400);
    if (!markdown || !markdown.trim()) return json({ error: 'markdown is required.' }, 400);
    try {
      const out = await adapter(env, payload);
      return json({ ok: true, dest, ...out });
    } catch (e) {
      return json({ ok: false, dest, error: String(e.message || e) }, 502);
    }
  },
};
