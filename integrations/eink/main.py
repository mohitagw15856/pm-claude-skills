# PM Skills — e-ink desk companion (MicroPython, ESP32 + Waveshare e-paper).
#
# A small always-on desk object that shows ONE thing: today's skill — its title,
# the one-line "use when", and a QR to open it in the playground. It wakes on a
# timer, pulls a skill from the public API, redraws the e-ink panel, and deep-
# sleeps. Because e-ink holds the image with zero power, it can run for weeks on
# a battery and still show something worth glancing at.
#
# Hardware (reference build):
#   - ESP32 dev board
#   - Waveshare 2.9" or 4.2" black/white e-paper HAT (SPI)
#   - LiPo + charger (optional)
#
# Flash MicroPython, copy this file as main.py, drop in your Wi-Fi in config.py,
# and add the Waveshare `epaper` driver for your panel (vendor-provided). The
# rendering here is driver-agnostic: it builds a framebuffer and calls a small
# set of methods (text/rect/qr/show) documented in README.md.

import time
import network
import urequests as requests

try:
    import config
except ImportError:
    class config:  # sensible fallbacks; override in config.py
        WIFI_SSID = ""
        WIFI_PASS = ""
        API_BASE = "https://pm-skills-mcp.pm-claude-skills.workers.dev"
        SITE = "https://mohitagw15856.github.io/pm-claude-skills"
        REFRESH_SECONDS = 6 * 60 * 60  # every 6 hours
        MODE = "rotating"  # "rotating" (deterministic per-day) or "search:<query>"

# --- network ---------------------------------------------------------------

def connect_wifi(timeout=20):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        wlan.connect(config.WIFI_SSID, config.WIFI_PASS)
        t0 = time.time()
        while not wlan.isconnected():
            if time.time() - t0 > timeout:
                raise OSError("wifi timeout")
            time.sleep(0.5)
    return wlan


def pick_skill():
    """Choose today's skill. 'rotating' is deterministic per calendar day so the
    panel is stable within a day and changes at midnight; 'search:<q>' pins a
    theme. Falls back to a cached title on any network error."""
    mode = getattr(config, "MODE", "rotating")
    try:
        if mode.startswith("search:"):
            q = mode.split(":", 1)[1]
            r = requests.get(config.API_BASE + "/v1/search?q=" + q.replace(" ", "%20") + "&limit=1")
            data = r.json(); r.close()
            return data["skills"][0]
        # rotating: list, then index by day-of-epoch so it advances daily.
        r = requests.get(config.API_BASE + "/v1/skills?limit=500")
        data = r.json(); r.close()
        skills = data["skills"]
        day = int(time.time() // 86400)
        return skills[day % len(skills)]
    except Exception as e:  # noqa: BLE001 — offline: reuse last render
        print("pick_skill failed:", e)
        return None


# --- rendering -------------------------------------------------------------
# `epd` is your Waveshare driver instance exposing: text(x,y,str,size), rect,
# hline, qr(x,y,url,scale), show(). See README for the thin adapter contract.

def render(epd, skill):
    epd.clear()
    W = epd.width
    # Header band
    epd.rect(0, 0, W, 26, fill=True)
    epd.text(8, 7, "TODAY'S SKILL", 1, invert=True)
    epd.text(W - 96, 7, time_str(), 1, invert=True)
    # Title (wrapped)
    y = 40
    for line in wrap(skill["title"], 18)[:2]:
        epd.text(8, y, line, 2)
        y += 26
    # One-line "use when" from the description's trigger clause.
    use = trigger(skill.get("description", ""))
    y += 6
    for line in wrap(use, 34)[:3]:
        epd.text(8, y, line, 1)
        y += 16
    # QR to open it in the playground.
    url = config.SITE + "/?skill=" + skill["name"]
    epd.qr(W - 92, epd.height - 92, url, scale=2)
    epd.text(8, epd.height - 20, "scan → run it  ·  pm-skills", 1)
    epd.show()


def wrap(text, width):
    words, line, out = text.split(), "", []
    for w in words:
        if len(line) + len(w) + 1 > width:
            out.append(line); line = w
        else:
            line = (line + " " + w).strip()
    if line:
        out.append(line)
    return out


def trigger(desc):
    """Pull the 'Use when …' clause SkillSpec descriptions carry; else first sentence."""
    low = desc.lower()
    i = low.find("use when")
    if i >= 0:
        return desc[i:].split(".")[0].strip()
    return desc.split(".")[0].strip()


def time_str():
    t = time.localtime()
    return "%02d:%02d" % (t[3], t[4])


# --- main loop -------------------------------------------------------------

def main():
    try:
        from epaper import EPD  # vendor driver you supply (see README)
    except ImportError:
        print("No `epaper` driver on device — add the Waveshare MicroPython driver.")
        return
    epd = EPD()
    while True:
        try:
            connect_wifi()
            skill = pick_skill()
            if skill:
                render(epd, skill)
        except Exception as e:  # keep the panel showing the last good frame
            print("cycle error:", e)
        # Deep sleep would replace this on battery; time.sleep for USB-powered.
        time.sleep(getattr(config, "REFRESH_SECONDS", 21600))


if __name__ == "__main__":
    main()
