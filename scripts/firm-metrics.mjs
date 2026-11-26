#!/usr/bin/env node
// The live Firm's scoreboard: the few public numbers its predictions are judged on,
// fetched from GitHub's and npm's public APIs (GITHUB_TOKEN raises the rate limit
// but is not needed). Shared by scripts/firm-session.mjs (--live) and
// scripts/score-firm-predictions.mjs, so a prediction is always checked against
// the same definition it was made with.
//
//   node scripts/firm-metrics.mjs     # print the current values
export const REPO = 'mohitagw15856/pm-claude-skills';
export const METRICS = {
  stars: 'GitHub stars',
  forks: 'GitHub forks',
  open_issues: 'open issues and pull requests',
  npm_weekly_downloads: 'npm downloads of pm-claude-skills in the last 7 days',
};

export async function fetchMetrics() {
  const headers = { 'user-agent': 'pm-claude-skills-firm', ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
  const [gh, npm] = await Promise.all([
    fetch(`https://api.github.com/repos/${REPO}`, { headers }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetch('https://api.npmjs.org/downloads/point/last-week/pm-claude-skills').then((r) => (r.ok ? r.json() : null)).catch(() => null),
  ]);
  return {
    stars: gh?.stargazers_count ?? null,
    forks: gh?.forks_count ?? null,
    open_issues: gh?.open_issues_count ?? null,
    npm_weekly_downloads: npm?.downloads ?? null,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) console.log(JSON.stringify(await fetchMetrics(), null, 2));
