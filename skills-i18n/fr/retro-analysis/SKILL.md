---
name: retro-analysis
language: fr
description: "Analyse les données de livraison d'un sprint et produit un dossier de rétrospective structuré. À utiliser quand on demande d'animer une rétrospective, d'analyser les données d'un sprint, de préparer un dossier de rétro ou de transformer des indicateurs de sprint en questions de discussion. Produit un dossier fondé sur les données : statistiques d'achèvement, analyse des tendances, questions Commencer / Arrêter / Continuer, et une expérience concrète pour le prochain sprint."
---

> Traduction française de [retro-analysis](../../../skills/retro-analysis/SKILL.md). La version anglaise est canonique. Traduction automatique, en attente de relecture par une personne de langue maternelle française.

# Compétence Analyse de rétrospective

Génère un dossier de rétrospective fondé sur les données, qui sépare les faits des ressentis, pour que l'équipe consacre le temps de la rétro aux solutions plutôt qu'à débattre de ce qui s'est passé.

## Informations requises

Travailler à partir de ce qui est fourni. Si l'un de ces éléments manque, produire quand même le résultat complet : combler chaque manque par une hypothèse raisonnable marquée *(supposé, à confirmer)* et lister ces hypothèses à la fin. Ne poser une question d'abord que si le sujet lui-même manque (il n'y a rien sur quoi écrire).
- **Tickets du sprint : prévus et terminés**
- **Tickets reportés et raisons** (si elles sont connues)
- **Tickets rouverts après clôture** (signal de qualité)
- **Incidents ou travail non planifié** (signal de dérive du périmètre)
- **Vélocité du sprint par rapport à la moyenne historique** (contexte de tendance)

## Démarche
1. Calculer : taux d'achèvement, taux de report, part de travail non planifié
2. Repérer les tendances : quels types de tickets ont le plus souvent été reportés ? Lesquels ont causé des blocages ?
3. Noter toute rupture de processus ou de communication visible dans les données
4. Préparer trois questions « Commencer / Arrêter / Continuer » à partir des données, non génériques, propres à ce sprint
5. Proposer une expérience concrète pour le prochain sprint, à partir du principal point de friction
6. **Valider** : confirmer que chaque question est propre à ce sprint (pas une question générique recyclée) et que l'expérience recommandée est concrète et mesurable

## Structure de sortie

### Dossier de rétrospective du sprint [numéro]

**En chiffres :**
- Prévus : [n] tickets | Terminés : [n] | Reportés : [n] | Taux d'achèvement : [%]
- Travail non planifié : [n] tickets ([%] de la capacité)
- Vélocité : [points] contre [moyenne] en moyenne

**Ce que suggèrent les données :**
[Deux ou trois observations fondées sur les chiffres ci-dessus]

**Questions de discussion :**
- Commencer : [question précise fondée sur les données de ce sprint]
- Arrêter : [question précise fondée sur les données de ce sprint]
- Continuer : [question précise fondée sur les données de ce sprint]

**Expérience proposée pour le prochain sprint :**
[Un changement de processus concret et testable, avec un indicateur de réussite précis]

## Pour aller plus loin

Cette compétence est livrée avec des fichiers d'appui ; les utiliser lorsqu'ils sont disponibles :

- **`references/root-cause-vs-symptom.md`** : des rétros qui changent les choses, causes profondes et symptômes. À appliquer en produisant le résultat ; il contient le calibrage et les arbitrages que le résumé de méthode ci-dessus condense.
- **`templates/retro-board.md`** : une version à remplir du livrable, avec les contrôles qualité intégrés. À proposer quand l'utilisateur veut travailler le document lui-même plutôt que de le faire générer.

## Grille de notation (0 à 40)

Noter tout résultat de cette compétence avant de le remettre ; à partir de 32, il est prêt à être diffusé.

| Dimension | 0 | 5 | 10 |
|---|---|---|---|
| **Ancrage dans les données** | Chiffres absents ou faux ; les observations sont des opinions sans source traçable | Les taux principaux sont justes, mais les observations se bornent à répéter les chiffres sans analyse des tendances (types de tickets, comparaison historique) | Chaque observation renvoie à un chiffre calculé, les reports sont ventilés par type ou par cause, et la vélocité est comparée à la tendance historique, pas seulement à la moyenne |
| **Absence de blâme** | Le dossier désigne ou sous-entend des personnes ou des métiers comme cause (« la QA les a manqués ») | Formulation neutre, mais le cadrage vise encore l'effort ou la rigueur plutôt que les conditions du système | Les défaillances sont reformulées en tendances de processus, de couverture ou de planification que les données étayent réellement ; un lecteur sur la défensive n'y trouverait rien qui le vise |
| **Précision des questions** | Commencer / Arrêter / Continuer sont des catégories génériques recyclées (« mieux communiquer ») | Les questions évoquent ce sprint mais restent au niveau de la catégorie : pas de chiffres, pas de comportement nommé | Chaque question est rivée aux données de ce sprint, nomme un comportement précis et est formulée pour ouvrir la discussion, pas pour dicter la réponse |
| **Qualité de l'expérience** | Pas d'expérience, ou un chantier de plusieurs trimestres déguisé en expérience | Un changement concret, mais dont la réussite n'est pas mesurable ou pas évaluable à la prochaine rétro | Un changement de processus testable en un seul sprint, avec des indicateurs de réussite explicites et un coût annoncé en cas d'erreur, vérifiable à la prochaine rétro |

## Contrôles qualité

- [ ] Chaque question Commencer / Arrêter / Continuer nomme un comportement précis, pas une catégorie vague
- [ ] L'expérience recommandée est testable en un sprint
- [ ] L'analyse des reports identifie le type de ticket ou la cause, pas seulement le nombre
- [ ] Les observations ne désignent pas de coupable : elles décrivent des tendances
- [ ] La tendance de vélocité est replacée dans son contexte (cas isolé ou tendance ?)

## À éviter

- [ ] Ne pas blâmer des personnes dans le dossier : les observations décrivent des tendances, pas des individus
- [ ] Ne pas produire de questions Commencer / Arrêter / Continuer qui soient des catégories vagues : chacune nomme un comportement précis
- [ ] Ne pas recommander une expérience qui ne peut pas être menée en un sprint : uniquement de petites expériences testables
- [ ] Ne pas traiter les tickets reportés comme un problème de vélocité sans avoir d'abord identifié la catégorie de cause profonde
- [ ] Ne pas reprendre le même format de rétrospective à chaque sprint : le varier pour éviter la lassitude

## Exemples de phrases déclencheuses

- « Anime une rétrospective. »
- « Analyse les données du sprint. »
- « Prépare un dossier de rétro. »
- « Transforme les indicateurs du sprint en questions de discussion. »

Exécuter cette compétence dans votre navigateur : https://mohitagw15856.github.io/pm-claude-skills/skill/retro-analysis.html
