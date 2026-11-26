#!/usr/bin/env node
// web/annotate.html, exercised without a browser: its script runs against a small
// stand-in for the DOM. Checks paragraph splitting, that a comment lands on the chosen
// paragraph, the revision request it builds, and that pasted text is never written with
// innerHTML (so a pasted <script> or <img onerror> stays text).
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const html = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'web', 'annotate.html'), 'utf8');
const script = html.match(/<script>\n([\s\S]*?)<\/script>/)[1];
let pass = 0; let fail = 0;
const ok = (label, cond, detail = '') => { if (cond) pass++; else { fail++; console.error(`  ✗ ${label} ${detail}`); } };

ok('no innerHTML, outerHTML, insertAdjacentHTML or document.write', !/innerHTML|outerHTML|insertAdjacentHTML|document\.write/.test(script));
ok('no network call', !/fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(script));

function makeEl(tag = 'div') {
  const el = { tag, children: [], listeners: {}, attrs: {}, value: '', hidden: false, className: '', type: '', _text: '' };
  Object.defineProperty(el, 'textContent', { get() { return el._text + el.children.map((c) => c.textContent).join(''); }, set(v) { el._text = String(v); el.children = []; } });
  el.appendChild = (c) => { el.children.push(c); return c; };
  el.addEventListener = (type, fn) => { el.listeners[type] = fn; };
  el.setAttribute = (k, v) => { el.attrs[k] = v; };
  el.focus = () => {}; el.select = () => {};
  el.click = () => el.listeners.click && el.listeners.click();
  return el;
}
const ids = {};
const store = new Map();
const sandbox = {
  document: { getElementById: (id) => (ids[id] ||= makeEl()), createElement: (tag) => makeEl(tag) },
  window: { getSelection: () => sandbox.selection },
  selection: '',
  navigator: {},
  localStorage: { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, v) },
  Number, JSON, String, Array,
};
vm.createContext(sandbox);
vm.runInContext(script, sandbox);
const $ = (id) => sandbox.document.getElementById(id);

const DOC = '# Plan\r\n\r\nShip <script>alert(1)</script> in March.\n\n```\ncode line\n\nstill code\n```\n\nLast <img src=x onerror=alert(2)> paragraph.';
$('src').value = DOC;
$('load').click();
const blocks = $('doc').children;
ok('splits into four paragraphs, code block kept whole', blocks.length === 4, `got ${blocks.length}`);
ok('pasted markup is kept as text', blocks[1].textContent === 'Ship <script>alert(1)</script> in March.' && blocks[1].tag === 'button');
ok('nothing to send before a comment exists', $('result').hidden === true && $('out').value === '');

$('add').click();
ok('adding without a paragraph is refused', $('list').children.length === 0 && /Select a paragraph/.test($('target').textContent));

sandbox.selection = 'in March';
$('doc').children[1].click();
$('note').value = 'Which March?\nGive the year.';
$('sev').value = 'blocking';
$('add').click();
sandbox.selection = 'text from somewhere else on the page';
$('doc').children[3].click();
$('note').value = 'Cut this.';
$('sev').value = 'optional';
$('add').click();
$('note').value = '   ';
$('add').click();

const out = $('out').value;
ok('two comments recorded, the empty one refused', $('list').children.length === 2);
ok('request counts comments and blocking ones', out.includes('## Comments (2, of which 1 blocking)'));
ok('the highlighted text is quoted', out.includes('1. [BLOCKING] Paragraph 2, on: "in March"'));
ok('a multi-line comment is flattened to one line', out.includes('   Comment: Which March? Give the year.'));
ok('a selection from outside the paragraph falls back to the paragraph', out.includes('2. [OPTIONAL] Paragraph 4, on: "Last <img src=x onerror=alert(2)> paragraph."'));
ok('the original document is included, line endings normalised', out.includes('## Document\n\n# Plan\n\nShip <script>alert(1)</script> in March.'));
ok('the request tells the model not to invent facts', /Do not invent facts/.test(out));
ok('commented paragraphs are marked', /has/.test($('doc').children[1].className) && !/has/.test($('doc').children[0].className));

$('list').children[0].children[3].click();
ok('removing a comment updates the request', $('out').value.includes('## Comments (1, of which 0 blocking)'));

// A saved session with a comment that points past the end of the document must be dropped on restore.
store.set('pm-skills-annotate-v1', JSON.stringify({ src: 'One\n\nTwo', comments: [{ block: 9, quote: 'x', note: 'y', sev: 'blocking' }, { block: 1, quote: 'Two', note: 'ok', sev: 'weird' }, { block: 0, quote: 'One', note: 'keep', sev: 'optional' }] }));
for (const k of Object.keys(ids)) delete ids[k];
vm.runInContext(script, sandbox);
ok('restore keeps only valid saved comments', ids.list.children.length === 1 && ids.out.value.includes('[OPTIONAL] Paragraph 1'));

console.log(`annotate page: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
