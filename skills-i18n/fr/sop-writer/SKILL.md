---
name: sop-writer
language: fr
description: "Rédige une procédure opérationnelle normalisée (SOP) pour n'importe quelle tâche opérationnelle. À utiliser quand on demande une SOP, une procédure opérationnelle normalisée, une instruction de travail ou un manuel d'exploitation. Produit une SOP formelle avec objet, champ d'application, étapes de la procédure, contrôles qualité et gestion des versions."
---

> Traduction française de [sop-writer](../../../skills/sop-writer/SKILL.md). La version anglaise est canonique. Traduction automatique, en attente de relecture par une personne de langue maternelle française.

# Compétence Rédacteur de SOP

Produit des SOP formelles, prêtes pour un audit, adaptées aux secteurs réglementés, à une certification ISO ou à la montée en charge des opérations.

> **Pas tout à fait cela ?** Utilisez `cn-sop-writer` pour une instruction de travail d'atelier à un seul poste (作业指导书) dans une usine.

## Informations requises
- **Titre de la SOP** (par exemple « SOP-001 : intégration d'un nouveau client »)
- **Service / fonction**
- **Description du processus**
- **Norme réglementaire ou de qualité** (ISO 9001, BPF, CQC, FCA, etc.)
- **Rôles concernés**
- **Outils ou équipements utilisés**

## Structure de sortie

---

**[NOM DE L'ENTREPRISE] : procédure opérationnelle normalisée**

| Référence du document | [SOP-XXX] |
|---|---|
| Titre | [Titre] |
| Service | [Service] |
| Version | 1.0 |
| Date d'entrée en vigueur | [Date] |
| Date de révision | [Date] |
| Statut | Brouillon / En cours de revue / Approuvé |

---

### 1. Objet
[Une ou deux phrases. Pourquoi cette SOP existe-t-elle ?]

### 2. Champ d'application
**S'applique à :** [Rôles, services, sites]
**Ne s'applique pas à :** [Exclusions explicites]

### 3. Définitions
| Terme | Définition |
|---|---|
| [Terme] | [Définition en langage simple] |

### 4. Responsabilités
| Rôle | Responsabilité |
|---|---|
| [Rôle] | [Responsabilité précise] |

### 5. Matériel / outils / accès requis
- [Élément]

### 6. Procédure

| Étape | Action | Responsable | Enregistrement/Résultat |
|---|---|---|---|
| 6.1.1 | [Action à l'impératif : « Ouvrir [système] et aller à [emplacement] »] | [Rôle] | [Ce qu'il faut consigner] |

NOTE : les étapes doivent être rédigées à l'impératif. Chaque étape ne contient qu'une seule action.

### 7. Contrôles qualité

| Point de contrôle | Ce qu'il faut vérifier | Critère de réussite | En cas d'échec |
|---|---|---|---|
| [Après l'étape X] | [Ce qu'il faut contrôler] | [À quoi ressemble un bon résultat] | [Ce qu'il faut faire] |

### 8. Non-conformité
1. [Action immédiate]
2. [Qui prévenir]
3. [Comment documenter l'écart]

### 9. Références
[SOP, politiques et normes associées]

### 10. Historique du document

| Version | Date | Auteur | Modifications |
|---|---|---|---|
| 1.0 | [Date] | [Nom] | Première diffusion |

## Contrôles qualité
- [ ] Toutes les étapes sont à l'impératif (« Ouvrir… », « Aller à… », « Confirmer… »)
- [ ] Chaque étape contient exactement une action
- [ ] Un rôle est indiqué pour chaque étape
- [ ] Des points de contrôle qualité aux étapes critiques
- [ ] Le traitement des non-conformités précise qui prévenir et comment documenter
- [ ] Le tableau d'historique et la date de révision sont présents

## Exemples de phrases déclencheuses
- « Rédige une SOP pour [processus] »
- « Crée une procédure opérationnelle normalisée pour [tâche] »
- « Rédige une instruction de travail pour [processus] »

## À éviter

- [ ] Ne pas écrire d'étape contenant plus d'une action : chaque étape est une action unique, vérifiable, à l'impératif
- [ ] Ne laisser aucune étape sans rôle : chaque action doit être attribuée à un rôle précis, sinon la SOP est inapplicable
- [ ] Ne pas omettre la section sur les non-conformités : une SOP sans traitement des écarts ne satisfait ni un audit ni la réglementation
- [ ] Ne pas produire de SOP sans date de révision ni historique des versions : un document non daté ne peut pas servir de base à la conformité
- [ ] Ne pas employer la voix passive dans les étapes : écrire « Ouvrir le système », pas « Le système doit être ouvert »

Exécuter cette compétence dans votre navigateur : https://mohitagw15856.github.io/pm-claude-skills/skill/sop-writer.html
