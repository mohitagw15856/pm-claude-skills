---
# machine-translated to es from skills/okr-builder/SKILL.md — review: pending. Native fixes welcome via PR.
name: okr-builder
description: "Crea OKRs (Objetivos y Resultados Clave) bien estructurados para equipos de producto, startups e individuos. Úsalo cuando necesites escribir OKRs, establecer objetivos trimestrales, definir resultados clave o revisar OKRs existentes. Produce un conjunto completo de OKRs con objetivos, resultados clave medibles, líneas base y una guía de puntuación."
---

# Habilidad OKR Builder

Escribe OKRs ambiciosos y medibles que conecten el trabajo de producto con la estrategia empresarial. Evita métricas de vanidad, resultados clave enfocados en outputs y objetivos que suenen como listas de tareas.

## Lee de / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), fundamenta en él en lugar de volver a preguntar lo que ya sabes:

- **Lee primero:** `context.md` (definiciones de métricas), `knowledge/strategy.md` (hacia dónde va el producto) e hipótesis abiertas en `hypotheses/`. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<tema del objetivo>"` y lleva la etiqueta de procedencia de cada hecho — no establezcas un resultado clave a partir de un `[hunch]` como si fuese `[data]`.
- **📥 Propón al Brain:** después de producir, propón registrar los objetivos elegidos + targets de KR como un registro en `decisions/` (la apuesta del período) y cualquier definición de métrica nueva en `knowledge/`, cada una etiquetada con procedencia. Muéstralas, obtén un sí, luego escribe con `../professional-brain/scripts/brain_write.py … --commit` (append-only, dry-run por defecto).

## Trabajar desde un brief

A menudo recibirás un brief corto sin todos los detalles (sin líneas base, sin números exactos). **Siempre entrega un conjunto completo y específico de OKRs de todas formas** — no pares para hacer preguntas ni dejes placeholders entre corchetes como `[target]`. Donde falte una línea base o un número, infiere un valor realista basado en el brief y el dominio, y márcalo *(asumido — confirma)*. Una línea base claramente etiquetada como asumida (p. ej. "activación 40% *(asumido)* → 60%") siempre es mejor que un espacio en blanco o una cifra inventada como hecho.

## Materiales Más Profundos

- **`references/bad-okr-gallery.md`** — seis OKRs malos realistas con diagnóstico y reescritura (roadmap disfrazado, objetivo infalsable, sandbagging, KR incontrolable, zoológico de métricas, falta de guardrail), terminando en un diagnóstico de 5 preguntas. Úsalo cuando *revises* OKRs existentes — compara contra la galería antes de escribir feedback.
- **`templates/okr-worksheet.md`** — una hoja de trabajo rellenable cuyas columnas refuerzan las puertas de calidad (fuente de línea base, prueba de drift, prueba de control, guardrail) más una rúbrica de puntuación trimestral precomprometida. Ofrécela cuando un equipo quiera redactar OKRs por sí mismo.

## Fundamentos de OKRs

**Objetivo:** Cualitativo, inspirador, limitado en tiempo. Responde "¿adónde vamos?"
**Resultado Clave:** Cuantitativo, específico, medible. Responde "¿cómo sabremos que hemos llegado?"

### La Prueba para un Buen KR
- ¿Puede puntuarse 0.0–1.0 al final del período?
- ¿Mide resultado, no output? ("Los ingresos de nuevos clientes aumentaron un 30%" no "Lanzar 3 features")
- ¿Es ambicioso pero alcanzable? (Apunta a 70% de logro como estándar de oro)
- ¿Está dentro del control del equipo?

## Anti-Patrones Comunes de OKRs para Señalar y Corregir

| Anti-Patrón | Ejemplo | Versión Mejorada |
|---|---|---|
| Tarea disfrazada de KR | "Lanzar rediseño de onboarding" | "La tasa de activación de nuevos usuarios aumenta de 42% a 65%" |
| Métrica de vanidad | "Conseguir 10,000 descargas de app" | "La retención a 30 días para nuevos usuarios alcanza 40%" |
| KR binario | "Enviar API v2" | "API v2 adoptada por 80% de integraciones activas" |
| Demasiados KRs | 6+ por objetivo | Máximo 3–4 KRs por objetivo |
| Sin línea base | "Mejorar NPS" | "NPS aumenta de 32 a 50" |

Siempre señala anti-patrones y ofrece una reescritura.

## Formato de Output

### OKRs [Trimestre] — [Área de Equipo/Producto]

---

**Objetivo 1: [Declaración cualitativa inspiradora]**

*Por qué importa:* [Contexto estratégico de 1–2 oraciones]

| # | Resultado Clave | Línea Base | Target | Método de Medición |
|---|---|---|---|---|
| KR1 | [Resultado medible] | [Estado actual] | [Target] | [Cómo se mide] |
| KR2 | [Resultado medible] | [Estado actual] | [Target] | [Cómo se mide] |
| KR3 | [Resultado medible] | [Estado actual] | [Target] | [Cómo se mide] |

*Propietario:* [Nombre/Rol]
*Cadencia de check-in:* Semanal

---

Repite para cada objetivo. Recomienda 2–4 objetivos por equipo por trimestre.

## Guía de Puntuación a Incluir

Al final del trimestre, puntúa cada KR:
- 0.7–1.0 = Excelente (0.7 es el "punto dulce" — si todos los KRs puntúan 1.0, no eran lo suficientemente ambiciosos)
- 0.4–0.6 = Hizo progreso pero falló
- 0.0–0.3 = Falló — necesita discusión retrospectiva

## Inputs (infiere cualquiera no proporcionado — etiqueta asunciones)

- **Equipo o individuo** para el que son los OKRs
- **Trimestre y año**
- **Métrica North Star de empresa o producto** (los OKRs deben conectar con esto — si no se da, infiere una plausible y etiquétala *(asumida)*)
- **Top 3 prioridades u objetivos para este trimestre** (notas aproximadas están bien)
- **Cualquier OKR existente para revisar o mejorar** (opcional)

## Directrices

- Conecta OKRs a la North Star de empresa/producto; si no se da, infiere una plausible y etiquétala *(asumida)* en lugar de preguntar
- Recomienda no más de 3 objetivos por equipo por trimestre
- Si el usuario proporciona objetivos basados en output, siempre reencuadra como resultados
- Incluye una sección "health check" señalando qué KRs no tienen datos de línea base actual
- Recuerda al usuario: los OKRs no son evaluaciones de desempeño — deben ser lo suficientemente ambiciosos para que fallarlos esté bien

## Rúbrica de Puntuación (0–40)

Puntúa cualquier output de esta habilidad antes de entregarlo; 32+ es calidad de envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Orientación a resultados | Los KRs son una lista de tareas de features enviados ("lanzar X", "completar Y") | Mayormente resultados, pero uno o más KRs son outputs o binarios ship/no-ship | Cada KR es una métrica de resultado puntuable 0.0–1.0 por grado de logro |
| Línea base y medibilidad | Sin líneas base o métodos de medición; los KRs no pueden puntuarse al final del trimestre | Targets presentes pero varias líneas base faltantes o sin fuente, sin bandera de health-check | Cada KR tiene línea base, target y método de medición; datos faltantes se señalan en un health check con plan para instrumentar |
| Calibración de ambición | Los targets son la tendencia del trimestre anterior (sandbagged) o pura fantasía sin camino | Algo de stretch, pero nadie podría decir cómo se vería una puntuación de 0.7 | Calibrado para que 0.7 de logro sea el trimestre esperado bueno; propuestas sandbagged y moonshots se señalan y corrigen |
| Enfoque estratégico y control | Sin vínculo a una North Star; 5+ objetivos o zoológico de KRs; KRs dependen del trabajo de otros equipos | Se encadena vagamente a la estrategia pero los objetivos están sobrecargados u un KR falla la prueba de control | ≤3 objetivos con ≤4 KRs cada uno, cada objetivo explícitamente se encadena a la North Star, y cada KR está dentro del control del equipo |

## Controles de Calidad

- [ ] Cada KR es medible con una línea base y target
- [ ] Sin KRs basados en output (sin "lanzar X" o "completar Y")
- [ ] Máximo 4 KRs por objetivo
- [ ] Los OKRs conectan con la North Star de empresa o producto
- [ ] Lo suficientemente ambiciosos para que 0.7 de logro sea la puntuación esperada

## Anti-Patrones

- [ ] No aceptes resultados clave basados en output — cualquier KR redactado como "lanzar X" o "completar Y" debe reescribirse como un resultado con una línea base y target
- [ ] No escribas OKRs sin preguntar por la North Star de empresa o producto — OKRs desconectados del contexto estratégico son solo un ejercicio de fijación de objetivos
- [ ] No escribas más de 4 KRs por objetivo — demasiados KRs diluyen el enfoque y hacen la puntuación ambigua al final del trimestre
- [ ] No uses KRs binarios (ship/no-ship) — cada KR debe ser puntuable en una escala 0.0–1.0 basada en grado de logro
- [ ] No omitas la sección health check en líneas base — los OKRs sin líneas base actuales no pueden puntuarse objetivamente al final del trimestre

## Frases de Disparo de Ejemplo

- "Escribe OKRs."
- "Establece objetivos trimestrales."
- "Define resultados clave."
- "Revisa OKRs existentes."
