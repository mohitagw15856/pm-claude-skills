#!/usr/bin/env node
// One-time: register the /pmskill slash command with your Discord application.
// Discord slash commands must be registered via the API before they appear.
//
// Usage:
//   DISCORD_APP_ID=xxx DISCORD_BOT_TOKEN=yyy node register-discord-command.mjs
//
// Find both in the Discord Developer Portal:
//   • Application ID → General Information
//   • Bot token      → Bot → Reset Token
//
// Registers globally (can take up to ~1 hour to propagate). To test instantly in
// one server, set DISCORD_GUILD_ID and it registers to that guild only.

const APP_ID = process.env.DISCORD_APP_ID;
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!APP_ID || !TOKEN) {
  console.error('Set DISCORD_APP_ID and DISCORD_BOT_TOKEN environment variables.');
  process.exit(1);
}

const command = {
  name: 'pmskill',
  description: 'Search the PM Skills library and get the best-matching skills',
  options: [
    {
      name: 'query',
      description: 'What you need — e.g. "launch plan", "board minutes", "churn"',
      type: 3, // STRING
      required: true,
    },
  ],
};

const url = GUILD_ID
  ? `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`
  : `https://discord.com/api/v10/applications/${APP_ID}/commands`;

const res = await fetch(url, {
  method: 'POST',
  headers: { Authorization: `Bot ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(command),
});

if (res.ok) {
  console.log(`✓ Registered /pmskill ${GUILD_ID ? `to guild ${GUILD_ID}` : 'globally'}.`);
} else {
  console.error(`✗ Failed (${res.status}):`, await res.text());
  process.exit(1);
}
