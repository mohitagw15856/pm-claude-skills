---
# machine-translated to es from skills/cs-escalation-brief/SKILL.md — review: pending. Native fixes welcome via PR.
name: cs-escalation-brief
description: "Redacta un informe de escalada estructurado para una cuenta de cliente en riesgo. Úsalo cuando una cuenta haya escalado, cuando un cliente amenace con cancelar, cuando un problema de cliente P1 requiera atención ejecutiva, o cuando prepares un plan de retención interno. Produce un informe de escalada preciso con contexto de la cuenta, cronología, causa raíz, impacto empresarial y un plan de resolución claro."
---

# Skill de Informe de Escalada de Cliente

Produce un informe de escalada claro y conciso que proporcione a los stakeholders internos — VP de CS, CCO, liderazgo de producto, o el CEO — todo lo que necesitan para comprender la situación, tomar decisiones y actuar rápidamente.

Un buen informe de escalada no es una queja. Es un documento profesional que expone los hechos, asigna responsabilidad con honestidad y propone un plan de resolución específico.

## Inputs Requeridos

Solicita estos si no se proporcionan ya:
- **Nombre de la cuenta**, tier y ARR
- **Nombre del CSM** y propietario de la cuenta
- **Naturaleza de la escalada** — qué pasó, qué dice el cliente
- **Cronología** de eventos que llevaron a la escalada
- **Contacto del cliente** que escaló (nombre, rol, nivel de influencia)
- **Qué quiere el cliente** — su solicitud explícita
- **Cuál creemos que es la causa raíz**
- **Qué se ha hecho ya** para abordar la situación
- **Fecha de renovación** y evaluación actual del riesgo de renovación

## Niveles de Escalada

Calibra la urgencia y la audiencia según el nivel de escalada:

| Nivel | Desencadenante | Audiencia | Tiempo de respuesta |
|---|---|---|---|
| L1 — Riesgo de Cuenta | Cliente expresando insatisfacción; renovación en riesgo | CSM + CS Manager | 24 horas |
| L2 — Escalada Ejecutiva | Cliente escalado a su ejecutivo; solicitando implicación de ejecutivo del proveedor | VP CS + Account Exec | 4 horas |
| L3 — Riesgo de Churn | Cliente ha emitido aviso o está en conversación activa de churn | CCO / CEO + Revenue leadership | 1 hora |
| L4 — Riesgo Público | Cliente amenazando con escalada pública, legal o prensa | CCO / Legal / Comms | Inmediato |

## Formato de Output

---

# Informe de Escalada: [Nombre de Cuenta]

**Nivel de escalada:** L[1/2/3/4] — [Etiqueta]
**Fecha de escalada:** [Fecha]
**Escalada por:** [nombre del CSM]
**Propietario de escalada:** [Nombre del ejecutivo o stakeholder sénior que ahora lidera la respuesta]

---

## Cuenta de un Vistazo

| Campo | Detalle |
|---|---|
| ARR | £/$/€[X] |
| Tier | Enterprise / Mid-Market / SMB |
| Cliente desde | [Fecha] |
| Fecha de renovación | [Fecha] — [N] días |
| Riesgo de renovación (pre-escalada) | Green / Amber / Red |
| Riesgo de renovación (actual) | Green / Amber / Red |
| Contacto del cliente que escaló | [Nombre, rol, seniority] |
| Patrocinador ejecutivo (cliente) | [Nombre, rol — activo / pasivo / vacante] |
| Patrocinador ejecutivo (proveedor) | [Nombre, rol] |

---

## Qué Pasó — Resumen

[3–5 oraciones. Expón los hechos claramente. Qué experimentó el cliente, cómo reaccionó, y cómo nos enteramos de la escalada. Sin editorializaciones. Sin culpas.]

---

## Cronología

Lista en orden cronológico. Cada entrada: `[Fecha / hora] — [Qué pasó. Quién hizo qué.]`

Incluye:
- Cuándo ocurrió el problema original o evento desencadenante
- Cuándo el cliente planteó preocupaciones por primera vez (informalmente)
- Cuándo escaló (escalada formal o implicación ejecutiva)
- Acciones tomadas desde la escalada

---

## Causa Raíz

**Causa principal:** [Una oración clara. Qué específicamente salió mal.]

**Factores contribuyentes:**
- [Factor 1 — sé honesto sobre fallos internos tanto como externos]
- [Factor 2]

**¿Es esto un problema sistémico o aislado?**
[ ] Aislado a esta cuenta
[ ] Patrón visto en otras cuentas — detalles: [_______]
[ ] Brecha de producto o proceso que necesita arreglarse

---

## Posición Declarada del Cliente

**Qué dice el cliente que pasó:** [Su versión de los eventos — justa y sin filtro]

**Qué están pidiendo:** [Su solicitud explícita — compensación, corrección antes de fecha, llamada ejecutiva, crédito SLA, cláusula de salida]

**Sentimiento del contacto que escaló:** [Frustrado pero constructivo / Enojado / Buscando salida / Desconocido]

**Riesgo de escalada pública:** Low / Medium / High — [evidencia si Medium o High]

---

## Impacto Empresarial

| Tipo de impacto | Detalle |
|---|---|
| ARR en riesgo | £/$/€[X] |
| Probabilidad de churn potencial | [X]% |
| Riesgo reputacional | Low / Medium / High |
| Estado de referencia / case study | [Fue una referencia — ahora en riesgo / No es una referencia] |
| Pipeline de expansión en riesgo | £/$/€[X] |

---

## Qué Se Ha Hecho Hasta Ahora

1. [Acción tomada — por quién — fecha — resultado]
2. [Acción tomada — por quién — fecha — resultado]
3. [Acción tomada — por quién — fecha — resultado]

**¿Se ha emitido una disculpa formal o reconocimiento?** Sí / No

---

## Plan de Resolución Propuesto

**Acciones inmediatas (próximas 24–48 horas):**

| Acción | Responsable | Antes de |
|---|---|---|
| [Acción] | [Nombre] | [Fecha] |
| [Acción] | [Nombre] | [Fecha] |

**Acciones a mediano plazo (próximas 2–4 semanas):**

| Acción | Responsable | Antes de |
|---|---|---|
| [Acción] | [Nombre] | [Fecha] |

**Qué NO estamos ofreciendo:** [Sé explícito sobre qué no está sobre la mesa — evita expectativas desalineadas]

**Criterios de éxito:** [¿Cómo sabremos que la escalada está resuelta? ¿Qué necesita confirmar el cliente para estar satisfecho?]

---

## Decisión Requerida del Propietario de Escalada

[Declara claramente qué decisión o recurso necesita proporcionar el propietario de escalada. Sé específico — no hagas que pregunten. P. ej.: "Necesitamos aprobación para ofrecer un crédito de servicio del 20% para Q2" o "Necesitamos una llamada ejecutiva con [nombre] dentro de 48 horas."]

---

## Plan de Comunicación

| Audiencia | Mensaje | Canal | Responsable | Antes de |
|---|---|---|---|---|
| Contacto del cliente que escaló | [Resumen del mensaje] | Email / Call | [Nombre] | [Fecha] |
| Patrocinador ejecutivo del cliente | [Resumen] | Call | [Nombre] | [Fecha] |
| Equipo interno de CS | [Resumen] | Slack / Meeting | CS Manager | [Fecha] |

---

## Materiales Más Profundos

Este skill se envía con archivos de soporte — úsalos cuando estén disponibles:

- **`references/deescalation-sequencing.md`** — De-escalation Sequencing: the Order of Operations When an Account Is on Fire. Aplícalo mientras produces el output; contiene la calibración y las decisiones de juicio que el resumen del método anterior comprime.
- **`templates/escalation-brief.md`** — una versión rellenable del entregable con los quality gates inline. Ofrécela cuando el usuario quiera trabajar el documento ellos mismos en lugar de tenerlo generado.

## Rubric de Puntuación (0–40)

Puntúa cualquier output de este skill antes de entregarlo; 32+ es de calidad para enviar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Especificidad y honestidad de causa raíz** | Vaga ("breakdown de comunicación") o culpa a individuos | Causa específica nombrada, pero fallos internos se suavizan o se omite la pregunta sistémico-vs-aislado | Causa primaria específica, factores contribuyentes que reconocen fallos internos claramente, y una decisión explícita sistémico-vs-aislado |
| **Impacto empresarial cuantificado** | Sin cifra de ARR; riesgo de churn descrito en adjetivos | ARR establecido, pero probabilidad de churn, pipeline de expansión, o riesgo de referencia dejados en blanco | ARR en riesgo, probabilidad de churn, pipeline de expansión, y exposición de referencia/reputación todos cuantificados |
| **Representación justa del cliente** | Posición del cliente faltante, minimizada, o parafraseada a inofensividad | Su solicitud está establecida, pero su versión de eventos es filtrada o su sentimiento no evaluado | Relato de eventos, solicitud explícita, sentimiento, y riesgo de escalada pública del cliente establecidos justa y sin filtro |
| **Decisión-preparedness del plan** | Sin solicitud clara; informe termina con "¿qué piensas?"; propietarios TBD | Plan existe pero la decisión necesaria es implícita, o algunas acciones carecen de propietarios y fechas | Una decisión específica es solicitada del propietario de escalada; cada acción tiene propietario y fecha; qué NO estamos ofreciendo y criterios de éxito son explícitos |

## Quality Checks

- [ ] Causa raíz es específica — no "breakdown de comunicación" o "brecha de producto" sin detalle
- [ ] Posición del cliente está establecida justamente — no minimizada o desestimada
- [ ] Una decisión clara es solicitada del propietario de escalada — informe no termina con "¿qué piensas?"
- [ ] ARR en riesgo es cuantificado
- [ ] Plan de comunicación tiene propietarios y fechas — no "TBD"
- [ ] Lenguaje es profesional y sin culpa hacia individuos

## Anti-Patrones

- [ ] No asignes culpa a individuos — enfócate en fallos de sistema y brechas de proceso
- [ ] No minimices ARR en riesgo o describa riesgo de churn vagamente sin un número
- [ ] No dejes propiedad del plan de resolución como "TBD" o sin asignar
- [ ] No redactes el informe sin una solicitud clara del propietario de escalada
- [ ] No omitas la posición declarada del cliente — su perspectiva debe ser representada justamente

## Frases Desencadenantes Ejemplo

- "Esta cuenta está amenazando con cancelar."
- "Redacta un informe de escalada para este cliente."
- "Un problema P1 necesita atención ejecutiva."
- "Prepara un plan de retención interno."
