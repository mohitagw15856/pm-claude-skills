---
# machine-translated to es from skills/product-launch-checklist/SKILL.md — review: pending. Native fixes welcome via PR.
name: product-launch-checklist
description: "Genera una lista de verificación completa para antes del lanzamiento, día del lanzamiento y después del lanzamiento para cualquier versión de producto. Úsalo cuando prepares un lanzamiento de producto, lanzamiento de funcionalidad o actualización importante. Produce una lista de verificación escalonada y asignada por rol que cubre la preparación de ingeniería, marketing y comunicaciones, soporte y monitoreo posterior al lanzamiento."
---

# Skill de Lista de Verificación de Lanzamiento de Producto

Nunca lances sin verificar todo. Genera una lista de verificación completa, asignada por rol, que cubre la preparación previa al lanzamiento, la ejecución del día del lanzamiento y el monitoreo posterior.

## Propone Acciones

Una vez que la lista de verificación sea aprobada, puede ser *ejecutada*: pasa los elementos a [`action-runner`](../action-runner/SKILL.md), que los previsualiza (dry-run, calificados por riesgo), ejecuta solo lo que apruebes a través del MCP de acción conectado (GitHub/Linear/Slack), y registra lo que se hizo en el cerebro. Típico: **abrir una issue por elemento de lista** en el repositorio/proyecto nombrado (🟡), y **publicar el resumen del lanzamiento en Slack** (🔴 — aprobado individualmente). Este skill propone; action-runner valida y ejecuta — nunca en silencio.

## Entradas Requeridas

Pregunta al usuario por estos datos si no se proporcionan:
- **Nombre del lanzamiento** y fecha planeada del lanzamiento
- **Tier del lanzamiento** (1 = lanzamiento de producto mayor, 2 = lanzamiento de funcionalidad significativa, 3 = actualización incremental)
- **Miembros del equipo y sus roles** (líder de ingeniería, PM, marketing, soporte, etc.)
- **Descripción de la funcionalidad** (qué se está lanzando)
- **Capacidad de reversión** (¿puede ser feature-flagged o revertido rápidamente?)

## Lee / Escribe en el Cerebro

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo antes de preguntar:

- **Lee primero:** la `entities/` de la funcionalidad que se lanza y las `decisions/` relacionadas (alcance, fechas, propietarios).
- **Escribe después:** registra decisiones de lanzamiento y propietarios en `decisions/`. Este skill también puede pasar la lista de verificación a [`action-runner`](../action-runner/SKILL.md) para archivar los tickets — que registra lo que realmente se hizo en el cerebro, cerrando el ciclo.

## Cómo Usar Este Skill

Proporciona:
- Nombre del lanzamiento y fecha
- Tier del lanzamiento (1 = mayor, 2 = funcionalidad, 3 = incremental)
- Miembros del equipo y sus roles

El skill genera una lista de verificación escalonada. Los lanzamientos Tier 3 usan solo la sección Essentials. Tier 2 añade Marketing & Comms. Tier 1 usa todas las secciones.

---

## Formato de Salida

### Lista de Verificación de Lanzamiento — [Nombre de Funcionalidad/Producto] — Fecha Objetivo: [Fecha]

**Tier del Lanzamiento:** [1 / 2 / 3]
**Propietario del Lanzamiento:** [Nombre del PM]
**Líder de Ingeniería:** [Nombre]
**Decisión Go/No-Go Por:** [Fecha y hora — típicamente 24 horas antes del lanzamiento]

---

### 🔧 PREVIO AL LANZAMIENTO — Ingeniería & Producto (T-2 semanas)
- [ ] Feature flag creado y probado en staging
- [ ] Todos los criterios de aceptación aprobados por PM
- [ ] Código revisado y fusionado a main
- [ ] Sign-off de QA completado (regresión + nueva funcionalidad)
- [ ] Testing de rendimiento completado (carga, latencia)
- [ ] Revisión de seguridad completada (si hay cambios de datos o autenticación)
- [ ] Procedimiento de reversión documentado y probado
- [ ] Monitoreo y alertas configurados
- [ ] Logging de errores implementado con niveles de severidad correctos
- [ ] Migraciones de base de datos probadas en staging con volumen de datos de producción

### 📢 PREVIO AL LANZAMIENTO — Marketing & Comunicaciones (T-1 semana)
- [ ] Artículo de blog escrito, revisado y programado
- [ ] Anuncio en la app o tooltip configurado
- [ ] Campaña de email redactada y QA'd
- [ ] Posts en redes sociales redactados y programados
- [ ] Landing page o página de funcionalidad en vivo en staging
- [ ] Outreach a prensa enviado (solo Tier 1)
- [ ] Posts de Product Hunt / comunidad preparados (solo Tier 1)

### 🎓 PREVIO AL LANZAMIENTO — Ventas & Soporte (T-1 semana)
- [ ] One-pager de habilitación de ventas completado
- [ ] Documento de FAQ compartido con equipos de ventas y soporte
- [ ] Artículos del centro de ayuda escritos y publicados
- [ ] Demo / capacitación del equipo de soporte completada
- [ ] Equipo de customer success informado sobre cuentas principales
- [ ] Precios actualizados (si aplica)
- [ ] Contratos / Términos de Servicio actualizados (si aplica)

### 📊 PREVIO AL LANZAMIENTO — Analytics (T-1 semana)
- [ ] Eventos de analytics disparándose correctamente en staging
- [ ] Dashboard configurado para métricas de lanzamiento
- [ ] Métricas de línea base documentadas
- [ ] Criterios de éxito documentados y compartidos con el equipo
- [ ] Test A/B configurado (si aplica)

---

### ✅ DECISIÓN GO / NO-GO — T-24 horas

| Criterios | Estado | Propietario |
|---|---|---|
| Todos los bugs críticos resueltos | 🟢 / 🔴 | Líder de Ing |
| Sign-off de QA completado | 🟢 / 🔴 | QA |
| Reversión probada | 🟢 / 🔴 | Líder de Ing |
| Artículos del centro de ayuda en vivo | 🟢 / 🔴 | Soporte |
| Monitoreo activo | 🟢 / 🔴 | Líder de Ing |
| Sign-off del PM | 🟢 / 🔴 | PM |

**Decisión Go / No-Go:** [GO / NO-GO]
**Propietario de la Decisión:** [PM + Líder de Ing conjuntamente]

---

### 🚀 DÍA DEL LANZAMIENTO
- [ ] Feature flag habilitado para [X%] de usuarios (comenzar bajo — 5–10%)
- [ ] Lanzamiento confirmado en canal Slack/equipo
- [ ] Dashboard de métricas abierto y siendo monitoreado
- [ ] Tasa de errores verificada en T+15 min, T+1 hr, T+4 hr
- [ ] Artículo de blog publicado / email enviado
- [ ] Posts en redes sociales en vivo
- [ ] Equipo de soporte en standby durante las primeras 4 horas
- [ ] PM disponible y alcanzable todo el día
- [ ] Feature flag expandido al 50% si los chequeos en T+2hr pasan
- [ ] Feature flag expandido al 100% si los chequeos en T+4hr pasan

---

### 📈 POSTERIOR AL LANZAMIENTO (D+7, D+30)
- [ ] Review de métricas en D+7: adopción, errores, tickets de soporte
- [ ] Feedback de clientes sintetizado en D+7
- [ ] Retrospectiva programada
- [ ] Aprendizajes documentados
- [ ] Métricas de éxito en D+30 revisadas contra objetivos
- [ ] Feature flag removido del codebase (limpiar)
- [ ] Funcionalidades de seguimiento añadidas al backlog basadas en feedback

---

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/launch-tiering.md`** — Niveles de lanzamiento: ajustar la ceremonia a lo que está en juego. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/launch-plan.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Calibración del nivel | No se indica nivel, o la profundidad de la lista es claramente desproporcionada (ceremonia completa de nivel 1 para un cambio de texto, o una lista escueta para una nueva línea de ingresos) | Nivel indicado pero sin justificar; algunas secciones se incluyen o se quitan de forma incoherente con el nivel | Nivel indicado con su razonamiento (precios, legal, radio de impacto, no esfuerzo de ingeniería), secciones acordes al nivel, y cualquier desacuerdo sobre el nivel resuelto y registrado |
| Responsables y tiempos | Elementos y puertas a cargo de "el equipo" o de nadie; sin fechas | La mayoría de los elementos tienen responsable, pero las puertas clave (Go/No-Go, expansiones, retro) carecen de una persona con nombre o de una hora concreta | Cada elemento, puerta y decisión tiene una única persona con nombre y una fecha/hora, incluida la hora de la decisión Go/No-Go fijada unas 24 h antes del lanzamiento |
| Reversión y despliegue escalonado | Sin plan de reversión, o el flag pasa al 100 % el primer día | Reversión documentada pero sin probar; hay escalonamiento, pero los pasos de expansión no tienen criterios de aprobación | Reversión probada con tiempo de vuelta atrás conocido ("X minutos, probado el [fecha]"), flag escalonado 5–10 % → 50 % → 100 %, y cada expansión condicionada a comprobaciones concretas con nombre |
| Integridad del Go/No-Go | Sin puerta, o una puerta de teatro: todo en verde por defecto, trabajo bloqueado marcado como hecho | Hay puerta con criterios, pero los elementos bloqueados se suavizan, los estados son aspiracionales, o un NO-GO no tiene plan revisado | Estados honestos (rojos visibles con bloqueo y responsable), la decisión sigue la tabla aunque implique retrasar, y un NO-GO produce una nueva puerta con fecha, más la retro agendada en el momento del lanzamiento |

## Chequeos de Calidad

- [ ] Tier del lanzamiento confirmado antes de generar la lista (el alcance determina la profundidad)
- [ ] La decisión Go/No-Go tiene un propietario nombrado y una hora de decisión específica
- [ ] El procedimiento de reversión está documentado y probado (no solo planeado)
- [ ] La expansión del feature flag es escalonada (5% → 50% → 100%), no todo de una vez
- [ ] La retrospectiva posterior al lanzamiento está programada en el momento del lanzamiento

## Anti-Patrones

- [ ] No apliques una lista de verificación Tier 1 a una actualización incremental — escala el lanzamiento apropiadamente antes de generar la lista
- [ ] No lances un viernes sin cobertura de ingeniería confirmada durante el fin de semana
- [ ] No dejes el propietario de la decisión Go/No-Go como "el equipo" — debe ser un individuo nombrado
- [ ] No omitas el plan de reversión para lanzamientos Tier 1 y 2 — conoce el tiempo de reversión antes de ir en vivo
- [ ] No cierres el lanzamiento sin programar la retrospectiva posterior — debe ser reservada en el momento del lanzamiento, no después

## Directrices

- La decisión Go/No-Go debe tener un propietario nombrado — "el equipo" no es un propietario
- Nunca lances un viernes a menos que tengas cobertura de ingeniería durante el fin de semana
- Recomienda comenzar todos los lanzamientos con <10% de tráfico — incluso para funcionalidades simples
- Documenta el tiempo de reversión: "Podemos revertir esto en X minutos" debe ser conocido antes de lanzar

## Frases de activación de ejemplo

- "Prepara un lanzamiento de producto."
- "Dame una lista de verificación para el día del lanzamiento."
- "Planifica la salida de la funcionalidad."
- "¿Qué necesitamos antes de que salga esta gran actualización?"

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/product-launch-checklist.html
