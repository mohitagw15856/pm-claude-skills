#!/usr/bin/env node
// The Jira and Confluence adapters of the write-back relay, without a network: the
// requests they would send are built and inspected, and the relay is called with a
// stand-in fetch. The point of most cases is what must NOT be possible.
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const src = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'integrations', 'writeback', 'src', 'index.js');
const mod = await import(pathToFileURL(src).href);
const { jiraRequest, confluenceRequest, atlassianBase, toAdf } = mod;
const worker = mod.default;
const env = { ATLASSIAN_SITE: 'acme.atlassian.net', ATLASSIAN_EMAIL: 'a@acme.test', ATLASSIAN_TOKEN: 'tok' };
let pass = 0; let fail = 0;
const ok = (label, cond, detail = '') => { if (cond) pass++; else { fail++; console.error(`  ✗ ${label} ${detail}`); } };
const throws = (label, fn) => { try { fn(); fail++; console.error(`  ✗ ${label}: did not throw`); } catch { pass++; } };

const j = jiraRequest(env, { title: 'Launch postmortem', markdown: 'One.\n\nTwo <b>bold</b>.', target: { project_key: 'PAY' } });
const jb = JSON.parse(j.init.body);
ok('Jira goes to the configured site', j.url === 'https://acme.atlassian.net/rest/api/3/issue');
ok('Jira uses basic auth from the secrets', j.init.headers.authorization === `Basic ${btoa('a@acme.test:tok')}`);
ok('Jira body carries project, summary, type and two paragraphs', jb.fields.project.key === 'PAY' && jb.fields.summary === 'Launch postmortem' && jb.fields.issuetype.name === 'Task' && jb.fields.description.content.length === 2);
ok('Jira default label', JSON.stringify(jb.fields.labels) === '["ai-drafted"]');
ok('empty markdown gives an empty document, not a crash', toAdf('').content.length === 0);
throws('Jira needs a project key', () => jiraRequest(env, { markdown: 'x', target: {} }));
throws('a project key cannot carry a path', () => jiraRequest(env, { markdown: 'x', target: { project_key: 'PAY/../../x' } }));
throws('an issue type cannot carry markup', () => jiraRequest(env, { markdown: 'x', target: { project_key: 'PAY', issue_type: '<script>' } }));
ok('bad labels are dropped', JSON.stringify(JSON.parse(jiraRequest(env, { markdown: 'x', target: { project_key: 'PAY', labels: ['ok', 'has space', 7] } }).init.body).fields.labels) === '["ok"]');

const c = confluenceRequest(env, { title: 'PRD', markdown: 'A & B\nline two\n\n<script>alert(1)</script>', target: { space_id: 12345, parent_id: '678' } });
const cb = JSON.parse(c.init.body);
ok('Confluence goes to the configured site', c.url === 'https://acme.atlassian.net/wiki/api/v2/pages');
ok('Confluence escapes the content', cb.body.value === '<p>A &amp; B<br />line two</p><p>&lt;script&gt;alert(1)&lt;/script&gt;</p>', cb.body.value);
ok('Confluence carries space and parent as strings', cb.spaceId === '12345' && cb.parentId === '678' && cb.status === 'current');
throws('Confluence needs a numeric space id', () => confluenceRequest(env, { markdown: 'x', target: { space_id: 'DOCS' } }));
throws('a parent id cannot carry a path', () => confluenceRequest(env, { markdown: 'x', target: { space_id: 1, parent_id: '1/../2' } }));

for (const site of ['evil.example.com', 'acme.atlassian.net.evil.com', 'acme.atlassian.net/path', 'acme.atlassian.net@evil.com', '', 'localhost']) {
  throws(`site "${site}" is refused`, () => atlassianBase({ ...env, ATLASSIAN_SITE: site }));
}
ok('a site written with https and a trailing slash is accepted', atlassianBase({ ...env, ATLASSIAN_SITE: 'https://acme.atlassian.net/' }).base === 'https://acme.atlassian.net');
throws('missing token is refused', () => atlassianBase({ ATLASSIAN_SITE: 'acme.atlassian.net', ATLASSIAN_EMAIL: 'a@acme.test' }));

// Through the relay, with a stand-in fetch. A host in the request body must be ignored.
const calls = [];
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => { calls.push(String(url)); return new Response(JSON.stringify(String(url).includes('/wiki/') ? { id: '99', _links: { webui: '/spaces/D/pages/99' } } : { key: 'PAY-7' }), { status: 201 }); };
try {
  const post = (body) => worker.fetch(new Request('https://relay.test/writeback', { method: 'POST', body: JSON.stringify(body) }), env).then((r) => r.json());
  const a = await post({ dest: 'jira', title: 't', markdown: 'm', target: { project_key: 'PAY', site: 'evil.example.com', base: 'https://evil.example.com' } });
  ok('relay returns the Jira issue address', a.ok === true && a.url === 'https://acme.atlassian.net/browse/PAY-7', JSON.stringify(a));
  const b = await post({ dest: 'confluence', title: 't', markdown: 'm', target: { space_id: '5' } });
  ok('relay returns the Confluence page address', b.ok === true && b.url === 'https://acme.atlassian.net/wiki/spaces/D/pages/99', JSON.stringify(b));
  ok('every call went to the configured site only', calls.length === 2 && calls.every((u) => u.startsWith('https://acme.atlassian.net/')), calls.join(' '));
  const bad = await post({ dest: 'jira', markdown: 'm', target: {} });
  ok('a bad request is an error response, not a call', bad.ok === false && calls.length === 2);
} finally { globalThis.fetch = realFetch; }

console.log(`writeback (Jira, Confluence): ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
