// The language a skill is written in: the frontmatter `language:` field when it
// has one (needed for Latin-script languages such as Spanish or Polish),
// otherwise the dominant non-Latin script of its body, otherwise English.
// Used by the Skill Cup to put entries in language tracks.
const SCRIPTS = [
  ['zh', /[㐀-鿿]/g], ['ja', /[぀-ヿ]/g], ['ko', /[가-힯]/g],
  ['hi', /[ऀ-ॿ]/g], ['ar', /[؀-ۿ]/g], ['th', /[฀-๿]/g], ['ru', /[Ѐ-ӿ]/g],
];
export function skillLanguage(md) {
  const fm = (String(md).match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
  const declared = (fm.match(/^language:\s*["']?([a-z]{2}(?:-[A-Z]{2})?)["']?\s*$/m) || [])[1];
  if (declared) return declared;
  const body = String(md).replace(/^---[\s\S]*?---/, '');
  const letters = (body.match(/\p{L}/gu) || []).length || 1;
  let best = ['en', 0];
  for (const [code, re] of SCRIPTS) { const n = (body.match(re) || []).length; if (n > best[1]) best = [code, n]; }
  // Japanese text mixes kana with Han; any real share of kana means Japanese.
  const kana = (body.match(/[぀-ヿ]/g) || []).length;
  if (best[0] === 'zh' && kana / letters > 0.05) return 'ja';
  return best[1] / letters > 0.2 ? best[0] : 'en';
}
export const LANGUAGE_NAMES = { en: 'English', zh: 'Chinese', ja: 'Japanese', ko: 'Korean', hi: 'Hindi', ar: 'Arabic', th: 'Thai', ru: 'Russian', es: 'Spanish', pt: 'Portuguese', fr: 'French', de: 'German', it: 'Italian', pl: 'Polish', uk: 'Ukrainian', tr: 'Turkish', bn: 'Bengali', ur: 'Urdu', id: 'Indonesian', vi: 'Vietnamese', 'zh-TW': 'Traditional Chinese' };
