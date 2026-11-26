---
# machine-translated to es from skills/stakeholder-update/SKILL.md — review: pending. Native fixes welcome via PR.
name: stakeholder-update
description: "Crear actualizaciones ejecutivas concisas para stakeholders usando el framework BLUF (Bottom Line Up Front). Usa cuando te pidan escribir una actualización de estado, reporte de progreso, comunicación de proyecto o briefing ejecutivo para liderazgo o stakeholders. Produce una actualización encabezada por BLUF con estado, métricas clave, riesgos, hitos próximos y decisiones necesarias — legible en menos de 2 minutos."
---

# Skill de Actualización de Stakeholders

Esta skill crea actualizaciones de estado efectivas para ejecutivos y stakeholders siguiendo el principio BLUF (Bottom Line Up Front).

## Inputs Requeridos

Pregunta al usuario por estos si no están disponibles:
- **Proyecto o producto siendo reportado**
- **Audiencia** (CEO, junta directiva, líderes multifuncionales, inversores — cambia profundidad y formato)
- **Período** (esta semana / este sprint / este mes)
- **Estado actual** (en curso / en riesgo / bloqueado)
- **Métricas clave** y sus valores actuales vs. objetivos

## Lee de / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo antes de preguntar:

- **Lee primero:** los archivos relevantes `stakeholders/` (qué le importa a cada persona y sus solicitudes previas), `context.md` (voz/tono), y `decisions/` recientes para qué ha cambiado desde la última actualización.
- **Escribe después:** añade cualquier nueva solicitud, preocupación o compromiso surgido al archivo `stakeholders/` relevante, etiquetado con procedencia (`[verbal]` para algo dicho en una reunión, no aún documentado).

## Materiales Más Profundos

- **`references/status-honesty-guide.md`** — calibración para la llamada 🟢/🟡/🔴 (el problema de la sandía, la regla de 🟡 consecutivos, re-baselining honesto) y fact → impact → action → ask frasing para malas noticias. Aplícalo siempre que el estado sea 🟡/🔴 o el input parezca más optimista que las métricas.
- **`templates/update-skeleton.md`** — una actualización de una página para rellenar con las compuertas de calidad inline y una lista de verificación pre-envío. Ofrécela a usuarios que quieran escribir actualizaciones por sí mismos.

## Estructura de Actualización

### 1. BLUF (Bottom Line Up Front)
Empieza con la información más importante:
- **Estado**: 🟢 En curso / 🟡 En riesgo / 🔴 Bloqueado / ✅ Completo
- **Punto Clave**: Resumen de una frase del estado actual
- **Acción Requerida**: Qué necesitas de los stakeholders (si algo)

### 2. Resumen de Progreso
Descripción breve de logros:
- Qué se deployó en este período
- Hitos alcanzados
- Movimiento de métricas clave

Mantén a máximo 3-5 puntos.

### 3. Panel de Control de Métricas

**Métricas Clave**
| Métrica | Actual | Objetivo | Tendencia | Estado |
|---------|--------|----------|-----------|--------|
| [Nombre de métrica] | [Valor] | [Objetivo] | ↑/→/↓ | 🟢/🟡/🔴 |

Incluye solo 3-5 métricas más importantes.

### 4. Riesgos y Bloqueadores

**Problemas de Alta Prioridad:**
- **Problema**: Descripción breve
- **Impacto**: Qué está en juego
- **Mitigación**: Qué estás haciendo al respecto
- **Ayuda Necesaria**: Qué pueden hacer los stakeholders (si aplica)

Incluye solo problemas que importen a nivel ejecutivo.

### 5. Próximos Hitos

**Próximos 30 Días:**
- Hito (fecha esperada)
- Hito (fecha esperada)

**Próximos 90 Días:**
- Hito mayor (mes)
- Hito mayor (mes)

### 6. Decisiones Necesarias (si aplica)
- **Decisión**: Descripción clara
- **Opciones**: 2-3 opciones con pros/contras
- **Recomendación**: Qué recomiendas y por qué
- **Cronograma**: Cuándo se necesita la decisión

## Guías de Escritura

**Tono**: Profesional, conciso, orientado a la acción
**Largo**: Mantén bajo 1 página (o 2 minutos de lectura)
**Frecuencia**: Semanal para proyectos activos, bisemanal para mantenimiento

**Principios de Comunicación Ejecutiva:**

1. **Encabeza con conclusiones, no procesos**
   - ❌ "Corrimos 5 experimentos esta semana y analizamos los datos..."
   - ✅ "La tasa de conversión aumentó 15% por trabajo de optimización"

2. **Enfócate en impacto, no actividades**
   - ❌ "Realizamos 12 entrevistas con clientes"
   - ✅ "Identificamos la barrera #1 para adopción (complejidad de configuración)"

3. **Haz los problemas visibles temprano**
   - No minimices riesgos
   - Propón soluciones, no solo problemas
   - Sé específico sobre la ayuda necesaria

4. **Usa datos para contar la historia**
   - Cuantifica siempre que sea posible
   - Muestra tendencias, no solo snapshots
   - Conecta métricas a resultados de negocio

5. **Hazlo explorable**
   - Usa encabezados y viñetas
   - Destaca información clave en negrita
   - Usa indicadores visuales (🟢🟡🔴, ↑→↓)

## Guías de Estado

**🟢 En Curso**: Cumpliendo todos los objetivos, sin riesgos significativos
**🟡 En Riesgo**: Posibles problemas que podrían impactar entrega
**🔴 Bloqueado**: Problemas críticos previniendo progreso, necesita intervención

## Ejemplo de Actualización

```
# Actualización de Producto: Rediseño de Onboarding de Clientes
**Semana del 20 de enero, 2026**

## BLUF
**Estado**: 🟡 En Riesgo  
**Punto Clave**: El nuevo flujo de onboarding se desempeña bien en pruebas (+35% completación), pero el lanzamiento se retrasa una semana por problemas de integración con el sistema de facturación.  
**Acción Requerida**: Decisión necesaria sobre si lanzar el onboarding por separado o esperar la corrección de la integración de facturación.

## Resumen de Progreso
- Completamos pruebas de usuario con 24 participantes (94% feedback positivo)
- Implementamos mejoras de experiencia de primer usuario
- Resolvimos 12 de 15 bugs identificados en QA
- Ingeniería asignó recursos para corregir integración de facturación

## Métricas Clave
| Métrica | Actual | Objetivo | Tendencia | Estado |
|---------|--------|----------|-----------|--------|
| Completación de Onboarding | 45% | 60% | → | 🟡 |
| Tiempo a Primer Valor | 4.2 min | 3.0 min | ↓ | 🟢 |
| Tickets de Soporte de Setup | 45/semana | <30/semana | ↓ | 🟢 |
| Tasa de Activación de Usuario | 52% | 65% | → | 🟡 |

## Riesgos y Bloqueadores

**ALTO: Retraso en Integración de Sistema de Facturación**
- **Impacto**: Impide que usuarios completen flujo de onboarding; retrasa lanzamiento 1-2 semanas
- **Causa Raíz**: Deprecación de API por procesador de pagos, requiere reescritura de código
- **Mitigación**: Equipo de Ingeniería reasignó recursos, ETA de corrección 3 de febrero
- **Decisión Necesaria**: ¿Lanzar onboarding sin integración de pagos o esperar la corrección? (Ver más abajo)

**MEDIO: Cobertura de Pruebas en Mobile**
- **Impacto**: Algunos casos límite en dispositivos Android antiguos no probados
- **Mitigación**: Colaborando con QA para expandir matriz de pruebas; ejecutando beta con usuarios internos en dispositivos diversos

## Próximos Hitos

**Próximos 30 Días:**
- Resolver integración de facturación (3 de febrero)
- Lanzar rediseño de onboarding (5 de febrero o 12 de febrero según decisión)
- Comenzar a medir impacto en conversión (12 de febrero)

**Próximos 90 Días:**
- Iterar basado en datos de producción (marzo)
- Extender a aplicación mobile (abril)
- Lanzar funcionalidades avanzadas (mayo)

## Decisión Necesaria

**¿Deberíamos lanzar onboarding por separado de la integración de facturación?**

**Opción A: Lanzar Ahora (Recomendado)**
- Pros: Lleva mejora de completación del 35% a usuarios inmediatamente, recopila datos de producción, mantiene momentum
- Contras: Usuarios necesitan completar pago en flujo antiguo, experiencia ligeramente desarticulada
- Cronograma: Lanzar 5 de febrero

**Opción B: Esperar Corrección de Facturación**
- Pros: Experiencia completamente integrada desde el día uno, sin deuda técnica
- Contras: Retrasa beneficios 2 semanas, objetivos Q1 en riesgo, momentum del equipo se pierde
- Cronograma: Lanzar 12 de febrero

**Recomendación**: Opción A. Las mejoras de onboarding son valiosas independientemente, y el flujo de pago antiguo funciona bien. Esperar arriesga perder objetivos Q1 y retrasa mejoras validadas para llegar a usuarios.

**Cronograma**: Se necesita decisión antes del 22 de enero para lanzamiento del 5 de febrero.

---

**¿Preguntas?** Responde este correo o contáctame en Slack.
```

## Guía de Frecuencia

**Standups diarios**: 
- Ultra breve (3 viñetas)
- Qué se deployó ayer
- Qué se despliega hoy
- Bloqueadores

**Actualizaciones semanales**:
- Usa plantilla completa arriba
- Enfócate en progreso y riesgos
- Mantén a 1 página

**Reseñas mensuales**:
- Análisis de métricas más profundo
- Reflexiones estratégicas
- Progreso de objetivos trimestrales
- Formato más largo (2-3 páginas) aceptable

**Reseñas trimestrales de negocio**:
- Análisis comprensivo
- Tendencias en el tiempo
- Recomendaciones estratégicas
- Formato de presentación

## Adaptación por Audiencia

### Para C-Suite
- Encabeza con impacto de negocio
- Conecta a OKRs de empresa
- Enfócate en estrategia y resultados
- Minimiza detalles técnicos

### Para Liderazgo de Producto/Ingeniería
- Incluye contexto técnico
- Muestra progreso de sprint/hito
- Discute implicaciones de arquitectura
- Referencia deuda técnica

### Para Equipos Multifuncionales
- Equilibra contexto técnico y de negocio
- Destaca dependencias
- Señala necesidades de colaboración
- Haz solicitudes explícitas

### Para Junta Directiva/Inversores
- Enfócate en métricas y tracción
- Posicionamiento competitivo
- Oportunidades de mercado
- Implicaciones financieras

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **BLUF y honestidad del estado** | El estado está enterrado o falta; la actualización se lee como un diario de actividades | Estado y conclusión al principio, pero el emoji halaga a las métricas (verde por fuera, rojo por dentro) | Las tres primeras líneas dan el estado, la conclusión en una frase y la petición; el 🟢/🟡/🔴 coincide con la peor métrica relevante y explica por qué |
| **Contexto de las métricas** | Números en bruto sin objetivos, tendencias ni comparación entre periodos | Hay objetivos, pero las métricas son recuentos de actividad desconectados de los resultados de negocio | De 3 a 5 métricas, cada una con objetivo, tendencia y estado, y las que importan están ligadas a dinero, clientes o el objetivo en juego |
| **Accionabilidad de los riesgos** | Los riesgos se enumeran como preocupaciones sin responsable, mitigación ni impacto | Se indican mitigaciones, pero el impacto no está cuantificado y no está claro si el lector debe hacer algo | Cada riesgo tiene impacto cuantificado, una mitigación con fecha o condición de éxito, y una "ayuda necesaria" explícita (o "ninguna") |
| **Encuadre de las decisiones** | Preguntas abiertas lanzadas a la dirección, o ninguna decisión planteada | Se enumeran opciones, pero sin costes, disyuntivas ni recomendación | Cada decisión tiene 2 o 3 opciones con coste, una recomendación clara con su razonamiento y la fecha en que se necesita la decisión, con lo que fuerza esa fecha |

## Comprobaciones de Calidad

- [ ] La actualización encabeza con BLUF — estado, punto clave y acción requerida antes de cualquier detalle
- [ ] Cada métrica tiene comparación de objetivo (no solo un número crudo)
- [ ] Cada riesgo tiene mitigación y bandera "ayuda necesaria" si se requiere acción de stakeholder
- [ ] Decisiones necesarias tienen opciones específicas y recomendación clara
- [ ] Largo total es menos de 1 página / 2 minutos de lectura

## Anti-Patrones

- [ ] No entierres la evaluación de estado en el fondo — BLUF significa que la información más importante viene primero
- [ ] No reportes métricas sin comparación de objetivo o período anterior — números crudos sin contexto no son útiles
- [ ] No listes riesgos sin acciones de mitigación y banderas claras para ayuda de stakeholder necesaria
- [ ] No escribas decisiones necesarias como preguntas sin proporcionar recomendación clara — ejecutivos necesitan opciones, no preguntas abiertas
- [ ] No permitas que la actualización exceda una página — si requiere más, el mensaje necesita edición, no expansión

## Ejecución

Para agentes que usan herramientas y pueden alcanzar canales de comunicación del equipo (Slack, correo). Enviar una actualización es **de cara hacia afuera**: nunca es automático. Runtimes sin acceso a herramientas ignoran esta sección. Ver [SKILLSPEC.md §5](../../SKILLSPEC.md).

### Precondiciones
- El texto final de la actualización ha sido mostrado al humano **literalmente** y explícitamente aprobado — incluyendo la lista exacta de canal/destinatarios.
- El canal o lista de destinatarios es nombrada por el usuario, no inferida del historial.
- Si el estado es 🔴 o contiene una Decisión Necesaria, confirma que el tomador de decisiones nombrado está entre los destinatarios.

### Acciones Permitidas
- Publica el texto aprobado, sin modificaciones, en el único canal aprobado — o envíalo como un correo a los destinatarios aprobados con la línea de asunto aprobada.
- Guarda una copia en la ubicación que el usuario nombre (doc, Brain, archivo de repo).
- Nada más: sin programar envíos recurrentes (ver `schedule-recipe` para eso, con sus propias compuertas), sin @-menciones no presentes en el texto aprobado, sin publicación cruzada.

### Verificación
- Confirma que el mensaje existe en el canal/thread (obtén su permalink) e informa el enlace de vuelta.
- Confirma que el texto enviado es idéntico byte-a-byte al texto aprobado.

### Rollback
- Si la plataforma lo permite, la eliminación de un mensaje recién publicado es permitida **solo** bajo instrucción explícita del humano — de lo contrario publica una respuesta de corrección.
- Detente y pregunta a un humano si: el canal no se encuentra, el envío falla parcialmente, o el texto aprobado ya no coincide con lo que está a punto de ser enviado.

## Frases de activación de ejemplo

- "Escribe una actualización de estado."
- "Escribe un informe de progreso para la dirección."
- "Escribe la actualización del proyecto para los interesados."
- "Escribe un briefing ejecutivo."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/stakeholder-update.html
