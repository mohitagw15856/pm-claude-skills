// Proof-carrying outputs (moonshot #2). Appends a verifiable provenance card to
// a generated artifact: which skill + model + inputs produced it, its eval score,
// a timestamp, and a SHA-256 content fingerprint. Anyone can re-hash the artifact
// to confirm it wasn't altered. Exposes window.PMProvenance. No dependencies.
(function (g) {
  'use strict';

  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Build a provenance block for one artifact. Returns { markdown, fingerprint }.
  async function build(meta) {
    const skill = meta.skill || 'unknown-skill';
    const model = meta.model || 'unknown-model';
    const output = meta.output || '';
    const inputs = meta.inputs || '';
    const when = new Date().toISOString();
    const evalScore = meta.evalScore != null ? `${meta.evalScore}/5` : 'unscored';

    const inputsHash = (await sha256(inputs)).slice(0, 16);
    // The fingerprint binds everything that produced this artifact, so any later
    // edit to the output (or a claim about its origin) changes the hash.
    const fingerprint = await sha256([skill, model, when, inputsHash, output].join('\n'));

    const markdown =
      `\n\n---\n### 🔏 Provenance\n` +
      `| | |\n|---|---|\n` +
      `| **Skill** | \`${skill}\`${meta.evalScore != null ? ` · ✅ ${evalScore}` : ''} |\n` +
      `| **Model** | \`${model}\` |\n` +
      `| **Generated** | ${when} |\n` +
      `| **Inputs hash** | \`${inputsHash}\` |\n` +
      `| **Fingerprint** | \`${fingerprint.slice(0, 32)}…\` |\n` +
      `\n> Verify: re-hash \`skill⏎model⏎timestamp⏎inputs-hash⏎output\` with SHA-256 — it must match the fingerprint. Made with [PM Skills](https://mohitagw15856.github.io/pm-claude-skills/?skill=${encodeURIComponent(skill)}).\n`;

    return { markdown, fingerprint, when, inputsHash };
  }

  g.PMProvenance = { build, sha256 };
})(window);
