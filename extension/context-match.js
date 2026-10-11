// Contextual discovery, v1: match the page you are on to a skill, entirely in the
// browser (context-rules.json; design in CONTEXTUAL-DISCOVERY.md). Used by the
// popup (on click, through activeTab) and by context-nudge.js (only once the user
// opts in to suggestions as they browse). Nothing about the page leaves the device.
//
// A rule fires on a host or URL match, or on two or more of its keywords. The
// highest-scoring rule wins; `never` hosts (sign-in, banking) are skipped first.
(function (root) {
  function blocked(never, host) {
    const hosts = Array.isArray(never) ? never : (never && never.hosts) || [];
    return hosts.some((h) => host.includes(h));
  }
  function matchPage({ rules, never, host, url, text }) {
    host = String(host || '').toLowerCase();
    if (!host || blocked(never, host)) return null;
    const body = String(text || '').slice(0, 50000).toLowerCase();
    let best = null;
    for (const r of rules || []) {
      let score = 0;
      if ((r.hosts || []).some((h) => host.includes(h))) score += 10;
      if ((r.urls || []).some((re) => { try { return new RegExp(re, 'i').test(url || ''); } catch { return false; } })) score += 10;
      const hits = (r.keywords || []).filter((k) => body.includes(k.toLowerCase())).length;
      if (hits >= 2) score += hits;
      if (score && (!best || score > best.score)) best = { score, rule: r };
    }
    return best ? { id: best.rule.id, label: best.rule.label, suggest: best.rule.suggest || [], score: best.score } : null;
  }
  root.pmContextMatch = { matchPage, blocked };
  if (typeof module !== 'undefined') module.exports = root.pmContextMatch;
})(typeof globalThis !== 'undefined' ? globalThis : this);
