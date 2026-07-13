#!/usr/bin/env node
// Builds a minimal SCORM 1.2 package (Canvas/Moodle/Blackboard-importable) that
// wraps the 6-week course: each SCO is a launch page linking the week's drill +
// lab with completion marking. Zero deps (zip via `zip` CLI or falls back to
// python3 zipfile).  → docs/syllabus/pm-skills-course.zip
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const stage = join(here, '.scorm-stage');
rmSync(stage, { recursive: true, force: true }); mkdirSync(stage, { recursive: true });
const BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
const WEEKS = [
  ['Briefs before work', 'academy.html', 'index.html?skill=interview-me'],
  ['Evidence discipline', 'academy.html', 'tower.html'],
  ['Executive communication', 'academy.html', 'defend.html'],
  ['Negotiation under hidden state', 'gym.html', 'gym.html'],
  ['Reading people and data', 'academy.html', 'hiring.html'],
  ['Calibration and the Exam', 'reckoning.html', 'certified.html'],
];
const scos = WEEKS.map(([title, drill, lab], i) => {
  const f = `week${i + 1}.html`;
  writeFileSync(join(stage, f), `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Week ${i + 1} — ${title}</title>
<script>function done(){try{var a=window.parent.API||window.top.API;if(a){a.LMSInitialize('');a.LMSSetValue('cmi.core.lesson_status','completed');a.LMSCommit('');a.LMSFinish('');}}catch(e){}}</script>
<style>body{font-family:system-ui;max-width:640px;margin:40px auto;line-height:1.6}a.b{display:inline-block;background:#d97757;color:#fff;padding:10px 18px;border-radius:9px;text-decoration:none;margin:6px 8px 6px 0}</style></head>
<body><h1>Week ${i + 1} — ${title}</h1>
<p>Complete the drill, then the graded lab. Labs produce verifiable artifacts — submit per your instructor's instructions.</p>
<a class="b" href="${BASE}/${drill}" target="_blank">▶ The drill</a>
<a class="b" href="${BASE}/${lab}" target="_blank">🏟 The lab</a>
<p><button onclick="done();this.textContent='✓ Marked complete'">Mark week complete</button></p>
<p style="color:#777;font-size:13px">Course: Professional Judgment with AI — free, open, MIT. ${BASE}</p></body></html>`);
  return { f, title: `Week ${i + 1}: ${title}` };
});
writeFileSync(join(stage, 'imsmanifest.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="pm-skills-course" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2">
  <metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata>
  <organizations default="org1"><organization identifier="org1"><title>Professional Judgment with AI (pm-skills)</title>
  ${scos.map((s, i) => `<item identifier="i${i + 1}" identifierref="r${i + 1}"><title>${s.title}</title></item>`).join('\n  ')}
  </organization></organizations>
  <resources>
  ${scos.map((s, i) => `<resource identifier="r${i + 1}" type="webcontent" adlcp:scormtype="sco" href="${s.f}"><file href="${s.f}"/></resource>`).join('\n  ')}
  </resources>
</manifest>`);
try { execSync(`cd ${JSON.stringify(stage)} && zip -q -r ../pm-skills-course.zip .`); }
catch { execSync(`python3 -c "import shutil; shutil.make_archive('${join(here, 'pm-skills-course')}', 'zip', '${stage}')"`); }
rmSync(stage, { recursive: true, force: true });
console.log('Wrote docs/syllabus/pm-skills-course.zip (SCORM 1.2, 6 SCOs)');
