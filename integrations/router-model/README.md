# pm-skills-router

A dependency-free skill router: request in, best-matching skills out, in English or Chinese. TF-IDF nearest centroid over each skill's trigger phrases (`dataset/routing.jsonl`), description and Simplified Chinese description. Standard-library Python only.

```bash
node scripts/build-dataset.mjs                                  # routing.jsonl
python3 integrations/router-model/pm_router.py train --repo . --out router.json
python3 integrations/router-model/pm_router.py route "帮我写周报" --model router.json
```

`train` prints a held-out evaluation (one trigger phrase per skill kept out of training) and a check on the Chinese inputs in `evals/cases.json`. The trained `router.json` (about 3.5 MB) is not committed: `.github/workflows/publish-modelscope-model.yml` rebuilds it on every release and publishes it, with `MODEL_CARD.md` filled in, to [ModelScope](https://www.modelscope.ai/models/mohitagw15856/pm-skills-router).
