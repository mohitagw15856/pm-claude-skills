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
  function loadScript(src, integrity) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[data-x="' + src + '"]')) return resolve();
      var s = document.createElement('script');
      s.src = src; s.async = true; s.setAttribute('data-x', src);
      // Subresource Integrity: pin the CDN bundle so a compromised package can't run.
      if (integrity) { s.integrity = integrity; s.crossOrigin = 'anonymous'; }
      s.onload = resolve; s.onerror = function () { reject(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
  }
  // marked + DOMPurify are already on every tool page.
  function mdToHtml(md) { return DOMPurify.sanitize(marked.parse(md || '')); }

  // Brand Kit (optional): logo / accent / font / footer / org, applied to every export.
  function brand() {
    var b = (g.PMBrand && g.PMBrand.get && g.PMBrand.get()) || {};
    return { accent: b.accent || '', logo: b.logo || '', font: b.font || 'system', footer: b.footer || '', org: b.org || '' };
  }
  function esc0(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // --- Word (.doc via Office-HTML, opens cleanly in Word/Pages/Docs) ----------
  function wordHtml(md, title) {
    var bk = brand();
    var head = (bk.logo || bk.org)
      ? "<p style='border-bottom:2px solid " + (bk.accent || '#444') + ";padding-bottom:6pt;margin-bottom:14pt'>" +
        (bk.logo ? "<img src='" + bk.logo + "' style='max-height:40px'/> " : '') +
        (bk.org ? "<b style='font-size:13pt;color:" + (bk.accent || '#111') + "'>" + esc0(bk.org) + "</b>" : '') + "</p>"
      : '';
    var accentCss = bk.accent ? ('h1{color:' + bk.accent + '}') : '';
    return "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>" + (title || 'Document') + "</title>" +
      "<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5} h1{font-size:20pt} h2{font-size:15pt} h3{font-size:13pt} table{border-collapse:collapse} td,th{border:1px solid #999;padding:4pt 8pt} code{font-family:Consolas,monospace}" + accentCss + "</style></head><body>" +
      head + mdToHtml(md) + (bk.footer ? "<p style='margin-top:20pt;color:#777;font-size:9pt'>" + esc0(bk.footer) + "</p>" : '') + "</body></html>";
  }
  function wordBlob(md, title) { return new Blob(['﻿', wordHtml(md, title)], { type: 'application/msword' }); }
  function toWord(md, title) { saveBlob(wordBlob(md, title), safeName(title) + '.doc'); }

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
    var bk = brand();
    var accent = opts.accent || bk.accent || '';
    var w = window.open('', '_blank');
    if (!w) { alert('Allow pop-ups to export as PDF.'); return; }
    // Brand header (logo + org) and footer, when a Brand Kit is set.
    var header = (bk.logo || bk.org)
      ? '<div class="pm-head">' + (bk.logo ? '<img src="' + bk.logo + '" alt="">' : '') + (bk.org ? '<span>' + esc0(bk.org) + '</span>' : '') + '</div>'
      : '';
    var footText = bk.footer ? esc0(bk.footer) : 'Made with PM Skills · mohitagw15856.github.io/pm-claude-skills';
    var foot = '<div class="pm-foot">' + footText + '</div>';
    var fontOverride = (g.PMBrand && bk.font && bk.font !== 'system') ? ('body{font-family:' + g.PMBrand.fontStack(bk.font) + '}') : '';
    var headCSS = '.pm-head{display:flex;align-items:center;gap:12px;margin:0 0 18px;padding-bottom:12px;border-bottom:2px solid ' + (accent || t.accent) + '}.pm-head img{max-height:40px;max-width:180px}.pm-head span{font-weight:700;font-size:15px;color:' + (accent || t.ink) + '}';
    w.document.write('<html><head><meta charset="utf-8"><title>' + (title || 'Document') + '</title>' +
      '<style>' + themeCSS(t, accent) + headCSS + fontOverride + '</style></head><body>' +
      header + mdToHtml(md) + foot +
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

  var hex = function (c, d) { return (c || '').replace('#', '').match(/^[0-9a-fA-F]{6}$/) ? c.replace('#', '') : d; };
  async function buildPptx(md, title) {
    await loadScript('https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js', 'sha384-Cck14aA9cifjYolcnjebXRfWGkz5ltHMBiG4px/j8GS+xQcb7OhNQWZYyWjQ+UwQ');
    var bk = brand();
    var accent = hex(bk.accent, 'D97757');
    var pptx = new g.PptxGenJS();
    pptx.defineLayout && pptx.layout && (pptx.layout = 'LAYOUT_WIDE');
    var slides = mdToSlides(md, title);
    // Title slide — brand logo + org if set.
    var t = pptx.addSlide();
    if (bk.logo) { try { t.addImage({ data: bk.logo, x: 5.83, y: 0.9, w: 1.5, h: 1.5, sizing: { type: 'contain', w: 1.5, h: 1.5 } }); } catch (e) {} }
    t.addText(title || 'PM Skills', { x: 0.5, y: 2.7, w: '90%', h: 1, fontSize: 34, bold: true, color: '1F2937', align: 'center' });
    t.addText(bk.org || 'Generated with PM Skills', { x: 0.5, y: 3.8, w: '90%', h: 0.5, fontSize: 14, color: accent, align: 'center' });
    slides.forEach(function (s) {
      var sl = pptx.addSlide();
      sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.18, h: 5.63, fill: { color: accent } });
      sl.addText(s.title || ' ', { x: 0.5, y: 0.35, w: '92%', h: 0.9, fontSize: 26, bold: true, color: '1F2937' });
      if (s.bullets.length) {
        sl.addText(s.bullets.slice(0, 12).map(function (b) { return { text: b, options: { bullet: true, breakLine: true } }; }),
          { x: 0.6, y: 1.4, w: '88%', h: 5, fontSize: 16, color: '374151', valign: 'top' });
      }
    });
    return pptx;
  }
  async function toPptx(md, title) { (await buildPptx(md, title)).writeFile({ fileName: safeName(title) + '.pptx' }); }
  async function pptxBlob(md, title) { return (await buildPptx(md, title)).write('blob'); }

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
  async function loadXlsx() {
    await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js', 'sha384-vtjasyidUo0kW94K5MXDXntzOJpQgBKXmE7e2Ga4LG0skTTLeBi97eFAXsqewJjw');
    return g.XLSX;
  }
  var numish = function (v) { var n = parseFloat(String(v).replace(/[$,%\s]/g, '')); return isFinite(n) && /\d/.test(String(v)) ? n : null; };
  // Build a worksheet from an array-of-arrays; when `model` is on, numeric columns get a
  // live SUM total row (a real =SUM() formula, so the file recalculates like a spreadsheet).
  function sheetFromTable(XLSX, t, model) {
    var aoa = t.map(function (r) { return r.slice(); });
    if (model && aoa.length > 2) {
      var cols = aoa[0].length, totals = new Array(cols).fill(null), anyNum = false;
      for (var c = 0; c < cols; c++) {
        var allNum = true, seen = 0;
        for (var r = 1; r < aoa.length; r++) { var v = aoa[r][c]; if (v === '' || v == null) continue; seen++; if (numish(v) == null) { allNum = false; break; } }
        if (allNum && seen > 1) { totals[c] = c; anyNum = true; }
      }
      if (anyNum) {
        // Coerce numeric cells to numbers so SUM works.
        for (var rr = 1; rr < aoa.length; rr++) for (var cc = 0; cc < cols; cc++) { var nv = numish(aoa[rr][cc]); if (nv != null && totals[cc] != null) aoa[rr][cc] = nv; }
        var totalRow = new Array(cols).fill('');
        totalRow[0] = 'Total';
        var ws0 = XLSX.utils.aoa_to_sheet(aoa);
        var lastDataRow = aoa.length; // 1-indexed row of last data (header is row 1)
        aoa.push(totalRow);
        var ws = XLSX.utils.aoa_to_sheet(aoa);
        for (var k = 0; k < cols; k++) {
          if (totals[k] == null) continue;
          var colLetter = XLSX.utils.encode_col(k);
          var cellRef = colLetter + (aoa.length); // total row
          ws[cellRef] = { t: 'n', f: 'SUM(' + colLetter + '2:' + colLetter + lastDataRow + ')' };
        }
        return ws;
      }
    }
    return XLSX.utils.aoa_to_sheet(aoa);
  }
  async function buildXlsx(md, title, model) {
    var tables = parseMdTables(md);
    if (!tables.length) return null;
    var XLSX = await loadXlsx();
    var wb = XLSX.utils.book_new();
    tables.forEach(function (t, i) { XLSX.utils.book_append_sheet(wb, sheetFromTable(XLSX, t, model), 'Sheet ' + (i + 1)); });
    return { wb: wb, XLSX: XLSX };
  }
  async function toXlsx(md, title, model) {
    var r = await buildXlsx(md, title, model);
    if (!r) { alert('No tables found in this output to export to Excel. Try Word or PDF instead.'); return; }
    r.XLSX.writeFile(r.wb, safeName(title) + '.xlsx');
  }
  async function xlsxBlob(md, title, model) {
    var r = await buildXlsx(md, title, model);
    if (!r) return null;
    var arr = r.XLSX.write(r.wb, { bookType: 'xlsx', type: 'array' });
    return new Blob([arr], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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

  // --- The Packet — bundle several artifacts into one .zip ---------------------
  // items: [{ md, title, formats: ['docx','xlsx','pptx','pdf-html','md'] }]. Produces the
  // real bytes for each (pptx/xlsx/word/markdown; 'pdf-html' ships a print-ready .html since
  // a true PDF needs the print dialog), zips them, and downloads a single file.
  async function packet(items, zipName) {
    await loadScript('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js', 'sha384-+mbV2IY1Zk/X1p/nWllGySJSUN8uMs+gUAN10Or95UBH0fpj6GfKgPmgC5EXieXG');
    var zip = new g.JSZip();
    for (var i = 0; i < items.length; i++) {
      var it = items[i], base = safeName(it.title || ('artifact-' + (i + 1)));
      var fmts = it.formats || ['docx'];
      for (var f = 0; f < fmts.length; f++) {
        var fmt = fmts[f];
        try {
          if (fmt === 'md') zip.file(base + '.md', it.md || '');
          else if (fmt === 'docx') zip.file(base + '.doc', wordBlob(it.md, it.title));
          else if (fmt === 'pptx') { var pb = await pptxBlob(it.md, it.title); if (pb) zip.file(base + '.pptx', pb); }
          else if (fmt === 'xlsx') { var xb = await xlsxBlob(it.md, it.title, it.model); if (xb) zip.file(base + '.xlsx', xb); }
          else if (fmt === 'pdf-html') zip.file(base + '.html', printableHtml(it.md, it.title));
        } catch (e) { /* skip a format that can't be produced, keep the rest */ }
      }
    }
    var blob = await zip.generateAsync({ type: 'blob' });
    saveBlob(blob, safeName(zipName || 'packet') + '.zip');
  }
  function printableHtml(md, title) {
    var t = THEMES.paper, bk = brand();
    return '<html><head><meta charset="utf-8"><title>' + esc0(title || 'Document') + '</title><style>' + themeCSS(t, bk.accent) +
      '@media screen{body{box-shadow:0 0 0 1px #ddd}}</style></head><body>' + mdToHtml(md) +
      '<div class="pm-foot">' + (bk.footer ? esc0(bk.footer) : 'Made with PM Skills') + '</div>' +
      '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print&&window.print();},400);}</scr' + 'ipt></body></html>';
  }

  // --- Infographic one-pager — a designed visual summary, not prose ------------
  // Pulls the headline, up to 4 "big numbers" (e.g. "**42%** — churn"), and the top
  // takeaways, and lays them out as a print-ready single page. Opens the print dialog.
  function extractStats(md) {
    var stats = [], seen = {};
    var re = /(?:\*\*|`)?(\$?\d[\d,]*\.?\d*\s*[%x×]?[KMB]?)(?:\*\*|`)?\s*(?:[—:\-–]\s*|\()([A-Za-z][^\n.|)]{2,42})/g, m;
    while ((m = re.exec(md)) && stats.length < 6) { var k = m[1] + m[2]; if (seen[k]) continue; seen[k] = 1; stats.push({ n: m[1].trim(), label: m[2].trim().replace(/[)*]+$/, '') }); }
    return stats.slice(0, 4);
  }
  function onePager(md, title) {
    var bk = brand(), accent = bk.accent || '#d9605a';
    var w = window.open('', '_blank');
    if (!w) { alert('Allow pop-ups to build the one-pager.'); return; }
    var lines = (md || '').split('\n').map(function (l) { return l.trim(); });
    var h1 = (lines.find(function (l) { return /^#\s/.test(l); }) || '').replace(/^#\s*/, '') || title || 'Summary';
    var takeaways = lines.filter(function (l) { return /^[-*+]\s+/.test(l); }).slice(0, 5)
      .map(function (l) { return clean(l.replace(/^[-*+]\s+/, '')); });
    var stats = extractStats(md);
    var statHtml = stats.map(function (s) { return '<div class="stat"><div class="n">' + esc0(s.n) + '</div><div class="l">' + esc0(s.label) + '</div></div>'; }).join('');
    var takeHtml = takeaways.map(function (t) { return '<li>' + esc0(t) + '</li>'; }).join('');
    w.document.write('<html><head><meta charset="utf-8"><title>' + esc0(title || 'One-pager') + '</title><style>' +
      '@page{size:A4 portrait;margin:0}*{box-sizing:border-box}' +
      'body{margin:0;font-family:' + (g.PMBrand ? g.PMBrand.fontStack(bk.font) : 'Inter,Arial,sans-serif') + ';color:#16181d;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
      '.page{width:210mm;min-height:297mm;padding:22mm 20mm;margin:0 auto}' +
      '.top{display:flex;align-items:center;gap:14px;border-bottom:4px solid ' + accent + ';padding-bottom:14px}' +
      '.top img{max-height:44px}.top .org{font-weight:700;color:' + accent + '}' +
      'h1{font-size:30pt;line-height:1.1;margin:26px 0 6px}' +
      '.stats{display:grid;grid-template-columns:repeat(' + Math.max(1, Math.min(4, stats.length || 1)) + ',1fr);gap:14px;margin:26px 0}' +
      '.stat{border:1px solid #e6e6e6;border-top:4px solid ' + accent + ';border-radius:10px;padding:16px}' +
      '.stat .n{font-size:30pt;font-weight:800;color:' + accent + ';line-height:1}.stat .l{font-size:10.5pt;color:#555;margin-top:6px}' +
      'h2{font-size:14pt;margin:26px 0 8px;color:' + accent + '}ul{padding-left:18px}li{font-size:12pt;line-height:1.6;margin:6px 0}' +
      '.foot{position:fixed;bottom:12mm;left:20mm;right:20mm;border-top:1px solid #ddd;padding-top:8px;font-size:9pt;color:#888}' +
      '</style></head><body><div class="page">' +
      '<div class="top">' + (bk.logo ? '<img src="' + bk.logo + '">' : '') + '<span class="org">' + esc0(bk.org || 'PM Skills') + '</span></div>' +
      '<h1>' + esc0(h1) + '</h1>' +
      (statHtml ? '<div class="stats">' + statHtml + '</div>' : '') +
      (takeHtml ? '<h2>Key takeaways</h2><ul>' + takeHtml + '</ul>' : '') +
      '<div class="foot">' + esc0(bk.footer || 'Made with PM Skills · mohitagw15856.github.io/pm-claude-skills') + '</div>' +
      '</div><scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},350);}</scr' + 'ipt></body></html>');
    w.document.close();
  }

  g.PMExport = {
    word: toWord, pdf: toPDF, pptx: toPptx, xlsx: toXlsx, ics: toIcs, certificate: certificate,
    wordBlob: wordBlob, pptxBlob: pptxBlob, xlsxBlob: xlsxBlob,
    packet: packet, onePager: onePager,
    THEMES: THEMES,
    hasTables: function (md) { return parseMdTables(md).length > 0; },
    hasDates: function (md) { return extractEvents(md).length > 0; },
    hasStats: function (md) { return extractStats(md).length > 0; },
  };
})(window);
