// A Vercel AI SDK agent with 1,285 professional skills, through the hosted PM Skills
// MCP server (no key, no install). The model finds the right skill, loads it, and
// follows it: PRDs, post-mortems, contract reviews, budgets and the rest.
//
//   npm i ai @ai-sdk/mcp
//   AI_GATEWAY_API_KEY=… npx tsx agent.ts "Write a PRD for in-app referrals"
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText, isStepCount } from 'ai';

const skills = await createMCPClient({
  transport: { type: 'http', url: 'https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp' },
});

try {
  const { text } = await generateText({
    model: process.env.MODEL || 'anthropic/claude-sonnet-5',
    tools: await skills.tools(),
    stopWhen: isStepCount(6),
    system: 'Before doing professional work, call search_skills for the task, then get_skill for the best match, and follow that skill exactly, including its quality checks.',
    prompt: process.argv.slice(2).join(' ') || 'Write a one-page PRD for in-app referrals in a B2B app.',
  });
  console.log(text);
} finally {
  await skills.close();
}
