---
# machine-translated to es from skills/technical-spec-template/SKILL.md — review: pending. Native fixes welcome via PR.
name: technical-spec-template
description: "Crea documentos de especificación técnica estructurados que conectan requisitos de producto con implementación de ingeniería. Úsalo cuando escribas una especificación técnica, especificación de ingeniería, documento de diseño de sistema o especificación de API. Produce una especificación completa con declaración del problema, solución propuesta, modelo de datos, diseño de API, alternativas consideradas, consideraciones de seguridad, plan de pruebas y estrategia de despliegue."
---

# Skill de Plantilla de Especificación Técnica

Escribe especificaciones técnicas que los ingenieros realmente lean — framing claro del problema, requisitos inequívocos, decisiones explícitas y compensaciones documentadas.

## Entradas Requeridas

Pregunta al usuario por estos datos si no se proporcionan:
- **Descripción de funcionalidad o sistema** (qué necesita especificarse)
- **PRD o brief de producto relacionado** (si está disponible)
- **Revisores de ingeniería** (cuya aprobación es necesaria)
- **Restricciones conocidas** (limitaciones técnicas, requisitos de seguridad, objetivos de rendimiento)

## Cuándo Escribir una Especificación Técnica

Escribe una especificación técnica cuando:
- La funcionalidad requiere cambios en 2+ sistemas
- Hay decisiones arquitectónicas significativas que tomar
- Más de un ingeniero trabajará en la implementación
- La funcionalidad tiene implicaciones de seguridad, privacidad o cumplimiento
- El esfuerzo estimado es >5 story points

Sáltate la especificación para correcciones de bugs triviales o cambios de 1-2 horas.

---

## Formato de Salida de Especificación Técnica

### Especificación Técnica — [Nombre de Funcionalidad]

**Autor:** [Nombre]
**Estado:** Borrador | En Revisión | Aprobado | Implementado
**Creado:** [Fecha] | **Última Actualización:** [Fecha]
**Revisores:** [Líder de Ing., Arquitecto, PM, Seguridad si es necesario]
**PRD Relacionado:** [Enlace] | **Epic de Jira:** [Enlace]

---

#### 1. Declaración del Problema
> [2–3 oraciones. ¿Qué problema estamos resolviendo y por qué ahora? Sin lenguaje de solución aquí.]

#### 2. Objetivos y No-Objetivos

**Objetivos (en alcance):**
- [Resultado específico y medible]
- [Resultado específico y medible]

**No-Objetivos (explícitamente fuera de alcance):**
- [Qué esta especificación NO cubre]
- [Suposición común a descartar tempranamente]

#### 3. Antecedentes y Contexto
[Cualquier trabajo previo, sistemas relacionados, o contexto que los ingenieros necesitan para entender el espacio de decisión. Enlaza a especificaciones previas, ADRs, o investigación.]

#### 4. Solución Propuesta

**Enfoque de Alto Nivel:**
[2–4 oraciones describiendo la solución elegida. ¿Por qué este enfoque vs alternativas?]

**Diagrama de Arquitectura del Sistema:**
[Describe o incrusta: qué servicios están involucrados, cómo fluyen los datos, qué APIs se llaman]

**Cambios del Modelo de Datos:**
```sql
-- Nuevas tablas o cambios de esquema
[Incluye DDL o definición de esquema]
```

**Diseño de API:**
```
[Endpoint] [Método]
Solicitud: { [campos y tipos] }
Respuesta: { [campos y tipos] }
Códigos de error: [lista]
```

**Detalles Clave de Implementación:**
- [Restricción técnica importante o enfoque]
- [Manejo de casos especiales]
- [Dependencia de terceros y versión]

#### 5. Enfoques Alternativos Considerados

| Opción | Pros | Contras | Por Qué Rechazado |
|---|---|---|---|
| [Alt 1] | [Beneficios] | [Desventajas] | [Razón no elegida] |
| [Alt 2] | [Beneficios] | [Desventajas] | [Razón no elegida] |

#### 6. Consideraciones de Seguridad y Privacidad
- Datos almacenados: [Qué datos PII o sensibles están involucrados]
- Autenticación: [Cómo se controla el acceso]
- Autorización: [Qué permisos se requieren]
- Cifrado: [Requisitos en reposo / en tránsito]
- Implicaciones de cumplimiento: [GDPR, SOC2, etc. si es relevante]

#### 7. Rendimiento y Escalabilidad
- Carga esperada: [Solicitudes/segundo, volumen de datos]
- Requisitos de latencia: [Objetivos P50 / P95]
- Estrategia de caché: [Si es aplicable]
- Indexación de base de datos: [Nuevos índices requeridos]
- Cuellos de botella conocidos: [Dónde estar atento]

#### 8. Plan de Pruebas
- Pruebas unitarias: [Escenarios clave a cubrir]
- Pruebas de integración: [Límites del sistema a probar]
- Pruebas de carga: [Si es crítico para el rendimiento]
- Casos especiales: [Escenarios conocidos complicados]
- Plan de reversión: [Cómo revertir si algo sale mal]

#### 9. Plan de Despliegue
- Feature flag: [Sí / No — nombre del flag]
- Etapas de despliegue: [% de usuarios en cada etapa]
- Monitoreo: [Métricas y alertas a configurar]
- Criterios de éxito para progresar en el despliegue: [Qué debe ser verdadero]
- Disparador de reversión: [Qué causaría reversión inmediata]

#### 10. Preguntas Abiertas
| Pregunta | Propietario | Fecha Vencimiento | Resolución |
|---|---|---|---|
| [Pregunta sin resolver] | [Nombre] | [Fecha] | [Pendiente] |

#### 11. Cronograma de Implementación (Aproximado)
| Fase | Trabajo | Esfuerzo Estimado |
|---|---|---|
| [Fase 1] | [Qué se construye] | [X días/points] |
| [Fase 2] | [Qué se construye] | [X días/points] |
| Total | | [X story points] |

---

## Pautas

- La especificación es un registro de decisiones, no una lista de tareas — documenta *por qué* se tomaron las decisiones
- Todas las preguntas abiertas deben tener un propietario y fecha de vencimiento
- Las secciones de seguridad y privacidad nunca son opcionales para funcionalidades que tocan datos de usuario
- Recomenda revisión asincrónica: los ingenieros leen primero, luego una sincronización de 30 minutos para resolver preguntas
- Mantén la especificación actualizada según avanza la implementación — las especificaciones obsoletas son peores que ninguna especificación

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/spec-decisions.md`** — Para qué sirve una especificación: decisiones, alternativas y el radio de impacto. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/spec-skeleton.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Encuadre del problema | La declaración del problema es la solución reformulada ("necesitamos una cola"), o falta; sin no-objetivos | Problema enunciado, pero con lenguaje de solución filtrándose; no-objetivos presentes pero genéricos ("fuera de alcance: todo lo demás") | Problema descrito en términos de usuario o negocio con cifras, independiente de cualquier solución; objetivos medibles; dos o más no-objetivos que cierran suposiciones reales de alcance |
| Documentación de la decisión | Un único enfoque, sin alternativas: una descripción de diseño, no un registro de decisión | Hay tabla de alternativas, pero son espantapájaros (opciones solo con contras que nadie defendió); las razones de rechazo son gusto, no evidencia | Dos o más alternativas genuinas con pros honestos, razones de rechazo basadas en evidencia, disenso registrado donde exista, y desencadenantes de revisión para las decisiones disputadas |
| Profundidad en seguridad y privacidad | Sección omitida o "N/A" en una funcionalidad que toca datos de usuario | Respuestas de plantilla (cifrar en reposo y en tránsito) sin análisis de la exposición de datos concreta de esta funcionalidad | Se enumeran los datos tocados, se nombra el mayor riesgo de privacidad del diseño, se abordan autenticación, autorización y cumplimiento de forma concreta, y los riesgos sin resolver condicionan visiblemente la aprobación |
| Preparación operativa | Sin plan de pruebas, plan de despliegue ni desencadenante de reversión; preguntas abiertas ausentes o todas "por definir" | Pruebas y despliegue esbozados, pero la reversión es una intención sin probar; algunas preguntas abiertas sin responsable ni fecha | Las pruebas cubren los casos límite difíciles, el despliegue es escalonado con criterios de avance, el desencadenante de reversión es concreto (y no deja datos colgados), y cada pregunta abierta tiene responsable y fecha |

## Verificaciones de Calidad

- [ ] La declaración del problema no contiene lenguaje de solución
- [ ] Los no-objetivos enumeran explícitamente al menos 2 cosas que podrían asumirse dentro del alcance
- [ ] Al menos 2 enfoques alternativos se documentan con razones de rechazo
- [ ] La sección de seguridad y privacidad se completa para cualquier funcionalidad que toque datos de usuario
- [ ] Todas las preguntas abiertas tienen un propietario designado y fecha de vencimiento (no "Por Definir")

## Anti-Patrones

- [ ] No incluyas lenguaje de solución en la declaración del problema — el problema debe describirse independientemente de la solución propuesta
- [ ] No omitas alternativas consideradas — una especificación que considera solo un enfoque no ha sido adecuadamente evaluada
- [ ] No dejes preguntas abiertas como "Por Definir" sin un propietario designado y fecha de vencimiento — las preguntas sin resolver son bloqueadores
- [ ] No saltes las secciones de seguridad y privacidad para ninguna funcionalidad que toque datos de usuario
- [ ] No escribas una sección de no-objetivos que esté vacía — siempre enumera al menos dos cosas que podrían asumirse dentro del alcance

## Frases de activación de ejemplo

- "Escribe una especificación técnica."
- "Escribe la especificación de ingeniería de esta funcionalidad."
- "Escribe un documento de diseño de sistema."
- "Escribe una especificación de API."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/technical-spec-template.html
