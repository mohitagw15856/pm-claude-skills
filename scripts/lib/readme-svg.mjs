// Shared theme for the README images that are generated from repo data (the
// trust scorecard, the bundle grid), so they match the static ones drawn by
// scripts/build-readme-visuals.py: GitHub's dark and light palettes.
export const THEMES = {
  dark: { bg: '#0d1117', panel: '#161b22', panel2: '#1c2330', border: '#30363d', text: '#e6edf3', muted: '#8b949e', purple: '#d2a8ff', green: '#3fb950', red: '#f85149', blue: '#58a6ff', amber: '#d29922', soft: '#21262d' },
  light: { bg: '#ffffff', panel: '#f6f8fa', panel2: '#eef1f5', border: '#d0d7de', text: '#1f2328', muted: '#656d76', purple: '#8250df', green: '#1a7f37', red: '#cf222e', blue: '#0969da', amber: '#9a6700', soft: '#eaeef2' },
};
export const FONT = 'font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif"';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// draw(theme) returns the SVG for one palette; both files are written next to each other.
export const both = (name, draw) => ({ [`docs/readme-assets/${name}.svg`]: draw(THEMES.dark) + '\n', [`docs/readme-assets/${name}-light.svg`]: draw(THEMES.light) + '\n' });
