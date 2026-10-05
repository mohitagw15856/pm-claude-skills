---
name: lease-decoder
language: es
description: "Decodifica un contrato de arrendamiento residencial a lenguaje claro y clasifica las cláusulas que pueden perjudicarte. Úsalo cuando alguien pregunte 'qué estoy firmando', 'decodifica mi contrato de renta', 'este contrato de alquiler es normal' o 'de verdad puede hacer eso mi arrendador'. Produce una tabla de decodificación cláusula por cláusula, señales de alerta clasificadas, el cálculo de la cláusula de salida y del depósito, preguntas para hacer antes de firmar y qué es realmente negociable."
---

> Traducción al español de [lease-decoder](../../../skills/lease-decoder/SKILL.md) — la versión en inglés es la canónica.

# Decodificador de Contratos de Arrendamiento

Un contrato de arrendamiento lo redacta la parte del arrendador, para la parte del arrendador. Esta skill lo lee como esa amiga perspicaz que se dedica a leer contratos: qué significa cada cláusula, cuáles pueden costarte dinero de verdad y qué conviene renegociar antes de firmar — no después.

## Qué produce esta skill

- Una tabla de decodificación cláusula por cláusula, en lenguaje claro
- Señales de alerta clasificadas por gravedad, con las cuentas en dinero explícitas (penalizaciones por salida anticipada, renovación automática, condiciones del depósito)
- Preguntas para hacerle al arrendador antes de firmar
- Una lista breve de lo que realmente es negociable

## Entradas requeridas

Pídelas solo si no vienen ya en la solicitud:

- **El texto del contrato** — pegado, transcrito de fotos, o parcial. Trabaja con lo que haya y señala con claridad qué cláusulas estándar faltan o resultan ilegibles.
- **Renta, depósito y plazo**, si no constan en el texto.
- **Ubicación aproximada** (estado/país) — nunca la supongas; la exigibilidad legal varía muchísimo.
- Opcional: qué le importa más a la persona (mascotas, subarrendar, salir antes de tiempo, trabajar desde casa).

## Marco: escala de gravedad

Clasifica cada hallazgo en esta escala, ordenada por costo real:

- 🔴 **Puede costarte dinero de verdad** — renovación automática por un plazo completo nuevo, penalizaciones de salida que exceden los costos de re-alquiler, traslado de la carga de reparaciones/mantenimiento al inquilino, condiciones de devolución del depósito redactadas para incumplirse (p. ej., recibos de "limpieza profesional"), acumulación de cargos, renuncias de responsabilidad.
- 🟡 **Inusual — renegóciala** — entrada del arrendador con aviso corto o sin aviso, restricciones generales a las visitas, aseguradora obligatoria elegida por el arrendador, cambios unilaterales de reglas, "daños más allá del desgaste normal" definidos con vaguedad.
- 🟢 **Cláusula estándar** — dilo con claridad, para que quien lee sepa de qué no preocuparse.

Recorre el contrato buscando específicamente: **trampas de renovación automática** (ventana de aviso; a qué te compromete el silencio), **traslado de la carga de reparaciones**, **derechos de entrada** (plazo de aviso, motivos), **el cálculo de la cláusula de salida** (calcula el costo real de salir, en dinero), **condiciones de devolución del depósito** (enumera cada condición declarada). Cuando una cláusula sea habitualmente inexigible (p. ej., renunciar a la habitabilidad), márcala así: *"a menudo inexigible — consulta a una organización local de inquilinos; la exigibilidad varía según la jurisdicción."* Nunca declares una cláusula nula como hecho universal.

## Formato de salida

### Decodificación del contrato: [dirección o "tu contrato"]

**1. El veredicto en un párrafo** — firmar / negociar primero / retirarse, y por qué.

**2. Decodificación cláusula por cláusula**

| Cláusula (§) | Qué dice | Qué significa para ti | Gravedad |
|---|---|---|---|

**3. 🚩 Señales de alerta, clasificadas** — de peor a menor, cada una con: la línea citada, el peor escenario realista en dinero o complicaciones, y la corrección que conviene pedir.

**4. Cálculo de salida y depósito** — cuánto cuesta realmente irse antes, y cada condición asociada a recuperar el depósito.

**5. Preguntas antes de firmar** — de 3 a 6, ordenadas por poder de negociación.

**6. Qué es negociable** — las cláusulas que los arrendadores modifican habitualmente cuando se les pide.

Cierra el artefacto con esta línea, textual: *"Esta es una lectura en lenguaje claro, no asesoría legal ni financiera — las leyes varían según la jurisdicción; confirma cualquier punto importante con un profesional calificado."*

## Controles de calidad

- [ ] Cada señal de alerta cita el texto real del contrato — número de sección o cita textual
- [ ] El cálculo de la cláusula de salida y del depósito está hecho con números reales, no descrito con vaguedad
- [ ] Los puntos que dependen de la jurisdicción están marcados como tales, con la referencia a una organización de inquilinos
- [ ] Las secciones faltantes o ilegibles se nombran explícitamente, no se disimulan
- [ ] Las cláusulas genuinamente estándar están marcadas 🟢 para que el lector no tema al texto de rutina
- [ ] La línea de descargo aparece textual en el artefacto

## Anti-patrones

- [ ] No inventes cláusulas que no están en el documento — decodifica solo lo que existe
- [ ] No suavices una señal de alerta por parecer equilibrado — si puede costar dinero de verdad, dilo sin rodeos
- [ ] No presentes reglas dependientes de la jurisdicción como universales — márcalas y deriva a un profesional
- [ ] No marques todo 🔴 — una decodificación donde todo es alarma es tan inútil como una sin alarmas
- [ ] No des estrategia de litigio ni veredictos de "esto es ilegal" — eso le corresponde a un abogado

## Basado en

Práctica de revisión de contratos del lado del inquilino — triaje de cláusulas, cálculo del costo de salida, auditoría de condiciones del depósito.

## Frases disparadoras de ejemplo

- "¿Qué estoy firmando?"
- "Explícame mi contrato de alquiler."
- "¿Es normal este contrato de arrendamiento?"
- "¿De verdad puede hacer esto mi casero?"
