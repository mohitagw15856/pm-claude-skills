---
# machine-translated to es from skills/metrics-framework/SKILL.md — review: pending. Native fixes welcome via PR.
name: metrics-framework
description: "Construye un marco de métricas para cualquier producto, equipo o negocio. Úsalo cuando se pida un árbol de métricas, marco de KPI, métrica North Star, embudo AARRR, marco HEART, u OKR de métricas. Produce una jerarquía de métricas estructurada desde North Star hasta indicadores adelantados, con orientación sobre medición."
---

# Skill de Marco de Métricas

Este skill construye un marco de métricas completo adaptado a un producto o negocio. Conecta la métrica North Star con indicadores adelantados accionables, dejando claro cuáles métricas rastrear, cuáles optimizar y cómo se relacionan entre sí.

## Entradas Requeridas

Trabaja desde lo que se proporciona. Si falta alguno de estos elementos, aún así produce el resultado completo: completa cada brecha con un supuesto razonable marcado *(asumido, confirmar)* y lista esos supuestos al final. Solo haz una pregunta cuando el tema central en sí está faltando (no hay nada sobre lo que escribir).
- **Descripción del producto o negocio** (un párrafo es suficiente)
- **Modelo de negocio** (SaaS / Marketplace / E-commerce / Aplicación de consumo / B2B / Otro)
- **Etapa** (Pre-PMF / Growth / Scale / Mature)
- **Preferencia de marco** (si tienen una): North Star + Árbol de Métricas / AARRR / HEART / OKRs / Personalizado
- **Objetivo principal este trimestre** (ej. crecer activación, reducir churn, aumentar ingresos)

Si no se especifica preferencia de marco, recomienda el mejor ajuste según etapa y modelo de negocio.

## Lee desde / Escribe en el Cerebro

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo antes de preguntar:

- **Lee primero:** `context.md` para las *definiciones* de métricas que la organización ya acordó (reutilízalas — no redefinas silenciosamente una métrica) y `knowledge/strategy.md` para lo que el negocio está optimizando.
- **Escribe después:** guarda el árbol de métricas y definiciones en `knowledge/`, y cualquier decisión de establecimiento de objetivos en `decisions/`, cada una etiquetada con proveniencia para que un objetivo `[hunch]` no se trate como una meta comprometida.

## Estructura de Salida

### 1. Recomendación de Marco (si no está especificada)

Explica en 2–3 oraciones por qué recomendas este marco para su contexto.

---

### 2. Métrica North Star

**[Nombre de la Métrica]:** [Definición — exactamente qué se mide y cómo]

**Por qué esta es la North Star correcta para este negocio:**
[2–3 oraciones. Debe reflejar valor entregado al cliente, no solo ingresos o actividad. Explica qué comportamiento captura y por qué maximizarla se correlaciona con la salud empresarial a largo plazo.]

**Cómo medirla:** [Fórmula o fuente de datos]
**Línea base actual:** [Deja como [AGREGAR LÍNEA BASE] para que el usuario complete]
**Objetivo:** [Deja como [AGREGAR OBJETIVO] para que el usuario complete]

---

### 3. Árbol de Métricas

Muestra cómo las métricas de apoyo contribuyen a la North Star. Formatea como jerarquía:

```
[Métrica North Star]
├── [Impulsor 1: ej. Adquisición]
│   ├── [Métrica L2: ej. registros orgánicos / semana]
│   └── [Métrica L2: ej. CAC pagado por canal]
├── [Impulsor 2: ej. Activación]
│   ├── [Métrica L2: ej. % usuarios completando onboarding en 7 días]
│   └── [Métrica L2: ej. tiempo para primera acción de valor]
└── [Impulsor 3: ej. Retención]
    ├── [Métrica L2: ej. tasa de retención día 30]
    └── [Métrica L2: ej. profundidad de adopción de features]
```

Para cada métrica L2, proporciona:
- **Definición:** [Qué exactamente se mide]
- **Por qué importa:** [Cómo se conecta con la North Star]
- **¿Adelantada o retrasada?** [Adelantada = predictiva / Retrasada = resultado]
- **Cómo medirla:** [Fuente de datos o cálculo]

---

### 4. Métricas Contrapuestas

[2–3 métricas a vigilar que prevengan optimizar la North Star de formas que dañen el negocio. Ej. "Si optimizamos por registros, necesitamos vigilar la tasa de cuentas spam. Si optimizamos por engagement, necesitamos vigilar el volumen de tickets de soporte."]

---

### 5. Recomendación de Dashboard

Sugiere una estructura de dashboard de 3 niveles:
- **Vista ejecutiva (semanal):** [3–5 métricas — solo resultados]
- **Vista de equipo (diaria):** [7–10 métricas — indicadores adelantados + outputs]
- **Vista de diagnóstico (bajo demanda):** [Métricas en las que profundizar cuando algo se ve mal]

---

### 6. Preguntas de Verificación de Salud de Métricas

[5 preguntas que el equipo debe hacerse en su revisión semanal de métricas para convertir números en insights. Ej. "¿Está mejorando nuestra tasa de activación mientras la retención se mantiene plana? Eso sugiere un problema de calidad del onboarding, no un problema de product-market fit."]

---

## Materiales Más Profundos

Este skill viene con archivos de soporte — úsalos cuando estén disponibles:

- **`references/metric-tree-craft.md`** — Árboles de Métricas Que Impulsan Decisiones (No Dashboards). Aplícalo mientras produces el resultado; lleva la calibración y juicios de valor que el resumen de método anterior comprime.
- **`templates/metric-tree.md`** — una versión rellenable del entregable con las puertas de calidad en línea. Ofrécela cuando el usuario quiera trabajar el documento por sí mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de este skill antes de entregarla; 32+ es calidad de envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Validez de North Star | North Star es actividad empresarial (GMV, ingresos, pageviews) o volumen de vanidad | North Star gesticula hacia valor del cliente pero su definición deja casos límite sin contar (cancelaciones, disputas, reembolsos) | North Star cuenta el valor realmente entregado al cliente, con casos límite resueltos en la definición y alternativas rechazadas nombradas con razones |
| Integridad causal del árbol | Métricas L2 son una lista plana de KPI sin vínculo causal con la North Star; los impulsores se superponen o son todos de una categoría | Impulsores distintos, pero algunas métricas L2 correlacionan en lugar de impulsar la North Star, o las etiquetas adelantada/retrasada son adivinanzas | 3–4 impulsores distintos donde mover cualquier métrica L2 plausiblemente mueve la North Star, con etiquetas honestas adelantada/retrasada — incluyendo admitir que la métrica objetivo es retrasada cuando lo es |
| Precisión de definición | Métricas nombradas sin fórmula, fuente de datos o ventana de tiempo | La mayoría de métricas tienen fórmulas, pero al menos una sería calculada diferentemente por dos analistas razonables | Cada métrica especifica fórmula, tabla de fuente o evento, y ventana con precisión suficiente para que dos analistas obtengan el mismo número |
| Resistencia al gaming | Sin métricas contrapuestas; cada métrica asumida ser optimizada de buena fe | Métricas contrapuestas genéricas listadas pero no apareadas a la métrica específica que protegen | Cada métrica optimizable está apareada con una métrica contrapuesta que nombra el movimiento perverso exacto que captura (aceptar-luego-cancelar, retención comprada con descuento, suministro fantasma) |

## Controles de Calidad

- [ ] North Star refleja valor del cliente, no solo actividad empresarial
- [ ] Árbol de métricas tiene 3–4 impulsores distintos (no todos de una categoría)
- [ ] Cada métrica L2 está clasificada como adelantada o retrasada
- [ ] Métricas contrapuestas incluidas para prevenir incentivos perversos
- [ ] Niveles de dashboard adaptados a la etapa del producto
- [ ] Todas las definiciones de métricas son inequívocas (fórmula o descripción clara)

## Anti-Patrones

- [ ] No establezcas una métrica North Star que mida actividad empresarial (ingresos, pageviews) en lugar de valor del cliente entregado — esto crea incentivos desalineados con la calidad del producto
- [ ] No definas métricas sin especificar la fórmula o fuente de datos — una métrica ambigua será medida diferentemente por diferentes personas
- [ ] No omitas métricas contrapuestas — optimizar cualquier métrica única sin un guardarraíl eventualmente producirá incentivos perversos
- [ ] No incluyas más de 4–5 métricas en una vista de equipo diaria — un dashboard con 20 métricas es un dashboard que nadie mira
- [ ] No clasifiques todas las métricas como "adelantadas" — sé honesto sobre cuáles son métricas de resultado retrasado y cuáles genuinamente predicen resultados futuros

## Frases de Activación de Ejemplo

- "Construye un marco de métricas para [producto]"
- "¿Cuál debería ser nuestra métrica North Star?"
- "Crea un árbol de KPI para [negocio]"
- "Dame un desglose AARRR para [producto]"
- "¿Qué métricas debería rastrear nuestro equipo de [tipo de equipo]?"
