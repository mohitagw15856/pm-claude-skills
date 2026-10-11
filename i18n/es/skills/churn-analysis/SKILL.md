---
# machine-translated to es from skills/churn-analysis/SKILL.md — review: pending. Native fixes welcome via PR.
name: churn-analysis
description: "Produce un análisis de churn estructurado que separe el churn evitable del inevitable. Úsalo cuando investigues por qué se van los clientes, identifiques segmentos en riesgo, calcules net revenue retention o construyas un plan de intervención de retención. Produce un informe de churn con cálculos de tasa, razones categorizadas por evitabilidad, desglose por segmento, análisis de timing, señales de alerta temprana e intervenciones priorizadas según impacto estimado."
---

# Skill de Análisis de Churn

Produce un análisis de churn estructurado que vaya más allá de la tasa titular — identificando por qué se van los clientes, cuáles son los segmentos más en riesgo, y qué intervenciones tendrán el mayor impacto en la retención.

## Lee de / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), toma como base en lugar de volver a preguntar por lo que ya sabes:

- **Lee primero:** `context.md` (definiciones de métricas — qué significa "churn" aquí), `knowledge/` y `entities/` de segmentos relacionados. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "churn"` y mantén la etiqueta de procedencia de cada hecho.
- **📥 Propón al Brain:** después de producir, propón registrar el hallazgo titular de retención a `knowledge/` (`[data]`), cualquier decisión de retención a `decisions/` y los drivers en riesgo como `hypotheses/`. Muéstralos, obtén confirmación, luego escribe con `../professional-brain/scripts/brain_write.py … --commit` (append-only, dry-run por defecto).

## Inputs Requeridos

Pregunta por estos si no están ya disponibles:
- **Período de tiempo** siendo analizado (p. ej. Q1, últimos 12 meses)
- **Total de clientes al inicio del período** y **clientes que hicieron churn**
- **ARR o ingresos perdidos** por churn
- **Datos de razones de churn** — resultados de encuestas de salida, notas de CSM, datos de soporte o razones de pérdida de ventas
- **Segmentos de clientes** — por tier, industria, cohorte o línea de producto
- **Tasa de retención actual** si se conoce
- **Cualquier cambio reciente** — precios, producto, modelo de soporte — que haya podido afectar al churn

## Categorías de Churn

Siempre clasifica el churn antes de analizarlo:

| Categoría | Definición |
|---|---|
| **Voluntario — evitable** | El cliente se fue debido a un problema que habríamos podido solucionar (gaps de producto, onboarding pobre, fallos relacionales) |
| **Voluntario — inevitable** | El cliente se fue por razones fuera de nuestro control (cortes de presupuesto, adquisición, cierre de empresa) |
| **Involuntario** | Fallo de pago, no renovación de contrato por error, error administrativo |

Las intervenciones para cada categoría son diferentes. Mezclarlas lleva a conclusiones equivocadas.

## Formato de Output

---

# Análisis de Churn: [Producto / Segmento / Empresa]
**Período:** [Fecha inicio] — [Fecha fin]
**Preparado por:** [Nombre] | **Fecha:** [Fecha]

---

## Números Titulares

| Métrica | Valor |
|---|---|
| Clientes al inicio del período | [N] |
| Clientes que hicieron churn | [N] |
| **Tasa de churn de clientes** | **[X]%** |
| ARR al inicio del período | £/$/€[X] |
| ARR perdido por churn | £/$/€[X] |
| **Tasa de churn de ingresos (bruto)** | **[X]%** |
| ARR de expansiones (mismo período) | £/$/€[X] |
| **Net revenue retention (NRR)** | **[X]%** |

**Contexto de benchmark:**
- Tasa de churn de clientes: [X]% vs. benchmark de industria [Y]% — [arriba / abajo / en línea]
- NRR: [X]% — [Lo que significa: arriba del 100% = la expansión compensa el churn; abajo del 100% = base encogida]

---

## Desglose de Churn por Categoría

| Categoría | Clientes | % del churn | ARR perdido |
|---|---|---|---|
| Voluntario — evitable | [N] | [X]% | £/$/€[X] |
| Voluntario — inevitable | [N] | [X]% | £/$/€[X] |
| Involuntario | [N] | [X]% | £/$/€[X] |
| **Total** | **[N]** | **100%** | **£/$/€[X]** |

**Churn evitable como % del churn total:** [X]% — este es el número que realmente podemos influir.

---

## Razones de Churn — Solo Churn Evitable

Ordena por frecuencia. Incluye peso de ARR donde los datos lo permitan.

| Razón | Cantidad | % del churn evitable | ARR perdido | Cita representativa |
|---|---|---|---|---|
| [Razón 1 — p. ej. "Producto carece de característica clave"] | [N] | [X]% | £/$/€[X] | "[Cita]" |
| [Razón 2] | [N] | [X]% | £/$/€[X] | "[Cita]" |
| [Razón 3] | [N] | [X]% | £/$/€[X] | "[Cita]" |
| [Razón 4] | [N] | [X]% | £/$/€[X] | "[Cita]" |
| Otros | [N] | [X]% | £/$/€[X] | — |

**Síntesis temática:** [2–3 oraciones agrupando las razones principales en 2–3 temas. P. ej. "Las tres razones principales se agrupan en dos temas: gaps de producto en [área] (afectando X% del churn evitable) y fallos de onboarding donde los clientes nunca lograron valor (Y%)."]

---

## Churn por Segmento

Identifica qué segmentos sobre- o sub-indexan para churn.

### Por Tier

| Tier | Tasa de churn | vs. General | Notas |
|---|---|---|---|
| Enterprise | [X]% | +/-[X]pp | |
| Mid-Market | [X]% | +/-[X]pp | |
| SMB | [X]% | +/-[X]pp | |

### Por Cohorte (Año de Adquisición)

| Cohorte | Tasa de churn | Notas |
|---|---|---|
| [Año 1] | [X]% | |
| [Año 2] | [X]% | |
| [Año 3] | [X]% | |

### Por Industria / Caso de Uso (si los datos están disponibles)

| Segmento | Tasa de churn | Notas |
|---|---|---|
| [Segmento 1] | [X]% | |
| [Segmento 2] | [X]% | |

**Patrón clave:** [Qué segmento tiene la tasa de churn más alta y qué probablemente lo explica]

---

## Análisis de Timing

- **Duración promedio del contrato antes del churn:** [X meses]
- **Momento de mayor riesgo:** [p. ej. "Mes 3 — cuando el valor del trial se ha agotado pero la adopción completa no ha sucedido"]
- **Distribución de timing del churn:**

| Cuándo ocurrió el churn | % de cuentas en churn |
|---|---|
| 0–3 meses | [X]% |
| 3–6 meses | [X]% |
| 6–12 meses | [X]% |
| 12+ meses | [X]% |

---

## Señales de Alerta Temprana

Basándote en las cuentas que hicieron churn, identifica las señales que precedieron al churn (y que hubieran podido disparar una intervención más temprana):

| Señal | Tiempo de adelanto antes del churn | Cómo detectarla |
|---|---|---|
| [Señal 1 — p. ej. "DAU/MAU cayó por debajo del 15%"] | [~X semanas] | [Dashboard de uso / alerta] |
| [Señal 2 — p. ej. "Sin QBR en 90+ días"] | [~X semanas] | [Flag de CRM] |
| [Señal 3 — p. ej. "El champion dejó la cuenta"] | [~X semanas] | [Alerta de LinkedIn / tracking de CSM] |
| [Señal 4] | [~X semanas] | [Método de detección] |

---

## Recomendaciones de Intervención

Ordenadas por impacto estimado × viabilidad.

| Intervención | Aborda | Reducción de churn estimada | Esfuerzo | Propietario |
|---|---|---|---|---|
| [Intervención 1 — p. ej. "Mejorar onboarding para [segmento] con check-in dedicado de 30 días"] | [Razón 1] | [X cuentas / £X ARR] | Bajo / Medio / Alto | [Team] |
| [Intervención 2] | [Razón 2] | [X cuentas / £X ARR] | Bajo / Medio / Alto | [Team] |
| [Intervención 3] | [Razón 3] | [X cuentas / £X ARR] | Bajo / Medio / Alto | [Team] |

**Decisión de prioridad:** [Cuál es una intervención, si se implementa este trimestre, tendría el mayor impacto y por qué]

---

## Lo Que No Sabemos (Gaps de Datos)

- [Gap de datos 1 — p. ej. "La tasa de respuesta de encuesta de salida es solo del 30% — los datos de razones pueden no ser representativos"]
- [Gap de datos 2 — p. ej. "Sin datos de uso de producto para tier SMB — no se puede confirmar correlación de señal de uso"]
- [Gap de datos 3]

---

## Anti-Patrones

- [ ] No mezcles churn evitable e inevitable en planes de intervención — recomendar fixes de producto para clientes que hicieron churn por cierre de empresa desperdicia recursos
- [ ] No calcules la tasa de churn usando el recuento de clientes de fin de período como denominador — esto subestima el churn; siempre divide clientes en churn por la cohorte inicial
- [ ] No confíes únicamente en datos de encuesta de salida para razones de churn — las tasas de respuesta son típicamente bajas y el sesgo de auto-selección sesgará la muestra hacia clientes lo suficientemente comprometidos para completar una encuesta
- [ ] No recomiendes intervenciones sin vincularlas a una razón de churn específica — intervenciones desconectadas de causas raíz no moverán la retención
- [ ] No reportes solo churn de ingresos bruto — sin net revenue retention (NRR), un número de retención saludable puede ocultar una base de ingresos encogida

## Materiales Más Profundos

Este skill viene con archivos de soporte — úsalos cuando estén disponibles:

- **`references/avoidability-calls.md`** — ¿Evitable o No? Los Judgment Calls en Clasificación de Churn. Aplícalo mientras produces el output; lleva la calibración y los judgment calls que el resumen del método anterior comprime.
- **`templates/churn-report.md`** — una versión rellenable del deliverable con los quality gates en línea. Ofrécela cuando el usuario quiera trabajar el documento ellos mismos en lugar de tenerlo generado.

## Rúbrica de Scoring (0–40)

Puntúa cualquier output de este skill antes de entregarlo; 32+ es de calidad ship.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Integridad de matemática de tasa | Churn computado en recuento de fin de período; sin NRR | Denominador correcto pero solo churn bruto | Denominador correcto, churn bruto y neto lado a lado, contexto de benchmark que interpreta en lugar de decorar |
| Separación de evitabilidad | Todo churn tratado como un pool | Categorías tabuladas pero las intervenciones aún abordan el pool completo | División evitable/inevitable/involuntaria llevada a través de cada sección downstream; intervenciones tocan solo la parte evitable |
| Insight de segmento & timing | Solo promedios | Tabla de segmento presente pero sin lectura de sobre-índice | Nombra la celda de sobre-índice específica (tier × cohorte) y el momento de mayor riesgo, con el "por qué" |
| Linkage de intervención | Las recomendaciones flotan libres de causas | Cada intervención nombra una razón pero el impacto no está dimensionado | Cada intervención mapea a una razón ordenada con cuentas/ARR estimados recuperados, y la llamada de prioridad justifica su secuenciación |

## Quality Checks

- [ ] La tasa de churn se calcula correctamente (churn ÷ cohorte inicial, no total de fin de período)
- [ ] El churn evitable e inevitable están separados — las intervenciones solo tocan el churn evitable
- [ ] Las razones de churn son reportadas por clientes, no asumidas internamente
- [ ] El análisis de segmento identifica qué segmentos sobre-indexan — no solo promedios
- [ ] Las señales de alerta temprana son específicas y detectables, no genéricas ("bajo engagement")
- [ ] Las intervenciones se vinculan directamente a las razones principales de churn — ninguna recomendación sin un match de causa raíz

## Frases de Trigger de Ejemplo

- "Investigar por qué se van los clientes."
- "Calcular net revenue retention."
- "Construir un plan de intervención de retención."
