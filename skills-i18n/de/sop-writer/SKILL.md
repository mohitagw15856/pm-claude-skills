---
name: sop-writer
language: de
description: "Eine Standardarbeitsanweisung (SOP) für eine beliebige betriebliche Aufgabe schreiben. Verwenden, wenn eine SOP, eine Standardarbeitsanweisung, eine Arbeitsanweisung oder ein Betriebshandbuch gewünscht ist. Liefert eine formale SOP mit Zweck, Geltungsbereich, Verfahrensschritten, Qualitätsprüfungen und Versionsführung."
---

> Deutsche Übersetzung von [sop-writer](../../../skills/sop-writer/SKILL.md). Die englische Fassung ist maßgeblich. Maschinelle Übersetzung; die Prüfung durch eine Muttersprachlerin oder einen Muttersprachler steht aus.

# Skill: SOP-Verfasser

Erstellt formale, auditfähige SOPs für regulierte Branchen, ISO-Zertifizierungen oder das Skalieren betrieblicher Abläufe.

> **Nicht ganz das Richtige?** `cn-sop-writer` verwenden, wenn es um eine Arbeitsanweisung für einen einzelnen Arbeitsplatz in der Fertigung (作业指导书) geht.

## Erforderliche Angaben
- **SOP-Titel** (z. B. "SOP-001: Onboarding neuer Kunden")
- **Abteilung / Funktion**
- **Prozessbeschreibung**
- **Regulatorischer oder Qualitätsstandard** (ISO 9001, GMP, CQC, FCA usw.)
- **Beteiligte Rollen**
- **Verwendete Werkzeuge oder Geräte**

## Aufbau der Ausgabe

---

**[UNTERNEHMENSNAME]: Standardarbeitsanweisung**

| Dokument-ID | [SOP-XXX] |
|---|---|
| Titel | [Titel] |
| Abteilung | [Abteilung] |
| Version | 1.0 |
| Gültig ab | [Datum] |
| Überprüfung am | [Datum] |
| Status | Entwurf / In Prüfung / Freigegeben |

---

### 1. Zweck
[Ein bis zwei Sätze. Warum gibt es diese SOP?]

### 2. Geltungsbereich
**Gilt für:** [Rollen, Abteilungen, Standorte]
**Gilt nicht für:** [Ausdrückliche Ausnahmen]

### 3. Begriffe
| Begriff | Definition |
|---|---|
| [Begriff] | [Definition in einfacher Sprache] |

### 4. Verantwortlichkeiten
| Rolle | Verantwortung |
|---|---|
| [Rolle] | [Konkrete Verantwortung] |

### 5. Benötigte Materialien / Werkzeuge / Zugänge
- [Position]

### 6. Verfahren

| Schritt | Handlung | Verantwortlich | Aufzeichnung/Ergebnis |
|---|---|---|---|
| 6.1.1 | [Handlung im Imperativ: "[System] öffnen und zu [Ort] navigieren"] | [Rolle] | [Was aufzuzeichnen ist] |

HINWEIS: Schritte müssen im Imperativ formuliert sein. Jeder Schritt darf nur eine Handlung enthalten.

### 7. Qualitätsprüfungen

| Prüfpunkt | Was zu prüfen ist | Kriterium für bestanden | Bei Abweichung |
|---|---|---|---|
| [Nach Schritt X] | [Was zu prüfen ist] | [Woran man das richtige Ergebnis erkennt] | [Was zu tun ist] |

### 8. Abweichungen
1. [Sofortmaßnahme]
2. [Wer zu benachrichtigen ist]
3. [Wie die Abweichung zu dokumentieren ist]

### 9. Verweise
[Verwandte SOPs, Richtlinien, Normen]

### 10. Änderungshistorie

| Version | Datum | Verfasser | Änderungen |
|---|---|---|---|
| 1.0 | [Datum] | [Name] | Erstausgabe |

## Qualitätsprüfung
- [ ] Alle Schritte stehen im Imperativ ("Öffnen…", "Navigieren…", "Bestätigen…")
- [ ] Jeder Schritt enthält genau eine Handlung
- [ ] Für jeden Schritt ist eine Rolle angegeben
- [ ] Qualitätsprüfpunkte an den kritischen Stellen
- [ ] Der Abweichungsprozess legt fest, wer zu benachrichtigen und wie zu dokumentieren ist
- [ ] Änderungshistorie und Überprüfungsdatum sind enthalten

## Beispielhafte Auslöser
- "Schreib eine SOP für [Prozess]"
- "Erstelle eine Standardarbeitsanweisung für [Aufgabe]"
- "Schreib eine Arbeitsanweisung für [Prozess]"

## Typische Fehler

- [ ] Keine Schritte mit mehr als einer Handlung schreiben: Jeder Schritt ist eine einzelne, prüfbare Handlung im Imperativ
- [ ] Bei keinem Schritt die Rolle weglassen: Jede Handlung braucht eine bestimmte Rolle, sonst lässt sich die SOP nicht durchsetzen
- [ ] Den Abschnitt zu Abweichungen nicht auslassen: Eine SOP ohne Abweichungsprozess erfüllt weder Audit- noch regulatorische Anforderungen
- [ ] Keine SOP ohne Überprüfungsdatum und Versionshistorie erstellen: Auf undatierte Dokumente kann man sich bei der Compliance nicht stützen
- [ ] In Verfahrensschritten kein Passiv verwenden: "Das System öffnen", nicht "Das System sollte geöffnet werden"

Diesen Skill im Browser ausführen: https://mohitagw15856.github.io/pm-claude-skills/skill/sop-writer.html
