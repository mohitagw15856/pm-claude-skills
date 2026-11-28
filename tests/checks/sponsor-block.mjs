#!/usr/bin/env node
// The README sponsor banner generator: replacing, removing and first placement of the
// block, and that a hostile value in sponsors.json cannot break out of its attribute.
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { render, apply, current, validate } = await import(pathToFileURL(join(root, 'scripts', 'build-sponsor-block.mjs')).href);
let pass = 0; let fail = 0;
const ok = (label, cond, detail = '') => { if (cond) pass++; else { fail++; console.error(`  ✗ ${label} ${detail}`); } };

const mk = (name, extra = {}) => ({ name, placement: 'readme-banner', banner: { href: `https://${name}.example/?a=1&b=2`, light: 'assets/sponsors/focusee-light.png', dark: 'assets/sponsors/focusee-dark.png', alt: `${name}: tagline`, width: 830 }, ...extra });
const a = render(mk('alpha')); const b = render(mk('beta'));
const doc = `<sub>langs</sub>\n\n# Title\n\n${a}\n<p align="center"><sub>next line</sub></p>\n\n> intro\n`;

ok('the link keeps its own ampersands', a.includes('href="https://alpha.example/?a=1&b=2"'));
ok('replacing swaps only the banner', apply(doc, b) === doc.replace(a, b));
ok('applying the same sponsor changes nothing', apply(doc, a) === doc);
ok('removing leaves the neighbours intact', apply(doc, '') === `<sub>langs</sub>\n\n# Title\n\n<p align="center"><sub>next line</sub></p>\n\n> intro\n`, JSON.stringify(apply(doc, '')));
ok('first placement goes under the title', apply('# Title\n\n> intro\n', a) === `# Title\n\n${a}\n\n> intro\n`);
ok('no sponsor and no banner is a no-op', apply('# Title\n\n> intro\n', '') === '# Title\n\n> intro\n');
ok('only the banner placement counts', current([{ name: 'x', placement: 'site' }, mk('alpha')]).name === 'alpha' && current([{ name: 'x', placement: 'site' }]) === null);
const hostile = render(mk('h', { banner: { href: 'https://h.example/"><script>alert(1)</script>', light: 'assets/sponsors/focusee-light.png', dark: 'assets/sponsors/focusee-dark.png', alt: 'a" onerror="x', width: 830 } }));
ok('a quote in the link or alt text cannot close the attribute', !hostile.includes('"><script>') && !hostile.includes('" onerror="') && hostile.includes('alt="a&quot; onerror=&quot;x"'));
ok('a real sponsor passes validation', validate(mk('alpha')).length === 0, validate(mk('alpha')).join('; '));
ok('bad fields are reported', validate({ name: 'z', banner: { href: 'http://z', light: '../x.png', dark: 'assets/sponsors/none.png', alt: ' ', width: 5000 }, until: 'soon' }).length === 6);

console.log(`sponsor block: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
