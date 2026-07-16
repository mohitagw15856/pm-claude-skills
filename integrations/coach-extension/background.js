// PM Skills — right-click "send to a skill" (background service worker).
// Select any text on any page, right-click, and drop it straight into a
// professional skill in the playground — the selection arrives pre-filled in
// the skill's first input, ready to run. Nothing is sent anywhere by the
// extension itself: it just opens a share link your browser navigates to.
'use strict';

const PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills/';

// A curated shortlist for the submenu — the skills people most often want to
// throw a paragraph at. (The full 500+ library lives one click away via
// "Browse the whole library…".) Keep this short so the menu stays usable.
const QUICK = [
  ['executive-update', 'Executive Update'],
  ['prd-template', 'PRD'],
  ['meeting-notes', 'Meeting Notes → Actions'],
  ['incident-postmortem', 'Incident Postmortem'],
  ['one-pager', 'One-Pager'],
  ['rewrite-clearer', 'Rewrite It Clearer'],
  ['tone-shift', 'Shift the Tone'],
  ['summarise-thread', 'Summarise This Thread'],
  ['competitor-teardown', 'Competitor Teardown'],
  ['stakeholder-update', 'Stakeholder Update'],
  ['decision-forensics', 'Decision Forensics'],
  ['cover-letter', 'Cover Letter'],
];

// Pack a value array the way the playground's share link expects (?i=…):
// base64 of the UTF-8 JSON. Here we pre-fill only the first input.
function packInput(text) {
  const json = JSON.stringify([text]);
  // btoa needs Latin-1; round-trip through UTF-8 the same way app.js unpacks it.
  return btoa(unescape(encodeURIComponent(json)));
}

function openSkill(name, selection) {
  let url = PLAYGROUND + '?skill=' + encodeURIComponent(name);
  if (selection) url += '&i=' + encodeURIComponent(packInput(selection));
  chrome.tabs.create({ url });
}

function buildMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'pm-root',
      title: 'Run a PM Skill on "%s"',
      contexts: ['selection'],
    });
    QUICK.forEach(([name, label]) => {
      chrome.contextMenus.create({
        id: 'pm-skill:' + name,
        parentId: 'pm-root',
        title: label,
        contexts: ['selection'],
      });
    });
    chrome.contextMenus.create({ id: 'pm-sep', parentId: 'pm-root', type: 'separator', contexts: ['selection'] });
    chrome.contextMenus.create({
      id: 'pm-browse',
      parentId: 'pm-root',
      title: 'Browse the whole library…',
      contexts: ['selection'],
    });
  });
}

chrome.runtime.onInstalled.addListener(buildMenus);
chrome.runtime.onStartup && chrome.runtime.onStartup.addListener(buildMenus);

chrome.contextMenus.onClicked.addListener((info) => {
  const sel = (info.selectionText || '').trim();
  if (info.menuItemId === 'pm-browse') {
    // Send the selection to the command bar so the user can pick the best fit.
    chrome.tabs.create({ url: PLAYGROUND + (sel ? '?q=' + encodeURIComponent(sel.slice(0, 300)) : '') });
    return;
  }
  if (typeof info.menuItemId === 'string' && info.menuItemId.startsWith('pm-skill:')) {
    openSkill(info.menuItemId.slice('pm-skill:'.length), sel);
  }
});
