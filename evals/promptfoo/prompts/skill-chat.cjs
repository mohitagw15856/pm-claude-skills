// The prompt, as a function. The skill's instructions are the system message
// and the case input is the user message, which is how the library's own
// runner (evals/run-evals.mjs) calls a skill. A function is used, not a
// template file, so skill text is passed through untouched.
module.exports = function skillChat({ vars }) {
  return [
    { role: 'system', content: String(vars.skill_body) },
    { role: 'user', content: String(vars.input) },
  ];
};
