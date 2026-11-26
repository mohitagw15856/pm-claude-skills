---
# machine-translated to es from skills/retro-analysis/SKILL.md — review: pending. Native fixes welcome via PR.
name: retro-analysis
description: "Analiza datos de entrega de sprint y produce un resumen estructurado de retrospectiva. Úsalo cuando se pida ejecutar una retrospectiva, analizar datos de sprint, preparar un resumen de retro o convertir métricas de sprint en puntos de discusión. Produce un resumen de retrospectiva fundamentado en datos con estadísticas de finalización, análisis de patrones, preguntas para Iniciar/Detener/Continuar, y un experimento concreto para el próximo sprint."
---

# Skill de Análisis de Retrospectiva

Genera un resumen de retrospectiva fundamentado en datos que separa hechos de percepciones, para que el equipo dedique el tiempo de retro a soluciones en lugar de debatir qué pasó.

## Inputs Requeridos

Pide al usuario estos datos si no se proporcionan:
- **Tickets del sprint: planificados vs. completados**
- **Tickets llevados al siguiente sprint y razones** (si se conocen)
- **Tickets reabiertos después de cerrar** (señal de calidad)
- **Cualquier incidente o trabajo no planificado** (señal de scope creep)
- **Velocidad del sprint vs. promedio histórico** (contexto de tendencia)

## Proceso
1. Calcula: tasa de finalización, tasa de carry-over, porcentaje de trabajo no planificado
2. Identifica patrones: ¿qué tipos de tickets tenían más probabilidad de ser llevados? ¿Cuáles causaron bloqueos?
3. Anota cualquier ruptura de procesos o comunicación visible en los datos
4. Prepara 3 preguntas "Iniciar / Detener / Continuar" basadas en los datos — no genéricas, específicas de este sprint
5. Sugiere 1 experimento concreto para el próximo sprint basado en el mayor punto de fricción
6. **Valida** — Confirma que cada pregunta es específica de este sprint (no una pregunta genérica reciclada), y que el experimento recomendado es concreto y medible

## Estructura del Output

### Resumen de Retrospectiva Sprint [Número]

**Por los Números:**
- Planificado: [n] tickets | Completado: [n] | Carry-over: [n] | Tasa de finalización: [%]
- Trabajo no planificado: [n] tickets ([%] de capacidad)
- Velocidad: [puntos] vs. [promedio] promedio

**Lo que Sugieren los Datos:**
[2-3 observaciones fundamentadas en los números anteriores]

**Preguntas para la Discusión:**
- Iniciar: [pregunta específica basada en datos de este sprint]
- Detener: [pregunta específica basada en datos de este sprint]
- Continuar: [pregunta específica basada en datos de este sprint]

**Experimento Sugerido para el Próximo Sprint:**
[Un cambio de proceso concreto y comprobable — con una métrica específica de éxito]

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/root-cause-vs-symptom.md`** — Retros que cambian cosas: causas raíz frente a síntomas. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/retro-board.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Anclaje en datos** | Faltan números o son erróneos; las observaciones son opiniones sin fuente rastreable | Las tasas básicas están bien calculadas, pero las observaciones solo repiten los números sin analizar patrones (tipos de ticket, comparación histórica) | Cada observación remite a una cifra calculada, el arrastre se desglosa por tipo/causa, y la velocidad se compara con la tendencia histórica, no solo con el promedio |
| **Ausencia de culpa** | El informe nombra o insinúa a personas o disciplinas como causa ("QA no los vio") | Redacción neutra, pero el encuadre sigue apuntando al esfuerzo o la diligencia en lugar de a condiciones sistémicas | Los modos de fallo se reformulan como patrones de proceso, cobertura o planificación que los datos realmente sustentan; un lector a la defensiva no encontraría nada dirigido contra él |
| **Especificidad de las preguntas** | Empezar/Dejar/Continuar son categorías genéricas recicladas ("comunicar mejor") | Las preguntas aluden a este sprint pero se quedan en el nivel de categoría: sin números, sin comportamiento concreto | Cada pregunta está soldada a los datos de este sprint, nombra un comportamiento concreto y se formula para abrir la conversación en lugar de dictar la respuesta |
| **Calidad del experimento** | Sin experimento, o una iniciativa de varios trimestres disfrazada de uno | Un cambio concreto, pero el éxito no se puede medir o no puede evaluarse en la siguiente retro | Un cambio de proceso comprobable en un solo sprint, con métricas de éxito explícitas y un coste declarado si sale mal, verificable en la siguiente retro |

## Verificaciones de Calidad

- [ ] Cada pregunta Iniciar/Detener/Continuar nombra un comportamiento específico, no una categoría vaga
- [ ] El experimento recomendado es comprobable en un sprint
- [ ] El análisis de carry-over identifica el tipo de ticket o causa, no solo el número
- [ ] Las observaciones de datos no asignan culpa — describen patrones
- [ ] La tendencia de velocidad se menciona en contexto (¿es esto un caso aislado o un patrón?)

## Anti-Patrones

- [ ] No asignes culpa a individuos en el resumen de retrospectiva — las observaciones deben describir patrones, no personas
- [ ] No produzcas preguntas Iniciar/Detener/Continuar que sean categorías vagas — cada una debe nombrar un comportamiento específico
- [ ] No recomiendes un experimento que no pueda completarse en un sprint — solo experimentos pequeños y comprobables
- [ ] No trates tickets de carry-over como un problema de velocidad sin antes identificar la categoría de causa raíz
- [ ] No ejecutes el mismo formato de retrospectiva cada sprint — varía el formato para prevenir fatiga de engagement

## Frases de activación de ejemplo

- "Dirige una retrospectiva."
- "Analiza los datos del sprint."
- "Prepara un informe de retro."
- "Convierte las métricas del sprint en preguntas para la conversación."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/retro-analysis.html
