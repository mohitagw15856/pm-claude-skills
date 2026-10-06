---
name: ip-lookup
description: "Look up IP addresses and your own public IP with zero API keys — geolocation, ISP/ASN, and hosting flags via ip-api.com and ipify through curl. Use when asked what's my public IP, where is this IP from, whose network is this address, or is this IP a VPN/datacenter. Produces the lookup with ISP, ASN, and location fields interpreted honestly (city-level accuracy caveats included), and the rerunnable command."
---

# IP Lookup Skill

"Whose IP is this?" comes up in log triage, abuse reports, debugging, and plain curiosity — and keyless services answer it: ipify for "what's *my* IP," ip-api.com for "what's *that* IP." This skill fetches, reads the fields that matter (ASN and ISP are usually the real answer; city is a guess wearing coordinates), and holds the two honesty lines the domain needs: IP geolocation is approximate, and none of this is a person's identity.

## What This Skill Produces

- **The lookup** — country/region/city, ISP, org, ASN, and the proxy/hosting flags where available
- **The interpretation** — what the fields actually establish ("a Hetzner datacenter IP in Falkenstein" vs. "a residential Comcast line, roughly Denver")
- **Your-own-IP answers** — v4 and v6 when both matter
- **The command** — exact curl, rerunnable

## Required Inputs

Ask for these if not provided:
- **The IP (or "mine")** — v4 or v6; a hostname is fine (it gets resolved first — say so)
- **The purpose** — log triage wants the ASN/hosting read; debugging wants "is my egress IP what I think"; abuse-report prep wants the network owner — the interpretation follows it

## Framework: The Calls and the Honesty Lines

1. **Your own IP:** `curl -s https://api.ipify.org` (v4) · `curl -s https://api64.ipify.org` (v6-preferring) — one word of output, script-safe. Also embedded in most routers' complaints, but this is the clean answer.
2. **The lookup:** `curl -s "http://ip-api.com/json/8.8.8.8?fields=status,country,regionName,city,isp,org,as,proxy,hosting,query"` — the `fields` parameter keeps it tight; `proxy` and `hosting` flags answer the VPN/datacenter question directly. Free tier is HTTP and rate-limited (~45/min) — fine for lookups, not for bulk scans.
3. **ASN is the real identity:** "AS15169 Google LLC" tells you more than any city field — datacenter ranges geolocate to corporate registrations, not servers. Lead the interpretation with network ownership; treat city as "roughly."
4. **Accuracy honesty, every time:** country is reliable, region mostly, city is a coin-flip-adjacent estimate, and coordinates are the *ISP's* location as often as the user's. Never present IP geolocation as locating a person or address — both wrong and the wrong thing to help with.
5. **The purpose boundary:** log triage, debugging, network identification, abuse-report addressing — yes. Attempts to physically locate or unmask a specific individual — no; that's the line, and the accuracy truth above is also why it wouldn't work.

## Output Format

# IP Lookup: [ip]

**[The interpretation first: "Datacenter IP — AS24940 Hetzner, Germany; hosting flag set. Not a residential user."]**

| Field | Value |
|---|---|
[Country · region/city (labeled approximate) · ISP · org · ASN · proxy/hosting flags]

Source: [ip-api.com / ipify] · rerun: `[exact curl]`
*IP geolocation is approximate (city-level at best) and identifies networks, not people.*

## Quality Checks

- [ ] The interpretation (network ownership + type) leads; raw fields follow
- [ ] City/coordinates are labeled approximate every time
- [ ] The hosting/proxy flags are read when the question was VPN/datacenter-shaped
- [ ] Hostnames were resolved and the resolved IP shown
- [ ] The networks-not-people line appears

## Anti-Patterns

- [ ] Do not present city/coordinates as a location fix — it's an estimate of the ISP as often as the user
- [ ] Do not assist with locating or unmasking individuals — networks and abuse contacts, not people
- [ ] Do not bulk-loop a rate-limited free endpoint — for log volumes, dedupe first and note the limit
- [ ] Do not answer "what's my IP" from memory or the environment — fetch it; NAT and VPNs make assumptions wrong
- [ ] Do not conflate ISP and org — the `as`/`org` fields differ exactly when it's interesting (resellers, VPNs, corporate egress)

## Example Trigger Phrases

- "What's my public IP?"
- "Where is this IP from?"
- "Is this IP a VPN/datacenter?"
