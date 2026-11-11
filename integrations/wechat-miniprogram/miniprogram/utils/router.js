// Offline skill router for the Mini Program. Same scoring as
// integrations/china-agent-tools/pm_skills_tool.py so the two give the same answers:
// words of two or more letters, plus overlapping pairs of Chinese characters;
// a hit in the skill's own name counts three times a hit in its description.
function tokens(text) {
  const out = new Set();
  const lower = String(text || '').toLowerCase();
  for (const w of lower.match(/[a-z0-9]+/g) || []) if (w.length > 1) out.add(w);
  for (const run of lower.match(/[一-鿿]+/g) || []) {
    if (run.length === 1) out.add(run);
    for (let i = 0; i < run.length - 1; i++) out.add(run.slice(i, i + 2));
  }
  return out;
}

function prepare(index) {
  return index.map((s) => ({
    s,
    name: tokens(s.n.replace(/-/g, ' ')),
    desc: tokens([s.t, s.d, s.z].filter(Boolean).join(' ')),
  }));
}

function overlap(q, set) {
  let n = 0;
  q.forEach((t) => { if (set.has(t)) n++; });
  return n;
}

function find(prepared, query, limit) {
  const q = tokens(query);
  if (!q.size) return [];
  const max = Math.max(1, Math.min(Number(limit) || 8, 30));
  return prepared
    .map((p) => ({ score: 3 * overlap(q, p.name) + overlap(q, p.desc), s: p.s }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || (a.s.n < b.s.n ? -1 : 1))
    .slice(0, max)
    .map((r) => r.s);
}

// The text a user pastes into any chat assistant. With the skill body on board the
// prompt carries the whole skill; without it, the description and where to get the rest.
function promptFor(skill, body) {
  if (body) return '请严格按照下面这份技能说明来完成我的任务。先问清缺少的信息，不要编造。\n\n' + body + '\n\n我的任务：';
  return '请扮演一位资深专业人士，按下面的技能要求完成我的任务。先问清缺少的信息，不要编造。\n\n技能：' +
    (skill.t || skill.n) + '\n要求：' + (skill.z || skill.d) +
    '\n\n完整技能说明：https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills/' + skill.n + '/SKILL.md\n\n我的任务：';
}

module.exports = { tokens, prepare, find, promptFor };
