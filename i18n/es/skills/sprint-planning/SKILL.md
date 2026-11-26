---
# machine-translated to es from skills/sprint-planning/SKILL.md — review: pending. Native fixes welcome via PR.
name: sprint-planning
description: "Estructura y facilita sesiones de planificación de sprint. Úsalo cuando se te pida planificar un sprint, organizar elementos del backlog, asignar story points, crear objetivos de sprint o preparar agendas de planificación de sprint. Produce un objetivo de sprint, un backlog calibrado por velocidad, un plan de capacidad, señales de riesgo y una agenda estructurada de reunión de planificación de sprint."
---

# Skill de Planificación de Sprint

Transforma elementos crudos del backlog en un sprint estructurado y alcanzable con objetivos claros, alcance calibrado por velocidad y resultados listos para el equipo.

## Lee de / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), fundamenta en él en lugar de volver a preguntar lo que ya sabes:

- **Lee primero:** `decisions/` prioritarias (lo que el equipo acordó que importa), `entities/` de features e `hypotheses/` abiertas que el sprint podría probar. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<sprint goal>"` y lleva la etiqueta de procedencia de cada hecho a través del proceso.
- **📥 Propón al Brain:** después de producir, propón registrar el compromiso del sprint (objetivo + alcance comprometido) como un registro `decisions/`, etiquetado con procedencia. Muéstralo, obtén un sí, luego escribe con `../professional-brain/scripts/brain_write.py … --commit` (solo anexar, seco por defecto).

## Propone Acciones

Una vez que el sprint sea acordado, entrégalo a [`action-runner`](../action-runner/SKILL.md): vista previa (seco, evaluado por riesgo), ejecuta solo lo que apruebes a través del MCP de acción conectado, y registra lo que se hizo de vuelta al brain. Típico: **crear un ticket por elemento de backlog comprometido** y **establecer el hito del sprint** (🟡). Esta skill propone; action-runner vigila y ejecuta — nunca silenciosamente.

## Lo Que Esta Skill Produce

- **Objetivo de Sprint** — oración única, enfocada en resultados, que todo el equipo pueda impulsar
- **Backlog del Sprint** — lista priorizada de historias de usuario con estimaciones de story points y criterios de aceptación
- **Plan de Capacidad** — desglose de disponibilidad del equipo considerando vacaciones, reuniones y tiempo de enfoque
- **Agenda de Planificación de Sprint** — agenda de reunión estructurada de 2 horas con tiempos
- **Señales de Riesgo** — bloqueadores o dependencias que podrían descarrilar el sprint

## Entradas Requeridas

Pregunta por (si no se proporciona ya):
- Duración del sprint (1 o 2 semanas)
- Tamaño del equipo y velocidad (promedio de story points por sprint)
- Top 3–5 elementos del backlog o épicas de los que tirar
- Cualquier ausencia conocida, vacaciones o eventos del equipo
- Elementos incompletos del sprint anterior (carryovers)

## Fórmula de Objetivo de Sprint

Usa esta estructura:
> "En este sprint entregaremos [resultado X] para que [beneficio de usuario/negocio], medido por [indicador de éxito]."

Nunca escribas objetivos de sprint como listas de tareas. Siempre primero los resultados.

## Calibración de Story Points

| Complejidad | Points | Descripción |
|---|---|---|
| Trivial | 1 | Claramente entendido, sin incógnitas |
| Pequeño | 2 | Sencillo, esfuerzo menor |
| Medio | 3 | Cierta complejidad, camino claro |
| Grande | 5 | Complejo, necesita diseño o investigación |
| Muy Grande | 8 | Alta incertidumbre, puede necesitar dividirse |
| Épica | 13+ | Demasiado grande — debe dividirse antes del sprint |

Marca cualquier elemento estimado en 8+ y recomienda dividirlo.

## Fórmula de Capacidad

```
Capacidad disponible = (Tamaño del equipo × Días del sprint × Horas de enfoque/día) × Factor de disponibilidad
Horas de enfoque/día: 6 (considerando reuniones, Slack, admin)
Factor de disponibilidad: 0.7–0.85 dependiendo de vacaciones/eventos
Story points a comprometer = Velocidad histórica × Factor de disponibilidad
```

## Helper Programático

Esta skill incluye un script Python solo con stdlib que calcula capacidad en lugar de estimarla a mano. Úsalo siempre que se conozcan los números del equipo — aplica las reglas de disponibilidad y ratio de compromiso del 80% de forma consistente.

```bash
# Estimación rápida desde banderas
python3 scripts/capacity_calculator.py --team 5 --days 10 --velocity 30 --availability 0.8 --carryover 5

# Estimación detallada desde disponibilidad por miembro (JSON vía stdin o archivo --input)
echo '{"sprint_days":10,"historical_velocity":40,"carryover_points":8,
       "members":[{"name":"Ada","available_days":10},{"name":"Linus","available_days":7}]}' \
  | python3 scripts/capacity_calculator.py --input -
```

El script retorna horas de enfoque disponibles, una figura de velocidad ajustada por disponibilidad real, el **compromiso recomendado** (limitado al 80% de velocidad), y la **capacidad restante** para trabajo nuevo después de carryovers. Ejecútalo primero, luego construye el backlog del sprint para encajar el número recomendado. Añade `--json` para canalizar el resultado en otras herramientas.

## Formato de Salida

### Sprint [N] — [Fecha de inicio] a [Fecha de fin]

**Objetivo del Sprint:**
> [Declaración de objetivo]

**Capacidad del Equipo:** [X] story points disponibles (basado en [Y] miembros del equipo, [Z]% disponibilidad)

**Backlog del Sprint:**

| Prioridad | Historia | Points | Owner | Criterios de Aceptación |
|---|---|---|---|---|
| 1 | [Título de historia] | [N] | [Miembro del equipo] | [Cuando X entonces Y] |

**Carryovers del Sprint Anterior:**
- [Elemento] — Razón del carryover: [breve explicación]

**Riesgos y Dependencias:**
- [Descripción de riesgo] → Mitigación: [acción]

**Agenda de Planificación de Sprint:**
- 00:00–00:10 — Revisar objetivo del sprint y capacidad del equipo
- 00:10–00:40 — Recorrer elementos del backlog, confirmar estimaciones
- 00:40–01:20 — Asignar historias, identificar dependencias
- 01:20–01:50 — Revisar criterios de aceptación por historia
- 01:50–02:00 — Confirmar compromiso del sprint y cerrar

## Pautas

- Siempre cuestiona historias sin criterios de aceptación — márcalas explícitamente
- Recomienda que el equipo se comprometa al 80% de capacidad disponible, no 100%
- Si no se proporcionan datos de velocidad, asume 20–30 points para un equipo de 5 personas como punto de partida
- Destaca cualquier historia con propiedad poco clara como bloqueador

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/capacity-honesty.md`** — Honestidad sobre la capacidad: los números con los que los equipos se engañan. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/planning-worksheet.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Calidad del objetivo del sprint | El objetivo es una lista de tareas ("hacer las historias 1–8") o falta por completo | Con sabor a resultado pero vago; no puntuable como aprobado/suspenso al final del sprint | Una única frase de resultado con el beneficio para el usuario o el negocio y un indicador de éxito, puntuable sin ambigüedad al final del sprint |
| Honestidad sobre la capacidad | El compromiso asume el 100 % de la capacidad teórica; se ignoran los arrastres | Disponibilidad ajustada, pero se salta la ratio de compromiso del 80 % o los puntos arrastrados no se restan antes de tomar trabajo nuevo | Disponibilidad real (vacaciones, reuniones, horas de concentración), arrastres descontados primero, y compromiso limitado al 80 % de la velocidad ajustada |
| Preparación de las historias | Las historias carecen de criterios de aceptación, estimaciones o responsables | La mayoría de las historias están estimadas y asignadas, pero las de 8 puntos o más no se dividen o los criterios de aceptación no son comprobables | Cada historia tiene un responsable, puntos calibrados y criterios de aceptación comprobables; cada historia de 8 puntos o más se marca para dividir |
| Visibilidad de riesgos y dependencias | Sin riesgos ni dependencias | Riesgos genéricos ("podría retrasarse") sin mitigaciones ni responsables | Bloqueos concretos y dependencias entre equipos, cada uno con una mitigación concreta y un responsable con nombre |

## Controles de Calidad

- [ ] El objetivo del sprint es enfocado en resultados (no "implementar X" — algo como "los usuarios pueden hacer Y")
- [ ] La capacidad del equipo se calcula usando disponibilidad real, no teórica 100%
- [ ] Cada historia tiene un criterio de aceptación (marca cualquier que no lo tenga)
- [ ] Las historias estimadas en 8+ points se marcan para dividirse
- [ ] Los carryovers del sprint anterior se consideran en la capacidad

## Anti-Patrones

- [ ] No escribas objetivos de sprint como listas de tareas — los objetivos deben ser enfocados en resultados y evaluables como aprobado/reprobado al final del sprint
- [ ] No te comprometas al 100% de capacidad disponible — siempre recomienda 80% para preservar margen para trabajo no planificado
- [ ] No lleves historias sin criterios de aceptación al sprint — márcalas como bloqueadores antes de comprometerte
- [ ] No permitas historias estimadas en 8+ points en el sprint sin dividirlas primero
- [ ] No ignores elementos carryover cuando calcules capacidad — consumen capacidad y deben considerarse antes de traer trabajo nuevo

## Ejecución

Para agentes que usan herramientas o acceso a computadora que pueden alcanzar el tracker del equipo (Jira, Linear, GitHub Projects). Los runtimes sin acceso a herramientas ignoran esta sección y entregan el documento. Ver [SKILLSPEC.md §5](../../SKILLSPEC.md) para las reglas que sigue este bloque.

### Precondiciones
- El plan del sprint anterior ha sido producido y **explícitamente aprobado por un humano** — nunca construyas un sprint desde un borrador sin revisar.
- El acceso al tracker ya está autenticado en el entorno del agente; la placa/proyecto objetivo se nombra por el usuario.
- Un listado en seco de cambios previstos ha sido mostrado y confirmado.

### Acciones permitidas
- Crear el contenedor de sprint/iteración con el nombre y fechas aprobados.
- Mover los elementos del backlog ya existentes y aprobados al sprint — solo los elementos listados en el plan aprobado.
- Establecer estimaciones de story points en esos elementos a los valores aprobados.
- Publicar el objetivo del sprint como descripción del sprint o comentario fijado.
- Nada más: sin crear nuevos issues, sin eliminar o cerrar nada, sin editar descripciones de elementos, sin tocar otros sprints.

### Verificación
- Re-lee el sprint desde el tracker: el conteo de elementos y puntos totales igual el plan aprobado; cada elemento movido está en el sprint; las fechas del sprint coinciden.
- Publica el resumen de verificación (elementos, points, fechas) de vuelta al usuario.

### Rollback
- Deshacer = mover los elementos de vuelta al backlog y eliminar el contenedor de sprint vacío.
- Para y pregunta a un humano si: cualquier elemento en el plan ya no existe o cambió desde la aprobación, el tracker rechaza una acción, o la placa contiene un sprint activo con fechas superpuestas.

## Frases de activación de ejemplo

- "Planifica un sprint."
- "Organiza los elementos del backlog."
- "Crea los objetivos del sprint."
- "Prepara las agendas de planificación del sprint."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/sprint-planning.html
