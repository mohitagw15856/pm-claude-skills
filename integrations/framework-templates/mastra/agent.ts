// A Mastra agent with 1,285 professional skills, through the hosted PM Skills MCP
// server (no key, no install). Mastra prefixes each tool with the server key (pm-skills_).
//
//   npm i @mastra/core @mastra/mcp
//   AI_GATEWAY_API_KEY=… npx tsx agent.ts "Review this vendor contract for red flags: …"
import { Agent } from '@mastra/core/agent';
import { MCPClient } from '@mastra/mcp';

const mcp = new MCPClient({
  servers: { 'pm-skills': { url: new URL('https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp') } },
});

const agent = new Agent({
  id: 'professional',
  name: 'Professional',
  instructions: 'Before doing professional work, call pm-skills_search_skills for the task, then pm-skills_get_skill for the best match, and follow that skill exactly, including its quality checks.',
  model: process.env.MODEL || 'anthropic/claude-sonnet-5',
  tools: await mcp.listTools(),
});

const res = await agent.generate(process.argv.slice(2).join(' ') || 'Write a one-page PRD for in-app referrals in a B2B app.');
console.log(res.text);
await mcp.disconnect();
