#!/usr/bin/env python3
"""PM Skills group-chat bot for Feishu (飞书), DingTalk (钉钉) and WeCom (企业微信).

A small HTTP server, Python 3.9+ standard library only. It receives a message from a
chat platform, picks the best-matching skill from the PM Skills library, calls any
OpenAI-compatible chat endpoint (DeepSeek, Qwen, GLM, ModelScope API-Inference, a
local Ollama ...) with that skill as the system prompt, and replies in the chat.

Routes:
    POST /feishu      Feishu custom app, event subscription (im.message.receive_v1)
    POST /dingtalk    DingTalk enterprise robot, HTTP outgoing messages
    GET|POST /wecom   WeCom self-built app, callback URL (encrypted XML)
    GET  /healthz     liveness probe, returns "ok"

Configuration is by environment variable only; see README.md in this folder.

    python3 pm_chat_bot.py serve --port 8080
    python3 pm_chat_bot.py route "帮我写周报"      # which skill would answer
    python3 pm_chat_bot.py --selftest              # signature and crypto vectors, offline

Library: https://github.com/mohitagw15856/pm-claude-skills
"""
import argparse
import base64
import hashlib
import hmac
import json
import logging
import os
import re
import struct
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import OrderedDict, deque
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
MAX_BODY = 1024 * 1024
log = logging.getLogger("pm-chat-bot")

# Defaults per provider. Model names change often: override with PM_LLM_MODEL and check the
# provider's own model list. Every entry is an OpenAI-compatible /chat/completions endpoint.
PROVIDERS = {
    "deepseek": ("https://api.deepseek.com/v1", "deepseek-chat"),
    "qwen": ("https://dashscope.aliyuncs.com/compatible-mode/v1", "qwen-plus"),
    "glm": ("https://open.bigmodel.cn/api/paas/v4", "glm-4.7-flash"),
    "modelscope": ("https://api-inference.modelscope.cn/v1", "deepseek-ai/DeepSeek-V4.1-Flash"),
    "ollama": ("http://localhost:11434/v1", "qwen2.5"),
}


def env(name, default=""):
    return os.environ.get(name, default).strip()


# ── AES-256-CBC decryption ───────────────────────────────────────────────────
# Feishu (with an Encrypt Key) and WeCom both encrypt callbacks with AES-256-CBC.
# If the optional `cryptography` package is installed it is used; otherwise a small
# pure-Python AES decryptor below handles it (decrypt only, slower, fine for chat-sized
# messages). Both are checked against openssl-generated vectors in --selftest.

def _xtime(a):
    return ((a << 1) ^ 0x1B) & 0xFF if a & 0x80 else a << 1


def _gmul(a, b):
    r = 0
    while b:
        if b & 1:
            r ^= a
        a = _xtime(a)
        b >>= 1
    return r


def _build_sbox():
    sbox = [0] * 256
    p = q = 1
    while True:
        p = p ^ ((p << 1) & 0xFF) ^ (0x1B if p & 0x80 else 0)
        q ^= (q << 1) & 0xFF
        q ^= (q << 2) & 0xFF
        q ^= (q << 4) & 0xFF
        if q & 0x80:
            q ^= 0x09
        rot = lambda x, s: ((x << s) | (x >> (8 - s))) & 0xFF  # noqa: E731
        sbox[p] = q ^ rot(q, 1) ^ rot(q, 2) ^ rot(q, 3) ^ rot(q, 4) ^ 0x63
        if p == 1:
            break
    sbox[0] = 0x63
    inv = [0] * 256
    for i, v in enumerate(sbox):
        inv[v] = i
    return sbox, inv


_SBOX, _INV_SBOX = _build_sbox()
_M9, _M11, _M13, _M14 = ([_gmul(i, k) for i in range(256)] for k in (9, 11, 13, 14))


def _expand_key_256(key):
    w = [list(key[4 * i:4 * i + 4]) for i in range(8)]
    rcon = 1
    for i in range(8, 60):
        t = list(w[i - 1])
        if i % 8 == 0:
            t = [_SBOX[b] for b in t[1:] + t[:1]]
            t[0] ^= rcon
            rcon = _xtime(rcon)
        elif i % 8 == 4:
            t = [_SBOX[b] for b in t]
        w.append([w[i - 8][j] ^ t[j] for j in range(4)])
    return [sum(w[4 * r:4 * r + 4], []) for r in range(15)]


def _inv_shift(s):
    return [s[r + 4 * ((c - r) % 4)] for c in range(4) for r in range(4)]


def _decrypt_block(block, rk):
    s = [b ^ k for b, k in zip(block, rk[14])]
    for rnd in range(13, -1, -1):
        s = [_INV_SBOX[b] for b in _inv_shift(s)]
        s = [b ^ k for b, k in zip(s, rk[rnd])]
        if rnd:
            out = []
            for c in range(4):
                a0, a1, a2, a3 = s[4 * c:4 * c + 4]
                out += [_M14[a0] ^ _M11[a1] ^ _M13[a2] ^ _M9[a3],
                        _M9[a0] ^ _M14[a1] ^ _M11[a2] ^ _M13[a3],
                        _M13[a0] ^ _M9[a1] ^ _M14[a2] ^ _M11[a3],
                        _M11[a0] ^ _M13[a1] ^ _M9[a2] ^ _M14[a3]]
            s = out
    return bytes(s)


def aes_cbc_decrypt(key, iv, data):
    """AES-256-CBC decrypt without unpadding. Uses `cryptography` when available."""
    if len(key) != 32 or len(iv) != 16 or len(data) % 16:
        raise ValueError("bad AES key, IV or ciphertext length")
    try:
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        d = Cipher(algorithms.AES(key), modes.CBC(iv)).decryptor()
        return d.update(data) + d.finalize()
    except ImportError:
        pass
    rk = _expand_key_256(key)
    out, prev = bytearray(), iv
    for i in range(0, len(data), 16):
        block = data[i:i + 16]
        out += bytes(a ^ b for a, b in zip(_decrypt_block(block, rk), prev))
        prev = block
    return bytes(out)


def aes_backend():
    try:
        import cryptography  # noqa: F401
        return "cryptography"
    except ImportError:
        return "pure-python"


def pkcs7_unpad(data, block):
    n = data[-1] if data else 0
    if not 1 <= n <= block or data[-n:] != bytes([n]) * n:
        raise ValueError("bad padding (wrong key?)")
    return data[:-n]


# ── Feishu ───────────────────────────────────────────────────────────────────
# Docs: open.feishu.cn, "事件订阅 / 配置订阅方式 / 将事件发送至开发者服务器" and
# "接收事件 / 安全校验". With an Encrypt Key set, the body is {"encrypt": "..."}:
# base64(IV[16] + AES-256-CBC(key=SHA256(encrypt_key), PKCS7)), and each request
# carries X-Lark-Request-Timestamp, X-Lark-Request-Nonce and
# X-Lark-Signature = sha256_hex(timestamp + nonce + encrypt_key + raw_body).

def feishu_signature(timestamp, nonce, encrypt_key, body):
    return hashlib.sha256((timestamp + nonce + encrypt_key).encode() + body).hexdigest()


def feishu_decrypt(encrypt_key, encrypted):
    raw = base64.b64decode(encrypted)
    key = hashlib.sha256(encrypt_key.encode()).digest()
    return pkcs7_unpad(aes_cbc_decrypt(key, raw[:16], raw[16:]), 16).decode("utf-8")


# ── DingTalk ─────────────────────────────────────────────────────────────────
# Docs: open.dingtalk.com, "企业内部开发机器人 / 接收消息 (HTTP 模式)". Each request has
# headers `timestamp` (ms) and `sign` = base64(HMAC-SHA256(key=AppSecret,
# msg=timestamp + "\n" + AppSecret)); the timestamp must be within one hour.

def dingtalk_sign(timestamp, app_secret):
    mac = hmac.new(app_secret.encode(), (timestamp + "\n" + app_secret).encode(), hashlib.sha256)
    return base64.b64encode(mac.digest()).decode()


def dingtalk_verify(timestamp, sign, app_secret, now_ms=None):
    if not (timestamp and sign and app_secret and timestamp.isdigit()):
        return False
    now_ms = int(time.time() * 1000) if now_ms is None else now_ms
    if abs(now_ms - int(timestamp)) > 3600 * 1000:
        return False
    return hmac.compare_digest(dingtalk_sign(timestamp, app_secret), sign)


DINGTALK_WEBHOOK_HOSTS = ("oapi.dingtalk.com", "api.dingtalk.com")


def dingtalk_webhook_ok(url):
    """Only post replies back to DingTalk itself, never to a URL a request names freely."""
    p = urllib.parse.urlparse(url or "")
    return p.scheme == "https" and p.hostname in DINGTALK_WEBHOOK_HOSTS


# ── WeCom ────────────────────────────────────────────────────────────────────
# Docs: developer.work.weixin.qq.com, "回调和回复的加解密方案". msg_signature =
# sha1_hex(sorted([token, timestamp, nonce, encrypted]) joined). AESKey =
# base64(EncodingAESKey + "="), IV = AESKey[:16], AES-256-CBC with PKCS7 padded to 32.
# Plaintext = random(16) + msg_len (4 bytes, big-endian) + msg + receiveid (the CorpID).

def wecom_signature(token, timestamp, nonce, encrypted):
    return hashlib.sha1("".join(sorted([token, timestamp, nonce, encrypted])).encode()).hexdigest()


def wecom_decrypt(encoding_aes_key, encrypted):
    key = base64.b64decode(encoding_aes_key + "=")
    plain = pkcs7_unpad(aes_cbc_decrypt(key, key[:16], base64.b64decode(encrypted)), 32)
    (n,) = struct.unpack(">I", plain[16:20])
    return plain[20:20 + n].decode("utf-8"), plain[20 + n:].decode("utf-8")


# ── Skill routing and the model call ─────────────────────────────────────────
SKILL_NAME = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
CJK = re.compile(r"[㐀-鿿]")
HELP_WORDS = {"help", "帮助", "/help", "使用说明", "怎么用"}


class SkillRouter:
    """Reuses the library's own routers: pm_router.py (if PM_ROUTER_MODEL points to a trained
    router.json) or the keyword scorer in china-agent-tools/pm_skills_tool.py."""

    def __init__(self, repo=DEFAULT_REPO, model_path=""):
        self.repo = repo
        self._router = None
        self._tool = None
        self._names = None
        for sub in ("router-model", "china-agent-tools"):
            path = os.path.join(HERE, "..", sub)
            if path not in sys.path:
                sys.path.insert(0, path)
        if model_path:
            from pm_router import Router
            self._router = Router.load(model_path)
        else:
            import pm_skills_tool
            self._tool = pm_skills_tool
            index = os.path.join(repo, "web", "skills-index.json")
            if os.path.exists(index) and pm_skills_tool._INDEX is None:
                # Same shape pm_skills_tool._index() builds from the mirror, read locally instead.
                with open(index, encoding="utf-8") as f:
                    data = json.load(f)
                tk = pm_skills_tool._tokens
                pm_skills_tool._INDEX = [
                    (s["name"], s.get("description", ""), tk(s["name"].replace("-", " ")),
                     tk(" ".join([s.get("description", ""), s.get("descriptionZh", "")])))
                    for s in data["skills"] if not s.get("deprecated")]

    def names(self):
        if self._names is None:
            d = os.path.join(self.repo, "skills")
            self._names = set(os.listdir(d)) if os.path.isdir(d) else set()
        return self._names

    def pick(self, text):
        if self._router:
            hits = self._router.route(text, k=1)
            return hits[0][0] if hits and hits[0][1] > 0 else ""
        hits = self._tool.find_skills(text, 1)
        return hits[0]["name"] if hits else ""

    def text(self, name, zh):
        paths = [os.path.join(self.repo, "skills", name, "SKILL.md")]
        if zh:
            paths.insert(0, os.path.join(self.repo, "skills-i18n", "zh", name, "SKILL.md"))
        for p in paths:
            if os.path.exists(p):
                with open(p, encoding="utf-8") as f:
                    return f.read()
        if self._tool is None:
            import pm_skills_tool
            self._tool = pm_skills_tool
        return self._tool.get_skill(name, "zh" if zh else "en")


def explicit_skill(text):
    """'/prd-template 需求...' or '#prd-template ...' picks a skill by name."""
    m = re.match(r"^\s*[/#]([a-z0-9]+(?:-[a-z0-9]+)*)\s*(.*)$", text, re.S)
    return (m.group(1), m.group(2).strip()) if m else ("", text)


def strip_think(text):
    return re.sub(r"<think>.*?</think>", "", text or "", flags=re.S).strip()


def call_llm(system, user):
    provider = env("PM_LLM_PROVIDER", "deepseek").lower()
    base, model = PROVIDERS.get(provider, ("", ""))
    base = env("PM_LLM_BASE_URL", base).rstrip("/")
    model = env("PM_LLM_MODEL", model)
    key = env("PM_LLM_API_KEY", "ollama" if provider == "ollama" else "")
    if not base or not model:
        raise RuntimeError("set PM_LLM_PROVIDER, or PM_LLM_BASE_URL and PM_LLM_MODEL")
    payload = {"model": model, "messages": [{"role": "system", "content": system},
                                            {"role": "user", "content": user}],
               "max_tokens": int(env("PM_LLM_MAX_TOKENS", "1500")), "stream": False}
    req = urllib.request.Request(base + "/chat/completions", data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json",
                                          "Authorization": "Bearer " + key})
    with urllib.request.urlopen(req, timeout=int(env("PM_LLM_TIMEOUT", "120"))) as res:
        data = json.loads(res.read().decode("utf-8"))
    return strip_think(data["choices"][0]["message"]["content"])


def http_json(url, payload=None, headers=None, timeout=15):
    data = None if payload is None else json.dumps(payload, ensure_ascii=False).encode("utf-8")
    hdrs = {"Content-Type": "application/json; charset=utf-8"}
    hdrs.update(headers or {})
    req = urllib.request.Request(url, data=data, headers=hdrs)
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return json.loads(res.read().decode("utf-8") or "{}")


def cut_bytes(text, limit):
    raw = text.encode("utf-8")
    return text if len(raw) <= limit else raw[:limit].decode("utf-8", "ignore") + "…"


# ── The bot: verification, dedupe, rate limits, dispatch ─────────────────────
class RateLimiter:
    def __init__(self, per_minute):
        self.per_minute = per_minute
        self.hits = {}
        self.lock = threading.Lock()

    def allow(self, who, now=None):
        if self.per_minute <= 0:
            return True
        now = time.time() if now is None else now
        with self.lock:
            q = self.hits.setdefault(who, deque())
            while q and now - q[0] > 60:
                q.popleft()
            if len(q) >= self.per_minute:
                return False
            q.append(now)
            return True


class Seen:
    """Platforms retry when they do not get a fast 200; answer each message once."""

    def __init__(self, size=2000):
        self.items, self.size, self.lock = OrderedDict(), size, threading.Lock()

    def first(self, key):
        if not key:
            return True
        with self.lock:
            if key in self.items:
                return False
            self.items[key] = 1
            if len(self.items) > self.size:
                self.items.popitem(last=False)
            return True


class Bot:
    def __init__(self, cfg=None, llm=call_llm, router=None, post=http_json, sync=False):
        self.cfg = dict(os.environ) if cfg is None else cfg
        self.llm, self.post, self.sync = llm, post, sync
        self._router = router
        self.limiter = RateLimiter(int(self.cfg.get("PM_RATE_PER_MIN", "5") or 0))
        self.seen = Seen()
        self.slots = threading.BoundedSemaphore(int(self.cfg.get("PM_MAX_CONCURRENCY", "4") or 4))
        self._tokens = {}

    def c(self, name, default=""):
        return (self.cfg.get(name) or default).strip()

    @property
    def router(self):
        if self._router is None:
            self._router = SkillRouter(self.c("PM_SKILLS_REPO", DEFAULT_REPO), self.c("PM_ROUTER_MODEL"))
        return self._router

    # Answer generation ------------------------------------------------------
    def answer(self, text):
        text = (text or "").strip()
        if not text or text.lower() in HELP_WORDS:
            return ("发一句你要做的事，我会挑一个合适的技能来回答，例如：帮我写周报。\n"
                    "也可以指定技能：/prd-template 我们要做一个……\n"
                    "Ask in English or Chinese. Library: https://github.com/mohitagw15856/pm-claude-skills")
        name, rest = explicit_skill(text)
        if name and name not in self.router.names():
            return "没有找到这个技能：%s。不加 / 直接描述需求也可以。" % name
        name = name or self.router.pick(text)
        rest = rest or text
        if not name:
            return "没有找到合适的技能，换个说法试试？Try rephrasing."
        skill = self.router.text(name, bool(CJK.search(rest)))
        reply = self.llm(skill, rest)
        return "【技能 %s】\n%s" % (name, reply)

    def run(self, who, text, reply):
        """Generate and deliver an answer; in a thread unless sync (self-test)."""
        def job():
            if not self.limiter.allow(who):
                reply("请求太频繁，请一分钟后再试。Too many requests, try again in a minute.")
                return
            if not self.slots.acquire(timeout=60):
                reply("现在有点忙，请稍后再试。Busy, please try again shortly.")
                return
            started = time.time()
            try:
                out = self.answer(text)
            except Exception as e:  # never surface keys or stack traces to the chat
                log.warning("answer failed: %s", type(e).__name__)
                out = "出错了，请稍后再试。Something went wrong, please try again."
            finally:
                self.slots.release()
            try:
                reply(out)
                log.info("replied in %.1fs (%d chars)", time.time() - started, len(out))
            except Exception as e:
                log.warning("reply failed: %s", type(e).__name__)
        if self.sync:
            job()
        else:
            threading.Thread(target=job, daemon=True).start()

    def _cached_token(self, key, fetch):
        tok, exp = self._tokens.get(key, ("", 0))
        if time.time() < exp - 120:
            return tok
        tok, ttl = fetch()
        self._tokens[key] = (tok, time.time() + ttl)
        return tok

    # Feishu ----------------------------------------------------------------
    def feishu(self, headers, body):
        key = self.c("FEISHU_ENCRYPT_KEY")
        try:
            data = json.loads(body.decode("utf-8") or "{}")
        except ValueError:
            return 400, {"error": "bad json"}
        if "encrypt" in data:
            if not key:
                return 400, {"error": "encrypted event but FEISHU_ENCRYPT_KEY is not set"}
            sig = headers.get("x-lark-signature", "")
            if sig:
                want = feishu_signature(headers.get("x-lark-request-timestamp", ""),
                                        headers.get("x-lark-request-nonce", ""), key, body)
                if not hmac.compare_digest(want, sig):
                    return 401, {"error": "bad signature"}
            try:
                data = json.loads(feishu_decrypt(key, data["encrypt"]))
            except ValueError:
                return 400, {"error": "cannot decrypt"}
            # Feishu's docs do not promise signature headers on the url_verification
            # request, so an unsigned body is only accepted for that one type.
            if not sig and data.get("type") != "url_verification":
                return 401, {"error": "missing signature"}
        elif key:
            return 400, {"error": "FEISHU_ENCRYPT_KEY is set but the event is not encrypted"}
        token = self.c("FEISHU_VERIFICATION_TOKEN")
        got = data.get("token") or (data.get("header") or {}).get("token", "")
        if token and not hmac.compare_digest(token, got or ""):
            return 401, {"error": "bad token"}
        if data.get("type") == "url_verification":
            return 200, {"challenge": data.get("challenge", "")}
        head, event = data.get("header") or {}, data.get("event") or {}
        if head.get("event_type") != "im.message.receive_v1" or not self.seen.first(head.get("event_id")):
            return 200, {}
        msg = event.get("message") or {}
        sender = (event.get("sender") or {}).get("sender_id", {}).get("open_id", "")
        if msg.get("message_type") != "text" or (event.get("sender") or {}).get("sender_type") == "app":
            return 200, {}
        try:
            text = json.loads(msg.get("content") or "{}").get("text", "")
        except ValueError:
            text = ""
        text = re.sub(r"@_user_\d+", "", text).strip()
        mid = msg.get("message_id", "")
        self.run("feishu:" + sender, text, lambda out: self.feishu_reply(mid, out))
        return 200, {}

    def feishu_reply(self, message_id, text):
        api = self.c("FEISHU_API_BASE", "https://open.feishu.cn").rstrip("/")

        def fetch():
            r = self.post(api + "/open-apis/auth/v3/tenant_access_token/internal",
                          {"app_id": self.c("FEISHU_APP_ID"), "app_secret": self.c("FEISHU_APP_SECRET")})
            if r.get("code"):
                raise RuntimeError("feishu token error %s" % r.get("code"))
            return r["tenant_access_token"], int(r.get("expire", 7200))
        token = self._cached_token("feishu", fetch)
        url = api + "/open-apis/im/v1/messages/%s/reply" % urllib.parse.quote(message_id, safe="")
        r = self.post(url, {"msg_type": "text",
                            "content": json.dumps({"text": cut_bytes(text, 60000)}, ensure_ascii=False)},
                      headers={"Authorization": "Bearer " + token})
        if r.get("code"):
            raise RuntimeError("feishu reply error %s" % r.get("code"))

    # DingTalk --------------------------------------------------------------
    def dingtalk(self, headers, body):
        secret = self.c("DINGTALK_APP_SECRET")
        if not secret:
            return 503, {"error": "DINGTALK_APP_SECRET is not set"}
        if not dingtalk_verify(headers.get("timestamp", ""), headers.get("sign", ""), secret):
            return 401, {"error": "bad signature"}
        try:
            data = json.loads(body.decode("utf-8") or "{}")
        except ValueError:
            return 400, {"error": "bad json"}
        if data.get("msgtype") != "text" or not self.seen.first(data.get("msgId")):
            return 200, {}
        text = ((data.get("text") or {}).get("content") or "").strip()
        hook = data.get("sessionWebhook", "")
        expires = int(data.get("sessionWebhookExpiredTime") or 0)
        if not dingtalk_webhook_ok(hook) or (expires and expires < time.time() * 1000):
            return 200, {}
        who = "dingtalk:" + str(data.get("senderStaffId") or data.get("senderId") or "")
        self.run(who, text, lambda out: self.post(hook, {"msgtype": "text", "text": {"content": cut_bytes(out, 18000)}}))
        return 200, {}

    # WeCom -----------------------------------------------------------------
    def wecom(self, method, query, body):
        token, aes_key, corp = self.c("WECOM_TOKEN"), self.c("WECOM_ENCODING_AES_KEY"), self.c("WECOM_CORP_ID")
        if not (token and aes_key and corp):
            return 503, "WECOM_TOKEN, WECOM_ENCODING_AES_KEY and WECOM_CORP_ID are required"
        q = lambda k: (query.get(k) or [""])[0]  # noqa: E731
        sig, ts, nonce = q("msg_signature"), q("timestamp"), q("nonce")
        if method == "GET":  # URL verification when the callback URL is saved
            echo = q("echostr")
            if not hmac.compare_digest(wecom_signature(token, ts, nonce, echo), sig):
                return 401, "bad signature"
            try:
                plain, rid = wecom_decrypt(aes_key, echo)
            except ValueError:
                return 400, "cannot decrypt"
            return (200, plain) if rid == corp else (401, "wrong receiveid")
        try:
            enc = ET.fromstring(body).findtext("Encrypt") or ""
        except ET.ParseError:
            return 400, "bad xml"
        if not hmac.compare_digest(wecom_signature(token, ts, nonce, enc), sig):
            return 401, "bad signature"
        try:
            plain, rid = wecom_decrypt(aes_key, enc)
            msg = ET.fromstring(plain.encode("utf-8"))
        except (ValueError, ET.ParseError):
            return 400, "cannot decrypt"
        if rid != corp:
            return 401, "wrong receiveid"
        if msg.findtext("MsgType") != "text" or not self.seen.first(msg.findtext("MsgId")):
            return 200, ""
        user = msg.findtext("FromUserName") or ""
        self.run("wecom:" + user, msg.findtext("Content") or "", lambda out: self.wecom_send(user, out))
        return 200, ""  # an empty reply tells WeCom the message was received

    def wecom_send(self, user, text):
        api = "https://qyapi.weixin.qq.com/cgi-bin"

        def fetch():
            r = self.post(api + "/gettoken?" + urllib.parse.urlencode(
                {"corpid": self.c("WECOM_CORP_ID"), "corpsecret": self.c("WECOM_SECRET")}))
            if r.get("errcode"):
                raise RuntimeError("wecom token error %s" % r.get("errcode"))
            return r["access_token"], int(r.get("expires_in", 7200))
        token = self._cached_token("wecom", fetch)
        raw, chunks = text, []
        while raw and len(chunks) < 4:  # text messages are capped at 2048 bytes
            part = cut_bytes(raw, 2000).rstrip("…")
            chunks.append(part)
            raw = raw[len(part):]
        for part in chunks:
            r = self.post(api + "/message/send?access_token=" + urllib.parse.quote(token), {
                "touser": user, "msgtype": "text", "agentid": int(self.c("WECOM_AGENT_ID", "0") or 0),
                "text": {"content": part}})
            if r.get("errcode"):
                raise RuntimeError("wecom send error %s" % r.get("errcode"))


# ── HTTP plumbing ────────────────────────────────────────────────────────────
def make_handler(bot):
    class Handler(BaseHTTPRequestHandler):
        server_version = "pm-chat-bot"

        def log_message(self, fmt, *args):  # query strings carry signatures; log the path only
            log.info("%s %s %s", self.command, urllib.parse.urlparse(self.path).path, args[1] if len(args) > 1 else "")

        def _send(self, status, payload):
            if isinstance(payload, (dict, list)):
                data, ctype = json.dumps(payload, ensure_ascii=False).encode(), "application/json; charset=utf-8"
            else:
                data, ctype = str(payload).encode("utf-8"), "text/plain; charset=utf-8"
            self.send_response(status)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        def _route(self):
            url = urllib.parse.urlparse(self.path)
            n = int(self.headers.get("Content-Length") or 0)
            if n > MAX_BODY:
                return self._send(413, "too large")
            body = self.rfile.read(n) if n else b""
            hdrs = {k.lower(): v for k, v in self.headers.items()}
            if url.path == "/healthz":
                return self._send(200, "ok")
            if url.path == "/feishu" and self.command == "POST":
                return self._send(*bot.feishu(hdrs, body))
            if url.path == "/dingtalk" and self.command == "POST":
                return self._send(*bot.dingtalk(hdrs, body))
            if url.path == "/wecom":
                return self._send(*bot.wecom(self.command, urllib.parse.parse_qs(url.query), body))
            return self._send(404, "not found")

        do_GET = do_POST = _route
    return Handler


# ── Self-test: vectors computed independently with openssl and shasum ────────
def selftest():
    results = {"pass": 0, "fail": 0, "skip": 0}

    def check(name, cond):
        results["pass" if cond else "fail"] += 1
        print(("  ok    " if cond else "  FAIL  ") + name)

    # DingTalk: printf '1700000000000\nSECtestsecret' | openssl dgst -sha256 -hmac SECtestsecret -binary | base64
    ding = "7LVwF0dAF3/+MRRulbpE4y72Ogzykc6bS2nG4I99T4s="
    check("dingtalk sign matches openssl vector", dingtalk_sign("1700000000000", "SECtestsecret") == ding)
    check("dingtalk verify accepts a fresh request", dingtalk_verify("1700000000000", ding, "SECtestsecret", 1700000600000))
    check("dingtalk verify rejects a stale timestamp", not dingtalk_verify("1700000000000", ding, "SECtestsecret", 1700003700001))
    check("dingtalk verify rejects a wrong secret", not dingtalk_verify("1700000000000", ding, "other", 1700000000000))
    check("dingtalk sessionWebhook host allowlist",
          dingtalk_webhook_ok("https://oapi.dingtalk.com/robot/sendBySession?session=x")
          and not dingtalk_webhook_ok("https://oapi.dingtalk.com.evil.example/x")
          and not dingtalk_webhook_ok("http://oapi.dingtalk.com/x"))
    # Feishu: printf '1700000000nonce123test-encrypt-key{"encrypt":"abc"}' | shasum -a 256
    check("feishu signature matches shasum vector",
          feishu_signature("1700000000", "nonce123", "test-encrypt-key", b'{"encrypt":"abc"}')
          == "9d429253e4fae70894782c1326278326eabe25e7943efc54505f28811b2d3235")
    # WeCom: sorted(['QDG6eK','1409659813','1372623149','ENCRYPTED']) joined | shasum -a 1
    check("wecom msg_signature matches shasum vector",
          wecom_signature("QDG6eK", "1409659813", "1372623149", "ENCRYPTED") == "4b40e8d8de95809d38b58bab93c13521ebd30959")

    # Feishu encrypted challenge: key sha256("test key"), IV 00..0f, openssl enc -aes-256-cbc
    fe = ("AAECAwQFBgcICQoLDA0ODw9mLTIAZS9jAmGTQ1wAhHpnBHVL2wRjH9rPunQdQC1vLjsckayA10kZ8cPwtb62F8rC"
          "7JprUPR/4S2aZihfR+p8npX7UzWPithZmfKIPZgE")
    plain = '{"challenge":"ajls384kdjx98XX","token":"xxxxxx","type":"url_verification"}'
    check("feishu AES decrypt (%s) matches openssl vector" % aes_backend(), feishu_decrypt("test key", fe) == plain)
    # WeCom: EncodingAESKey below, openssl enc -aes-256-cbc -nopad over random16+len+msg+corpid+pkcs7(32)
    wk = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG"
    we = ("Q3stYC6hdFzMh9T8HCvyDNMeYCOnAyf3OrKC+Ct5/vHZ0Bum6KK4LVwUKCdxcjveRDUkIteDUDQZbR0PwZoCG5Jya0IK/IKm6Nl4pLW97"
          "ku7g+sTes0Cv1H+e1fEd+ZZLRDPMfUEoalQHVp/YNkkoa5VBwCVahPRQvvtRFduQyWuXs/cH1KAXjM8QhdcAGqsg7Mze3869e3ucpm57ftO1E0"
          "gjRPjaLln8vp41yVGjxpvZ2Vnk8h+LHJboFdTOr4ymbr5Wwel3AFD4MbvZ0jJnGYDnidIYuGJPTXqAaGhf42Jz6bbTZfU5EbAEVapxNaHMq272"
          "Q66v4qFCzmLXRtNVNIn7s+o0V2YMt8RRY/kI9ZyxXHvVkSbxrsaI73kMtxO")
    msg, rid = wecom_decrypt(wk, we)
    check("wecom AES decrypt matches openssl vector", rid == "wwcorp123" and "<Content><![CDATA[帮我写周报]]>" in msg)
    try:
        feishu_decrypt("wrong key", fe)
        check("feishu decrypt rejects a wrong key", False)
    except (ValueError, UnicodeDecodeError):
        check("feishu decrypt rejects a wrong key", True)

    # End to end through the handlers, with the model and the network stubbed out.
    sent = []

    class StubRouter:
        def names(self):
            return {"cn-weekly-report", "prd-template"}

        def pick(self, text):
            return "cn-weekly-report"

        def text(self, name, zh):
            return "SKILL " + name

    def post(url, payload=None, headers=None):
        sent.append((url, payload))
        if "gettoken" in url:
            return {"errcode": 0, "access_token": "T", "expires_in": 7200}
        if "tenant_access_token" in url:
            return {"code": 0, "tenant_access_token": "T", "expire": 7200}
        return {"errcode": 0}

    cfg = {"FEISHU_VERIFICATION_TOKEN": "xxxxxx", "DINGTALK_APP_SECRET": "SECtestsecret",
           "WECOM_TOKEN": "QDG6eK", "WECOM_ENCODING_AES_KEY": wk, "WECOM_CORP_ID": "wwcorp123",
           "WECOM_AGENT_ID": "1000002", "PM_RATE_PER_MIN": "2"}
    bot = Bot(cfg, llm=lambda system, user: "[%s] %s" % (system, user), router=StubRouter(), post=post, sync=True)
    check("feishu url_verification returns the challenge",
          bot.feishu({}, plain.encode()) == (200, {"challenge": "ajls384kdjx98XX"}))
    check("feishu url_verification rejects a wrong token",
          bot.feishu({}, plain.replace("xxxxxx", "nope").encode())[0] == 401)
    bot_enc = Bot(dict(cfg, FEISHU_ENCRYPT_KEY="test key"), router=StubRouter(), post=post, sync=True)
    check("feishu encrypted url_verification returns the challenge",
          bot_enc.feishu({}, json.dumps({"encrypt": fe}).encode()) == (200, {"challenge": "ajls384kdjx98XX"}))
    event = {"schema": "2.0", "header": {"event_id": "e1", "event_type": "im.message.receive_v1", "token": "xxxxxx"},
             "event": {"sender": {"sender_id": {"open_id": "ou_1"}, "sender_type": "user"},
                       "message": {"message_id": "om_1", "message_type": "text", "chat_type": "group",
                                   "content": json.dumps({"text": "@_user_1 帮我写周报"})}}}
    sent.clear()
    bot.feishu({}, json.dumps(event).encode())
    check("feishu message routes, calls the model and replies",
          any(u.endswith("/messages/om_1/reply") and json.loads(p["content"])["text"]
              == "【技能 cn-weekly-report】\n[SKILL cn-weekly-report] 帮我写周报" for u, p in sent))
    sent.clear()
    bot.feishu({}, json.dumps(event).encode())
    check("feishu retry with the same event_id is ignored", not sent)

    ts = str(int(time.time() * 1000))
    dt = {"msgtype": "text", "msgId": "m1", "text": {"content": " /prd-template 做一个签到功能"},
          "senderStaffId": "u1", "sessionWebhook": "https://oapi.dingtalk.com/robot/sendBySession?session=s"}
    check("dingtalk rejects a bad signature", bot.dingtalk({"timestamp": ts, "sign": "x"}, b"{}")[0] == 401)
    sent.clear()
    bot.dingtalk({"timestamp": ts, "sign": dingtalk_sign(ts, "SECtestsecret")}, json.dumps(dt, ensure_ascii=False).encode())
    check("dingtalk explicit /skill replies through sessionWebhook",
          sent and sent[0][0].startswith("https://oapi.dingtalk.com/")
          and sent[0][1]["text"]["content"].startswith("【技能 prd-template】\n[SKILL prd-template] 做一个签到功能"))
    sent.clear()
    bot.dingtalk({"timestamp": ts, "sign": dingtalk_sign(ts, "SECtestsecret")},
                 json.dumps(dict(dt, msgId="m2", sessionWebhook="https://evil.example/x")).encode())
    check("dingtalk ignores a sessionWebhook outside DingTalk", not sent)

    check("wecom GET verification echoes the decrypted echostr",
          bot.wecom("GET", {"msg_signature": [wecom_signature("QDG6eK", "1", "n", we)], "timestamp": ["1"],
                            "nonce": ["n"], "echostr": [we]}, b"") == (200, msg))
    xml_body = ("<xml><ToUserName><![CDATA[wwcorp123]]></ToUserName><Encrypt><![CDATA[%s]]></Encrypt></xml>" % we).encode()
    check("wecom POST rejects a bad signature",
          bot.wecom("POST", {"msg_signature": ["0" * 40], "timestamp": ["1"], "nonce": ["n"]}, xml_body)[0] == 401)
    sent.clear()
    status = bot.wecom("POST", {"msg_signature": [wecom_signature("QDG6eK", "1", "n", we)], "timestamp": ["1"],
                                "nonce": ["n"]}, xml_body)
    check("wecom POST decrypts, answers and sends via message/send",
          status == (200, "") and any(p and p.get("touser") == "zhangsan" and p["agentid"] == 1000002 for _, p in sent))
    bot_corp = Bot(dict(cfg, WECOM_CORP_ID="other"), router=StubRouter(), post=post, sync=True)
    check("wecom rejects a message for another CorpID",
          bot_corp.wecom("POST", {"msg_signature": [wecom_signature("QDG6eK", "1", "n", we)], "timestamp": ["1"],
                                  "nonce": ["n"]}, xml_body)[0] == 401)

    rl = RateLimiter(2)
    check("rate limiter allows 2 per minute then refuses",
          rl.allow("a", 0) and rl.allow("a", 1) and not rl.allow("a", 2) and rl.allow("a", 61) and rl.allow("b", 2))
    check("explicit skill parsing", explicit_skill("#okr-builder 下季度") == ("okr-builder", "下季度")
          and explicit_skill("帮我写周报") == ("", "帮我写周报"))
    check("reasoning blocks are stripped", strip_think("<think>x\ny</think>\n答案") == "答案")
    check("byte-safe truncation keeps valid UTF-8", cut_bytes("周报" * 10, 7) == "周报…")

    index = os.path.join(DEFAULT_REPO, "web", "skills-index.json")
    if os.path.exists(index):
        check("real router picks cn-weekly-report for 帮我写周报", SkillRouter().pick("帮我写周报") == "cn-weekly-report")
    else:
        results["skip"] += 1
        print("  skip  real router (no local web/skills-index.json)")
    print("selftest: %d passed, %d failed, %d skipped (AES backend: %s)"
          % (results["pass"], results["fail"], results["skip"], aes_backend()))
    return 1 if results["fail"] else 0


def main(argv=None):
    ap = argparse.ArgumentParser(
        prog="pm_chat_bot.py",
        description="PM Skills group-chat bot for Feishu, DingTalk and WeCom. Configure with environment "
                    "variables (see README.md): PM_LLM_PROVIDER / PM_LLM_BASE_URL / PM_LLM_API_KEY / PM_LLM_MODEL, "
                    "FEISHU_*, DINGTALK_APP_SECRET, WECOM_*.")
    ap.add_argument("--selftest", action="store_true", help="run offline signature, crypto and handler checks")
    sub = ap.add_subparsers(dest="cmd")
    s = sub.add_parser("serve", help="start the HTTP server")
    s.add_argument("--host", default=env("HOST", "0.0.0.0"))
    s.add_argument("--port", type=int, default=int(env("PORT", "8080")))
    r = sub.add_parser("route", help="show which skill a message would use (no model call)")
    r.add_argument("text")
    args = ap.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    if args.selftest:
        return selftest()
    if args.cmd == "route":
        name, rest = explicit_skill(args.text)
        print(name or SkillRouter(env("PM_SKILLS_REPO", DEFAULT_REPO), env("PM_ROUTER_MODEL")).pick(rest) or "(no match)")
        return 0
    if args.cmd == "serve":
        bot = Bot()
        enabled = [p for p, k in (("feishu", "FEISHU_APP_ID"), ("dingtalk", "DINGTALK_APP_SECRET"),
                                  ("wecom", "WECOM_CORP_ID")) if env(k)]
        log.info("listening on %s:%d, platforms: %s, provider: %s, AES: %s", args.host, args.port,
                 ", ".join(enabled) or "none configured", env("PM_LLM_PROVIDER", "deepseek"), aes_backend())
        ThreadingHTTPServer((args.host, args.port), make_handler(bot)).serve_forever()
        return 0
    ap.print_help()
    return 0


if __name__ == "__main__":
    sys.exit(main())
