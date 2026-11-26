---
# machine-translated to es from skills/assumption-mapper/SKILL.md — review: pending. Native fixes welcome via PR.
name: assumption-mapper
description: "Extrae y clasifica por riesgo las suposiciones ocultas en un brief de producto o PRD. Úsalo cuando se te pida revisar un brief de producto en busca de suposiciones, auditar un PRD por riesgos, encontrar suposiciones ocultas, validar planes de producto, o ejecutar un análisis de suposiciones. Produce un mapa de suposiciones priorizado con puntuaciones de confianza e impacto, métodos de validación recomendados, y banderas de suposición crítica."
---

# Skill Assumption Mapper

Identifica y prioriza las suposiciones no comprobadas incrustadas en cualquier plan de producto antes de que comience el desarrollo.

## Inputs Requeridos

Trabaja a partir de lo que se proporciona. Si alguno de estos falta, produce igual la salida completa: rellena cada brecha con una suposición razonable marcada *(asumido, confirmar)* e incluye esas suposiciones al final. Haz una pregunta solo cuando el tema central en sí mismo falte (no hay nada sobre lo que escribir).
- **Brief de producto, PRD, o descripción de concepto** (incluso notas ásperas funcionan)
- **Etapa** (concepto / descubrimiento / pre-construcción / post-lanzamiento — afecta qué suposiciones importan más)

## Dónde se sitúa esto — el punto de entrada de la columna vertebral

Este es el frente de la columna vertebral de decisiones de producto: **`assumption-mapper` → `/prd-template`
→ `/rice-prioritisation` → `/roadmap-narrative`**. Toma una idea o brief en bruto y
pasa a la siguiente skill una cosa: **la suposición más riesgosa, y si sobrevivió una prueba barata.** Los términos compartidos (suposición, de carga, confianza, procedencia) se
definen una vez en [`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md) —
consúltalo en lugar de redefinirlos. Escribir un PRD sobre una suposición de carga no comprobada es el fracaso que esta skill existe para prevenir, así que ejecútalo *antes de*
`/prd-template`, no después.

## El bucle

Cuatro fases. La fase 3 es la skill; el resto la alimentan. Cada una termina en un criterio de completitud
— no avances hasta que se cumpla.

1. **Identifica en los cuatro lentes.** Extrae suposiciones en *Deseabilidad* (¿quieren los usuarios esto?), *Viabilidad técnica* (¿podemos construirlo?), *Viabilidad comercial* (¿el negocio lo sostendrá?), *Usabilidad* (¿pueden los usuarios realmente usarlo?). Las suposiciones peligrosas son las que son tan obvias que nadie las escribió.
   **Listo cuando:** al menos una suposición por lente, y releer el brief en busca de el lente más vacío no saca nada nuevo.
2. **Califica solo en los dos ejes.** Para cada una: *de carga* (1–5, ¿colapsa el plan si es falsa?) y *confianza* (1–5, ¿qué tan seguro estamos de que es verdadera?). Prioridad = de carga − confianza. Etiqueta la procedencia de cada hecho ([datos]/[intuición]).
   **Listo cuando:** cada suposición tiene ambas puntuaciones y una etiqueta de procedencia, y la de mayor prioridad es genuinamente la más aterradora — no la más fácil de probar.
3. **Encuentra y presiona la más riesgosa.** La suposición de máxima prioridad (de carga alta × confianza baja) es la que puede hundir todo el plan. Nombra la *prueba más barata* que podría refutarla antes de que se escriba una línea de código (consulta la referencia divulgada de [cheap-tests](references/cheap-tests.md) para el menú).
   **Listo cuando:** la suposición más riesgosa se nombra, con una prueba que podría ejecutarse esta semana y un "cómo se ve un fracaso" claro.
4. **Traspasa.** Produce el mapa clasificado, y declara explícitamente qué suposición `/prd-template` debe tratar como validada-o-abierta. Una suposición más riesgosa sin resolver se convierte en una Pregunta Abierta en el PRD, no en una apuesta silenciosa.
   **Listo cuando:** la skill descendente podría comenzar a partir de esta salida sin volver a preguntar cuál es la apuesta arriesgada.

## Estructura de Salida

### Mapa de Suposiciones: [Nombre de Característica/Producto]

| Suposición | Categoría | Confianza | Impacto | Prioridad | Método de Validación |
|------------|-----------|-----------|---------|-----------|----------------------|
| [suposición] | [tipo] | [1-5] | [1-5] | [puntuación] | [método] |

#### Suposiciones Críticas (Impacto 4+ y Confianza 2 o inferior)
[Elementos marcados con recomendaciones de validación detalladas]

#### Top 3 Suposiciones para Validar Primero
[Recomendaciones detalladas incluyendo método de investigación específico, esfuerzo estimado, y qué cambiaría el resultado]

## Ejemplo (Parcial)

Input: *"Estamos construyendo un flujo de onboarding de autoservicio para reducir el tiempo para valor en clientes SMB."*

| Suposición | Categoría | Confianza | Impacto | Prioridad | Método de Validación |
|------------|-----------|-----------|---------|-----------|----------------------|
| Los usuarios SMB pueden completar onboarding sin ayuda humana | Usabilidad | 2 | 5 | 3 | Prueba de usabilidad no moderada (n=8) |
| El onboarding más rápido se correlaciona con retención más alta | Viabilidad comercial | 3 | 4 | 1 | Análisis de cohorte de tiempos de onboarding actuales vs. retención a 90 días |
| El onboarding actual es la razón principal del tiempo lento para valor | Deseabilidad | 2 | 4 | 2 | Entrevistas con usuarios de cuentas SMB que se fueron recientemente |

## Anti-Patrones

- [ ] No solo identifiques suposiciones de deseabilidad — las suposiciones de viabilidad técnica y viabilidad comercial son igualmente propensas a matar un producto y a menudo se pasan por alto
- [ ] No asignes alta confianza a una suposición solo porque no ha sido cuestionada — la ausencia de evidencia no es evidencia
- [ ] No recomiendes "entrevistas con usuarios" como el método de validación para cada suposición — algunas suposiciones requieren datos cuantitativos, análisis competitivo, o pruebas técnicas
- [ ] No listes suposiciones que no puedan ser probadas — cada suposición en el mapa debe tener un método de validación plausible, o debe ser marcada como incognoscible y tratada como riesgo

## Materiales Más Profundos

Esta skill viene con archivos de soporte — úsalos cuando estén disponibles:

- **`references/cheap-tests.md`** — El Catálogo de Pruebas Baratas: Calibrando el Tamaño Correcto de la Validación. Aplícalo mientras produces la salida; lleva los ajustes de calibración y las llamadas de juicio que el resumen del método anterior comprime.
- **`templates/assumption-board.md`** — una versión para rellenar del entregable con los gates de calidad incluidos. Ofrécelo cuando el usuario quiera trabajar el documento ellos mismos en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de esta skill antes de entregarla; 32+ es calidad lista.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Cobertura de categorías | Solo deseabilidad — faltan las suposiciones de viabilidad técnica y comercial más propensas a matar el plan | Tres categorías pobladas, pero la vacía no fue re-explorada desde el brief; la cobertura es simbólica (una fila genérica) | Las cuatro categorías pobladas con filas sustanciales, con excavación visible en cualquier categoría que el brief mismo descuidó |
| Disciplina de puntuación | Números de confianza/impacto arbitrarios o faltantes; aritmética de prioridad inconsistente; sin banderas críticas | Puntuaciones presentes y Prioridad = Impacto − Confianza se sostiene, pero la confianza está inflada para suposiciones sin cuestionar y banderas críticas aplicadas selectivamente | Puntuaciones defendibles (sin cuestionar ≠ confianza alta), aritmética consistente incluyendo prioridades negativas dejadas visibles, y la bandera CRÍTICA aplicada mecánicamente en Impacto 4+ / Confianza ≤2 — incluso a suposiciones que al equipo le gustan |
| Ajuste del método de validación | "Entrevistas con usuarios" (o "investiga") pegado en cada fila | Los métodos varían pero varios no coinciden con el tipo de suposición, les falta tamaño de muestra, o no tienen precio | Cada método coincide con la suposición (auditoría de datos, backtesting, fake door, desk check, spike…) con tamaño de muestra y esfuerzo; suposiciones no comprobables marcadas incognoscibles y convertidas a riesgos asumidos, no dadas pruebas falsas |
| Palanca de decisión | Lista Top 3 ausente, o pruebas cuyo resultado no cambiaría nada | Top 3 nombradas con esfuerzo, pero "qué cambia el resultado" es vago o las pruebas validan suposiciones cómodas sobre las peligrosas | Top 3 son las suposiciones comprobables de máxima prioridad, cada una con esfuerzo, un umbral pre-comprometido cuando sea relevante, y una decisión concreta que el resultado cambiaría |

## Quality Checks

- [ ] Al menos una suposición por categoría (Deseabilidad, Viabilidad técnica, Viabilidad comercial, Usabilidad)
- [ ] Todas las suposiciones de Impacto 4+ / Confianza 2− marcadas como CRÍTICAS
- [ ] Cada método de validación es específico (no solo "investiga" — nombra el método y tamaño de muestra)
- [ ] Las puntuaciones de prioridad son consistentes (Impacto − Confianza, mayor = más urgente)

## Frases Gatillo de Ejemplo

- "Revisa un brief de producto en busca de suposiciones."
- "Audita un PRD por riesgos."
- "Encuentra suposiciones ocultas."
- "Valida planes de producto."
- "Ejecuta un análisis de suposiciones."
