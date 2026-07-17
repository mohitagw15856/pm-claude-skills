---
name: tos-decoder
language: es
description: "Decodifica unos términos de servicio o una política de privacidad a lo que realmente estás aceptando, clasificado por impacto en el mundo real. Úsalo cuando alguien pregunte 'qué estoy aceptando', 'decodifica esta política de privacidad', 'estos ToS son malos' o 'debería hacer clic en aceptar'. Produce una tabla de hallazgos clasificados con un veredicto de '¿debería importarme?' por hallazgo, cubriendo reventa de datos, arbitraje y renuncia a demandas colectivas, cambios unilaterales, licencias sobre tu contenido y qué significa realmente la eliminación."
---

> Traducción al español de [tos-decoder](../../../skills/tos-decoder/SKILL.md) — la versión en inglés es la canónica.

# Decodificador de Términos de Servicio

Nadie lee los términos — ese es el modelo de negocio. Esta skill los lee y responde la única pregunta que importa por cláusula: *¿debería importarte de verdad?* La mayor parte de unos ToS es plantilla defensiva; el valor está en encontrar las tres cláusulas que no lo son.

## Qué produce esta skill

- Hallazgos clasificados por impacto en el mundo real, no por orden del documento
- Un "qué estás aceptando" en lenguaje claro por hallazgo, con un veredicto de "¿debería importarme?"
- La conclusión: aceptar / aceptar con los ojos abiertos / evitar
- Qué puedes hacer realmente sobre las partes malas (ajustes, exclusiones voluntarias, alternativas)

## Entradas requeridas

Pídelas solo si no fueron proporcionadas:

- **El texto de los ToS / la política de privacidad** — pegado completo o por secciones. Con extractos, decodifica lo que hay y lista qué temas de alto impacto (arbitraje, compartición de datos, licencias, eliminación) faltan en lo compartido.
- **Qué es el servicio** y cómo lo usarán (casualmente vs. para negocio, subiendo obra original, guardando datos sensibles).
- **Qué les preocupa más**, si hay algo específico.

## Marco: Escala de gravedad

Clasifica los hallazgos por lo que le pasa a una persona real, lo peor primero:

- 🔴 **Puede costarte dinero o derechos reales** — arbitraje vinculante + renuncia a demandas colectivas (no puedes unirte a una demanda cuando algo sale mal), venta o compartición de datos personales con terceros/corredores de datos, licencias amplias y perpetuas sobre tu contenido (especialmente sublicenciables/para entrenar IA), cláusulas de cambio unilateral con "uso continuado = consentimiento", cancelación de cuenta con pérdida de saldos pagados o contenido.
- 🟡 **Inusual — conócelo antes de hacer clic** — una "eliminación" que en realidad es desactivación o excluye copias de seguridad, renovación automática con cancelación difícil, retención de datos tras cerrar la cuenta, jurisdicción/fuero lejos de casa, cláusulas de el-feedback-pasa-a-ser-nuestro.
- 🟢 **Plantilla estándar** — exenciones de garantía, límites de responsabilidad, reglas de uso aceptable; nómbralas para que el lector deje de preocuparse por ellas.

Para cada hallazgo 🔴/🟡, escribe un veredicto de una línea de **"¿Debería importarme?"** ajustado al uso declarado de *este usuario* — p. ej. "Sí, si subes obra original; ignóralo si solo miras." Revisa específicamente: datos recopilados vs. compartidos vs. vendidos; el alcance exacto de cualquier licencia sobre contenido (¿perpetua? ¿sublicenciable? ¿sobrevive a la eliminación?); cómo deben resolverse las disputas; cómo pueden cambiar los términos; qué elimina realmente la eliminación.

## Formato de salida

### Decodificación de ToS: [nombre del servicio]

**1. Conclusión** — aceptar / aceptar con los ojos abiertos / evitar, en dos frases, más la peor cláusula individual.

**2. Hallazgos, clasificados por impacto**

| # | Qué estás aceptando (lenguaje claro) | Dónde (línea/sección citada) | Gravedad | ¿Debería importarme? |
|---|---|---|---|---|

**3. La realidad de la eliminación** — qué hace realmente "eliminar mi cuenta/mis datos", según el texto.

**4. Qué puedes hacer** — exclusiones voluntarias, ajustes, ventanas de exclusión del arbitraje si el texto las ofrece, y qué es simplemente lo-tomas-o-lo-dejas.

Termina el artefacto con, textualmente: *"Esta es una lectura en lenguaje claro, no asesoría legal/financiera — las leyes varían según la jurisdicción; confirma cualquier punto crítico con un profesional calificado."*

## Controles de calidad

- [ ] Los hallazgos están clasificados por impacto en el mundo real, no por el orden del documento
- [ ] Cada hallazgo 🔴/🟡 cita el texto real de la cláusula o el número de sección
- [ ] Cada hallazgo recibe un veredicto de "¿debería importarme?" ligado al uso declarado del usuario
- [ ] La plantilla estándar se etiqueta 🟢 explícitamente — la tranquilidad es parte del producto
- [ ] Los temas de alto impacto ausentes del texto proporcionado se listan como no revisados, no se asumen bien
- [ ] La línea de descargo aparece textualmente en el artefacto

## Anti-patrones

- [ ] No inventes cláusulas que no estén en el documento — decodifica solo el texto proporcionado
- [ ] No suavices una señal roja para parecer equilibrado — "todos lo hacen" no la vuelve inofensiva
- [ ] No presentes reglas que dependen de la jurisdicción (derechos de privacidad, límites del arbitraje) como universales
- [ ] No hagas teatro de indignación ante plantilla ordinaria — gritar lobo entierra los hallazgos reales
- [ ] No omitas el veredicto — una lista de cláusulas sin "¿debería importarme?" es solo unos ToS más cortos

## Basado en

Práctica de revisión de contratos de consumo — triaje de cláusulas por impacto, lectura del alcance de licencias, análisis de cláusulas de disputa.
