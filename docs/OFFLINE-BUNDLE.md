# The offline bundle

One archive with everything the library is, for a laptop with no network, a locked-down desktop or an air-gapped team: every skill, every platform export, the typed pipelines and contracts, the browser playground with its built catalogue, and the Org Edition server. Nothing in it phones home.

## Get it

Each GitHub release carries `pm-skills-offline-<version>.tar.zst` and its `.sha256` as assets, attached by the **Release assets** workflow. Or build it yourself from a checkout:

```bash
node scripts/build-offline-bundle.mjs --zstd       # dist/pm-skills-offline-<version>.tar.zst (+ .sha256), about 33 MB
node scripts/build-offline-bundle.mjs              # .tar.gz instead
node scripts/build-offline-bundle.mjs --no-web     # skills and exports only, no playground or server
```

Check the download: `sha256sum -c pm-skills-offline-<version>.tar.zst.sha256`.

## Serve it

```bash
npx pm-claude-skills serve --bundle pm-skills-offline-83.2.0.tar.zst --port 8080
```

The bundle is unpacked once into `~/.pm-skills/offline/` and served from there: the playground at `http://localhost:8080`, the REST API under `/v1`, every skill readable and searchable. Reading `.tar.zst` needs Node 22.15 or newer; the `.tar.gz` build works on Node 18. On a machine without the CLI, unpack the archive and run `node org/server.mjs` inside it.

Model calls are the one thing that still needs a key or a local model (Ollama, LM Studio, llama.cpp): paste a skill's `SKILL.md` as the system prompt and ask. `OFFLINE-README.md` inside the archive repeats these steps for whoever receives the file.

## What is excluded

Per-skill SEO pages, ZIPs, videos, PDFs, images and the Chinese mirrors stay out, so the bundle is a download rather than a disk image. The Chinese intranet pack (`scripts/build-offline-pack.mjs`, a 40 MB zip with translations and a file-URL catalogue) is a separate artefact for a separate audience.
