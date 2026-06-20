// PM Skills — VS Code / Cursor extension.
// Pulls the live skill catalog and lets you insert a skill's instructions as
// context (for Copilot/Cursor inline chat), copy it, or open it in the playground.
const vscode = require('vscode');
const https = require('https');

const SKILLS_URL = 'https://mohitagw15856.github.io/pm-claude-skills/skills.json';
const PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills/index.html?skill=';
let cache = null;

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

async function loadSkills() {
  if (cache) return cache;
  const data = await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Window, title: 'Loading PM Skills…' },
    () => fetchJSON(SKILLS_URL)
  );
  cache = (data.skills || []).sort((a, b) => a.title.localeCompare(b.title));
  return cache;
}

async function pickSkill() {
  let skills;
  try { skills = await loadSkills(); }
  catch (e) { vscode.window.showErrorMessage('PM Skills: could not load the catalog (' + e.message + ').'); return null; }
  const items = skills.map((s) => ({
    label: s.title,
    description: s.plugin + (s.eval ? '  ✅ ' + s.eval.score + '/5' : ''),
    detail: s.summary || s.description,
    skill: s,
  }));
  const pick = await vscode.window.showQuickPick(items, {
    matchOnDetail: true, matchOnDescription: true,
    placeHolder: 'Search ' + skills.length + ' professional skills…',
  });
  return pick ? pick.skill : null;
}

function activate(context) {
  const insert = vscode.commands.registerCommand('pmSkills.insert', async () => {
    const s = await pickSkill(); if (!s) return;
    const editor = vscode.window.activeTextEditor;
    const text = `<!-- PM Skill: ${s.title} -->\n${s.instructions}\n`;
    if (editor) {
      await editor.edit((e) => e.insert(editor.selection.active, text));
      vscode.window.showInformationMessage(`Inserted "${s.title}" — use it as context for Copilot/Cursor chat.`);
    } else {
      await vscode.env.clipboard.writeText(text);
      vscode.window.showInformationMessage(`No editor open — copied "${s.title}" to clipboard instead.`);
    }
  });

  const copy = vscode.commands.registerCommand('pmSkills.copy', async () => {
    const s = await pickSkill(); if (!s) return;
    await vscode.env.clipboard.writeText(s.instructions);
    vscode.window.showInformationMessage(`Copied "${s.title}" to clipboard.`);
  });

  const open = vscode.commands.registerCommand('pmSkills.openPlayground', async () => {
    const s = await pickSkill(); if (!s) return;
    vscode.env.openExternal(vscode.Uri.parse(PLAYGROUND + s.name));
  });

  context.subscriptions.push(insert, copy, open);
}

function deactivate() {}
module.exports = { activate, deactivate };
