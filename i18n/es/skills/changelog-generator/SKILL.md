---
# machine-translated to es from skills/changelog-generator/SKILL.md — review: pending. Native fixes welcome via PR.
name: changelog-generator
description: "Convierte un git log, lista de commits o notas de lanzamiento en un changelog pulido orientado al usuario. Usa cuando estés escribiendo notas de versión, generando una entrada en CHANGELOG.md o documentando qué cambió en una versión. Produce una sección de changelog estructurada con encabezado de versión, cambios categorizados y notas de migración. Para una lista de cambios ya curada usa changelog-writer en su lugar."
---

# Skill Changelog Generator

Convierte commits raw de git, un resumen de diff o notas de lanzamiento de desarrolladores en una entrada de changelog pulida — categorizada, orientada al usuario y siguiendo las convenciones de Keep a Changelog.

## Entradas Requeridas

Pregunta por estas si no se proporcionan:
- **Commits o notas de lanzamiento** (pega `git log --oneline`, mensajes de commit raw o una descripción de qué cambió)
- **Número de versión** (p. ej. 2.4.0, v1.0.0-beta.2)
- **Fecha de lanzamiento** (o "hoy")
- **Audiencia** (desarrolladores que usan una API / usuarios finales de un producto / equipo interno — afecta el lenguaje)
- **Cambios disruptivos** (señala estos explícitamente si se conocen)
- **Comportamiento de versión anterior** (opcional — pega la entrada anterior del changelog o describe qué está cambiando; necesario para entradas precisas de "Changed")
- **Alcance** (producto completo / paquete específico o módulo — p. ej. "solo SDK de pagos", "app iOS", "todos los servicios")

## Formato de Salida

Sigue el formato de [Keep a Changelog](https://keepachangelog.com):

---

## [X.Y.Z] — YYYY-MM-DD

### Breaking Changes ⚠️
[Solo incluir si hay cambios disruptivos]
- **[Cambio disruptivo]:** [Qué cambió y qué rompe]
- **Migración requerida:** [Acción específica que el usuario debe tomar]

### Added
- [Nueva característica o capacidad, escrita desde la perspectiva del usuario]
- [Otra adición]

### Changed
- [Comportamiento cambiado — qué hacía antes vs. qué hace ahora]
- [Mejora de rendimiento con impacto medible si se conoce]

### Fixed
- [Bug corregido — describe qué estaba roto, no la implementación de la corrección]
- [Otra corrección]

### Deprecated
- [Cosa deprecada] — usa [reemplazo] en su lugar. Será removido en [versión].

### Removed
- [Cosa removida] — fue deprecada en [versión]

### Security
- [Corrección de seguridad — describe la clase de vulnerabilidad, no los detalles del exploit]

---

---

> **Guía de skill — no incluyas la siguiente sección en el changelog entregado:**

## Reglas de Formato Aplicadas

**Lenguaje:** Escribe para el lector, no para quien hizo commit. "Add dark mode support" no "implement ThemeProvider with dark palette variant".

**Cambios disruptivos:** Siempre destácalos primero con ⚠️. Incluye una ruta de migración.

**Correcciones de bugs:** Describe qué estaba roto, no qué fue cambiado. "Fix crash when user has no profile picture" no "null-check avatar URL before rendering".

**Granularidad:** Agrupa commits relacionados en una línea. No listes cada micro-commit por separado.

**Tono:** Voz activa, modo imperativo. "Add", "Fix", "Remove" — no "Added", "Fixed", "Removed".

**Secciones vacías:** Omite cualquier sección sin entradas. No incluyas bloques `### Fixed` vacíos.

## Materiales Más Profundos

Este skill viene con archivos de soporte — úsalos cuando estén disponibles:

- **`references/user-translation.md`** — Commit-to-Changelog Translation: Writing for the People Affected. Aplícalo mientras produces la salida; contiene la calibración y decisiones de criterio que el resumen del método anterior comprime.
- **`templates/release-entry.md`** — una versión rellenable del entregable con las puertas de calidad inline. Ofrécela cuando el usuario quiera trabajar el documento él mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de este skill antes de entregarla; 32+ es calidad de envío.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Traducción orientada al lector** | Las entradas replantean mensajes de commit, con identificadores internos y detalles de implementación | Mayormente orientadas al usuario, pero algunas entradas filtran internals o describen el patch en lugar de qué estaba roto | Cada entrada describe el cambio desde la perspectiva del lector — qué cambió para ellos, nunca cómo fue refactorizado el código |
| **Manejo de cambios disruptivos** | Los cambios disruptivos están enterrados en medio de la lista o falta una ruta de migración | Señalados en la parte superior, pero la guía de migración es vaga ("actualiza tu código") | En la parte superior con ⚠️, cada uno con una acción de migración específica que el usuario puede ejecutar |
| **Curación y agrupación** | Cada micro-commit listado; commits solo para interno incluidos | Algo de agrupación, pero commits relacionados aún aparecen como entradas separadas o ruido se filtra | Commits relacionados agrupados en entradas únicas; commits solo para interno excluidos; nada que un usuario no pueda observar |
| **Disciplina de formato** | Encabezado de versión/fecha incorrecto o faltante; verbos en pasado; secciones vacías dejadas | Encabezado correcto pero errores en tiempo verbal o secciones vacías persisten | Convenciones de Keep a Changelog en toda la sección — encabezado correcto, modo imperativo, solo secciones pobladas |

## Comprobaciones de Calidad
- [ ] Los cambios disruptivos están en la parte superior con instrucciones de migración
- [ ] Todas las entradas están en lenguaje orientado al usuario (sin nombres de variables internos o detalles de implementación)
- [ ] Los commits relacionados se agrupan en entradas únicas (no listadas individualmente)
- [ ] El encabezado de versión y fecha es correcto
- [ ] Las secciones vacías se omiten
- [ ] Ninguna entrada comienza con verbos en pasado (no "Added", "Fixed", "Removed" — usa "Add", "Fix", "Remove")
- [ ] Cada entrada de cambio disruptivo incluye una acción de migración específica (no solo "actualiza tu código")

## Anti-Patrones

- [ ] No incluyas detalles de implementación en entradas de changelog — los usuarios necesitan saber qué cambió para ellos, no cómo el código fue refactorizado internamente
- [ ] No listes cada micro-commit como una entrada separada — los commits relacionados deben ser agrupados en un cambio orientado al usuario
- [ ] No omitas la ruta de migración para cambios disruptivos — una entrada de cambio disruptivo sin una acción de migración específica fuerza a los usuarios a leer el código fuente
- [ ] No incluyas secciones vacías — una sección "### Fixed" sin entradas señala que la plantilla fue rellenada sin cuidado
- [ ] No escribas cambios disruptivos en el mismo tono casual que adiciones menores — los cambios disruptivos deben ser visualmente prominentes y explicitar claramente los requisitos de migración

## Ejemplos de Uso
- "Escribe un changelog para versión [X]" + [pega commits]
- "Genera notas de lanzamiento a partir de estos commits"
- "Convierte este git log en una entrada de CHANGELOG"
- "Escribe la actualización de CHANGELOG.md para este lanzamiento"
- "¿Qué cambió en este lanzamiento?" + [pega lista de commits]

## Frases de Activación de Ejemplo

- "Escribe notas de lanzamiento."
- "Genera una entrada de CHANGELOG.md."
- "Documenta qué cambió en una versión."
