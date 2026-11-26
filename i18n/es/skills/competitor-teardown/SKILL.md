---
# machine-translated to es from skills/competitor-teardown/SKILL.md — review: pending. Native fixes welcome via PR.
name: competitor-teardown
description: "Produce un análisis competitivo estructurado para cualquier producto o mercado. Úsalo cuando se te pida un análisis competitivo, desglose competitivo, comparación de mercado, SWOT o mapa de posicionamiento. Genera un desglose estructurado con mapa de posicionamiento, comparativa de características, brechas de mensajería y recomendaciones estratégicas. Para un documento completo de landscape con matriz de características y análisis de victorias/derrotas usa competitive-analysis en su lugar."
---

# Skill de Desglose Competitivo

Esta skill produce un documento de análisis competitivo completo — estructurado para usar en decks de estrategia, materiales de inversores, habilitación de ventas o sesiones de planificación de producto.

## Inputs Requeridos

Trabaja con lo que se te proporciona. Si falta algo de esto, aún así produce el output completo: rellena cada brecha con una suposición razonable marcada *(asumido, confirmar)* y enumera esas suposiciones al final. Haz una pregunta solo cuando el tema central mismo esté ausente (no hay nada sobre lo que escribir).
- **Tu producto** (nombre + descripción de una línea)
- **Competidores a analizar** (lista de 2–5 nombres; si no se proporciona, pregunta)
- **Profundidad del análisis** (descripción general rápida / desglose detallado)
- **Caso de uso primario para este análisis** (p.ej. habilitación de ventas, deck de inversores, estrategia interna, planificación de producto)

## Materiales Más Profundos

- **`references/intel-sourcing-guide.md`** — de dónde provienen los hechos competitivos (cuatro niveles de fuente), qué fuente usar por sección de desglose, las etiquetas de confianza [verified]/[reported]/[assumed], y la línea ética. Aplica su etiquetado a cada afirmación sustantiva en el output.
- **`templates/teardown-skeleton.md`** — un desglose rellenable con las etiquetas de confianza y una cola de verificación incorporada. Ofrécelo cuando el usuario quiera reunir la información por su cuenta.

## Estructura de Output

### 1. Descripción General del Landscape Competitivo

Un párrafo resumiendo la dinámica del mercado: quiénes son los actores clave, cómo se segmenta el mercado, y dónde se encuentra el espacio blanco. Mantén esto bajo 150 palabras — es el resumen ejecutivo.

### 2. Mapa de Posicionamiento

Describe un mapa de posicionamiento 2x2 en forma de texto (ya que no puedes renderizar imágenes):

- Define los dos ejes relevantes para este mercado (p.ej. "Facilidad de Uso vs. Profundidad de Características" o "Precio vs. Preparación Empresarial")
- Coloca cada competidor en un cuadrante con una justificación de una frase
- Coloca el producto del usuario y destaca la implicación estratégica

### 3. Tabla Comparativa de Características

| Característica / Capacidad | [Tu Producto] | [Competidor A] | [Competidor B] | [Competidor C] |
|---|---|---|---|---|
| [Característica] | ✅ / ❌ / 🟡 Parcial | | | |

Usa ✅ (lo tiene), ❌ (no lo tiene), 🟡 (parcial/limitado). Añade una columna "Notas Estratégicas" para características donde la diferencia es un punto de venta significativo o un riesgo.

Incluye 10–15 filas. Si el usuario no ha proporcionado detalles de características, señala qué celdas necesitan ser verificadas.

### 4. Análisis de Mensajería

Para cada competidor, analiza su mensajería dirigida al público (titular del sitio web, tagline, propuesta de valor primaria):

**[Nombre del Competidor]**
- **Su afirmación principal:** [qué dicen que hacen]
- **Señal de audiencia objetivo:** [a quién parecen estar dirigiéndose basado en lenguaje/imágenes]
- **Gancho emocional:** [miedo / aspiración / autoridad / velocidad / simplicidad]
- **Brecha o debilidad en su mensajería:** [qué no abordan que tu producto podría apropiar]

### 5. Resumen SWOT

Produce un SWOT limpio para el producto del usuario en el contexto de este landscape competitivo:

- **Fortalezas:** [2–3 diferenciadores genuinos]
- **Debilidades:** [2–3 brechas honestas o vulnerabilidades]
- **Oportunidades:** [2–3 brechas de mercado o debilidades de competidores para explotar]
- **Amenazas:** [2–3 movimientos de competidores o cambios de mercado a vigilar]

### 6. Recomendaciones Estratégicas

3–5 recomendaciones accionables basadas en el análisis. Enmarca cada una como: **"Dado [observación], [tu producto] debería [acción] para [resultado]."**

## Rúbrica de Puntuación (0–40)

Puntúa cualquier output de esta skill antes de entregarlo; 32+ es calidad lista para enviar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Significado del mapa | Los ejes son genéricos (precio × calidad) | Ejes específicos del mercado pero posiciones injustificadas | Los ejes capturan la tensión de compra real en este mercado y cada posición es defendible |
| Profundidad comparativa | La tabla de características son casillas de verificación | Características comparadas con algunas notas | Los diferenciadores llevan notas estratégicas explicando por qué la brecha importa y a quién |
| Honestidad SWOT | Debilidades/amenazas suavizadas a amabilidades | Honesto pero sin priorizar | Debilidades y amenazas expresadas claramente, clasificadas por cuánto deberían preocuparte |
| Especificidad de recomendaciones | Consejo estratégico genérico | Accionable pero desvinculado de los hallazgos | Cada recomendación sigue "dado [observación], haz [acción] para [resultado]" y se conecta al análisis |

## Verificaciones de Calidad

- [ ] Los ejes en el mapa de posicionamiento son significativos y específicos para este mercado
- [ ] La tabla de características incluye notas estratégicas sobre diferenciadores clave
- [ ] El análisis de mensajería cubre todos los competidores nombrados
- [ ] El SWOT es honesto — Debilidades y Amenazas no deben ser suavizadas
- [ ] Las recomendaciones son específicas y accionables, no consejos estratégicos genéricos

## Anti-Patrones

- [ ] No marques la presencia de características como equivalente entre competidores sin notar diferencias de calidad — ambos productos pueden tener "informes" mientras que el de uno es significativamente mejor
- [ ] No posiciones el producto del usuario en el cuadrante más favorable sin justificación — un mapa de posicionamiento que favorece a uno mismo e ignora la presión competitiva real no proporciona valor estratégico
- [ ] No suavices Debilidades o Amenazas en el SWOT — un SWOT que solo celebra fortalezas es un documento de marketing, no una herramienta de estrategia
- [ ] No incluyas afirmaciones inverificables sobre capacidades de competidores sin señalarlas como suposiciones — presentar rumores como hechos daña la credibilidad analítica

## Frases Desencadenantes de Ejemplo

- "Haz un análisis competitivo de [Producto] vs [Competidor A] y [Competidor B]"
- "Desglosame el posicionamiento de [Competidor]"
- "Dame un landscape competitivo para [mercado]"
- "Construye un SWOT para nuestro producto contra [competidor]"
