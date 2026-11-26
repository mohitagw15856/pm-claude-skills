---
# machine-translated to es from skills/go-to-market/SKILL.md — review: pending. Native fixes welcome via PR.
name: go-to-market
description: "Crea activos de go-to-market para cualquier producto o feature. Úsalo cuando necesites un plan GTM, declaración de posicionamiento, plan de lanzamiento de producto, pilares de mensajería, casos de uso o lista de features/beneficios. Produce un pack GTM completo: declaración de posicionamiento, pilares de mensajería, mapeo de features a beneficios y casos de uso específicos por rol. Para un plan de lanzamiento por fases con coordinación multidisciplinar, usa go-to-market-planner en su lugar."
---

# Skill Go-To-Market

Este skill produce un pack completo de activos go-to-market para un producto, feature o iniciativa. Sigue el marco de posicionamiento de Geoffrey Moore y estructura todos los outputs para usar en decks de ventas, landing pages, emails de lanzamiento y documentos de alineación interna.

## Trabajar desde un brief

A menudo recibirás un brief corto sin todos los detalles. **Siempre entrega el pack GTM completo de todas formas** — no pares para hacer preguntas ni dejes placeholders entre corchetes como `[AÑADIR PRUEBA]` o `[Capacidad técnica]`. Cuando falte un detalle (diferenciadores, pruebas, features), infiere unos concretos y realistas a partir de la descripción del producto y el cliente objetivo, y marca cualquier cosa inferida como *(asumido — confirmar)*. Una suposición concreta y etiquetada siempre es mejor que un vacío.

## Inputs (infiere los no proporcionados — etiqueta suposiciones)

- **Nombre del producto/feature**
- **Descripción de una línea** (qué hace, técnicamente)
- **Cliente objetivo** (rol, tamaño de empresa, sector si es relevante)
- **Problema principal que resuelve**
- **Competidor clave o alternativa** (qué hace hoy la gente sin esto)
- **Top 3 diferenciadores**

## Lee desde / Escribe a la Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo antes de preguntar:

- **Lee primero:** `context.md` (producto, ICP, voz), `knowledge/market.md` y `knowledge/strategy.md`, y la correspondiente entidad `entities/` del feature siendo lanzado.
- **Escribe después:** guarda el plan de lanzamiento en `entities/`, y cualquier decisión de posicionamiento o canal en `decisions/`, cada una etiquetada con su origen.

## Estructura de Output

Siempre produce las cuatro secciones de abajo en orden.

---

### 1. Declaración de Posicionamiento

Usa el formato de Geoffrey Moore exactamente:

> Para **[cliente objetivo]** que **[tiene este problema o necesidad]**, **[Nombre del Producto]** es un **[categoría de producto]** que **[beneficio/resultado clave]**. A diferencia de **[alternativa primaria o competidor]**, nuestro producto **[diferenciador clave]**.

Escribe una declaración de posicionamiento primaria, luego ofrece una versión de tagline más corta (10 palabras o menos) adecuada para un titular hero.

---

### 2. Pilares de Mensajería

Genera 3–5 pilares de mensajería. Cada pilar debe incluir:

- **Nombre del pilar** (2–4 palabras, negrita)
- **Resumen de una oración** de lo que este pilar afirma
- **2–3 pruebas** (específicas y respaldadas por evidencia; si no se proporcionaron datos, infiere una prueba realista y márcala *(asumido)* — nunca dejes un placeholder vacío)
- **Ejemplo de uso en copy** (una oración tal como aparecería en una landing page o deck)

Los pilares deben ser distintos — evita solapamientos. Cada pilar debe ser defensible frente al competidor primario.

---

### 3. Lista de Features & Funcionalidades

Produce una tabla de dos columnas:

| Feature / Funcionalidad | Beneficio para el Comprador (qué significa para el usuario) |
|---|---|
| [Capacidad técnica] | [Resultado en lenguaje plano — comienza con un verbo: "Reduce...", "Permite...", "Elimina..."] |

Reglas:
- Nunca listes un feature sin su beneficio correspondiente
- Los beneficios deben referenciar el workflow o pain point del cliente objetivo
- Apunta a 6–12 filas; si se dieron solo 1–2 features, infiere el resto de forma plausible a partir de la descripción del producto
- Evita jerga en la columna de beneficios — escribe como si explicaras a un comprador, no a un ingeniero

---

### 4. Casos de Uso

Genera 3–5 casos de uso específicos por rol. Cada caso de uso debe seguir este formato:

**Caso de Uso [N]: [Rol] — [Título del Escenario]**

- **Quién:** [Título del trabajo / rol]
- **Situación:** [El momento específico o disparador que los lleva a usar el producto]
- **Antes:** [Lo que tenían que hacer sin este producto — sé específico sobre tiempo, fricción o riesgo]
- **Con [Nombre del Producto]:** [Lo que hacen ahora — acción concreta, no beneficio vago]
- **Resultado:** [Resultado medible o tangible]

Los casos de uso deben cubrir diferentes personas compradoras si es posible (p. ej. usuario final, gestor, administrador).

---

## Materiales Más Profundos

Este skill se distribuye con archivos de apoyo — úsalos cuando estén disponibles:

- **`references/messaging-hierarchy.md`** — La Jerarquía de Mensajería: Una Afirmación, Luego Todo Lo Demás. Aplícala mientras produces el output; lleva los calibrados y juicios que el resumen del método de arriba comprime.
- **`templates/gtm-pack.md`** — una versión para rellenar del entregable con los quality gates en línea. Ofrécela cuando el usuario quiera trabajar el documento él mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier output de este skill antes de entregarlo; 32+ es calidad ship.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Precisión del posicionamiento | Declaración de valor genérica, sin target o alternativa | Formato Moore seguido pero la cláusula "a diferencia de" es blanda | Formato Moore con un segmento target agudo y un "a diferencia de" que nombra la alternativa real que los compradores pesan |
| Integridad mensaje-prueba | Pilares son afirmaciones no soportadas | Existen pruebas pero algunas son afirmaciones reiteradas | Cada pilar lleva ≥2 pruebas genuinas (o placeholders honestamente etiquetados), y la jerarquía lidera con una afirmación |
| Conversión feature-a-beneficio | Lista de features sin beneficios | Beneficios presentes pero pasivos o con forma de feature | Cada feature emparejado con un beneficio de verbo-acción que un comprador repetiría a su jefe |
| Usabilidad de lanzamiento | Un ensayo de posicionamiento, no un pack | Pack completo pero piezas inconsistentes entre sí | Tagline, pilares, casos de uso y lista de beneficios todos cuentan la misma historia y están listos para usar en una landing page |

## Quality Checks

Antes de entregar output, verifica:
- [ ] La declaración de posicionamiento sigue el formato Moore exactamente
- [ ] El tagline tiene 10 palabras o menos
- [ ] Cada pilar tiene al menos 2 pruebas (o placeholders etiquetados)
- [ ] Cada feature tiene un beneficio — sin features huérfanos
- [ ] Los beneficios comienzan con verbos de acción
- [ ] Los casos de uso incluyen estructura Antes/Después
- [ ] El lenguaje es consistente con el vocabulario del cliente objetivo (no términos de ingeniería internos)

## Anti-Patrones

- [ ] No escribas descripciones de features en lugar de beneficios — el pack GTM debe traducir features en valor para el cliente
- [ ] No uses la misma mensajería en todos los buyer personas — cada rol tiene diferentes prioridades y lenguaje
- [ ] No crees una declaración de posicionamiento que pudiera aplicar a cualquier competidor — la diferenciación debe ser específica y defensible
- [ ] No saltes la sección "no para" — definir quién no es para esto afila el posicionamiento y previene esfuerzos de ventas misdirected
- [ ] No listes casos de uso sin vincularlos a títulos de trabajo específicos o roles de comprador

## Frases de Trigger de Ejemplo

- "Crea una declaración de posicionamiento para [producto]"
- "Escribe un plan GTM para [feature]"
- "Dame los pilares clave para [nombre del producto]"
- "Construye una lista de features y casos de uso para [producto]"
- "Estamos lanzando [X] — ayúdame con la mensajería"
