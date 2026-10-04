---
name: self-host-packager
description: "Use when asked to make a project self-hostable, package an app for Docker, write a docker-compose setup, document self-hosting, or let users run my app on their own server. Produces a one-command self-host for a project: docker-compose.yml, a .env.example with a table explaining every variable, SELF_HOSTING.md covering HTTPS, backups and upgrades, and a back-up-this-folder section that tells users exactly what holds all their data."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/self-host-packager.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Self-Host Packager

Self-hosters will try a project if it starts with one command and they understand where their data lives. Most self-hosting guides fail at the second day: no HTTPS, no backup story, and an upgrade that breaks the database. This skill packages a project so it starts with `docker compose up -d`, keeps all state in one folder, and documents HTTPS, backups and upgrades.

## Required Inputs

Ask for these if not provided:
- **The project**: language, how it builds and starts, the port it listens on
- **State**: database (and which), uploaded files, caches, anything written to disk
- **Configuration**: environment variables the app reads, and which are secrets
- **External services**: email, object storage, OAuth providers, and whether each is optional
- **Target user**: a home-lab enthusiast, a small team, or a company's IT

## Output Structure

### 1. docker-compose.yml
A complete file with:
- the app service, built from the repo's Dockerfile or a published image with a pinned tag (never `latest`)
- the database service, if any, with a pinned major version and a health check
- `depends_on` with `condition: service_healthy`
- every piece of state mounted under one host folder, `./data/` (for example `./data/db`, `./data/uploads`)
- `restart: unless-stopped`
- the app bound to `127.0.0.1` by default, with a comment on exposing it behind a reverse proxy

If the project has no Dockerfile, include a multi-stage Dockerfile that runs as a non-root user.

### 2. .env.example and the variables table
The file with safe placeholder values, then a table:
| Variable | Required? | Default | What it does | Example | Secret? |

Every variable the app reads is listed. Secrets have no default and the table says how to generate one (for example `openssl rand -hex 32`).

### 3. SELF_HOSTING.md
Sections, in order:
1. **Requirements**: CPU, RAM and disk for a small install; Docker and Compose versions
2. **Start in one command**: copy `.env.example` to `.env`, fill the required values, `docker compose up -d`, and what to open in the browser
3. **HTTPS**: a reverse-proxy example (Caddy, which obtains certificates automatically), with the full config
4. **Back up this folder and you have everything**: states that `./data/` plus `.env` is the complete state; gives a backup command that stops writes or uses the database's dump tool, and a restore drill
5. **Upgrades**: read the release notes, back up, change the image tag, `docker compose pull && docker compose up -d`, and how to roll back
6. **Troubleshooting**: the five most likely failures with the log command and fix

### 4. Smoke test
Commands that prove a fresh install works: start, wait for health, hit the health endpoint, create one record, restart, and confirm the record survived.

## Quality Checks

- [ ] `docker compose up -d` with a filled `.env` is the only start command needed
- [ ] Every container image tag is pinned; none uses `latest`
- [ ] All state lives under one `./data/` folder, and the docs say so
- [ ] Every environment variable the app reads is in the table, with secrets marked
- [ ] The HTTPS section contains a complete, working reverse-proxy config
- [ ] The backup section includes a restore drill, not only a backup command
- [ ] The upgrade section includes a rollback step
- [ ] The smoke test confirms data survives a restart

## Anti-Patterns

- **State scattered across anonymous volumes.** Users cannot back up what they cannot find.
- **`latest` tags.** An upgrade happens by accident on the next pull.
- **Exposing the database port.** Only the app (behind the proxy) should be reachable.
- **Backups that are never restored.** An untested backup is a hope, not a backup.

## Example Trigger Phrases

- "Make my app self-hostable with Docker Compose."
- "Write a SELF_HOSTING.md with HTTPS, backups and upgrades."
- "Package this Node and Postgres project for home-lab users."
- "Give me a one-command self-host setup and an env var table."
