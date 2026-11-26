"""An OpenAI Agents SDK agent with 1,285 professional skills, through the hosted
PM Skills MCP server (no key, no install).

    pip install openai-agents
    OPENAI_API_KEY=… python agent.py "Draft an incident post-mortem for yesterday's outage"
"""
import asyncio
import sys

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

INSTRUCTIONS = (
    "Before doing professional work, call search_skills for the task, then get_skill "
    "for the best match, and follow that skill exactly, including its quality checks."
)


async def main(task: str) -> None:
    async with MCPServerStreamableHttp(
        name="pm-skills",
        params={"url": "https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp"},
        cache_tools_list=True,
    ) as skills:
        agent = Agent(name="Professional", instructions=INSTRUCTIONS, mcp_servers=[skills])
        result = await Runner.run(agent, task)
        print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main(" ".join(sys.argv[1:]) or "Write a one-page PRD for in-app referrals in a B2B app."))
