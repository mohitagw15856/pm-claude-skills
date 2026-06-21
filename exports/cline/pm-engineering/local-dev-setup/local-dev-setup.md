# Local Dev Setup Skill

Produce a complete local development environment setup guide for a service or project — walking a new engineer from zero (a clean laptop) to a working local environment with passing tests in under 30 minutes. A good setup guide reduces onboarding time, prevents the "it works on my machine" problem, and lets engineers make their first contribution with confidence. Write every step as a concrete command or action — not a description of what needs to happen.

## Required Inputs

Ask for these if not already provided:
- **Service name** and what it does
- **Tech stack** — language, framework, database, cache, message queue, and any external services
- **Dependencies** — databases, caches, message queues, and external services (mocked or real)
- **Test framework** — how tests are run and what the test suite covers
- **CI/CD platform** — GitHub Actions, CircleCI, Jenkins, etc. (for context on what "passing CI" means locally)

## Output Format

---

# Local Development Setup: [Service Name]

**Tech stack:** [Language + version] | [Framework] | [Database] | [Cache]
**Estimated setup time:** [20–30 minutes] on a clean machine
**Last verified:** [Date] on [macOS Ventura 13.x / Ubuntu 22.04]
**Questions?** Ask in [Slack: #[team-channel]] or ping [@tech-lead-handle]

> **First contribution?** Complete setup first (this doc), then read [CONTRIBUTING.md] for code standards and PR process.

---

## Prerequisites

Install these tools before starting. The versions listed are the minimum required — newer patch versions are fine, newer major versions may have compatibility issues.

### Required Tools

| Tool | Required version | Install |
|---|---|---|
| [Git] | 2.x+ | Pre-installed on most systems; or `brew install git` |
| [Language runtime — e.g. Go] | [1.22+] | [https://go.dev/dl/ or `brew install go`] |
| [Docker] | 24.x+ | [https://docs.docker.com/get-docker/] |
| [Docker Compose] | 2.x+ | Included with Docker Desktop; or `brew install docker-compose` |
| [Make] | Any | Pre-installed on macOS/Linux |
| [Tool — e.g. Node.js] | [20.x+] | [`brew install node` or https://nodejs.org] |
| [Tool — e.g. psql client] | [15+] | `brew install postgresql@15` (client only) |

### Optional but Recommended

| Tool | Purpose | Install |
|---|---|---|
| [direnv] | Auto-load `.envrc` environment variables | `brew install direnv` + [setup instructions](https://direnv.net) |
| [jq] | Pretty-print JSON in terminal | `brew install jq` |
| [k9s] | Kubernetes cluster UI (if using K8s locally) | `brew install k9s` |
| [mkcert] | Local HTTPS certificates | `brew install mkcert` |

### Required Accounts and Access

Before starting, make sure you have:
- [ ] GitHub access to [org/repo] — request via [access request process / Slack: #it-help]
- [ ] [AWS / GCP / Azure] account with [dev environment] access — request via [process]
- [ ] [Internal tool — e.g. 1Password] for retrieving development secrets — request via [process]
- [ ] [VPN access] if required to reach internal services — request via [process]

---

## 1. Repository Setup

```bash
# Clone the repository
git clone git@github.com:[org]/[repo-name].git
cd [repo-name]

# Install git hooks (required — enforces commit message format and runs pre-commit checks)
make install-hooks
# Or manually:
# cp scripts/hooks/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

# Verify your git setup
git config user.name   # should be your name
git config user.email  # should be your work email
```

**If you see a permission denied error on clone:** Your SSH key is not added to GitHub. Follow [GitHub's SSH key guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) or use HTTPS with a personal access token instead.

---

## 2. Environment Variables

The service requires environment variables for configuration. **Never commit actual secrets to the repository.**

### Step 1 — Copy the example file

```bash
cp .env.example .env.local
```

### Step 2 — Fill in the values

Open `.env.local` in your editor. Below is a description of every variable and where to get its value:

| Variable | Description | Where to get it | Example (not real) |
|---|---|---|---|
| `APP_ENV` | Environment name | Set to `development` | `development` |
| `APP_PORT` | Port the service listens on | Set to `8080` for local | `8080` |
| `DATABASE_URL` | PostgreSQL connection string | Use value from Docker Compose (Section 3) | `postgres://app:password@localhost:5432/[service]_dev` |
| `REDIS_URL` | Redis connection string | Use value from Docker Compose | `redis://localhost:6379` |
| `SECRET_KEY` | Application secret key | Generate with: `openssl rand -hex 32` | `[random 64-char hex]` |
| `[EXTERNAL_SERVICE]_API_KEY` | API key for [External Service] | Retrieve from [1Password vault: "Dev API Keys"] or ask [name] | — |
| `[EXTERNAL_SERVICE]_BASE_URL` | Base URL for [External Service] | Use sandbox URL: `https://sandbox.[external-service].com` | `https://sandbox.stripe.com` |
| `LOG_LEVEL` | Logging verbosity | Set to `debug` for local development | `debug` |
| `[FEATURE_FLAG_SDK_KEY]` | Feature flag platform SDK key | Retrieve from [LaunchDarkly/Split dev project] | — |

**Using direnv (recommended):** Rename `.env.local` to `.envrc`, add `dotenv` at the top, and run `direnv allow`. Variables will load automatically when you `cd` into the project.

---

## 3. Local Service Dependencies

All infrastructure dependencies run in Docker Compose. You do not need to install PostgreSQL, Redis, or Kafka locally.

```bash
# Start all dependencies (PostgreSQL, Redis, and any other services)
docker compose up -d

# Verify all containers are healthy
docker compose ps
# Expected output: all services show "healthy" status

# View logs if something is not healthy
docker compose logs [service-name]
```

### What Docker Compose Starts

| Service | Port | Purpose | Health check |
|---|---|---|---|
| PostgreSQL [version] | `5432` | Primary database | `pg_isready -U app` |
| Redis [version] | `6379` | Cache and session store | `redis-cli ping` |
| [Kafka + Zookeeper] | `9092` / `2181` | Message queue | `kafka-topics.sh --list` |
| [Mock server — e.g. WireMock] | `8089` | Mocks for external APIs in tests | `curl localhost:8089/__admin` |
| [LocalStack] | `4566` | AWS service emulation (S3, SQS, etc.) | `aws --endpoint-url=http://localhost:4566 s3 ls` |

**If a container exits immediately:** See Troubleshooting section — common causes are port conflicts and Docker memory limits.

### Stopping Dependencies

```bash
# Stop containers (preserves data volumes)
docker compose stop

# Stop and remove containers (clears data — use when you want a fresh start)
docker compose down -v
```

---

## 4. Install Dependencies and Build

```bash
# Install language dependencies
# Go:
go mod download

# Node.js:
npm install   # or: yarn install / pnpm install

# Python:
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt

# Verify build compiles cleanly
make build
# Expected: no errors; binary or compiled output in [./bin/ or ./dist/]
```

---

## 5. Database Setup and Seeding

```bash
# Run database migrations (creates tables and schema)
make db-migrate
# Or directly:
# [Migration command — e.g. "go run ./cmd/migrate up" or "alembic upgrade head" or "npm run db:migrate"]

# Verify migrations applied
# psql $DATABASE_URL -c "\dt"  # should list all tables

# Seed the database with development data
make db-seed
# Or directly:
# [Seed command — e.g. "go run ./cmd/seed" or "python scripts/seed.py" or "npm run db:seed"]

# Verify seed data is present
# psql $DATABASE_URL -c "SELECT COUNT(*) FROM [primary-table]"
# Expected: [N] rows
```

**What the seed creates:**
- [N] test user accounts (credentials in [scripts/seed/README.md or .env.example])
- [N] sample [resources] for development and testing
- Admin account: `[admin@example.com]` / password: see `.env.example` for dev password variable

**To reset to a clean state:**
```bash
docker compose down -v   # wipe database volume
docker compose up -d     # start fresh
make db-migrate
make db-seed
```

---

## 6. Running the Service

```bash
# Run the service locally
make run
# Or directly:
# [Run command — e.g. "go run ./cmd/server" or "python app.py" or "npm run dev"]

# Expected output:
# [Example of healthy startup log lines — e.g.:]
# {"level":"info","message":"Database connected","host":"localhost","port":5432}
# {"level":"info","message":"Redis connected","host":"localhost","port":6379}
# {"level":"info","message":"Server listening","port":8080}
```

### Verify It's Working

```bash
# Health check
curl http://localhost:8080/health
# Expected: {"status":"ok","version":"[git-sha]"}

# Test a key endpoint (authenticated)
# First, get a dev token:
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"[dev-user-from-seed]@example.com","password":"[dev-password-from-env]"}'
# Copy the token from the response, then:

curl http://localhost:8080/api/v1/[resource] \
  -H "Authorization: Bearer [token-from-above]"
# Expected: 200 with JSON response
```

### Hot Reload (for Development)

```bash
# Run with hot reload — service restarts automatically on file changes
make run-dev
# Or:
# [Hot reload command — e.g. "air" for Go / "uvicorn --reload" for Python / "npm run dev" for Node]
```

---

## 7. Running Tests

```bash
# Run the full test suite
make test
# Or:
# [Test command — e.g. "go test ./..." or "pytest" or "npm test"]

# Run tests with coverage report
make test-coverage
# Coverage report: [./coverage.html or stdout]

# Run a specific test file or test case
# Go: go test ./pkg/[package]/... -run TestFunctionName
# Python: pytest tests/test_[module].py::TestClass::test_method -v
# Node: npm test -- --testPathPattern=[filename]

# Run only unit tests (fast — no external dependencies)
make test-unit

# Run only integration tests (requires Docker Compose dependencies running)
make test-integration
```

**Expected test results:**
- Unit tests: [N] tests, all pass, [<30] seconds
- Integration tests: [N] tests, all pass, [<2] minutes
- Coverage: [≥80]% (enforced in CI — tests fail below this threshold)

**Before pushing a PR, always run:**
```bash
make lint      # code linting — must pass
make test      # full test suite — must pass
make build     # verify compilation — must pass
```

---

## 8. IDE Setup

### VS Code (Recommended)

Install the recommended extensions (VS Code will prompt you automatically):

```json
// .vscode/extensions.json — already in the repository
{
  "recommendations": [
    "[language-extension — e.g. golang.go]",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker",
    "eamodio.gitlens"
  ]
}
```

Workspace settings are in `.vscode/settings.json` — format on save is enabled, linter is configured automatically.

**[Language]-specific setup:**
```
[e.g. Go: The gopls language server is installed automatically by the Go extension.
 Run "Go: Install/Update Tools" from the command palette after installing the extension.]
```

### JetBrains (IntelliJ / GoLand / PyCharm / WebStorm)

- Open the project root as the project directory
- [Language SDK]: set to [version] — File → Project Structure → SDKs
- Run configurations are checked into `.idea/runConfigurations/` — they appear automatically
- Enable "Run formatters on save" in Settings → Tools → Actions on Save

---

## 9. Common Gotchas and Troubleshooting

### Docker container exits immediately on startup

**Symptom:** `docker compose ps` shows a container as `Exited (1)` seconds after starting.

```bash
# Check the container logs for the error
docker compose logs [container-name]

# Common causes:
# 1. Port already in use — find and kill the conflicting process:
lsof -ti tcp:[port] | xargs kill -9

# 2. Docker doesn't have enough memory — allocate at least 4GB in Docker Desktop:
# Docker Desktop → Settings → Resources → Memory → 4GB

# 3. M1/M2 Mac architecture mismatch — add platform directive to docker-compose.yml:
# platform: linux/amd64
```

### Database connection refused

**Symptom:** Service fails to start with "connection refused" or "dial tcp localhost:5432: connect: connection refused"

```bash
# Is PostgreSQL actually running?
docker compose ps postgres
# If not running: docker compose up -d postgres

# Is it on the right port?
lsof -i :5432

# Can you connect manually?
psql postgres://app:password@localhost:5432/[service]_dev -c "SELECT 1"

# If using a custom DATABASE_URL, verify it matches the docker-compose.yml settings exactly
```

### Migrations fail with "relation already exists"

**Symptom:** `make db-migrate` errors with "ERROR: relation [table] already exists"

```bash
# Check current migration state
[migration status command — e.g. "go run ./cmd/migrate status" or "alembic current"]

# The database may be in a partial state — reset it:
docker compose down -v
docker compose up -d
make db-migrate  # should now succeed on a clean database
```

### Tests fail with "connection refused" or dependency errors

**Symptom:** Integration tests fail because they cannot connect to PostgreSQL or Redis.

```bash
# Integration tests need Docker Compose running
docker compose up -d

# Verify all containers are healthy before running tests
docker compose ps   # all should show "healthy"

# If containers are running but tests still fail, check environment variables:
make test-integration  # should pick up .env.local automatically
# If not: source .env.local && make test-integration
```

### `make lint` fails on a fresh checkout

**Symptom:** Lint errors on files you have not modified.

```bash
# Formatting issue — auto-fix with:
# Go:
gofmt -w .
goimports -w .

# Python:
black .
isort .

# Node/TypeScript:
npm run lint:fix
# Or: npx eslint --fix . && npx prettier --write .

# Re-run lint to confirm
make lint
```

### Environment variables not loading

**Symptom:** Service starts but immediately fails with "missing required environment variable: [VAR]"

```bash
# Verify .env.local exists and has all required variables
cat .env.local | grep "^[A-Z]" | awk -F= '{print $1}'

# Compare against required variables in .env.example
diff <(grep "^[A-Z_]*=" .env.example | cut -d= -f1 | sort) \
     <(grep "^[A-Z_]*=" .env.local | cut -d= -f1 | sort)

# Missing variables are shown in left column only (< prefix)
```

---

## 10. First Contribution Checklist

Before opening your first pull request, verify:

**Setup complete:**
- [ ] `make build` passes with no errors
- [ ] `make test` passes — all tests green
- [ ] `make lint` passes — no lint errors
- [ ] Service starts and health check returns 200
- [ ] You can authenticate and call at least one API endpoint

**Git and GitHub:**
- [ ] You have read [CONTRIBUTING.md] — code standards, commit message format, PR process
- [ ] Your git user.name and user.email are set correctly
- [ ] Pre-commit hooks are installed (`ls .git/hooks/pre-commit` should exist)
- [ ] You have branched from `main` (not committing directly to main)

**Development workflow:**
- [ ] You know how to run a specific test: `[test command for single test]`
- [ ] You know how to reset the database: `docker compose down -v && docker compose up -d && make db-migrate && make db-seed`
- [ ] You have joined [Slack: #[team-channel]] and [#[service-consumers-channel] if applicable]
- [ ] You have read the [architecture overview doc / README] — you understand what this service does

**First PR:**
- [ ] Changes are small and focused — one logical change per PR
- [ ] Tests are added or updated for your change
- [ ] `make test && make lint && make build` all pass locally before requesting review
- [ ] PR description explains what changed and why (use the [pr-description-writer skill] if needed)

---

## Quality Checks

- [ ] A new engineer with no prior knowledge of the project can follow this guide from start to finish without asking anyone for help
- [ ] Every command is tested on a clean environment — not written from memory and assumed to work
- [ ] Environment variables table covers every variable in `.env.example` — no undocumented variables
- [ ] The troubleshooting section covers the 5 most common real failures observed during onboarding — not theoretical issues
- [ ] Docker Compose version and Docker Desktop memory requirements are stated explicitly
- [ ] "Expected output" is shown for key commands so engineers know whether a step succeeded
- [ ] Setup time estimate is honest — verified by timing a real onboarding session, not estimated

## Anti-Patterns

- [ ] Do not write setup steps from memory without testing them on a clean machine — steps that skip implicit knowledge break for new engineers
- [ ] Do not leave environment variables undocumented — every variable in .env.example must appear in the Variables table with a description and source
- [ ] Do not write troubleshooting entries for theoretical issues — only include problems that have actually occurred during real onboarding sessions
- [ ] Do not assume Docker Desktop is configured correctly — memory limits and platform (M1/M2) compatibility must be explicitly called out
- [ ] Do not omit expected output for key commands — without "expected output", engineers cannot tell whether a step succeeded or silently failed
