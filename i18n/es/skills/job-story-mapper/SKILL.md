---
# machine-translated to es from skills/job-story-mapper/SKILL.md — review: pending. Native fixes welcome via PR.
name: job-story-mapper
description: "Escribir historias de trabajos basadas en Jobs-to-be-Done (JTBD) y mapear empleos de clientes en dimensiones funcionales, sociales y emocionales. Úsalo cuando estés definiendo necesidades de usuario, escribiendo historias de trabajos, realizando investigación JTBD o reenmarcando características alrededor de resultados de clientes. Produce un mapa de historias de trabajos con puntuación de oportunidades, clasificaciones de intensidad de dolor y análisis de oportunidades de producto."
---

# Skill Job Story Mapper

Deja de escribir características. Empieza a entender los trabajos. Esta skill traduce requisitos de producto y entrevistas de usuario en historias de trabajos precisas que mantienen al equipo enfocado en resultados — no en productos.

## Fundamentos de Jobs-to-be-Done

Un "trabajo" es el progreso que un cliente está tratando de lograr en una situación dada. Las personas no compran productos — los contratan para hacer un trabajo.

Tres dimensiones de cada trabajo:
- **Trabajo funcional:** La tarea práctica ("ir de A a B")
- **Trabajo emocional:** Cómo quieren sentirse ("sentirme seguro de que tomé la decisión correcta")
- **Trabajo social:** Cómo quieren ser percibidos ("verme como un profesional competente para mi equipo")

Los grandes productos abordan las tres. La mayoría de roadmaps solo abordan la funcional.

---

## Formato de Historia de Trabajo

**Plantilla:**
> Cuando [situación/disparador], quiero [motivación/objetivo], para poder [resultado esperado].

**No es una user story:**
Las user stories se enfocan en roles y características: "Como [rol] quiero [característica] para que [beneficio]."
Las historias de trabajos se enfocan en situaciones y motivaciones: "Cuando [estoy en esta situación específica] quiero [esta capacidad] para poder [lograr este resultado]."

**La situación es la parte más importante.** "Cuando estoy en medio de un sprint y mi PM me pide una actualización" es un disparador mucho más rico que "Como desarrollador."

---

## Proceso de Mapeo

### Paso 1: Identificar el trabajo principal
Una oración: ¿Cuál es el trabajo principal por el que se contrata tu producto?
> "Ayudar a [tipo de usuario] a [lograr resultado] cuando [contexto]."

### Paso 2: Dividir en pasos de trabajo
¿Cuáles son todas las subtareas dentro del trabajo principal?
(Usa un mapa de trabajos: Definir → Ubicar → Preparar → Confirmar → Ejecutar → Monitorear → Modificar → Concluir)

### Paso 3: Identificar puntos de dolor por paso
¿Dónde falla el trabajo hoy? ¿Dónde usan clientes soluciones alternativas?

### Paso 4: Escribir historias de trabajos para cada punto de dolor
Una historia de trabajo por cada par situación-motivación distinto.

### Paso 5: Mapear a oportunidades de producto
¿Cuáles historias de trabajos están desatendidas? ¿Cuáles tienen soluciones existentes? ¿Dónde está tu diferenciación?

---

## Formato de Salida

### Mapa de Historias de Trabajo — [Área de Producto/Característica] — [Fecha]

**Declaración de Trabajo Principal:**
> Cuando [contexto], [tipo de usuario] quiere [resultado del trabajo principal], para poder [objetivo final].

---

**Mapa de Trabajos:**

| Paso | Sub-Trabajo | Solución Actual | Puntos de Dolor | ¿Desatendido? |
|---|---|---|---|---|
| Definir | [Qué hace el usuario] | [Herramienta/método usado] | [Frustración] | A/M/B |
| Ubicar | | | | |
| Preparar | | | | |
| Confirmar | | | | |
| Ejecutar | | | | |
| Monitorear | | | | |
| Modificar | | | | |
| Concluir | | | | |

---

**Historias de Trabajos (priorizadas por desatención):**

**Historia de Trabajo 1 — [Etiqueta de situación]**
> Cuando [situación específica], quiero [motivación], para poder [resultado].

Dimensión funcional: [Qué necesitan lograr]
Dimensión emocional: [Cómo quieren sentirse]
Dimensión social: [Cómo quieren ser percibidos]

Solución alternativa actual: [Qué hacen hoy]
Intensidad del dolor: [Alta / Media / Baja]
Frecuencia: [Con qué frecuencia ocurre esta situación]
Oportunidad de producto: [Qué podríamos construir para abordar esto]

---

Repetir para cada historia de trabajo principal.

**Puntuación de Oportunidades:**
Califica cada historia de trabajo en:
- Importancia para el cliente (1–10)
- Satisfacción con la solución actual (1–10)
- Puntuación de oportunidad = Importancia + máx(Importancia – Satisfacción, 0)
- Prioriza: Puntuación de oportunidad > 10

---

## Materiales Más Profundos

Esta skill incluye archivos de apoyo — úsalos cuando estén disponibles:

- **`references/situation-mining.md`** — Situation Mining — el "Cuando" es Todo el Método. Aplícalo mientras produces la salida; lleva la calibración y llamadas de juicio que el resumen del método anterior comprime.
- **`templates/job-story-canvas.md`** — una versión para rellenar del entregable con los quality gates integrados. Ofrécela cuando el usuario quiera trabajar el documento él mismo en lugar de que sea generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de esta skill antes de entregarla; 32+ es calidad lista para producción.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Especificidad de la situación | Las cláusulas "Cuando" son roles o deseos genéricos ("como usuario que quiere gestionar trabajo") | Las situaciones nombran una tarea pero no un momento — sin disparador, tiempo o contexto emocional | Cada situación es un momento concreto y reconocible ("un inquilino me envía un texto a las 11pm") que hace la motivación evidente |
| Completitud dimensional | Solo el trabajo funcional mapeado; campos emocionales y sociales vacíos o ausentes | Los tres campos rellenos, pero entradas emocionales/sociales solo restatan el trabajo funcional en palabras de sentimiento | Las dimensiones funcional, emocional y social cada una lleva contenido distinto, y al menos una dimensión no funcional forma el análisis de oportunidades |
| Fundamentación de soluciones alternativas | No se identifican soluciones alternativas actuales; los trabajos flotan libres de lo que los clientes hacen hoy | Soluciones alternativas nombradas pero tratadas como triviales — nada inferido de ellas | Cada historia de alto potencial nombra su solución alternativa y la lee como evidencia de lo que vale el trabajo (tiempo invertido, dinero pagado, retraso tolerado) |
| Disciplina de puntuación y priorización | Sin puntuaciones de oportunidad, o puntuaciones inventadas sin los inputs de Importancia/Satisfacción | Puntuaciones calculadas correctamente pero tratadas como el orden de construcción — sin verificación de viabilidad o ajuste estratégico | La aritmética se muestra y es consistente, las puntuaciones borderline no se redondean hacia arriba, y las puntuaciones altas que el roadmap no puede servir se marcan como preguntas de estrategia en lugar de ponerse en cola |

## Quality Checks

- [ ] Las historias de trabajos usan el formato "Cuando / Quiero / Para poder" (no formato de user story)
- [ ] La situación es específica (no "como usuario" — un momento o disparador real)
- [ ] Las tres dimensiones cubiertas: funcional, emocional, social
- [ ] Puntuación de oportunidad calculada para cada historia de trabajo
- [ ] Solución alternativa identificada para cada historia de alto potencial
- [ ] La oportunidad de producto es distinta de "construir la característica" (es un resultado)

## Inputs Requeridos

Trabaja con lo que se da. Si alguno de estos falta, aún produce la salida completa: rellena cada brecha con una suposición razonable marcada como *(asumido, confirma)* y lista esas suposiciones al final. Haz una pregunta primero solo cuando el sujeto principal en sí está faltando (no hay nada de qué escribir).
- **Área de producto o característica** a mapear (ej. onboarding, checkout, dashboard)
- **Tipo de usuario o persona** (¿para quién estamos mapeando trabajos?)
- **Material de origen** (notas de entrevista de usuario, tickets de soporte, hallazgos de discovery, o describe de memoria)
- **Alcance** (mapa de trabajos de producto completo vs. área de una característica individual)

## Anti-Patrones

- [ ] No escribas historias de trabajos que describan una característica en lugar de un par situación-motivación
- [ ] No saltes las dimensiones social y emocional — mapear solo trabajos funcionales se pierde las oportunidades de diferenciación más defensibles
- [ ] No definas situaciones demasiado ampliamente ("como usuario que quiere gestionar su trabajo") — la situación debe ser un momento o disparador específico
- [ ] No confundas puntuación de oportunidades con prioridad — una puntuación de oportunidad alta aún requiere evaluación de viabilidad y ajuste estratégico
- [ ] No produzcas un mapa de trabajos sin identificar soluciones alternativas actuales — la solución alternativa revela lo que el trabajo vale para el cliente

## Directrices

- Nunca escribas una historia de trabajo para una característica — escríbela para la situación que hace la característica valiosa
- Si no puedes identificar la situación, aún no entiendes el trabajo — vuelve a la investigación de usuarios
- Los trabajos social y emocional son más difíciles de hacer emerger pero a menudo los diferenciadores más defensibles
- Recomienda compartir historias de trabajos con ingeniería — toman mejores decisiones técnicas cuando entienden el "por qué"

## Frases de Disparador Ejemplos

- "Definir necesidades de usuario."
- "Escribir historias de trabajos."
- "Mapear los empleos del cliente para esta característica."
- "Reenmarcar estas características alrededor de resultados de clientes."
