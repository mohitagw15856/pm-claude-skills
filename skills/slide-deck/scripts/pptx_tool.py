#!/usr/bin/env python3
"""pptx_tool — build a real .pptx from a markdown outline. Stdlib only (zip+XML).

  python3 pptx_tool.py build deck.pptx --outline-file deck.md
  echo "# Deck Title\n## First Slide\n- point one\n- point two" | python3 pptx_tool.py build deck.pptx --stdin

Outline format:
  # Title            → title slide (first # only; its next plain line = subtitle)
  ## Slide title     → new content slide
  - bullet           → bullet on the current slide (two spaces indent = sub-bullet)
  plain line         → body text line on the current slide
  > note text        → captured as a speaker note; reported at the end but NOT embedded in the .pptx

Limits (honest): one clean default theme (dark title bar, white body), no images/
charts/transitions. Speaker notes (`> ...`) are parsed and counted but are not written into the
file's notes panes — paste them in after opening. It opens in PowerPoint/Keynote/Slides and is meant as the
skeleton you restyle — for designed decks, export from the playground instead.
"""
import argparse, re, sys, zipfile
from xml.sax.saxutils import escape

EMU_W, EMU_H = 12192000, 6858000  # 16:9

def tx_body(lines, body_font=2000):
    ps = []
    for lvl, text in lines:
        ps.append(
            f'<a:p><a:pPr lvl="{lvl}"/><a:r><a:rPr lang="en-US" sz="{body_font}" dirty="0"/>'
            f'<a:t>{escape(text)}</a:t></a:r></a:p>')
    return "".join(ps) or '<a:p><a:endParaRPr/></a:p>'

def shape(sid, name, x, y, w, h, body, fill=None, font_color=None, bold=False, size=2000, align=None):
    fill_xml = f'<a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>' if fill else ''
    color = f'<a:solidFill><a:srgbClr val="{font_color}"/></a:solidFill>' if font_color else ''
    b = ' b="1"' if bold else ''
    algn = f' algn="{align}"' if align else ''
    if isinstance(body, str):
        body_xml = (f'<a:p><a:pPr{algn}/><a:r><a:rPr lang="en-US" sz="{size}"{b} dirty="0">{color}</a:rPr>'
                    f'<a:t>{escape(body)}</a:t></a:r></a:p>')
    else:
        body_xml = body
    return (f'<p:sp><p:nvSpPr><p:cNvPr id="{sid}" name="{name}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{x}" y="{y}"/><a:ext cx="{w}" cy="{h}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>{fill_xml}</p:spPr>'
        f'<p:txBody><a:bodyPr wrap="square"><a:normAutofit/></a:bodyPr><a:lstStyle/>{body_xml}</p:txBody></p:sp>')

def slide_xml(kind, title, sub_or_lines):
    if kind == "title":
        shapes = (
            shape(2, "bg", 0, 0, EMU_W, EMU_H, "", fill="14171F")
            + shape(3, "title", 914400, 2400000, EMU_W - 1828800, 1200000, title, font_color="FFFFFF", bold=True, size=4400)
            + shape(4, "subtitle", 914400, 3700000, EMU_W - 1828800, 800000, sub_or_lines or "", font_color="D97757", size=2000))
    else:
        shapes = (
            shape(2, "titlebar", 0, 0, EMU_W, 1100000, "", fill="14171F")
            + shape(3, "title", 685800, 250000, EMU_W - 1371600, 700000, title, font_color="FFFFFF", bold=True, size=2800)
            + shape(4, "body", 685800, 1500000, EMU_W - 1371600, EMU_H - 2000000, tx_body(sub_or_lines)))
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
        'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
        f'<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'
        f'<p:grpSpPr/>{shapes}</p:spTree></p:cSld></p:sld>')

MASTER = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
 '<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
 '<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>'
 '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>'
 '<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>')

LAYOUT = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
 '<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank">'
 '<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>'
 '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>')

THEME = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
 '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="pm"><a:themeElements>'
 '<a:clrScheme name="pm"><a:dk1><a:srgbClr val="14171F"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="2A313C"/></a:dk2><a:lt2><a:srgbClr val="F2F2F2"/></a:lt2>'
 '<a:accent1><a:srgbClr val="D97757"/></a:accent1><a:accent2><a:srgbClr val="5AD19A"/></a:accent2><a:accent3><a:srgbClr val="6AA9FF"/></a:accent3><a:accent4><a:srgbClr val="FFB454"/></a:accent4><a:accent5><a:srgbClr val="C9A4FF"/></a:accent5><a:accent6><a:srgbClr val="FF8FA3"/></a:accent6>'
 '<a:hlink><a:srgbClr val="D97757"/></a:hlink><a:folHlink><a:srgbClr val="9AA4B2"/></a:folHlink></a:clrScheme>'
 '<a:fontScheme name="pm"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>'
 '<a:fmtScheme name="pm"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>'
 '<a:lnStyleLst><a:ln><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>'
 '<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>'
 '<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>'
 '</a:themeElements></a:theme>')

def parse_outline(text):
    slides, notes = [], {}
    cur = None
    for raw in text.splitlines():
        line = raw.rstrip()
        if not line.strip(): continue
        if line.startswith("## "):
            cur = {"kind": "content", "title": line[3:], "lines": []}
            slides.append(cur)
        elif line.startswith("# ") and not slides:
            cur = {"kind": "title", "title": line[2:], "sub": ""}
            slides.append(cur)
        elif line.startswith("> ") and slides:
            notes.setdefault(len(slides)-1, []).append(line[2:])
        elif slides:
            s = slides[-1]
            if s["kind"] == "title" and not s["sub"]:
                s["sub"] = line.strip()
            else:
                if s["kind"] == "title":
                    cur = {"kind": "content", "title": "", "lines": []}
                    slides.append(cur); s = cur
                m = re.match(r"^(\s*)[-*] (.*)", line)
                if m: s["lines"].append((1 if len(m.group(1)) >= 2 else 0, m.group(2)))
                else: s["lines"].append((0, line.strip()))
    return slides, notes

def build(out, text):
    slides, notes = parse_outline(text)
    if not slides: raise SystemExit("empty outline")
    n = len(slides)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        overrides = "".join(
            f'<Override PartName="/ppt/slides/slide{i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>' for i in range(n))
        z.writestr("[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>'
            '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>'
            '<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>'
            '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>'
            + overrides + '</Types>')
        z.writestr("_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>')
        sld_ids = "".join(f'<p:sldId id="{256+i}" r:id="rId{i+2}"/>' for i in range(n))
        z.writestr("ppt/presentation.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
            'xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">'
            '<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>'
            f'<p:sldIdLst>{sld_ids}</p:sldIdLst>'
            f'<p:sldSz cx="{EMU_W}" cy="{EMU_H}"/><p:notesSz cx="{EMU_H}" cy="{EMU_W}"/></p:presentation>')
        pres_rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>'
            + "".join(f'<Relationship Id="rId{i+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide{i+1}.xml"/>' for i in range(n))
            + '</Relationships>')
        z.writestr("ppt/_rels/presentation.xml.rels", pres_rels)
        z.writestr("ppt/slideMasters/slideMaster1.xml", MASTER)
        z.writestr("ppt/slideMasters/_rels/slideMaster1.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>')
        z.writestr("ppt/slideLayouts/slideLayout1.xml", LAYOUT)
        z.writestr("ppt/slideLayouts/_rels/slideLayout1.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>')
        z.writestr("ppt/theme/theme1.xml", THEME)
        for i, s in enumerate(slides):
            xml = slide_xml(s["kind"], s["title"], s.get("sub") if s["kind"] == "title" else s["lines"])
            z.writestr(f"ppt/slides/slide{i+1}.xml", xml)
            z.writestr(f"ppt/slides/_rels/slide{i+1}.xml.rels",
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>')
    note_count = sum(len(v) for v in notes.values())
    print(f"wrote {out}: {n} slide(s)" + (f" · {note_count} speaker-note line(s) parsed (not embedded — kept in outline)" if note_count else ""))

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build"); b.add_argument("out"); b.add_argument("--outline"); b.add_argument("--outline-file"); b.add_argument("--stdin", action="store_true")
    a = ap.parse_args()
    text = a.outline or (open(a.outline_file).read() if a.outline_file else sys.stdin.read())
    build(a.out, text)

if __name__ == "__main__":
    main()
