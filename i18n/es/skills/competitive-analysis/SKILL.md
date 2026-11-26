---
# machine-translated to es from skills/competitive-analysis/SKILL.md — review: pending. Native fixes welcome via PR.
name: competitive-analysis
description: "Analiza competidores y crea documentación de panorama competitivo con matrices de características, mapas de posicionamiento y recomendaciones estratégicas. Usa cuando se te pida analizar competidores, crear un análisis competitivo, comparar características con competidores, construir un panorama competitivo, rastrear posicionamiento competitivo o preparar insumos para sales battlecard. Produce perfiles de competidores estructurados, matriz de comparación de características, análisis de ganancias/pérdidas y recomendaciones estratégicas priorizadas. Para un desglose puntual de un rival único usa competitor-teardown; para un informe de mercado recurrente usa competitive-intelligence-monitor."
version: 1.0.0
---

# Skill de Análisis Competitivo

Crea análisis competitivos estructurados para la toma de decisiones de producto.

## Lee desde / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), fundamenta en él en lugar de volver a preguntar lo que ya sabes:

- **Lee primero:** `knowledge/` (mercado + posicionamiento) y `entities/` de competidores. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<competidor o mercado>"` y lleva etiqueta de procedencia a través de cada hecho — un argumento de competidor de un comunicado de prensa es `[external]`, no `[data]`.
- **📥 Propón al Brain:** después de producir, propón registrar nuevos hechos de competidores en `knowledge/` (`[external]`) y crear/actualizar `entities/` de competidores. Muéstralos, obtén un sí, luego escribe con `../professional-brain/scripts/brain_write.py … --commit` (solo-agregar, dry-run por defecto).

## Insumos Requeridos

Trabaja con lo que se te proporciona. Si falta alguno de estos, aun así produce el resultado completo: completa cada brecha con una suposición razonable marcada *(asumido, confirma)* y lista esas suposiciones al final. Haz una pregunta solo cuando el tema central mismo sea el que falta (no hay nada sobre qué escribir).
- **Tu producto o empresa** (contra qué estás comparando)
- **Competidores a analizar** (o pregunta para identificar los 3-5 principales)
- **Enfoque del análisis** (panorama completo / comparación de características / precios / posicionamiento / ganancias-pérdidas)
- **Audiencia** (equipo de producto / liderazgo / ventas / junta)

## Proceso

1. Reúne información de competidores a partir de insumos proporcionados y contexto disponible
2. Construye perfiles para cada competidor
3. Crea matriz de comparación de características en dimensiones que importan a los clientes del usuario
4. Analiza precios y posicionamiento
5. Identifica patrones de ganancias/pérdidas e implicaciones estratégicas
6. **Valida** — Confirma que todos los argumentos referencien una fuente específica o estén marcados como suposiciones. Verifica que las comparaciones de características noten diferencias de calidad, no solo presencia/ausencia.

## Estructura de Salida

### 1. Resumen Ejecutivo
- **Posición en el Mercado**: Dónde estamos parados relativos a competidores
- **Hallazgos Clave**: Top 3-5 insights
- **Implicaciones Estratégicas**: Qué significa esto para la roadmap

### 2. Perfiles de Competidores

Para cada competidor:
- **Descripción General de la Empresa**: Tamaño, financiación, posición de mercado
- **Cliente Objetivo**: A quién sirven
- **Propuesta de Valor**: Posicionamiento central
- **Fortalezas / Debilidades**: Qué hacen bien y dónde se quedan cortos
- **Actividad Reciente**: Actualizaciones principales, financiación, anuncios

### 3. Matriz de Comparación de Características

| Característica | Nosotros | Competidor A | Competidor B | Competidor C |
|---|---|---|---|---|
| [Característica] | ✅ Completo | ⚠️ Limitado | ❌ Ninguno | ✅ Completo |

Leyenda: ✅ Completo (listo para producción) · ⚠️ Limitado/Beta · ❌ Ninguno

Incluye notas sobre diferencias de calidad e implementación donde sean significativas.

### 4. Comparación de Precios

| Plan | Nosotros | Competidor A | Competidor B |
|---|---|---|---|
| Gratuito/Prueba | [precio] | [precio] | [precio] |
| Pro | [precio] | [precio] | [precio] |
| Enterprise | [precio] | [precio] | [precio] |

### 5. Mapa de Posicionamiento de Mercado

Posiciona competidores en dos dimensiones clave relevantes al mercado:
- Eje Y: [p. ej., Enterprise vs. SMB]
- Eje X: [p. ej., Simple vs. Integral]

**Oportunidades de Espacio en Blanco**: [Segmentos desatendidos]

### 6. Análisis de Ganancias/Pérdidas

**Por Qué Ganamos:**
- Mejor en: [capacidades específicas]
- Clientes que valoran: [qué les importa]

**Por Qué Perdemos:**
- Cuando los clientes necesitan: [requisitos específicos]
- Su ventaja: [qué inclina la decisión]

### 7. Recomendaciones Estratégicas

**Acciones Inmediatas (0-3 meses):**
1. [Acción] — [Justificación]

**Mediano Plazo (3-12 meses):**
1. [Acción] — [Justificación]

## Anti-Patrones

- [ ] No presentes argumentos de características de competidores como hechos sin citar una fuente o marcarlos como suposiciones — datos de características desactualizados o incorrectos mislead a ventas y decisiones de producto
- [ ] No construyas un análisis competitivo que solo cubra características — precios, mensajería, motion de go-to-market y quién contratan son señales igualmente estratégicas
- [ ] No trates a todos los compradores como idénticos — el mismo producto puede ganar contra Competidor A en el segmento enterprise y perder en SMB; importa win/loss específica por segmento
- [ ] No suavices debilidades y amenazas en el FODA para evitar incomodidad interna — un FODA honesto solo es útil si los negativos son reales

## Materiales Más Profundos

Este skill viene con archivos de soporte — úsalos cuando estén disponibles:

- **`references/feature-matrix-honesty.md`** — Matrices de Características Que No Mienten. Aplícalo mientras produces la salida; lleva la calibración y juicios que el resumen del método anterior comprime.
- **`templates/landscape-doc.md`** — una versión rellenable del entregable con las compuertas de calidad en línea. Ofrécelo cuando el usuario quiera trabajar el documento ellos mismos en lugar de tenerlo generado.

## Rubric de Puntuación (0–40)

Puntúa cualquier salida de este skill antes de entregarla; 32+ es calidad para lanzar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Higiene de fuentes | Argumentos de competidores establecidos como hecho sin procedencia; datos obsoletos presentados como actuales | Argumentos principales originados, pero suposiciones sin marcar y mezcladas con hechos verificados | Cada argumento lleva una etiqueta de fuente o marca de suposición explícita; un registro de suposiciones le dice al lector qué re-verificar |
| Profundidad más allá del checklist de características | Una matriz de características y nada más | Características más precios, pero sin posicionamiento, motion de GTM o análisis de movimientos recientes | Características, precios, mapa de posicionamiento y ganancias/pérdidas todos presentes — con notas de diferencia de calidad donde paridad de checkmark misleadiría |
| Win/loss consciente de segmento | Una lista genérica de fortalezas/debilidades promediada en todos los compradores | Win/loss presente pero indiferenciada por segmento o basada en opinión interna, no evidencia de cliente | Win/loss dividida por segmento con razones articuladas por clientes y conteos de deals; segmentos contradictores (gana SMB, pierde enterprise) mostrados lado a lado |
| Accionabilidad de recomendaciones | Consejo genérico ("monitorea competidores", "mejora diferenciación") | Acciones direccionalmente útiles pero desatadas de los hallazgos o sin timeframes | Acciones específicas con timeframe y justificación, cada una trazable a un hallazgo numerado — incluyendo no-acciones explícitas |

## Comprobaciones de Calidad

- [ ] Todos los argumentos de competidores citan una fuente o están marcados como suposiciones
- [ ] La comparación de características nota diferencias de calidad, no solo presencia de características
- [ ] Las recomendaciones estratégicas son acciones específicas, no consejo genérico
- [ ] El análisis de ganancias/pérdidas refleja perspectiva del cliente, no suposiciones internas
- [ ] Se consideran diferentes segmentos de clientes (no todos los compradores valoran lo mismo)

## Frases de Disparo de Ejemplo

- "Analiza competidores."
- "Crea un análisis competitivo."
- "Compara características con competidores."
- "Construye un panorama competitivo."
- "Rastrea posicionamiento competitivo."
