// PM Skills — Zapier app definition (Platform Core, CommonJS).
// Brings the library into any Zap: SEARCH the catalogue, GET a skill's full
// instructions, and RUN a skill on text (bring-your-own Anthropic key). No auth
// for the read actions; the run action takes the user's key as an input field so
// nothing is stored by the app.
//
// Scaffold: `npm i -g zapier-platform-cli`, `zapier init` in a copy of this dir,
// drop this in as index.js, `zapier push`. Kept dependency-free so it reads as a
// spec you can lift into a fuller build.

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';

// --- SEARCH: find skills by keyword -----------------------------------------
const searchSkills = {
  key: 'search_skills',
  noun: 'Skill',
  display: { label: 'Find a Skill', description: 'Search the library for skills matching a query.' },
  operation: {
    inputFields: [{ key: 'query', label: 'Query', required: true, helpText: 'e.g. "explain a metric drop to my CEO"' }],
    perform: async (z, bundle) => {
      const res = await z.request(`${API}/v1/search`, { params: { q: bundle.inputData.query, limit: 10 } });
      return res.data.skills || [];
    },
    sample: { name: 'executive-update', title: 'Executive Update', bundle: 'pm-comms', description: 'Turn messy notes into a board-ready update.' },
  },
};

// --- GET: one skill with full instructions ----------------------------------
const getSkill = {
  key: 'get_skill',
  noun: 'Skill',
  display: { label: 'Get a Skill (with instructions)', description: "Fetch one skill's full instructions — use as your model's system prompt." },
  operation: {
    inputFields: [{ key: 'name', label: 'Skill name', required: true, helpText: 'The slug, e.g. executive-update' }],
    perform: async (z, bundle) => {
      const res = await z.request(`${API}/v1/skills/${encodeURIComponent(bundle.inputData.name)}`);
      return res.data;
    },
    sample: { name: 'executive-update', title: 'Executive Update', instructions: '# Executive Update\n…' },
  },
};

// --- CREATE: run a skill on text (BYO key) ----------------------------------
const runSkill = {
  key: 'run_skill',
  noun: 'Run',
  display: { label: 'Run a Skill', description: 'Run a skill on your text using your Anthropic key. Returns the drafted artifact.' },
  operation: {
    inputFields: [
      { key: 'name', label: 'Skill name', required: true, helpText: 'The slug, e.g. incident-postmortem' },
      { key: 'input', label: 'Input text', required: true, type: 'text' },
      { key: 'api_key', label: 'Anthropic API key', required: true, type: 'password', helpText: 'Your key — used for this call only, never stored by the app.' },
      { key: 'model', label: 'Model', required: false, default: 'claude-sonnet-4-6' },
    ],
    perform: async (z, bundle) => {
      const skill = (await z.request(`${API}/v1/skills/${encodeURIComponent(bundle.inputData.name)}`)).data;
      const res = await z.request({
        url: 'https://api.anthropic.com/v1/messages',
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': bundle.inputData.api_key, 'anthropic-version': '2023-06-01' },
        body: {
          model: bundle.inputData.model || 'claude-sonnet-4-6',
          max_tokens: 2000,
          system: skill.instructions,
          messages: [{ role: 'user', content: bundle.inputData.input }],
        },
      });
      const text = (res.data.content || []).map((c) => c.text).join('');
      return { skill: skill.name, title: skill.title, output: text };
    },
    sample: { skill: 'incident-postmortem', title: 'Incident Postmortem', output: '## Summary\n…' },
  },
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: '15.0.0',
  searches: { [searchSkills.key]: searchSkills, [getSkill.key]: getSkill },
  creates: { [runSkill.key]: runSkill },
};
