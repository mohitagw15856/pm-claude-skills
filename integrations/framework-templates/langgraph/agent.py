"""A LangChain / LangGraph agent with 1,285 professional skills, through the hosted PM Skills
MCP server (no key, no install).

    pip install langchain langgraph langchain-mcp-adapters "langchain[anthropic]"
    ANTHROPIC_API_KEY=… python agent.py "Run a RICE prioritisation on these five features: …"
"""
import asyncio
import sys

from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent

INSTRUCTIONS = (
    "Before doing professional work, call search_skills for the task, then get_skill "
    "for the best match, and follow that skill exactly, including its quality checks."
)


async def main(task: str) -> None:
    client = MultiServerMCPClient({
        "pm-skills": {"transport": "streamable_http", "url": "https://pm-skills-mcp.pm-claude-skills.workers.dev/mcp"},
    })
    tools = await client.get_tools()
    agent = create_agent("anthropic:claude-sonnet-5", tools, system_prompt=INSTRUCTIONS)
    result = await agent.ainvoke({"messages": [{"role": "user", "content": task}]})
    print(result["messages"][-1].content)


if __name__ == "__main__":
    asyncio.run(main(" ".join(sys.argv[1:]) or "Write a one-page PRD for in-app referrals in a B2B app."))
