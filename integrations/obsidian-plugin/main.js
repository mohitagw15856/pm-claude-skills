/* PM Skills for Obsidian — fuzzy-pick a skill, insert its full instructions at
   the cursor (ready for Copilot/Text Generator/any AI plugin), or just the
   name+link as a reference. Data: the public skills.json, cached per session. */
const { Plugin, SuggestModal, Notice, requestUrl } = require('obsidian');

const INDEX = 'https://mohitagw15856.github.io/pm-claude-skills/skills.json';
let CACHE = null;

class SkillModal extends SuggestModal {
  constructor(app, skills, onPick) {
    super(app);
    this.skills = skills; this.onPick = onPick;
    this.setPlaceholder('Pick a skill… (e.g. "postmortem", "decode my lease")');
  }
  getSuggestions(q) {
    const s = q.toLowerCase();
    return this.skills.filter((x) => x.name.includes(s) || x.title.toLowerCase().includes(s) || x.summary.toLowerCase().includes(s)).slice(0, 30);
  }
  renderSuggestion(x, el) {
    el.createEl('div', { text: x.title });
    el.createEl('small', { text: x.summary, attr: { style: 'opacity:.6' } });
  }
  onChooseSuggestion(x) { this.onPick(x); }
}

module.exports = class PMSkillsPlugin extends Plugin {
  async skills() {
    if (!CACHE) {
      const r = await requestUrl(INDEX);
      CACHE = r.json.skills;
    }
    return CACHE;
  }
  pick(insert) {
    this.skills().then((skills) => new SkillModal(this.app, skills, (x) => {
      const ed = this.app.workspace.activeEditor?.editor;
      if (!ed) { new Notice('Open a note first.'); return; }
      ed.replaceSelection(insert(x));
      new Notice(`Inserted ${x.name}`);
    }).open()).catch(() => new Notice('Could not load the skill index — offline?'));
  }
  onload() {
    this.addCommand({ id: 'insert-skill', name: 'Insert skill instructions at cursor',
      callback: () => this.pick((x) => `\n> [!info] Skill: ${x.title} — [source](https://mohitagw15856.github.io/pm-claude-skills/skill/${x.name}.html)\n\n${x.instructions}\n`) });
    this.addCommand({ id: 'insert-skill-link', name: 'Insert skill reference link',
      callback: () => this.pick((x) => `[${x.title}](https://mohitagw15856.github.io/pm-claude-skills/skill/${x.name}.html)`) });
  }
};
