---
# machine-translated to es from skills/runbook-writer/SKILL.md — review: pending. Native fixes welcome via PR.
name: runbook-writer
description: "Escribe un runbook operacional para un servicio, tipo de incidente o procedimiento de despliegue. Úsalo cuando se te pida escribir un runbook, crear una guía de ops, documentar un procedimiento operacional o preparar un playbook de respuesta a incidentes. Produce un runbook con descripción general, requisitos previos, procedimientos paso a paso, pasos de reversión, tabla de resolución de problemas y rutas de escalada."
---

# Habilidad Runbook Writer

Produce runbooks operacionales para servicios, tipos de incidentes y procedimientos de despliegue — estructurados de modo que un ingeniero on-call que nunca ha tocado el sistema pueda seguirlos bajo presión.

## Entradas Requeridas

Pide esto si no se proporciona:
- **Para qué es el runbook** (p. ej. desplegar el servicio de pagos, responder a un failover de base de datos, rotar claves de API)
- **Tipo de runbook** (Despliegue / Respuesta a Incidentes / Mantenimiento / Recuperación ante Desastres)
- **Nombre del sistema/servicio y qué hace** (breve descripción)
- **Audiencia** (ingenieros on-call nuevos / SREs experimentados / equipo DevOps)
- **Stack tecnológico** (donde sea relevante — p. ej. Kubernetes, AWS RDS, Node.js)
- **Herramientas de monitoreo** (p. ej. Grafana, Datadog, CloudWatch, Splunk — se usan para nombrar dashboards específicos y enlaces de alertas en los pasos)
- **Detalles clave del entorno** (p. ej. nombre del cluster de Kubernetes, cuenta/región de AWS, namespaces o nombres de recursos relevantes — pega lo que sea relevante para comandos exactos)

## Formato de Salida

---
**Runbook:** [Título del Runbook]
**Servicio:** [Nombre del Servicio]
**Tipo:** [Despliegue / Respuesta a Incidentes / Mantenimiento / Recuperación ante Desastres]
**Última Actualización:** [Insertar la fecha de hoy en formato YYYY-MM-DD]
**Propietario:** [Equipo o persona]
**Severidad:** [P1 / P2 / P3 — si es tipo incidente]

---

### Descripción General
**Qué cubre este runbook:**
[1–2 frases sobre el escenario que maneja este runbook]

**Cuándo usar este runbook:**
- [Condición de disparo específica 1 — p. ej. Alerta PagerDuty: `high-error-rate-payment-service`]
- [Condición de disparo específica 2 — p. ej. Despliegue necesario después de PR fusionado a `main`]

**Tiempo estimado para completar:** [X minutos / X–Y minutos dependiendo del resultado]

**Impacto si no se completa correctamente:** [p. ej. Procesamiento de pagos degradado / Riesgo de pérdida de datos / Usuarios bloqueados]

---

### Requisitos Previos

**Acceso requerido:**
- [ ] [Acceso a sistema/herramienta — p. ej. Consola AWS: `production-account`]
- [ ] [Credencial — p. ej. `vault read secret/payment-service`]
- [ ] [Acceso VPN / bastion si es necesario]

**Herramientas requeridas:**
- [ ] [Nombre de la herramienta y versión — p. ej. `kubectl` v1.28+]
- [ ] [Nombre del CLI o dashboard]

**Antes de empezar:**
- [ ] [Verificación de requisito previo — p. ej. Verifica que el despliegue actual sea saludable en Grafana]
- [ ] [Acción de requisito previo — p. ej. Anuncia en `#ops-live` que estás comenzando]

---

### Procedimiento

Enumera cada paso. Usa comandos exactos. No parafrasees nombres de herramientas o flags.

**Paso 1: [Nombre de la acción]**
[Qué estás haciendo y por qué — una oración]
```bash
# Comando exacto
[comando aquí]
```
**Salida esperada:** `[qué debería aparecer si esto funcionó]`
**Si esto falla:** [Mensaje de error exacto a buscar] → [Qué hacer, o ver Resolución de Problemas]

**Paso 2: [Nombre de la acción]**
[Misma estructura que el Paso 1]

**Paso 3: Verificar**
Siempre incluye un paso de verificación después del procedimiento principal:
```bash
[comando de verificación]
```
**Estado esperado:** [Cómo se ve un sistema saludable después de completar este runbook]

---

### Reversión

Cómo deshacer este procedimiento si algo salió mal:

**Paso R1: [Acción de reversión]**
```bash
[comando de reversión]
```
**Verificar reversión:** `[comando para confirmar que la reversión fue exitosa]`

---

### Resolución de Problemas

| Síntoma | Causa Probable | Resolución |
|---|---|---|
| [Mensaje de error u síntoma observable] | [Por qué sucede esto] | [Solución exacta o próximo paso] |
| [Otro síntoma] | [Causa] | [Resolución] |

---

### Escalada

Si este runbook no resuelve el problema:

| Condición | A Quién Contactar | Cómo |
|---|---|---|
| [p. ej. DB no disponible después de 10 min] | [DBA on-call] | [Política PagerDuty: `db-oncall`] |
| [p. ej. Proveedor de pagos sin respuesta] | [Contacto del proveedor] | [Contacto en 1Password: `vendor-escalation`] |

**Siempre actualiza la línea de tiempo del incidente en [herramienta] antes de escalar.**

---

### Lista de Verificación Post-Procedimiento

Después de completar el runbook:
- [ ] Anuncia el final en `#ops-live` con el resultado
- [ ] Actualiza el ticket de incidente / log de despliegue
- [ ] Verifica que las alertas se hayan resuelto en el dashboard de monitoreo
- [ ] Si esto reveló una brecha en este runbook — actualízalo ahora (enlace al proceso de edición)

---

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/3am-usability.md`** — La prueba de las 3 de la mañana: runbooks para humanos agotados. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/runbook.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Exactitud de los comandos** | Los pasos son acciones vagas ("ejecuta el script de despliegue") sin comandos | La mayoría de los pasos tienen comandos, pero algunos parafrasean nombres de herramientas u omiten flags | Cada paso tiene un comando exacto para copiar y pegar, con los flags correctos y los marcadores claramente señalados |
| **Señales de éxito y fallo** | Sin salidas esperadas; el lector no sabe si un paso funcionó | Salida esperada solo en el camino feliz; los caminos de fallo dicen "investigar" | Cada paso indica la salida esperada y un camino de fallo con nombre o un enlace de resolución de problemas |
| **Completitud de la reversión** | La reversión falta o queda como marcador | Hay comandos de reversión, pero son parciales y no tienen verificación | La reversión es completa, comprobable de forma independiente, y cada paso de reversión tiene su propio comando de verificación |
| **Usabilidad para un lector nuevo** | Asume conocimiento del sistema; jerga sin explicar; celdas de escalado como "[Nombre del equipo]" | Puede seguirlo alguien del equipo, pero las lagunas de conocimiento tribal detendrían a alguien de fuera | Un ingeniero que nunca ha tocado el sistema puede ejecutarlo bajo presión; cada fila de escalado tiene un contacto real o una marca explícita de [RELLENAR] |

## Verificaciones de Calidad
- [ ] Cada paso tiene un comando exacto (no "ejecuta el script de despliegue")
- [ ] La salida esperada se especifica para cada paso para que el ingeniero sepa si funcionó
- [ ] La ruta de fallo es explícita para cada paso (no "si falla, investiga")
- [ ] El procedimiento de reversión es completo e independientemente testeable
- [ ] La tabla de escalada no tiene celdas que contengan solo "[Nombre del equipo]" — cada fila debe tener un contacto real o estar explícitamente marcada como [COMPLETAR: enlace de rotación on-call]
- [ ] La sección de reversión contiene al menos un comando concreto (no dejado como marcador "[rollback command]")
- [ ] El runbook puede ser seguido por alguien que nunca ha tocado este sistema

## Ejemplos de Uso
- "Escribe un runbook para [servicio] despliegue"
- "Crea un runbook de respuesta a incidentes para [tipo de alerta]"
- "Necesito un runbook para [procedimiento]"
- "Documenta el procedimiento operacional para [X]"
- "Escribe un playbook de ops para [escenario]"

## Anti-Patrones

- [ ] No escribas pasos como acciones vagas como "ejecuta el script de despliegue" — cada paso debe incluir el comando exacto
- [ ] No dejes la sección de reversión como un marcador — un runbook sin un procedimiento de reversión testado es incompleto y peligroso
- [ ] No omitas la salida esperada para cada paso — sin ella, el ingeniero on-call no puede saber si el paso fue exitoso
- [ ] No escribas contactos de escalada como "[Nombre del equipo]" — cada fila de escalada debe tener un contacto real o una marca explícita para completar
- [ ] No asumas que el lector conoce el sistema — escribe para alguien que nunca lo ha tocado antes

## Frases de activación de ejemplo

- "Escribe un runbook."
- "Crea una guía de operaciones."
- "Documenta un procedimiento operativo."
- "Prepara un playbook de respuesta a incidentes."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/runbook-writer.html
