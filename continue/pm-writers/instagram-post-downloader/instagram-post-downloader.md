---
name: "Download and save Instagram posts as high-resolution files. "
description: "Download and save Instagram posts as high-resolution files. Use when asked to download, save, or archive an Instagram post, reel thumbnail, or carousel. Produces saved high-res images in a named folder, with carousel slides stitched into a single PDF; supports batch downloading of multiple URLs at once."
---

# Instagram Post Downloader Skill

Downloads Instagram posts at full resolution from Instagram's CDN — no screenshots, no compression. Handles single images, carousels (multi-slide posts), and Reel cover images. For carousels, produces individual slide files plus a single stitched PDF. Supports batch URLs in one run.

---

## PREREQUISITE — Domain Allowlist

Before this skill can fetch any media, you must add Instagram's CDN domain to Claude Code's allowlist:

**Settings → Capabilities → Domain allowlist → Add:**
```
*.cdninstagram.com
```

Without this, all CDN fetch calls will be blocked. If you see a permission error when Claude attempts a fetch to `cdninstagram.com`, this is the fix.

---

## Required Inputs

Claude will ask for these if not provided upfront:

| Input | Required | Notes |
|---|---|---|
| Instagram post URL(s) | Yes | One per line, or comma-separated. `https://www.instagram.com/p/XXXX/` or `https://www.instagram.com/reel/XXXX/` format |
| Output directory | No | Defaults to `./instagram-downloads/` in the current working directory |
| PDF stitch for carousels | No | Defaults to **yes** — produces `carousel.pdf` alongside individual slides |
| File naming prefix | No | Optional prefix added before slide filenames, e.g. `brand_` → `brand_slide_01.jpg` |

**Batch input example:**
```
https://www.instagram.com/p/ABC123/
https://www.instagram.com/p/DEF456/
https://www.instagram.com/p/GHI789/
```

---

## Output Structure

For each URL processed, Claude creates a folder named after the post caption (first 40 characters, sanitised — spaces become underscores, special characters stripped). If no caption is available, the folder is named after the post shortcode.

### Single image post

```
instagram-downloads/
└── this_is_the_caption_first_40_chars/
    ├── image.jpg
    └── metadata.txt
```

### Carousel post

```
instagram-downloads/
└── carousel_caption_first_40_chars/
    ├── slide_01.jpg
    ├── slide_02.jpg
    ├── slide_03.jpg
    ├── slide_04.jpg
    ├── carousel.pdf          ← all slides stitched in order
    └── metadata.txt
```

### Batch run (3 URLs)

```
instagram-downloads/
├── first_post_caption_sanitised/
│   ├── image.jpg
│   └── metadata.txt
├── second_post_carousel_caption/
│   ├── slide_01.jpg
│   ├── slide_02.jpg
│   ├── carousel.pdf
│   └── metadata.txt
└── third_post_caption_here/
    ├── image.jpg
    └── metadata.txt
```

### metadata.txt format

```
Post URL:       https://www.instagram.com/p/XXXX/
Shortcode:      XXXX
Type:           carousel | single_image | reel
Slide count:    4  (carousel only)
Caption:        [full caption text]
Username:       @username
Fetched at:     2026-05-27T14:32:00Z
CDN URLs:
  slide_01.jpg  https://scontent.cdninstagram.com/v/...
  slide_02.jpg  https://scontent.cdninstagram.com/v/...
```

### Completion summary (printed to terminal)

```
Instagram Post Downloader — Batch Complete
==========================================
URLs processed:   3
Posts saved:      3
Total files:      11  (9 images + 2 PDFs)
Skipped:          0
Output dir:       /Users/you/project/instagram-downloads/

Results:
  ✓ this_is_the_caption_first_40_chars/     1 image
  ✓ carousel_caption_first_40_chars/        4 slides → carousel.pdf
  ✓ third_post_caption_here/                1 image
```

---

## How Claude Should Execute This Skill

### Step 1 — Collect and validate inputs

1. Accept the URL(s) from the user. If the user pastes a comma-separated list, split on commas. If they paste one per line, split on newlines.
2. Validate each URL matches `instagram.com/p/`, `instagram.com/reel/`, or `instagram.com/tv/`. Flag malformed URLs before proceeding.
3. Confirm the output directory. If none provided, use `./instagram-downloads/` and tell the user.
4. Ask about PDF stitching preference only if the user hasn't said either way. Default is yes.

### Step 2 — For each URL: fetch the post page

Fetch the Instagram post page HTML:

```
GET https://www.instagram.com/p/{shortcode}/?__a=1&__d=dis
```

Instagram frequently changes its API surface. Use this fallback chain in order:

**Attempt A — JSON endpoint:**
```
https://www.instagram.com/p/{shortcode}/?__a=1&__d=dis
```
Parse the JSON response. Look for `graphql.shortcode_media` or `data.shortcode_media`.

**Attempt B — Embed page (most reliable):**
```
https://www.instagram.com/p/{shortcode}/embed/captioned/
```
Fetch this page's HTML and extract `og:image` meta tags and any `window.__additionalDataLoaded` or `window.__StaticData` JSON blobs embedded in `<script>` tags.

**Attempt C — oEmbed endpoint:**
```
https://api.instagram.com/oembed/?url=https://www.instagram.com/p/{shortcode}/&omitscript=true
```
This returns `thumbnail_url` — useful for single images, but only gives the first frame for carousels.

**Headers to include on all requests:**
```
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
Accept-Language: en-US,en;q=0.9
Accept: text/html,application/xhtml+xml,application/json
```

### Step 3 — Extract CDN image URLs

From the fetched data, extract all high-resolution CDN URLs. Instagram CDN URLs follow these patterns:

```
https://scontent.cdninstagram.com/v/...jpg?...
https://scontent-lax3-1.cdninstagram.com/v/...jpg?...
https://instagram.fXXX1-1.fbcdn.net/v/...jpg?...
```

**For single image posts:**
- Extract the single `display_url` or the largest `display_resources` entry (pick the one with the highest `config_width`).

**For carousel posts:**
- Look for `edge_sidecar_to_children.edges[]` in the JSON. Each edge has its own `node.display_url` and `node.display_resources[]`.
- Iterate all edges in order. This determines slide numbering.
- Pick the highest-resolution variant from each slide's `display_resources` array.

**For Reels:**
- The cover image is extractable the same way as a single image.
- The video file itself requires a third-party tool (see Bonus section).

**If JSON extraction fails**, fall back to scraping `<meta property="og:image">` tags from the page HTML — this gives at least one image URL (the first slide or only image).

### Step 4 — Sanitise folder name

Build the folder name from the post caption:
1. Take the first 40 characters of the caption.
2. Strip all characters that are not alphanumeric, spaces, or hyphens.
3. Replace spaces and hyphens with underscores.
4. Lowercase the result.
5. Strip leading/trailing underscores.
6. If the result is empty (e.g. caption was all emoji), use the post shortcode instead.

```python
import re

def sanitise_folder_name(caption: str, shortcode: str) -> str:
    truncated = caption[:40]
    cleaned = re.sub(r'[^a-zA-Z0-9 \-]', '', truncated)
    underscored = re.sub(r'[\s\-]+', '_', cleaned).strip('_').lower()
    return underscored if underscored else shortcode
```

### Step 5 — Create output folder structure

```python
import os

base_dir = "./instagram-downloads"
folder_name = sanitise_folder_name(caption, shortcode)
post_dir = os.path.join(base_dir, folder_name)
os.makedirs(post_dir, exist_ok=True)
```

If a folder with that name already exists (e.g. running the same URL twice), append the shortcode to avoid collision: `folder_name_SHORTCODE`.

### Step 6 — Download each image file

For each CDN URL, download the file with a streaming GET request:

```python
import requests

def download_file(url: str, dest_path: str) -> bool:
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Referer": "https://www.instagram.com/",
    }
    response = requests.get(url, headers=headers, stream=True, timeout=30)
    response.raise_for_status()
    with open(dest_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    return True
```

Name files:
- Single image: `image.jpg`
- Carousel slides: `slide_01.jpg`, `slide_02.jpg`, ... (zero-padded to 2 digits, or 3 digits if >99 slides)

Detect file format from the `Content-Type` header or URL extension. Instagram serves JPEG for photos and may serve WebP in some cases — preserve the actual extension.

### Step 7 — Stitch carousel PDF (if applicable)

After all slides are downloaded, stitch them into a single PDF using Pillow:

```python
from PIL import Image

def stitch_to_pdf(image_paths: list[str], output_path: str) -> None:
    """
    Combine a list of image files into a single multi-page PDF.
    Each image becomes one page. Page size matches the image dimensions.
    """
    images = []
    for path in sorted(image_paths):  # sort ensures slide_01, slide_02, ... order
        img = Image.open(path).convert("RGB")
        images.append(img)

    if not images:
        return

    first = images[0]
    rest = images[1:]
    first.save(
        output_path,
        format="PDF",
        save_all=True,
        append_images=rest,
        resolution=150.0,
    )
```

Save as `carousel.pdf` in the post folder. If Pillow is not installed, run `pip install Pillow` first — or instruct the user to do so.

**Dependency check at start of skill:**
```python
try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip install Pillow")
    print("PDF stitching will be skipped. Individual slides will still be downloaded.")
    skip_pdf = True
```

### Step 8 — Write metadata.txt

Write a `metadata.txt` file into the post folder with all extracted metadata:

```python
from datetime import datetime, timezone

def write_metadata(post_dir, post_url, shortcode, post_type, caption, username, cdn_urls):
    lines = [
        f"Post URL:       {post_url}",
        f"Shortcode:      {shortcode}",
        f"Type:           {post_type}",
    ]
    if post_type == "carousel":
        lines.append(f"Slide count:    {len(cdn_urls)}")
    lines += [
        f"Caption:        {caption}",
        f"Username:       @{username}",
        f"Fetched at:     {datetime.now(timezone.utc).isoformat()}",
        "CDN URLs:",
    ]
    for filename, url in cdn_urls.items():
        lines.append(f"  {filename:<16} {url}")

    with open(os.path.join(post_dir, "metadata.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
```

### Step 9 — Print completion summary

After processing all URLs, print the summary table to the terminal (format shown in Output Structure section above). Include:
- Total URLs attempted
- Posts successfully saved
- Total files written (images + PDFs separately)
- Any URLs that were skipped and the reason

### Step 10 — Handle errors gracefully

| Error scenario | Action |
|---|---|
| URL is not an Instagram URL | Skip with message: "Skipped — not an Instagram URL: [url]" |
| Post is private or requires login | Skip with message: "Skipped — post is private or login required: [url]" |
| CDN fetch returns 403/404 | Try alternate CDN URL if available; if none, skip slide and note in metadata |
| Pillow not installed | Skip PDF stitching, save slides only, note in summary |
| Network timeout | Retry once after 5 seconds; if still failing, skip and log |
| Folder name collision | Append shortcode suffix to folder name |
| Rate limiting (429) | Wait 10 seconds and retry; log if retry also fails |

---

## Bonus — Downloading Instagram Reels (Video)

This skill covers images and carousel PDFs. For Reels video files, Claude Code cannot download video directly without a third-party tool, because Instagram's video CDN uses signed URLs and additional auth tokens.

**Recommended approach for Reels:**

Use `yt-dlp`, a maintained open-source tool:

```bash
# Install
pip install yt-dlp

# Download a Reel
yt-dlp "https://www.instagram.com/reel/XXXX/" -o "%(title)s.%(ext)s"

# Download to a specific folder
yt-dlp "https://www.instagram.com/reel/XXXX/" \
  -o "./instagram-downloads/%(uploader)s_%(id)s.%(ext)s"

# Download best quality
yt-dlp -f "bestvideo+bestaudio" "https://www.instagram.com/reel/XXXX/"
```

Claude can run this command via Bash if the user asks. `yt-dlp` handles the auth token extraction automatically for public Reels.

---

## Full Script Template

Claude should offer to write this as a standalone script (`instagram_downloader.py`) that the user can run independently:

```python
#!/usr/bin/env python3
"""
Instagram Post Downloader
Fetches high-res images from public Instagram posts and carousels.
Requires: pip install requests Pillow
"""

import os
import re
import sys
import json
import time
import requests
from datetime import datetime, timezone
from pathlib import Path

try:
    from PIL import Image
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False
    print("Warning: Pillow not installed. PDF stitching disabled. Run: pip install Pillow")


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.instagram.com/",
}


def extract_shortcode(url: str) -> str:
    match = re.search(r"instagram\.com/(?:p|reel|tv)/([A-Za-z0-9_-]+)", url)
    if not match:
        raise ValueError(f"Cannot extract shortcode from URL: {url}")
    return match.group(1)


def fetch_post_data(shortcode: str) -> dict:
    """Try multiple endpoints to get post JSON data."""
    # Attempt A: JSON endpoint
    try:
        url = f"https://www.instagram.com/p/{shortcode}/?__a=1&__d=dis"
        r = requests.get(url, headers=HEADERS, timeout=15)
        if r.status_code == 200:
            data = r.json()
            media = (data.get("graphql", {}).get("shortcode_media") or
                     data.get("data", {}).get("shortcode_media"))
            if media:
                return media
    except Exception:
        pass

    # Attempt B: Embed page
    try:
        url = f"https://www.instagram.com/p/{shortcode}/embed/captioned/"
        r = requests.get(url, headers=HEADERS, timeout=15)
        html = r.text
        # Look for JSON blob in script tags
        matches = re.findall(r'window\.__additionalDataLoaded\([^,]+,(\{.+?\})\);', html)
        for blob in matches:
            try:
                data = json.loads(blob)
                media = (data.get("graphql", {}).get("shortcode_media") or
                         data.get("data", {}).get("shortcode_media"))
                if media:
                    return media
            except json.JSONDecodeError:
                continue
    except Exception:
        pass

    return {}


def get_cdn_urls(media: dict) -> list[tuple[str, str]]:
    """Return list of (filename, cdn_url) tuples."""
    results = []
    media_type = media.get("__typename", "")

    if media_type == "GraphSidecar":
        edges = media.get("edge_sidecar_to_children", {}).get("edges", [])
        for i, edge in enumerate(edges, start=1):
            node = edge.get("node", {})
            resources = node.get("display_resources", [])
            url = (max(resources, key=lambda r: r.get("config_width", 0)).get("src")
                   if resources else node.get("display_url", ""))
            if url:
                ext = "jpg" if "jpg" in url.lower() else "webp"
                filename = f"slide_{i:02d}.{ext}"
                results.append((filename, url))
    else:
        resources = media.get("display_resources", [])
        url = (max(resources, key=lambda r: r.get("config_width", 0)).get("src")
               if resources else media.get("display_url", ""))
        if url:
            ext = "jpg" if "jpg" in url.lower() else "webp"
            results.append((f"image.{ext}", url))

    return results


def sanitise_folder_name(caption: str, shortcode: str) -> str:
    truncated = caption[:40] if caption else ""
    cleaned = re.sub(r"[^a-zA-Z0-9 \-]", "", truncated)
    underscored = re.sub(r"[\s\-]+", "_", cleaned).strip("_").lower()
    return underscored if underscored else shortcode


def download_file(url: str, dest_path: str) -> bool:
    r = requests.get(url, headers=HEADERS, stream=True, timeout=30)
    r.raise_for_status()
    with open(dest_path, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)
    return True


def stitch_pdf(image_paths: list[str], output_path: str) -> None:
    if not PILLOW_AVAILABLE:
        return
    images = [Image.open(p).convert("RGB") for p in sorted(image_paths)]
    if images:
        images[0].save(output_path, format="PDF", save_all=True,
                       append_images=images[1:], resolution=150.0)


def process_url(post_url: str, base_dir: str, stitch_pdf_flag: bool) -> dict:
    result = {"url": post_url, "status": "ok", "files": [], "error": None}
    try:
        shortcode = extract_shortcode(post_url)
        media = fetch_post_data(shortcode)

        caption = ""
        username = ""
        if media:
            caption_edges = media.get("edge_media_to_caption", {}).get("edges", [])
            caption = caption_edges[0]["node"]["text"] if caption_edges else ""
            owner = media.get("owner", {})
            username = owner.get("username", "")

        folder_name = sanitise_folder_name(caption, shortcode)
        post_dir = os.path.join(base_dir, folder_name)
        if os.path.exists(post_dir):
            post_dir = f"{post_dir}_{shortcode}"
        os.makedirs(post_dir, exist_ok=True)

        cdn_urls = get_cdn_urls(media) if media else []
        if not cdn_urls:
            # Fallback: oEmbed
            oembed_url = f"https://api.instagram.com/oembed/?url={post_url}&omitscript=true"
            r = requests.get(oembed_url, headers=HEADERS, timeout=10)
            if r.status_code == 200:
                thumb = r.json().get("thumbnail_url", "")
                if thumb:
                    cdn_urls = [("image.jpg", thumb)]
                    username = r.json().get("author_name", "")

        downloaded_paths = []
        cdn_map = {}
        for filename, url in cdn_urls:
            dest = os.path.join(post_dir, filename)
            download_file(url, dest)
            downloaded_paths.append(dest)
            cdn_map[filename] = url
            result["files"].append(filename)

        if stitch_pdf_flag and len(downloaded_paths) > 1 and PILLOW_AVAILABLE:
            pdf_path = os.path.join(post_dir, "carousel.pdf")
            stitch_pdf(downloaded_paths, pdf_path)
            result["files"].append("carousel.pdf")

        post_type = "carousel" if len(cdn_urls) > 1 else "single_image"
        write_metadata(post_dir, post_url, shortcode, post_type, caption, username, cdn_map)
        result["files"].append("metadata.txt")

    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)

    return result


def write_metadata(post_dir, post_url, shortcode, post_type, caption, username, cdn_map):
    lines = [
        f"Post URL:       {post_url}",
        f"Shortcode:      {shortcode}",
        f"Type:           {post_type}",
    ]
    if post_type == "carousel":
        lines.append(f"Slide count:    {len([k for k in cdn_map if 'slide' in k])}")
    lines += [
        f"Caption:        {caption}",
        f"Username:       @{username}",
        f"Fetched at:     {datetime.now(timezone.utc).isoformat()}",
        "CDN URLs:",
    ]
    for fn, url in cdn_map.items():
        lines.append(f"  {fn:<18} {url}")
    with open(os.path.join(post_dir, "metadata.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def main(urls: list[str], base_dir: str = "./instagram-downloads", stitch: bool = True):
    os.makedirs(base_dir, exist_ok=True)
    results = []
    for url in urls:
        url = url.strip()
        if not url:
            continue
        print(f"Processing: {url}")
        r = process_url(url, base_dir, stitch)
        results.append(r)
        time.sleep(1)  # polite delay between requests

    # Summary
    ok = [r for r in results if r["status"] == "ok"]
    err = [r for r in results if r["status"] == "error"]
    total_files = sum(len(r["files"]) for r in ok)
    print("\nInstagram Post Downloader — Batch Complete")
    print("==========================================")
    print(f"URLs processed:   {len(results)}")
    print(f"Posts saved:      {len(ok)}")
    print(f"Total files:      {total_files}")
    print(f"Errors:           {len(err)}")
    print(f"Output dir:       {os.path.abspath(base_dir)}\n")
    for r in results:
        if r["status"] == "ok":
            print(f"  OK  {r['url']}")
        else:
            print(f"  ERR {r['url']}  — {r['error']}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python instagram_downloader.py <url1> [url2] ...")
        sys.exit(1)
    main(sys.argv[1:])
```

---

## Quality Checks

Before marking the task complete, verify each item:

- [ ] Domain allowlist confirmed — `*.cdninstagram.com` is added before any fetch attempts
- [ ] All provided URLs validated as Instagram URLs before processing begins
- [ ] CDN URLs are the highest-resolution variants available (largest `config_width` selected)
- [ ] Folder name is sanitised — no special characters, no spaces, max 40 chars from caption
- [ ] Folder collision handled — shortcode appended if folder already exists
- [ ] Carousel slides numbered sequentially with zero-padding (`slide_01`, `slide_02`, ...)
- [ ] PDF includes all slides in correct order (not alphabetical — by slide index)
- [ ] metadata.txt written to every post folder, including full CDN URLs
- [ ] Pillow dependency checked at startup — graceful fallback if not available
- [ ] Batch completion summary printed with file counts and any errors
- [ ] Private post errors caught and reported — not silently skipped
- [ ] Rate limiting handled — at least 1 second delay between requests
- [ ] No credential or cookie storage — skill operates on public posts only

---

## Anti-Patterns

- [ ] Do not attempt to download private posts or content behind a login wall — this skill is for public posts only
- [ ] Do not ignore 429 rate-limit responses — always implement a backoff wait before retrying
- [ ] Do not save all downloads to a single flat folder when processing multiple accounts — use named subfolders per source
- [ ] Do not skip PDF stitching for carousel posts — individual slides delivered without a combined PDF are incomplete output
- [ ] Do not proceed if Instagram returns a login wall — surface the limitation clearly rather than returning an error silently

## Example Trigger Phrases

- "Download this Instagram post for me: https://www.instagram.com/p/ABC123/"
- "Save that carousel to my downloads folder"
- "Can you grab all the slides from this Instagram post and make a PDF?"
- "Download these 5 Instagram posts" [followed by list of URLs]
- "Archive this IG post before it gets deleted"
- "I need the full-res images from this carousel"
- "Download the images from this Instagram URL and stitch them into a PDF"
- "Batch download these Instagram posts" [followed by URLs]
- "Save the slides from this Instagram carousel as individual JPEGs"
- "Get me the high-res version of this Instagram image"

---

## Notes on Instagram's Anti-Scraping Measures

Instagram actively changes its page structure and API endpoints. If all three fetch attempts fail:

1. The embed page method (`/embed/captioned/`) is historically the most stable — start there.
2. CDN URLs expire. Download immediately after fetching — do not store URLs and download later.
3. Instagram may return a login wall for some posts even if they're technically public. If this happens, the skill cannot proceed without authentication (which is out of scope).
4. If Instagram returns a 429, wait 10–30 seconds before retrying. Reduce batch size for large lists.

This skill is designed for public posts only. It does not support login, sessions, or private content.

---

*Originally inspired by a skill from Frank and Diana Dovgopol (Write, Prompt, Scale) — adapted and extended for this library.*
