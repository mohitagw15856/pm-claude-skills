---
name: de-arbeitszeugnis-decoder
language: de
description: "Ein deutsches Arbeitszeugnis entschlüsseln: die codierten Formulierungen in die Note übersetzen, die sie signalisieren, Aufbau und Schlussformel prüfen, Auslassungen und versteckte Kritik erkennen und eine Bitte um Berichtigung entwerfen. Verwenden bei Fragen wie: was bedeutet mein Arbeitszeugnis, welche Note hat mein Zeugnis, ist 'stets zu unserer vollen Zufriedenheit' gut, oder wie bitte ich um eine Korrektur meines Zeugnisses. Liefert eine Lesart Satz für Satz mit den jeweiligen Noten, eine Einschätzung der Gesamtnote, eine Liste fehlender oder schädlicher Elemente, Formulierungsvorschläge und ein höfliches Berichtigungsschreiben auf Deutsch. Keine Rechtsberatung."
version: 1.0.0
---

> Deutsche Übersetzung von [de-arbeitszeugnis-decoder](../../../skills/de-arbeitszeugnis-decoder/SKILL.md). Die englische Fassung ist maßgeblich. Maschinelle Übersetzung; die Prüfung durch eine Muttersprachlerin oder einen Muttersprachler mit arbeitsrechtlicher Erfahrung steht aus.

# Arbeitszeugnis-Decoder (Deutschland)

Ein deutsches Zeugnis muss zugleich wahr und wohlwollend sein. Kritik wird deshalb über einen eingespielten Code ausgedrückt: was gelobt wird, wie stark, in welcher Reihenfolge, und was fehlt. Ein Satz, der für Außenstehende wie Lob klingt, kann für eine Personalabteilung eine mittelmäßige Note bedeuten. Dieser Skill liest das Zeugnis so, wie es eine deutsche Personalabteilung liest. Er erklärt Konventionen; er leistet keine Rechtsberatung, und die Notenkonventionen sind üblich, nicht gesetzlich festgelegt.

## Was dieser Skill liefert

- Eine Lesart Satz für Satz: die Formulierung, was sie signalisiert, die damit verbundene Schulnote von 1 (sehr gut) bis 5 (mangelhaft)
- Eine Einschätzung der Gesamtnote mit Begründung
- Eine Prüfung des Aufbaus: Sind alle erwarteten Abschnitte vorhanden und in der üblichen Reihenfolge?
- Auslassungen und Formulierungen, die Leser als Warnsignal verstehen
- Ersatzformulierungen für die Schwachstellen
- Eine Bitte um Berichtigung an den Arbeitgeber, auf Deutsch

## Erforderliche Angaben

Nachfragen, falls nicht angegeben:

- Der vollständige Zeugnistext auf Deutsch
- Ob es ein einfaches Zeugnis (nur Tätigkeit und Dauer) oder ein qualifiziertes Zeugnis (Leistung und Verhalten) ist
- Position, Hierarchiestufe und Dauer der Beschäftigung
- Wie das Arbeitsverhältnis endete und von wem die Beendigung ausging
- Welche Note die Arbeitnehmerin oder der Arbeitnehmer für angemessen hält, und Beurteilungen, die das stützen
- Ob ein Zwischenzeugnis vorliegt

## Vorgehen

1. **Erwarteter Aufbau.** Überschrift; Einleitung mit Name, Position und Daten; Tätigkeitsbeschreibung; Leistungsbeurteilung (Fachwissen, Arbeitsweise, Ergebnisse, bei Führungskräften auch Führung); zusammenfassende Leistungsnote; Verhalten gegenüber Vorgesetzten, Kollegen und Kunden; Grund des Ausscheidens; Schlussformel mit Bedauern, Dank und guten Wünschen; Ort, Datum und Unterschrift.
2. **Die Zufriedenheitsskala** (zusammenfassender Leistungssatz):
   - "stets zu unserer vollsten Zufriedenheit": 1
   - "stets zu unserer vollen Zufriedenheit": 2
   - "zu unserer vollen Zufriedenheit": 3
   - "zu unserer Zufriedenheit": 4
   - "im Großen und Ganzen zu unserer Zufriedenheit" oder "hat sich bemüht": 5 oder schlechter
3. **Verstärker tragen die Note.** "stets", "jederzeit", "in jeder Hinsicht", "außerordentlich" heben einen Satz; fehlen sie, sinkt er.
4. **Reihenfolge beim Verhalten.** Üblicherweise werden zuerst Vorgesetzte genannt, dann Kollegen, dann Kunden. Eine geänderte Reihenfolge oder eine fehlende Gruppe wird als Problem mit dieser Gruppe gelesen.
5. **Auslassungen sprechen.** Wird eine offensichtlich zentrale Aufgabe nicht erwähnt, die Ehrlichkeit bei einer Kassenkraft oder die Führung bei einer Führungskraft, ist das ein negatives Signal.
6. **Schlussformel.** Bedauern über das Ausscheiden, Dank und Zukunftswünsche signalisieren eine gute Trennung. Eine knappe oder fehlende Schlussformel senkt den Gesamteindruck. Gerichte haben entschieden, dass in der Regel kein durchsetzbarer Anspruch auf eine Schlussformel besteht; das benennen und zur Prüfung der aktuellen Rechtslage raten.
7. **Warnformulierungen.** Lob für Nebensächliches, "gesellig", "verstand es, seine Interessen durchzusetzen", Passivkonstruktionen rund um Ergebnisse und doppelte Verneinungen wie "nicht unerheblich".
8. **Formalien.** Firmenbriefpapier, Ausstellungsdatum nahe am letzten Arbeitstag, Unterschrift einer ranghöheren Person, keine Rechtschreibfehler, keine Markierungen oder Hervorhebungen.
9. **Berichtigung.** Die Arbeitnehmerin oder der Arbeitnehmer kann eine Berichtigung verlangen und andernfalls klagen; Ausschlussfristen aus Arbeits- und Tarifvertrag können kurz sein. Zu zügigem Handeln und zum Blick in den Vertrag raten.

## Ausgabeformat

### Zeugnisanalyse: [Position], [Arbeitgeber]

**Art:** [einfach / qualifiziert]. **Gesamteinschätzung:** Note [x] ([Bezeichnung]), weil [Begründung].

| Satz (Deutsch) | Was er signalisiert | Enthaltene Note |
|---|---|---|

**Prüfung des Aufbaus**
| Abschnitt | Vorhanden? | Anmerkung |
|---|---|---|

**Probleme**
- [Auslassung oder Warnformulierung und warum sie zählt]

**Formulierungsvorschläge**
| Bisher | Vorschlag (Note [x]) |
|---|---|

**Bitte um Berichtigung (Deutsch)**
> [Höfliches Schreiben, das die Passagen benennt, Formulierungen vorschlägt und eine angemessene Frist setzt.]

**Annahmen und Lücken**
- [Angenommener Kontext zu Position oder Beendigung]
- [Welche Belege die Bitte stärken würden]

*Eine Auslegung der üblichen Zeugnissprache, keine Rechtsberatung. Bei einem Streit eine Fachanwältin oder einen Fachanwalt für Arbeitsrecht oder die Gewerkschaft einschalten.*

## Qualitätsprüfung

- [ ] Der zusammenfassende Leistungssatz ist benannt und auf der Skala eingeordnet
- [ ] Reihenfolge und Vollständigkeit des Verhaltenssatzes sind geprüft
- [ ] Die drei Elemente der Schlussformel sind einzeln geprüft
- [ ] Jedes Problem zitiert den genauen Wortlaut
- [ ] Die vorgeschlagenen Formulierungen bleiben der Tätigkeit gegenüber wahr
- [ ] Das Berichtigungsschreiben ist auf Deutsch und höflich

## Typische Fehler

- **Zeugnisformulierungen nicht wörtlich lesen.**
- **Keinen Rechtsanspruch auf eine bestimmte Note oder Schlussformel versprechen.**
- **Keine Formulierungen vorschlagen, die Aufgaben behaupten, die es nie gab.**
- **Formale Mängel nicht übergehen**, etwa ein falsches Datum oder eine fehlende Unterschrift.
- **Nicht nach einem einzelnen Satz benoten.** Das ganze Dokument abwägen.

## Beispielhafte Auslöser

- "Was bedeutet 'zu unserer vollen Zufriedenheit' in meinem Zeugnis?"
- "Entschlüssle dieses Arbeitszeugnis und sag mir, welche Note es ist."
- "Es gibt keinen Schlusssatz mit guten Wünschen. Ist das schlecht?"
- "Schreib einen Brief, in dem ich die Personalabteilung bitte, mein Zeugnis auf Note 2 zu korrigieren."

Diesen Skill im Browser ausführen: https://mohitagw15856.github.io/pm-claude-skills/skill/de-arbeitszeugnis-decoder.html
