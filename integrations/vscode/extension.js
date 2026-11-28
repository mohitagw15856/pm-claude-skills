// PM Skills for VS Code: find a skill and put its instructions where you are working.
// Three commands, no telemetry, no key. It reads the public PM Skills API and nothing else.
'use strict';

const vscode = require('vscode');
const { searchUrl, skillUrl, sourceUrl, toItems, asPrompt } = require('./lib');

async function getJson(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`The PM Skills API answered ${res.status}.`);
  return res.json();
}

async function pickSkill() {
  const query = await vscode.window.showInputBox({ prompt: 'What do you need? For example: explain a metric drop to leadership', placeHolder: 'Describe the task in your own words' });
  if (!query) return null;
  const items = toItems(await getJson(searchUrl(query)));
  if (!items.length) { vscode.window.showInformationMessage('No skill matched. Try other words.'); return null; }
  const picked = await vscode.window.showQuickPick(items, { matchOnDescription: true, matchOnDetail: true, placeHolder: 'Pick a skill' });
  if (!picked) return null;
  return { picked, query };
}

async function run(action) {
  try {
    const choice = await pickSkill();
    if (!choice) return;
    if (action === 'open') { await vscode.env.openExternal(vscode.Uri.parse(sourceUrl(choice.picked.name))); return; }
    const text = asPrompt(await getJson(skillUrl(choice.picked.name)), choice.query);
    if (action === 'copy') {
      await vscode.env.clipboard.writeText(text);
      vscode.window.showInformationMessage(`Copied ${choice.picked.name}. Paste it into your assistant's chat.`);
      return;
    }
    const editor = vscode.window.activeTextEditor;
    if (editor) await editor.edit((edit) => edit.insert(editor.selection.active, text));
    else await vscode.window.showTextDocument(await vscode.workspace.openTextDocument({ content: text, language: 'markdown' }));
  } catch (e) {
    vscode.window.showErrorMessage(`PM Skills: ${e.message || e}`);
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('pmSkills.copy', () => run('copy')),
    vscode.commands.registerCommand('pmSkills.insert', () => run('insert')),
    vscode.commands.registerCommand('pmSkills.open', () => run('open')),
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
