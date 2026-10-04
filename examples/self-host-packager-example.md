# Example: self-host-packager

## What this skill does

Packages a project for one-command self-hosting: docker-compose.yml, an explained .env.example, and SELF_HOSTING.md covering HTTPS, backups and upgrades, with all state in one folder.

## How to trigger it

### Example 1: Node and Postgres

**You say:**
> "Make my bookmarks app self-hostable. Node 22, Express on port 3000, Postgres, uploaded favicons on disk at ./uploads. Env: DATABASE_URL, SESSION_SECRET, SMTP_URL (optional)."

**Claude produces (excerpt):**

```yaml
services:
  app:
    image: ghcr.io/example/markly:1.4.2
    env_file: .env
    ports: ["127.0.0.1:3000:3000"]   # put a reverse proxy in front; see SELF_HOSTING.md
    volumes: ["./data/uploads:/app/uploads"]
    depends_on:
      db: { condition: service_healthy }
    restart: unless-stopped
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: markly
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: markly
    volumes: ["./data/db:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U markly"]
      interval: 5s
      retries: 10
    restart: unless-stopped
```

| Variable | Required? | Default | What it does | Example | Secret? |
|---|---|---|---|---|---|
| DB_PASSWORD | yes | none | Postgres password | `openssl rand -hex 24` | yes |
| SESSION_SECRET | yes | none | Signs login cookies | `openssl rand -hex 32` | yes |
| SMTP_URL | no | empty | Sends password resets; without it, resets are disabled | `smtp://user:pass@mail.example.com:587` | yes |

---

### Example 2: the backup section

**Claude produces (excerpt):**

```markdown
## Back up this folder and you have everything
Everything Markly stores is in `./data/` plus your `.env`. Back up both and you can rebuild
the install on any machine.

    docker compose exec db pg_dump -U markly markly > backup-$(date +%F).sql
    tar czf markly-files-$(date +%F).tgz data/uploads .env

Restore drill (do this once now, not on the day you need it):
1. On a spare machine, copy `.env`, start only the database, load the dump.
2. Unpack the files archive, start the app, and check that a known bookmark is there.
```

## Tips for best results

- List everything the app writes to disk; anything missed is lost in a migration.
- Mark which environment variables are secrets so the table says how to generate them.
- Run the smoke test on a fresh machine before publishing the guide.

## Related skills

- `licence-notice-auditor`: check bundled dependencies before publishing images.
- `demo-data-generator`: an optional seed for people trying the self-hosted version.
