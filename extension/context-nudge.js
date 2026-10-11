// Opt-in: suggest a skill on the page you are on. Registered at run time by the
// popup only after the user switches on "Suggest skills as I browse" and grants
// the permission; switching it off unregisters it. Matching is local
// (context-match.js). One small, dismissible card per page; a dismissed rule
// never shows again.
(async function () {
  if (window.top !== window || window.__pmNudge) return;
  // Not on the library's own site (it lists every skill, so every rule would fire)
  // or on the chat sites, which have the skill picker already.
  if (/^https:\/\/mohitagw15856\.github\.io\/pm-claude-skills\//.test(location.href) || /(^|\.)(chatgpt\.com|chat\.openai\.com|claude\.ai|gemini\.google\.com)$/.test(location.hostname)) return;
  window.__pmNudge = true;
  try {
    const cfg = await (await fetch(chrome.runtime.getURL('context-rules.json'))).json();
    const hit = pmContextMatch.matchPage({ rules: cfg.rules, never: cfg.never, host: location.hostname, url: location.href, text: document.body ? document.body.innerText : '' });
    if (!hit) return;
    const { pm_dismissed = [] } = await chrome.storage.local.get('pm_dismissed');
    if (pm_dismissed.includes(hit.id)) return;
    const card = document.createElement('div');
    card.className = 'pm-nudge';
    card.setAttribute('role', 'complementary');
    const p = document.createElement('p');
    p.textContent = hit.label;
    card.appendChild(p);
    for (const name of hit.suggest.slice(0, 3)) {
      const a = document.createElement('a');
      a.href = 'https://mohitagw15856.github.io/pm-claude-skills/index.html?skill=' + encodeURIComponent(name);
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = name;
      card.appendChild(a);
    }
    const x = document.createElement('button');
    x.type = 'button';
    x.textContent = '×';
    x.title = "Don't suggest this again";
    x.addEventListener('click', async () => {
      card.remove();
      const { pm_dismissed: d = [] } = await chrome.storage.local.get('pm_dismissed');
      await chrome.storage.local.set({ pm_dismissed: [...new Set([...d, hit.id])] });
    });
    card.appendChild(x);
    document.documentElement.appendChild(card);
  } catch { /* never break the page */ }
})();
