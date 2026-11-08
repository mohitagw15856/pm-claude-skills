---
# machine-translated to es from skills/retention-analysis/SKILL.md — review: pending. Native fixes welcome via PR.
name: retention-analysis
description: "Estructura un análisis de retención, investigación de churn o deep-dive de engagement para cualquier equipo de producto. Utiliza cuando se te pida analizar la retención de usuarios, investigar churn, medir DAU/MAU o construir un plan de mejora de retención. Produce una snapshot de retención con hipótesis de causa raíz, correlación de aha-moment e intervenciones priorizadas."
---

# Skill de Análisis de Retención

Diagnostica por qué los usuarios se van, identifica qué los mantiene y recomienda intervenciones específicas y testables — no sugerencias vagas como "mejorar onboarding".

## Fundamentos de Retención

**La curva de retención tiene dos componentes:**
1. **Inclinación de la caída inicial** (D1–D7) — problema de onboarding
2. **Nivel base a largo plazo** — indicador de product-market fit

Un producto con PMF tiene una curva de retención que se aplana. Si tiende a cero, tienes un problema de PMF, no de onboarding. Nombra esta distinción explícitamente.

---

## Definiciones de Métricas de Retención

| Métrica | Fórmula | Qué te dice |
|---|---|---|
| Retención D1 | Usuarios que regresan el día 2 ÷ usuarios nuevos día 1 | Calidad de la primera experiencia |
| Retención D7 | Usuarios activos el día 8 ÷ usuarios que se unieron hace 7 días | Formación temprana de hábito |
| Retención D30 | Usuarios activos el día 31 ÷ usuarios que se unieron hace 30 días | Señal de product-market fit |
| Ratio DAU/MAU | Usuarios activos diarios ÷ usuarios activos mensuales | Stickiness (>20% bueno, >50% excelente) |
| Churn Rate | Usuarios perdidos en período ÷ usuarios al inicio del período | Mensual o anual |
| Net Revenue Retention | MRR al final del período ÷ MRR al inicio (misma cohorte) | Salud de ingresos incluyendo expansion |

---

## Marco de Investigación de Retención

### Paso 1: Segmenta el problema
No analices "retención" — analiza retención para cohortes específicas:
- Usuarios nuevos vs retornantes
- Pagados vs free
- Canal de adquisición (orgánico vs pagado vs referral)
- Onboarding completado vs no completado
- Uso de features (power users vs lurkers)

### Paso 2: Encuentra los puntos de inflexión
¿Dónde ocurre la caída? ¿D1? ¿D7? ¿Mes 3?
- Caída D1 → Experiencia de primera sesión
- Caída D7 → Habit loop no formado
- Caída D30 → Valor no entregado en profundidad
- Caída Mes 3+ → Aburrimiento, competencia o evento de ciclo de vida

### Paso 3: Identifica la correlación del "aha moment"
¿Qué comportamiento temprano predice retención a largo plazo?
- Ejecuta correlación: usuarios que hicieron [X] en los primeros 7 días vs retención de 30 días
- Patrones comunes: conectaron una integración, invitaron a un compañero, completaron una acción core N veces

### Paso 4: Califica el churn
Entrevista a usuarios que hicieron churn — nunca lo saltes. Los datos de encuestas solos son insuficientes.
- "¿Cuál fue el trigger que te llevó a cancelar/dejar de usar?"
- "¿Qué estabas intentando lograr que no pudiste?"
- "¿Qué tendría que cambiar para que regreses?"

---

## Formato de Output

### Análisis de Retención — [Producto/Segmento] — [Fecha]

**Pregunta:** [Pregunta de retención específica siendo respondida]
**Período Analizado:** [Rango de fechas]
**Segmento:** [Qué usuarios]

---

**Snapshot Actual de Retención:**

| Métrica | Actual | Benchmark Industria | Estado |
|---|---|---|---|
| Retención D1 | [X%] | 25–40% | 🔴/🟡/🟢 |
| Retención D7 | [X%] | 10–25% | 🔴/🟡/🟢 |
| Retención D30 | [X%] | 5–15% | 🔴/🟡/🟢 |
| DAU/MAU | [X%] | 10–20% típico | 🔴/🟡/🟢 |

**Forma de la Curva de Retención:** [Aplana / Aún decayendo / Tiende a cero]
**Señal PMF:** [Fuerte / Débil / Ausente — basado en forma de curva]

---

**Hipótesis de Causa Raíz:**

| Hipótesis | Evidencia | Confianza | Test |
|---|---|---|---|
| [Causa] | [Punto de dato] | A/M/B | [Cómo validar] |

**Correlación de "Aha Moment":**
Usuarios que [acción específica] en los primeros [N] días retienen al [X%] vs [Y%] para quienes no lo hacen.

---

**Intervenciones Recomendadas:**

| Intervención | Caída Target | Lift Esperado | Esfuerzo | Prioridad |
|---|---|---|---|---|
| [Cambio específico] | D1 / D7 / D30 | [X%] | C/M/G | 1/2/3 |

**Plan de Monitoreo:**
- Métrica a trackear: [X]
- Cadencia de revisión: [Semanal / Mensual]
- Umbral de alerta: [Si X cae por debajo de Y, investiga inmediatamente]

---

## Inputs Requeridos

Pide al usuario estos datos si no están provistos:
- **Producto y modelo de negocio** (SaaS / aplicación de consumidor / marketplace / otro)
- **Métricas de retención actuales** (D1, D7, D30 si están disponibles)
- **Segmento a analizar** (todos los usuarios / pagados / free / una cohorte específica)
- **Pregunta clave a responder** (¿por qué cae la retención? ¿qué impulsa la retención?)
- **Datos disponibles** (eventos de analytics, encuestas de churn, notas de entrevistas)

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/curve-reading.md`** — Leer curvas de retención sin engañarse. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/retention-readout.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Diagnóstico de la curva | Informa una cifra de retención sin la forma de la curva | Se muestra la forma, pero no se interpreta | Se diagnostica explícitamente si se aplana o tiende a cero y se vincula a lo que significa (encaje producto-mercado frente a problema de onboarding) |
| Disciplina de cohortes | Todos los usuarios agrupados en una única tasa combinada | Cohortes separadas pero leídas como un volcado de tabla | Cohortes segmentadas antes del análisis, con la cohorte divergente señalada y explicada |
| Vínculo con el momento "ajá" | La activación nunca se conecta con la retención | Se afirma una correlación sin datos ni salvedades | Se identifica con evidencia el comportamiento que separa a los usuarios retenidos de los que abandonan, o se marca honestamente como desconocido con un plan para averiguarlo |
| Especificidad de las intervenciones | Consejos del tipo "mejorar el onboarding" | Acciones concretas pero sin plan de medición | Las intervenciones nombran el momento del usuario al que apuntan, más un plan de seguimiento con umbral de alerta y entrevistas a usuarios que abandonaron |

## Checklists de Calidad

- [ ] La forma de la curva de retención está diagnosticada (aplana vs tiende a cero = PMF vs onboarding)
- [ ] Las cohortes están segmentadas antes del análisis (no todos los usuarios agrupados)
- [ ] La correlación de "aha moment" está identificada o marcada como desconocida
- [ ] Las intervenciones son específicas (no "mejorar onboarding")
- [ ] Las entrevistas de usuarios con churn se recomiendan (no solo análisis de datos)
- [ ] El plan de monitoreo incluye un umbral de alerta

## Anti-Patrones

- [ ] No recomiendes "mejorar onboarding" sin especificar qué paso exacto cambiar y por qué
- [ ] No analices retención sin segmentar por cohorte — las curvas de retención agregadas ocultan patrones específicos de cohorte
- [ ] No trates DAU/MAU por debajo de 5% como problema de retención — a ese nivel, es un problema de product-market fit
- [ ] No saltes investigación cualitativa — las entrevistas de usuarios con churn revelan razones que los datos cuantitativos no pueden
- [ ] No establezcas una alerta de monitoreo sin especificar el umbral que la dispara

## Directrices

- Nunca recomiendes "mejorar onboarding" sin especificar *qué* cambiar y *por qué*
- Haz benchmark contra la industria — aplicaciones de consumidor, SaaS y marketplaces tienen norms de retención muy diferentes
- Si DAU/MAU está por debajo de 5%, esa es una conversación de PMF, no una conversación de tácticas de retención
- Siempre recomienda hablar con usuarios con churn — ninguna cantidad de datos reemplaza entender la *razón*

## Frases de activación de ejemplo

- "Analiza la retención de usuarios."
- "Investiga el abandono."
- "Construye un plan de mejora de la retención."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/retention-analysis.html
