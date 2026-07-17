---
name: benefits-decoder
language: es
description: "Decodifica un paquete de beneficios laborales a lo que realmente vale y dónde muerde la letra pequeña. Úsalo cuando alguien pregunte 'esta oferta es buena', 'decodifica mi paquete de beneficios', 'qué significa realmente mi equity' o 'qué debería preguntarle a RR. HH. antes de firmar'. Produce una decodificación beneficio por beneficio con valores reales en dinero, señales de alerta clasificadas (cliffs de vesting, cláusulas de devolución, bonos 'discrecionales', la economía del PTO ilimitado) y las preguntas para RR. HH. antes de firmar."
---

> Traducción al español de [benefits-decoder](../../../skills/benefits-decoder/SKILL.md) — la versión en inglés es la canónica.

# Decodificador de Beneficios

Las presentaciones de "compensación total" son marketing. Esta skill lee el lenguaje del plan como esa amiga que ya se quemó antes: cuánto vale realmente cada beneficio, qué promesas tienen puertas de escape, y qué conviene conseguir por escrito antes de firmar.

## Qué produce esta skill

- Una decodificación beneficio por beneficio con valores anuales reales donde sean calculables
- Señales de alerta clasificadas: cliffs de vesting, cláusulas de devolución, todo lo "discrecional", huecos de cobertura
- La cuenta del match del 401k/pensión y la cuenta del equity, con la aritmética a la vista
- Preguntas para RR. HH. antes de firmar — y qué respuestas conseguir por escrito

## Entradas requeridas

Pídelas solo si no fueron proporcionadas:

- **Los documentos de beneficios** — carta de oferta, resumen de beneficios, términos de la concesión de equity, extractos del plan. Decodifica lo proporcionado; lista lo que aún falta (plan de equity, resumen de beneficios del seguro, términos del plan de bonos).
- **Salario base y detalles de la concesión de equity** si no están en el texto — hacen falta para las cuentas.
- **Su situación** — dependientes/necesidades de salud, cuánto tiempo esperan quedarse de forma realista.

## Marco: Escala de gravedad

- 🔴 **Puede costarte dinero real** — cliffs de vesting frente a su permanencia esperada, cláusulas de devolución (bono de firma, reubicación, matrícula, incluso equity ya adquirido ante detonantes de "causa"), bonos pagaderos solo si estás "empleado en la fecha de pago", ventanas cortas de ejercicio del equity tras la salida, deducibles altos detrás de un buen titular, pérdida del match por vesting.
- 🟡 **Inusual — aclara antes de firmar** — lenguaje de bono "discrecional" (decodifícalo sin rodeos: una meta, no una promesa), PTO ilimitado (decodifica la economía: sin pago de días acumulados al salir), beneficios modificables "a discreción de la empresa", periodos de espera.
- 🟢 **Estándar** — ventanas de inscripción normales, formas de vesting estándar, plantilla típica del plan; etiquétalas para que el lector sepa qué está bien.

Muestra siempre las cuentas:
1. **La cuenta del match** — p. ej. "50% del primer 6%" = X al año con su salario; anota el vesting propio del match y qué se pierde al irse en el año N.
2. **La cuenta del equity** — concesión ÷ años de vesting = valor anual a la valuación declarada, con el escenario del cliff ("irse en el mes 11 = 0"); marca los números dependientes de la valuación como `[por confirmar]`.
3. **La lectura de cobertura real del seguro** — parte de la prima, deducible, máximo de bolsillo: el peor año en dinero, no la línea del folleto.
4. **La economía del PTO** — ilimitado vs. acumulado: la diferencia del pago al salir, en dinero.

## Formato de salida

### Decodificación de beneficios: [empresa / oferta]

**1. El veredicto** — cuánto vale realmente este paquete al año (rango, con supuestos declarados), y las dos cosas a resolver antes de firmar.

**2. Decodificación beneficio por beneficio**

| Beneficio | Qué dice el documento | Qué vale / qué significa realmente | Gravedad |
|---|---|---|---|

**3. 🚩 Señales de alerta, clasificadas** — el lenguaje citado, el escenario donde muerde, su costo en dinero.

**4. La sección de cuentas** — match, equity, peor caso del seguro, PTO — con la aritmética a la vista.

**5. Preguntas para RR. HH. antes de firmar** — de 4 a 7, ordenadas por dinero en juego; marca qué respuestas conseguir por escrito (términos del bono, documento del plan de equity, detonantes de devolución).

**6. Qué es negociable** — típicamente los conceptos únicos (bono de firma, equity, fecha de inicio, reubicación) más que los planes en sí.

Termina el artefacto con, textualmente: *"Esta es una lectura en lenguaje claro, no asesoría legal/financiera — las leyes varían según la jurisdicción; confirma cualquier punto crítico con un profesional calificado."*

## Controles de calidad

- [ ] Cada valuación se muestra como aritmética con supuestos declarados, no se afirma
- [ ] El lenguaje de "discrecional" y "empleado en la fecha de pago" se cita y se decodifica sin rodeos
- [ ] Las alertas de cliff/devolución están ligadas a la permanencia esperada declarada por el usuario
- [ ] Los documentos faltantes y los números no verificables se listan como `[por confirmar]`
- [ ] Los términos genuinamente estándar se marcan 🟢 — no todo es una trampa
- [ ] La línea de descargo aparece textualmente en el artefacto

## Anti-patrones

- [ ] No inventes beneficios o términos que no estén en los documentos
- [ ] No suavices una señal roja para parecer equilibrado — "discrecional" significa que no se debe ningún bono; dilo
- [ ] No presentes reglas que dependen de la jurisdicción (pago del PTO, devoluciones) como universales
- [ ] No tomes el equity a valor nominal sin marcar el supuesto de valuación
- [ ] No dejes en pie el titular de "compensación total" — reconstrúyelo desde el lenguaje del plan

## Basado en

Práctica de revisión de ofertas — reconstrucción de la compensación total, decodificación del lenguaje del plan, listas de preguntas previas a la firma.
