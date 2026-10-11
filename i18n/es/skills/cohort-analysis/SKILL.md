---
# machine-translated to es from skills/cohort-analysis/SKILL.md — review: pending. Native fixes welcome via PR.
name: cohort-analysis
description: "Estructura un análisis de cohortes para retención, LTV o patrones de comportamiento. Úsalo cuando se te pida ejecutar un análisis de cohortes, analizar retención por cohorte, segmentar usuarios por comportamiento en el tiempo, o calcular valor de vida útil por período de adquisición. Produce un marco completo de análisis de cohortes con metodología, definiciones de cohortes, curvas de retención e intervenciones priorizadas."
---

# Skill de Análisis de Cohortes

Produce un análisis de cohortes estructurado que cubre curvas de retención, estimación de LTV, segmentación comportamental, indicadores principales de churn y intervenciones priorizadas. El resultado está listo para presentar a liderazgo de producto o compartir con equipos de growth y datos.

---

## Entradas Requeridas

**Solicita cualquiera de estas que falte antes de empezar. No inventes números, benchmarks ni detalles de esquema.**

| Entrada | Qué preguntar si falta |
|---|---|
| **Objetivo del análisis** | Mejora de retención / modelado de LTV / segmentación comportamental / predicción de churn — elige un objetivo principal |
| **Producto o feature** | ¿Qué se está analizando? |
| **Definición de cohorte** | ¿Qué agrupa a los usuarios en una cohorte? (mes de adquisición, canal de registro, tier de plan, fecha de adopción de feature) |
| **Ventana de observación** | ¿Cuántos períodos seguir? (p. ej. 12 meses, 8 semanas) |
| **Métrica clave** | ¿Qué se mide por cohorte? (tasa de retención, ingresos, puntuación de engagement, uso de features) |
| **Datos disponibles** | Pega esquema, nombres de tablas, o describe qué métricas existen — no asumas |
| **Baseline o meta** | ¿Hay benchmarks de retención existentes o metas para comparar? |

Si el usuario no puede suministrar datos reales, produce el marco con placeholders claramente marcados (`[X%]`, `[£X]`, `[N usuarios]`) y nota qué secciones requieren datos reales para completarse.

---

## Proceso

Sigue estos pasos en orden:

1. **Confirma entradas** — surfacea cualquier ambigüedad antes de producir output (p. ej. definiciones de cohorte conflictivas, ventana de observación faltante).
2. **Define cohortes** — establece evento de entrada, criterios de salida y exclusiones para que las cohortes sean mutuamente excluyentes.
3. **Construye tabla de retención** — completa o templatea la matriz período a período; identifica el período de meseta.
4. **Proyecta LTV** — usa solo datos de retención observados; marca si los datos son insuficientes.
5. **Segmenta por comportamiento** — crea segmentos comportamentales mutuamente excluyentes; identifica el threshold de activación.
6. **Surface indicadores principales de churn** — lista señales observables con tiempo de anticipación y mapeo de intervención.
7. **Compara cohortes en el tiempo** — evalúa si los cambios de producto se muestran en cohortes más nuevas.
8. **Prioriza recomendaciones** — vincula cada recomendación a un hallazgo de cohorte o segmento específico.
9. **Proporciona referencia SQL** — adapta la query template al esquema real del usuario si se suministra.
10. **Ejecuta quality checks** — verifica todos los ítems del checklist antes de entregar output.

---

## Output Template

Produce las siguientes secciones en orden. Omite una sección solo si explícitamente está fuera de alcance; nota la omisión.

---

# Análisis de Cohortes: [Producto / Feature]

**Objetivo del análisis:** [Retención / LTV / Segmentación comportamental / Predicción de churn]
**Definición de cohorte:** [p. ej. Mes de adquisición — usuarios agrupados por mes de calendario de primer registro]
**Ventana de observación:** [X meses / semanas]
**Métrica primaria:** [Nombre de métrica y definición]
**Fuente de datos:** [Tablas o métricas usadas — no inventes si no se suministraron]
**Fecha preparada:** [Fecha]

---

## 1. Definiciones de Cohortes

| Cohorte | Período | Tamaño | Descripción |
|---|---|---|---|
| [Cohorte 1] | [Ene 2025] | [N usuarios] | [p. ej. Usuarios que se registraron en ene 2025 vía búsqueda orgánica] |
| [Cohorte 2] | [Feb 2025] | [N usuarios] | [Descripción] |

**Lógica de cohortes:**
- **Evento de entrada:** [p. ej. Primer registro / Primera compra / Activación de feature]
- **Definición de salida / churn:** [p. ej. Sin actividad que coincida con evento de retención clave durante 30 días]
- **Exclusiones:** [p. ej. Cuentas internas de prueba, usuarios de trial con < 3 días de datos, cohortes con < [N] usuarios — ver anti-patterns]

> **Nota:** Si alguna cohorte cae por debajo del threshold de tamaño mínimo para confiabilidad estadística, marca explícitamente y exclúyela de conclusiones de tendencias.

---

## 2. Curva de Retención

**Cómo leer:** Cada celda muestra el porcentaje de la cohorte que realizó el evento de retención clave en período N. Período 0 = 100% por definición.

| Cohorte | P0 | P1 | P2 | P3 | P6 | P12 |
|---|---|---|---|---|---|---|
| [Ene 2025] | 100% | [X%] | [X%] | [X%] | [X%] | [X%] |
| [Feb 2025] | 100% | [X%] | [X%] | [X%] | [X%] | [X%] |
| [Tendencia vs cohorte anterior] | — | [↑/↓ X pp] | [↑/↓ X pp] | [↑/↓ X pp] | [↑/↓ X pp] | [↑/↓ X pp] |

**Meseta de retención:** [¿En qué período se aplana la curva? ¿En qué % se aplana? Si la ventana de observación es demasiado corta para mostrar una meseta, decláralo explícitamente.]

**Observaciones clave:**
- [p. ej. La caída más grande de período único es P1 → P2, promediando X pp — este es el momento de churn principal a abordar]
- [p. ej. Las cohortes adquiridas vía [canal] muestran X pp mayor retención en P6 vs el promedio general]
- [p. ej. La retención en P3 ha pasado de X% (cohorte más antigua) a Y% (cohorte más nueva) — un cambio de Z pp]

**Gráfico de retención** — renderiza una línea por cohorte, período en eje x:

```chart
{
  "type": "line",
  "title": "Retención por cohorte (%)",
  "labels": ["P0", "P1", "P2", "P3", "P6", "P12"],
  "series": [
    { "name": "[Cohorte 1]", "data": [100, "[X]", "[X]", "[X]", "[X]", "[X]"] },
    { "name": "[Cohorte 2]", "data": [100, "[X]", "[X]", "[X]", "[X]", "[X]"] }
  ]
}
```

---

## 3. Proyección de LTV

> Omite esta sección si los datos de ingresos no están disponibles. No estimes ARPU sin una fuente de datos — nota la brecha y solicítala.

**ARPU por período:** [Moneda y cantidad por usuario activo por período — sourced from: X]
**Curva de retención usada:** [Qué cohorte o promedio combinado, y por qué]

| Período | Retenido % | Ingresos por usuario retenido | LTV Acumulativo |
|---|---|---|---|
| Mes 1 | [X%] | [£X] | [£X] |
| Mes 3 | [X%] | [£X] | [£X] |
| Mes 6 | [X%] | [£X] | [£X] |
| Mes 12 | [X%] | [£X] | [£X] |

**LTV combinado en 12M:** [£X — especifica qué cohortes y método de ponderación]

**LTV por segmento:**

| Segmento | LTV (12M) | vs baseline combinado | Driver clave de diferencia |
|---|---|---|---|
| [Orgánico] | [£X] | [+X%] | [p. ej. Retención en P6 más alta] |
| [Pago] | [£X] | [-X%] | [p. ej. Tasa de activación más baja] |
| [Enterprise] | [£X] | [+X%] | [p. ej. ARPU más alto por período] |

---

## 4. Segmentación Comportamental

Los segmentos se definen por lo que hicieron los usuarios, no cuándo llegaron. Los segmentos deben ser mutuamente excluyentes y colectivamente exhaustivos dentro de la población analizada.

| Segmento | Definición | % de cohorte | Retención (P6) | LTV (12M) |
|---|---|---|---|---|
| **Power users** | [p. ej. Completó acción principal ≥ 3×/semana en primeros 30 días] | [X%] | [X%] | [£X] |
| **Casual users** | [p. ej. Completó acción principal 1–2×/semana en primeros 30 días] | [X%] | [X%] | [£X] |
| **Dormant** | [p. ej. Inició sesión pero nunca completó acción principal] | [X%] | [X%] | [£X] |
| **Never activated** | [p. ej. Se registró pero nunca completó paso 1 de onboarding] | [X%] | [X%] | [£X] |

**Threshold de activación (el "aha moment"):** [¿Qué acción específica, realizada dentro de los primeros X días, predice mejor retención a largo plazo? Sourcea esto de los datos — no asumas una respuesta genérica.]

---

## 5. Indicadores Principales de Churn

Señales que aparecen **antes** de que los usuarios hagan churn, habilitando intervención pre-emptiva. Todas las señales listadas deben ser observables en datos de producción — marca cualquiera que sea teórica solamente.

| Señal | Tiempo de anticipación antes de churn | Fortaleza de correlación | Intervención recomendada |
|---|---|---|---|
| [p. ej. Sin login durante 7 días consecutivos] | [7 días] | [Fuerte / Moderada / Débil] | [p. ej. Email de re-engagement automático en día 7] |
| [p. ej. Ticket de soporte con escalada sin resolver] | [~14 días] | [Moderada] | [p. ej. Outreach de CSM dentro de 48 horas de escalada] |
| [p. ej. Uso de feature principal bajó >50% semana-a-semana] | [~10 días] | [Fuerte] | [p. ej. Prompt in-app vinculando a tutorial de caso de uso] |

> **Requerimiento de datos:** La fortaleza de correlación debe venir de datos observados. Si no está disponible, marca como [Hipótesis — no validada aún] y recomienda un A/B test o análisis de supervivencia para confirmar.

---

## 6. Comparación de Cohortes: Tendencia en el Tiempo

Evalúa si los cambios de producto son visibles en resultados de retención para cohortes más nuevas.

| Métrica | [Cohorte más antigua] | [Cohorte más nueva] | Cambio | Notas |
|---|---|---|---|---|
| Retención P1 | [X%] | [X%] | [↑/↓ X pp] | |
| Retención P3 | [X%] | [X%] | [↑/↓ X pp] | |
| Tasa de activación | [X%] | [X%] | [↑/↓ X pp] | |
| Sesiones promedio, primeros 30 días | [X] | [X] | [↑/↓] | |

**Veredicto:** [¿Están las cohortes más recientes desempeñándose mejor o peor? ¿Qué se deployó durante este período que podría explicar el cambio? Si no hay explicación causal disponible, decláralo — no inventes una.]

---

## 7. Recomendaciones

Cada recomendación debe referenciar una cohorte, segmento o señal específica de las secciones anteriores. El consejo genérico que podría aplicar a cualquier producto debe ser cortado.

| # | Recomendación | Anclada a hallazgo | Segmento objetivo | Impacto esperado | Esfuerzo | Prioridad |
|---|---|---|---|---|---|---|
| 1 | [Acción específica] | [Sección X, hallazgo Y] | [Segmento] | [p. ej. +X pp retención P1 — base para estimar] | [Bajo / Med / Alto] | P1 |
| 2 | [Acción específica] | [Sección X, hallazgo Y] | [Segmento] | [p. ej. +X pp retención P3] | [Bajo / Med / Alto] | P1 |
| 3 | [Acción específica] | [Sección X, hallazgo Y] | [Segmento] | [p. ej. +£X LTV en 12M] | [Bajo / Med / Alto] | P2 |

> Si el impacto esperado no puede estimarse a partir de datos disponibles, decláralo — no fabrique un porcentaje de lift.

---

## 8. Referencia SQL

Adapta este template al esquema real del usuario si se suministra. Reemplaza nombres de tablas y columnas placeholder — no ships una query que el usuario no pueda ejecutar.

```sql
-- Query de cohorte de retención
-- Reemplaza: users, events, created_at, event_date, user_id, event_type, [start_date], [key_retention_event]
SELECT
  DATE_TRUNC('month', u.created_at)    AS cohort_month,
  DATE_TRUNC('month', e.event_date)    AS activity_month,
  DATEDIFF('month', u.created_at, e.event_date) AS period,
  COUNT(DISTINCT e.user_id)            AS retained_users,
  COUNT(DISTINCT c.user_id)            AS cohort_size,
  ROUND(
    COUNT(DISTINCT e.user_id) * 100.0
    / NULLIF(COUNT(DISTINCT c.user_id), 0), 1
  )                                    AS retention_rate
FROM users u
JOIN (
  SELECT user_id, DATE_TRUNC('month', created_at) AS cohort_month
  FROM users
  WHERE created_at >= '[start_date]'
) c ON u.user_id = c.user_id
   AND DATE_TRUNC('month', u.created_at) = c.cohort_month
JOIN events e
  ON u.user_id = e.user_id
 AND e.event_type = '[key_retention_event]'
GROUP BY 1, 2, 3
ORDER BY 1, 3;
```

**Adapta para tu stack:** BigQuery usa `DATE_DIFF`; Redshift usa `DATEDIFF`; Snowflake usa `DATEDIFF` o `TIMESTAMPDIFF`. Confirma dialect antes de ejecutar.

---

## Rubric de Scoring (0–40)

Puntúa cualquier output de esta skill antes de entregarlo; 32+ es ship-quality.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Rigor de definición de cohorte | Límites ambiguos; un usuario podría estar en dos cohortes | Mutuamente excluyentes pero evento de entrada débilmente justificado | Evento de entrada unambiguo y límites de fecha, con tradeoffs de la definición declarados |
| Honestidad de meseta y ventana | Retención leída de una ventana demasiado corta para apoyarla | Meseta reclamada sin mostrar dónde | Meseta visible y ubicada, o ventana explícitamente declarada demasiado corta para confirmar una |
| Grounding de LTV | LTV de retención asumida o ARPU asumido | Datos observados usados pero método de proyección inestadado | LTV construido de retención observada × ARPU observado con el método de proyección y supuesto de decay mostrados |
| Payoff de tendencia e indicador principal | Cohortes descritas, nada comparado | Tendencia cohorte-a-cohorte mostrada sin indicadores | Tendencia entre períodos de adquisición leída correctamente, más indicadores comportamentales principales de churn vinculados a detección |

## Quality Checks

Ejecuta todos los checks antes de entregar output. No marques un check como pasado a menos que sea verificablemente verdadero dado los datos suministrados.

- [ ] **Exclusividad mutua:** Ningún usuario puede aparecer en dos cohortes — evento de entrada y límites de fecha son unambiguos
- [ ] **Meseta de retención:** La curva muestra una meseta visible, o el análisis explícitamente declara la ventana demasiado corta para confirmar una
- [ ] **Grounding de LTV:** Las proyecciones de LTV usan retención observada y ARPU observado — no figuras asumidas
- [ ] **Segmentos comportamentales:** Mutuamente excluyentes y colectivamente exhaustivos — cada usuario en alcance cae en exactamente un segmento
- [ ] **Tamaño mínimo de cohorte:** Cualquier cohorte por debajo del threshold de confiabilidad está marcada y excluida de conclusiones de tendencias
- [ ] **Señales de churn:** Todos los indicadores principales listados son observables en datos de producción, o explícitamente marcados como hipótesis
- [ ] **Recomendaciones ancladas:** Cada recomendación referencia un hallazgo específico — no consejos de growth flotantes
- [ ] **SQL adaptado:** La query usa los nombres de tabla/columna reales del usuario si esquema fue proporcionado

---

## Anti-Patterns

Evita estos failure modes — producen análisis que parecen rigurosos pero no pueden ser confiados o actados.

| Anti-pattern | Por qué falla | Approach correcto |
|---|---|---|
| Membresía de cohorte superpuesta | Los números de retención entre cohortes no pueden compararse | Define un único evento de entrada unambiguo; un usuario, una cohorte |
| ARPU asumido en proyecciones de LTV | Oculta diferencias de segmento; produce un número que suena preciso pero no lo es | Usa ingresos observados por usuario retenido por período, desglosado por segmento |
| Sacando conclusiones de cohortes undersized | La variación aleatoria se disfraza de signal | Marca tamaño mínimo de cohorte; excluye o caveata cohortes bajo threshold |
| Conflating login con retención | Un usuario que inicia sesión pero no completa el evento clave no está retenido por definición | Retención = completación del evento de retención clave definido, no una sesión |
| Fabricando estimados de lift | Números de impacto proyectado sin base de datos mislead decisiones de priorización | Si el impacto no puede estimarse de datos, decláralo y recomienda un test |
| Recomendaciones genéricas | Consejos que podrían aplicar a cualquier producto SaaS no añade valor analítico | Cada recomendación debe referenciar un hallazgo específico de cohorte, segmento o señal |

---

## Frases Trigger

Esta skill se activa en frases incluyendo:

- "Ejecuta un análisis de cohortes para [producto]"
- "Analiza retención por mes de adquisición"
- "¿Cuál es el LTV de usuarios de [canal] vs [canal]?"
- "Construye un modelo de retención de cohortes desde"

## Ejemplos de Frases Trigger

- "Ejecuta un análisis de cohortes."
- "Analiza retención por cohorte."
- "Calcula valor de vida útil por período de adquisición."
