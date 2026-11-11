---
name: project-status-report
language: de
description: "Einen strukturierten Projektstatusbericht für ein beliebiges Projekt schreiben. Verwenden, wenn ein Projekt-Update, ein Statusbericht, ein Ampelbericht, der Begleittext zu einem Projekt-Dashboard oder die wöchentliche Projektkommunikation gewünscht ist. Liefert einen klaren Statusbericht mit Ampelbewertungen, Meilensteinfortschritt, Risiken und offenen Entscheidungen."
---

> Deutsche Übersetzung von [project-status-report](../../../skills/project-status-report/SKILL.md). Die englische Fassung ist maßgeblich. Maschinelle Übersetzung; die Prüfung durch eine Muttersprachlerin oder einen Muttersprachler steht aus.

# Skill: Projektstatusbericht

Erstellt einen klaren, strukturierten Projektstatusbericht: die wöchentliche Kommunikation, die Stakeholder informiert hält, ohne dass es ein Meeting braucht.

## Erforderliche Angaben
- **Projektname**
- **Berichtszeitraum**
- **Aktueller Ampelstatus** (Rot / Gelb / Grün)
- **Wichtige Meilensteine** (fällig, geliefert, anstehend)
- **Probleme oder Blocker**
- **Entscheidungen, die von Stakeholdern gebraucht werden**
- **Budgetstatus** (falls verfolgt)
- **Empfängerkreis** (Lenkungsausschuss / Sponsor / PMO / gesamtes Team)

## Aufbau der Ausgabe

---

# Projektstatusbericht: [Projektname]
**Zeitraum:** [Datumsbereich] | **Verfasser:** [Projektleitung] | **Nächster Bericht:** [Datum]

---

### Gesamtstatus

| Dimension | Status | Vorperiode | Trend |
|---|---|---|---|
| Gesamt | Rot / Gelb / Grün | [Zuletzt] | Verbessert / Stabil / Verschlechtert |
| Zeitplan | | | |
| Budget | | | |
| Umfang | | | |
| Risiken | | | |

Ampeldefinitionen:
- Grün: Im Plan. Keine wesentlichen Probleme.
- Gelb: Gefährdet. Probleme erkannt, Gegenmaßnahmen laufen.
- Rot: Außer Plan. Eskalation oder Entscheidungen nötig, um aufzuholen.

---

### Zusammenfassung für die Leitung
[Drei bis fünf Sätze. Die Kernaussage. Bei Rot sofort sagen, dass es Rot ist und warum. Schlechte Nachrichten nie hinter guten verstecken.]

---

### Meilensteinfortschritt

| Meilenstein | Fälligkeit | Status | Kommentar |
|---|---|---|---|
| [Meilenstein] | [Datum] | Abgeschlossen / Gefährdet / Verzögert / Im Plan | [Eine Zeile] |

**In dieser Periode abgeschlossen:** [Was geliefert wurde]
**In der nächsten Periode fällig:** [Was erwartet wird]

---

### Probleme und Blocker

**[Titel des Problems]: Kritisch / Hoch / Niedrig**
- **Beschreibung:** [Worin das Problem besteht]
- **Auswirkung:** [Was geschieht, wenn es ungelöst bleibt]
- **Verantwortlich:** [Wer es löst]
- **Maßnahme:** [Was getan wird]
- **Lösungstermin:** [Wann es abgeschlossen ist]

---

### Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme | Verantwortlich |
|---|---|---|---|---|
| [Risiko] | H/M/N | H/M/N | [Maßnahme] | [Name] |

---

### Erforderliche Entscheidungen

| Entscheidung | Hintergrund | Optionen | Empfehlung | Benötigt bis |
|---|---|---|---|---|
| [Entscheidung] | [Kontext] | [Optionen] | [Empfehlung] | [Datum] |

---

### Budgetübersicht

| | Budget | Ist bis heute | Prognose | Abweichung |
|---|---|---|---|---|
| Gesamt | € | € | € | € günstig/ungünstig |

---

### Plan für die nächste Periode
[Drei bis fünf konkrete Stichpunkte: was in der nächsten Periode geschieht]

## Schreibregeln
- Einen roten Status nie abschwächen
- Meilensteine sind binär: abgeschlossen oder nicht abgeschlossen
- Entscheidungen müssen tatsächlich entscheidbar sein
- Möglichst auf einer Seite bleiben

## Qualitätsprüfung

- [ ] Ein roter Status steht gleich am Anfang (nicht hinter Positivem versteckt)
- [ ] Jedes Problem hat eine namentlich verantwortliche Person und einen Lösungstermin
- [ ] Die erforderlichen Entscheidungen kann der Empfängerkreis tatsächlich treffen
- [ ] Meilensteine sind binär (abgeschlossen oder nicht, kein "zu 85 % fertig")
- [ ] Die Zusammenfassung steht für sich, auch wenn jemand sonst nichts liest

## Typische Fehler

- [ ] Den Projektzustand nicht als Grün bewerten, wenn ungelöste kritische Blocker aufgeführt sind
- [ ] Meilensteinfortschritt nicht in Prozent berichten: Meilensteine sind binär, abgeschlossen oder nicht
- [ ] Risiken nicht ans Ende schieben: Ein hohes Risiko gehört in die Zusammenfassung
- [ ] Keine Entscheidung offen lassen, ohne zu sagen, wer bis wann entscheiden muss
- [ ] Keine Zusammenfassung schreiben, die man nur mit dem ganzen Bericht versteht: Sie muss für sich stehen

## Beispielhafte Auslöser
- "Schreib einen Projektstatusbericht für [Projekt]"
- "Erstelle ein Ampel-Update für [Projekt]"
- "Schreib den Bericht für den Lenkungsausschuss zu [Projekt]"

Diesen Skill im Browser ausführen: https://mohitagw15856.github.io/pm-claude-skills/skill/project-status-report.html
