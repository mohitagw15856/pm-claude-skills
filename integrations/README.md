# Integrations

Ways to reach the PM Skills library beyond the CLI, MCP server, and browser playground. Each folder is self-contained with its own setup.

| Integration | What it is | Setup |
|---|---|---|
| [`right-click/`](right-click/) | **Right-click any file** in Finder, Explorer or a Linux file manager and run a skill on it; free with a local model, or your own key | [README](right-click/README.md) |
| [`fake-apps-mcp/`](fake-apps-mcp/) | **Fake-apps sandbox**: a local MCP server with invented Gmail, Stripe, Xero, Gusto, DocuSign, HubSpot and Shopify data for one shop, to try proactive-agent skills safely; sends, payments and deletions are refused and logged | [README](fake-apps-mcp/README.md) |
| [`raycast/`](raycast/) | Raycast extension — search skills, open/run/install from your launcher | [README](raycast/README.md) |
| [`alfred/`](alfred/) | Alfred workflow (keyword `pm`) — live skill search | [README](alfred/README.md) |
| [`custom-gpt/`](custom-gpt/) | Publish the library as a **Custom GPT** in the GPT Store (live Actions API) | [SETUP](custom-gpt/SETUP.md) |
| [`gemini-gem/`](gemini-gem/) | Publish the library as a **Gemini Gem** (llms.txt knowledge) | [SETUP](gemini-gem/SETUP.md) |
| [`chatops/`](chatops/) | **Slack & Discord** `/pmskill` slash command — one Cloudflare Worker, signature-verified | [README](chatops/README.md) |
| [`../box/`](../box/README.md) | **Library in a box**: a Raspberry Pi or old laptop serves the whole site and a local model over its own Wi-Fi, fully offline | [README](../box/README.md) |
| [`phone-line/`](phone-line/) | **Call a number, talk to the library** — Twilio Voice: say what you need, hear a short skill-shaped answer, say "text me" for the full skill | [README](phone-line/README.md) |
| [`ussd/`](ussd/) | **USSD menu** for any phone, even with no data: dial a short code, pick your situation, get the first step on screen and the link by SMS (no AI model, no API bill) | [README](ussd/README.md) |
| [`twilio/`](twilio/) | **Text a skill** over SMS / WhatsApp — run a skill from a text, get the result back | [README](twilio/README.md) |
| [`email/`](email/) | **Email operator** — forward a thread, get the drafted artifact back in-thread | [README](email/README.md) |
| [`framework-templates/`](framework-templates/) | **Agent framework starters** — Vercel AI SDK, OpenAI Agents SDK, LangChain/LangGraph and Mastra agents with every skill over MCP, plus PR texts for the frameworks' own examples | [README](framework-templates/README.md) |
| [`jev/`](jev/) | **Decision layer** — typed skill routing, input guard, crisis router, the pm-decisions contracts, and the `pm-skills-jev-picker` npm package (TypeSafe Jev / System One; keyword fallback) | [README](jev/README.md) |

Each of these is a **discovery channel** with its own audience — a store listing, a launcher, or a marketplace — pointing back to the open-source project.
