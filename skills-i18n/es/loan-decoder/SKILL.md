---
name: loan-decoder
language: es
description: "Decodifica una oferta de préstamo personal, de auto o hipotecario a lo que realmente cuesta y dónde están las trampas. Úsalo cuando alguien pregunte 'este préstamo es buen negocio', 'decodifica mi oferta de préstamo', 'qué estoy firmando' o 'cuánto me va a costar realmente esta hipoteca'. Produce la cifra de costo total del préstamo, la conciliación entre la APR y la tasa anunciada, señales de alerta clasificadas (penalizaciones por pago anticipado, comisiones basura, exposición a reajustes de tasa) y las tres preguntas que más cambian el trato."
---

> Traducción al español de [loan-decoder](../../../skills/loan-decoder/SKILL.md) — la versión en inglés es la canónica.

# Decodificador de Préstamos

El papeleo de un préstamo está construido alrededor del número que quieren que veas (la cuota mensual) y de varios que preferirían que no vieras. Esta skill calcula lo que pagarás realmente en total, y luego clasifica todo lo de la oferta que puede mover esa cifra silenciosamente en tu contra.

## Qué produce esta skill

- La cifra de costo total del préstamo: todo lo pagado durante su vida, y el subtotal de intereses + comisiones
- APR vs. tasa anunciada, conciliadas — de dónde sale la brecha
- Señales de alerta clasificadas: penalizaciones por pago anticipado, comisiones basura, exposición a reajustes de tasa variable, productos añadidos
- Las tres preguntas que más cambian este trato en concreto, más lo que es negociable

## Entradas requeridas

Pídelas solo si no fueron proporcionadas:

- **El texto del documento de oferta** — estimación del préstamo, hoja de términos o contrato. Con papeleo parcial, decodifica lo que hay y lista los números que aún faltan (APR, desglose de comisiones, términos de penalización).
- **Datos básicos del préstamo si no están en el texto** — monto, tasa, plazo, fija o variable.
- **Su plan** — cuánto tiempo conservarán el préstamo/el bien, y si podrían pagar antes de tiempo.

## Marco: Escala de gravedad

- 🔴 **Puede costarte dinero real** — penalizaciones por pago anticipado (cita la fórmula, calcula un ejemplo), interés precalculado / Regla del 78, añadidos obligatorios incorporados al principal (seguro de crédito, garantías, GAP), pagos globo, exposición a tasa variable sin topes, sobreprecios de tasa.
- 🟡 **Inusual — cuestiónalo** — comisiones basura (comisiones de documentación/trámite/administración más allá de costos genuinos de terceros), arbitraje obligatorio, colateralización cruzada, acumulación de cargos por mora.
- 🟢 **Estándar** — estructura de originación ordinaria, costos genuinos de terceros (tasación, registro); etiquétalos para que el lector pueda relajarse.

Muestra siempre la aritmética:
1. **Costo total del préstamo** = todos los pagos + todas las comisiones que retiene el prestamista; muestra cuota mensual × meses + comisiones y el subtotal de intereses.
2. **APR vs. tasa anunciada** — explica la brecha como comisiones expresadas como tasa; si la APR no está declarada, márcalo, no la estimes en silencio.
3. **Encuadre del reajuste de tasa variable** — índice + margen, topes, y la cuota en los topes. Preséntalo como exposición ("la cuota puede pasar de X a Y"), no como predicción.
4. **La cuenta de la salida anticipada** — el costo de liquidar en el plazo declarado por el usuario, con la penalización aplicada.

## Formato de salida

### Decodificación de préstamo: [tipo de préstamo, monto]

**1. El veredicto** — tómalo / negocia estos términos primero / busca en otro lado, con la cifra de costo total por delante.

**2. Los números reales** — costo total, intereses totales, comisiones totales, APR vs. tasa anunciada con la brecha explicada; la peor cuota tras reajuste si es variable.

**3. Tabla de decodificación**

| Término / comisión | Qué dice el documento | Qué significa para ti | Gravedad |
|---|---|---|---|

**4. 🚩 Señales de alerta, clasificadas** — la línea citada, su costo en dinero bajo un escenario realista, y la corrección que conviene pedir.

**5. Las tres preguntas que más cambian el trato** — específicas de esta oferta (p. ej. "¿Cuál es la tasa sin los añadidos?", "¿Hay penalización por pago anticipado, por escrito?", "¿Qué comisiones son suyas vs. de terceros?").

**6. Qué es negociable** — tasa, comisiones, añadidos, eliminación de penalizaciones — y qué palanca mueve más el total.

Termina el artefacto con, textualmente: *"Esta es una lectura en lenguaje claro, no asesoría legal/financiera — las leyes varían según la jurisdicción; confirma cualquier punto crítico con un profesional calificado."*

## Controles de calidad

- [ ] El costo total del préstamo se calcula con aritmética visible, no se afirma
- [ ] APR vs. tasa anunciada está conciliada o marcada explícitamente como faltante
- [ ] La exposición a tasa variable se muestra como montos de cuota concretos en los topes
- [ ] Cada señal de alerta cita el documento y pone precio al daño en dinero
- [ ] Los números faltantes se listan como `[por confirmar]`, nunca se estiman en silencio
- [ ] La línea de descargo aparece textualmente en el artefacto

## Anti-patrones

- [ ] No inventes términos, tasas o comisiones que no estén en el documento
- [ ] No suavices una señal roja para parecer equilibrado — una penalización por pago anticipado es un costo, nómbralo
- [ ] No presentes reglas de préstamo que dependen de la jurisdicción como universales
- [ ] No compares contra "tasas típicas de mercado" como hecho — presenta las comparaciones como rangos a verificar
- [ ] No dejes que la cuota mensual cargue con el veredicto — el costo total es el titular

## Basado en

Práctica de revisión de préstamos del lado del prestatario — cálculo de costo total, conciliación de APR, auditoría de comisiones, encuadre de escenarios de reajuste.
