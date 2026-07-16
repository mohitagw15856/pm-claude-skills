// Brand Kit — a small, local identity (logo, accent, font, footer, org name) that
// the export engine applies to every artifact, so a skill's output comes out on
// *your* brand, not a generic template. Stored in localStorage only; nothing
// leaves the browser. Exposes window.PMBrand.
(function (g) {
  'use strict';
  var KEY = 'pm_brandkit_v1';
  var FONTS = {
    'system': "-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    'inter': "'Inter',-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    'serif': "Charter,'Iowan Old Style',Georgia,'Times New Roman',serif",
    'mono': "'IBM Plex Sans',-apple-system,Segoe UI,Roboto,Arial,sans-serif",
  };
  function get() {
    try { return Object.assign({ accent: '', logo: '', font: 'system', footer: '', org: '' }, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return { accent: '', logo: '', font: 'system', footer: '', org: '' }; }
  }
  function set(patch) {
    var b = Object.assign(get(), patch || {});
    try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) {}
    return b;
  }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) {} }
  function has() { var b = get(); return !!(b.accent || b.logo || b.footer || b.org); }
  function fontStack(id) { return FONTS[id] || FONTS.system; }
  // Read an image File → a data: URL (kept small; downscaled to <= 480px wide).
  function readLogo(file) {
    return new Promise(function (resolve, reject) {
      if (!file) return resolve('');
      var fr = new FileReader();
      fr.onload = function () {
        var img = new Image();
        img.onload = function () {
          var scale = Math.min(1, 480 / img.width);
          var c = document.createElement('canvas');
          c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          try { resolve(c.toDataURL('image/png')); } catch (e) { resolve(fr.result); }
        };
        img.onerror = function () { resolve(fr.result); };
        img.src = fr.result;
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }
  g.PMBrand = { get: get, set: set, clear: clear, has: has, fontStack: fontStack, readLogo: readLogo, FONTS: FONTS };
})(window);
