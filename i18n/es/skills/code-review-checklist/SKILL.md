---
# machine-translated to es from skills/code-review-checklist/SKILL.md — review: pending. Native fixes welcome via PR.
name: code-review-checklist
description: "Genera un checklist de revisión de código personalizado para cualquier pull request basado en el lenguaje, tipo de cambio y nivel de riesgo. Úsalo cuando te pidan revisar código, verificar un PR, revisar un pull request o generar un checklist de revisión de código. Produce un checklist enfocado con verificaciones específicas del lenguaje, profundidad apropiada al nivel de riesgo y una recomendación clara de aprobar o solicitar cambios."
---

# Habilidad de Checklist de Revisión de Código

Produce un checklist de revisión de código personalizado para un pull request específico — escalado al lenguaje, tipo de cambio y nivel de riesgo. No es una plantilla genérica.

> **¿No es exactamente esto?** Usa `code-review-guide` cuando quieras realizar la revisión en sí con criterio senior, no solo un checklist.

## Entradas Requeridas

Trabaja con lo que se proporciona. Si falta alguna de estas, aún así produce el resultado completo: completa cada vacío con una suposición razonable marcada *(supuesto, confirma)* y lista esas suposiciones al final. Haz una pregunta solo cuando el tema central mismo falte (no hay nada sobre qué escribir).
- **Lenguaje y framework** (p. ej. TypeScript + React / Python + FastAPI / Go)
- **Tipo de cambio** (feature / bug fix / refactor / dependency upgrade / security patch / performance)
- **Nivel de riesgo** (bajo / medio / alto / crítico)
- **Descripción del PR** (pega la descripción o enlaza al PR)
- **Código o diff** (opcional — pega archivos clave modificados o un `git diff`; mejora significativamente la especificidad del checklist)
- **Contexto del autor** (nuevo en el equipo / experimentado / colaborador externo)

## Formato de Salida

---

# Revisión de Código: [Título o Referencia del PR]

### 1. Descripción General del PR
**Evaluación del alcance:** [Pequeño / Medio / Grande / Demasiado grande — debería dividirse]
**Profundidad de revisión recomendada:** [Rápida / Estándar / Análisis profundo]
**Tiempo estimado de revisión:** [p. ej. 20–30 min — usa aproximadamente 5 min por cada 50 líneas de diff como guía]

### 2. Verificaciones de Corrección

Verificaciones de corrección específicas del lenguaje — elige basándote en el lenguaje indicado:

**Para TypeScript/JavaScript:**
- Las definiciones de tipo coinciden con el uso real
- Sin `any` implícito en código que no sea de prueba
- Async/await utilizado consistentemente; sin promesas sin manejar
- Manejo explícito de null/undefined

**Para Python:**
- Type hints presentes en funciones públicas
- Manejo de excepciones específico (sin except desnudo)
- Los recursos se cierran (context managers, bloques with)

**Para Go:**
- Los errores se manejan o se ignoran explícitamente con un comentario
- La propagación de contexto es correcta
- Los tiempos de vida de las goroutines están acotados

[Incluye solo la sección que coincida con el lenguaje indicado]

### 3. Verificaciones Específicas del Tipo de Cambio

**Para corrección de bugs:**
- Existe una prueba que habría detectado este bug
- La corrección aborda la causa raíz, no el síntoma
- Se verificaron rutas de código relacionadas para el mismo problema

**Para features:**
- Se cumplen los criterios de aceptación
- Se manejan casos extremos (vacío, grande, concurrente)
- Las rutas de error se prueban, no solo el caso de éxito
- Se agregó telemetría/logging para debugging

**Para refactors:**
- El comportamiento no cambia (las pruebas aún pasan)
- Sin scope creep — solo refactor
- La complejidad se reduce, no solo se mueve

**Para actualizaciones de dependencias:**
- Se revisaron los cambios de ruptura
- Se verificaron los avisos de seguridad
- Se verificó la compatibilidad de licencias

[Incluye solo la sección que coincida con el tipo de cambio indicado]

### 4. Verificaciones Apropiadas al Nivel de Riesgo

**Riesgo bajo:** corrección básica, convenciones de estilo, cobertura de pruebas
**Riesgo medio:** arriba + plan de reversión, actualizaciones de monitoreo, consideraciones de rendimiento
**Riesgo alto:** arriba + implicaciones de seguridad, seguridad de migración de datos, feature flag/despliegue gradual
**Riesgo crítico:** arriba + plan de validación en staging, plan de respuesta ante incidentes, checklist de verificación posterior al despliegue

### 5. Adecuación de Pruebas
- Las pruebas unitarias cubren la lógica nueva
- Las pruebas de integración cubren los cambios de contrato
- Se prueban casos extremos
- Se prueban modos de fallo
- Pruebas de rendimiento si es sensible al rendimiento

### 6. Marco de Decisión de Revisión

**Aprobar si:** [2-3 condiciones específicas basadas en este PR]
**Solicitar cambios si:** [Bloqueadores específicos]
**Comentar (no bloqueante) si:** [Elementos dignos de discusión pero no bloqueantes para merge]

### 7. Trampas Comunes para Este Tipo de Cambio
Basándote en el tipo de cambio y lenguaje, señala 2-3 cosas que los revisores típicamente pasan por alto para esta combinación.

---

## Materiales Más Profundos

Esta habilidad viene con archivos de apoyo — úsalos cuando estén disponibles:

- **`references/review-depth-calibration.md`** — Calibrando la Profundidad de Revisión: No Todos los PR Merecen los Mismos Ojos. Aplícalo mientras produces el resultado; contiene la calibración y decisiones de criterio que el resumen del método anterior comprime.
- **`templates/review-record.md`** — una versión para rellenar del resultado con los gates de calidad en línea. Ofrécela cuando el usuario quiera trabajar el documento por sí mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32+ es calidad de envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Especificidad del lenguaje** | Las verificaciones podrían aplicarse a cualquier lenguaje — intercambiar un nombre de lenguaje no cambiaría nada | Se elige el bloque de lenguaje correcto, pero las verificaciones repiten la plantilla en lugar de los constructos de este PR | Cada verificación de corrección nombra un constructo que realmente está en el diff (goroutines, cadenas de promesas, context managers) |
| **Calibración de profundidad-riesgo** | Misma profundidad independientemente del nivel de riesgo indicado | La profundidad se escala aproximadamente, pero los extras de alto riesgo (plan de reversión, despliegue por fases, monitoreo) faltan o son tokenistas | La profundidad coincide exactamente con el riesgo indicado y la estimación de tiempo de revisión sigue la guía de tamaño de diff |
| **Nitidez del marco de decisión** | "Aprobar si se ve bien" — sin condiciones nombradas | Se enumeran bloqueadores pero no son verificables; un revisor no puede decir cuándo están satisfechos | Cada condición de aprobación/bloqueo/comentario es verificable contra una prueba, bandera, métrica o artefacto específico |
| **Especificidad de trampa** | Trampas ausentes o genéricas ("cuidado con los bugs") | Las trampas coinciden con el lenguaje *o* el tipo de cambio, pero no con la combinación | 2–3 trampas que solo tienen sentido para esta combinación exacta de lenguaje + tipo de cambio |

## Verificaciones de Calidad
- [ ] El checklist está personalizado al lenguaje indicado (no genérico)
- [ ] Se incluye la sección específica del tipo de cambio
- [ ] La profundidad apropiada al riesgo coincide con el nivel de riesgo indicado
- [ ] El marco de decisión incluye al menos una condición de bloqueo nombrada y una condición de comentario no bloqueante nombrada
- [ ] Las trampas comunes son específicas de la combinación lenguaje + tipo de cambio indicada (no consejos genéricos como "cuidado con los bugs")

## Antipatrones

- [ ] No generes un checklist genérico que ignore el lenguaje indicado — un checklist de Python y uno de Go tienen preocupaciones de corrección fundamentalmente diferentes
- [ ] No trates "se ve bien" como un resultado válido de revisión — el checklist existe para surfacear preocupaciones específicas, no para validar una lectura superficial
- [ ] No delimites una revisión de "riesgo alto" igual que una de "riesgo bajo" — la profundidad debe escalar con el nivel de riesgo indicado
- [ ] No señales cada preferencia estilística como un problema de bloqueo — distingue entre problemas de corrección bloqueantes y comentarios no bloqueantes
- [ ] No omitas la sección "trampas comunes" para la combinación de lenguaje y tipo de cambio indicada — aquí es donde vive el conocimiento más valioso

## Ejemplos de Uso
- "Genera un checklist de revisión de código para [descripción del PR]"
- "¿Qué debo verificar en este pull request?"
- "Dame un checklist de revisión de código para un [lenguaje] [tipo de cambio]"
- "Checklist de revisión para un PR de riesgo alto en [lenguaje]"

## Frases Desencadenantes de Ejemplo

- "Revisa código."
- "Verifica un PR."
- "Revisa un pull request."
- "Genera un checklist de revisión de código."
