<!--
  Capture and demo snippets for README.md (Stream C). Paste each block where its comment says.
  Assets are rebuilt by the scripts in scripts/capture/ (see the header of each):
    node scripts/capture/build-svgs.mjs                 before-after*.svg, listen-banner*.svg (no dependencies)
    NODE_PATH=<node_modules with playwright> node scripts/capture/record-search.mjs      search-demo*.webp
    NODE_PATH=... node scripts/capture/record-tech-tree.mjs                               tech-tree-tour.webp
    NODE_PATH=... node scripts/capture/capture-city.mjs                                   city.webp
  The WebP encoders need libwebp (brew install webp). The city capture needs network for three.js.
-->

<!-- ═══ 1. BEFORE AND AFTER ═══ Insert directly under "## 🥊 Without a skill vs. with one", above the existing table. -->

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/before-after.svg">
    <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/before-after-light.svg">
    <img src="docs/readme-assets/before-after.svg" width="100%" alt="Animated before and after: the same request answered by a generic AI and by a skill. A lease gets vague advice on the left and ranked clauses with real money on the right; a PRD request gets platitudes versus a problem, metrics and user stories; a Chinese weekly report gets filler versus results, risks and a dated plan." />
  </picture>
</p>

<!-- ═══ 2. SEE IT: TECH TREE TOUR ═══ In "## ▶ See it", replace the tech-tree.jpg <img> line (first row, second cell) with this line. The link stays the same. -->

<a href="https://mohitagw15856.github.io/pm-claude-skills/tech-tree/"><img src="docs/readme-assets/tech-tree-tour.webp" width="100%" alt="A zoom and pan through the tech tree: the whole library as branches of skill nodes, then close up on the research queue and branch after branch of skills" /></a>

<!-- ═══ 3. SEE IT: SEARCH AND CITY ═══ In "## ▶ See it", paste this row directly before the closing </table>. -->

<tr>
<td width="50%" align="center">
<a href="https://mohitagw15856.github.io/pm-claude-skills/find.html"><img src="docs/readme-assets/search-demo.webp" width="100%" alt="Typing weekly report into the skill finder: the ranked matches appear as you type, Chinese Weekly Report first" /></a>
<br /><sub><b>🔎 <a href="https://mohitagw15856.github.io/pm-claude-skills/find.html">Find a skill</a></b>: describe the task in plain words, English or Chinese. Runs in your browser.</sub>
</td>
<td width="50%" align="center">
<a href="https://mohitagw15856.github.io/pm-claude-skills/city.html"><img src="docs/readme-assets/city.webp" width="100%" alt="Skill City at dusk: every skill a building, grouped in districts, with windows lit in the skills you have used" /></a>
<br /><sub><b>🏙 <a href="https://mohitagw15856.github.io/pm-claude-skills/city.html">Skill City</a></b>: every skill a building. The windows light up as you use them.</sub>
</td>
</tr>

<!-- ═══ 4. LISTEN BANNER ═══ In "## 🇨🇳 中文支持 · Chinese support", insert directly after the "国内镜像：" line at the end of the section. -->

<p align="center">
  <a href="https://mohitagw15856.github.io/pm-claude-skills/listen.html">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/readme-assets/listen-banner.svg">
      <source media="(prefers-color-scheme: light)" srcset="docs/readme-assets/listen-banner-light.svg">
      <img src="docs/readme-assets/listen-banner.svg" width="460" alt="▶ 听一听: hear four Mandarin demo exchanges (weekly report, severance, civil service essay, Xiaohongshu) read aloud in your browser" />
    </picture>
  </a>
  <br /><sub>GitHub cannot play audio in a README, so this opens a page that reads the demos aloud with your browser's own Mandarin voice.</sub>
</p>
