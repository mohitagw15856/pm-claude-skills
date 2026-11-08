---
# machine-translated to es from skills/prd-template/SKILL.md — review: pending. Native fixes welcome via PR.
name: prd-template
description: "Crear un Documento de Requisitos de Producto siguiendo una estructura de plantilla PM probada. Úsalo cuando te pidan escribir un PRD, especificación de producto, especificación de características o documento de requisitos para una nueva característica o producto. Genera un PRD completo con declaración de problema, historias de usuario, requisitos funcionales, consideraciones técnicas y métricas de éxito."
---

# Habilidad: Plantilla PRD

Esta habilidad ayuda a crear Documentos de Requisitos de Producto profesionales siguiendo mejores prácticas de la industria.

## Dónde encaja — el centro de la columna vertebral

Segundo en la columna vertebral de decisiones de producto: **`/assumption-mapper` → `prd-template` →
`/rice-prioritisation` → `/roadmap-narrative`**. Recibe **la suposición más arriesgada**
de `/assumption-mapper` (si se ejecutó, lee su mapa en lugar de volver a adivinar los riesgos)
y entrega a `/rice-prioritisation` **la métrica de éxito del PRD**: el único número con línea base
que se convierte en el *Impact* de RICE. Los términos compartidos (declaración del problema, hipótesis,
métrica de éxito, procedencia) viven una sola vez en
[`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md); úsalos
exactamente así.

## El ciclo

Un PRD se escribe de fuera hacia dentro, el problema antes que la solución, siempre, en cuatro fases. La fase 1
soporta todo el peso: un PRD construido sobre un problema difuso queda pulido hasta el final y aun así
es erróneo.

1. **Fija la declaración del problema.** Una frase: quién tiene qué problema, cuándo, y el
   coste de dejarlo así. Sin lenguaje de solución. Todo lo que sigue debe remitir a esto.
   **Está hecho cuando:** la declaración del problema se sostiene sola sin nombrar ninguna funcionalidad, y
   un desconocido podría decir qué significa "resuelto".
2. **Establece la línea base de la métrica de éxito.** El único número que demuestra que el problema se resolvió,
   con su *línea base actual* y el movimiento que cuenta como éxito. Lleva aquí cualquier riesgo
   de `/assumption-mapper` como pregunta abierta, no como apuesta silenciosa.
   **Está hecho cuando:** la métrica tiene línea base (o se marca explícitamente como sin línea base)
   y mide el problema, no la actividad.
3. **Redacta las secciones, cada una remitiendo hacia arriba.** Rellena la plantilla (abajo) de modo que cada
   requisito e historia remita a la declaración del problema; descarta lo que no lo haga.
   Etiqueta los hechos con su procedencia: un número adivinado es una [corazonada], y así se marca.
   **Está hecho cuando:** cada requisito remite a la declaración del problema y cada
   hecho afirmado lleva [datos]/[corazonada]/[suposición].
4. **Entrega.** Haz visibles la métrica de éxito y la(s) iniciativa(s) para que
   `/rice-prioritisation` pueda puntuar el Impact desde *esta* métrica, no desde una reinventada.
   **Está hecho cuando:** el PRD nombra la métrica y el alcance que `/rice-prioritisation` necesitaría
   para puntuarla sin volver a preguntar.

## Entradas Requeridas

Pregunta al usuario por estas si no están proporcionadas:
- **Nombre de la característica o producto**
- **Problema que se resuelve** (desde la perspectiva del usuario)
- **Usuario objetivo** (rol, contexto, qué está tratando de lograr)
- **Métricas de éxito** (¿cómo sabrás que funcionó?)
- **Alcance** (MVP vs visión completa — qué está dentro y fuera del alcance)
- **Stakeholders clave** (quién necesita revisar y aprobar)

## Lee desde / Escribe en el Cerebro

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo en lugar de preguntar por contexto que ya tienes:

- **Lee primero:** `context.md` (producto, definiciones de métricas, voz), `knowledge/strategy.md`
  (hacia dónde va el producto), cualquier `hypotheses/` relacionada y el archivo de entidad `entities/` correspondiente.
  Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<feature>"` para extraer
  hechos fundamentados y lleva sus etiquetas de procedencia al PRD (no presentes una `[hunch]` como un
  requisito establecido).
- **Escribe después:** guarda la característica como/en `entities/<feature>.md`, registra cualquier decisión de alcance en
  `decisions/`, y añade nuevas suposiciones a `hypotheses/`. Etiqueta cada una con su procedencia.

## Materiales Más Profundos

Esta habilidad incluye dos archivos de apoyo — úsalos cuando estén disponibles:

- **`templates/prd-skeleton.md`** — esqueleto PRD para rellenar con una pista de "qué es bueno" por sección. Comienza desde aquí cuando el usuario quiera un documento para completar ellos mismos en lugar de un borrador generado.
- **`references/success-metrics-guide.md`** — calibración para la sección de Métricas de Éxito: la prueba de métrica de cuatro partes, el conjunto estándar de adopción/resultado/negocio/protección, y las trampas comunes. Consúltalo siempre que escribas o revises la tabla de métricas.

## Estructura de la Plantilla

Todo PRD debe incluir estas secciones en orden:

### 1. Descripción General
- **Declaración de Problema**: ¿Qué problema estamos resolviendo? (2-3 oraciones)
- **Solución Propuesta**: Descripción de alto nivel de lo que estamos construyendo (2-3 oraciones)
- **Métricas de Éxito**: Cómo mediremos el éxito (3-5 métricas clave)

### 2. Contexto e Historia
- **Por Qué Ahora**: ¿Por qué es este el momento correcto?
- **Alineación Estratégica**: ¿Cómo se alinea esto con los objetivos de la empresa?
- **Resumen de Investigación de Usuario**: Insights clave de la investigación (si aplica)

### 3. Historias de Usuario y Casos de Uso
Formato: "Como [tipo de usuario], quiero [acción] para que [beneficio]"
- Incluye 3-7 historias de usuario primarias
- Añade criterios de aceptación para cada una

### 4. Requisitos
**Requisitos Funcionales:**
- Características imprescindibles (P0)
- Características deseables (P1)
- Características opcionales (P2)

**Requisitos No Funcionales:**
- Expectativas de rendimiento
- Consideraciones de seguridad
- Requisitos de accesibilidad

### 5. Diseño e Experiencia de Usuario
- Enlace a mocks de diseño o wireframes
- Flujos de usuario clave
- Casos edge y estados de error

### 6. Consideraciones Técnicas
- Implicaciones de arquitectura
- Dependencias en otros sistemas
- Riesgos técnicos y mitigaciones

### 7. Plan de Implementación
- **Fase 1 (MVP)**: Qué va en la primera versión
- **Fase 2**: Qué viene después
- **Fase 3**: Mejoras futuras

### 8. Preguntas Abiertas
- Decisiones que aún necesitan tomarse
- Stakeholders a consultar
- Investigación necesaria

### 9. Apéndice
- Enlaces de investigación
- Documentos relacionados
- Análisis competitivo

## Directrices de Escritura

**Tono**: Claro, conciso, accionable
**Audiencia**: Ingenieros, diseñadores, stakeholders
**Extensión**: Aspira a 3-6 páginas para características, 8-12 para productos

**Mejores Prácticas:**
- Usa ejemplos concretos sobre abstracciones
- Incluye "por qué" no solo "qué"
- Haz los requisitos comprobables
- Enlaza a materiales de apoyo
- Actualiza a medida que se tomen decisiones

## Qué Hace un Buen PRD

✅ **Haz:**
- Escribe desde la perspectiva del usuario
- Incluye métricas de éxito específicas
- Aborda casos edge
- Enlaza a investigación y datos
- Haz los trade-offs explícitos

❌ **No hagas:**
- Escribas detalles de implementación (eso es especificación técnica)
- Asumas que todos tienen contexto
- Dejes requisitos ambiguos
- Omitas el "por qué"
- Olvides la accesibilidad

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Anclaje del problema** | Problema planteado desde la perspectiva de la empresa, o afirmado sin evidencia | Problema enmarcado desde el usuario, pero los datos de apoyo son vagos ("los usuarios están frustrados") y no se cita investigación | El problema es del usuario, cuantificado con datos del estado actual, y el Por qué ahora explica qué cambió; las afirmaciones remiten a investigación citada |
| **Verificabilidad de los requisitos** | Los requisitos son cualidades vagas ("rápido", "intuitivo") que un revisor no podría verificar | La mayoría de los requisitos son concretos, pero los criterios de aceptación son escasos y los requisitos no funcionales son de plantilla | Cada elemento P0/P1/P2 y cada NFR es verificable (umbrales, percentiles, estándares) y remite a una historia de usuario o a un hallazgo de investigación |
| **Rigor de las métricas** | Faltan métricas de éxito, o hay porcentajes sin línea base | Hay líneas base y objetivos, pero las métricas solo miden adopción; nada detectaría que la funcionalidad triunfa mientras el negocio pierde | Cada métrica tiene línea base → objetivo, el conjunto cubre resultado además de adopción, y al menos una barrera protege de ganar la métrica dañando al usuario |
| **Honestidad sobre alcance y riesgo** | El MVP y las fases futuras se mezclan; no hay preguntas abiertas | Las fases están separadas, pero faltan las razones de los cortes y los desacuerdos se suavizan | Cada límite de fase tiene una razón declarada, las peticiones fuera de alcance se registran con condiciones de reentrada, y cada pregunta abierta tiene responsable, fecha límite y el coste de cada respuesta |

## Verificaciones de Calidad

- [ ] La declaración del problema está escrita desde la perspectiva del usuario (no la de la empresa)
- [ ] Las métricas de éxito son específicas y medibles
- [ ] Las historias de usuario incluyen criterios de aceptación
- [ ] Los requisitos son comprobables (no vagos)
- [ ] Las preguntas abiertas se enumeran explícitamente
- [ ] El plan de implementación distingue MVP de fases futuras

## Anti-Patrones

- [ ] No escribas requisitos desde la perspectiva de la empresa — cada requisito debe rastrearse hasta una necesidad del usuario
- [ ] No incluyas requisitos vagos como "el sistema debe ser rápido" — cada requisito debe ser comprobable
- [ ] No confundas MVP con fases futuras — sé explícito sobre qué está y qué no está dentro del alcance para el primer lanzamiento
- [ ] No dejes métricas de éxito como porcentajes sin líneas base — especifica el estado actual y el objetivo
- [ ] No omitas preguntas abiertas — las suposiciones no resueltas son riesgos; exponerlas es el trabajo del PM

## Ejemplo de Apertura PRD

```
# PRD: Dashboard Unificado de Soporte al Cliente Multicanal

## Descripción General

**Declaración de Problema**: Los equipos de soporte están administrando actualmente consultas de clientes a través de correo electrónico, chat y redes sociales usando tres herramientas separadas, lo que genera respuestas retrasadas, trabajo duplicado y experiencias de cliente inconsistentes. En promedio, los agentes de soporte pierden 2,3 horas diarias cambiando entre herramientas y rastreando manualmente el historial de conversaciones.

**Solución Propuesta**: Construir un dashboard unificado que agregue consultas de clientes de todos los canales en una sola interfaz, mantenga el historial de conversaciones entre canales y proporcione enrutamiento inteligente basado en experiencia y disponibilidad del agente.

**Métricas de Éxito**:
- Reducir el tiempo de respuesta promedio de 4 horas a 1 hora
- Disminuir el tiempo de cambio de herramientas en un 80% (de 2,3 a <0,5 horas)
- Mejorar la puntuación de satisfacción del cliente de 3,8 a 4,5 (de 5)
- Aumentar la productividad del agente de soporte en un 35%

## Contexto e Historia

**Por Qué Ahora**: La satisfacción del cliente ha disminuido un 15% en los últimos 6 meses, principalmente debido a tiempos de respuesta lentos. Nuestro competidor principal lanzó un dashboard de soporte unificado el trimestre pasado, y estamos escuchando sobre él en llamadas de ventas. La rotación del equipo de soporte es del 45% anual, con "complejidad de herramientas" citada como una frustración principal.

**Alineación Estratégica**: Esto se alinea con nuestro objetivo de empresa Q1 de "Mejorar la retención de clientes en un 10%" y el OKR del equipo de soporte de "Reducir el tiempo promedio de manejo en un 25%."

**Resumen de Investigación de Usuario**: Realizamos entrevistas con 12 agentes de soporte y observamos 20 horas de sesiones de soporte. Hallazgos clave:
- Los agentes pasan el 35% de su tiempo encontrando contexto de interacciones anteriores
- El 65% de las escaladas se deben a la falta de historial de conversaciones
- Los agentes calificaron el cambio de herramientas como su #1 frustración diaria (9,2/10 dolor)
- El NPS actual para la experiencia de soporte es -12

## Historias de Usuario y Casos de Uso

**HU1: Bandeja Unificada**
Como agente de soporte, quiero ver todas las consultas de clientes en un solo lugar para no perder solicitudes urgentes y pueda priorizar efectivamente.

Criterios de Aceptación:
- La bandeja muestra consultas de correo electrónico, chat y redes sociales
- Las consultas se ordenan por prioridad (urgente, alta, normal, baja)
- El agente puede filtrar por canal, cliente o estado
- Actualizaciones en tiempo real cuando llegan nuevas consultas

**HU2: Contexto Multicanal**
Como agente de soporte, quiero ver el historial completo de conversaciones independientemente del canal para poder proporcionar respuestas consistentes e informadas sin pedir a los clientes que se repitan.

Criterios de Aceptación:
- Vista de línea de tiempo muestra todas las interacciones cronológicamente
- Cada interacción muestra canal, marca de tiempo y contenido
- El perfil del cliente muestra datos demográficos e información de cuenta
- Los problemas anteriores y resoluciones son accesibles

[Continúa con 5-7 historias de usuario totales...]
```

## Frases de activación de ejemplo

- "Escribe un PRD."
- "Escribe una especificación de producto para esta funcionalidad."
- "Escribe la especificación de la funcionalidad."
- "Escribe un documento de requisitos para una nueva funcionalidad."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/prd-template.html
