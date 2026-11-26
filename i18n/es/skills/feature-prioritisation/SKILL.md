---
# machine-translated to es from skills/feature-prioritisation/SKILL.md — review: pending. Native fixes welcome via PR.
name: feature-prioritisation
description: "Aplica marcos de priorización (RICE, MoSCoW, Kano, ICE, Opportunity Scoring) para clasificar características e items del backlog. Úsalo cuando se te pida priorizar características, clasificar un backlog, decidir qué construir a continuación, o evaluar compensaciones entre ideas competidoras. Produce una lista de características puntuada y clasificada con tablas específicas del marco, orden de construcción recomendado, items depriorizados, y supuestos realizados."
---

# Skill de Priorización de Características

Aplica el marco de priorización correcto a cualquier backlog y produce una clasificación clara y defendible con justificación — no solo una lista ordenada.

## Inputs Requeridos

Trabaja con lo que se proporciona. Si falta alguno de estos, aun así produce el output completo: rellena cada vacío con un supuesto razonable marcado *(asumido, confirmar)* y lista esos supuestos al final. Solo haz una pregunta cuando el tema central en sí está ausente (no hay nada sobre lo que escribir).
- **Lista de características o iniciativas a priorizar**
- **Objetivo o métrica** siendo priorizado (OKR, lanzamiento, sprint)
- **Marco preferido** (o recomienda basándote en el contexto abajo)
- **Datos del equipo**: estimaciones de alcance, estimaciones de esfuerzo, velocidad (para RICE)

## Guía de Selección de Marco

Pregunta al usuario qué marco prefiere, o recomienda basándote en el contexto:

| Situación | Marco Recomendado |
|---|---|
| Necesitas una puntuación rápida y basada en datos | RICE |
| Reunión de alineación de stakeholders | MoSCoW |
| Entender la satisfacción del cliente vs expectativas | Kano |
| Startup en etapa temprana, decisiones rápidas | ICE |
| Identificar necesidades de clientes desatendidas | Opportunity Scoring |
| Decisiones de portafolio estratégico | Value vs Effort Matrix |

---

## Puntuación RICE

**Fórmula:** (Alcance × Impacto × Confianza) ÷ Esfuerzo

| Factor | Definición | Escala |
|---|---|---|
| Alcance | Usuarios impactados por trimestre | Número real |
| Impacto | Efecto en el objetivo por usuario | 0.25 / 0.5 / 1 / 2 / 3 |
| Confianza | ¿Cuán seguro estás? | 50% / 80% / 100% |
| Esfuerzo | Personas-mes requeridas | Número real |

Tabla de output:
| Característica | Alcance | Impacto | Confianza | Esfuerzo | Puntuación RICE | Prioridad |
|---|---|---|---|---|---|---|

---

## Método MoSCoW

Clasifica cada característica como:
- **Must Have** — innegociable para el lanzamiento/sprint; el producto falla sin ella
- **Should Have** — importante pero no crítico; existen alternativas
- **Could Have** — agradable de tener; incluir solo si hay tiempo
- **Won't Have (esta vez)** — explícitamente fuera de alcance ahora; puede revisarse después

Siempre pregunta: "Must have para *qué*?" — define el alcance (lanzamiento, sprint, trimestre) antes de clasificar.

---

## Puntuación ICE (Startup/modo rápido)

**Fórmula:** Impacto + Confianza + Facilidad (cada 1–10)

Rápido, subjetivo — bueno para decisiones tempranas antes de que existan datos.

---

## Modelo Kano

Clasifica características en:
- **Básico (Must-be):** Esperado; la ausencia causa insatisfacción
- **Desempeño:** Más = mejor satisfacción; relación lineal
- **Emocionante (Delighters):** Inesperado; crea delight; la ausencia es neutral
- **Indiferente:** A los usuarios no les importa de ninguna forma
- **Inverso:** Algunos usuarios lo quieren, otros no

Recomienda construir: todas las características Básicas primero → características de Desempeño para casos de uso clave → 1–2 características Emocionantes por release.

---

## Helper Programático

Este skill incluye un script Python que solo usa stdlib y que calcula clasificaciones para los marcos basados en matemáticas (RICE, ICE) para que la puntuación de características sea consistente entre sesiones.

```bash
# RICE desde JSON
python3 scripts/feature_prioritisation.py initiatives.json --framework rice

# RICE desde CSV
python3 scripts/feature_prioritisation.py initiatives.csv --framework rice --format csv

# ICE desde JSON
python3 scripts/feature_prioritisation.py features.json --framework ice

# Pipe hacia él
printf '%s\n' '[{"name":"API refactor","impact":8,"confidence":80,"ease":5}]' \
  | python3 scripts/feature_prioritisation.py --framework ice -
```

Usa `--json` para producir output legible por máquina para herramientas posteriores.

---

## Formato de Output

### Priorización de Características — [Producto/Equipo] — [Fecha]

**Marco Utilizado:** [RICE / MoSCoW / ICE / Kano / Personalizado]
**Alcance:** [Sprint / Trimestre / Release]
**Objetivo siendo priorizado:** [Métrica u objetivo]

[Tabla puntuada usando marco seleccionado]

**Orden de Construcción Recomendado:**
1. [Característica] — [Justificación de 1 línea]
2. [Característica] — [Justificación de 1 línea]
3. ...

**Explícitamente Depriorizados:**
- [Característica] — Razón: [breve]

**Supuestos Realizados:**
- [Cualquier estimación o juicio usado en la puntuación]

---

## Pautas

- Siempre ancla la priorización a una métrica u objetivo específico — nunca priorices en el vacío
- Señala cuando dos características tienen puntuaciones similares pero perfiles de riesgo muy diferentes
- Si la política de stakeholders está influyendo en la priorización, nómbralo explícitamente y sugiere separar la puntuación del marco de la decisión final
- Recomienda revisitar prioridades cada 2 semanas como mínimo
- Nunca produzcas una lista clasificada de una sola columna sin justificación — explica las 3 principales y 3 peores decisiones

## Materiales Profundos

Este skill incluye archivos de apoyo — úsalos cuando estén disponibles:

- **`references/framework-selection.md`** — Elegir el Marco de Priorización (En Lugar de Defaultear a RICE). Aplícalo mientras produces el output; contiene la calibración y los juicios de valor que el resumen del método anterior comprime.
- **`templates/prioritisation-session.md`** — una versión para rellenar del entregable con los quality gates incluidos. Ofrécelo cuando el usuario quiera trabajar el documento él mismo en lugar de que se genere.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier output de este skill antes de entregarlo; 32+ es de calidad lista para enviar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Anclaje al objetivo | Sin objetivo declarado, o items silenciosamente puntuados contra objetivos diferentes | Un objetivo es nombrado pero las puntuaciones individuales no lo referencian; items fuera de objetivo puntuados de todas formas | Una métrica y alcance explícitos; cada puntuación justificada contra ella; items sirviendo un objetivo diferente rechazados con instrucciones para reenviar |
| Integridad de puntuación | Marcos mezclados en una sesión, aritmética errónea, o escalas inventadas a mitad de tabla | Un marco aplicado consistentemente, pero confianza por defecto alta y anclajes de escala indefinidos | Marco consistente, matemáticas verificables, anclajes de impacto definidos, confianza reflejando honestamente la evidencia detrás de cada estimación |
| Transparencia de cortes y supuestos | Items cortados simplemente desaparecen; sin registro de estimaciones o sus fuentes | Items depriorizados listados pero sin razones; supuestos parciales o sin fuente | Cada corte lleva una razón y trigger de revisita; supuestos nombran sus fuentes (analytics, estimaciones de ingeniería) para que la clasificación sea re-ejecutable |
| Juicio más allá del número | Una tabla ordenada presentada como la decisión | Los picks principales reciben justificación, pero near-ties, perfiles de riesgo, y política van sin mencionar | Near-ties rotas en riesgo con razonamiento mostrado; presión política nombrada con puntuación del marco separada de la decisión final; top y bottom de lista ambos explicados |

## Verificaciones de Calidad

- [ ] Cada item es puntuado contra la misma métrica u objetivo (no objetivos diferentes por item)
- [ ] Items depriorizados están explícitamente listados con razones (no solo ausentes de la lista clasificada)
- [ ] Supuestos usados en la puntuación están documentados
- [ ] La política de stakeholders o preferencias personales están separadas de la puntuación del marco
- [ ] La priorización está anclada a un alcance específico (sprint / trimestre / lanzamiento)

## Anti-Patrones

- [ ] No puntúes items contra objetivos diferentes — cada item en una sesión de priorización debe ser puntuado contra el mismo objetivo
- [ ] No omitas items depriorizados — listar explícitamente qué fue cortado y por qué es tan importante como la lista clasificada
- [ ] No dejes que la política de stakeholders anule puntuaciones del marco sin documentar la anulación y razón
- [ ] No mezcles puntuaciones RICE, ICE, o MoSCoW entre frameworks en una sola sesión — elige un framework por ejercicio de priorización
- [ ] No trates el output como final sin documentar los supuestos usados en la puntuación — los supuestos cambian, y la lista debe ser revisitable

## Frases Trigger de Ejemplo

- "Prioriza características."
- "Clasifica un backlog."
- "Decide qué construir a continuación."
- "Evalúa compensaciones entre ideas competidoras."
