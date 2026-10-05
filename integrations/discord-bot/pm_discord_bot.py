#!/usr/bin/env python3
"""PM Skills on Discord: /skill runs a skill on a request, /find suggests skills.

Uses Discord's HTTP interactions (an Interactions Endpoint URL), so there is no
gateway connection to keep open: Discord POSTs each slash command here, signed
with Ed25519, and the bot answers. Skill routing and the model call are shared
with the Feishu, DingTalk and WeCom bot in ../chat-bots/pm_chat_bot.py, so the
same PM_LLM_* settings pick DeepSeek, Qwen, GLM, ModelScope or a local Ollama.

Ed25519 verification uses the `cryptography` package when it is installed and a
small pure-Python verifier (RFC 8032) otherwise; both are checked against the
RFC 8032 test vectors in --selftest. Python 3.9+, no other dependencies.

Usage
-----
    DISCORD_PUBLIC_KEY=... PM_LLM_PROVIDER=deepseek PM_LLM_API_KEY=... python3 pm_discord_bot.py --port 8090
    DISCORD_APPLICATION_ID=... DISCORD_BOT_TOKEN=... python3 pm_discord_bot.py --register
    python3 pm_discord_bot.py --selftest

Environment
-----------
    DISCORD_PUBLIC_KEY       the application's public key (hex), from the Developer Portal
    DISCORD_APPLICATION_ID   needed for --register and for follow-up messages
    DISCORD_BOT_TOKEN        only for --register (registering the slash commands)
    PM_LLM_PROVIDER, PM_LLM_API_KEY, PM_LLM_MODEL, PM_LLM_BASE_URL   as for the chat-bots server
    PM_SKILLS_REPO           a local checkout of the library (defaults to this repository)
    PM_RATE_PER_MIN          requests per user per minute (default 6)
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "chat-bots"))
import pm_chat_bot as shared  # noqa: E402  (SkillRouter, call_llm, explicit_skill, env)

API = "https://discord.com/api/v10"
USER_AGENT = "DiscordBot (https://github.com/mohitagw15856/pm-claude-skills, 1.0)"
MAX_BODY = 256 * 1024
MSG_LIMIT = 1900  # Discord allows 2,000 characters per message

# ── Ed25519 verification (RFC 8032) ──────────────────────────────────────────
_p = 2 ** 255 - 19
_q = 2 ** 252 + 27742317777372353535851937790883648493


def _inv(x):
    return pow(x, _p - 2, _p)


_d = -121665 * _inv(121666) % _p
_SQRT_M1 = pow(2, (_p - 1) // 4, _p)


def _add(P, Q):
    A = (P[1] - P[0]) * (Q[1] - Q[0]) % _p
    B = (P[1] + P[0]) * (Q[1] + Q[0]) % _p
    C = 2 * P[3] * Q[3] * _d % _p
    D = 2 * P[2] * Q[2] % _p
    E, F, G, H = B - A, D - C, D + C, B + A
    return (E * F % _p, G * H % _p, F * G % _p, E * H % _p)


def _mul(s, P):
    Q = (0, 1, 1, 0)
    while s > 0:
        if s & 1:
            Q = _add(Q, P)
        P = _add(P, P)
        s >>= 1
    return Q


def _equal(P, Q):
    return (P[0] * Q[2] - Q[0] * P[2]) % _p == 0 and (P[1] * Q[2] - Q[1] * P[2]) % _p == 0


def _recover_x(y, sign):
    if y >= _p:
        return None
    x2 = (y * y - 1) * _inv(_d * y * y + 1)
    if x2 == 0:
        return None if sign else 0
    x = pow(x2, (_p + 3) // 8, _p)
    if (x * x - x2) % _p != 0:
        x = x * _SQRT_M1 % _p
    if (x * x - x2) % _p != 0:
        return None
    if (x & 1) != sign:
        x = _p - x
    return x


_gy = 4 * _inv(5) % _p
_gx = _recover_x(_gy, 0)
_G = (_gx, _gy, 1, _gx * _gy % _p)


def _decompress(s):
    if len(s) != 32:
        return None
    y = int.from_bytes(s, "little")
    sign = y >> 255
    y &= (1 << 255) - 1
    x = _recover_x(y, sign)
    return None if x is None else (x, y, 1, x * y % _p)


def _compress(P):
    zi = _inv(P[2])
    x, y = P[0] * zi % _p, P[1] * zi % _p
    return int.to_bytes(y | ((x & 1) << 255), 32, "little")


def _hq(data):
    return int.from_bytes(hashlib.sha512(data).digest(), "little") % _q


def ed25519_verify_pure(public, message, signature):
    if len(public) != 32 or len(signature) != 64:
        return False
    A = _decompress(public)
    R = _decompress(signature[:32])
    s = int.from_bytes(signature[32:], "little")
    if A is None or R is None or s >= _q:
        return False
    h = _hq(signature[:32] + public + message)
    return _equal(_mul(s, _G), _add(R, _mul(h, A)))


def ed25519_sign_pure(secret, message):
    """Signing, used only by --selftest to build signed test requests."""
    h = hashlib.sha512(secret).digest()
    a = int.from_bytes(h[:32], "little") & ((1 << 254) - 8) | (1 << 254)
    A = _compress(_mul(a, _G))
    r = _hq(h[32:] + message)
    Rs = _compress(_mul(r, _G))
    s = (r + _hq(Rs + A + message) * a) % _q
    return Rs + int.to_bytes(s, 32, "little")


def ed25519_public_pure(secret):
    h = hashlib.sha512(secret).digest()
    a = int.from_bytes(h[:32], "little") & ((1 << 254) - 8) | (1 << 254)
    return _compress(_mul(a, _G))


def ed25519_verify(public, message, signature):
    try:
        from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
        from cryptography.exceptions import InvalidSignature
    except ImportError:
        return ed25519_verify_pure(public, message, signature)
    try:
        Ed25519PublicKey.from_public_bytes(public).verify(signature, message)
        return True
    except (InvalidSignature, ValueError):
        return False


def verify_request(public_hex, timestamp, body, signature_hex, now=None, max_age=300):
    """Discord signs timestamp + raw body. Old timestamps are refused (replays)."""
    try:
        public, sig = bytes.fromhex(public_hex), bytes.fromhex(signature_hex)
        ts = int(timestamp)
    except (ValueError, TypeError):
        return False
    if abs((now or time.time()) - ts) > max_age:
        return False
    return ed25519_verify(public, str(timestamp).encode() + body, sig)


# ── Discord helpers ──────────────────────────────────────────────────────────
COMMANDS = [
    {"name": "skill", "description": "Run a PM Skills skill on your request (it picks the skill unless you name one)",
     "options": [{"type": 3, "name": "request", "description": "What you need, with your notes pasted in", "required": True},
                 {"type": 3, "name": "skill", "description": "A skill name, e.g. prd-template (optional)", "required": False}]},
    {"name": "find", "description": "Suggest PM Skills skills for a task",
     "options": [{"type": 3, "name": "task", "description": "Describe the task", "required": True}]},
]


def discord_request(method, url, payload=None, token=None):
    data = None if payload is None else json.dumps(payload).encode()
    headers = {"Content-Type": "application/json", "User-Agent": USER_AGENT}
    if token:
        headers["Authorization"] = "Bot " + token
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=20) as r:
        raw = r.read().decode("utf-8")
        return json.loads(raw) if raw else {}


def chunks(text, size=MSG_LIMIT):
    text = text.strip() or "(no answer)"
    out = []
    while text:
        cut = text.rfind("\n", 0, size) if len(text) > size else len(text)
        cut = cut if cut > size // 2 else min(size, len(text))
        out.append(text[:cut])
        text = text[cut:].lstrip("\n")
    return out


def option(data, name):
    for o in (data.get("options") or []):
        if o.get("name") == name:
            return str(o.get("value", ""))
    return ""


class Limiter:
    def __init__(self, per_min):
        self.per_min, self.hits, self.lock = per_min, {}, threading.Lock()

    def allow(self, user):
        now = time.time()
        with self.lock:
            recent = [t for t in self.hits.get(user, []) if now - t < 60]
            ok = len(recent) < self.per_min
            if ok:
                recent.append(now)
            self.hits[user] = recent
            return ok


class DiscordBot:
    def __init__(self, public_key, app_id, router=None, llm=None, send=None, per_min=6):
        self.public_key, self.app_id = public_key, app_id
        self.router = router or shared.SkillRouter(shared.env("PM_SKILLS_REPO", shared.DEFAULT_REPO), shared.env("PM_ROUTER_MODEL"))
        self.llm = llm or shared.call_llm
        self.send = send or discord_request
        self.limiter = Limiter(per_min)

    def handle(self, headers, body):
        """Returns (status, response dict). Never logs message text or secrets."""
        if not verify_request(self.public_key, headers.get("X-Signature-Timestamp", ""), body, headers.get("X-Signature-Ed25519", "")):
            return 401, {"error": "invalid request signature"}
        try:
            it = json.loads(body.decode("utf-8"))
        except ValueError:
            return 400, {"error": "bad json"}
        if it.get("type") == 1:  # PING
            return 200, {"type": 1}
        if it.get("type") != 2:
            return 400, {"error": "unsupported interaction"}
        data = it.get("data") or {}
        user = ((it.get("member") or {}).get("user") or it.get("user") or {}).get("id", "anon")
        if not self.limiter.allow(user):
            return 200, {"type": 4, "data": {"content": "Too many requests: try again in a minute.", "flags": 64}}
        if data.get("name") == "find":
            task = option(data, "task")
            names = self.find(task)
            text = "Skills for this task:\n" + "\n".join(f"• `{n}`" for n in names) if names else "No skill matched; try other words."
            return 200, {"type": 4, "data": {"content": text[:MSG_LIMIT]}}
        if data.get("name") == "skill":
            request, named = option(data, "request"), option(data, "skill").strip()
            threading.Thread(target=self.run_skill, args=(it.get("token", ""), request, named), daemon=True).start()
            return 200, {"type": 5}  # "thinking…"; the answer follows as an edit
        return 400, {"error": "unknown command"}

    def find(self, task):
        tool = getattr(self.router, "_tool", None)
        if tool is not None and hasattr(tool, "find_skills"):
            return [h["name"] for h in tool.find_skills(task, 5)]
        top = self.router.pick(task)
        return [top] if top else []

    def run_skill(self, token, request, named):
        try:
            name = named if named and shared.SKILL_NAME.match(named) and named in self.router.names() else self.router.pick(request)
            if not name:
                answer = "No skill matched this request. Try /find first."
            else:
                zh = bool(shared.CJK.search(request))
                answer = f"**{name}**\n\n" + self.llm(self.router.text(name, zh), request)
        except Exception as e:  # report the failure in the channel, not the logs
            answer = f"Sorry, that failed: {type(e).__name__}."
        parts = chunks(answer)
        base = f"{API}/webhooks/{self.app_id}/{token}"
        try:
            self.send("PATCH", base + "/messages/@original", {"content": parts[0]})
            for extra in parts[1:4]:
                self.send("POST", base, {"content": extra})
        except Exception:
            pass


def make_handler(bot):
    class H(BaseHTTPRequestHandler):
        def do_POST(self):
            if self.path.split("?")[0] != "/interactions":
                self.send_error(404)
                return
            n = int(self.headers.get("Content-Length") or 0)
            if n <= 0 or n > MAX_BODY:
                self.send_error(413)
                return
            status, out = bot.handle(self.headers, self.rfile.read(n))
            raw = json.dumps(out).encode()
            self.send_response(status)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)

        def do_GET(self):
            if self.path == "/healthz":
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"ok")
            else:
                self.send_error(404)

        def log_message(self, fmt, *args):  # status codes only, never bodies
            sys.stderr.write("%s %s\n" % (self.command, args[1] if len(args) > 1 else ""))
    return H


def selftest():
    t = []
    # RFC 8032 section 7.1, tests 1 and 2
    v1 = (bytes.fromhex("d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"), b"",
          bytes.fromhex("e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b"))
    v2 = (bytes.fromhex("3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c"), bytes.fromhex("72"),
          bytes.fromhex("92a009a9f0d4cab8720e820b5f642540a2b27b5416503f8fb3762223ebdb69da085ac1e43e15996e458f3613d0f11d8c387b2eaeb4302aeeb00d291612bb0c00"))
    for i, (pk, msg, sig) in enumerate((v1, v2), 1):
        t.append((f"RFC 8032 vector {i} (pure)", ed25519_verify_pure(pk, msg, sig)))
        t.append((f"RFC 8032 vector {i} tampered", not ed25519_verify_pure(pk, msg + b"x", sig)))
        t.append((f"RFC 8032 vector {i} (backend)", ed25519_verify(pk, msg, sig)))
    secret = bytes.fromhex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60")
    t.append(("public key from secret", ed25519_public_pure(secret) == v1[0]))
    t.append(("sign matches RFC", ed25519_sign_pure(secret, b"") == v1[2]))

    class FakeRouter:
        _tool = None
        def names(self): return {"prd-template"}
        def pick(self, text): return "prd-template"
        def text(self, name, zh): return "# PRD"
    sent = []
    bot = DiscordBot(v1[0].hex(), "123", router=FakeRouter(), llm=lambda s, u: "answer " * 600, send=lambda m, u, p=None: sent.append((m, u, p)))

    def signed(payload, ts=None):
        body = json.dumps(payload).encode()
        ts = str(ts or int(time.time()))
        return {"X-Signature-Timestamp": ts, "X-Signature-Ed25519": ed25519_sign_pure(secret, ts.encode() + body).hex()}, body
    h, b = signed({"type": 1})
    t.append(("ping answered", bot.handle(h, b) == (200, {"type": 1})))
    t.append(("bad signature refused", bot.handle({"X-Signature-Timestamp": h["X-Signature-Timestamp"], "X-Signature-Ed25519": "00" * 64}, b)[0] == 401))
    h2, b2 = signed({"type": 1}, ts=int(time.time()) - 3600)
    t.append(("old timestamp refused", bot.handle(h2, b2)[0] == 401))
    h3, b3 = signed({"type": 2, "token": "tok", "user": {"id": "u1"}, "data": {"name": "skill", "options": [{"name": "request", "value": "write a PRD"}]}})
    status, out = bot.handle(h3, b3)
    t.append(("skill deferred", status == 200 and out == {"type": 5}))
    for _ in range(50):
        if sent:
            break
        time.sleep(0.05)
    time.sleep(0.1)
    t.append(("answer edited in, long answer split", bool(sent) and sent[0][0] == "PATCH" and "@original" in sent[0][1] and len(sent) >= 2 and all(len(p["content"]) <= 2000 for _, _, p in sent)))
    limited = DiscordBot(v1[0].hex(), "123", router=FakeRouter(), llm=lambda s, u: "ok", send=lambda *a: None, per_min=1)
    h4, b4 = signed({"type": 2, "token": "t", "user": {"id": "u2"}, "data": {"name": "find", "options": [{"name": "task", "value": "prd"}]}})
    limited.handle(h4, b4)
    h5, b5 = signed({"type": 2, "token": "t", "user": {"id": "u2"}, "data": {"name": "find", "options": [{"name": "task", "value": "prd"}]}})
    t.append(("rate limit", "Too many" in limited.handle(h5, b5)[1]["data"]["content"]))
    failed = [n for n, ok in t if not ok]
    for n in failed:
        print(f"  FAIL {n}")
    print(f"pm_discord_bot selftest: {len(t) - len(failed)} passed, {len(failed)} failed")
    return 1 if failed else 0


def main(argv=None):
    ap = argparse.ArgumentParser(description="PM Skills Discord bot over HTTP interactions (/skill and /find).")
    ap.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8090")), help="port to listen on (default 8090)")
    ap.add_argument("--host", default="0.0.0.0", help="address to bind (default 0.0.0.0)")
    ap.add_argument("--register", action="store_true", help="register the /skill and /find commands, then exit")
    ap.add_argument("--selftest", action="store_true", help="run the built-in checks and exit")
    a = ap.parse_args(argv)
    if a.selftest:
        return selftest()
    if a.register:
        app, token = shared.env("DISCORD_APPLICATION_ID"), shared.env("DISCORD_BOT_TOKEN")
        if not (app.isdigit() and token):
            ap.error("set DISCORD_APPLICATION_ID and DISCORD_BOT_TOKEN")
        discord_request("PUT", f"{API}/applications/{app}/commands", COMMANDS, token=token)
        print("Registered /skill and /find. They can take a few minutes to appear.")
        return 0
    pk = shared.env("DISCORD_PUBLIC_KEY")
    try:
        if len(bytes.fromhex(pk)) != 32:
            raise ValueError
    except ValueError:
        ap.error("set DISCORD_PUBLIC_KEY to the application's public key (64 hex characters)")
    app = shared.env("DISCORD_APPLICATION_ID")
    if not app.isdigit():
        ap.error("set DISCORD_APPLICATION_ID")
    bot = DiscordBot(pk, app, per_min=int(shared.env("PM_RATE_PER_MIN", "6")))
    srv = ThreadingHTTPServer((a.host, a.port), make_handler(bot))
    print(f"Listening on {a.host}:{a.port} at /interactions (health: /healthz)")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    sys.exit(main())
