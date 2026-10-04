from typing import Any

from dify_plugin import ToolProvider


class PmSkillsProvider(ToolProvider):
    def _validate_credentials(self, credentials: dict[str, Any]) -> None:
        # No credentials: routing runs on bundled data, and skills load from public mirrors.
        return None
