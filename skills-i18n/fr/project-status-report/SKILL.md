---
name: project-status-report
language: fr
description: "Rédige un rapport d'avancement de projet structuré, pour n'importe quel projet. À utiliser quand on demande un point projet, un rapport d'avancement, un rapport à feux tricolores, le commentaire d'un tableau de bord de projet ou la communication hebdomadaire du projet. Produit un rapport clair avec indicateurs rouge, orange, vert, avancement des jalons, risques et décisions attendues."
---

> Traduction française de [project-status-report](../../../skills/project-status-report/SKILL.md). La version anglaise est canonique. Traduction automatique, en attente de relecture par une personne de langue maternelle française.

# Compétence Rapport d'avancement de projet

Produit un rapport d'avancement clair et structuré : la communication hebdomadaire qui tient les parties prenantes informées sans exiger de réunion.

## Informations requises
- **Nom du projet**
- **Période couverte**
- **Statut actuel** (Rouge / Orange / Vert)
- **Jalons clés** (échus, livrés, à venir)
- **Problèmes ou points bloquants**
- **Décisions attendues des parties prenantes**
- **État du budget** (s'il est suivi)
- **Destinataires** (comité de pilotage / sponsor / PMO / équipe complète)

## Structure de sortie

---

# Rapport d'avancement : [Nom du projet]
**Période :** [Dates] | **Auteur :** [Chef de projet] | **Prochain rapport :** [Date]

---

### Statut global

| Dimension | Statut | Période précédente | Tendance |
|---|---|---|---|
| Global | Rouge / Orange / Vert | [Précédent] | En amélioration / Stable / En dégradation |
| Calendrier | | | |
| Budget | | | |
| Périmètre | | | |
| Risques | | | |

Définition des couleurs :
- Vert : dans les temps. Aucun problème notable.
- Orange : à risque. Problèmes identifiés, mesures d'atténuation en place.
- Rouge : hors trajectoire. Une escalade ou des décisions sont nécessaires pour redresser.

---

### Synthèse pour la direction
[Trois à cinq phrases. Le message principal. Si le statut est rouge, le dire tout de suite et dire pourquoi. Ne jamais cacher une mauvaise nouvelle derrière une bonne.]

---

### Avancement des jalons

| Jalon | Échéance | Statut | Commentaire |
|---|---|---|---|
| [Jalon] | [Date] | Terminé / À risque / En retard / Dans les temps | [Une ligne] |

**Terminé sur la période :** [Ce qui a été livré]
**Attendu à la prochaine période :** [Ce qui est prévu]

---

### Problèmes et points bloquants

**[Titre du problème] : Critique / Élevé / Faible**
- **Description :** [En quoi consiste le problème]
- **Conséquence :** [Ce qui se passe s'il n'est pas résolu]
- **Responsable :** [Qui le résout]
- **Action :** [Ce qui est fait]
- **Date de résolution :** [Quand il sera clos]

---

### Risques

| Risque | Probabilité | Gravité | Atténuation | Responsable |
|---|---|---|---|---|
| [Risque] | F/M/É | F/M/É | [Action] | [Nom] |

---

### Décisions attendues

| Décision | Contexte | Options | Recommandation | Nécessaire avant le |
|---|---|---|---|---|
| [Décision] | [Contexte] | [Options] | [Recommandation] | [Date] |

---

### Synthèse budgétaire

| | Budget | Réalisé à ce jour | Prévision | Écart |
|---|---|---|---|---|
| Total | € | € | € | € favorable/défavorable |

---

### Plan pour la prochaine période
[Trois à cinq points précis : ce qui se passera à la prochaine période]

## Règles de rédaction
- Ne jamais adoucir un statut rouge
- Les jalons sont binaires : terminé ou non terminé
- Les décisions doivent pouvoir être réellement prises
- Tenir sur une page si possible

## Contrôles qualité

- [ ] Un statut rouge est annoncé tout de suite (pas caché après les points positifs)
- [ ] Chaque problème a un responsable nommé et une date de résolution
- [ ] Les décisions attendues peuvent réellement être prises par les destinataires
- [ ] Les jalons sont binaires (terminé ou non, pas de « fait à 85 % »)
- [ ] La synthèse se suffit à elle-même pour un lecteur qui ne lit rien d'autre

## À éviter

- [ ] Ne pas noter le projet en vert tout en listant des points bloquants critiques non résolus
- [ ] Ne pas exprimer l'avancement d'un jalon en pourcentage : un jalon est terminé ou ne l'est pas
- [ ] Ne pas reléguer les risques en fin de rapport : un risque élevé a sa place dans la synthèse
- [ ] Ne pas laisser une décision attendue sans préciser qui doit décider et avant quelle date
- [ ] Ne pas écrire une synthèse qui oblige à lire tout le rapport pour la comprendre : elle doit se suffire à elle-même

## Exemples de phrases déclencheuses
- « Rédige un rapport d'avancement pour [projet] »
- « Génère un point de statut rouge, orange, vert pour [projet] »
- « Rédige le rapport du comité de pilotage pour [projet] »

Exécuter cette compétence dans votre navigateur : https://mohitagw15856.github.io/pm-claude-skills/skill/project-status-report.html
