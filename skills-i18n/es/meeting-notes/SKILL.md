---
name: meeting-notes
language: es
description: "Estructura y da formato a notas de reunión siguiendo las mejores prácticas de gestión de producto. Úsalo cuando te pidan crear notas de reunión, dar formato a apuntes de una discusión, capturar acciones pendientes o documentar decisiones de cualquier tipo de reunión. Produce notas estructuradas con decisiones, acciones (responsable + fecha límite), preguntas abiertas y próximos pasos."
---

> Traducción al español de [meeting-notes](../../../skills/meeting-notes/SKILL.md) — la versión en inglés es la canónica.

# Habilidad de Notas de Reunión

Esta habilidad estructura las notas de reunión para maximizar su valor y asegurar el seguimiento.

## Entradas requeridas

Pídele al usuario lo siguiente si no lo proporcionó:
- **Título y fecha de la reunión**
- **Asistentes** (nombres y roles)
- **Notas en bruto o transcripción** (que pegue sus apuntes, una transcripción, o describa lo que se discutió)
- **Tipo de reunión** (1:1 / planificación de sprint / revisión de producto / sincronización con actores clave / otra) — determina qué plantilla usar

## Lee del Brain / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), aquí es donde las notas se convierten en memoria duradera:

- **Lee primero:** los archivos relevantes de `stakeholders/` (para llegar sabiendo las solicitudes
  abiertas y preocupaciones de cada asistente) y cualquier `decisions/` que la reunión retome.
- **Escribe después:** agrega cada **decisión** (con su justificación y una condición de `reopen-when`) a
  `decisions/`, suma las nuevas **solicitudes/preocupaciones** al archivo correcto de `stakeholders/`, y registra
  cualquier **supuesto** nuevo en `hypotheses/`. Etiqueta cada hecho capturado con su procedencia — la mayoría
  de las afirmaciones de una reunión son `[verbal]` hasta que se confirmen de forma independiente. Guarda las
  notas en bruto en `source/`.

## Plantilla estándar de notas de reunión

### Encabezado de la reunión
**Reunión**: [Título de la reunión]  
**Fecha**: [Fecha]  
**Asistentes**: [Nombres/Roles]  
**Encargado de notas**: [Nombre]  
**Duración**: [Duración real]

### Agenda
- [ ] Tema 1
- [ ] Tema 2
- [ ] Tema 3

*(Marca los puntos a medida que se discutan)*

### Decisiones tomadas
Documentación clara de las decisiones:

**Decisión**: [Qué se decidió]  
**Contexto**: [Por qué esta decisión]  
**Responsable**: [Quién es responsable de ejecutarla]  
**Fecha límite**: [Cuándo, si aplica]  

Usa este formato para cada decisión tomada.

### Acciones pendientes
Todas las acciones deben ser:
- [ ] **[Acción]** - @Responsable - Fecha límite: [Fecha]
- [ ] **[Acción]** - @Responsable - Fecha límite: [Fecha]

Formato:
- Acción clara y específica
- Un solo responsable (nada de responsabilidad "del equipo")
- Fecha límite concreta
- Casilla de verificación para seguimiento

### Notas de la discusión
Puntos clave discutidos, organizados por tema:

**Tema 1: [Nombre]**
- Punto clave o momento destacado de la discusión
- Contexto importante o preocupación planteada
- Cualquier dato o información compartida

**Tema 2: [Nombre]**
- Puntos clave de la discusión
- Decisiones o conclusiones alcanzadas

### Preguntas abiertas / Seguimiento
Preguntas que no pudieron responderse:
- **Pregunta**: [Qué necesitamos saber]
- **Responsable**: [Quién lo averiguará]
- **Para cuándo**: [Fecha límite]

### Próximos pasos
Resumen claro de lo que sigue:
1. [Acción inmediata siguiente]
2. [Reunión de seguimiento si hace falta]
3. [Cualquier proceso más amplio a iniciar]

## Mejores prácticas

**Durante la reunión:**
- Enfócate en decisiones y acciones, no en el diálogo
- Captura compromisos específicos, no la discusión general
- Anota las opiniones en desacuerdo en decisiones importantes
- Pide claridad ante compromisos vagos ("lo voy a revisar" → "voy a analizar los datos y compartir hallazgos el viernes")

**Después de la reunión:**
- Envía las notas dentro de las 2 horas siguientes, mientras están frescas
- Etiqueta a los responsables de las acciones (@menciónalos)
- Incluye enlaces a los documentos relevantes
- Da seguimiento a las acciones vencidas

**Qué capturar:**
✅ Decisiones tomadas
✅ Acciones con responsables y fechas límite
✅ Puntos clave de la discusión
✅ Preguntas abiertas
✅ Próximos pasos

**Qué omitir:**
❌ Transcripciones textuales
❌ Digresiones fuera de tema
❌ La discusión preliminar antes de las decisiones
❌ Información redundante

## Tipos de reunión y adaptaciones

### Reuniones 1:1
Enfócate en:
- Conversaciones de desarrollo profesional
- Retroalimentación (en ambas direcciones)
- Desafíos actuales
- Acciones para ambas partes

Adiciones a la plantilla:
- **Logros recientes**: Qué está saliendo bien
- **Desafíos**: Qué no está saliendo bien
- **Conversación de carrera**: Temas de desarrollo
- **Retroalimentación**: Para ambas partes

### Planificación de sprint
Enfócate en:
- Criterios de aceptación de las historias
- Decisiones de dimensionamiento/estimación
- Identificación de dependencias
- Compromiso del sprint

Adiciones a la plantilla:
- **Objetivo del sprint**: Con qué nos comprometemos
- **Puntos de historia**: Capacidad y estimaciones
- **Dependencias**: Bloqueos externos
- **Definición de terminado**: Criterios de aceptación

### Revisiones de producto
Enfócate en:
- Decisiones de diseño
- Retroalimentación de usuarios discutida
- Cambios solicitados
- Evaluación de preparación para el lanzamiento

Adiciones a la plantilla:
- **Decisiones de diseño**: Qué se aprobó/rechazó
- **Retroalimentación de usuarios**: Hallazgos clave discutidos
- **Preguntas de diseño abiertas**: Qué necesita iteración
- **Criterios de lanzamiento**: Requerimientos restantes

### Sincronización con actores clave
Enfócate en:
- Actualizaciones de estado entregadas
- Preocupaciones planteadas
- Aprobaciones otorgadas
- Necesidades de escalamiento

Adiciones a la plantilla:
- **Panorama de estado**: Progreso de alto nivel
- **Aprobaciones obtenidas**: Vistos buenos recibidos
- **Escalamientos**: Asuntos elevados a los actores clave
- **Próxima sincronización**: Cuándo y qué cubrir

## Ejemplo de notas de reunión

```
# Revisión de Roadmap de Producto - Q1 2026
**Fecha**: 20 de enero de 2026  
**Asistentes**: Sarah (CPO), Mike (Líder de Ingeniería), Jennifer (Diseño), Tom (PM)  
**Encargado de notas**: Tom  
**Duración**: 45 minutos

## Agenda
- [x] Revisar funcionalidades planificadas para Q1
- [x] Discutir restricciones de recursos
- [x] Discusión de priorización
- [x] Alineación de cronograma

## Decisiones tomadas

**Decisión**: Mover el panel multicanal a Q2, priorizar mejoras de la app móvil en Q1  
**Contexto**: La retroalimentación de clientes muestra que la experiencia móvil impacta significativamente la retención (65% de los usuarios son principalmente móviles). El equipo de ingeniería solo puede abordar una iniciativa mayor este trimestre.  
**Responsable**: Tom (PM) comunicará a los actores clave  
**Fecha límite**: 22 de enero

**Decisión**: Asignar 20% del tiempo de ingeniería a deuda técnica  
**Contexto**: La deuda técnica acumulada está frenando el desarrollo de funcionalidades. La velocidad del equipo cayó 30% el trimestre pasado.  
**Responsable**: Mike (Líder de Ingeniería) creará el backlog de deuda técnica  
**Fecha límite**: 27 de enero

**Decisión**: Correr una beta móvil con 100 usuarios antes del lanzamiento completo
**Contexto**: Hay que validar las mejoras en dispositivos diversos
**Responsable**: Jennifer (Diseño) coordinará con QA
**Fecha límite**: 10 de febrero

## Acciones pendientes
- [ ] **Actualizar la presentación del roadmap Q1 con la nueva priorización** - @Tom - Fecha límite: 22 ene
- [ ] **Agendar reunión de alineación con el equipo de soporte sobre el retraso del panel** - @Tom - Fecha límite: 24 ene
- [ ] **Crear rúbrica de priorización de deuda técnica** - @Mike - Fecha límite: 27 ene
- [ ] **Correr pruebas de usuario sobre los diseños móviles** - @Jennifer - Fecha límite: 3 feb
- [ ] **Documentar la justificación de la decisión para los ejecutivos** - @Sarah - Fecha límite: 23 ene
- [ ] **Identificar 100 usuarios beta para móvil** - @Tom - Fecha límite: 1 feb

## Notas de la discusión

**Priorización de funcionalidades Q1**
- La retención de clientes es la prioridad #1 de la empresa este trimestre
- El NPS de la app móvil es 6.2 (vs 8.1 en web)
- Móvil representa el 65% de los usuarios activos diarios
- El panel multicanal tomaría 8 semanas de ingeniería
- Las mejoras móviles se estiman en 6 semanas de ingeniería con mayor ROI
- Ventas tiene 3 negocios enterprise esperando la funcionalidad del panel

**Restricciones de recursos**
- Actualmente hay 4 ingenieros disponibles (bajó de 6 el trimestre pasado por rotación)
- El equipo de diseño puede apoyar ambas iniciativas pero con capacidad reducida
- QA necesita 2 semanas para pruebas exhaustivas en móvil
- Un ingeniero está prestado al equipo de seguridad hasta febrero

**Discusión de riesgos**
- Retrasar el panel puede impactar las ventas enterprise (3 negocios en espera)
- Sarah señaló: "Podemos posicionar las mejoras móviles como base para las funcionalidades enterprise"
- Mike planteó preocupación por la estabilidad del stack técnico móvil — se aborda con la asignación a deuda técnica
- Hay que comunicar con claridad a Ventas el cambio de cronograma

**Plan de implementación móvil**
- Semanas 1-2: Refinamientos de diseño según retroalimentación de usuarios
- Semanas 3-4: Implementación de ingeniería
- Semana 5: Pruebas internas
- Semana 6: Beta con 100 usuarios
- Semana 7: Despliegue completo

## Preguntas abiertas
- **Pregunta**: ¿Cuál es el impacto en el pipeline enterprise si retrasamos el panel?  
  **Responsable**: Sarah consultará con el liderazgo de Ventas  
  **Para cuándo**: 23 de enero

- **Pregunta**: ¿Podemos hacer una beta limitada del panel para clientes enterprise?  
  **Responsable**: Tom explorará el alcance del MVP con Mike  
  **Para cuándo**: 25 de enero

- **Pregunta**: ¿Cuál es nuestro plan si las mejoras móviles no alcanzan las métricas objetivo?
  **Responsable**: Tom creará un plan de contingencia
  **Para cuándo**: 27 de enero

## Próximos pasos
1. Tom enviará el roadmap actualizado al liderazgo antes del fin del día del miércoles (22 ene)
2. El equipo iniciará la planificación de sprint para las mejoras móviles el próximo lunes (27 ene)
3. Reunión de seguimiento el 1 de febrero para revisar el progreso y validar la priorización
4. Sarah presentará la justificación de la decisión al equipo ejecutivo el 24 de enero

---

**Próxima reunión**: 1 de febrero de 2026 - Revisión de progreso
**Notas enviadas**: 20 de enero de 2026, 5:30 PM
```

## Materiales de apoyo

Esta habilidad incluye archivos de soporte — úsalos cuando estén disponibles:

- **`references/decisions-vs-discussion.md`** — Separar las decisiones de la discusión. Aplícalo mientras produces la salida; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/notes-skeleton.md`** — una versión del entregable para completar, con los controles de calidad integrados. Ofrécelo cuando el usuario quiera trabajar el documento por su cuenta en lugar de que se le genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier salida de esta habilidad antes de entregarla; 32+ es calidad lista para publicar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Responsabilidad de las acciones | Acciones asignadas "al equipo" o a nadie, sin fechas | Responsables con nombre pero fechas vagas ("la próxima semana", "pronto") o bloques con responsabilidad compartida | Cada acción tiene exactamente un responsable con nombre y una fecha concreta; el trabajo compartido se divide en ítems con responsables separados |
| Trazabilidad de las decisiones | Decisiones enterradas en la discusión o registradas sin ningún porqué | Decisiones listadas con responsables pero justificación escueta; el desacuerdo es invisible | Cada decisión lleva contexto, responsable y fecha límite; el disenso queda registrado dentro de la decisión con una condición de revisión, no disimulado |
| Síntesis sobre transcripción | Captura textual de quién dijo qué, en orden | Transcripción recortada y agrupada por tema, pero sigue siendo diálogo y no destilación | La discusión se reduce a los puntos que sostienen las decisiones; las citas aparecen solo donde cargan peso decisorio |
| Cierre de ciclos | Preguntas abiertas, temas diferidos y escalamientos se pierden en silencio | Ítems abiertos listados pero sin responsable ni fecha; lo diferido desaparece de los próximos pasos | Cada pregunta abierta tiene responsable y fecha; lo diferido reaparece en los próximos pasos con fechas; las notas se envían dentro de la ventana de 2 horas |

## Controles de calidad

- [ ] Cada acción tiene un único responsable con nombre (no "el equipo")
- [ ] Cada acción tiene una fecha límite concreta
- [ ] Las decisiones incluyen contexto (por qué se tomó la decisión)
- [ ] Las preguntas abiertas tienen responsable y un "para cuándo"
- [ ] Nada de transcripciones textuales — solo síntesis

## Anti-patrones

- [ ] No asignes acciones "al equipo" o a "todos" — cada acción debe tener exactamente un responsable con nombre o no se completará
- [ ] No captures contenido de transcripción textual — las notas de reunión registran decisiones y compromisos, no todo el recorrido conversacional para llegar a ellos
- [ ] No omitas el contexto de las decisiones — una decisión sin su justificación es inútil cuando alguien pregunte "¿por qué hicimos eso?" seis meses después
- [ ] No dejes preguntas abiertas sin responsable y fecha límite — una pregunta sin respuesta y sin seguimiento asignado es una decisión bloqueada
- [ ] No demores el envío de las notas más de 2 horas después de la reunión — las notas enviadas al día siguiente pierden la ventana en la que los responsables pueden actuar sobre compromisos frescos

## Distribución de las notas

**Formato del asunto**: "Notas de [Tipo de reunión] - [Fecha] - [Tema clave]"

Ejemplo: "Notas de Revisión de Roadmap de Producto - 20 ene - Priorización Q1"

**Destinatarios**:
- Todos los asistentes
- Cualquier persona mencionada en las acciones
- Cualquiera que haya solicitado las notas

**Seguimiento**:
- Envía un recordatorio 3 días antes de las fechas límite de las acciones
- Resumen semanal de todas las acciones abiertas
- Marca las acciones como completadas y comparte las actualizaciones

## Ejecución

Para agentes con uso de herramientas y servidores MCP conectados (Notion, Linear/Jira, Slack). Los entornos de ejecución sin acceso a herramientas ignoran esta sección y entregan el documento. Ver [SKILLSPEC.md §5](../../SKILLSPEC.md) y [connectors/mcp-pairings.md](../../connectors/mcp-pairings.md).

### Precondiciones
- Las notas estructuradas de arriba fueron mostradas a la persona y **aprobadas explícitamente**, incluido el destino (qué base de datos/página de Notion, qué proyecto del gestor de tareas).
- Los servidores MCP ya están conectados y autenticados en el entorno del agente.
- Cada acción tiene un responsable con nombre — los ítems sin responsable se resuelven primero con la persona, nunca se asignan por adivinanza.

### Acciones permitidas
- Crear UNA página en la base de datos de Notion aprobada (o herramienta de documentos equivalente) con las notas aprobadas, textuales.
- Crear un ticket en el gestor de tareas por cada acción aprobada (título, responsable, fecha límite tomados de las notas) en el proyecto aprobado.
- Publicar el enlace de la página (solo el enlace y un resumen de una línea) en el canal aprobado, si la persona nombró uno.
- Nada más: sin editar páginas/tickets existentes, sin invitar ni notificar a personas más allá del canal nombrado, sin escrituras en el calendario.

### Verificación
- Recupera la página creada y cada ticket creado; confirma que títulos, responsables y fechas coinciden con las notas aprobadas.
- Reporta cada URL creada a la persona en una sola lista.

### Reversión
- Deshacer = archivar/eliminar la página y los tickets recién creados, solo bajo instrucción humana explícita.
- Detente y pregunta a una persona si: no se encuentra la base de datos/proyecto de destino, la creación de algún ticket falla a medio camino (reporta lo que SÍ se creó), o el responsable de una acción no existe en el gestor de tareas.

## Frases disparadoras de ejemplo

- "Crea las notas de la reunión."
- "Da formato a estas notas de la conversación."
- "Recoge las tareas pendientes."
- "Documenta las decisiones de la reunión."
