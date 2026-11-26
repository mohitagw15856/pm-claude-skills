const router = require('./utils/router.js');
let index = [];
let bodies = {};
try { index = require('./data/index.js'); } catch (e) { console.error('data/index.js missing: run node scripts/build-miniprogram.mjs'); }
try { bodies = require('./data/bodies.js'); } catch (e) { bodies = {}; }

App({
  globalData: { index, bodies, prepared: router.prepare(index) },
});
