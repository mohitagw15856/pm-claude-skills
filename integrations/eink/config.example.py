# Copy to config.py on the device and fill in. config.py is git-ignored on the
# device (it holds your Wi-Fi password); never commit real credentials.

WIFI_SSID = "your-network"
WIFI_PASS = "your-password"

# Public API + site — no key needed for the read endpoints.
API_BASE = "https://pm-skills-mcp.pm-claude-skills.workers.dev"
SITE = "https://mohitagw15856.github.io/pm-claude-skills"

# How often to wake and redraw. e-ink holds the image at zero power between
# refreshes, so long intervals are cheap. 6h is a good desk cadence.
REFRESH_SECONDS = 6 * 60 * 60

# "rotating"       → a different skill each calendar day (deterministic)
# "search:pricing" → pin a theme; shows the top match for that query
MODE = "rotating"
