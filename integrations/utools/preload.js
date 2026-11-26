// uTools plugin: an offline skill finder. List mode, no window of its own.
// Data and router come from ./data, written by:
//   node scripts/build-miniprogram.mjs --out integrations/utools/data --with-router
// Nothing is fetched and nothing typed leaves the machine.
let router = null, index = [], bodies = {}, prepared = [];
try {
  router = require('./data/router.js');
  index = require('./data/index.js');
  bodies = require('./data/bodies.js');
  prepared = router.prepare(index);
} catch (e) {
  router = null;
}

const MISSING = [{
  title: '还没有技能数据',
  description: '在仓库根目录运行：node scripts/build-miniprogram.mjs --out integrations/utools/data --with-router',
  name: '',
}];

function rows(query) {
  if (!router) return MISSING;
  const q = String(query || '').trim();
  if (!q) return [{ title: '输入你要做的事，比如：帮我写周报', description: '共 ' + index.length + ' 个技能，离线查找', name: '' }];
  const hits = router.find(prepared, q, 10);
  if (!hits.length) return [{ title: '没有找到匹配的技能', description: '换一种说法，或用英文关键词再试', name: '' }];
  return hits.map((s) => ({
    title: (s.t || s.n) + (s.b ? '（含中文说明）' : ''),
    description: s.z || s.d,
    name: s.n,
  }));
}

function select(item) {
  if (!item || !item.name || !router) return;
  const skill = index.find((s) => s.n === item.name);
  if (!skill) return;
  const u = window.utools;
  u.copyText(router.promptFor(skill, bodies[skill.n] || ''));
  u.showNotification('提示词已复制：' + (skill.t || skill.n));
  u.hideMainWindow();
  u.outPlugin();
}

window.exports = {
  pm_find: {
    mode: 'list',
    args: {
      // "over" commands arrive with the selected text as the payload.
      enter: (action, callbackSetList) => callbackSetList(rows(action && action.type === 'over' ? action.payload : '')),
      search: (action, searchWord, callbackSetList) => callbackSetList(rows(searchWord)),
      select: (action, itemData) => select(itemData),
      placeholder: '说说你要做什么，回车复制提示词',
    },
  },
};
