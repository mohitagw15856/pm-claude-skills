---
# machine-translated to es from skills/user-story-writer/SKILL.md — review: pending. Native fixes welcome via PR.
name: user-story-writer
description: "Escribir historias de usuario bien estructuradas con criterios de aceptación y casos extremos. Úsalo cuando te pidan escribir historias de usuario, crear tickets a partir de un resumen de características, convertir un PRD en historias o redactar criterios de aceptación. Produce historias listas para estimar en formato estándar con criterios de aceptación claros, casos extremos y definición de hecho."
---

# Skill User Story Writer

Esta habilidad produce historias de usuario listas para producción a partir de un resumen de características, una sección de PRD o una descripción verbal. Cada historia sigue el formato estándar con un claro quién/qué/por qué, criterios de aceptación conductuales en formato Given/When/Then, casos extremos y definición de hecho. El resultado está listo para copiar y pegar en Jira, Linear o tu herramienta de planificación.

## Entradas Requeridas

Pide al usuario estos datos si no están proporcionados:
- **Característica o cambio** a desglosar en historias — copia el resumen, sección de PRD o describe la característica
- **Tipos de usuario / personas** involucradas (p. ej. administrador, usuario final, invitado, consumidor de API)
- **Alcance** — ¿escribimos una historia o desglozamos una épica en un conjunto completo de historias?
- **Preferencia de formato de criterios de aceptación** — Given/When/Then, lista de verificación con viñetas o ambos?
- **Restricciones técnicas o notas** — cualquier cosa que el equipo de ingeniería haya señalado y que deba conformar las historias

## Estructura del Resultado

Para cada historia:

---

## Historia: [Título breve — verbo + sustantivo, p. ej. "Filtrar resultados de búsqueda por rango de fechas"]

**Épica:** [Nombre de la épica principal — p. ej. "Búsqueda Avanzada"]
**ID de Historia:** [ID de Jira/Linear — deja en blanco si aún no se ha creado]
**Prioridad:** [P1 / P2 / P3]
**Puntos de historia:** [Deja en blanco — para que el equipo de ingeniería estime]

---

### Historia de Usuario

> **Como** [tipo de usuario específico — no "usuario"],
> **Quiero** [acción concreta que desean realizar],
> **Para** [el resultado que logran — valor de negocio, no descripción de la característica].

**Ejemplo:**
> Como **gerente de cuenta**,
> Quiero **filtrar mi lista de clientes por fecha de último contacto**,
> Para **poder identificar rápidamente los clientes con los que no he hablado en más de 30 días y priorizar el seguimiento**.

---

### Contexto

[1–3 oraciones de contexto que no están en la historia de usuario: cuándo importa esta historia, qué la desencadena, cómo se ajusta en un flujo más amplio. Esto ayuda a los ingenieros a entender el por qué antes de que pregunten.]

---

### Criterios de Aceptación

**Formato: Given / When / Then**

Cada criterio prueba un comportamiento específico. Escribe un GWT por resultado observable — no un GWT para toda la característica.

**CA1: [Nombre corto para este criterio]**
```
Given [estado inicial o contexto]
When [acción del usuario]
Then [comportamiento observable del sistema]
```

**CA2: [Nombre corto]**
```
Given [...]
When [...]
Then [...]
```

**CA3: [Nombre corto]**
```
Given [...]
When [...]
Then [...]
```

---

### Casos Extremos

[Lista escenarios que no son obvios pero que deben manejarse. Estos se convierten en ACs adicionales o notas para ingeniería.]

- [ ] **[Caso extremo 1]:** [p. ej. El usuario aplica un filtro de fecha que devuelve 0 resultados — mostrar estado vacío con mensaje claro y una acción "limpiar filtros"]
- [ ] **[Caso extremo 2]:** [p. ej. El usuario tiene >10,000 clientes — el filtro no debe degradar el tiempo de carga >200ms]
- [ ] **[Caso extremo 3]:** [p. ej. El filtro de fecha persiste en la actualización de página — o explícitamente no debe si esa es la decisión]
- [ ] **[Caso extremo de permisos]:** [p. ej. Los usuarios de solo lectura pueden ver el filtro pero no pueden guardar presets de filtro]

---

### Fuera de Alcance

[Indica explícitamente qué NO cubre esta historia — previene el aumento de alcance y clarifica dónde comienza la siguiente historia.]

- Guardar y compartir presets de filtro (historia separada — ver [Historia X])
- Acciones en masa en resultados filtrados
- Exportar lista de clientes filtrada a CSV

---

### Definición de Hecho

- [ ] Todos los criterios de aceptación se cumplen
- [ ] Casos extremos manejados (o explícitamente diferidos con un nuevo ticket abierto)
- [ ] Pruebas unitarias escritas para cada CA
- [ ] Funciona en viewport móvil (si aplica)
- [ ] Accesibilidad: navegable con teclado y compatible con lectores de pantalla
- [ ] Los estados de error se manejan y el texto está aprobado
- [ ] Producto y diseño han revisado en staging
- [ ] Sin errores en consola en la compilación de producción

---

## Plantilla de Desglozamiento de Épica

Si el usuario proporciona una épica o resumen de características, desglózala en un conjunto completo de historias antes de escribirlas:

**Épica:** [Nombre]
**Objetivo:** [¿Qué resultado logra completar esta épica?]
**Historias:**

| # | Historia | Notas | Dependencias |
|---|---|---|---|
| 1 | [Historia del camino feliz principal — la versión más simple de la característica que entrega valor] | | |
| 2 | [Historia de validación / manejo de errores] | | Depende de #1 |
| 3 | [Historia de caso extremo o usuario avanzado] | | Depende de #1 |
| 4 | [Historia de administrador o configuración] | | |
| 5 | [Historia de rendimiento o escala — si aplica] | | Depende de #1 |

**Orden sugerido de sprint:** [¿Qué historias son P1 para MVP? ¿Cuáles pueden seguir en un sprint posterior?]

---

## Anti-patrones Comunes de Historias — y Soluciones

Usa estos para revisar historias antes de entregarlas a ingeniería:

| Anti-patrón | Ejemplo | Solución |
|---|---|---|
| **Solución en la historia** | "Como usuario quiero un filtro desplegable" | Elimina la decisión de UI — "Como usuario quiero filtrar por rango de fechas" |
| **"Para qué" vago** | "para que sea más fácil de usar" | Hazlo específico — "para que pueda priorizar el seguimiento sin abrir cada registro manualmente" |
| **Demasiado grande** | La historia cubre 5 flujos de usuario distintos | Divide en historias separadas por flujo |
| **Sin criterios de aceptación** | La historia solo tiene descripción | Agrega al menos 3 criterios GWT antes de que ingeniería empiece |
| **ACs que prueban la solución, no el comportamiento** | "Given el desplegable está abierto, When selecciono una opción" | Prueba el resultado — "Given he aplicado un filtro de fecha, When veo mis resultados, Then solo aparecen clientes contactados en ese rango de fechas" |
| **Falta estado vacío** | Sin CA para qué sucede con 0 resultados | Agrégalo — los estados vacíos son parte de la característica |
| **Falta estado de error** | Sin CA para fallo de red o entrada inválida | Agrega explícitamente ACs de manejo de errores |

---

## Ejemplo: Conjunto Completo de Historias para una Característica

**Resumen de característica:** "Permitir a los usuarios exportar su historial de facturas como PDF o CSV"

---

### Historia 1: Exportar lista de facturas como CSV

> Como **administrador de finanzas**,
> Quiero **exportar mi historial de facturas como archivo CSV**,
> Para **poder importarlo en nuestro software de contabilidad sin entrada manual de datos**.

**CA1: Exportación exitosa**
```
Given estoy en la página de Facturas con al menos una factura
When hago clic en "Exportar" y selecciono "CSV"
Then se descarga un archivo CSV que contiene todas las facturas visibles con columnas: ID de Factura, Fecha, Monto, Estado, Nombre del Cliente
```

**CA2: Estado vacío**
```
Given estoy en la página de Facturas sin facturas
When hago clic en "Exportar"
Then el botón de exportar está deshabilitado y un tooltip dice "No hay facturas para exportar"
```

**CA3: Exportación filtrada**
```
Given he aplicado un filtro de fecha mostrando facturas de enero 2026 solo
When hago clic en "Exportar" y selecciono "CSV"
Then la exportación contiene solo facturas de enero 2026 — no todas las facturas
```

**Casos extremos:**
- [ ] Exportar con >10,000 facturas — debe completarse en <30s o mostrar un indicador de progreso
- [ ] Exportación activada en móvil — se descarga a la ubicación de descarga predeterminada del dispositivo

**Fuera de alcance:** Exportación a PDF (Historia 2), exportaciones programadas (épica futura)

---

### Historia 2: Exportar lista de facturas como PDF

> Como **administrador de finanzas**,
> Quiero **exportar mi historial de facturas como PDF formateado**,
> Para **poder compartir un resumen profesional con nuestro contador**.

[... los ACs siguen el mismo patrón ...]

---

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/acceptance-criteria-craft.md`** — Criterios de aceptación que de verdad hacen de puerta. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/story-card.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Voz del usuario y valor** | Historias escritas desde la perspectiva del sistema o del desarrollador; el "para" falta o es circular ("para que sea más fácil") | Las personas son concretas, pero algunas cláusulas "para" describen la funcionalidad en lugar del resultado que obtiene el usuario | Cada historia nombra un tipo de usuario concreto y un "para" que enuncia el resultado concreto que consigue; un interesado podría leerla y saber por qué merece construirse |
| **Comprobabilidad y granularidad de los CA** | Faltan los CA, o son descripciones en prosa sin condición de aprobado/suspenso | Se usa el formato Dado-Cuando-Entonces, pero los criterios agrupan varios comportamientos o prueban la solución de interfaz en lugar del resultado observable | Un Dado-Cuando-Entonces por comportamiento observable, cada uno con una condición inequívoca de aprobado/suspenso, probando resultados y no implementación |
| **Cobertura de los caminos infelices** | Solo el camino feliz: sin estados vacíos, de error ni de permisos en ningún sitio | Se enumeran algunos casos límite, pero los modos de fallo clave (estado vacío, fallo a mitad del flujo, límites de permisos) faltan o son vagos | Estados vacíos, estados de error, límites de permisos y restricciones técnicas conocidas aparecen todos como CA explícitos o casos límite con comportamiento definido |
| **Disciplina de alcance y tamaño** | Las historias tienen tamaño de épica, son interdependientes y no hay sección de fuera de alcance | Hay fuera de alcance, pero genérico; algunas historias son demasiado grandes para estimarlas o entregarlas de forma independiente en un sprint | Cada historia cabe en un sprint y se entrega de forma independiente, las divisiones se registran con su motivo, y Fuera de alcance indica dónde empieza la siguiente historia |

## Verificaciones de Calidad

- [ ] Cada historia tiene un tipo de usuario específico — no "un usuario" o "el sistema"
- [ ] El "para" explica el valor de negocio — no solo descripción de la característica
- [ ] Cada CA prueba un resultado observable — no un conjunto de comportamientos
- [ ] Los estados vacíos, estados de error y casos extremos se manejan explícitamente
- [ ] El alcance fuera se documenta — no se asume
- [ ] Las historias son independientes — pueden entregarse individualmente sin depender de trabajo no lanzado (excepto donde se indica explícitamente)

## Anti-patrones

- [ ] No escribas historias de usuario desde una perspectiva técnica — cada historia debe estar desde el punto de vista del usuario y establecer su objetivo
- [ ] No escribas criterios de aceptación que sean inprobables — cada criterio debe tener una condición clara de aprobación/fallo
- [ ] No crees historias demasiado grandes para completar en un solo sprint — desgloza épicas en historias estimables e independientemente entregables
- [ ] No omitas casos extremos — los caminos infelices y estados de error son obligatorios, no opcionales
- [ ] No saltes la Definición de Hecho — sin ella, "hecho" significa cosas diferentes para diferentes personas

## Frases Desencadenantes de Ejemplo

- "Escribe historias de usuario para [característica] a partir de este resumen"
- "Desgloza esta sección de PRD en historias de usuario con criterios de aceptación"
- "Convierte estos requisitos de características en tickets de Jira"
- "Escribe las historias de usuario y ACs para [nombre de característica]"
- "Desgloza esta épica en historias individuales listas para planificación de sprint"
