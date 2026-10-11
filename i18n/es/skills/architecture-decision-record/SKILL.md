---
# machine-translated to es from skills/architecture-decision-record/SKILL.md — review: pending. Native fixes welcome via PR.
name: architecture-decision-record
description: "Crea un Registro de Decisión de Arquitectura (ADR) para cualquier decisión técnica. Úsalo cuando necesites documentar una decisión técnica, escribir un ADR, registrar una elección arquitectónica o capturar por qué se seleccionó una tecnología o enfoque. Produce un ADR estructurado con contexto, decisión, consecuencias e intercambios."
---

# Habilidad de Registro de Decisión de Arquitectura (ADR)

Esta habilidad produce un Registro de Decisión de Arquitectura (ADR) completo siguiendo el formato Nygard — el estándar más ampliamente adoptado. Los ADRs documentan el razonamiento detrás de decisiones técnicas significativas para que los futuros miembros del equipo entiendan no solo *qué* se decidió, sino *por qué*.

## Inputs Requeridos

Trabaja con lo que se proporciona. Si falta algo de esto, aun así produce el resultado completo: rellena cada vacío con una suposición razonable marcada como *(asumido, confirmar)* y lista esas suposiciones al final. Solo haz una pregunta cuando falta el tema central en sí (no hay nada sobre lo que escribir).
- **Número de ADR** (número secuencial en tu registro de ADR — p. ej. 012; o "siguiente disponible" si es desconocido)
- **Título de la decisión** (breve, p. ej. "Usar PostgreSQL como almacén de datos principal")
- **Contexto** (¿qué situación llevó a que esta decisión fuera necesaria?)
- **Opciones consideradas** (al menos 2; si solo se da 1, solicita alternativas que fueron consideradas o descartadas)
- **Decisión tomada** (qué opción fue elegida)
- **Razón de la elección**
- **Estado** (Propuesto / Aceptado / Deprecado / Reemplazado)
- **Autor y fecha**
- **Contexto del equipo** (opcional — tamaño del equipo, experiencia relevante, restricciones organizacionales; ayuda a calibrar la formalidad y profundidad de la sección de Contexto)

## Formato de Salida

---

# ADR-[NNN]: [Título de la Decisión]

**Fecha:** [YYYY-MM-DD]
**Estado:** [Propuesto / Aceptado / Deprecado / Reemplazado por ADR-NNN]
**Autor(es):** [Nombre(s)]
**Responsables de la decisión:** [Quién tuvo la palabra final — individuo o equipo]

---

## Contexto

[3–6 oraciones. Describe la situación, restricciones y fuerzas en juego que hicieron necesaria esta decisión. Incluye: el problema a resolver, estado relevante del sistema, restricciones del equipo, presiones de cronograma o requisitos innegociables. Escribe como si explicaras a alguien que se une al equipo 18 meses después sin contexto previo.]

**Restricciones clave:**
- [Restricción 1: p. ej. "Debe ser desplegable on-premise para clientes empresariales"]
- [Restricción 2: p. ej. "El equipo no tiene experiencia previa con Go"]
- [Añade todas las que sean relevantes]

---

## Opciones Consideradas

Para cada opción, produce:

### Opción [N]: [Nombre]

**Descripción:** [Qué es esta opción — 1–3 oraciones]

**Ventajas:**
- [Ventaja 1]
- [Ventaja 2]

**Desventajas:**
- [Desventaja 1]
- [Desventaja 2]

**Por qué fue descartada (si no fue elegida):** [Razón honesta]

---

## Decisión

**Usaremos [opción elegida].**

[2–4 oraciones explicando la decisión en lenguaje plano. Debería ser legible de forma aislada — alguien debería entender la decisión solo con este párrafo sin leer el documento completo.]

---

## Consecuencias

### Consecuencias Positivas
- [Qué esta decisión permite o mejora]
- [Qué riesgo mitiga]

### Consecuencias Negativas / Intercambios Aceptados
- [Qué estamos abandonando o asumiendo como resultado de esta decisión]
- [Deuda técnica o limitaciones introducidas]
- [Qué debe ser verdadero para que esta decisión siga siendo válida]

### Riesgos
- [Qué podría hacer que esta decisión fuera incorrecta en retrospectiva]
- [Qué nos haría reconsiderar esta decisión]

---

## Notas de Implementación

[Incluye si la decisión tiene gotchas de implementación no obvios, o si hay tickets/RFCs relacionados que los implementadores necesitarán. Omite solo si la decisión es puramente selección de herramientas sin ambigüedad de implementación.]

---

## Fecha de Revisión

[Incluye a menos que la decisión sea permanente o evidentemente final. Establece una condición de disparo específica — p. ej. "Revisar si el equipo crece más allá de 20 ingenieros o el tráfico supera 10M requests/día" — no solo "debería revisarse periódicamente".]

---

## Materiales Más Profundos

Esta habilidad se entrega con archivos de apoyo — úsalos cuando estén disponibles:

- **`references/decision-scoping.md`** — Qué Merece un ADR (y Qué Debe Contener el "Contexto"). Aplícalo mientras produces el resultado; contiene los juicios y decisiones de calibración que el resumen del método anterior comprime.
- **`templates/adr.md`** — una versión para rellenar del entregable con los gates de calidad inline. Ofrécela cuando el usuario quiera trabajar el documento él mismo en lugar de tenerlo generado.

## Rúbrica de Puntuación (0–40)

Puntúa cualquier salida de esta habilidad antes de entregarla; 32+ es de calidad para producción.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Reconstrucción del contexto** | Asume que el lector ya conoce el problema y las presiones | Problema enunciado, pero faltan las fuerzas (restricciones del equipo, escala, plazo, evento que fuerza) | Un lector dos años después podría adivinar la decisión solo desde la sección de Contexto |
| **Honestidad de opciones** | Solo la opción elegida, u opciones rechazadas escritas como espantapájaros | ≥2 opciones, pero las razones de rechazo son circulares ("no cumplieron los requisitos") | Cada opción rechazada tiene fortalezas genuinas y una restricción perdedora específica vinculada a una presión del contexto |
| **Balance de consecuencias** | Todas las consecuencias son positivas | Negativas simbólicas sin especificidades operacionales | Los negativos nombran deudas reales, nuevas cargas operacionales y qué debe mantenerse verdadero para que la decisión se sostenga |
| **Disparadores de revisión** | No se indican riesgos o condiciones de revisión | "Revisar periódicamente" — sin condición medible | Condiciones de disparo específicas y medibles que invalidarían la decisión, con un responsable |

## Verificaciones de Calidad

- [ ] El Contexto explica el *por qué* — no solo el *qué*
- [ ] Al menos 2 opciones están documentadas (incluyendo las rechazadas)
- [ ] Las opciones rechazadas incluyen razones honestas de rechazo
- [ ] Las Consecuencias incluyen consecuencias *negativas* — ninguna decisión está libre de consecuencias
- [ ] La Decisión está enunciada en lenguaje plano en la sección de Decisión
- [ ] La sección de Riesgos identifica qué invalidaría esta decisión
- [ ] La sección de Contexto enuncia el problema explícitamente en sus primeras 1–2 oraciones (no asume que el lector sepa qué problema estaba resolviendo el equipo)
- [ ] La explicación "Por qué fue descartada" de cada opción rechazada nombra una restricción o intercambio específico (no una declaración circular como "no cumplió nuestros requisitos")

## Anti-Patrones

- [ ] No escribas un ADR después de que la decisión ya haya sido completamente implementada y el equipo haya avanzado — los ADRs escritos retrospectivamente a menudo omiten las razones reales y alternativas
- [ ] No listes solo la opción elegida — las opciones rechazadas con razones honestas son la parte más valiosa de un ADR para lectores futuros
- [ ] No escribas consecuencias que sean todas positivas — cada decisión arquitectónica implica intercambios; un ADR sin consecuencias negativas no fue escrutinizado honestamente
- [ ] No dejes el estado como "Propuesto" indefinidamente — un ADR que nadie ha aprobado no está guiando las decisiones de nadie
- [ ] No escribas contexto que asuma que el lector ya sabe qué problema se estaba resolviendo — la sección de contexto existe precisamente para lectores sin ese antecedente

## Ejemplos de Uso
- "Escribe un ADR para usar [tecnología]"
- "Documenta nuestra decisión de [elección arquitectónica]"
- "Crea un registro de decisión de arquitectura para [tema]"
- "Ayúdame a redactar por qué elegimos [opción] sobre [alternativa]"

## Frases de Disparo de Ejemplo

- "Documenta una decisión técnica."
- "Escribe un ADR."
- "Registra una elección arquitectónica."
- "Captura por qué una tecnología."
