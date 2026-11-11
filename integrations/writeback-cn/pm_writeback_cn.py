#!/usr/bin/env python3
"""Write a finished skill output into 飞书文档, 语雀 or 钉钉文档. Standard library only.

    python3 pm_writeback_cn.py --dest feishu   --title "周报 11.10" --file out.md
    python3 pm_writeback_cn.py --dest yuque    --title "复盘" --repo team/handbook < out.md
    python3 pm_writeback_cn.py --dest dingtalk --title "述职" --doc-key <docKey> --operator-id <unionId> --file out.md
    python3 pm_writeback_cn.py --dest feishu --title x --file out.md --dry-run   # show the requests, send nothing
    python3 pm_writeback_cn.py --selftest                                         # offline checks, no network

It runs on your own machine with credentials you hold in environment variables, so
nothing passes through a relay. It is the mainland counterpart of
integrations/writeback (GitHub, Notion, Linear, Slack), which is a Cloudflare Worker
and is not reachable from mainland China.

Credentials (only the ones for the destination you use):
    feishu    FEISHU_APP_ID, FEISHU_APP_SECRET     optional FEISHU_FOLDER_TOKEN
    yuque     YUQUE_TOKEN
    dingtalk  DINGTALK_APP_KEY, DINGTALK_APP_SECRET

The request shapes follow each platform's published API. They are checked offline
by --selftest against recorded shapes, and have not been exercised against the live
services from this repository. Run with --dry-run first.
"""
import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

TIMEOUT = 30
SAFE_ID = re.compile(r"^[A-Za-z0-9_\-]{1,128}$")
# Each part starts with a letter, digit, "_" or "-", so "." and ".." can never be a path segment.
YUQUE_REPO = re.compile(r"^[A-Za-z0-9_\-][A-Za-z0-9_\-.]{0,63}/[A-Za-z0-9_\-][A-Za-z0-9_\-.]{0,63}$|^\d{1,20}$")
FEISHU_MAX_CHILDREN = 50      # blocks per create-children call
FEISHU_MAX_TEXT = 3000        # keep a single text run well inside the platform limit


class WritebackError(Exception):
    pass


def http_json(method, url, headers=None, body=None):
    """One JSON request. Returns the decoded JSON body. Raises WritebackError on any failure."""
    data = json.dumps(body, ensure_ascii=False).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json; charset=utf-8")
    req.add_header("User-Agent", "pm-skills-writeback-cn")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            raw = res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:300]
        raise WritebackError(f"{method} {_host(url)} returned HTTP {e.code}: {detail}")
    except (urllib.error.URLError, OSError) as e:
        raise WritebackError(f"could not reach {_host(url)}: {e}")
    try:
        return json.loads(raw) if raw else {}
    except ValueError:
        raise WritebackError(f"{_host(url)} did not return JSON: {raw[:200]}")


def _host(url):
    return urllib.parse.urlsplit(url).netloc


def need_env(*names):
    missing = [n for n in names if not os.environ.get(n)]
    if missing:
        raise WritebackError("set " + ", ".join(missing) + " in the environment")
    return [os.environ[n] for n in names]


def safe_id(value, what):
    if not isinstance(value, str) or not SAFE_ID.match(value):
        raise WritebackError(f"{what} must be letters, digits, '-' or '_' (got {value!r})")
    return value


# ── Markdown to Feishu blocks ────────────────────────────────────────────────
# Feishu docx block types: 2 text, 3-11 heading1-9, 12 bullet, 13 ordered, 14 code, 15 quote.
_HEADING_KEY = {n: f"heading{n}" for n in range(1, 10)}
_INLINE = re.compile(r"(\*\*[^*\n]+\*\*|`[^`\n]+`)")


def _elements(text):
    """Split a line into text runs, keeping **bold** and `code` as styled runs."""
    out = []
    for part in _INLINE.split(text):
        if not part:
            continue
        style = {}
        if part.startswith("**") and part.endswith("**") and len(part) > 4:
            part, style = part[2:-2], {"bold": True}
        elif part.startswith("`") and part.endswith("`") and len(part) > 2:
            part, style = part[1:-1], {"inline_code": True}
        for i in range(0, len(part), FEISHU_MAX_TEXT):
            run = {"content": part[i:i + FEISHU_MAX_TEXT]}
            if style:
                run["text_element_style"] = style
            out.append({"text_run": run})
    return out or [{"text_run": {"content": ""}}]


def _block(block_type, key, text):
    return {"block_type": block_type, key: {"elements": _elements(text)}}


def markdown_to_feishu_blocks(markdown):
    """A flat list of Feishu blocks. Tables and nested lists are kept as plain text lines."""
    blocks, code, in_code = [], [], False
    for line in markdown.replace("\r\n", "\n").split("\n"):
        if line.strip().startswith("```"):
            if in_code:
                blocks.append({"block_type": 14, "code": {"elements": [{"text_run": {"content": "\n".join(code)[:FEISHU_MAX_TEXT * 10]}}]}})
                code, in_code = [], False
            else:
                in_code = True
            continue
        if in_code:
            code.append(line)
            continue
        if not line.strip():
            continue
        m = re.match(r"^(#{1,9})\s+(.*)$", line)
        if m:
            n = len(m.group(1))
            blocks.append(_block(2 + n, _HEADING_KEY[n], m.group(2).strip()))
            continue
        m = re.match(r"^\s*[-*+]\s+(.*)$", line)
        if m:
            blocks.append(_block(12, "bullet", m.group(1)))
            continue
        m = re.match(r"^\s*\d+[.)]\s+(.*)$", line)
        if m:
            blocks.append(_block(13, "ordered", m.group(1)))
            continue
        m = re.match(r"^\s*>\s?(.*)$", line)
        if m:
            blocks.append(_block(15, "quote", m.group(1)))
            continue
        blocks.append(_block(2, "text", line))
    if in_code and code:   # an unterminated fence still keeps its content
        blocks.append({"block_type": 14, "code": {"elements": [{"text_run": {"content": "\n".join(code)}}]}})
    return blocks


# ── Destinations ─────────────────────────────────────────────────────────────
def _feishu_ok(res, step):
    if res.get("code") != 0:
        raise WritebackError(f"Feishu {step} failed: code {res.get('code')}, {str(res.get('msg'))[:200]}")
    return res


def to_feishu(args, markdown, http):
    app_id, app_secret = need_env("FEISHU_APP_ID", "FEISHU_APP_SECRET")
    base = "https://open.feishu.cn/open-apis"
    token = _feishu_ok(http("POST", f"{base}/auth/v3/tenant_access_token/internal",
                            None, {"app_id": app_id, "app_secret": app_secret}), "sign-in").get("tenant_access_token")
    if not token:
        raise WritebackError("Feishu sign-in returned no tenant_access_token")
    auth = {"Authorization": f"Bearer {token}"}

    body = {"title": args.title}
    folder = args.folder or os.environ.get("FEISHU_FOLDER_TOKEN", "")
    if folder:
        body["folder_token"] = safe_id(folder, "the Feishu folder token")
    doc = _feishu_ok(http("POST", f"{base}/docx/v1/documents", auth, body), "create document")
    doc_id = safe_id(doc.get("data", {}).get("document", {}).get("document_id", ""), "the Feishu document id")

    blocks = markdown_to_feishu_blocks(markdown)
    for i in range(0, len(blocks), FEISHU_MAX_CHILDREN):
        # The document's root block has the same id as the document.
        _feishu_ok(http("POST", f"{base}/docx/v1/documents/{doc_id}/blocks/{doc_id}/children", auth,
                        {"children": blocks[i:i + FEISHU_MAX_CHILDREN], "index": -1}), "write content")

    if args.share_email:
        _feishu_ok(http("POST", f"{base}/drive/v1/permissions/{doc_id}/members?type=docx&need_notification=false", auth,
                        {"member_type": "email", "member_id": args.share_email, "perm": "full_access"}), "share")

    note = "" if (folder or args.share_email) else (
        " A document created by an app with no folder and no collaborator is visible only to the app."
        " Pass --folder (a folder shared with the app) or --share-email.")
    return {"id": doc_id, "url": f"https://feishu.cn/docx/{doc_id}", "blocks": len(blocks), "note": note.strip()}


def to_yuque(args, markdown, http):
    (token,) = need_env("YUQUE_TOKEN")
    if not args.repo or not YUQUE_REPO.match(args.repo):
        raise WritebackError("--repo must be a Yuque knowledge base as login/slug (for example team/handbook) or its numeric id")
    repo = urllib.parse.quote(args.repo, safe="/")
    res = http("POST", f"https://www.yuque.com/api/v2/repos/{repo}/docs", {"X-Auth-Token": token},
               {"title": args.title, "format": "markdown", "body": markdown, "public": 0})
    data = res.get("data") or {}
    if not data.get("slug"):
        raise WritebackError(f"Yuque did not return a document: {json.dumps(res, ensure_ascii=False)[:200]}")
    url = f"https://www.yuque.com/{args.repo}/{data['slug']}" if "/" in args.repo else ""
    return {"id": str(data.get("id", "")), "url": url, "note": ""}


def to_dingtalk(args, markdown, http):
    app_key, app_secret = need_env("DINGTALK_APP_KEY", "DINGTALK_APP_SECRET")
    if not args.operator_id:
        raise WritebackError("--operator-id (the unionId of the user the document is written as) is required for DingTalk")
    operator = safe_id(args.operator_id, "--operator-id")
    base = "https://api.dingtalk.com"
    token = http("POST", f"{base}/v1.0/oauth2/accessToken", None, {"appKey": app_key, "appSecret": app_secret}).get("accessToken")
    if not token:
        raise WritebackError("DingTalk sign-in returned no accessToken")
    auth = {"x-acs-dingtalk-access-token": token}

    doc_key, url = args.doc_key, ""
    if doc_key:
        doc_key = safe_id(doc_key, "--doc-key")
    else:
        if not args.workspace_id:
            raise WritebackError("pass --doc-key to overwrite an existing document, or --workspace-id to create one in a knowledge base")
        ws = safe_id(args.workspace_id, "--workspace-id")
        created = http("POST", f"{base}/v1.0/doc/workspaces/{ws}/docs", auth,
                       {"name": args.title, "docType": "DOC", "operatorId": operator})
        doc_key, url = created.get("docKey", ""), created.get("url", "")
        if not doc_key:
            raise WritebackError(f"DingTalk did not return a docKey: {json.dumps(created, ensure_ascii=False)[:200]}")
        doc_key = safe_id(doc_key, "the DingTalk docKey")

    http("POST", f"{base}/v1.0/doc/suites/documents/{doc_key}/overwriteContent?operatorId={urllib.parse.quote(operator)}", auth,
         {"dataType": "markdown", "content": markdown})
    return {"id": doc_key, "url": url, "note": "" if not args.doc_key else "The existing document's content was replaced."}


DESTS = {"feishu": to_feishu, "yuque": to_yuque, "dingtalk": to_dingtalk}


# ── Dry run and self-test transports ─────────────────────────────────────────
class Recorder:
    """Stands in for http_json: records each request and returns a canned success."""

    def __init__(self):
        self.calls = []

    def __call__(self, method, url, headers=None, body=None):
        self.calls.append({"method": method, "url": url, "headers": sorted((headers or {}).keys()), "body": body})
        if "tenant_access_token" in url:
            return {"code": 0, "tenant_access_token": "t-test"}
        if url.endswith("/docx/v1/documents"):
            return {"code": 0, "data": {"document": {"document_id": "doxTEST123"}}}
        if "open.feishu.cn" in url:
            return {"code": 0, "data": {}}
        if "yuque.com" in url:
            return {"data": {"id": 42, "slug": "abc123"}}
        if url.endswith("/oauth2/accessToken"):
            return {"accessToken": "d-test"}
        if "/doc/workspaces/" in url:
            return {"docKey": "dkTEST", "url": "https://alidocs.dingtalk.com/i/nodes/dkTEST"}
        return {}


def redact(call):
    body = call["body"]
    if isinstance(body, dict):
        body = {k: ("<redacted>" if k in ("app_secret", "appSecret", "app_id", "appKey") else v) for k, v in body.items()}
        if "children" in body:
            body = dict(body, children=f"<{len(body['children'])} blocks>")
        for k in ("body", "content"):
            if isinstance(body.get(k), str) and len(body[k]) > 80:
                body = dict(body, **{k: body[k][:80] + "…"})
    return {"method": call["method"], "url": call["url"], "headers": call["headers"], "body": body}


def selftest():
    passed = failed = 0

    def check(name, ok):
        nonlocal passed, failed
        if ok:
            passed += 1
        else:
            failed += 1
            print("  ✗ " + name)

    md = "# 周报\n\n本周完成 **三项** 工作，见 `PR-12`。\n\n- 第一项\n- 第二项\n\n1. 步骤一\n2) 步骤二\n\n> 引用\n\n```python\nprint('hi')\n```\n\n| a | b |\n|---|---|\n"
    blocks = markdown_to_feishu_blocks(md)
    types = [b["block_type"] for b in blocks]
    check("heading, text, bullets, ordered, quote, code, table lines in order", types == [3, 2, 12, 12, 13, 13, 15, 14, 2, 2])
    check("heading1 uses the heading1 key", "heading1" in blocks[0])
    runs = blocks[1]["text"]["elements"]
    check("bold and inline code become styled runs",
          any(r["text_run"].get("text_element_style") == {"bold": True} and r["text_run"]["content"] == "三项" for r in runs)
          and any(r["text_run"].get("text_element_style") == {"inline_code": True} for r in runs))
    check("code block keeps its content without the fence", blocks[7]["code"]["elements"][0]["text_run"]["content"] == "print('hi')")
    check("an unterminated fence keeps its content", markdown_to_feishu_blocks("```\nabc")[0]["block_type"] == 14)
    check("empty markdown gives no blocks", markdown_to_feishu_blocks("\n\n") == [])
    long_blocks = markdown_to_feishu_blocks("\n".join(f"- item {i}" for i in range(120)))

    saved = dict(os.environ)
    try:
        os.environ.update({"FEISHU_APP_ID": "cli_x", "FEISHU_APP_SECRET": "s", "YUQUE_TOKEN": "y",
                           "DINGTALK_APP_KEY": "k", "DINGTALK_APP_SECRET": "s"})
        os.environ.pop("FEISHU_FOLDER_TOKEN", None)
        ns = lambda **kw: argparse.Namespace(**dict(dict(title="T", folder="", share_email="", repo="", doc_key="", workspace_id="", operator_id=""), **kw))

        rec = Recorder()
        out = to_feishu(ns(folder="fldABC", share_email="a@b.cn"), "\n".join(f"- item {i}" for i in range(120)), rec)
        writes = [c for c in rec.calls if c["url"].endswith("/children")]
        check("feishu signs in, creates, writes in batches of 50, shares", [len(c["body"]["children"]) for c in writes] == [50, 50, 20]
              and rec.calls[1]["body"] == {"title": "T", "folder_token": "fldABC"} and "permissions/doxTEST123/members" in rec.calls[-1]["url"])
        check("feishu writes to the root block and returns the id", "/documents/doxTEST123/blocks/doxTEST123/children" in writes[0]["url"] and out["id"] == "doxTEST123" and out["blocks"] == len(long_blocks))
        rec = Recorder()
        check("feishu warns when the document would be invisible", "visible only to the app" in to_feishu(ns(), "x", rec)["note"])

        rec = Recorder()
        out = to_yuque(ns(repo="team/handbook"), "# x", rec)
        check("yuque posts markdown to the repo and builds the url", rec.calls[0]["url"] == "https://www.yuque.com/api/v2/repos/team/handbook/docs"
              and rec.calls[0]["body"]["format"] == "markdown" and out["url"] == "https://www.yuque.com/team/handbook/abc123")
        for bad in ("", "../etc", "a/b/c", "team/hand book"):
            try:
                to_yuque(ns(repo=bad), "x", Recorder())
                check(f"yuque rejects repo {bad!r}", False)
            except WritebackError:
                check("yuque rejects a bad repo", True)

        rec = Recorder()
        out = to_dingtalk(ns(workspace_id="ws1", operator_id="union1"), "# x", rec)
        check("dingtalk creates in the workspace then overwrites as markdown", "/v1.0/doc/workspaces/ws1/docs" in rec.calls[1]["url"]
              and rec.calls[2]["url"].endswith("/v1.0/doc/suites/documents/dkTEST/overwriteContent?operatorId=union1")
              and rec.calls[2]["body"] == {"dataType": "markdown", "content": "# x"} and out["id"] == "dkTEST")
        rec = Recorder()
        to_dingtalk(ns(doc_key="existing1", operator_id="union1"), "x", rec)
        check("dingtalk with --doc-key only overwrites", len(rec.calls) == 2 and "existing1/overwriteContent" in rec.calls[1]["url"])
        for kw in ({"operator_id": ""}, {"operator_id": "u", "doc_key": "../x"}, {"operator_id": "u"}):
            try:
                to_dingtalk(ns(**kw), "x", Recorder())
                check(f"dingtalk rejects {kw}", False)
            except WritebackError:
                check("dingtalk rejects bad input", True)

        del os.environ["YUQUE_TOKEN"]
        try:
            to_yuque(ns(repo="a/b"), "x", Recorder())
            check("missing credentials are reported", False)
        except WritebackError as e:
            check("missing credentials are named", "YUQUE_TOKEN" in str(e))
        check("redaction hides secrets", "<redacted>" in json.dumps(redact({"method": "POST", "url": "u", "headers": [], "body": {"app_secret": "s"}})))
    finally:
        os.environ.clear()
        os.environ.update(saved)

    print(f"writeback-cn selftest: {passed} passed, {failed} failed")
    return 1 if failed else 0


def main(argv=None):
    p = argparse.ArgumentParser(description="Write markdown into 飞书文档, 语雀 or 钉钉文档.")
    p.add_argument("--dest", choices=sorted(DESTS))
    p.add_argument("--title", default="")
    p.add_argument("--file", help="markdown file; omit to read standard input")
    p.add_argument("--folder", default="", help="feishu: folder token (or FEISHU_FOLDER_TOKEN)")
    p.add_argument("--share-email", default="", help="feishu: give this user full access to the new document")
    p.add_argument("--repo", default="", help="yuque: knowledge base as login/slug, or its numeric id")
    p.add_argument("--workspace-id", default="", help="dingtalk: knowledge base to create the document in")
    p.add_argument("--doc-key", default="", help="dingtalk: overwrite this existing document instead of creating one")
    p.add_argument("--operator-id", default="", help="dingtalk: unionId of the user the document is written as")
    p.add_argument("--dry-run", action="store_true", help="print the requests that would be sent and send nothing")
    p.add_argument("--json", action="store_true", help="print the result as JSON")
    p.add_argument("--selftest", action="store_true")
    args = p.parse_args(argv)

    if args.selftest:
        return selftest()
    if not args.dest:
        p.error("--dest is required")
    if not args.title.strip():
        p.error("--title is required")
    try:
        if args.file:
            with open(args.file, encoding="utf-8") as f:
                markdown = f.read()
        else:
            markdown = sys.stdin.read()
    except OSError as e:
        print(f"Error: could not read the markdown: {e}", file=sys.stderr)
        return 2
    if not markdown.strip():
        print("Error: the markdown is empty.", file=sys.stderr)
        return 2

    http = Recorder() if args.dry_run else http_json
    try:
        result = DESTS[args.dest](args, markdown, http)
    except WritebackError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1
    if args.dry_run:
        print(json.dumps({"dry_run": True, "requests": [redact(c) for c in http.calls]}, ensure_ascii=False, indent=2))
        return 0
    if args.json:
        print(json.dumps(dict(result, ok=True, dest=args.dest), ensure_ascii=False))
    else:
        print(f"Written to {args.dest}: {result.get('url') or result.get('id')}")
        if result.get("note"):
            print(result["note"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
