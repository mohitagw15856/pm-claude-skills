---
# machine-translated to es from skills/data-analysis-standard/SKILL.md — review: pending. Native fixes welcome via PR.
name: data-analysis-standard
description: "Estructura un análisis de datos de producto, análisis profundo de métricas, análisis de embudo o estudio de cohortes. Úsalo cuando te pidan analizar métricas de producto, investigar una caída en conversión, explicar un cambio de datos a stakeholders o encontrar la causa raíz de un movimiento de métrica. Produce un análisis estructurado con pregunta, causa raíz, nivel de confianza y acción recomendada."
---

# Skill de Análisis de Datos Estándar

Convierte números en bruto en decisiones de producto. Estructura cada análisis con una pregunta clara, metodología, hallazgo y acción recomendada.

## Marco de Análisis: El Método de las 4 Preguntas

Todo análisis comienza aquí:
1. **¿Qué cambió?** (describe la métrica y su movimiento)
2. **¿Por qué cambió?** (causa raíz — segmento, paso de embudo, cohorte, canal)
3. **¿Y qué?** (impacto en el negocio o producto)
4. **¿Ahora qué?** (acción recomendada con nivel de confianza)

Nunca entregues datos sin responder las cuatro. Un gráfico sin narrativa no es un análisis.

---

## Plantilla de Triaje de Métrica

Úsala cuando una métrica se ha movido inesperadamente:

```
MÉTRICA: [Nombre]
MOVIMIENTO: [X% de cambio en Y período]
LÍNEA BASE: [Cuál era lo normal]

VERIFICACIÓN DE SEGMENTACIÓN:
- ¿Por plataforma (iOS / Android / Web)?
- ¿Por cohorte de usuario (nuevos / retornantes / usuarios avanzados)?
- ¿Por canal de adquisición?
- ¿Por geografía?
- ¿Por plan/tier?

HIPÓTESIS DE CAUSA RAÍZ:
1. [Explicación más probable] — Evidencia: [punto de datos]
2. [Explicación alternativa] — Evidencia: [punto de datos]
3. [Descartar] — Eliminado porque: [razón]

CONCLUSIÓN: [Respuesta de una oración a "¿por qué cambió esto?"]
CONFIANZA: [Alta / Media / Baja] — basado en [datos disponibles]
```

---

## Estructura de Análisis de Embudo

| Etapa | Métrica | Actual | Referencia/Objetivo | Caída % | Notas |
|---|---|---|---|---|---|
| [Parte superior del embudo] | [Usuarios] | [N] | [N] | — | |
| [Paso 2] | [Usuarios] | [N] | [N] | [X%] | |
| [Paso 3] | [Usuarios] | [N] | [N] | [X%] | |
| [Conversión] | [Usuarios] | [N] | [N] | [X%] | |

**Mayor caída:** [Paso X → Paso Y] — Hipótesis: [razón]
**Investigación recomendada:** [consulta específica o test]

---

## Directrices de Análisis de Cohortes

Siempre define:
- **Definición de cohorte:** [Lo que agrupa a usuarios — semana de signup, primera acción, tipo de plan]
- **Métrica de retención:** [Qué cuenta como retención — login, acción principal, ingresos]
- **Ventana de retención:** [D1, D7, D30, W4, M3, etc.]

Produce una tabla de retención de cohortes y anota:
- Retención de línea base para cada cohorte
- Cohortes que sobre/bajo rendimiento y por qué (lanzamiento de feature? campaña? estacional?)
- Dirección de tendencia entre cohortes (mejorando / declinando / estable)

---

## Formato de Salida de Análisis para Stakeholders

### [Título del Análisis] — [Fecha]

**Pregunta que se responde:** [Pregunta específica en lenguaje claro]
**Período de tiempo:** [Rango de fechas]
**Fuente de datos:** [De dónde vienen los datos]

**Hallazgo:**
> [Resumen de 1-2 oraciones en lenguaje claro de lo que muestran los datos]

**Gráfico / tabla clave:** [Incluir o describir]

**Causa raíz:** [Mejor explicación con evidencia]

**Nivel de confianza:** [Alto / Medio / Bajo] — [razón]

**Acción recomendada:**
1. [Acción inmediata — responsable, plazo]
2. [Investigación necesaria — qué revisar a continuación]
3. [Monitoreo — qué métrica revisar y con qué cadencia]

**Lo que este análisis NO nos dice:** [Caveat importante — qué datos faltan o qué no puede concluirse]

---

## Entradas Requeridas

Trabaja con lo que se te da. Si falta alguna de estas, aun así produce la salida completa: completa cada brecha con una suposición razonable marcada *(asumido, confirmar)* y lista esas suposiciones al final. Haz una pregunta solo cuando el tema central mismo esté ausente (no hay nada sobre lo que escribir).
- **Métrica o pregunta** siendo investigada
- **Período de tiempo** (qué cambió, de cuándo a cuándo)
- **Datos disponibles** (qué segmentos, fuentes o consultas tienes acceso)
- **Contexto de negocio** (qué decisión informa este análisis)
- **Audiencia** (quién leerá esto — ejecutivo / equipo / equipo de datos)

## Materiales Más Profundos

Este skill incluye archivos de apoyo — úsalos cuando estén disponibles:

- **`references/analysis-integrity.md`** — Integridad del Análisis: las Verificaciones Entre Consulta y Conclusión. Aplícalo mientras produces la salida; contiene la calibración y juicios que el resumen del método anterior comprime.
- **`templates/analysis-writeup.md`** — una versión rellenable del entregable con las puertas de calidad inline. Ofrecela cuando el usuario quiera trabajar el documento él mismo en lugar de que sea generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de este skill antes de entregarla; 32+ es de calidad para envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Completitud de las cuatro preguntas | Describe qué cambió y se detiene | Cubre qué/por qué pero "y qué / ahora qué" son débiles | Las cuatro respondidas con profundidad proporcional; el "ahora qué" está listo para decisión |
| Evidencia detrás de la causa raíz | Causa raíz afirmada desde intuición | Un punto de datos de apoyo, alternativas sin examinar | Causa raíz probada contra al menos una explicación rival, con la evidencia discriminante mostrada |
| Honestidad sobre la incertidumbre | Se lee como cierto; sin declaración de confianza | Confianza declarada pero no justificada | Nivel de confianza justificado, y "lo que los datos no pueden decirnos" nombra los puntos ciegos reales, no los simbólicos |
| Accionabilidad | Hallazgos sin acción | Acción nombrada pero sin dueño o fecha | Acción recomendada tiene dueño, plazo y efecto esperado declarado digno de revisar después |

## Verificaciones de Calidad

- [ ] El análisis responde las 4 preguntas: qué cambió, por qué, y qué, ahora qué
- [ ] La causa raíz tiene evidencia (no solo hipótesis)
- [ ] El nivel de confianza está declarado y justificado
- [ ] Lo que los datos no pueden decirnos está explícitamente nombrado
- [ ] La acción recomendada incluye un dueño y plazo

## Antipatrones

- [ ] No presentes correlaciones como causalidad — siempre declara la distinción explícitamente
- [ ] No reportes un movimiento de métrica sin declarar la ventana de tiempo y la línea base de comparación
- [ ] No saltes el "y qué" — observaciones en bruto sin acciones recomendadas son análisis incompleto
- [ ] No exageres la confianza — etiqueta hipótesis claramente y nota qué datos serían necesarios para confirmarlas
- [ ] No ignores los desgloces de segmento — las métricas agregadas pueden enmascarar tendencias opuestas en subsegmentos

## Directrices

- Siempre declara lo que los datos *no pueden* decirte — nunca sobrevenda la confianza
- Las correlaciones no son causalidad — señala esto cada vez
- Si el usuario no tiene línea base, recomienda establecer una antes de sacar conclusiones
- Recomienda el gráfico más simple para cada hallazgo: barras para comparación, líneas para tendencias, dispersión para correlación, tabla para desgloces detallados
- Siempre especifica la ventana de tiempo — "la conversión bajó" es sin sentido sin "de X a Y en el período Z"

## Frases de Activación de Ejemplo

- "Analiza métricas de producto."
- "Investiga una caída en conversión."
- "Explica un cambio de datos a stakeholders."
- "Encuentra la causa raíz de un movimiento de métrica."
