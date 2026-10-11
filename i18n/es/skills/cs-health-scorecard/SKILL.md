---
# machine-translated to es from skills/cs-health-scorecard/SKILL.md — review: pending. Native fixes welcome via PR.
name: cs-health-scorecard
description: "Construir un cuadro de mando de salud del cliente para una cuenta específica. Úsalo cuando te pidan calificar la salud de la cuenta, evaluar el riesgo de renovación, construir un panel de salud o evaluar la probabilidad de que una cuenta se renueve o expanda. Produce un cuadro de mando de salud estructurado con estado RAG, puntuaciones de dimensiones, riesgos clave y acciones recomendadas."
---

# Skill de Cuadro de Mando de Salud del Cliente

Produce un cuadro de mando de salud estructurado e impulsado por datos para una cuenta de cliente, dando al CSM y la dirección una vista clara del riesgo de renovación, potencial de expansión y las acciones necesarias para mover la cuenta en la dirección correcta.

## Lee desde / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), usa la información disponible en lugar de volver a preguntar lo que ya sabes:

- **Lee primero:** el archivo `entities/` de la cuenta, sus `stakeholders/` (campeón, comprador económico, detractores) y `knowledge/`. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<nombre de la cuenta>"` y transmite cada etiqueta de procedencia del hecho.
- **📥 Propón al Brain:** después de producir, propón registrar el veredicto de salud + riesgos clave en el archivo `entities/` de la cuenta, y una entrada de riesgo de renovación en `decisions/` si se toma una decisión, cada una etiquetada con procedencia. Muéstrales, obtén un sí, luego escribe con `../professional-brain/scripts/brain_write.py … --commit` (solo adjuntar, seco por defecto).

## Entradas Requeridas

Pide estas si no se proporcionan ya:
- **Nombre de la cuenta** y nivel (enterprise / mid-market / SMB)
- **Valor del contrato** (ARR) y **fecha de renovación**
- **Datos de uso del producto** — inicios de sesión, ratio DAU/MAU, adopción de características clave
- **Datos de soporte** — tickets abiertos, puntuación CSAT o NPS, escaladas recientes
- **Datos de engagement** — fecha del último QBR, estado del patrocinador ejecutivo, nombre del campeón
- **Datos comerciales** — historial de pagos, conversaciones de expansión, asientos usados vs. licenciados
- **Cualquier riesgo conocido o cambio reciente** en la cuenta

## Marco de Puntuación

Puntúa cada dimensión del 1 al 5. Pondera como se muestra. Calcula el total ponderado sobre 100.

| Dimensión | Peso | Qué Puntuar |
|---|---|---|
| **Adopción de Producto** | 30% | Ratio DAU/MAU, amplitud de características utilizadas, usuarios avanzados identificados |
| **Engagement** | 20% | Cadencia de QBR, patrocinador ejecutivo activo, fortaleza del campeón |
| **Resultados** | 20% | Cliente logrando sus objetivos declarados / métricas de éxito |
| **Salud del Soporte** | 15% | Tendencia de volumen de tickets, escaladas sin resolver, CSAT |
| **Comercial** | 15% | Pagos puntuales, asientos utilizados, señales de expansión |

**Conversión Puntuación → RAG:**
- 80–100: Verde (saludable, renovación probable)
- 60–79: Ámbar (en riesgo, necesita atención)
- 0–59: Rojo (riesgo alto de churn, escalar)

## Ayudante Programático

Este skill incluye un script de Python que usa solo la biblioteca estándar y aplica los pesos anteriores, convirtiendo el total ponderado a un estado RAG, de modo que la puntuación principal se calcula de manera idéntica cada vez y los pesos siempre suman el 100%.

```bash
# Cinco puntuaciones 1-5 en orden: adopción engagement resultados soporte comercial
python3 scripts/health_score.py --scores 4 3 4 2 5 --account "Acme Corp"

# O desde JSON (te permite sobrescribir los pesos predeterminados por cuenta/segmento)
python3 scripts/health_score.py --input account.json
```

Devuelve los puntos ponderados por dimensión, el **total sobre 100** y la **banda RAG** (Verde ≥80, Ámbar 60–79, Rojo <60) con un siguiente paso de una línea. Ejecútalo para establecer el número principal, luego escribe el detalle de la dimensión y las acciones debajo de él. Añade `--json` para herramientas posteriores.

## Formato de Salida

---

# Cuadro de Mando de Salud del Cliente: [Nombre de la Cuenta]

**CSM:** [Nombre] | **Nivel:** [Enterprise / Mid-Market / SMB]
**ARR:** £/$/€[X] | **Fecha de renovación:** [Fecha] | **Días hasta renovación:** [N]
**Salud general:** [Verde / Ámbar / Rojo] — [Puntuación]/100
**Última actualización:** [Fecha]

---

## Resumen de Puntuación de Salud

| Dimensión | Puntuación (1–5) | Peso | Puntuación Ponderada | Tendencia |
|---|---|---|---|---|
| Adopción de Producto | [1–5] | 30% | [X] | ↑ / → / ↓ |
| Engagement | [1–5] | 20% | [X] | ↑ / → / ↓ |
| Resultados | [1–5] | 20% | [X] | ↑ / → / ↓ |
| Salud del Soporte | [1–5] | 15% | [X] | ↑ / → / ↓ |
| Comercial | [1–5] | 15% | [X] | ↑ / → / ↓ |
| **Total** | — | 100% | **[X]/100** | |

---

## Detalle de Dimensiones

### Adopción de Producto — [Puntuación]/5
- **Ratio DAU/MAU:** [X]% (referencia: >25% = saludable)
- **Características clave adoptadas:** [Listar características en uso]
- **Características no adoptadas:** [Listar características de alto valor sin usar]
- **Usuarios avanzados identificados:** [Sí / No — cuántos]
- **Evaluación:** [1–2 oraciones sobre salud de adopción]

### Engagement — [Puntuación]/5
- **Último QBR:** [Fecha] — [Resumen de resultado]
- **Próximo QBR:** [Programado / Vencido]
- **Patrocinador ejecutivo:** [Activo / Pasivo / Vacante]
- **Campeón:** [Nombre, rol, fortaleza: fuerte / moderada / débil]
- **Evaluación:** [1–2 oraciones]

### Resultados — [Puntuación]/5
- **Objetivos declarados del cliente:** [Listar 2–3 objetivos del onboarding o último QBR]
- **Progreso contra objetivos:** [En camino / Parcial / Fuera de camino]
- **Evidencia de valor:** [Métrica o cita que demuestre ROI]
- **Evaluación:** [1–2 oraciones]

### Salud del Soporte — [Puntuación]/5
- **Tickets abiertos:** [N] (desglose de prioridad: P1: X, P2: X, P3: X)
- **CSAT / NPS:** [Puntuación] (referencia: >8 CSAT / >30 NPS = saludable)
- **Escaladas sin resolver:** [Sí / No — detalles si sí]
- **Tendencia de tickets (últimos 90 días):** Aumentando / Estable / Disminuyendo
- **Evaluación:** [1–2 oraciones]

### Comercial — [Puntuación]/5
- **Asientos licenciados:** [N] | **Asientos activos:** [N] ([X]% utilización)
- **Historial de pagos:** [Puntual / Retrasado — detalles]
- **Señales de expansión:** [Sí — describe / No]
- **Señales de degradación o cancelación:** [Sí — describe / No]
- **Evaluación:** [1–2 oraciones]

---

## Riesgos Principales

| Riesgo | Severidad | Mitigación |
|---|---|---|
| [Descripción del riesgo] | Alta / Media / Baja | [Acción específica para mitigar] |

---

## Acciones Recomendadas

**Inmediato (esta semana):**
1. [Acción — responsable — fecha límite]

**Este mes:**
1. [Acción — responsable — fecha límite]

**Antes de la renovación:**
1. [Acción — responsable — fecha límite]

---

## Pronóstico de Renovación

| Escenario | Probabilidad | ARR en Riesgo |
|---|---|---|
| Renovación completa a ARR actual | [X]% | £/$/€0 |
| Renovación con contracción | [X]% | £/$/€[X] |
| Churn | [X]% | £/$/€[ARR completo] |

**Estrategia de renovación recomendada:** [Expandir / Mantener / Salvar / Gestionar salida]

---

## Materiales Más Profundos

Este skill incluye archivos de soporte — úsalos cuando estén disponibles:

- **`references/leading-signals.md`** — Señales de Salud que Lideran (En lugar de Elogiar). Aplícalo mientras produces la salida; contiene la calibración y los juicios que el resumen del método anterior comprime.
- **`templates/account-scorecard.md`** — una versión rellenable del entregable con las puertas de calidad inline. Ofrécela cuando el usuario quiera trabajar el documento ellos mismos en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de este skill antes de entregar; 32+ es calidad de envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Integridad de puntuación | El total ponderado no se calcula a partir de las puntuaciones de dimensión y los pesos declarados, o la banda RAG contradice el total | La aritmética es correcta pero los pesos se ajustaron silenciosamente, o el RAG principal suaviza una dimensión que cuenta una historia diferente | El total se calcula exactamente (puntuación × peso en la escala 1–5, sobre 100), RAG coincide con las bandas 80/60, y cualquier dimensión que contradiga el estado general se señala en lugar de promediar |
| Evidencia por dimensión | Puntuaciones de dimensión aseveradas sin datos de apoyo ("el engagement se siente débil") | La mayoría de dimensiones citan datos, pero al menos una puntuación se apoya en intuición o un punto de datos antiguo presentado como actual | Cada puntuación de dimensión está anclada a evidencia nombrada y fechada (figuras de uso, conteos de tickets, fechas de QBR, utilización de asientos) y los puntos de referencia se aplican donde el formato los proporciona |
| Especificidad de riesgo | Los riesgos son etiquetas ("bajo engagement", "riesgo de churn") sin personas, fechas o montos en dólares | Los riesgos son reales pero parcialmente vagos — severidad asignada sin una mitigación, o mitigaciones sin responsables | Cada riesgo nombra la persona/evento/monto involucrado ("campeón se va 25 de julio, sin sucesor"), lleva una severidad y tiene una mitigación que alguien podría comenzar esta semana |
| Calibración de renovación | Pronóstico faltante, probabilidades no suman 100%, o la estrategia recomendada ignora la puntuación | Pronóstico presente y suma correctamente, pero las figuras de ARR en riesgo no se reconcilian con elementos de línea de contrato, o la estrategia es genérica | Las probabilidades suman 100%, ARR en riesgo se asigna a componentes reales del contrato, la estrategia (Expandir/Mantener/Salvar/Gestionar salida) sigue de la puntuación y riesgos, y las acciones tienen responsables, fechas y secuencia contra la fecha de renovación |

## Comprobaciones de Calidad

- [ ] La puntuación se basa en datos, no en intuición — cada dimensión tiene evidencia
- [ ] Los riesgos son específicos (no "bajo engagement" — algo como "el patrocinador ejecutivo se fue en marzo, no se identificó reemplazo")
- [ ] Las acciones tienen responsables y fechas límite
- [ ] La probabilidad de renovación está calibrada contra la realidad del pipeline
- [ ] Las flechas de tendencia reflejan la dirección del cambio vs. el último cuadro de mando, no solo el estado actual

## Anti-Patrones

- [ ] No puntúes dimensiones de salud por intuición — cada puntuación necesita evidencia específica de apoyo
- [ ] No des un estado Verde a cuentas con problemas P1 sin resolver o hitos perdidos
- [ ] No listes riesgos vagamente — "bajo engagement" sin especificidades no es accionable
- [ ] No dejes acciones recomendadas sin responsables nombrados y fechas límite
- [ ] No confundas frecuencia de uso del producto con entrega de valor del producto

## Frases Desencadenantes de Ejemplo

- "Califica la salud de la cuenta."
- "Evalúa el riesgo de renovación."
- "Construye un panel de salud."
- "Evalúa la probabilidad de que una cuenta se renueve."
