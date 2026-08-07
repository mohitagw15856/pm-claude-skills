---
name: prd-template
language: es
description: "Crea un Documento de Requerimientos de Producto (PRD) siguiendo una estructura de plantilla probada de gestión de producto. Úsalo cuando te pidan escribir un PRD, una especificación de producto, una especificación de funcionalidad o un documento de requerimientos para un producto o funcionalidad nueva. Produce un PRD completo con planteamiento del problema, historias de usuario, requerimientos funcionales, consideraciones técnicas y métricas de éxito."
---

> Traducción al español de [prd-template](../../../skills/prd-template/SKILL.md) — la versión en inglés es la canónica.

# Habilidad de Plantilla de PRD

Esta habilidad ayuda a crear Documentos de Requerimientos de Producto profesionales siguiendo las mejores prácticas de la industria.

## Dónde encaja — el centro de la cadena

Segunda en la cadena de decisiones de producto: **`/assumption-mapper` → `prd-template`
→ `/rice-prioritisation` → `/roadmap-narrative`**. Recibe **la suposición más riesgosa**
de `/assumption-mapper` (si se ejecutó, lee su mapa en vez de re-adivinar los riesgos) y
le entrega a `/rice-prioritisation` **la métrica de éxito del PRD** — el único número con
línea base que se convierte en el *Impacto* de RICE. Los términos compartidos
(planteamiento del problema, hipótesis, métrica de éxito, procedencia) están definidos una
sola vez en [`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md);
úsalos con exactitud.

## El bucle

Un PRD se escribe de afuera hacia adentro — el problema antes que la solución, siempre —
en cuatro fases. La fase 1 es la que sostiene todo: un PRD construido sobre un problema
difuso se pule hasta el final y sigue estando equivocado.

1. **Fija el planteamiento del problema.** Una frase: quién tiene qué problema, cuándo, y
   el costo de dejarlo sin resolver. Sin lenguaje de solución. Todo lo de abajo debe
   remontar a esto.
   **Listo cuando:** el planteamiento se sostiene solo sin nombrar ninguna funcionalidad,
   y un extraño podría decir qué significa "resuelto".
2. **Establece la línea base de la métrica de éxito.** El número que prueba que el
   problema se resolvió — con su *línea base actual* y el movimiento que cuenta como
   éxito. Lleva cualquier riesgo de `/assumption-mapper` aquí como Pregunta Abierta, no
   como apuesta silenciosa.
   **Listo cuando:** la métrica tiene línea base (o está marcada explícitamente sin
   línea base), y mide el problema, no la actividad.
3. **Redacta las secciones, cada una remontando hacia arriba.** Completa la plantilla
   (abajo) de modo que cada requerimiento e historia remonte al planteamiento del
   problema; descarta lo que no. Etiqueta los hechos con procedencia — un número adivinado
   es un [hunch], etiquetado.
   **Listo cuando:** cada requerimiento remonta al planteamiento del problema, y cada
   hecho afirmado lleva [data]/[hunch]/[assumption].
4. **Entrega.** Expón la métrica de éxito y la(s) iniciativa(s) para que
   `/rice-prioritisation` puntúe el Impacto a partir de *esta* métrica, no de una
   reinventada.
   **Listo cuando:** el PRD nombra la métrica y el alcance que `/rice-prioritisation`
   necesitaría para puntuar sin volver a preguntar.

## Entradas requeridas

Pídele al usuario lo siguiente si no lo proporcionó:
- **Nombre de la funcionalidad o del producto**
- **Problema que se resuelve** (desde la perspectiva del usuario)
- **Usuario objetivo** (rol, contexto, qué intenta lograr)
- **Métricas de éxito** (¿cómo sabrás que funcionó?)
- **Alcance** (MVP vs. visión completa — qué entra y qué queda fuera del alcance)
- **Actores clave** (quién necesita revisar y aprobar)

## Lee del Brain / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo en lugar de pedir contexto que ya tienes:

- **Lee primero:** `context.md` (producto, definiciones de métricas, voz), `knowledge/strategy.md`
  (hacia dónde va el producto), cualquier `hypotheses/` relacionada y el archivo de la funcionalidad
  correspondiente en `entities/`. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<funcionalidad>"`
  para extraer hechos fundamentados, y traslada sus etiquetas de procedencia al PRD (no presentes una
  `[hunch]` (corazonada) como un requerimiento resuelto).
- **Escribe después:** guarda la funcionalidad como/dentro de `entities/<funcionalidad>.md`, registra cualquier
  decisión de alcance en `decisions/` y agrega los supuestos nuevos a `hypotheses/`. Etiqueta cada uno con su procedencia.

## Materiales de apoyo

Esta habilidad incluye dos archivos de soporte — úsalos cuando estén disponibles:

- **`templates/prd-skeleton.md`** — un esqueleto de PRD para completar, con una pista de "así se ve un buen resultado" por sección. Parte de él cuando el usuario quiera un documento para completar por su cuenta en lugar de un borrador generado.
- **`references/success-metrics-guide.md`** — calibración para la sección de Métricas de Éxito: la prueba de cuatro partes para una métrica, el conjunto estándar de adopción/resultado/negocio/salvaguarda, y las trampas más comunes. Consúltalo siempre que escribas o revises la tabla de métricas.

## Estructura de la plantilla

Todo PRD debe incluir estas secciones, en este orden:

### 1. Resumen general
- **Planteamiento del problema**: ¿Qué problema estamos resolviendo? (2-3 oraciones)
- **Solución propuesta**: Descripción de alto nivel de lo que vamos a construir (2-3 oraciones)
- **Métricas de éxito**: Cómo mediremos el éxito (3-5 métricas clave)

### 2. Contexto y antecedentes
- **Por qué ahora**: ¿Por qué es este el momento adecuado?
- **Alineación estratégica**: ¿Cómo se alinea esto con los objetivos de la empresa?
- **Resumen de investigación de usuarios**: Hallazgos clave de la investigación (si aplica)

### 3. Historias de usuario y casos de uso
Formato: "Como [tipo de usuario], quiero [acción] para [beneficio]"
- Incluye de 3 a 7 historias de usuario principales
- Agrega criterios de aceptación para cada una

### 4. Requerimientos
**Requerimientos funcionales:**
- Funcionalidades imprescindibles (P0)
- Funcionalidades deseables (P1)
- Funcionalidades opcionales (P2)

**Requerimientos no funcionales:**
- Expectativas de rendimiento
- Consideraciones de seguridad
- Requerimientos de accesibilidad

### 5. Diseño y experiencia de usuario
- Enlace a maquetas de diseño o wireframes
- Flujos de usuario clave
- Casos límite y estados de error

### 6. Consideraciones técnicas
- Implicaciones de arquitectura
- Dependencias de otros sistemas
- Riesgos técnicos y mitigaciones

### 7. Plan de implementación
- **Fase 1 (MVP)**: Qué entra en la primera versión
- **Fase 2**: Qué viene después
- **Fase 3**: Mejoras futuras

### 8. Preguntas abiertas
- Decisiones que todavía deben tomarse
- Actores a consultar
- Investigación pendiente

### 9. Apéndice
- Enlaces a investigación
- Documentos relacionados
- Análisis competitivo

## Pautas de redacción

**Tono**: Claro, conciso, accionable
**Audiencia**: Ingenieros, diseñadores, actores clave
**Extensión**: Apunta a 3-6 páginas para funcionalidades, 8-12 para productos

**Mejores prácticas:**
- Usa ejemplos concretos en lugar de abstracciones
- Incluye el "por qué", no solo el "qué"
- Haz que los requerimientos sean verificables
- Enlaza a materiales de soporte
- Actualiza el documento a medida que se toman decisiones

## Qué distingue a un buen PRD

✅ **Sí:**
- Escribe desde la perspectiva del usuario
- Incluye métricas de éxito específicas
- Aborda los casos límite
- Enlaza a investigación y datos
- Haz explícitos los compromisos y sacrificios

❌ **No:**
- Escribas detalles de implementación (eso es la especificación técnica)
- Asumas que todos tienen el contexto
- Dejes requerimientos ambiguos
- Omitas el "por qué"
- Olvides la accesibilidad

## Rúbrica de puntuación (0–40)

Puntúa cualquier salida de esta habilidad antes de entregarla; 32+ es calidad lista para publicar.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Fundamento del problema** | El problema se plantea desde la perspectiva de la empresa, o se afirma sin evidencia | Problema enmarcado desde el usuario, pero los datos de soporte son vagos ("los usuarios están frustrados") y no se cita investigación | El problema es del usuario, cuantificado con datos del estado actual, y el "Por qué ahora" explica qué cambió; las afirmaciones se rastrean a investigación citada |
| **Verificabilidad de los requerimientos** | Los requerimientos son cualidades vagas ("rápido", "intuitivo") que un revisor no podría verificar | La mayoría de los requerimientos son concretos, pero los criterios de aceptación son escuetos y los requerimientos no funcionales son de relleno | Cada ítem P0/P1/P2 y cada RNF es verificable (umbrales, percentiles, estándares), y cada uno se rastrea a una historia de usuario o a un hallazgo de investigación |
| **Rigor de las métricas** | Faltan métricas de éxito, o son porcentajes sin línea base | Hay líneas base y objetivos, pero las métricas solo miden adopción — nada detectaría que la funcionalidad tenga éxito mientras el negocio pierde | Cada métrica tiene línea base → objetivo, el conjunto cubre resultado además de adopción, y al menos una salvaguarda protege contra ganar la métrica dañando al usuario |
| **Honestidad de alcance y riesgo** | El MVP y las fases futuras se mezclan; no se listan preguntas abiertas | Las fases están separadas, pero faltan las razones de los cortes y los desacuerdos se disimulan | Cada límite de fase tiene una razón explícita, lo excluido del alcance queda registrado con condiciones de reingreso, y las preguntas abiertas tienen responsable, fecha límite y el costo de cada respuesta |

## Controles de calidad

- [ ] El planteamiento del problema está escrito desde la perspectiva del usuario (no de la empresa)
- [ ] Las métricas de éxito son específicas y medibles
- [ ] Las historias de usuario incluyen criterios de aceptación
- [ ] Los requerimientos son verificables (no vagos)
- [ ] Las preguntas abiertas se listan explícitamente
- [ ] El plan de implementación distingue el MVP de las fases futuras

## Anti-patrones

- [ ] No escribas requerimientos desde la perspectiva de la empresa — cada requerimiento debe rastrearse a una necesidad del usuario
- [ ] No incluyas requerimientos vagos como "el sistema debe ser rápido" — cada requerimiento debe ser verificable
- [ ] No mezcles el MVP con las fases futuras — sé explícito sobre qué entra y qué no en la primera versión
- [ ] No dejes métricas de éxito como porcentajes sin línea base — especifica el estado actual y el objetivo
- [ ] No omitas las preguntas abiertas — los supuestos sin resolver son riesgos; visibilizarlos es el trabajo del PM

## Ejemplo de apertura de un PRD

```
# PRD: Panel Multicanal de Atención al Cliente

## Resumen general

**Planteamiento del problema**: Los equipos de soporte gestionan actualmente las consultas de clientes por correo, chat y redes sociales con tres herramientas separadas, lo que genera respuestas tardías, trabajo duplicado y experiencias de cliente inconsistentes. En promedio, los agentes de soporte pierden 2.3 horas al día cambiando entre herramientas y rastreando manualmente el historial de conversaciones.

**Solución propuesta**: Construir un panel unificado que agregue las consultas de clientes de todos los canales en una sola interfaz, mantenga el historial de conversaciones entre canales y ofrezca enrutamiento inteligente según la experiencia y disponibilidad del agente.

**Métricas de éxito**:
- Reducir el tiempo promedio de respuesta de 4 horas a 1 hora
- Disminuir el tiempo de cambio entre herramientas en 80% (de 2.3 a <0.5 horas)
- Mejorar la puntuación de satisfacción del cliente de 3.8 a 4.5 (sobre 5)
- Aumentar la productividad de los agentes de soporte en 35%

## Contexto y antecedentes

**Por qué ahora**: La satisfacción del cliente cayó 15% en los últimos 6 meses, principalmente por tiempos de respuesta lentos. Nuestro principal competidor lanzó un panel de soporte unificado el trimestre pasado, y ya lo escuchamos en llamadas de ventas. La rotación del equipo de soporte es del 45% anual, con la "complejidad de las herramientas" citada como frustración principal.

**Alineación estratégica**: Esto se alinea con el objetivo de la empresa para el Q1 de "Mejorar la retención de clientes en 10%" y con el OKR del equipo de soporte de "Reducir el tiempo promedio de gestión en 25%".

**Resumen de investigación de usuarios**: Realizamos entrevistas con 12 agentes de soporte y observamos 20 horas de sesiones de soporte. Hallazgos clave:
- Los agentes dedican 35% de su tiempo a buscar contexto de interacciones previas
- El 65% de los escalamientos se debe a la falta de historial de conversaciones
- Los agentes calificaron el cambio entre herramientas como su frustración diaria #1 (dolor de 9.2/10)
- El NPS actual de la experiencia de soporte es -12

## Historias de usuario y casos de uso

**HU1: Bandeja de entrada unificada**
Como agente de soporte, quiero ver todas las consultas de clientes en un solo lugar para no perder solicitudes urgentes y poder priorizar con eficacia.

Criterios de aceptación:
- La bandeja muestra consultas de correo, chat y redes sociales
- Las consultas se ordenan por prioridad (urgente, alta, normal, baja)
- El agente puede filtrar por canal, cliente o estado
- Actualizaciones en tiempo real cuando llegan consultas nuevas

**HU2: Contexto entre canales**
Como agente de soporte, quiero ver el historial completo de la conversación sin importar el canal, para dar respuestas consistentes e informadas sin pedirle al cliente que se repita.

Criterios de aceptación:
- La vista de línea de tiempo muestra todas las interacciones en orden cronológico
- Cada interacción muestra canal, marca de tiempo y contenido
- El perfil del cliente muestra datos demográficos e información de la cuenta
- Los problemas y resoluciones anteriores son accesibles

[Continuar hasta 5-7 historias de usuario en total...]
```
