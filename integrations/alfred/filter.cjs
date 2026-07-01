#!/usr/bin/env node
// Alfred Script Filter for PM Skills.
// Fetches the live catalog and emits Alfred's Script Filter JSON.
// Invoked by Alfred as:  node filter.js "{query}"
const https = require("https");

const CATALOG = "https://mohitagw15856.github.io/pm-claude-skills/skills.json";
const PLAYGROUND = "https://mohitagw15856.github.io/pm-claude-skills";

const query = (process.argv[2] || "").trim().toLowerCase();
const terms = query.split(/\s+/).filter(Boolean);

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(get(res.headers.location));
        }
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

(async () => {
  let skills = [];
  try {
    const raw = JSON.parse(await get(CATALOG));
    skills = Array.isArray(raw) ? raw : raw.skills || [];
  } catch (e) {
    return console.log(
      JSON.stringify({
        items: [{ title: "Could not load catalog", subtitle: String((e && e.message) || e), valid: false }],
      })
    );
  }

  let matches = skills;
  if (terms.length) {
    matches = skills
      .map((s) => {
        const name = (s.name || "").toLowerCase();
        const hay = `${name} ${(s.description || "").toLowerCase()} ${(s.plugin || "").toLowerCase()}`;
        let score = 0;
        for (const t of terms) {
          if (!hay.includes(t)) return null;
          score += name.includes(t) ? 2 : 1;
        }
        return { s, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.s.name.localeCompare(b.s.name))
      .map((m) => m.s);
  }

  const items = matches.slice(0, 25).map((s) => {
    const url = `${PLAYGROUND}/?skill=${s.name}`;
    return {
      uid: s.name,
      title: s.title || s.name,
      subtitle: s.summary || s.description || "",
      arg: url,
      autocomplete: s.name,
      mods: {
        cmd: { arg: `npx pm-claude-skills run ${s.name} --text "…"`, subtitle: "Copy run command" },
        alt: { arg: s.name, subtitle: "Copy skill name" },
      },
      text: { copy: url, largetype: `${s.title || s.name}\n\n${s.description || ""}` },
    };
  });

  if (!items.length) {
    items.push({ title: "No skills match", subtitle: "Try a broader term", arg: PLAYGROUND });
  }
  console.log(JSON.stringify({ items }));
})();
