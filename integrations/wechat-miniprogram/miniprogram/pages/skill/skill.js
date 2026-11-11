const router = require('../../utils/router.js');
const app = getApp();
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;

Page({
  data: { skill: null, hasBody: false, preview: '' },
  onLoad(options) {
    const name = String(options.name || '');
    if (!NAME.test(name)) return;
    const skill = app.globalData.index.find((s) => s.n === name);
    if (!skill) return;
    const body = app.globalData.bodies[name] || '';
    this.body = body;
    this.setData({ skill, hasBody: !!body, preview: body.slice(0, 1200) + (body.length > 1200 ? '\n……' : '') });
    wx.setNavigationBarTitle({ title: skill.t || skill.n });
  },
  copy(data, title) {
    wx.setClipboardData({ data, success: () => wx.showToast({ title, icon: 'success' }) });
  },
  copyPrompt() { if (this.data.skill) this.copy(router.promptFor(this.data.skill, this.body), '提示词已复制'); },
  copyInstall() {
    if (!this.data.skill) return;
    this.copy('npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --skills ' + this.data.skill.n, '命令已复制');
  },
  onShareAppMessage() {
    const s = this.data.skill;
    return { title: s ? (s.t || s.n) : 'PM Skills', path: '/pages/skill/skill?name=' + (s ? s.n : '') };
  },
});
