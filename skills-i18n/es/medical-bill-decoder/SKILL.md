---
name: medical-bill-decoder
language: es
description: "Decodifica una factura médica detallada o una EOB a lenguaje claro y encuentra los cargos que vale la pena disputar. Úsalo cuando alguien pregunte 'por qué mi factura médica es tan alta', 'decodifica mi factura del hospital', 'qué dice esta EOB' o 'puedo negociar esta factura'. Produce una decodificación línea por línea, señales de duplicados y desagregación de cargos, alertas de facturación de saldo, y guiones listos para leer al pedir la factura detallada, asistencia financiera y la llamada de negociación."
---

> Traducción al español de [medical-bill-decoder](../../../skills/medical-bill-decoder/SKILL.md) — la versión en inglés es la canónica.

# Decodificador de Facturas Médicas

Las facturas médicas están escritas en código — literalmente — y los errores son tan comunes que leer la tuya con cuidado paga dinero real. Esta skill traduce cada línea, marca los cargos que parecen incorrectos y te entrega las palabras exactas para decir por teléfono.

## Qué produce esta skill

- Una decodificación línea por línea de los cargos, en lenguaje claro
- Señales de alerta clasificadas: duplicados, desagregación de cargos, facturación de saldo, cargos inverosímiles
- Tres guiones: pedir la factura detallada, preguntar por asistencia financiera, negociar el saldo
- Una lista de acciones priorizada — qué disputar primero y con quién

## Entradas requeridas

Pídelas solo si no fueron proporcionadas:

- **El texto de la factura y/o la EOB** — pegado o transcrito. Si solo es una factura resumida, dilo y empieza con el guion para pedir la factura detallada; decodifica lo visible.
- **Situación de seguro** — asegurado (dentro/fuera de la red, si se sabe), sin seguro, o no está seguro.
- **Contexto** — el motivo de la visita, y si el centro se eligió en una emergencia.

## Marco: Escala de gravedad

Califica cada hallazgo:

- 🔴 **Puede costarte dinero real** — cargos duplicados, desagregación (un procedimiento facturado como varios códigos componentes), facturación de saldo por atención fuera de la red en un centro dentro de la red o en una emergencia, cargos por atención que no ocurrió, discrepancia entre factura y EOB, que te facturen más que la "responsabilidad del paciente" de la EOB.
- 🟡 **Inusual — cuestiónalo** — líneas vagas ("insumos", "tarifa de instalación") con cifras grandes, señales de sobrecodificación del nivel de servicio (código de visita del nivel más alto para una visita simple), cargos muy por encima de lo típico.
- 🟢 **Estándar** — copagos, aplicación del deducible y líneas de aspecto normal; dilo explícitamente.

Decodifica los códigos por encuadre, no con tablas de consulta: explica qué significa el *tipo* de código CPT/HCPCS o de ingresos según su contexto en la factura, y marca cualquier código que no puedas interpretar con confianza como `[por confirmar — pregunta a facturación qué cubre]`. Nunca fabriques un estándar de código-a-precio. Compara siempre la factura contra la EOB cuando existan ambas — la brecha entre ellas es donde está el dinero.

## Formato de salida

### Decodificación de factura médica: [proveedor / fecha de servicio]

**1. El veredicto** — total facturado, qué parece legítimo, qué es disputable y una cifra objetivo realista.

**2. Decodificación línea por línea**

| Línea / código | Qué parece ser | Monto | Evaluación | Gravedad |
|---|---|---|---|---|

**3. 🚩 Señales de alerta, clasificadas** — cada una con la línea específica citada, por qué es sospechosa y ante quién plantearla (departamento de facturación, aseguradora, o ambos).

**4. Tus guiones** — tres guiones cortos, palabra por palabra: (a) pedir la factura completamente detallada con códigos, (b) preguntar por asistencia financiera / atención caritativa y descuentos por pronto pago, (c) la llamada de negociación — abre con las disputas, luego pide una reducción y un plan de pagos; consigue todo por escrito.

**5. Orden de acción** — pasos numerados, con plazos anotados (no dejes que pase a cobranzas mientras disputas — di que pidan una suspensión).

Termina el artefacto con, textualmente: *"Esta es una lectura en lenguaje claro, no asesoría legal/financiera — las leyes varían según la jurisdicción; confirma cualquier punto crítico con un profesional calificado."*

## Controles de calidad

- [ ] Cada cargo marcado apunta a una línea específica de la factura, citada o numerada
- [ ] Factura y EOB se cruzan cuando ambas fueron proporcionadas; las discrepancias son las alertas principales
- [ ] Los códigos no interpretables se marcan `[por confirmar]`, nunca se adivinan como diagnóstico
- [ ] Los tres guiones son utilizables palabra por palabra, no resúmenes de qué decir
- [ ] Las alertas de facturación de saldo señalan que las protecciones dependen de la jurisdicción y del tipo de plan
- [ ] La línea de descargo aparece textualmente en el artefacto

## Anti-patrones

- [ ] No inventes cargos, códigos o precios que no estén en el documento
- [ ] No suavices una señal roja para parecer equilibrado — un duplicado probable es un duplicado probable
- [ ] No presentes protecciones de facturación que dependen de la jurisdicción como universales
- [ ] No diagnostiques ni cuestiones la atención médica en sí — decodifica solo la facturación
- [ ] No prometas resultados ("te lo van a condonar") — presenta los guiones como solicitudes con buenas probabilidades

## Basado en

Práctica de defensoría del paciente en facturación — auditoría de facturas detalladas, conciliación de EOB, guiones de negociación.
