# pm-skills-tools: every PM Skills skill as an agent tool

The [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) library compiled for **agent builders**: OpenAI function schemas, Vercel AI SDK tools, and a framework-agnostic runtime. Your agent gets `prd_template`, `meeting_notes`, `runway_monte_carlo`… as callable tools.

**Execution model, stated plainly:** calling a tool returns the skill's full instructions + the input, for *your* model to execute — the same pattern as MCP's `get_skill`. No second vendor, no extra key, works with whatever model your agent already runs.

```js
import { pick, search, toOpenAI, executeOpenAI, toVercelAI } from 'pm-skills-tools';

// Never ship them all into one context — pick or search:
const tools = pick(['prd_template', 'competitive_analysis']);   // by name
const found = search('negotiate a renewal');                     // by task

// OpenAI SDK (or anything JSON-schema):
const res = await openai.chat.completions.create({ model, messages, tools: toOpenAI(tools) });
const call = res.choices[0].message.tool_calls?.[0];
if (call) messages.push({ role: 'tool', tool_call_id: call.id,
  content: executeOpenAI(tools, call.function.name, call.function.arguments) });

// Vercel AI SDK:
import { generateText } from 'ai';
await generateText({ model, prompt, tools: toVercelAI(tools) });
```

Static schemas without the runtime: `pm-skills-tools/openai-tools.json`. Regenerated from the library every release. MIT.
