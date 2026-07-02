#!/usr/bin/env python3
"""docx_tool — create .docx from markdown-ish text, or edit an existing one. Stdlib only.

  create — markdown-lite → a real Word document:
      python3 docx_tool.py create out.docx --text-file doc.md
      echo "# Title\nBody **bold** text\n- bullet" | python3 docx_tool.py create out.docx --stdin
    Supports: # / ## / ### headings, - bullets, 1. numbered, **bold**, *italic*, plain paragraphs.

  fill — replace {{placeholders}} through an existing .docx (body, headers, footers):
      python3 docx_tool.py fill template.docx out.docx --values '{"client":"Acme","date":"2026-07-03"}'
    Handles Word's habit of splitting placeholders across runs by merging run text per paragraph
    when a placeholder spans runs (formatting of the merged paragraph collapses to the first run).

  extract — pull plain text out (for verification or diffing):
      python3 docx_tool.py extract file.docx

Limits (honest): create supports the markdown subset above, default styling only;
fill collapses per-run formatting ONLY in paragraphs where a placeholder spans runs.
"""
import argparse, json, re, sys, zipfile
from xml.sax.saxutils import escape

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"

def runs_from_inline(text):
    out = []
    for tok in re.split(r"(\*\*.+?\*\*|\*.+?\*)", text):
        if not tok: continue
        if tok.startswith("**") and tok.endswith("**"):
            out.append(f'<w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">{escape(tok[2:-2])}</w:t></w:r>')
        elif tok.startswith("*") and tok.endswith("*"):
            out.append(f'<w:r><w:rPr><w:i/></w:rPr><w:t xml:space="preserve">{escape(tok[1:-1])}</w:t></w:r>')
        else:
            out.append(f'<w:r><w:t xml:space="preserve">{escape(tok)}</w:t></w:r>')
    return "".join(out) or '<w:r><w:t/></w:r>'

def para(text, style=None, numbered=False, bullet=False):
    ppr = ""
    if style: ppr = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>'
    if bullet: ppr = '<w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr>'
    if numbered: ppr = '<w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr></w:pPr>'
    return f'<w:p>{ppr}{runs_from_inline(text)}</w:p>'

STYLES = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="{W}">
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:sz w:val="48"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>
</w:styles>'''

NUMBERING = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="{W}">
<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
<w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>'''

def create(out, text):
    body = []
    for line in text.splitlines():
        s = line.rstrip()
        if not s.strip(): continue
        if s.startswith("### "): body.append(para(s[4:], style="Heading3"))
        elif s.startswith("## "): body.append(para(s[3:], style="Heading2"))
        elif s.startswith("# "): body.append(para(s[2:], style="Heading1"))
        elif re.match(r"^[-*] ", s): body.append(para(s[2:], bullet=True))
        elif re.match(r"^\d+[.)] ", s): body.append(para(re.sub(r"^\d+[.)] ", "", s), numbered=True))
        else: body.append(para(s))
    document = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<w:document xmlns:w="{W}"><w:body>{"".join(body)}</w:body></w:document>')
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
            '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
            '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>'
            '</Types>')
        z.writestr("_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
            '</Relationships>')
        z.writestr("word/_rels/document.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>'
            '</Relationships>')
        z.writestr("word/styles.xml", STYLES)
        z.writestr("word/numbering.xml", NUMBERING)
        z.writestr("word/document.xml", document)
    print(f"wrote {out}")

def merge_split_placeholders(xml):
    # Word splits text across <w:r> runs arbitrarily; if a {{token}} spans runs,
    # merge that paragraph's runs into one (first run's formatting wins).
    def para_fix(m):
        p = m.group(0)
        texts = re.findall(r"<w:t[^>]*>(.*?)</w:t>", p, re.S)
        joined = "".join(texts)
        if "{{" in joined and not any("{{" in t and "}}" in t for t in texts):
            first_rpr = re.search(r"<w:rPr>.*?</w:rPr>", p, re.S)
            rpr = first_rpr.group(0) if first_rpr else ""
            new_run = f'<w:r>{rpr}<w:t xml:space="preserve">{joined}</w:t></w:r>'
            return re.sub(r"<w:r\b.*</w:r>", new_run, p, flags=re.S)
        return p
    return re.sub(r"<w:p\b.*?</w:p>", para_fix, xml, flags=re.S)

def fill(template, out, values):
    replaced = 0
    with zipfile.ZipFile(template) as zin, zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.namelist():
            data = zin.read(item)
            if re.match(r"word/(document|header\d*|footer\d*)\.xml$", item):
                text = merge_split_placeholders(data.decode("utf-8"))
                for k, v in values.items():
                    token = "{{" + k + "}}"
                    replaced += text.count(token)
                    text = text.replace(token, escape(str(v)))
                data = text.encode("utf-8")
            zout.writestr(item, data)
    print(f"wrote {out}: {replaced} placeholder(s) filled")
    if replaced == 0:
        print("warning: no {{placeholders}} found", file=sys.stderr)

def extract(path):
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml").decode("utf-8")
    for p in re.findall(r"<w:p\b.*?</w:p>", xml, re.S):
        line = "".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", p, re.S))
        if line.strip(): print(line)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("create"); c.add_argument("out"); c.add_argument("--text"); c.add_argument("--text-file"); c.add_argument("--stdin", action="store_true")
    f = sub.add_parser("fill"); f.add_argument("template"); f.add_argument("out"); f.add_argument("--values", required=True)
    e = sub.add_parser("extract"); e.add_argument("path")
    a = ap.parse_args()
    if a.cmd == "create":
        text = a.text or (open(a.text_file).read() if a.text_file else sys.stdin.read())
        create(a.out, text)
    elif a.cmd == "fill":
        fill(a.template, a.out, json.loads(a.values))
    else:
        extract(a.path)

if __name__ == "__main__":
    main()
