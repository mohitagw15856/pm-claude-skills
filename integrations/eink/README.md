# PM Skills — e-ink desk companion

An always-on desk object that shows **one** thing: today's skill — its title, the
one-line *"use when"*, and a QR code to open it in the playground. It wakes on a
timer, pulls a skill from the public API, redraws the e-ink panel, and sleeps.
Because e-ink holds its image at **zero power**, it stays legible for weeks on a
battery and looks like a tiny printed card on your desk.

> A daily nudge toward professional pattern-matching, in hardware — the same idea
> as the browser coach, but ambient and glanceable.

## What you need

- An **ESP32** dev board (any common one)
- A **Waveshare black/white e-paper** panel + HAT (2.9" or 4.2" work well; SPI)
- Optional: a LiPo cell + charger for cordless desk placement
- [MicroPython](https://micropython.org/download/esp32/) flashed on the ESP32

## Install

1. Flash MicroPython to the ESP32.
2. Copy [`main.py`](main.py) to the device.
3. Copy [`config.example.py`](config.example.py) → `config.py` **on the device**,
   fill in your Wi-Fi and preferences. (Keep `config.py` off git — it holds your
   Wi-Fi password.)
4. Add the **Waveshare MicroPython driver** for your exact panel (vendor-provided)
   as `epaper.py`, exposing the small adapter below.
5. Reset the board. It connects, fetches, draws, and re-draws every
   `REFRESH_SECONDS`.

## The driver adapter (`epaper.EPD`)

`main.py` is panel-agnostic. Wrap whatever Waveshare driver you have in a class
exposing these methods (a dozen lines over the vendor framebuffer):

| Method | Meaning |
| --- | --- |
| `width`, `height` | panel size in px |
| `clear()` | blank the framebuffer |
| `text(x, y, s, size, invert=False)` | draw text; `size` 1–2 scale |
| `rect(x, y, w, h, fill=False)` | rectangle / header band |
| `qr(x, y, url, scale)` | render a QR of `url` |
| `show()` | flush framebuffer to the panel |

For `qr`, drop in any MicroPython QR module (e.g. `uQR`) and blit its matrix with
`rect`. If your panel lib only gives you `framebuf`, all six map directly onto it.

## Modes

- **`rotating`** — a different skill each calendar day, chosen deterministically
  by day-of-epoch, so the panel is stable within a day and turns over at midnight.
- **`search:<query>`** — pin a theme (e.g. `search:pricing`); it shows the top
  match for that query. Good for a sprint focus or a role.

## Honest scope

- The **fetch, selection, wrap, trigger-extraction, and layout logic is real and
  runnable** on-device against the live public API — no cloud of ours involved.
- What you supply is the **panel driver** (`epaper.py`) and, on battery,
  swapping the `time.sleep` at the end of `main()` for `machine.deepsleep` — one
  line, left explicit so you choose USB vs battery behaviour.
- No secrets ship in this repo; `config.py` lives only on your device.

MIT © Mohit Aggarwal
