// Render ```mermaid code blocks (produced by any skill) into real diagrams, with SVG + PNG export.
// marked turns a fenced ```mermaid block into <pre><code class="language-mermaid">…</code></pre>;
// enhance() finds those, renders each to SVG via mermaid (lazy-loaded from CDN), and wraps it with a
// small download toolbar. Pure client-side; no backend. Exposes window.PMDiagrams.
(function (g) {
  'use strict';
  var MERMAID_SRC = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
  var loading = null;
  var seq = 0;

  function loadMermaid() {
    if (g.mermaid) return Promise.resolve(g.mermaid);
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = MERMAID_SRC; s.async = true;
      s.onload = function () {
        try {
          // Dark theme to match the playground; loose security so labels with quotes render.
          g.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose',
            themeVariables: { fontFamily: 'inherit', primaryColor: '#1b2030', primaryTextColor: '#e8eaf0',
              primaryBorderColor: '#d97757', lineColor: '#7a8290', secondaryColor: '#23293a', tertiaryColor: '#23293a' } });
        } catch (e) {}
        resolve(g.mermaid);
      };
      s.onerror = function () { reject(new Error('Could not load the diagram library.')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  function svgToPng(svgEl, filename) {
    var xml = new XMLSerializer().serializeToString(svgEl);
    var vb = svgEl.viewBox && svgEl.viewBox.baseVal;
    var w = (vb && vb.width) || svgEl.clientWidth || 1200;
    var h = (vb && vb.height) || svgEl.clientHeight || 800;
    var scale = 2;
    var img = new Image();
    img.onload = function () {
      var c = document.createElement('canvas');
      c.width = w * scale; c.height = h * scale;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#0d0f14'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      var a = document.createElement('a');
      a.href = c.toDataURL('image/png'); a.download = filename; a.click();
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  }

  function download(text, type, filename) {
    var b = new Blob([text], { type: type });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = filename; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function toolbar(svgEl, base) {
    var bar = document.createElement('div');
    bar.className = 'diagram-tools';
    var png = document.createElement('button');
    png.type = 'button'; png.className = 'ghost'; png.textContent = '🖼️ PNG';
    png.title = 'Download this diagram as a PNG image';
    png.addEventListener('click', function () { svgToPng(svgEl, base + '.png'); });
    var svg = document.createElement('button');
    svg.type = 'button'; svg.className = 'ghost'; svg.textContent = '</> SVG';
    svg.title = 'Download this diagram as an SVG vector file';
    svg.addEventListener('click', function () {
      download(new XMLSerializer().serializeToString(svgEl), 'image/svg+xml', base + '.svg');
    });
    bar.appendChild(png); bar.appendChild(svg);
    return bar;
  }

  // Find rendered ```mermaid blocks under root and turn each into a diagram. Safe to call repeatedly:
  // already-processed blocks are marked. On a render error the original code is left visible.
  function enhance(root, baseName) {
    if (!root) return;
    var blocks = [].slice.call(root.querySelectorAll('code.language-mermaid'))
      .map(function (c) { return c.closest('pre') || c; })
      .filter(function (pre) { return pre && !pre.dataset.mermaidDone; });
    if (!blocks.length) return;
    var base = baseName || 'diagram';
    loadMermaid().then(function (mermaid) {
      blocks.forEach(function (pre) {
        if (pre.dataset.mermaidDone) return;
        pre.dataset.mermaidDone = '1';
        var code = pre.querySelector('code');
        var src = (code ? code.textContent : pre.textContent) || '';
        var id = 'mmd-' + (++seq);
        mermaid.render(id, src).then(function (res) {
          var fig = document.createElement('figure');
          fig.className = 'diagram';
          fig.innerHTML = res.svg;
          var svgEl = fig.querySelector('svg');
          if (svgEl) { svgEl.removeAttribute('height'); svgEl.style.maxWidth = '100%'; fig.appendChild(toolbar(svgEl, base)); }
          pre.replaceWith(fig);
        }).catch(function () {
          // Leave the raw code visible with a gentle hint; don't blow up the whole output.
          pre.dataset.mermaidDone = 'err';
          var hint = document.createElement('div');
          hint.className = 'diagram-err';
          hint.textContent = '⚠ Could not render this diagram — showing the source.';
          pre.parentNode.insertBefore(hint, pre);
        });
      });
    }).catch(function () { /* mermaid CDN unreachable — leave code blocks as-is */ });
  }

  g.PMDiagrams = { enhance: enhance, load: loadMermaid };
})(window);
