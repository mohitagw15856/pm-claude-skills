# Third-party material in the README assets

Everything in `docs/readme-assets/` is MIT-licensed with the rest of the repository, except the parts listed here.

## Make Me a Hanzi stroke data (Arphic Public License)

Used by: `calligraphy-zh.svg`, `calligraphy-zh-light.svg`, `calligraphy-zh-tw.svg`, `calligraphy-zh-tw-light.svg`, and the calligraphy title inside `poster-zh.png` and `poster-zh-small.png`.

- Source: [Make Me a Hanzi](https://github.com/skishore/makemeahanzi), file `graphics.txt`, which is derived from the fonts Arphic PL KaitiM GB and Arphic PL UKai.
- Licence: the Arphic Public License. The licence text is kept unaltered in [`hanzi/ARPHICPL.TXT`](hanzi/ARPHICPL.TXT).
- What we took: the stroke outlines and stroke medians of four characters (技 能 库 庫), unchanged, in [`hanzi/strokes.json`](hanzi/strokes.json).
- How and when we changed it (APL section 2a): on 2026-10-04, `scripts/build-readme-zh.mjs` scaled and positioned the strokes and animated them stroke by stroke; each generated SVG carries a comment saying so.
- Availability (APL section 2b): the extracted data, the licence and the build script are all in this repository, and you may copy and modify them under the Arphic Public License.

Make Me a Hanzi's `dictionary.txt` (LGPL) is not used.

## Build-time tools (not distributed in the assets)

| Tool | Licence | Used for |
|---|---|---|
| [qrcode](https://github.com/soldair/node-qrcode) | MIT | Drawing the QR code in `poster-zh.png` (`scripts/build-zh-poster.mjs`) |
| [jsQR](https://github.com/cozmo/jsQR) | Apache-2.0 | Checking that the poster's QR code decodes to the playground URL |
| [pngjs](https://github.com/pngjs/pngjs) | MIT | Reading the poster PNG for that check |
| [Playwright](https://github.com/microsoft/playwright) | Apache-2.0 | Rendering the poster to PNG |

The SVGs use system fonts only (PingFang, Noto Sans CJK, Microsoft YaHei and similar); no font files are embedded.
