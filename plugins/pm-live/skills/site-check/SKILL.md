---
name: site-check
description: "Answer 'is this site down or is it just me' properly — curl status/timing diagnostics, DNS cross-check, and TLS certificate reads, assembled into a where-it's-broken diagnosis. Use when asked is this website down, why can't I reach this site, check if my site is up, or is the SSL certificate expired. Produces the layered diagnosis (DNS → TLS → HTTP → content), response timing, cert expiry, and the rerunnable commands."
---

# Site Check Skill

"Is it down or is it me?" is a diagnosis, not a yes/no — a site can fail at DNS, at TLS, at HTTP, or only from your network, and each failure names a different fix. This skill runs the layers in order with plain curl, reads the evidence (status codes, cert dates, resolver agreement), and answers with *where* it's broken, which is the answer that was actually needed.

## What This Skill Produces

- **The verdict** — up / down-for-everyone-probably / broken-at-layer-X / likely-just-you, with the evidence
- **The layer results** — DNS resolution, TLS handshake + cert expiry, HTTP status, response timing
- **The interpretation** — what a 503 vs. a timeout vs. a cert error vs. NXDOMAIN each means, in words
- **The commands** — every check rerunnable

## Required Inputs

Ask for these if not provided:
- **The URL/domain** — as the user experiences it (scheme and path matter; `example.com` up and `example.com/app` down is a real and common state)
- **The symptom** — error message, spinner, cert warning — it picks which layer to check first
- **Whose site** — theirs (deeper diagnostics welcome) vs. someone else's (status check, politely)

## Framework: The Layer Walk

1. **HTTP first (the 5-second answer):** `curl -sI -m 10 -o /dev/null -w "%{http_code} %{time_total}s %{remote_ip}\n" "https://example.com"` — status, total time, and which IP answered in one line. 200/301 = up · 4xx = up but refusing this request · 5xx = up but broken behind the server · `000` = never connected → walk down the stack.
2. **DNS when connection fails:** `curl -s "https://dns.google/resolve?name=example.com&type=A"` — NXDOMAIN vs. records-exist separates "domain problem" from "server problem"; two public resolvers agreeing ≈ not a DNS issue (the dns-lookup skill has the full treatment).
3. **TLS when the browser screamed:** `curl -svo /dev/null "https://example.com" 2>&1 | grep -E "expire|subject|issuer"` — expired cert, wrong-host cert, or incomplete chain each read differently; quote the expiry date and say how long ago/until.
4. **The just-you test:** if direct checks fail but DoH shows records and the failure is connection-level, the honest options are local (DNS cache, VPN, firewall, ISP) — suggest the local moves (`curl` from another network if possible, flush DNS, try the resolved IP) rather than declaring the site dead from one vantage point.
5. **Timing as diagnosis:** `-w` breakdowns (`time_namelookup`, `time_connect`, `time_starttransfer`) locate slowness — slow DNS vs. slow TLS vs. slow server are different tickets; a 12-second `time_starttransfer` with fast connect is the backend's confession.

## Output Format

# Site Check: [url] — [time]

**[The verdict: "Down at the HTTP layer — DNS and TLS fine, server returning 503; not your network." ]**

| Layer | Result | Read |
|---|---|---|
| DNS | [records / NXDOMAIN] | … |
| TLS | [handshake ok · cert expires [date]] | … |
| HTTP | [code, time, IP] | … |

[Cert questions: expiry with the countdown · Slowness: the timing breakdown and which phase owns it]

Rerun: `[the curl(s)]`
*One vantage point — "up for me" ≠ up for everyone; for your own production site, real monitoring beats spot checks.*

## Quality Checks

- [ ] The verdict names the failing layer, not just up/down
- [ ] Status codes are interpreted (4xx up-but-refusing vs 5xx up-but-broken vs 000 never-connected)
- [ ] Cert answers quote the expiry date with the countdown
- [ ] Connection failures trigger the DNS cross-check before any verdict
- [ ] The one-vantage-point caveat appears

## Anti-Patterns

- [ ] Do not answer up/down without the layer — the layer is the diagnosis
- [ ] Do not declare a site dead from one failed local check — run the just-you branch
- [ ] Do not confuse 403/401 with down — refusing you is a form of up
- [ ] Do not hammer a struggling site — one clean check per layer, not a retry loop against someone's outage
- [ ] Do not extend into probing others' infrastructure — status and reachability, not scanning

## Example Trigger Phrases

- "Is this website down?"
- "Why can't I reach this site?"
- "Check if my site is up."
- "Is the SSL certificate expired?"
