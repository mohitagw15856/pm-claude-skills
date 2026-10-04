// Voice layer for the arena pages — zero-API, all browser-native:
//  • PMVoice.speak(personaId, text): speechSynthesis with a DISTINCT voice per
//    persona (deterministic voice pick + per-persona rate/pitch), so a Boardroom
//    session plays like a radio drama. Markdown and severity tags are stripped.
//  • PMVoice.micToTextarea(btn, textarea): webkitSpeechRecognition dictation —
//    answer the Defense or the Gauntlet's interviewer out loud.
// Both feature-detect and degrade to nothing (buttons hide themselves).
(function (g) {
  'use strict';

  // ── Speaking (theatre mode) ─────────────────────────────────────────────────
  var supported = 'speechSynthesis' in g;
  var enabled = false;
  var voices = [];
  function loadVoices() {
    voices = (g.speechSynthesis.getVoices() || []).filter(function (v) { return /^en/i.test(v.lang); });
    if (!voices.length) voices = g.speechSynthesis.getVoices() || [];
  }
  if (supported) {
    loadVoices();
    g.speechSynthesis.onvoiceschanged = loadVoices;
  }

  // Persona → delivery. Voice picked deterministically from whatever the OS has,
  // spread across the list so no two personas share one; rate/pitch add character
  // even when the voice pool is small.
  var STYLE = {
    cfo:      { slot: 0, rate: 0.98, pitch: 0.9  },   // Margaret — measured, level
    cto:      { slot: 1, rate: 1.06, pitch: 1.0  },   // Dev — quicker, matter-of-fact
    cco:      { slot: 2, rate: 1.0,  pitch: 1.15 },   // Amara — warmer, higher
    counsel:  { slot: 3, rate: 0.9,  pitch: 0.85 },   // Sam — slow, deliberate
    vc:       { slot: 4, rate: 1.12, pitch: 1.05 },   // Riko — fast, pointed
    strategy: { slot: 4, rate: 1.12, pitch: 1.05 },
    growth:   { slot: 5, rate: 1.08, pitch: 1.1  },
    chair:    { slot: 6, rate: 0.95, pitch: 0.95 },   // The Chair — neutral gravity
    default:  { slot: 7, rate: 1.0,  pitch: 1.0  },
  };
  function voiceFor(slot) {
    if (!voices.length) return null;
    // Prefer distinct named voices; spread slots across the pool.
    var step = Math.max(1, Math.floor(voices.length / 8));
    return voices[(slot * step) % voices.length];
  }
  function cleanForSpeech(text) {
    return String(text || '')
      .replace(/\[(BLOCKER|RISK|QUESTION)\]/gi, function (m, t) { return t.toLowerCase() + ': '; })
      .replace(/```[\s\S]*?```/g, ' code block omitted. ')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/[*_`>|#]/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 1200); // keep turns listenable
  }
  function speak(personaId, text, onend) {
    if (!supported || !enabled) { if (onend) onend(); return; }
    var s = STYLE[personaId] || STYLE.default;
    var u = new SpeechSynthesisUtterance(cleanForSpeech(text));
    var v = voiceFor(s.slot);
    if (v) u.voice = v;
    u.rate = s.rate; u.pitch = s.pitch;
    if (onend) u.onend = onend;
    g.speechSynthesis.speak(u); // queues naturally across turns
  }
  function stop() { if (supported) g.speechSynthesis.cancel(); }
  function setEnabled(on) { enabled = !!on; if (!on) stop(); try { localStorage.setItem('pm_theatre', on ? '1' : ''); } catch (e) {} }
  function isEnabled() { return enabled; }
  function restore() { try { if (localStorage.getItem('pm_theatre') === '1') enabled = true; } catch (e) {} return enabled; }

  // Wire a toggle button: sets label/state, restores persistence.
  function theatreToggle(btn) {
    if (!btn) return;
    if (!supported) { btn.hidden = true; return; }
    var label = function () { btn.textContent = (enabled ? '🔊' : '🔇') + ' Theatre'; btn.classList.toggle('on', enabled); };
    restore(); label();
    btn.addEventListener('click', function () { setEnabled(!enabled); label(); });
  }

  // ── Dictation (answer out loud) ─────────────────────────────────────────────
  var SR = g.SpeechRecognition || g.webkitSpeechRecognition;
  function micToTextarea(btn, textarea) {
    if (!btn) return;
    if (!SR) { btn.hidden = true; return; }
    var rec = null, listening = false, baseText = '';
    function stopRec() {
      listening = false;
      btn.textContent = '🎙'; btn.classList.remove('on');
      if (rec) { try { rec.stop(); } catch (e) {} rec = null; }
    }
    btn.addEventListener('click', function () {
      if (listening) return stopRec();
      rec = new SR();
      rec.continuous = true; rec.interimResults = true; rec.lang = 'en-US';
      baseText = textarea.value ? textarea.value.replace(/\s*$/, ' ') : '';
      rec.onresult = function (e) {
        var final = '', interim = '';
        for (var i = 0; i < e.results.length; i++) {
          (e.results[i].isFinal ? (final += e.results[i][0].transcript) : (interim += e.results[i][0].transcript));
        }
        textarea.value = baseText + final + interim;
      };
      rec.onerror = stopRec;
      rec.onend = function () { if (listening) stopRec(); };
      listening = true;
      btn.textContent = '⏺ listening…'; btn.classList.add('on');
      try { rec.start(); } catch (e) { stopRec(); }
    });
  }

  g.PMVoice = { speak: speak, stop: stop, theatreToggle: theatreToggle, micToTextarea: micToTextarea, isEnabled: isEnabled };
})(window);
