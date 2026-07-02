// Client-side document export — turn a skill's markdown output into a real deliverable:
// Word (.doc), PDF (print), PowerPoint (.pptx), or Excel (.xlsx). No backend; pptx/xlsx
// libs load lazily from CDN only when used. Exposes window.PMExport.
(function (g) {
  'use strict';

  function safeName(t) { return (t || 'pm-skills-output').replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'output'; }
  function saveBlob(blob, filename) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[data-x="' + src + '"]')) return resolve();
      var s = document.createElement('script');
      s.src = src; s.async = true; s.setAttribute('data-x', src);
      s.onload = resolve; s.onerror = function () { reject(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  }
  // marked + DOMPurify are already on every tool page.
  function mdToHtml(md) { return DOMPurify.sanitize(marked.parse(md || '')); }

  // --- Word (.doc via Office-HTML, opens cleanly in Word/Pages/Docs) ----------
  function toWord(md, title) {
    var body = mdToHtml(md);
    var html = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + (title || 'Document') + "</title>" +
      "<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5} h1{font-size:20pt} h2{font-size:15pt} h3{font-size:13pt} table{border-collapse:collapse} td,th{border:1px solid #999;padding:4pt 8pt} code{font-family:Consolas,monospace}</style></head><body>" +
      body + "</body></html>";
    saveBlob(new Blob(['﻿', html], { type: 'application/msword' }), safeName(title) + '.doc');
  }

  // --- PDF design system ("good content deserves good paper") ------------------
  // Each theme is a small set of constraints (canvas, ink, accent, type, spacing) so the
  // SAME markdown comes out professionally typeset. Themes are intentionally few and opinionated.
  var THEMES = {
    plain: {
      label: 'Plain', canvas: '#ffffff', ink: '#111111', accent: '#444444', muted: '#555555', rule: '#cccccc',
      serif: false, body: '14px/1.65 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
    },
    paper: { // Kami-inspired: warm parchment + ink-blue accent + serif
      label: 'Paper (serif)', canvas: '#f5f4ed', ink: '#1a1a1a', accent: '#1B365D', muted: '#5a5a52', rule: '#d8d5c8',
      serif: true, body: "15px/1.5 Charter,'Iowan Old Style',Georgia,'Times New Roman',serif",
    },
    modern: { // clean sans, single accent, generous white space
      canvas: '#ffffff', label: 'Modern (sans)', ink: '#111418', accent: '#d9605a', muted: '#5b626b', rule: '#e6e6e6',
      serif: false, body: "15px/1.6 'Inter',-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    },
    mono: { // technical / dossier look
      label: 'Technical', canvas: '#fbfbfa', ink: '#16181d', accent: '#0b6b5b', muted: '#5b626b', rule: '#e3e3df',
      serif: false, body: "14px/1.6 'IBM Plex Sans',-apple-system,Segoe UI,Roboto,Arial,sans-serif",
    },
  };

  function themeCSS(t, accentOverride) {
    var accent = accentOverride || t.accent;
    return (
      '@page{margin:18mm 16mm}' +
      '*{box-sizing:border-box}' +
      'body{font:' + t.body + ';color:' + t.ink + ';background:' + t.canvas + ';max-width:760px;margin:36px auto;padding:0 30px}' +
      'h1,h2,h3,h4{line-height:1.2;color:' + t.ink + ';margin:1.25em 0 .35em;' + (t.serif ? '' : 'letter-spacing:-.01em;') + 'font-weight:700}' +
      'h1{font-size:2em;margin-top:0;border-bottom:2px solid ' + accent + ';padding-bottom:.2em;color:' + accent + '}' +
      'h2{font-size:1.4em;border-bottom:1px solid ' + t.rule + ';padding-bottom:.15em}' +
      'h3{font-size:1.15em}' +
      'p,li{color:' + t.ink + '}' +
      'a{color:' + accent + ';text-decoration:none}' +
      'strong{color:' + t.ink + '}' +
      'table{border-collapse:collapse;width:100%;margin:14px 0;font-size:.95em}' +
      'th,td{border:1px solid ' + t.rule + ';padding:7px 11px;text-align:left;vertical-align:top}' +
      'th{background:' + accent + ';color:#fff;font-weight:600;border-color:' + accent + '}' +
      'tr:nth-child(even) td{background:rgba(0,0,0,.025)}' +
      'code{background:rgba(0,0,0,.05);padding:1px 5px;border-radius:4px;font-family:"IBM Plex Mono",Consolas,monospace;font-size:.9em}' +
      'pre{background:rgba(0,0,0,.04);padding:13px 15px;border-radius:8px;overflow:auto;border:1px solid ' + t.rule + '}' +
      'pre code{background:none;padding:0}' +
      'blockquote{border-left:3px solid ' + accent + ';margin:1em 0;padding:.1em 0 .1em 16px;color:' + t.muted + '}' +
      'hr{border:0;border-top:1px solid ' + t.rule + ';margin:1.6em 0}' +
      'ul,ol{padding-left:1.3em}li{margin:.2em 0}' +
      '.pm-foot{margin-top:34px;padding-top:10px;border-top:1px solid ' + t.rule + ';font-size:11px;color:' + t.muted + ';' + (t.serif ? '' : 'letter-spacing:.02em;') + '}' +
      '@media print{body{margin:0;max-width:none}a{color:' + accent + '}tr:nth-child(even) td{-webkit-print-color-adjust:exact;print-color-adjust:exact}th{-webkit-print-color-adjust:exact;print-color-adjust:exact}}'
    );
  }

  // opts: { theme: 'paper'|'modern'|'mono'|'plain', accent: '#hex' (brand override) }
  function toPDF(md, title, opts) {
    opts = opts || {};
    var t = THEMES[opts.theme] || THEMES.plain;
    var w = window.open('', '_blank');
    if (!w) { alert('Allow pop-ups to export as PDF.'); return; }
    var foot = '<div class="pm-foot">Made with PM Skills · mohitagw15856.github.io/pm-claude-skills</div>';
    w.document.write('<html><head><meta charset="utf-8"><title>' + (title || 'Document') + '</title>' +
      '<style>' + themeCSS(t, opts.accent) + '</style></head><body>' +
      mdToHtml(md) + foot +
      '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},250);}</scr' + 'ipt></body></html>');
    w.document.close();
  }

  // --- PowerPoint (.pptx) — headings become slides, bullets become content -----
  function mdToSlides(md, title) {
    var lines = (md || '').split('\n'), slides = [], cur = null;
    function push() { if (cur) slides.push(cur); }
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i].trim();
      var h = ln.match(/^(#{1,3})\s+(.*)/);
      if (h) { push(); cur = { title: clean(h[2]), bullets: [] }; continue; }
      if (!cur) cur = { title: title || 'Overview', bullets: [] };
      var b = ln.match(/^[-*+]\s+(.*)/) || ln.match(/^\d+[.)]\s+(.*)/);
      if (b) cur.bullets.push(clean(b[1]));
      else if (ln && !ln.startsWith('|') && !ln.startsWith('```') && !/^[-=|]{3,}$/.test(ln)) cur.bullets.push(clean(ln));
    }
    push();
    return slides.filter(function (s) { return s.title || s.bullets.length; });
  }
  function clean(s) { return s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1').trim(); }

  async function toPptx(md, title) {
    await loadScript('https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js');
    var pptx = new g.PptxGenJS();
    pptx.defineLayout && pptx.layout && (pptx.layout = 'LAYOUT_WIDE');
    var slides = mdToSlides(md, title);
    // Title slide
    var t = pptx.addSlide();
    t.addText(title || 'PM Skills', { x: 0.5, y: 2.4, w: '90%', h: 1, fontSize: 34, bold: true, color: '1F2937', align: 'center' });
    t.addText('Generated with PM Skills', { x: 0.5, y: 3.5, w: '90%', h: 0.5, fontSize: 14, color: 'D97757', align: 'center' });
    slides.forEach(function (s) {
      var sl = pptx.addSlide();
      sl.addText(s.title || ' ', { x: 0.5, y: 0.35, w: '92%', h: 0.9, fontSize: 26, bold: true, color: '1F2937' });
      if (s.bullets.length) {
        sl.addText(s.bullets.slice(0, 12).map(function (b) { return { text: b, options: { bullet: true, breakLine: true } }; }),
          { x: 0.6, y: 1.4, w: '88%', h: 5, fontSize: 16, color: '374151', valign: 'top' });
      }
    });
    pptx.writeFile({ fileName: safeName(title) + '.pptx' });
  }

  // --- Excel (.xlsx) — every markdown table becomes a sheet --------------------
  function parseMdTables(md) {
    var lines = (md || '').split('\n'), tables = [], rows = [];
    function isRow(l) { return /^\s*\|.*\|\s*$/.test(l); }
    function isSep(l) { return /^\s*\|?[\s:|-]+\|?\s*$/.test(l) && l.indexOf('-') > -1; }
    function cells(l) { return l.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return clean(c.trim()); }); }
    function flush() { if (rows.length) tables.push(rows); rows = []; }
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      if (isRow(l)) { if (isSep(l)) continue; rows.push(cells(l)); }
      else flush();
    }
    flush();
    return tables.filter(function (t) { return t.length > 1; });
  }
  async function toXlsx(md, title) {
    var tables = parseMdTables(md);
    if (!tables.length) { alert('No tables found in this output to export to Excel. Try Word or PDF instead.'); return; }
    await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
    var wb = g.XLSX.utils.book_new();
    tables.forEach(function (t, i) { g.XLSX.utils.book_append_sheet(wb, g.XLSX.utils.aoa_to_sheet(t), 'Table ' + (i + 1)); });
    g.XLSX.writeFile(wb, safeName(title) + '.xlsx');
  }

  // --- Calendar (.ics) — dated items in a roadmap/plan become calendar events --------
  // Pulls dates out of (a) markdown tables with a date-ish column and (b) plain lines like
  // "- 2026-07-01: Launch" or "**Jul 1, 2026** — Kickoff". All-day VEVENTs; imports into
  // Google Calendar, Apple Calendar, Outlook. Returns the count of events written (0 = none found).
  var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  function parseDate(s) {
    if (!s) return null;
    var m = s.match(/\b(\d{4})[-/](\d{1,2})[-/](\d{1,2})\b/); // ISO 2026-07-01
    if (m) return ymd(+m[1], +m[2] - 1, +m[3]);
    m = s.match(/\b([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/); // Jul 1, 2026
    if (m && m[1].slice(0, 3).toLowerCase() in MONTHS) return ymd(+m[3], MONTHS[m[1].slice(0, 3).toLowerCase()], +m[2]);
    m = s.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,9})\.?\s+(\d{4})\b/); // 1 Jul 2026
    if (m && m[2].slice(0, 3).toLowerCase() in MONTHS) return ymd(+m[3], MONTHS[m[2].slice(0, 3).toLowerCase()], +m[1]);
    return null;
  }
  function ymd(y, mo, d) {
    var dt = new Date(Date.UTC(y, mo, d));
    if (isNaN(dt.getTime())) return null;
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return '' + dt.getUTCFullYear() + p(dt.getUTCMonth() + 1) + p(dt.getUTCDate());
  }
  function icsEscape(s) { return String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n'); }

  function extractEvents(md) {
    var events = [];
    // (a) Tables — find a date column + a label column.
    parseMdTables(md).forEach(function (rows) {
      var head = rows[0].map(function (h) { return h.toLowerCase(); });
      var dateCol = head.findIndex(function (h) { return /date|when|deadline|due|timing|milestone date|target/.test(h); });
      var labelCol = head.findIndex(function (h, i) { return i !== dateCol && /milestone|task|event|item|name|deliverable|activity|phase|what|title/.test(h); });
      if (labelCol === -1) labelCol = head.findIndex(function (_h, i) { return i !== dateCol; });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var dt = parseDate(dateCol > -1 ? row[dateCol] : row.join(' '));
        if (!dt) continue;
        var label = (labelCol > -1 ? row[labelCol] : row[0]) || 'Event';
        events.push({ date: dt, summary: label, desc: row.join(' · ') });
      }
    });
    // (b) Plain lines: "- 2026-07-01: Launch" / "**Jul 1, 2026** — Kickoff" / "1 Jul 2026 — Kickoff".
    (md || '').split('\n').forEach(function (raw) {
      if (/^\s*\|.*\|\s*$/.test(raw)) return; // table rows are handled above — don't double-count
      var ln = raw.trim().replace(/^[-*+]\s+/, '').replace(/^\*\*|\*\*/g, '');
      var dt = parseDate(ln);
      if (!dt) return;
      // Skip lines already covered by a table row (cheap dedupe on date+text).
      var label = clean(ln.replace(/\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b/, '')
        .replace(/\b[A-Za-z]{3,9}\.?\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}\b/, '')
        .replace(/\b\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]{3,9}\.?\s+\d{4}\b/, '')
        .replace(/^[\s:—–-]+|[\s:—–-]+$/g, '')) || 'Event';
      if (events.some(function (e) { return e.date === dt && e.summary === label; })) return;
      events.push({ date: dt, summary: label, desc: ln });
    });
    return events;
  }

  function toIcs(md, title) {
    var events = extractEvents(md);
    if (!events.length) {
      alert('No dates found to put on a calendar. This works best on a roadmap, launch plan, or timeline with dated milestones (e.g. a "Date" column or "2026-07-01: …" lines).');
      return;
    }
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//PM Skills//Artifacts//EN', 'CALSCALE:GREGORIAN',
      'X-WR-CALNAME:' + icsEscape(title || 'PM Skills plan')];
    events.forEach(function (e, i) {
      // All-day event: DTEND is the day after DTSTART per the spec.
      var end = ymd(+e.date.slice(0, 4), +e.date.slice(4, 6) - 1, +e.date.slice(6, 8) + 1) || e.date;
      lines.push('BEGIN:VEVENT', 'UID:' + stamp + '-' + i + '@pm-skills', 'DTSTAMP:' + stamp,
        'DTSTART;VALUE=DATE:' + e.date, 'DTEND;VALUE=DATE:' + end,
        'SUMMARY:' + icsEscape(e.summary), 'DESCRIPTION:' + icsEscape(e.desc || ''), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    saveBlob(new Blob([lines.join('\r\n')], { type: 'text/calendar' }), safeName(title) + '.ics');
  }

  // --- 🎓 Certificate — a landscape, print-ready award for the arena pages -----
  // (Gauntlet / Defense / Gym). Same print-window mechanism as toPDF; typeset like
  // something you'd actually frame: rules, a seal, a verification line.
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function certificate(o) {
    // o: {kind, name?, headline, score, level, date?, details?[], quote?}
    var w = window.open('', '_blank');
    if (!w) { alert('Allow pop-ups to download the certificate.'); return; }
    var date = o.date || new Date().toISOString().slice(0, 10);
    var accent = o.accent || '#1B365D';
    var details = (o.details || []).map(function (d) { return '<span class="d">' + esc(d) + '</span>'; }).join('<i>·</i>');
    w.document.write('<html><head><meta charset="utf-8"><title>' + esc(o.headline) + ' — certificate</title><style>' +
      '@page{size:A4 landscape;margin:0}' +
      'body{margin:0;font:15px/1.5 Charter,"Iowan Old Style",Georgia,serif;color:#1a1a1a;background:#f5f3ea;' +
      '-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
      '.frame{box-sizing:border-box;width:100vw;height:100vh;padding:34px;display:flex}' +
      '.inner{flex:1;border:2.5px solid ' + accent + ';outline:1px solid ' + accent + ';outline-offset:5px;' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:34px 60px;position:relative}' +
      '.kind{font-size:12px;letter-spacing:.42em;text-transform:uppercase;color:' + accent + ';font-weight:600}' +
      'h1{font-size:44px;margin:14px 0 4px;font-weight:600;letter-spacing:-.01em}' +
      '.who{font-size:17px;color:#555;margin:2px 0 18px;font-style:italic}' +
      '.score{font-size:64px;font-weight:700;color:' + accent + ';margin:6px 0;line-height:1}' +
      '.level{font-size:15px;margin:2px 0 16px}' +
      '.rule{width:180px;border-top:1px solid #b9b39f;margin:14px auto}' +
      '.details{font-size:12.5px;color:#666}.details .d{white-space:nowrap}.details i{margin:0 10px;font-style:normal;color:#b9b39f}' +
      '.quote{max-width:640px;font-size:14px;font-style:italic;color:#4a4a44;margin:16px 0 0}' +
      '.seal{position:absolute;right:44px;bottom:38px;width:92px;height:92px;border-radius:50%;border:2px solid ' + accent + ';' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;color:' + accent + ';transform:rotate(-8deg)}' +
      '.seal b{font-size:22px}.seal span{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase}' +
      '.verify{position:absolute;left:44px;bottom:42px;font-size:10.5px;color:#8a8574;text-align:left}' +
      '</style></head><body><div class="frame"><div class="inner">' +
      '<div class="kind">' + esc(o.kind || 'PM Skills · Certificate') + '</div>' +
      '<h1>' + esc(o.headline) + '</h1>' +
      (o.name ? '<div class="who">awarded to ' + esc(o.name) + '</div>' : '<div class="who">earned in live session</div>') +
      (o.score ? '<div class="score">' + esc(o.score) + '</div>' : '') +
      (o.level ? '<div class="level">' + esc(o.level) + '</div>' : '') +
      '<div class="rule"></div>' +
      (details ? '<div class="details">' + details + '</div>' : '') +
      (o.quote ? '<div class="quote">“' + esc(o.quote) + '”</div>' : '') +
      '<div class="seal"><b>🧠</b><span>pm-skills</span><span>' + esc(date) + '</span></div>' +
      '<div class="verify">Earned live against AI examiners at<br>mohitagw15856.github.io/pm-claude-skills — sessions run<br>client-side; the score is only as honest as the run.</div>' +
      '</div></div>' +
      '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},300);}</scr' + 'ipt></body></html>');
    w.document.close();
  }

  g.PMExport = {
    word: toWord, pdf: toPDF, pptx: toPptx, xlsx: toXlsx, ics: toIcs, certificate: certificate,
    THEMES: THEMES,
    hasTables: function (md) { return parseMdTables(md).length > 0; },
    hasDates: function (md) { return extractEvents(md).length > 0; },
  };
})(window);
