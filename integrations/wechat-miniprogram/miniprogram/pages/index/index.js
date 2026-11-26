const router = require('../../utils/router.js');
const app = getApp();

Page({
  data: {
    query: '',
    results: [],
    total: app.globalData.index.length,
    examples: ['帮我写周报', '述职报告怎么写', '劳动合同帮我看看', '小红书笔记', '双11活动方案', '融资商业计划书', '留学文书', '高新技术企业认定'],
  },
  onInput(e) { this.search(e.detail.value); },
  onSearch(e) { this.search(e.detail.value); },
  onExample(e) { this.search(e.currentTarget.dataset.q); },
  search(query) {
    this.setData({ query, results: router.find(app.globalData.prepared, query, 12) });
  },
  onShareAppMessage() { return { title: 'PM Skills：一句话找到合适的专业技能', path: '/pages/index/index' }; },
});
