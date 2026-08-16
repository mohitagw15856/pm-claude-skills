#!/usr/bin/env node
// A generated face for each of the eight personas.
//
// They were emoji (📦 🚀 🛠️), which is fine but reads as a list rather than a
// cast. These are deterministic from the persona id — the same face forever,
// no asset to host, nothing to redraw when a persona is renamed.
//
// notugly's archetypes map onto these roles closely enough to be funny: the
// Engineering Lead gets the Ship-It, the Compliance Lead gets the Skeptic.
//
// Run:  node scripts/build-persona-faces.mjs
// Output is committed, so the Pages build stays Node-only with no extra step.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'web', 'personas');

// notugly is a devDependency-free peer: resolve it if present, otherwise say so
// rather than failing the whole build for a decorative asset.
let notugly;
try {
  notugly = {
    avatar: (await import('notugly/avatar')).avatar,
    persona: (await import('notugly/persona')).persona,
  };
} catch {
  console.error('notugly is not installed — run `npm i -D notugly` first.');
  console.error('Skipping persona faces; the emoji fallback still works.');
  process.exit(0);
}

// Which notugly archetype fits which role. Chosen for the joke as much as the fit.
const CAST = {
  'product-manager': { archetype: 'mentor', style: 'specs' },
  'founder-exec': { archetype: 'shipper', style: 'face' },
  'engineering-lead': { archetype: 'shipper', style: 'monster' },
  'ai-engineer': { archetype: 'overthinker', style: 'specs' },
  'customer-success': { archetype: 'mentor', style: 'dog' },
  'growth-marketing': { archetype: 'enthusiast', style: 'sticker' },
  'compliance-lead': { archetype: 'skeptic', style: 'cat' },
  designer: { archetype: 'perfectionist', style: 'line' },
};

const { personas } = JSON.parse(readFileSync(join(root, 'web', 'personas.json'), 'utf8'));
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// The site background these will sit on. Passing it means notugly adds a
// separating ring only when the avatar would otherwise dissolve into the page.
const PAGE = process.env.PERSONA_BG || '#0f1115';

let written = 0;
const missing = [];
for (const p of personas) {
  const cast = CAST[p.id];
  if (!cast) {
    missing.push(p.id);
    continue;
  }
  const svg = notugly.avatar(`pm-skills:${p.id}`, {
    style: cast.style,
    size: 160,
    on: PAGE,
    label: p.name,
  });
  writeFileSync(join(outDir, `${p.id}.svg`), svg);
  written++;
}

console.log(`Persona faces — ${written} written to web/personas/`);
if (missing.length) {
  // Loud, because a new persona silently getting no face is exactly the kind of
  // thing that is noticed six months later by a user, not by us.
  console.log(`  ⚠ no cast entry for: ${missing.join(', ')} — add one to scripts/build-persona-faces.mjs`);
}
