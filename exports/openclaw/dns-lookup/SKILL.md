---
name: dns-lookup
description: "Query DNS records and domain registration data with zero API keys — DNS-over-HTTPS via dns.google and domain registration via RDAP, through plain curl. Use when asked what does this domain resolve to, check the MX or TXT records, who registered this domain, when does it expire, or has DNS propagated. Produces the records decoded (SPF/DKIM/DMARC read, not just dumped), the registration facts from RDAP, and the rerunnable commands."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/dns-lookup.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# DNS Lookup Skill

DNS questions ("did the record propagate," "where's mail for this domain going," "who owns this") come with two keyless answers: Google's DNS-over-HTTPS for records, and RDAP — WHOIS's structured successor — for registration. This skill queries both, and does the part `dig` doesn't: decoding what the records *mean* — an SPF string into its policy, MX priorities into the actual mail provider, an expiry date into "renews in 6 weeks."

## What This Skill Produces

- **The records** — A/AAAA/MX/TXT/CNAME/NS/whatever was asked, with TTLs
- **The decode** — mail provider identified from MX, SPF/DMARC policies read out, CNAME chains followed
- **Registration facts** — registrar, creation/expiry dates, status codes (from RDAP; contact data is mostly redacted now, and the answer says so)
- **The commands** — exact curls, rerunnable

## Required Inputs

Ask for these if not provided:
- **The domain** — and the record type if the question implies one ("where's mail going" → MX; "is the site moved" → A/CNAME; "verify ownership token" → TXT)
- **The scenario** — propagation check, email debugging, domain due-diligence, expiry watch — the decode leads with it

## Framework: The Two Protocols

1. **Records (DoH):** `curl -s "https://dns.google/resolve?name=github.com&type=MX"` — types by name (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA). Cloudflare as fallback/second opinion: `curl -s -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=github.com&type=A"`. Two resolvers agreeing is also the honest propagation check.
2. **Registration (RDAP):** `curl -s "https://rdap.org/domain/github.com"` — rdap.org bootstraps to the right registry. Read: `events` (registration/expiration dates), `status` (clientTransferProhibited etc. — decode the meaningful ones), registrar entity. **Expect redacted contacts** — post-privacy-era WHOIS data is minimal, and pretending otherwise misleads.
3. **The decodes that add value:** MX hosts → the provider ("aspmx.l.google.com → Google Workspace"); TXT `v=spf1` → which services may send mail and the `-all/~all` strictness; `_dmarc` TXT → the policy (none/quarantine/reject) in words; CNAME chains followed to their end.
4. **Propagation is TTL + resolver spread:** compare answers across dns.google and Cloudflare, quote the TTL, and frame "propagated?" as "these major resolvers see the new value; stragglers cache up to [TTL]."
5. **Read-only boundary:** lookups, decoding, and diagnosis — yes; this skill doesn't do zone changes, subdomain enumeration sweeps, or anything aimed at finding weaknesses in third-party domains. Debugging your own mail is the use case; auditing someone else's attack surface is not.

## Output Format

# DNS: [domain] [record type(s)]

**[The decoded answer first: "Mail goes to Google Workspace; SPF allows Google + Mailchimp, DMARC is quarantine."]**

| Record | Value | TTL | Decoded |
|---|---|---|---|

[Registration section when asked: registrar · created · expires ("renews in N weeks") · status decoded · contacts: redacted, as is normal]

Source: [dns.google / Cloudflare DoH / RDAP] · rerun: `[exact curls]`
[Propagation mode: the two-resolver comparison and the TTL framing]

## Quality Checks

- [ ] The decode leads — the provider/policy in words before the record table
- [ ] SPF/DMARC strings are read out, not just quoted
- [ ] Propagation answers compare two resolvers and quote TTL
- [ ] RDAP redaction is stated as normal, not as a finding
- [ ] Every answer carries its rerunnable curl

## Anti-Patterns

- [ ] Do not dump records without decoding — the MX hostname is a clue, the provider name is an answer
- [ ] Do not answer from memory — DNS is live by definition; fetch or hand over the command
- [ ] Do not promise global propagation — resolvers cache; frame it as major-resolvers + TTL
- [ ] Do not treat redacted WHOIS/RDAP contacts as suspicious — it's the post-privacy default
- [ ] Do not slide into recon — decoding your domain's mail setup and enumerating someone else's infrastructure are different activities, and this skill does the first

## Example Trigger Phrases

- "Check the MX or TXT records."
- "Who registered this domain?"
- "Does it expire?"
