---
name: hoa-decoder
language: es
description: "Decodifica los estatutos de una HOA (CC&Rs) y su estructura de cuotas antes de comprar dentro de ella. Úsalo cuando alguien pregunte 'qué significan realmente estas reglas de la HOA', 'decodifica estos CC&Rs', 'esta HOA va a ser un problema' o 'qué debería revisar antes de comprar en una HOA'. Produce una decodificación de restricciones clasificada por impacto en tu estilo de vida, un análisis de exposición a derramas especiales, la mecánica de multas y ejecución, y los registros exactos a solicitar antes de comprar."
---

> Traducción al español de [hoa-decoder](../../../skills/hoa-decoder/SKILL.md) — la versión en inglés es la canónica.

# Decodificador de HOA

Comprar dentro de una HOA es unirse a un gobierno diminuto con poder impositivo sobre ti. Esta skill lee los CC&Rs como esa amiga que ya se sentó en las reuniones de la junta: qué reglas cambiarán cómo vives, qué tan grandes pueden ser las facturas sorpresa, y qué registros exigir primero.

## Qué produce esta skill

- Restricciones de uso decodificadas y clasificadas por impacto en el estilo de vida de este comprador
- Exposición a derramas especiales: qué puede imponer la junta, con qué votación, con qué tope
- Mecánica de ejecución y multas — cómo escala una infracción, hasta llegar a gravámenes
- Decodificación de restricciones de alquiler, preguntas sobre escalada de cuotas y los registros a solicitar

## Entradas requeridas

Pídelas solo si no fueron proporcionadas:

- **Los documentos** — CC&Rs, estatutos, reglamentos, páginas de cuotas/presupuesto. Decodifica lo proporcionado; el estudio de reservas, el presupuesto y las actas normalmente no están en los CC&Rs — márcalos como registros a solicitar.
- **Cómo planean vivir** — mascotas, vehículos, negocio en casa, alquilar algún día, renovaciones. La clasificación depende de esto.
- **Cuotas actuales y cualquier derrama conocida**, si no están en el texto.

## Marco: Escala de gravedad

- 🔴 **Puede costarte dinero real** — derramas especiales sin tope o con umbral bajo, multas que se acumulan y pueden madurar en gravámenes (en algunos lugares ejecución hipotecaria — depende de la jurisdicción), prohibiciones/cupos de alquiler que matan un plan de inversión, aprobación de modificaciones con criterios vagos, aumentos de cuota sin tope, comisiones de transferencia.
- 🟡 **Inusual — indaga antes de comprar** — restricciones que chocan con los planes declarados de este comprador (mascotas, vehículos, negocio en casa, decoración), revisión arquitectónica sin plazo de decisión, poder de la junta para modificar reglas sin voto de los miembros.
- 🟢 **Estándar** — reglas ordinarias de molestias, basura y áreas comunes; etiquétalas para que el comprador no entre en pánico ante la plantilla.

Recorre los documentos buscando: **restricciones de uso**, **mecánica de derramas** (topes al aumento de cuotas; umbral de aprobación; sin tope declarado = señal de alerta), **restricciones de alquiler** (cupos, listas de espera, plazos mínimos, derechos adquiridos), **cadena de ejecución** (notificación → audiencia → multa → gravamen; cita cada paso), **reglas de enmienda** (qué tan fácil pueden cambiar las reglas debajo de ti). Donde la exigibilidad sea cuestionable, marca *"la exigibilidad varía según la jurisdicción — verifícalo localmente"* en lugar de declararla nula.

## Formato de salida

### Decodificación de HOA: [nombre de la comunidad]

**1. El veredicto** — compra tranquilo / compra con los ojos abiertos / esta HOA va a pelear contra tu estilo de vida — en tres frases.

**2. Restricciones clasificadas por impacto en ti**

| Restricción (§) | Qué dice | Cómo golpea tus planes | Gravedad |
|---|---|---|---|

**3. 💸 Exposición de dinero** — cuotas hoy, mecánica de aumentos, reglas de derramas especiales citadas, la peor factura realista; calendario de multas y ruta al gravamen.

**4. 🚩 Señales de alerta, clasificadas** — lenguaje citado, el escenario donde muerde, gravedad.

**5. Registros a solicitar antes de comprar** — estudio de reservas (y nivel de fondeo), 24 meses de actas de la junta, presupuesto y tasa de morosidad, póliza maestra de seguro, derramas especiales y litigios pendientes/pasados, estado del cupo de alquiler y lista de espera.

**6. Preguntas para la junta/el administrador** — historial de escalada de cuotas ("¿las cuotas de cada uno de los últimos 5 años?"), reparaciones mayores próximas, con qué frecuencia se imponen multas realmente.

Termina el artefacto con, textualmente: *"Esta es una lectura en lenguaje claro, no asesoría legal/financiera — las leyes varían según la jurisdicción; confirma cualquier punto crítico con un profesional calificado."*

## Controles de calidad

- [ ] Las restricciones se clasifican por el estilo de vida declarado de este comprador, no por el orden del documento
- [ ] La mecánica de derramas especiales se cita; "sin tope declarado" es en sí una señal 🔴
- [ ] La cadena de ejecución se traza paso a paso desde el texto real
- [ ] La lista de registros a solicitar es concreta, con el porqué de cada uno
- [ ] Los documentos no proporcionados (estudio de reservas, actas, presupuesto) se nombran como huecos
- [ ] La línea de descargo aparece textualmente en el artefacto

## Anti-patrones

- [ ] No inventes restricciones o poderes que no estén en los documentos
- [ ] No suavices una señal roja para parecer equilibrado — un poder de derrama sin tope es un cheque en blanco
- [ ] No presentes reglas que dependen de la jurisdicción (poderes de gravamen/ejecución, exigibilidad) como universales
- [ ] No clasifiques por lo estricta que suena una regla — clasifica por si toca la vida de este comprador
- [ ] No omitas las preguntas de salud financiera — los CC&Rs solos nunca muestran una HOA quebrada

## Basado en

Práctica de diligencia debida de HOA del lado del comprador — triaje de CC&Rs, análisis de exposición a derramas, listas de registros.
