from collections.abc import Generator
from typing import Any

from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage

from pm_skills_core import find


class FindSkillTool(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage, None, None]:
        try:
            hits = find(tool_parameters.get("query", ""), tool_parameters.get("limit", 5))
        except ValueError as e:
            yield self.create_text_message(f"Error: {e}")
            return
        if not hits:
            yield self.create_text_message("No skill matched. Try describing the task in other words.")
            return
        lines = [f"{i + 1}. {h['name']} ({h['score']:.2f}): {h['description']}" for i, h in enumerate(hits)]
        yield self.create_text_message("\n".join(lines))
        yield self.create_json_message({"skills": hits})
