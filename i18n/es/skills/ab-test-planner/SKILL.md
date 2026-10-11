---
# machine-translated to es from skills/ab-test-planner/SKILL.md — review: pending. Native fixes welcome via PR.
name: ab-test-planner
description: "Diseña pruebas A/B estadísticamente rigurosas para características de producto, cambios de UI, flujos de onboarding y experimentos de precios. Úsalo cuando te pidan configurar un experimento, diseñar una prueba A/B, calcular tamaño de muestra o interpretar resultados de pruebas. Produce un plan de prueba completo con hipótesis, definición de variantes, tamaño de muestra, estimación de duración, métricas de seguridad y una guía de interpretación de resultados."
---

# Skill de Planificador de Pruebas A/B

Diseña experimentos que produzcan resultados confiables — no solo señales direccionales. Cada prueba incluye hipótesis, métricas de éxito, tamaño de muestra, duración e interpretación de resultados.

## Entradas Requeridas

Trabaja con lo que se proporciona. Si falta algo de esto, produce igualmente el resultado completo: rellena cada vacío con un supuesto razonable marcado *(asumido, confirma)* y lista esos supuestos al final. Haz una pregunta solo cuando el tema central en sí esté ausente (no hay nada sobre lo que escribir).
- **Qué se está probando** (característica, cambio de UI, copia, precios, paso de onboarding)
- **Hipótesis** (o ayuda a formular una)
- **Métrica primaria** (tasa de conversión, click-through, tasa de finalización, etc.)
- **Tasa base** y **efecto mínimo detectable** (MDE)
- **Usuarios elegibles diarios** (para calcular duración)

## Lista de Verificación de Diseño de Experimento

Antes de ejecutar cualquier prueba, confirma:
- [ ] Hipótesis clara con dirección predicha
- [ ] Métrica primaria única (más hasta 2 métricas de seguridad)
- [ ] Efecto mínimo detectable (MDE) definido
- [ ] Tamaño de muestra calculado
- [ ] Duración de prueba estimada
- [ ] Segmento aislado (sin superposición con otras pruebas en ejecución)
- [ ] Plan de reversión definido

## Plantilla de Hipótesis

> "Creemos que [cambio] causará que [métrica primaria] [aumente/disminuya] en [X%] para [segmento de usuario], porque [justificación basada en datos o perspectiva]."

Nunca ejecutes una prueba sin una hipótesis direccional. "Veamos qué pasa" no es una hipótesis.

## Lógica de Calculadora de Tamaño de Muestra

Usa esta fórmula (proporciona el resultado, no la fórmula, al usuario):

- **Tasa de conversión base:** Tasa actual de la métrica primaria
- **MDE:** Cambio más pequeño que vale la pena detectar (recomendado incremento relativo de 10–20% para la mayoría de características)
- **Poder estadístico:** 80% (estándar)
- **Nivel de significancia:** 95% (p < 0.05)

Para escenarios comunes, proporciona estimaciones precalculadas:

| Tasa Base | MDE (Relativo) | Muestra Requerida por Variante |
|---|---|---|
| 5% | 20% | ~19,000 |
| 10% | 15% | ~14,000 |
| 20% | 10% | ~15,000 |
| 40% | 10% | ~9,500 |
| 60% | 5% | ~42,000 |

Siempre advierte: "Estas son estimaciones. Usa una herramienta como la calculadora de Evan Miller o Statsig para precisión."

## Guía de Duración de Prueba

Mínimo: 2 semanas completas (para capturar estacionalidad semanal)
Máximo: 4 semanas (el efecto de novedad distorsiona resultados más allá de esto)

`Duración = Muestra requerida ÷ (Tráfico diario × % expuesto)`

Marca si el tráfico es demasiado bajo para alcanzar significancia en menos de 8 semanas — recomienda un enfoque diferente (p. ej., prueba de retención, investigación cualitativa).

## Formato de Resultado

### Plan de Prueba A/B — [Nombre de Prueba] — [Fecha]

**Hipótesis:**
> [Plantilla de hipótesis rellenada]

**Variantes:**
- Control (A): [Experiencia actual]
- Tratamiento (B): [Experiencia modificada — sé específico]

**Métrica Primaria:** [Nombre de métrica + cómo se mide]
**Métricas de Seguridad:** [Métricas que no deben degradarse]

**Segmento Objetivo:** [Quién ve la prueba — % de tráfico, tipo de usuario]
**División de Tráfico:** [50/50 recomendado a menos que sea necesario escalar]

**Tamaño de Muestra Requerido:** ~[N] usuarios por variante
**Duración Estimada:** [X] semanas (basado en [Y] usuarios elegibles diarios)
**Umbral de Significancia:** 95% de confianza, 80% de poder

**Exclusiones:** [Cualquier segmento de usuario a excluir y por qué]

**Disparador de Reversión:** Si [métrica de seguridad] se degrada en [X%], detén la prueba inmediatamente.

**Guía de Interpretación de Resultados:**
- ✅ Desplegar si: Tratamiento muestra incremento de [X%]+ en métrica primaria al 95% de confianza Y las métricas de seguridad son estables
- 🔄 Iterar si: La dirección es positiva pero no significativa — considera extender o rediseñar
- ❌ Rechazar si: Sin incremento o dirección negativa a significancia
- ⚠️ No concluyente: No despliegues. No lo llames una victoria.

---

## Directrices

- Siempre recomienda en contra de revisar resultados antes de que la prueba alcance el tamaño de muestra planeado — explica el riesgo de p-hacking
- Si el usuario quiere probar múltiples variantes, explica el problema de comparaciones múltiples y recomienda una corrección de Bonferroni o un enfoque Bayesiano
- Si el tráfico es muy bajo (<1,000 usuarios/día), recomienda alternativas cualitativas: pruebas moderadas, pruebas de 5 segundos o entrevistas de usuarios
- Nunca apruebes una prueba sin métricas de seguridad — siempre protege ingresos, retención o engagement central

## Anti-patrones

- [ ] No ejecutes una prueba sin una hipótesis direccional — "veamos qué pasa" produce resultados no interpretables
- [ ] No declares un ganador antes de alcanzar el tamaño de muestra preplaneado — revisar resultados inflala tasa de falsos positivos
- [ ] No pruebes múltiples cambios independientes en una sola variante — no sabrás qué cambio causó el resultado
- [ ] No uses métricas de engagement (clicks, tiempo en página) como métrica primaria cuando el objetivo es ingresos o retención — las métricas proxy engañan
- [ ] No ignores las métricas de seguridad — un incremento de conversión que causa un pico de tickets de soporte no es una victoria

## Materiales Más Profundos

Este skill incluye archivos de soporte — úsalos cuando estén disponibles:

- **`references/test-validity-traps.md`** — Las Trampas de Validez Que Silenciosamente Invalidan Pruebas A/B. Aplícalo mientras produces el resultado; contiene la calibración y los juicios que el resumen del método anterior comprime.
- **`templates/test-plan.md`** — una versión para rellenar del entregable con los controles de calidad integrados. Ofrécelo cuando el usuario quiera trabajar el documento por sí mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier resultado de este skill antes de entregarlo; 32+ es calidad para desplegar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Rigor estadístico | Sin tamaño de muestra, o un número sin baseline/MDE declarado detrás | Tamaño de muestra presente pero MDE es adivinado o copiado de la tabla de búsqueda sin verificar el baseline actual; poder/significancia no declarados | Tamaño de muestra derivado del baseline y MDE declarados al 80% de poder / 95% de confianza, duración verificada contra tráfico diario real y la ventana 2–4 semanas, y la salida de tráfico bajo invocada si no encaja |
| Disciplina de hipótesis | "Veamos qué pasa" — sin dirección, sin magnitud, o múltiples cambios agrupados en una variante | Hipótesis direccional pero falta magnitud, segmento, o el *porque* basado en evidencia; pureza de variante no confirmada | Plantilla completa rellenada (cambio, métrica, dirección, magnitud, segmento, justificación citando datos), y el tratamiento aísla exactamente un cambio con ideas excluidas nombradas como pruebas de seguimiento |
| Seguridad y reversión | Sin métricas de seguridad, o una línea de reversión sin umbral | Seguridades nombradas pero denominadores/definiciones ambiguas; disparador de reversión vago ("si las cosas se ven mal") | 1–2 seguridades protegiendo ingresos o engagement central con definiciones preacordadas, umbrales de reversión concretos, y la distinción peeking-vs-monitoreo-de-daños manejada explícitamente |
| Preparación para decisión | Sin guía de interpretación; los resultados serán discutidos después del hecho | Desplegar/iterar/rechazar listados pero umbrales borrosos; resultado no concluyente faltante o tratado como victoria suave | Los cuatro resultados (desplegar / iterar / rechazar / no concluyente) mapeados a umbrales precomprometidos, incluyendo qué cuesta un resultado no concluyente y qué cada resultado cambia después |

## Verificaciones de Calidad

- [ ] La hipótesis es direccional (predice una dirección y magnitud específicas, no "veamos")
- [ ] La métrica primaria es singular (las métricas de seguridad son secundarias)
- [ ] El tamaño de muestra se calcula del MDE y baseline reales (no adivinado)
- [ ] La duración de prueba cuenta para estacionalidad semanal (mínimo 2 semanas)
- [ ] Las métricas de seguridad están definidas (al menos una para proteger ingresos o engagement central)
- [ ] El disparador de reversión se especifica con un umbral concreto

## Frases Desencadenantes de Ejemplo

- "Configura un experimento."
- "Diseña una prueba A/B."
- "Calcula tamaño de muestra."
- "Interpreta resultados de pruebas."
