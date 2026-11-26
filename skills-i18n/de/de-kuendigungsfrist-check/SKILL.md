---
name: de-kuendigungsfrist-check
language: de
description: "Die Kündigungsfrist und den letzten Arbeitstag für ein Arbeitsverhältnis in Deutschland ermitteln, bei Eigenkündigung oder Kündigung durch den Arbeitgeber: die gesetzlichen Fristen nach Betriebszugehörigkeit, Probezeit, Regelungen aus Vertrag und Tarifvertrag, das Schriftformerfordernis und die Fristen, die daraus folgen. Verwenden bei Fragen wie: wie lange ist meine Kündigungsfrist, wann ist mein letzter Tag, wenn ich heute kündige, mein Arbeitgeber hat mir gekündigt, wie kündige ich in Deutschland, oder Kündigung schreiben. Liefert die geltende Frist mit der zugrunde liegenden Regel, den frühesten Beendigungstermin, ein formgerechtes Kündigungsschreiben auf Deutsch und eine Checkliste der Fristen für die Agentur für Arbeit und für eine Kündigungsschutzklage. Keine Rechtsberatung."
version: 1.0.0
---

> Deutsche Übersetzung von [de-kuendigungsfrist-check](../../../skills/de-kuendigungsfrist-check/SKILL.md). Die englische Fassung ist maßgeblich. Maschinelle Übersetzung; die Prüfung durch eine Muttersprachlerin oder einen Muttersprachler mit arbeitsrechtlicher Erfahrung steht aus.

# Kündigungsfrist-Check (Deutschland)

In Deutschland hängt die Kündigungsfrist davon ab, wer kündigt, wie lange das Arbeitsverhältnis besteht, was im Vertrag steht und ob ein Tarifvertrag gilt. Eine Kündigung per E-Mail ist unwirksam. Gegen eine Kündigung kann man nur innerhalb einer kurzen Frist vorgehen. Dieser Skill ermittelt die Termine und listet die Schritte auf, für die Fristen laufen. Die unten genannten gesetzlichen Fristen sind die üblichen aus dem Bürgerlichen Gesetzbuch; sie müssen überprüft und mit dem Vertrag und einem etwaigen Tarifvertrag abgeglichen werden.

## Was dieser Skill liefert

- Die geltende Kündigungsfrist und die Regel, aus der sie folgt
- Den frühesten Beendigungstermin für eine Kündigung, die an einem genannten Tag zugeht
- Ein Kündigungsschreiben auf Deutsch, das die Schriftform wahrt
- Bei einer Kündigung durch den Arbeitgeber: was zu prüfen ist und die Klagefrist
- Eine Fristen-Checkliste: Meldung bei der Agentur für Arbeit, Urlaub, Zeugnis, Übergabe

## Erforderliche Angaben

Nachfragen, falls nicht angegeben:

- Wer kündigt: Arbeitnehmer oder Arbeitgeber
- Beginn des Arbeitsverhältnisses und ob noch eine Probezeit läuft
- Die Kündigungsklausel des Vertrags im Wortlaut
- Ob ein Tarifvertrag gilt
- Das Datum, an dem die Kündigung zugehen wird oder zugegangen ist
- Betriebsgröße, wegen des Kündigungsschutzes
- Resturlaub und Überstunden
- Besonderer Status: Schwangerschaft, Elternzeit, Schwerbehinderung, Betriebsratsmitglied, Auszubildende

## Vorgehen: Gesetzliche Grundlage (überprüfen)

1. **Grundfrist.** Vier Wochen zum Fünfzehnten oder zum Ende eines Kalendermonats, für beide Seiten.
2. **Probezeit.** Während einer vereinbarten Probezeit von bis zu sechs Monaten zwei Wochen zu jedem Tag.
3. **Die Frist des Arbeitgebers verlängert sich mit der Betriebszugehörigkeit**, jeweils zum Ende eines Kalendermonats: zwei Jahre, ein Monat; fünf Jahre, zwei Monate; acht Jahre, drei; zehn Jahre, vier; zwölf Jahre, fünf; fünfzehn Jahre, sechs; zwanzig Jahre, sieben.
4. **Frist des Arbeitnehmers.** Bleibt bei der Grundfrist, sofern der Vertrag sie nicht verlängert. Ein Vertrag darf die Frist des Arbeitnehmers an die längere des Arbeitgebers angleichen, sie aber nicht länger machen als die des Arbeitgebers.
5. **Vertrag und Tarifvertrag.** Eine längere vertragliche Frist gilt in der Regel. Tarifverträge können verkürzen oder verlängern. Beides prüfen.
6. **Schriftform.** Die Kündigung muss auf Papier mit eigenhändiger Unterschrift erfolgen. E-Mail, Fax, Scan und Messenger sind unwirksam.
7. **Der Zugang entscheidet über den Termin.** Die Frist beginnt, wenn die Kündigung der anderen Seite zugeht. Gegen unterschriebene Empfangsbestätigung übergeben oder per Boten oder mit einem nachweisbaren Verfahren und Zeugen zustellen.
8. **Kündigungsschutz.** In Betrieben oberhalb der Kleinbetriebsschwelle braucht eine Kündigung nach sechs Monaten Beschäftigung eine soziale Rechtfertigung. Eine Klage muss innerhalb von drei Wochen nach Zugang der Kündigung beim Arbeitsgericht eingehen.
9. **Agentur für Arbeit.** Spätestens drei Monate vor dem Ende arbeitsuchend melden, oder innerhalb von drei Tagen nach Kenntnis des Beendigungstermins, wenn dieser näher liegt. Eine Eigenkündigung oder ein Aufhebungsvertrag ohne wichtigen Grund löst in der Regel eine Sperrzeit aus.
10. **Sonderkündigungsschutz.** Für Schwangerschaft, Elternzeit, Schwerbehinderung und Betriebsratsmitgliedschaft gelten zusätzliche Regeln. Kennzeichnen und weiterverweisen.

## Ausgabeformat

### Kündigungsfrist: Kündigung durch [Arbeitnehmer / Arbeitgeber], Zugang am [Datum]

**Es gilt:** [Frist] nach [Gesetz / Vertragsklausel / Tarifvertrag].
**Frühester Beendigungstermin:** [Datum]. **Herleitung:** [Zugangsdatum, Frist, zulässige Endtermine].

| Prüfpunkt | Ergebnis |
|---|---|
| Läuft die Probezeit? | |
| Vertragsklausel | |
| Tarifvertrag | |
| Betriebszugehörigkeit | |
| Sonderkündigungsschutz | |

**Kündigungsschreiben (Deutsch)**
> [Name, Anschrift]
> [Arbeitgeber, Anschrift]
> [Ort, Datum]
>
> **Kündigung meines Arbeitsverhältnisses**
>
> Sehr geehrte Damen und Herren,
> hiermit kündige ich das mit Ihnen bestehende Arbeitsverhältnis ordentlich und fristgerecht zum [Datum], hilfsweise zum nächstmöglichen Termin.
> Bitte bestätigen Sie mir den Erhalt dieser Kündigung sowie das Beendigungsdatum schriftlich und stellen Sie mir ein qualifiziertes Arbeitszeugnis aus.
>
> Mit freundlichen Grüßen
> [eigenhändige Unterschrift]

**Wenn Sie eine Kündigung erhalten haben**
- [ ] Datum des Zugangs notieren
- [ ] Form, Unterzeichner, Kündigungsfrist und Anhörung des Betriebsrats prüfen
- [ ] Innerhalb von drei Wochen über eine Klage entscheiden
- [ ] Bei der Agentur für Arbeit melden

**Fristen**
| Bis | Schritt |
|---|---|

**Annahmen und Lücken**
- [Angenommene Vertragsbedingungen]
- [Was ein Tarifvertrag ändern könnte]

*Eine Berechnungshilfe, keine Rechtsberatung. Fristen anhand des aktuellen Bürgerlichen Gesetzbuchs und des eigenen Vertrags überprüfen oder eine Anwältin, einen Anwalt oder die Gewerkschaft fragen.*

## Qualitätsprüfung

- [ ] Die Regel hinter der Frist ist benannt
- [ ] Der Endtermin beachtet die Regel zum Fünfzehnten oder Monatsende
- [ ] Das Schreiben enthält "hilfsweise zum nächstmöglichen Termin" und verlangt eine eigenhändige Unterschrift
- [ ] Die Drei-Wochen-Klagefrist erscheint bei jeder Arbeitgeberkündigung
- [ ] Meldung bei der Agentur für Arbeit und Sperrzeitrisiko sind abgedeckt
- [ ] Fälle von Sonderkündigungsschutz sind gekennzeichnet

## Typische Fehler

- **Keine Kündigung per E-Mail oder Messenger zulassen.**
- **Die langen Arbeitgeberfristen nicht auf die Eigenkündigung anwenden**, sofern der Vertrag das nicht vorsieht.
- **Den Tarifvertrag nicht übergehen.**
- **Nicht zur Unterschrift unter einen Aufhebungsvertrag raten**, ohne auf das Sperrzeitrisiko hinzuweisen.
- **Die Frist nicht ab dem Datum auf dem Schreiben rechnen.** Sie läuft ab Zugang.

## Beispielhafte Auslöser

- "Ich arbeite seit sechs Jahren hier. Wie lange ist meine Kündigungsfrist?"
- "Wenn ich am 10. März kündige, wann ist mein letzter Tag?"
- "Mein Arbeitgeber hat mir gestern gekündigt. Welche Fristen laufen jetzt?"
- "Schreib mein Kündigungsschreiben auf Deutsch."

Diesen Skill im Browser ausführen: https://mohitagw15856.github.io/pm-claude-skills/skill/de-kuendigungsfrist-check.html
