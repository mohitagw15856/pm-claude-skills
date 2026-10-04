// Lightweight UI internationalization for the playground. Hand-translated interface strings
// (NOT the skill content — that's localized on demand via the 🌐 output selector / Translate button).
// Elements opt in with data-i18n / data-i18n-html / data-i18n-ph / data-i18n-title attributes whose
// value is a key in DICT below. nav.js renders the 中/EN toggle and calls apply() after building the nav.
// Scoped to the main playground page for now; any page can opt in by adding <script src="i18n.js">.
(function (g) {
  'use strict';
  var STORE = 'pm_uilang';
  var LANGS = ['en', 'zh'];

  // key → { en, zh }. en is the source of truth (also the fallback if a zh value is missing).
  var DICT = {
    // ── Nav (shared) ──
    'nav.playground': { en: '▶ Playground', zh: '▶ 技能场' },
    'nav.daily': { en: '🔥 Daily', zh: '🔥 每日挑战' },
    'nav.jobs': { en: '💼 Job Search', zh: '💼 求职' },
    'nav.journeys': { en: '🧭 Journeys', zh: '🧭 学习路径' },
    'nav.galaxy': { en: '🌌 Galaxy', zh: '🌌 技能星系' },
    'nav.tools': { en: 'Tools', zh: '工具' },
    'nav.explore': { en: 'Explore', zh: '探索' },
    'nav.pro': { en: '⭐ Pro', zh: '⭐ 专业版' },
    'nav.agent': { en: '✨ Auto-Agent', zh: '✨ 自动智能体' },
    'nav.canvas': { en: '🧩 Workflow Canvas', zh: '🧩 工作流画布' },
    'nav.ask': { en: '❓ Ask', zh: '❓ 提问' },
    'nav.brain': { en: '🧠 Brain', zh: '🧠 记忆库' },
    'nav.grade': { en: '📝 Grade your work', zh: '📝 给你的稿件打分' },
    'nav.studio': { en: '🏗️ Create a skill', zh: '🏗️ 创建技能' },
    'nav.catalog': { en: '📚 Catalog', zh: '📚 目录' },
    'nav.examples': { en: '📄 Sample outputs', zh: '📄 示例输出' },
    'nav.leaderboard': { en: '📊 Leaderboard', zh: '📊 排行榜' },
    'nav.coverage': { en: '📈 Eval coverage', zh: '📈 评测覆盖' },
    'nav.benchmark': { en: '🏆 Benchmark', zh: '🏆 基准测试' },
    'nav.learn': { en: '🎓 Learn', zh: '🎓 学习' },
    'nav.guide': { en: '📖 Guide', zh: '📖 指南' },
    'nav.community': { en: '💬 Community', zh: '💬 社区' },
    'nav.communitySkills': { en: '🌐 Community Skills', zh: '🌐 社区技能' },

    // ── Playground landing ──
    'page.dirPill': { en: '🎉 In the official Anthropic plugin directory', zh: '🎉 已收录于 Anthropic 官方插件目录' },
    'page.heroH2': { en: 'Make AI produce <span class="grad">real professional work</span>.', zh: '让 AI 产出 <span class="grad">真正专业的成果</span>。' },
    'page.heroP': { en: '319 open-source skills that teach Claude, ChatGPT & Gemini the structure a senior pro uses — PRDs, exec updates, launch plans, postmortems. Run any one free, right here.', zh: '319 个开源技能，教会 Claude、ChatGPT 和 Gemini 资深专家所用的结构 —— PRD、高管汇报、上线计划、复盘。每一个都能在此免费运行。' },
    'page.statSkills': { en: 'skills', zh: '技能' },
    'page.statEval': { en: 'eval-scored', zh: '已评测' },
    'page.statAvg': { en: 'avg score /5', zh: '平均分 /5' },
    'page.statStars': { en: 'stars', zh: '星标' },
    'page.cta1': { en: '✨ Try the Auto-Agent', zh: '✨ 试用自动智能体' },
    'page.cta2': { en: '🌌 Explore the Galaxy', zh: '🌌 探索技能星系' },
    'page.cta3': { en: '▶ Browse skills ↓', zh: '▶ 浏览技能 ↓' },
    'page.getKey': { en: 'Get a FREE Gemini key (no credit card) →', zh: '获取免费 Gemini 密钥（无需信用卡）→' },
    'page.onboardingQ': { en: '👋 New here? What do you do?', zh: '👋 初次使用？你的职业是？' },
    'page.skip': { en: 'skip', zh: '跳过' },
    'page.contextSummary': { en: '🧠 Your context — set once, every skill uses it', zh: '🧠 你的背景 —— 设置一次，所有技能通用' },
    'page.searchPh': { en: 'Search skills…', zh: '搜索技能……' },
    'page.allBundles': { en: 'All bundles', zh: '全部合集' },
    'page.allTiers': { en: 'All tiers', zh: '全部等级' },
    'page.tierProd': { en: '🟢 Production-Ready', zh: '🟢 生产级' },
    'page.tierStable': { en: '🔵 Stable', zh: '🔵 稳定' },
    'page.tierExp': { en: '🟡 Experimental', zh: '🟡 实验性' },
    'page.evalFilter': { en: '✅ Eval-scored', zh: '✅ 已评测' },
    'page.history': { en: '🕘 History', zh: '🕘 历史记录' },
    'page.recommendPh': { en: '🧭 Not sure which skill? Describe your task — e.g. “explain a metric drop to my CEO”', zh: '🧭 不确定用哪个技能？描述你的任务 —— 例如“向 CEO 解释某项指标下滑”' },
    'page.runBtn': { en: 'Run with my Claude key', zh: '用我的 Claude 密钥运行' },
    'page.back': { en: '← All skills', zh: '← 所有技能' },

    // ── Job Search (jobs.html) ──
    'jobs.brandH1': { en: '💼 Job Search', zh: '💼 求职' },
    'jobs.brandTag': { en: 'Your single stop to find and land the role — free, in your browser.', zh: '找到并拿下心仪职位的一站式工具 —— 免费，全程在浏览器中完成。' },
    'jobs.heroH1': { en: 'Land the job — one guided toolkit', zh: '拿下这份工作 —— 一套引导式工具包' },
    'jobs.heroP': { en: 'Every step of a real search, in order: sharpen your materials, target the right roles, reach out, ace the interview, and negotiate. Each tool runs in the playground with the structure a senior pro uses.', zh: '一次真实求职的每一步，按顺序排列：打磨材料、锁定合适职位、主动出击、拿下面试、谈妥薪资。每个工具都在技能场中运行，套用资深专家的结构。' },
    'jobs.note': { en: '🔒 Runs in your browser. Nothing is stored on a server. Export any result as a <strong>designed PDF</strong>.', zh: '🔒 在你的浏览器中运行。服务器不存储任何内容。任何结果都可导出为<strong>精美排版的 PDF</strong>。' },
    'jobs.freekeySummary': { en: '🔑 No API key? Here are 3 free ways to run — pick one', zh: '🔑 没有 API 密钥？这里有 3 种免费运行方式 —— 任选其一' },
    'jobs.cta': { en: '🧩 Run the whole “Land a Job” chain in the Workflow Canvas', zh: '🧩 在工作流画布中运行完整的「拿下工作」链路' },

    // ── Guided Journeys (hub.html) ──
    'hub.brandH1': { en: '🧭 Guided Journeys', zh: '🧭 学习路径' },
    'hub.brandTag': { en: 'Step-by-step skill journeys for real goals.', zh: '为真实目标量身打造的分步技能路径。' },
    'hub.heroH1': { en: 'Guided Journeys', zh: '学习路径' },
    'hub.heroP': { en: 'Pick a goal and follow the steps — each runs in the playground with the structure a senior pro uses.', zh: '选定一个目标，跟着步骤走 —— 每一步都在技能场中运行，套用资深专家的结构。' },
    'hub.note': { en: '🔒 Runs in your browser — free with a Google AI Studio key or the in-browser model (no card), or your own key. Export any result as a designed PDF.', zh: '🔒 在你的浏览器中运行 —— 用 Google AI Studio 密钥或内置模型即可免费使用（无需信用卡），也可用你自己的密钥。任何结果都可导出为精美排版的 PDF。' },
  };

  function getLang() { try { var l = localStorage.getItem(STORE); return LANGS.indexOf(l) !== -1 ? l : 'en'; } catch (e) { return 'en'; } }
  function setLang(l) { try { localStorage.setItem(STORE, l); } catch (e) {} apply(); }
  function t(key, lang) { var e = DICT[key]; if (!e) return null; return (e[lang || getLang()] != null ? e[lang || getLang()] : e.en); }

  function apply() {
    var lang = getLang(), d = document;
    d.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    d.querySelectorAll('[data-i18n]').forEach(function (el) { var v = t(el.getAttribute('data-i18n'), lang); if (v != null) el.textContent = v; });
    d.querySelectorAll('[data-i18n-html]').forEach(function (el) { var v = t(el.getAttribute('data-i18n-html'), lang); if (v != null) el.innerHTML = v; });
    d.querySelectorAll('[data-i18n-ph]').forEach(function (el) { var v = t(el.getAttribute('data-i18n-ph'), lang); if (v != null) el.setAttribute('placeholder', v); });
    d.querySelectorAll('[data-i18n-title]').forEach(function (el) { var v = t(el.getAttribute('data-i18n-title'), lang); if (v != null) el.setAttribute('title', v); });
    // Re-run any page hook that depends on the live number (e.g. the skill count in the hero).
    if (g.pmOnI18nApply) try { g.pmOnI18nApply(lang); } catch (e) {}
  }

  g.PMi18n = { getLang: getLang, setLang: setLang, apply: apply, t: t, LANGS: LANGS };
  if (document.readyState !== 'loading') apply();
  else document.addEventListener('DOMContentLoaded', apply);
})(window);
