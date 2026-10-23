<sub>[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · **Español** · [Português (BR)](README.pt-BR.md)</sub>

# 🧠 PM Skills: Agent Skills profesionales

> Esta traducción se preparó con asistencia automática. Las correcciones de hablantes nativos son bienvenidas por PR; cómo hacerlo está en [CONTRIBUTING.md](CONTRIBUTING.md).

> **Una petición a tu IA, un entregable terminado de vuelta:** el PRD, el informe para stakeholders y la decisión difícil, al nivel de un product manager senior.

Instala y pega esto en tu asistente:

```text
Aquí están mis notas sin pulir de seis entrevistas con clientes: [pega tus notas].
Conviértelas en un PRD de una página, un registro de riesgos con responsables
y un informe para dirección que pueda enviar hoy mismo.
```

Tu asistente carga [user-interview-synthesis](skills/user-interview-synthesis/SKILL.md), [prd-template](skills/prd-template/SKILL.md) y [stakeholder-update](skills/stakeholder-update/SKILL.md) y devuelve los tres documentos, no consejos sobre cómo escribirlos.

PM Skills es una biblioteca open source de 1311 Agent Skills: archivos Markdown (SKILL.md) que enseñan a un asistente de IA a hacer una tarea profesional al nivel de alguien senior, desde escribir un PRD hasta descifrar un contrato de alquiler. Cada skill incluye el marco de trabajo, una plantilla de salida, controles de calidad y antipatrones. Licencia MIT; funciona con Claude, ChatGPT, Gemini, Cursor y Codex. (PM significa Professional, no solo product manager.)

## ⚡ Instalación en 30 segundos

```bash
npx pm-claude-skills add          # cualquier herramienta: Cursor, Codex, Windsurf…
# En Claude Code:  /plugin → busca «pm-skills» (directorio oficial de Anthropic)
npx pm-claude-skills setup        # guiado: detecta tus agentes, muestra el plan, hace copia de seguridad
```

Una skill es solo un archivo Markdown que tu IA lee: instalar copia archivos de texto y desinstalar los borra; nada puede romper tu entorno. Instrucciones por herramienta: [docs/installation.md](docs/installation.md)

## 🗺 Qué puedes hacer

| Tu tarea esta semana | Bundle | Qué obtienes | Qué aportas |
|---|---|---|---|
| Convertir investigación en decisiones | [pm-discovery](plugins/pm-discovery/) | Guías de entrevista, síntesis con citas y frecuencia | Transcripciones o notas |
| Escribir el PRD y los informes | [pm-essentials](plugins/pm-essentials/) | PRD, actas, informes a stakeholders, análisis competitivo | Un brief y tus objetivos |
| Planificar el trimestre | [pm-planning](plugins/pm-planning/) | OKR, priorización RICE/MoSCoW/Kano, narrativa de roadmap | Backlog y objetivo de empresa |
| Entregar el sprint y el lanzamiento | [pm-delivery](plugins/pm-delivery/) | Planes de sprint, specs técnicas, tests A/B, checklists | Historias, capacidad, fechas |
| Leer los números | [pm-data](plugins/pm-data/) | Marcos de métricas, análisis de cohortes y churn | Tus métricas o un CSV |
| Tomar la decisión difícil | [pm-decisions](plugins/pm-decisions/) | Decisiones tipadas con probabilidades (ship-or-slip, renew-or-churn) | El estado real de la decisión |
| Leer antes de firmar | [pm-decoders](plugins/pm-decoders/) | Alquileres, facturas y contratos descifrados, con las cuentas | El documento en sí |
| Conseguir el próximo empleo | [pm-jobsearch](plugins/pm-jobsearch/) | Descifrar la oferta, outreach, preparación de entrevistas | La oferta y tu CV |

Los 153 bundles con sus comandos de instalación: [docs/catalogue.md](docs/catalogue.md) · todas las skills: [SKILLS.md](SKILLS.md)

## ✅ Confianza y calidad

- Cada cambio pasa por CI: estructura (SkillCheck L3, las 1311 skills), auditoría de seguridad, detección de duplicados, paridad de traducciones y una batería de inyección de prompts.
- 389 de las 1311 skills tienen casos de evaluación; 28 tienen puntuaciones a ciegas publicadas. Lo no medido se declara no medido.
- Las skills legales, fiscales y laborales terminan con un descargo claro e indican a qué profesional acudir; no sustituyen a uno.
- Privacidad: todo corre en local. Las skills, la CLI y los exports no envían nada. Detalles: [docs/TELEMETRY.md](docs/TELEMETRY.md) · [SECURITY.md](SECURITY.md) · licencia: [MIT](LICENSE)

## 🤝 Participa

Añade una skill por PR ([el estándar](SKILL-AUTHORING-STANDARD.md), [CONTRIBUTING](CONTRIBUTING.md)), [pide una](https://github.com/mohitagw15856/pm-claude-skills/issues/new?labels=skill-request&title=Skill:%20) y vótala en el [tech tree](https://mohitagw15856.github.io/pm-claude-skills/tech-tree/), o comparte un resultado en [Show and Tell](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=show-and-tell.yml).

Proyecto: https://github.com/mohitagw15856/pm-claude-skills
