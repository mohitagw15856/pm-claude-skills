#!/usr/bin/env node
// Writes ready-to-import Dify app files (DSL) for the flagship Chinese skills:
// integrations/dify-templates/<skill>.yml, each a chatflow of start -> LLM -> answer with the
// skill's Simplified Chinese text (or English where there is no translation) as the system prompt.
// Import in Dify: Studio -> Import DSL file. The model defaults to DeepSeek; change it after import.
//   node scripts/build-dify-templates.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'integrations', 'dify-templates');
mkdirSync(out, { recursive: true });

const SKILLS = [
  ['cn-weekly-report', '📝', '周报助手'], ['cn-promotion-defence', '🎯', '晋升答辩教练'], ['cn-prd-review', '📋', '需求评审助手'],
  ['cn-level-mapper', '🪜', '职级对标'], ['cn-severance-calculator', '⚖️', '经济补偿金估算'], ['cn-labour-contract-decoder', '📄', '劳动合同解读'],
  ['cn-civil-exam-interview', '🎤', '结构化面试陪练'], ['cn-civil-exam-essay', '✍️', '申论批改'], ['cn-kaoyan-planner', '📚', '考研规划'],
  ['cn-campus-recruitment', '🎓', '校招规划'], ['feishu-doc-writer', '🪶', '飞书文档助手'], ['dingtalk-work-log', '🗓️', '钉钉日志助手'],
];

function skillText(name) {
  const zh = join(root, 'skills-i18n', 'zh', name, 'SKILL.md');
  const file = existsSync(zh) ? zh : join(root, 'skills', name, 'SKILL.md');
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const [, fm, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const desc = (fm.match(/^description:\s*"?(.*?)"?\s*$/m) || [])[1] || '';
  const cleanBody = body.replace(/^\s*> \[.*?规范版本。\s*\n/s, '').trim();
  const triggers = [...cleanBody.matchAll(/^- "(.+)"$/gm)].map((m) => m[1].replace(/[。.]$/, '')).filter((t) => /[一-鿿]/.test(t)).slice(0, 3);
  return { desc, body: cleanBody, triggers };
}
const yq = (s) => `'${String(s).replace(/'/g, "''")}'`; // single-quoted YAML scalar
const block = (s, indent) => s.split('\n').map((l) => (l ? ' '.repeat(indent) + l : '')).join('\n');

for (const [name, icon, title] of SKILLS) {
  const { desc, body, triggers } = skillText(name);
  const system = `${body}\n\n（本应用基于开源技能库 PM Skills 的 ${name} 技能：https://github.com/mohitagw15856/pm-claude-skills ，MIT 协议。）`;
  const yml = `app:
  description: ${yq(desc.slice(0, 200))}
  icon: ${yq(icon)}
  icon_background: '#E4FBCC'
  mode: advanced-chat
  name: ${yq(`${title} · PM Skills`)}
kind: app
version: 0.1.0
workflow:
  features:
    file_upload:
      image:
        enabled: false
        number_limits: 3
        transfer_methods:
        - local_file
        - remote_url
    opening_statement: ${yq(`你好！我是${title}。把你的情况告诉我，我按资深从业者的方法帮你完成。`)}
    retriever_resource:
      enabled: false
    sensitive_word_avoidance:
      enabled: false
    speech_to_text:
      enabled: false
    suggested_questions:
${triggers.map((t) => `    - ${yq(t)}`).join('\n') || '    []'}
    suggested_questions_after_answer:
      enabled: false
    text_to_speech:
      enabled: false
      language: ''
      voice: ''
  graph:
    edges:
    - data:
        sourceType: start
        targetType: llm
      id: start-llm
      source: start
      sourceHandle: source
      target: llm
      targetHandle: target
      type: custom
    - data:
        sourceType: llm
        targetType: answer
      id: llm-answer
      source: llm
      sourceHandle: source
      target: answer
      targetHandle: target
      type: custom
    nodes:
    - data:
        desc: ''
        selected: false
        title: 开始
        type: start
        variables: []
      height: 54
      id: start
      position: {x: 80, y: 282}
      positionAbsolute: {x: 80, y: 282}
      selected: false
      sourcePosition: right
      targetPosition: left
      type: custom
      width: 244
    - data:
        context:
          enabled: false
          variable_selector: []
        desc: ${yq(`PM Skills: ${name}`)}
        memory:
          role_prefix:
            assistant: ''
            user: ''
          window:
            enabled: true
            size: 20
        model:
          completion_params:
            temperature: 0.3
          mode: chat
          name: deepseek-chat
          provider: deepseek
        prompt_template:
        - id: system
          role: system
          text: |-
${block(system, 12)}
        selected: false
        title: ${yq(title)}
        type: llm
        variables: []
        vision:
          enabled: false
      height: 98
      id: llm
      position: {x: 380, y: 282}
      positionAbsolute: {x: 380, y: 282}
      selected: false
      sourcePosition: right
      targetPosition: left
      type: custom
      width: 244
    - data:
        answer: '{{#llm.text#}}'
        desc: ''
        selected: false
        title: 直接回复
        type: answer
        variables: []
      height: 107
      id: answer
      position: {x: 680, y: 282}
      positionAbsolute: {x: 680, y: 282}
      selected: false
      sourcePosition: right
      targetPosition: left
      type: custom
      width: 244
    viewport: {x: 0, y: 0, zoom: 0.8}
`;
  writeFileSync(join(out, `${name}.yml`), yml);
}
writeFileSync(join(out, 'README.md'), `# Dify 应用模板 · Dify app templates

${SKILLS.length} 个可以直接导入 Dify 的应用，每个都把一个 PM Skills 技能作为系统提示词。Ready-to-import Dify apps, each with one PM Skills skill as its system prompt.

**导入 Import：** Dify 工作室 → 导入 DSL 文件 → 选择下面的 \`.yml\`。默认模型是 DeepSeek（\`deepseek-chat\`），导入后可以在 LLM 节点里换成通义千问、智谱、Kimi 等任何已配置的模型。
Studio → Import DSL file. The model defaults to DeepSeek; switch it in the LLM node after import.

| 应用 App | 技能 Skill |
|---|---|
${SKILLS.map(([n, i, t]) => `| ${i} [${t}](${n}.yml) | [\`${n}\`](../../skills/${n}/SKILL.md) |`).join('\n')}

想在一个应用里按需调用全部 1,235 个技能？用 [Dify 插件](../dify-plugin/)。Want every skill on demand in one app? Use the [Dify plugin](../dify-plugin/).

由 \`node scripts/build-dify-templates.mjs\` 生成，技能更新后重新运行即可。Generated by \`node scripts/build-dify-templates.mjs\`.
`);
console.log(`Wrote ${SKILLS.length} Dify templates to integrations/dify-templates/`);
