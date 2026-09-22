// pm-skills-jev-picker — one function: which of the library's skills fits this prompt?
//   import { pick } from 'pm-skills-jev-picker';
//   const r = await pick('my landlord kept my deposit', { apiKey: process.env.JEV_API_KEY });
//   // { skill: 'security-deposit-recovery', pack: 'pm-renters', confidence: 0.83, probability: 0.91, auto: true, alternatives: [...], ms: 412 }
// Without a key it returns the keyword baseline with method: 'keyword'.
import { routePrompt } from './route.mjs';
import { loadCatalog } from './catalog.mjs';

let CACHE = null;
export function catalog() { return (CACHE ||= loadCatalog()); }
export async function pick(prompt, { apiKey, baseUrl, model, twoStage = true, transport, thresholds } = {}) {
  const env = { JEV_API_KEY: apiKey ?? process.env.JEV_API_KEY, JEV_BASE_URL: baseUrl ?? process.env.JEV_BASE_URL, JEV_MODEL: model ?? process.env.JEV_MODEL };
  return routePrompt(prompt, { catalog: catalog(), transport, twoStage, thresholds, env });
}
export { routePrompt } from './route.mjs';
export { ask, choice, score, noul, decide } from './client.mjs';
