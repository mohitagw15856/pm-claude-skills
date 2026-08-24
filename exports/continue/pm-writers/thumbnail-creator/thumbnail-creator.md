---
name: "Generate article or newsletter thumbnail candidates using Ge"
description: "Generate article or newsletter thumbnail candidates using Gemini or the optional Atlas Cloud provider from inside Claude Code. Claude reads article copy, proposes composition concepts, writes image generation prompts incorporating brand specs, generates the images after approval, evaluates the results via computer vision, and returns ranked candidates with rationale. Use when asked to create thumbnails, generate cover images, or produce visual candidates for an article or newsletter."
---

# Thumbnail Creator Skill

Generates article and newsletter thumbnail candidates by acting as an image-generation agent inside Claude Code. Gemini remains the default provider; Atlas Cloud is an explicit opt-in for teams that already use it. The skill handles the full loop: read the copy, propose compositions, write tailored prompts, generate approved candidates, evaluate the outputs, and return ranked results with brief rationale.

The output is production-ready thumbnail candidates you can drop directly into your CMS, newsletter tool, or social scheduler.

---

## Prerequisites

Choose a provider, then make sure the matching key and the script are available.

### 1. Provider API key

Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey).

Set it as an environment variable:

```bash
export GEMINI_API_KEY="your-key-here"
```

To persist it across sessions, add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

Atlas Cloud is optional. To select it for a run:

```bash
export IMAGE_PROVIDER="atlas-cloud"
export ATLASCLOUD_API_KEY="your-key-here"
```

Never print either key. Verify presence without revealing the value:

```bash
test -n "${GEMINI_API_KEY:-}" && echo "Gemini key is set"
test -n "${ATLASCLOUD_API_KEY:-}" && echo "Atlas Cloud key is set"
```

### 2. generate_image.py Script

This script must exist at `./generate_image.py` in the project root. The full template is provided in the Script Template section below. Claude will check for it and offer to create it if missing.

**Python dependencies:**

```bash
pip install google-generativeai Pillow
```

Or with uv:

```bash
uv pip install google-generativeai Pillow
```

---

## Required Inputs

Claude will ask for these if not provided:

| Input | Required | Notes |
|---|---|---|
| Article copy or URL | Yes | Paste the full article text, or provide a URL to fetch. Used to extract themes, hooks, and key claims for composition. |
| Brand colours | Recommended | Hex codes or descriptive names. E.g. `#1A1A2E` (navy), `#E94560` (coral). If not provided, Claude uses clean neutral defaults. |
| Fonts / type style | Recommended | E.g. "bold sans-serif", "editorial serif", "Neue Haas Grotesk". Used in prompt to guide text treatment. |
| Style reference description | Recommended | E.g. "flat illustration, minimal, like Stripe's marketing site" or "photorealistic, dark background, high contrast". A style image URL can also be provided. |
| Output dimensions | No | Defaults to `1792x1024` (landscape, standard article thumbnail). Options: `1024x1024` (square), `1024x1792` (portrait/mobile). |
| Number of candidates | No | Defaults to 4. Min 1, max 8 (API limits and cost). |
| Image provider | No | Defaults to `gemini`. Use `atlas-cloud` only when the user explicitly chooses it and has `ATLASCLOUD_API_KEY`. |
| Article title (if different from H1) | No | Used as the primary text element in image prompts. |
| Candidate selection | No | After proposing compositions, Claude asks which to generate. User can say "all" or pick by number. |

---

## Output Structure

### Phase 1 — Composition Proposals (text, before any API calls)

Claude presents 3-4 composition concepts for user approval. Format:

```
Composition Concepts for: "[Article Title]"

1. BOLD CLAIM
   Layout:    Full-bleed dark background, large white headline centred, 
              single accent data point (e.g. "3x faster") in brand colour below
   Mood:      High authority, newsletter-style
   Best for:  LinkedIn, Substack headers
   Rationale: The article's central claim ("X outperforms Y by 3x") is specific 
              enough to anchor the visual — readers stop on data.

2. CONCEPTUAL OBJECT
   Layout:    Central object illustration (e.g. a broken clock for a time-waste article), 
              title in upper third, minimal texture background
   Mood:      Editorial, Medium-style
   Best for:  Blog header, Medium cover, email preheader
   Rationale: Gives art directors visual metaphor flexibility; works across sizes.

3. CONTRAST SPLIT
   Layout:    Left half brand colour, right half white or image, 
              title on colour side, supporting subtext on white side
   Mood:      Clean, professional, startup-brand feel
   Best for:  Newsletter, LinkedIn carousel first slide
   Rationale: Split layout performs consistently in newsletter A/B tests; 
              text is readable at small sizes.

4. TYPOGRAPHIC ONLY
   Layout:    No illustration, oversized title treatment, 
              author name in small caps at bottom, thin rule separator
   Mood:      Premium, confident, editorial
   Best for:  Substack, Ghost, high-density email lists
   Rationale: Works when the brand has strong type identity. Fastest to produce.

Which compositions do you want generated? (Reply with numbers, e.g. "1, 3" or "all")
```

### Phase 2 — Generated Image Files

After generation, Claude saves files to `./thumbnails/[article-slug]/`:

```
thumbnails/
└── article-slug-from-title/
    ├── candidate_01_bold_claim.png
    ├── candidate_02_conceptual_object.png
    ├── candidate_03_contrast_split.png
    ├── candidate_04_typographic.png
    └── evaluation_report.md
```

### Phase 3 — Evaluation Summary Table

Claude evaluates each returned image via computer vision and produces:

```
Thumbnail Evaluation — "[Article Title]"
Generated: 2026-05-27  |  Provider / model: Gemini / Imagen 3  |  Dimensions: 1792x1024

| # | Candidate | Composition | Brand Fit /10 | Text Legibility /10 | Recommendation |
|---|---|---|---|---|---|
| 1 | candidate_01_bold_claim.png | Bold Claim | 9 | 8 | ★ Top pick — strong data anchor, brand colours correct, title readable at 200px width |
| 2 | candidate_02_conceptual_object.png | Conceptual Object | 7 | 9 | Good fallback — legible, clean, but illustration style drifted slightly from brand |
| 3 | candidate_03_contrast_split.png | Contrast Split | 8 | 7 | Works well at full size; test at thumbnail size before publishing — right side text tightens |
| 4 | candidate_04_typographic.png | Typographic | 9 | 10 | Strongest for email — zero brand drift risk, completely text-based |

Recommended for web:          candidate_01_bold_claim.png
Recommended for email/mobile: candidate_04_typographic.png
Recommended for social:       candidate_03_contrast_split.png

Files saved to: ./thumbnails/article-slug-from-title/
```

---

## How Claude Should Execute This Skill

### Step 1 — Ingest and analyse the article

Accept article copy as pasted text or a URL.

If a URL is provided, fetch the page and extract:
- The H1 title
- The first 3-5 paragraphs (the hook, central claim, and key points)
- Any notable statistics or named frameworks mentioned
- The author name (for typographic compositions)

If text is pasted, read it directly. Focus on:
- **The hook:** What is the opening claim or tension?
- **The central thesis:** What is the one thing the article argues or teaches?
- **Key specifics:** Any numbers, named frameworks, or concrete examples that could anchor a visual
- **Tone:** Is this formal/authoritative, conversational/accessible, provocative/challenge-based?

Summarise these findings internally before proposing compositions — the proposals should feel tailored to this specific article, not generic.

### Step 2 — Collect brand specs

Ask the user for brand specs if not provided:

```
To generate on-brand thumbnails, I need a few details:

1. Brand colours (hex codes or descriptions) — e.g. #1A1A2E, #E94560
2. Font style preference — e.g. "bold sans-serif", "editorial serif", "geometric"
3. Visual style — e.g. "flat minimal", "photorealistic", "illustrated", "typographic only"
4. Any style references — describe a brand or publication whose aesthetic you want to match, 
   or share an image URL

If you don't have brand specs yet, say "use clean defaults" and I'll use a professional 
dark-on-white editorial style.
```

If the user says "use clean defaults", apply:
- Background: `#FFFFFF` or `#0F0F0F` (dark mode default)
- Accent: `#2563EB` (blue)
- Font style: bold geometric sans-serif
- Style: minimal flat, no textures, high contrast

### Step 3 — Propose composition concepts

Write 3-4 composition concepts tailored to the article's tone and content. Each concept must:
- Have a name (short, memorable label)
- Describe the layout precisely (where title goes, what visual element anchors it, background treatment)
- Note the mood and the use case it's best suited for
- Include a rationale sentence explaining why this composition fits this specific article

After presenting the concepts, ask which to generate. Wait for user confirmation before making any API calls.

### Step 4 — Write image generation prompts

For each selected composition, write a detailed image generation prompt. Image generation prompts follow a different grammar than text prompts — they are descriptive, not instructional.

**Prompt structure:**
```
[Subject/composition] + [Style] + [Colour palette] + [Mood/lighting] + 
[Text treatment if any] + [What to avoid]
```

**Example prompt for Bold Claim composition:**
```
Article thumbnail image. Large bold white sans-serif headline text reading "3x Faster Than 
Traditional Methods" centred on a deep navy blue background (#1A1A2E). Small coral accent 
text (#E94560) below reading the subtitle. Minimal flat design, no gradients, no stock photo 
elements, no people. Clean professional editorial style, high contrast, newsletter header 
format, 16:9 landscape orientation. The composition is typographic — text is the hero, 
no illustration required. Avoid: clip art, drop shadows, low contrast, crowded layout.
```

**Prompt rules:**
- Include exact hex colours when brand colours are provided
- Specify the exact headline text to appear in the image
- Name the style explicitly ("flat design", "editorial", "photorealistic")
- Add a negative prompt ("Avoid: ...") at the end to reduce drift from brand style
- Keep prompts under 300 words — longer prompts do not reliably produce better outputs

### Step 5 — Check prerequisites and run the generation script

Before calling the API, verify:

```bash
# Check the selected provider key without printing it
if [ "${IMAGE_PROVIDER:-gemini}" = "atlas-cloud" ]; then
  test -n "${ATLASCLOUD_API_KEY:-}" && echo "Atlas Cloud key is set"
else
  test -n "${GEMINI_API_KEY:-}" && echo "Gemini key is set"
fi

# Check script exists
ls -la ./generate_image.py

# Check common dependency; Gemini also needs google-generativeai
python3 -c "import PIL; print('Pillow OK')"
```

If the script is missing, offer to create it using the template in the Script Template section below.

Run the generation script for each prompt:

```bash
python3 generate_image.py \
  --provider "${IMAGE_PROVIDER:-gemini}" \
  --prompt "your full prompt here" \
  --output "./thumbnails/article-slug/candidate_01_bold_claim.png" \
  --width 1792 \
  --height 1024
```

Or pass all prompts in a batch config file:

```bash
python3 generate_image.py \
  --provider "${IMAGE_PROVIDER:-gemini}" \
  --config ./thumbnails/article-slug/prompts.json
```

The Atlas Cloud path targets `google/nano-banana-2-lite/text-to-image`. Before changing that model in the template, fetch the current Atlas Cloud model catalog and the replacement model's schema, then update the request fields to match it.

### Step 6 — Evaluate generated images

After each image is saved, examine it using computer vision. Evaluate on two dimensions:

**Brand Fit (score /10):**
- Are the brand colours correct? (1-2 points each)
- Does the style match the requested aesthetic? (2 points)
- Is the layout consistent with the composition brief? (2 points)
- Are there any AI artefacts, distorted text, or unintended elements? (-1 per issue)

**Text Legibility (score /10):**
- Is the headline text readable at full resolution? (3 points)
- Is the headline text readable when the image is scaled to 300px wide (thumbnail size)? (3 points)
- Is there sufficient contrast between text and background? (2 points)
- Is the text placement within safe zones (not cut off at edges)? (2 points)

Note: image models can render text with spelling errors or distorted letterforms. If this happens, note it in the evaluation and suggest the user add the text overlay manually in Canva or Figma.

### Step 7 — Produce the evaluation report

Write the evaluation summary table (format shown in Output Structure section) and save it as `evaluation_report.md` in the output folder.

Include:
- One-line rationale for each score
- A top pick recommendation per use case (web, email/mobile, social)
- Any production notes (e.g. "text rendering is imperfect on candidate_02 — overlay text manually")
- The provider, model, and full prompts used, so the user can reproduce or iterate on the run

### Step 8 — Offer iteration

After delivering the candidates, offer one iteration pass:

```
Want me to iterate on any of these?

Options:
- Adjust colours or style on a specific candidate
- Try a different composition concept
- Change the headline text
- Rerun with supported parameters for the selected provider
- Generate additional variants of the top pick

Just tell me what to change.
```

---

## Script Template

Claude should offer to write this file if `generate_image.py` is not present. This is the canonical template to use.

```python
#!/usr/bin/env python3
"""
generate_image.py — Gemini/Atlas Cloud wrapper for Thumbnail Creator skill.

Gemini is the default. Atlas Cloud is used only with --provider atlas-cloud.

Usage:
    python3 generate_image.py --prompt "..." --output "./out.png"
    python3 generate_image.py --provider atlas-cloud --prompt "..." --output "./out.png"
    python3 generate_image.py --config ./prompts.json

Config JSON format:
    [
      {
        "prompt": "...",
        "output": "./thumbnails/slug/candidate_01.png",
        "width": 1792,
        "height": 1024,
        "provider": "gemini"
      }
    ]

Requirements:
    pip install google-generativeai Pillow
"""

import argparse
import io
import json
import os
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install Pillow")
    sys.exit(1)


ATLAS_API_BASE = "https://api.atlascloud.ai/api/v1"
ATLAS_DEFAULT_MODEL = "google/nano-banana-2-lite/text-to-image"


def get_api_key(provider: str) -> str:
    env_name = "ATLASCLOUD_API_KEY" if provider == "atlas-cloud" else "GEMINI_API_KEY"
    key = os.environ.get(env_name, "")
    if not key:
        print(f"ERROR: {env_name} environment variable is not set.")
        sys.exit(1)
    return key


def aspect_ratio_for(width: int, height: int) -> str:
    ratio = width / height
    if abs(ratio - 16 / 9) < 0.1:
        return "16:9"
    if abs(ratio - 1.0) < 0.1:
        return "1:1"
    if abs(ratio - 9 / 16) < 0.1:
        return "9:16"
    return "16:9"


def save_png(image_bytes: bytes, output_path: str, width: int, height: int) -> None:
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    image = Image.open(io.BytesIO(image_bytes))
    if image.size != (width, height):
        image = image.resize((width, height), Image.LANCZOS)
    image.save(output_path, format="PNG", optimize=True)
    print(f"  Saved: {output_path} ({image.size[0]}x{image.size[1]})")


def generate_with_gemini(prompt: str, output_path: str, width: int, height: int) -> bool:
    try:
        import google.generativeai as genai
    except ImportError:
        print("ERROR: google-generativeai not installed. Run: pip install google-generativeai")
        return False

    try:
        genai.configure(api_key=get_api_key("gemini"))
        imagen_model = genai.ImageGenerationModel("imagen-3.0-generate-002")
        result = imagen_model.generate_images(
            prompt=prompt,
            number_of_images=1,
            aspect_ratio=aspect_ratio_for(width, height),
            safety_filter_level="block_only_high",
            person_generation="allow_adult",
        )
        if not result.images:
            print(f"  No images returned for: {output_path}")
            return False

        image_data = result.images[0]
        if hasattr(image_data, "_image_bytes"):
            image_bytes = image_data._image_bytes
        elif hasattr(image_data, "image"):
            image_bytes = image_data.image
        else:
            image_bytes = bytes(image_data)
        save_png(image_bytes, output_path, width, height)
        return True
    except Exception as exc:
        print(f"  ERROR generating image with Gemini: {exc}")
        return False


def atlas_request(url: str, api_key: str, method: str = "GET", payload=None):
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )
    with urlopen(request, timeout=50) as response:
        return json.loads(response.read().decode("utf-8"))


def generate_with_atlas(
    prompt: str,
    output_path: str,
    width: int,
    height: int,
) -> bool:
    api_key = get_api_key("atlas-cloud")
    payload = {
        "model": ATLAS_DEFAULT_MODEL,
        "prompt": prompt,
        "aspect_ratio": aspect_ratio_for(width, height),
        "resolution": "1k",
    }

    try:
        # Generation submission is deliberately attempted exactly once.
        submitted = atlas_request(
            f"{ATLAS_API_BASE}/model/generateImage",
            api_key,
            method="POST",
            payload=payload,
        )
        prediction_id = submitted["data"]["id"]
        print(f"  Atlas Cloud task submitted: {prediction_id}")
    except (HTTPError, URLError, KeyError, ValueError) as exc:
        print(f"  ERROR submitting Atlas Cloud generation: {exc}")
        return False

    delay = 2.0
    for _ in range(40):
        time.sleep(delay)
        try:
            result = atlas_request(
                f"{ATLAS_API_BASE}/model/prediction/{prediction_id}",
                api_key,
            )["data"]
        except HTTPError as exc:
            if exc.code != 429 and exc.code < 500:
                print(f"  ERROR polling Atlas Cloud generation: HTTP {exc.code}")
                return False
            delay = min(delay * 1.5, 10.0)
            continue
        except (URLError, KeyError, ValueError):
            delay = min(delay * 1.5, 10.0)
            continue

        status = result.get("status", "unknown")
        if status in {"completed", "succeeded"}:
            outputs = result.get("outputs") or result.get("output") or []
            if isinstance(outputs, str):
                outputs = [outputs]
            if not outputs:
                print("  ERROR: Atlas Cloud completed without an output URL")
                return False
            try:
                with urlopen(outputs[0], timeout=50) as response:
                    save_png(response.read(), output_path, width, height)
                return True
            except (HTTPError, URLError, OSError) as exc:
                print(f"  ERROR downloading Atlas Cloud output: {exc}")
                return False
        if status in {"failed", "canceled", "cancelled"}:
            print(f"  ERROR: Atlas Cloud generation ended with status {status}")
            return False

        delay = min(delay * 1.25, 10.0)

    print("  ERROR: Atlas Cloud generation timed out")
    return False


def generate_image(
    prompt: str,
    output_path: str,
    width: int = 1792,
    height: int = 1024,
    provider: str = "gemini",
) -> bool:
    if provider == "atlas-cloud":
        return generate_with_atlas(prompt, output_path, width, height)
    return generate_with_gemini(prompt, output_path, width, height)


def run_from_args():
    parser = argparse.ArgumentParser(description="Image generation wrapper for thumbnails")
    parser.add_argument("--prompt", type=str, help="Image generation prompt")
    parser.add_argument("--output", type=str, help="Output file path (.png)")
    parser.add_argument("--width", type=int, default=1792, help="Image width in pixels")
    parser.add_argument("--height", type=int, default=1024, help="Image height in pixels")
    parser.add_argument("--config", type=str, help="JSON config file with batch of prompts")
    parser.add_argument(
        "--provider",
        choices=("gemini", "atlas-cloud"),
        default=os.environ.get("IMAGE_PROVIDER", "gemini"),
    )
    args = parser.parse_args()

    if args.config:
        with open(args.config, "r", encoding="utf-8") as config_file:
            items = json.load(config_file)
        print(f"Batch mode: {len(items)} image(s) to generate")
        results = []
        for index, item in enumerate(items, start=1):
            print(f"\n[{index}/{len(items)}] Generating: {item['output']}")
            ok = generate_image(
                prompt=item["prompt"],
                output_path=item["output"],
                width=item.get("width", 1792),
                height=item.get("height", 1024),
                provider=item.get("provider", args.provider),
            )
            results.append({"output": item["output"], "ok": ok})

        print(f"\nBatch complete: {sum(r['ok'] for r in results)}/{len(results)} succeeded")
        for result in results:
            status = "OK " if result["ok"] else "ERR"
            print(f"  {status}  {result['output']}")

    elif args.prompt and args.output:
        print(f"Generating with {args.provider}: {args.output}")
        ok = generate_image(
            prompt=args.prompt,
            output_path=args.output,
            width=args.width,
            height=args.height,
            provider=args.provider,
        )
        if ok:
            print("Done.")
        else:
            print("Failed.")
            sys.exit(1)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    run_from_args()
```

**To create this file from inside Claude Code:**
```bash
# Claude will write this file if it doesn't exist:
ls ./generate_image.py || echo "Script missing — Claude will create it"
```

---

## Prompt Writing Reference

Claude should use this reference when writing image generation prompts. These patterns are provider-neutral and should be adjusted to the selected model's supported parameters.

### Composition patterns

| Composition type | Prompt anchor phrase |
|---|---|
| Text-led, dark background | "Bold white sans-serif headline text on deep [colour] background, minimal flat design" |
| Text-led, light background | "High-contrast black headline text on clean white background, editorial layout" |
| Object/illustration centred | "Centred [object] illustration, [style], [colour] background, title text in upper third" |
| Split layout | "Vertical split: left half [colour], right half white. Headline on left side, supporting text on right" |
| Photography style | "Photorealistic [scene description], [mood] lighting, [colour] colour grade, text overlay area at [position]" |

### Style modifiers

- `flat design, no gradients` — clean vector-style outputs
- `editorial magazine style` — sophisticated, typographic
- `minimal, lots of whitespace` — reduces visual noise
- `high contrast, bold typography` — strong thumbnail legibility
- `Bauhaus-inspired` — geometric, structured
- `dark mode aesthetic` — dark backgrounds with light text
- `startup marketing style` — clean, optimistic, sans-serif

### Negative prompts (always include)

Append to every prompt:

```
Avoid: stock photography clichés, clipart, excessive gradients, drop shadows, 
cluttered layout, lens flares, watermarks, low contrast text, AI artefacts.
```

### Text rendering note

Image models often render short text phrases more accurately than longer headlines. If the article headline is longer than 6 words, consider splitting it in the prompt:

```
Primary headline: "[First 4-5 words]"
Secondary text:   "[Remaining words]"
```

Or instruct the user to add text overlay manually in Canva after generation if legibility is critical.

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| `GEMINI_API_KEY not set` | Environment variable missing | Run `export GEMINI_API_KEY="your-key"` and retry |
| `ATLASCLOUD_API_KEY not set` | Atlas Cloud was selected without its key | Set the key, or remove `--provider atlas-cloud` to use Gemini |
| `ModuleNotFoundError: google.generativeai` | Dependency missing | Run `pip install google-generativeai` |
| `No images returned` | Safety filter triggered | Revise prompt to remove any ambiguous language; check that the prompt doesn't describe faces, violence, or brand logos |
| Generated image has garbled text | Image-model text rendering limitation | Use shorter headline in prompt, or plan to add text overlay in Canva/Figma post-generation |
| Image is the wrong size | Aspect ratio mismatch | Confirm `--width` and `--height` args match one of the supported ratios (16:9, 1:1, 9:16) |
| `generate_image.py not found` | Script not created yet | Ask Claude to create it using the template above |
| API quota exceeded | Provider account limit | Check the selected provider's account limits before making another request |
| Style drift from brand | Prompt not specific enough | Add exact hex codes and specific style descriptors; add stronger negative prompt |

---

## Quality Checks

Before marking the task complete, verify each item:

- [ ] The selected provider's key is confirmed present without printing it
- [ ] `generate_image.py` script exists in project root — created from template if missing
- [ ] `Pillow` is installed; `google-generativeai` is installed when using Gemini
- [ ] Composition proposals were presented and user confirmed which to generate before any API calls
- [ ] Atlas Cloud is used only after explicit provider selection; each candidate gets one generation POST and read-only bounded polling
- [ ] Each composition proposal is specific to this article's content — not generic placeholders
- [ ] Brand colours (hex codes) are included in the image generation prompts
- [ ] Negative prompt appended to every image generation prompt
- [ ] Headline text in prompts is 6 words or fewer per text element (longer headlines split or noted as overlay candidates)
- [ ] Output folder created at `./thumbnails/[article-slug]/` with correct slug derived from article title
- [ ] Files named with candidate number and composition name (`candidate_01_bold_claim.png`)
- [ ] Each generated image evaluated via computer vision — not assumed to be correct
- [ ] Brand Fit and Text Legibility scores are specific and justified, not round numbers
- [ ] Any text rendering issues noted in evaluation with "add text overlay manually" recommendation
- [ ] Evaluation report saved as `evaluation_report.md` in the output folder
- [ ] At least one recommendation given per use case: web, email/mobile, social
- [ ] Full prompts used are included in the evaluation report for user iteration reference
- [ ] Iteration offer made after delivering results

---

## Anti-Patterns

- [ ] Do not generate thumbnails without incorporating brand colours and style specs when provided — off-brand outputs must be regenerated
- [ ] Do not skip the evaluation step — all candidates must be scored before being presented to the user
- [ ] Do not present only one thumbnail candidate — always generate multiple options for comparison
- [ ] Do not include the full image generation prompts in a separate document — they must be included in the evaluation report for iteration reference
- [ ] Do not claim a thumbnail is final without offering an iteration round

## Example Trigger Phrases

- "Create thumbnails for this article"
- "Generate cover image candidates for my newsletter"
- "Make me 4 thumbnail options for this post"
- "Can you generate some thumbnail ideas using Gemini?"
- "Use Atlas Cloud to create thumbnail options for this article"
- "I need a featured image for this article — use my brand colours"
- "Create a thumbnail for this piece using Gemini" [followed by article text or URL]
- "Generate article cover images for these brand specs: [colours, style]"
- "Make thumbnail candidates and rank them"
- "I need newsletter header images — here's the copy"
- "Generate and evaluate thumbnail options for this draft"
- "Use Gemini to create cover image options"
- "Thumbnail this article" [followed by article text]
- "Create 3 thumbnail compositions and pick the best one"

---

## Cost and Rate Limits

- Check the selected provider's current model page before generating; prices and quotas change.
- Confirm the number of candidates with the user before any paid request.
- Do not automatically retry a failed generation submission. Atlas Cloud polling retries only read-only status checks with a bounded backoff.
- Record the provider and model in `evaluation_report.md` so the run can be reproduced.

---

*Originally created by Karen Spinner (Wondering About AI) — adapted and extended for this library.*
