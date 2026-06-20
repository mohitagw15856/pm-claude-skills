// Single source of truth for the tools navigation bar, shared by every page
// (static + generated). To add/rename a tool, edit TOOLS here only.
// Each page just needs: <nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
// and <script src="nav.js"></script>.
(function () {
  var TOOLS = [
    ['index.html', '▶ Playground'],
    ['canvas.html', '🧩 Workflow Canvas'],
    ['agent.html', '✨ Auto-Agent'],
    ['studio.html', '🏗️ Create a skill'],
    ['grade.html', '📝 Grade your work'],
    ['examples.html', '📄 Sample outputs'],
    ['benchmark.html', '🏆 Benchmark'],
    ['community.html', '💬 Community'],
    ['leaderboard.html', '📊 Leaderboard'],
    ['catalog.html', '📚 Catalog'],
    ['pro.html', '⭐ Pro'],
  ];
  var nav = document.getElementById('toolbar');
  if (!nav) return;
  var file = (location.pathname.split('/').pop() || 'index.html');
  if (file === '' || file === '/') file = 'index.html';
  nav.innerHTML = TOOLS.map(function (t) {
    var active = t[0] === file ? ' active' : '';
    return '<a class="tool' + active + '" href="' + t[0] + '">' + t[1] + '</a>';
  }).join('');
})();
