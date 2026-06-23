// Tiny dependency-free canvas force-directed graph — the shared engine behind the Skill
// Galaxy and the Brain Graph. Handles the physics (repulsion + link springs + anchor gravity),
// plus pan / zoom / node-drag / hover hit-testing, and hands drawing back to the caller so each
// graph can have its own look. No build step, no libraries.
(function (g) {
  'use strict';

  function create(canvas, opts) {
    var nodes = opts.nodes.slice();
    var idMap = {};
    nodes.forEach(function (n) { idMap[n.id] = n; });
    var links = (opts.links || []).filter(function (l) { return idMap[l.source] && idMap[l.target] && l.source !== l.target; });

    var REP = opts.repulsion || 1800, SPRING = opts.spring || 0.015, LEN = opts.linkLen || 60,
        GRAV = opts.gravity || 0.04, DAMP = opts.damping || 0.86, MAXV = 30;
    // Simulated-annealing cooldown: forces fade as `alpha` decays, so the layout eases into
    // place over ~a couple of seconds and then holds still. Interaction (drag/zoom) re-warms it.
    var alpha = 1, ALPHA_MIN = 0.004, ALPHA_DECAY = opts.alphaDecay || 0.022;
    function reheat(a) { alpha = Math.max(alpha, a == null ? 1 : a); }

    var ctx = canvas.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
    }
    resize();
    window.addEventListener('resize', resize);

    // Seed positions near each node's anchor (cluster center) if it has one, else the middle.
    nodes.forEach(function (n) {
      if (n.x == null) { n.x = (n.ax != null ? n.ax : W / 2) + (Math.random() - 0.5) * 240; }
      if (n.y == null) { n.y = (n.ay != null ? n.ay : H / 2) + (Math.random() - 0.5) * 240; }
      n.vx = 0; n.vy = 0;
    });

    var view = { x: 0, y: 0, k: 1 };
    var hover = null, dragNode = null, panning = false, px = 0, py = 0, moved = false;

    function tick() {
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 0.01, d = Math.sqrt(d2);
          var f = REP / d2 * alpha, fx = f * dx / d, fy = f * dy / d;
          a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
        }
      }
      links.forEach(function (l) {
        var a = idMap[l.source], b = idMap[l.target];
        var dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        var f = SPRING * (d - (l.len || LEN)) * alpha, fx = f * dx / d, fy = f * dy / d;
        a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
      });
      nodes.forEach(function (n) {
        var tx = (n.ax != null ? n.ax : W / 2), ty = (n.ay != null ? n.ay : H / 2);
        n.vx += (tx - n.x) * GRAV * alpha; n.vy += (ty - n.y) * GRAV * alpha;
        n.vx *= DAMP; n.vy *= DAMP;
        n.vx = Math.max(-MAXV, Math.min(MAXV, n.vx)); n.vy = Math.max(-MAXV, Math.min(MAXV, n.vy));
        if (n !== dragNode) { n.x += n.vx; n.y += n.vy; }
      });
      alpha *= (1 - ALPHA_DECAY); // cool down toward a stable layout
    }

    function draw() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(view.x, view.y);
      ctx.scale(view.k, view.k);
      links.forEach(function (l) { opts.drawLink(ctx, idMap[l.source], idMap[l.target], l, l === null); });
      nodes.forEach(function (n) { opts.drawNode(ctx, n, n === hover, view.k); });
      ctx.restore();
    }

    var raf;
    function loop() {
      if (alpha > ALPHA_MIN || dragNode) tick(); // frozen once cooled; drawing continues for pulse
      draw();
      raf = requestAnimationFrame(loop);
    }
    loop();

    function toWorld(cx, cy) {
      var r = canvas.getBoundingClientRect();
      return { x: (cx - r.left - view.x) / view.k, y: (cy - r.top - view.y) / view.k };
    }
    function nodeAt(cx, cy) {
      var w = toWorld(cx, cy), best = null, bd = Infinity;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i], dx = n.x - w.x, dy = n.y - w.y, d = Math.sqrt(dx * dx + dy * dy);
        var r = (n.r || 6) + 4;
        if (d < r && d < bd) { bd = d; best = n; }
      }
      return best;
    }

    canvas.addEventListener('mousedown', function (e) {
      moved = false; px = e.clientX; py = e.clientY;
      var n = nodeAt(e.clientX, e.clientY);
      if (n) { dragNode = n; reheat(0.4); } else { panning = true; }
    });
    window.addEventListener('mousemove', function (e) {
      if (dragNode) {
        var w = toWorld(e.clientX, e.clientY); dragNode.x = w.x; dragNode.y = w.y; dragNode.vx = dragNode.vy = 0; moved = true; reheat(0.3);
      } else if (panning) {
        view.x += e.clientX - px; view.y += e.clientY - py; px = e.clientX; py = e.clientY; moved = true;
      } else {
        var rect = canvas.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          var h = nodeAt(e.clientX, e.clientY);
          if (h !== hover) { hover = h; canvas.style.cursor = h ? 'pointer' : 'grab'; if (opts.onHover) opts.onHover(h, e.clientX, e.clientY); }
          else if (h && opts.onHover) opts.onHover(h, e.clientX, e.clientY);
        }
      }
    });
    window.addEventListener('mouseup', function (e) {
      if (dragNode && !moved && opts.onClick) opts.onClick(dragNode);
      else if (panning && !moved) { /* background click */ }
      dragNode = null; panning = false;
    });
    canvas.addEventListener('wheel', function (e) {
      e.preventDefault();
      var r = canvas.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
      var k0 = view.k, k1 = Math.max(0.25, Math.min(4, k0 * (e.deltaY < 0 ? 1.12 : 0.89)));
      view.x = mx - (mx - view.x) * (k1 / k0); view.y = my - (my - view.y) * (k1 / k0); view.k = k1;
    }, { passive: false });
    canvas.style.cursor = 'grab';

    return {
      nodes: nodes, links: links, idMap: idMap,
      setData: function (nn, ll) {
        nodes = nn.slice(); idMap = {}; nodes.forEach(function (n) { idMap[n.id] = n; });
        links = (ll || []).filter(function (l) { return idMap[l.source] && idMap[l.target] && l.source !== l.target; });
        nodes.forEach(function (n) {
          if (n.x == null) n.x = (n.ax != null ? n.ax : W / 2) + (Math.random() - 0.5) * 200;
          if (n.y == null) n.y = (n.ay != null ? n.ay : H / 2) + (Math.random() - 0.5) * 200;
          n.vx = n.vx || 0; n.vy = n.vy || 0;
        });
        reheat(1);
      },
      reheat: function () { reheat(1); },
      fit: function () { view = { x: 0, y: 0, k: 1 }; },
      stop: function () { cancelAnimationFrame(raf); },
    };
  }

  g.PMGraph = { create: create };
})(window);
