from collections.abc import Generator
from typing import Any

from dify_plugin import Tool
from dify_plugin.entities.tool import ToolInvokeMessage

from pm_skills_core import fetch


class GetSkillTool(Tool):
    def _invoke(self, tool_parameters: dict[str, Any]) -> Generator[ToolInvokeMessage, None, None]:
        try:
            text = fetch(tool_parameters.get("name", ""), tool_parameters.get("language", "en"))
        except (ValueError, RuntimeError) as e:
            yield self.create_text_message(f"Error: {e}")
            return
        yield self.create_text_message(text)
