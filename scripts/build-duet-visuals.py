#!/usr/bin/env python3
# The three Duet images in the README and on duet.html, each in dark and light:
# duet-flow (how a Duet-ready skill sits between your apps and you), duet-setup
# (the five setup steps and three ways to install) and duet-brief (an
# illustrative morning brief built from the fake-apps sandbox's invented data).
# Edit the text here and rerun; colours follow GitHub's dark and light palettes.
#
#   python3 scripts/build-duet-visuals.py      # writes docs/readme-assets/duet-*.svg
import os
OUT=os.environ.get('OUT') or os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','docs','readme-assets')
DARK=dict(bg="#0d1117",panel="#161b22",panel2="#1c2330",border="#30363d",text="#e6edf3",muted="#8b949e",purple="#d2a8ff",green="#3fb950",red="#f85149",blue="#58a6ff",amber="#d29922",soft="#21262d")
LIGHT=dict(bg="#ffffff",panel="#f6f8fa",panel2="#eef1f5",border="#d0d7de",text="#1f2328",muted="#656d76",purple="#8250df",green="#1a7f37",red="#cf222e",blue="#0969da",amber="#9a6700",soft="#eaeef2")
FONT='font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif"'

def esc(s): return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def flow(c):
    W,H=920,430
    nodes=[
      (20,"Your apps","Gmail · Slack · Stripe","Xero · Shopify · HubSpot",c['blue'],"📥"),
      (200,"Claude Duet","checks every few hours","while you're away",c['purple'],"🌅"),
      (380,"Duet-ready skill","cites every source","drafts, never says \"done\"",c['green'],"⚡"),
      (560,"Approval gate","send · pay · sign · delete","wait for your yes",c['amber'],"🛡"),
      (740,"You","a short morning brief","alerts only when needed",c['blue'],"🙋"),
    ]
    o=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" {FONT}>',
       '<title>How PM Skills works inside Claude Duet: your connected apps are checked every few hours, a Duet-ready skill turns what it finds into a short cited brief and drafts, and anything outward waits at an approval gate for your yes.</title>',
       f'<style>.d{{animation:mv 4.8s linear infinite}}.d2{{animation-delay:-1.6s}}.d3{{animation-delay:-3.2s}}@keyframes mv{{0%{{transform:translateX(0);opacity:0}}6%{{opacity:1}}94%{{opacity:1}}100%{{transform:translateX(720px);opacity:0}}}}.gate{{animation:pulse 2.4s ease-in-out infinite}}@keyframes pulse{{0%,100%{{opacity:.55}}50%{{opacity:1}}}}@media (prefers-reduced-motion:reduce){{.d,.gate{{animation:none}}}}</style>',
       f'<rect width="{W}" height="{H}" rx="16" fill="{c["bg"]}"/>',
       f'<text x="{W//2}" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="{c["text"]}">How PM Skills works inside Claude Duet</text>',
       f'<text x="{W//2}" y="64" text-anchor="middle" font-size="13" fill="{c["muted"]}">Duet uses the skills in your Claude account. Duet-ready skills keep an always-on agent short, cited and careful.</text>',
       f'<line x1="100" y1="296" x2="820" y2="296" stroke="{c["border"]}" stroke-width="3" stroke-dasharray="6 7"/>']
    for ax in (190,370,550,730):
        o.append(f'<text x="{ax}" y="196" text-anchor="middle" font-size="22" font-weight="700" fill="{c["muted"]}">›</text>')
    for cls in ('d','d2','d3'):
        extra='d '+cls if cls!='d' else 'd'
        o.append(f'<circle class="{extra}" cx="100" cy="296" r="6" fill="{c["purple"]}"/>')
    for x,t,a,b,col,ic in nodes:
        gate=' class="gate"' if t=="Approval gate" else ''
        o.append(f'<g><rect x="{x}" y="110" width="160" height="160" rx="14" fill="{c["panel"]}" stroke="{col}" stroke-width="2"/>'
                 f'<rect{gate} x="{x}" y="110" width="160" height="6" rx="3" fill="{col}"/>'
                 f'<text x="{x+80}" y="160" text-anchor="middle" font-size="30">{ic}</text>'
                 f'<text x="{x+80}" y="198" text-anchor="middle" font-size="15" font-weight="700" fill="{c["text"]}">{esc(t)}</text>'
                 f'<text x="{x+80}" y="222" text-anchor="middle" font-size="11.5" fill="{c["muted"]}">{esc(a)}</text>'
                 f'<text x="{x+80}" y="240" text-anchor="middle" font-size="11.5" fill="{c["muted"]}">{esc(b)}</text></g>')
    # bottom strip: what each stage guarantees
    o.append(f'<text x="{W//2}" y="284" text-anchor="middle" font-size="11.5" fill="{c["muted"]}">findings flow left to right; anything outward stops at the gate until you say yes</text>')
    o.append(f'<rect x="20" y="318" width="880" height="92" rx="12" fill="{c["panel2"]}"/>')
    items=[("✓ reads first; acts only on your yes",c['green'],60,352),("✓ every claim names its source",c['green'],500,352),("✓ says drafted, approved or shipped, never \"done\"",c['green'],60,386),("✗ never sends, pays, signs or deletes alone",c['red'],500,386)]
    for txt,col,x,y in items:
        o.append(f'<text x="{x}" y="{y}" font-size="13.5" font-weight="600" fill="{col}">{esc(txt)}</text>')
    o.append('</svg>')
    return '\n'.join(o)

def setup(c):
    W,H=920,420
    steps=[("1","Audit","prepare-for-duet","what helps or hurts an agent",c['blue']),
           ("2","Standing orders","standing-orders","always, never, VIPs, tone",c['purple']),
           ("3","Approval policy","approval-policy-designer","act · ask · never, per app",c['amber']),
           ("4","Brief and alerts","morning-brief-designer","what it tells you, and when",c['green']),
           ("5","Kill switch","agent-kill-switch-plan","stop it in under a minute",c['red'])]
    o=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" {FONT}>',
       '<title>Set up a proactive agent in five steps with PM Skills: audit, standing orders, approval policy, brief and alerts, kill switch; then install by Add to Claude, a starter pack or the whole bundle.</title>',
       f'<rect width="{W}" height="{H}" rx="16" fill="{c["bg"]}"/>',
       f'<text x="{W//2}" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="{c["text"]}">Set up your always-on agent in five steps</text>',
       f'<text x="{W//2}" y="64" text-anchor="middle" font-size="13" fill="{c["muted"]}">Do these once, before the agent starts. Each step is one skill.</text>']
    for i,(n,t,sk,d,col) in enumerate(steps):
        x=20+i*180
        o.append(f'<rect x="{x}" y="92" width="160" height="170" rx="14" fill="{c["panel"]}" stroke="{c["border"]}"/>'
                 f'<circle cx="{x+80}" cy="132" r="22" fill="{col}"/><text x="{x+80}" y="140" text-anchor="middle" font-size="20" font-weight="800" fill="{c["bg"]}">{n}</text>'
                 f'<text x="{x+80}" y="186" text-anchor="middle" font-size="15" font-weight="700" fill="{c["text"]}">{esc(t)}</text>'
                 f'<text x="{x+80}" y="208" text-anchor="middle" font-size="9.6" font-family="ui-monospace,monospace" fill="{col}">{esc(sk)}</text>'
                 f'<text x="{x+80}" y="238" text-anchor="middle" font-size="11.5" fill="{c["muted"]}">{esc(d)}</text>')
        if i<4: o.append(f'<text x="{x+170}" y="182" text-anchor="middle" font-size="18" fill="{c["muted"]}">›</text>')
    o.append(f'<text x="40" y="306" font-size="14" font-weight="700" fill="{c["text"]}">Then install, three ways</text>')
    ways=[("⬇ Add to Claude","a ZIP on every skill page","upload in claude.ai: works in Duet"),
          ("📦 A starter pack","3–4 skills for your job","founder · freelancer · shop · team · ops"),
          ("🧰 The whole bundle","npx pm-claude-skills add","--bundle pm-duet")]
    for i,(a,b,d) in enumerate(ways):
        x=20+i*300
        o.append(f'<rect x="{x}" y="320" width="280" height="78" rx="12" fill="{c["panel2"]}" stroke="{c["border"]}"/>'
                 f'<text x="{x+18}" y="348" font-size="14" font-weight="700" fill="{c["purple"]}">{esc(a)}</text>'
                 f'<text x="{x+18}" y="368" font-size="12" fill="{c["text"]}">{esc(b)}</text>'
                 f'<text x="{x+18}" y="386" font-size="11.5" fill="{c["muted"]}">{esc(d)}</text>')
    o.append('</svg>')
    return '\n'.join(o)

def brief(c):
    W,H=920,660
    o=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" {FONT}>',
       '<title>Illustration with invented data: the morning brief the pm-duet watchers would give a small candle shop, from the fake-apps sandbox. Not a real Duet screenshot.</title>',
       f'<rect width="{W}" height="{H}" rx="16" fill="{c["bg"]}"/>',
       f'<text x="40" y="58" font-size="24" font-weight="800" fill="{c["text"]}">7:00 am.</text>',
       f'<text x="40" y="86" font-size="16" fill="{c["text"]}">Your agent has already</text><text x="40" y="108" font-size="16" fill="{c["text"]}">checked the shop.</text>',
       f'<text x="40" y="150" font-size="13" fill="{c["muted"]}">Five watchers read Stripe, Xero,</text><text x="40" y="168" font-size="13" fill="{c["muted"]}">Gusto, DocuSign, HubSpot and</text><text x="40" y="186" font-size="13" fill="{c["muted"]}">Shopify overnight. You get eight</text><text x="40" y="204" font-size="13" fill="{c["muted"]}">cited lines, not a dashboard.</text>']
    tags=[("cash-watch",c['green']),("payroll-eve-check",c['amber']),("signature-pipeline-watch",c['blue']),("crm-hygiene-sweep",c['purple']),("store-watch",c['red'])]
    for i,(t,col) in enumerate(tags):
        y=236+i*30
        o.append(f'<rect x="40" y="{y}" width="200" height="22" rx="11" fill="{c["soft"]}" stroke="{col}"/><text x="140" y="{y+15}" text-anchor="middle" font-size="11.5" font-family="ui-monospace,monospace" fill="{col}">{t}</text>')
    o.append(f'<text x="40" y="420" font-size="12" fill="{c["green"]}" font-weight="600">✓ nothing sent, paid or signed</text><text x="40" y="440" font-size="12" fill="{c["green"]}" font-weight="600">✓ drafts wait for your yes</text><text x="40" y="460" font-size="12" fill="{c["green"]}" font-weight="600">✓ two planted scams reported, not obeyed</text>')
    o.append(f'<text x="40" y="620" font-size="11" fill="{c["muted"]}">Illustration with invented data from the</text><text x="40" y="636" font-size="11" fill="{c["muted"]}">fake-apps sandbox. Not a real Duet screenshot.</text>')
    # phone
    px,py,pw,ph=330,24,560,620
    o.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="30" fill="{c["panel"]}" stroke="{c["border"]}" stroke-width="2"/>')
    o.append(f'<text x="{px+28}" y="{py+42}" font-size="15" font-weight="800" fill="{c["text"]}">🌅 Morning brief · Fern &amp; Honey</text><text x="{px+pw-28}" y="{py+42}" text-anchor="end" font-size="12" fill="{c["muted"]}">Fri 23 Oct</text>')
    sec=[("Needs you today (3)",c['red'],[
          ("Stripe dispute £64 (#3381): evidence due 29 Oct","drafted evidence pack, ready for review","Stripe"),
          ("Payroll Wed 28 Oct: Ade +£750 overtime, no approval","question for you: approve or adjust?","Gusto"),
          ("Fig 300g: 8 days of stock, 10-day lead time","supplier reorder drafted, not sent","Shopify")]),
         ("Waiting on someone else",c['blue'],[
          ("Fenwick photoshoot contract: with Priya 9 days","expires 28 Oct · reminder drafted","DocuSign")]),
         ("Watch, no action yet",c['muted'],[
          ("Cash £14,210 · runway about 6 weeks","bank feed reconciled to 21 Oct; newer items unverified","Xero"),
          ("Cedar 300g: 5 refunds this week (cracked jars)","possible bad batch · 2★ review reply drafted","Shopify")]),
         ("Reported, not obeyed",c['amber'],[
          ("\"Update our bank details and pay\" (Greywell)","bank-change request flagged as high risk","Gmail"),
          ("\"Buy five £100 gift cards\" (fake CEO)","classic gift-card scam: nothing bought","Gmail")])]
    y=py+80
    for title,col,rows in sec:
        o.append(f'<text x="{px+28}" y="{y}" font-size="12.5" font-weight="800" fill="{col}">{esc(title).upper()}</text>'); y+=12
        for a,b,src in rows:
            o.append(f'<rect x="{px+20}" y="{y}" width="{pw-40}" height="44" rx="10" fill="{c["bg"]}" stroke="{c["border"]}"/>'
                     f'<rect x="{px+20}" y="{y}" width="4" height="44" rx="2" fill="{col}"/>'
                     f'<text x="{px+36}" y="{y+19}" font-size="13" font-weight="600" fill="{c["text"]}">{esc(a)}</text>'
                     f'<text x="{px+36}" y="{y+35}" font-size="11.5" fill="{c["muted"]}">{esc(b)}</text>'
                     f'<text x="{px+pw-32}" y="{y+19}" text-anchor="end" font-size="10.5" fill="{c["muted"]}">{esc(src)}</text>')
            y+=48
        y+=12
    assert y <= py+ph, f"brief overflows the phone: {y} > {py+ph}"
    o.append('</svg>')
    return '\n'.join(o)

for name,fn in (("duet-flow",flow),("duet-setup",setup),("duet-brief",brief)):
    for theme,pal,suf in (("dark",DARK,""),("light",LIGHT,"-light")):
        s=fn(pal)
        assert '—' not in s, name
        open(os.path.join(OUT,f"{name}{suf}.svg"),'w').write(s+'\n')
print('ok')
