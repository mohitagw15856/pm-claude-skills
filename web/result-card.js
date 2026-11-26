// Shareable result cards: a 1200 x 630 PNG (the link-preview shape for X,
// LinkedIn and Slack) of a graded result, drawn in the browser. Nothing is
// uploaded. PMResultCard.open({ skill, title, score, of, date, link }) shows
// the card in a dialog with Download and Copy link. Used by grade.html.
(function () {
  const W = 1200, H = 630;
  const SANS = '-apple-system, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
  const SITE = 'mohitagw15856.github.io/pm-claude-skills';

  // Wrap on spaces, and between CJK characters, into at most max lines.
  function wrap(g, text, maxW, max) {
    const parts = String(text).match(/[　-鿿＀-￯]|[^\s　-鿿＀-￯]+|\s+/g) || [];
    const lines = []; let line = '';
    for (const p of parts) {
      const next = line + p;
      if (g.measureText(next).width > maxW && line.trim()) { lines.push(line.trim()); line = p.trimStart(); } else line = next;
    }
    if (line.trim()) lines.push(line.trim());
    if (lines.length <= max) return lines;
    const cut = lines.slice(0, max); let last = cut[max - 1];
    while (last.length && g.measureText(last + '…').width > maxW) last = last.slice(0, -1);
    cut[max - 1] = last + '…'; return cut;
  }

  function draw(canvas, r) {
    canvas.width = W; canvas.height = H;
    const g = canvas.getContext('2d');
    const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#14171f'); bg.addColorStop(1, '#2a1c17');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.fillStyle = '#d97757'; g.fillRect(0, 0, 14, H);
    g.textBaseline = 'alphabetic';
    g.fillStyle = '#e3b341'; g.font = `600 30px ${SANS}`; g.fillText('PM Skills · graded result', 80, 104);

    // Title: largest size from 72px down that fits two lines beside the score ring.
    const maxW = 640; let px = 72, lines;
    for (; px >= 40; px -= 4) { g.font = `800 ${px}px ${SANS}`; lines = wrap(g, r.title, maxW, 99); if (lines.length <= 2) break; }
    g.font = `800 ${px}px ${SANS}`; lines = wrap(g, r.title, maxW, 2);
    g.fillStyle = '#f4efe8'; let y = 200 + px * 0.4;
    for (const l of lines) { g.fillText(l, 80, y); y += px * 1.15; }

    g.fillStyle = '#a8a29a'; g.font = `400 28px ${SANS}`;
    g.fillText(`Graded against the ${r.of === 100 ? 'viral-reach' : 'skill'} rubric · ${r.date}`, 80, 470);
    g.fillStyle = '#7d776f'; g.font = `400 22px ${SANS}`;
    g.fillText('An AI grade of a draft, self-reported by its author.', 80, 510);
    g.fillStyle = '#f4efe8'; g.font = `600 26px ${SANS}`; g.fillText(`${SITE}/grade.html`, 80, 572);

    // Score ring.
    const cx = 960, cy = 300, rad = 150, frac = Math.max(0, Math.min(1, r.score / r.of));
    g.lineCap = 'round'; g.lineWidth = 26;
    g.strokeStyle = 'rgba(255,255,255,0.1)'; g.beginPath(); g.arc(cx, cy, rad, 0, Math.PI * 2); g.stroke();
    const ring = g.createLinearGradient(cx - rad, cy, cx + rad, cy); ring.addColorStop(0, '#d97757'); ring.addColorStop(1, '#e3b341');
    g.strokeStyle = ring; g.beginPath(); g.arc(cx, cy, rad, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2); g.stroke();
    g.textAlign = 'center';
    g.fillStyle = '#f4efe8'; g.font = `800 96px ${SANS}`; g.fillText(r.of === 100 ? String(Math.round(r.score)) : r.score.toFixed(1), cx, cy + 30);
    g.fillStyle = '#a8a29a'; g.font = `500 30px ${SANS}`; g.fillText(`out of ${r.of}`, cx, cy + 78);
    g.textAlign = 'left';
  }

  // Find the headline score in a grade written by the model.
  function parseScore(text, of) {
    const t = String(text || '');
    if (of === 100) { const m = t.match(/Viral Score[^0-9]{0,12}(\d{1,3})\s*\/\s*100/i); return m ? Math.min(100, +m[1]) : null; }
    const m = t.match(/overall[^0-9\n]{0,40}(\d(?:\.\d{1,2})?)\s*\/\s*5/i) || t.match(/(\d(?:\.\d{1,2})?)\s*\/\s*5\b(?![\s\S]*\d(?:\.\d{1,2})?\s*\/\s*5\b)/);
    const v = m ? +m[1] : NaN;
    return v >= 0 && v <= 5 ? v : null;
  }

  // Read a shared result back from URL parameters; null when anything is off.
  function fromParams(params, knownSkill) {
    const of = +params.get('of'), score = +params.get('score'), date = params.get('date') || '', skill = params.get('skill') || '';
    if (!(of === 5 || of === 100) || !Number.isFinite(score) || score < 0 || score > of) return null;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !knownSkill(skill)) return null;
    return { skill, score, of, date };
  }

  function shareUrl(r) {
    const u = new URL(location.href.split('?')[0].split('#')[0]);
    u.searchParams.set('skill', r.skill); u.searchParams.set('score', String(r.score));
    u.searchParams.set('of', String(r.of)); u.searchParams.set('date', r.date);
    return u.toString();
  }

  let dlg;
  function open(r) {
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.className = 'rc-dialog';
      dlg.setAttribute('aria-label', 'Share your result');
      dlg.innerHTML = '<canvas class="rc-canvas" role="img"></canvas>'
        + '<div class="rc-actions"><button type="button" class="primary" data-act="png">Download PNG</button>'
        + '<button type="button" class="ghost" data-act="link">Copy link</button>'
        + '<button type="button" class="ghost" data-act="close">Close</button><span class="status" aria-live="polite"></span></div>';
      const css = document.createElement('style');
      css.textContent = '.rc-dialog{max-width:min(860px,94vw);width:100%;border:1px solid var(--border);border-radius:14px;background:var(--panel);color:var(--text);padding:14px;box-sizing:border-box}'
        + '.rc-dialog::backdrop{background:rgba(0,0,0,.6)}.rc-canvas{width:100%;height:auto;aspect-ratio:1200/630;display:block;border-radius:10px}'
        + '.rc-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px}';
      document.head.append(css);
      document.body.append(dlg);
      dlg.addEventListener('click', (e) => {
        const act = e.target.dataset && e.target.dataset.act; const st = dlg.querySelector('.status');
        if (act === 'close') dlg.close();
        if (act === 'link') navigator.clipboard.writeText(dlg.dataset.url).then(() => { st.textContent = 'Link copied.'; }, () => { st.textContent = dlg.dataset.url; });
        if (act === 'png') {
          const a = document.createElement('a'); a.download = `${dlg.dataset.skill}-result.png`;
          a.href = dlg.querySelector('canvas').toDataURL('image/png'); a.click();
        }
      });
    }
    const c = dlg.querySelector('canvas');
    draw(c, r);
    c.setAttribute('aria-label', `${r.title}: ${r.score} out of ${r.of}`);
    dlg.dataset.url = shareUrl(r); dlg.dataset.skill = r.skill;
    dlg.querySelector('.status').textContent = '';
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }

  window.PMResultCard = { open, draw, parseScore, fromParams, shareUrl };
})();
