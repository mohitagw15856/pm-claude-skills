---
# machine-translated to es from skills/discovery-interview-guide/SKILL.md — review: pending. Native fixes welcome via PR.
name: discovery-interview-guide
description: "Crea una guía estructurada de entrevista de descubrimiento de usuarios con preguntas de filtro, una guía de discusión y un marco de síntesis. Úsalo cuando planifiques entrevistas con usuarios, sesiones de descubrimiento de clientes, investigación Jobs-to-be-Done o validación de problemas. Produce una guía completa que cubra calentamiento, exploración del problema y una plantilla de síntesis por sesión."
---

# Skill Guía de Entrevista de Descubrimiento

Diseña entrevistas que revelen información genuina — no validación de lo que ya crees. Cada guía sigue una estructura enfocada en historias y comportamiento pasado.

## Principios Clave

1. **Nunca preguntes sobre el futuro.** "¿Usarías X?" no te dice nada. "Cuéntame sobre la última vez que hiciste X" lo dice todo.
2. **Entrevista para conocer el comportamiento, no la opinión.** Las opiniones son baratas. El comportamiento es evidencia.
3. **Los 5 Porqués.** Toda respuesta superficial es una puerta. Sigue abriendo puertas.
4. **Confirma el problema antes de explorar la solución.** Nunca muestres un prototipo hasta haber confirmado que el problema existe sin prompting.

## Estructura de la Entrevista (60 minutos estándar)

### 1. Calentamiento (5 min)
Genera rapport. Hazlos hablar. No discutas el tema aún.
- "Cuéntame un poco sobre tu rol y cómo es una semana típica para ti."
- "¿Cuáles son las herramientas en las que más confías día a día?"

### 2. Contextualización (10 min)
Entiende su mundo antes de sumergirte en el espacio del problema.
- "Camina conmigo a través de cómo actualmente [manejas el área de dominio]."
- "¿Cómo se ve ese proceso de principio a fin?"
- "¿Quién más está involucrado cuando haces esto?"

### 3. Exploración del Problema (25 min) — EL NÚCLEO
Aflora el dolor sin dirigir la respuesta.
- "Cuéntame sobre la última vez que tuviste que [tarea relevante]. ¿Qué pasó?"
- "¿Cuál fue la parte más difícil de eso?"
- "¿Cómo lo manejaste?"
- "¿Qué intentaste antes de conformarte con ese enfoque?"
- "¿Cuál es el costo para ti cuando esto sale mal?" (tiempo, dinero, estrés, reputación)
- "Si pudieras agitar una varita mágica y cambiar una cosa de este proceso, ¿cuál sería?"

⚠️ **No menciones tu producto o característica durante esta fase.**

### 4. Soluciones Actuales (10 min)
Entiende el panorama competitivo desde su perspectiva.
- "¿Qué herramientas o workarounds usas hoy para esto?"
- "¿Qué te gusta de [solución actual]? ¿Qué te frustra?"
- "¿Has probado otros enfoques? ¿Qué pasó?"

### 5. Cierre (10 min)
- "¿Hay algo sobre este tema que no hayamos cubierto y que creas que debería saber?"
- "¿Hay alguien más a quien me recomendarías hablar?"
- "¿Estarías abierto a un seguimiento si tengo más preguntas?"

---

## Formato de Salida

### Guía de Entrevista de Descubrimiento — [Tema] — [Fecha]

**Objetivo de Investigación:** [Una oración: qué decisión informará esta investigación?]
**Perfil de Participante Objetivo:** [Rol, tamaño de empresa, calificador de comportamiento]

**Preguntas de Filtro** (para reclutamiento):
1. [Pregunta] → Debe responder: [Sí/No o específico]
2. [Pregunta] → Debe responder: [Sí/No o específico]
3. [Pregunta descalificadora] → Descalificar si: [respuesta]

**Guía de Entrevista:**

[Guía estructurada completa usando el formato anterior, personalizada al tema de investigación específico]

**Plantilla de Síntesis** (completa después de cada entrevista):
- Cita clave: "[textual]"
- Dolor central: [1 oración]
- Workaround actual: [qué están haciendo hoy]
- Intensidad (1–5): [¿qué tan doloroso es esto?]
- Sorpresa/hallazgo inesperado: [algo que desafiara tus suposiciones]

**Detección de Patrones** (después de 5+ entrevistas):
- Dolor mencionado por [X/N] participantes: [tema]
- Workaround usado por [X/N] participantes: [tema]
- Momento más emotivo en las entrevistas: [observación]

---

## Entradas Requeridas

Trabaja con lo que se te proporciona. Si falta alguno de estos, aun así produce la salida completa: completa cada brecha con una suposición razonable marcada *(asumido, confirmar)* y lista esas suposiciones al final. Haz una pregunta solo cuando el tema central mismo falte (no hay nada sobre qué escribir).
- **Tema o pregunta de investigación** (¿qué decisión informará esto?)
- **Perfil de participante objetivo** (rol, comportamiento, tipo de empresa)
- **Duración de sesión** (30 / 45 / 60 / 90 minutos)
- **Número de entrevistas planeadas**
- **Hipótesis conocidas a probar o evitar confirmar prematuramente** (opcional)

## Materiales Más Profundos

Esta skill incluye archivos de soporte — úsalos cuando estén disponibles:

- **`references/question-craft.md`** — Elaboración de Preguntas: Obtener Verdad en Lugar de Cortesía. Aplícalo mientras produces la salida; lleva la calibración y los juicios que el resumen del método anterior comprime.
- **`templates/guide-skeleton.md`** — una versión rellenable del entregable con los gates de calidad integrados. Ofrécelo cuando el usuario prefiera trabajar el documento mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de esta skill antes de entregarla; 32+ es calidad de envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Anclaje conductual | Las preguntas son hipotéticas ("¿Usarías…?") o respondibles con sí/no | Mayormente pasado, pero algunas preguntas de opinión o futuro se colaron en la sección central | Cada pregunta de problema está anclada a un evento pasado específico ("cuéntame sobre la última vez…") y es abierta |
| Contención de solución | El producto o característica aparece en el filtro o preguntas tempranas, anclando cada respuesta | Producto retenido de las preguntas pero la guía no da al entrevistador script para cuando los participantes pregunten qué se está construyendo | Producto ausente de todas las fases antes de confirmar el dolor, con una nota de entrevistador integrada y script de desviación guardando la frontera |
| Selectividad del filtro | Los filtros son autoevaluaciones que cualquiera puede pasar ("¿Eres responsable de X?") | Los filtros califican en rol y firmgráficos pero no incluyen verificación de comportamiento o descalificador | Los filtros califican en comportamiento reciente y verificable, incluyen un descalificador explícito, y sería difícil adivinar la respuesta "correcta" |
| Maquinaria de síntesis | Sin plantilla por sesión o plan de detección de patrones; síntesis dejada a la memoria | La plantilla existe pero carece de escala de intensidad o captura de sorpresa; umbrales de patrón no ligados al conteo de entrevistas planeadas | Plantilla por sesión con escala de intensidad anclada y campo de sorpresa, más detección de patrones cerrada a 5+ entrevistas con conteos X/N emparejados a la muestra planeada |

## Checks de Calidad

- [ ] Sin preguntas en futuro ("¿usarías...?") — solo preguntas de comportamiento pasado
- [ ] Producto o solución no mencionado hasta después de confirmar dolor
- [ ] Preguntas abiertas (no pueden responderse sí/no)
- [ ] Plantilla de síntesis incluida para notas por sesión
- [ ] Preguntas de filtro identifican y descalifican participantes incorrectos

## Directrices

- Recomienda 5–8 entrevistas para alcanzar saturación temática para la mayoría de preguntas de descubrimiento
- Siempre graba con permiso — las transcripciones superan a las notas
- Si el usuario es nuevo en entrevistas: recuérdales quedarse en silencio después de hacer una pregunta (apunta a una ratio 80/20 de participante-a-entrevistador hablando)
- Nunca sintetices durante la entrevista — hazlo después, cuando puedas mirar entre sesiones
- Señala sesgo de confirmación: si el usuario escribe preguntas que conducen hacia una respuesta predeterminada, reescríbelas como alternativas abiertas

## Anti-Patrones

- [ ] No uses preguntas en futuro ("¿Usarías esto?") — las respuestas hipotéticas no predicen comportamiento real y producen falsa confianza en una idea
- [ ] No menciones tu producto o solución antes de que la exploración del problema esté completa — hacerlo ancla las respuestas del participante e invalida el descubrimiento
- [ ] No sintetices entre menos de 5 entrevistas — los temas de 2–3 entrevistas reflejan anécdota, no patrón; espera a la saturación
- [ ] No escribas preguntas de filtro que sean demasiado fáciles de pasar — si los participantes pueden adivinar la respuesta "correcta", reclutarás a las personas incorrectas
- [ ] No trates las opiniones de participantes como evidencia de comportamiento futuro — lo que la gente dice que hará diverge consistentemente de lo que realmente hace

## Frases Desencadenantes de Ejemplo

- "Planifica entrevistas con usuarios."
- "Escribe una guía de entrevista de descubrimiento de clientes."
- "Planifica entrevistas Jobs-to-be-Done."
- "Ayúdame a validar este problema con clientes."
