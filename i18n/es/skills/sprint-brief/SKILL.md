---
# machine-translated to es from skills/sprint-brief/SKILL.md — review: pending. Native fixes welcome via PR.
name: sprint-brief
description: "Genera un resumen de sprint estructurado a partir de datos y objetivos del sprint. Úsalo cuando te pidan escribir un resumen de sprint, crear un sumario de sprint, documentar objetivos y alcance del sprint, o producir una descripción de sprint dirigida al equipo. Produce un resumen escaneable con objetivo del sprint, justificación, trabajo agrupado, ruta crítica, riesgos y definición de terminado."
---

# Sprint Brief Skill

Produce un resumen de sprint claro y escaneable que cada miembro del equipo —ingeniero, diseñador, PM— pueda leer en menos de tres minutos y entienda exactamente qué estamos haciendo y por qué.

## Entradas Requeridas

Pídele al usuario lo siguiente si no lo proporciona:
- **Nombre y número del sprint**
- **Objetivo del sprint** (1-2 oraciones — marca si es demasiado vago)
- **Lista de tickets con responsables** (o una descripción del trabajo)
- **Dependencias o bloqueos conocidos**
- **Elementos trasladados del sprint anterior** (si los hay)

## Proceso
1. Lee el objetivo del sprint y verifica que sea específico y medible — marca si es demasiado vago
2. Agrupa los tickets por tema o área de funcionalidad
3. Identifica la ruta crítica — ¿cuáles tickets deben completarse para que se cumpla el objetivo del sprint?
4. Señala riesgos: tickets con criterios de aceptación poco claros, diseños faltantes, dependencias sin resolver
5. Anota elementos trasladados y si afectan el objetivo del sprint actual
6. **Valida** — Confirma que el objetivo del sprint es alcanzable dado el alcance de tickets y capacidad. Si solo los tickets de la ruta crítica llenarían el sprint, marca como sobrecargado.

## Estructura de Salida

### Resumen Sprint [Número] — [Fechas]
**Objetivo del Sprint:** [1-2 oraciones — específico y medible]
**Por Qué Este Sprint Importa:** [Conecta con el OKR trimestral en 2-3 oraciones]

**Lo Que Estamos Construyendo:**
- [Tema 1]: [tickets y responsables]
- [Tema 2]: [tickets y responsables]

**Ruta Crítica:** [Los 2-3 tickets de los que todo lo demás depende]

**Riesgos a Señalar:**
- [Riesgo 1 + mitigación]
- [Riesgo 2 + mitigación]

**Trasladado del Sprint Anterior:** [Lista + impacto en el objetivo actual]

**Definición de Terminado:** [Criterios específicos y acordados para el éxito del sprint]

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/goal-writing.md`** — Escribir objetivos de sprint que orienten. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/brief-one-pager.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Puntuabilidad del objetivo** | El objetivo es una lista de tareas o una dirección vaga ("avanzar en X"); nadie podría puntuarlo al final del sprint | El objetivo enuncia un resultado, pero la línea de aprobado/suspenso es difusa (sin número, fecha ni prueba observable) | El objetivo es una única frase de resultado con una prueba explícita de aprobado/suspenso que cualquiera del equipo podría aplicar el último día |
| **Precisión del camino crítico** | Sin camino crítico, o "los tickets importantes"; el lector no sabe qué retraso es fatal | Los tickets del camino crítico tienen nombre, pero sin secuencia ni la fecha o el desencadenante en que el objetivo fracasa | Tickets con nombre en orden de dependencia, con la fecha límite que mata el objetivo y una separación clara entre lo fatal y lo sobrevivible respecto al resto del tablero |
| **Accionabilidad de los riesgos** | Los riesgos son una lista de preocupaciones: sin mitigaciones ni responsables | Cada riesgo tiene mitigación *o* responsable, pero las respuestas son genéricas ("vigilar de cerca") | Cada riesgo tiene una mitigación concreta con fecha de preparación y un único responsable con nombre, e indica si amenaza el objetivo o solo un ticket |
| **Honestidad sobre la capacidad** | El arrastre se enumera sin impacto; el tablero está sobrecargado en silencio | Se indica el impacto del arrastre en el objetivo, pero el informe no actúa: la sobrecarga se marca como riesgo y se deja ahí | El arrastre se cuantifica contra la capacidad y el informe muestra la resolución: recortes de alcance con nombre, un objetivo reducido o una aceptación explícita de sobrecarga acordada por el equipo |

## Verificaciones de Calidad

- [ ] El objetivo del sprint es específico enough para calificar aprobado/desaprobado al final del sprint
- [ ] Los tickets de ruta crítica están nombrados — no solo "los importantes"
- [ ] Cada riesgo tiene una mitigación u owner (no solo "esto es un riesgo")
- [ ] Los elementos trasladados están conectados a su impacto en el objetivo del sprint actual
- [ ] La Definición de Terminado son criterios acordados, no una lista de tareas

## Anti-Patrones

- [ ] No escribas un objetivo de sprint como una lista de tareas — el objetivo debe ser una declaración única enfocada en resultados que pueda calificarse aprobado/desaprobado
- [ ] No dejes sin nombrar la ruta crítica — "los tickets importantes" no es una ruta crítica
- [ ] No listes riesgos sin una mitigación u owner — un riesgo sin respuesta es solo una lista de preocupaciones
- [ ] No ignores el impacto de los elementos trasladados en la capacidad y objetivo de este sprint
- [ ] No escribas una Definición de Terminado que mezcle completitud de tareas con criterios de resultado — deben ser observables y acordados antes de que inicie el sprint

## Frases de activación de ejemplo

- "Escribe un informe de sprint."
- "Crea un resumen del sprint."
- "Documenta los objetivos y el alcance del sprint."
- "Elabora una visión general del sprint para el equipo."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/sprint-brief.html
