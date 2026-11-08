---
# machine-translated to es from skills/renewal-playbook/SKILL.md — review: pending. Native fixes welcome via PR.
name: renewal-playbook
description: "Crea un playbook de renovación estructurado para una cuenta de cliente. Úsalo cuando necesites planificar una renovación, estructurar una negociación de renovación, prepararte para una conversación de expansión, o construir una estrategia de renovación para cuentas en riesgo o saludables. Produce un brief de renovación con evaluación de salud, estrategia de negociación, respuestas a objeciones, palancas de expansión y una cronología."
---

# Skill de Playbook de Renovación

Este skill produce un playbook de renovación completo para una cuenta de cliente específica, cubriendo evaluación de salud, estrategia comercial, preparación de negociación, mapeo de oportunidades de expansión y una cronología paso a paso. El resultado está listo para que el CSM o el equipo de cuenta lo ejecute entre 90 y 180 días antes de la renovación.

## Inputs Requeridos

Pregunta al usuario por estos datos si no están disponibles:
- **Nombre de la cuenta**
- **Fecha de renovación**
- **ARR actual** y ARR de renovación propuesto (si es diferente)
- **Salud de la cuenta** — estado RAG y razones principales (o describe la situación de la cuenta)
- **Stakeholders clave** — comprador económico, champion y cualquier detractor
- **Factores de riesgo de renovación** — presión presupuestaria, adopción baja, amenaza competitiva, salida del champion, etc.
- **Oportunidad de expansión** — ¿hay potencial de upsell o cross-sell?
- **Términos del contrato** — plan actual, duración y cualquier término que esté en renegociación

## Estructura de Salida

---

# Playbook de Renovación: [Nombre de la Cuenta]

**Fecha de renovación:** [Fecha]
**ARR actual:** [£/$/€ X]
**ARR objetivo de renovación:** [£/$/€ X — sin cambios / +X% expansión / riesgo de contracción]
**Estado de salud:** [Verde / Ámbar / Rojo]
**CSM:** [Nombre]
**Account executive:** [Nombre]
**Días para renovación:** [X días]

---

## 1. Snapshot de Salud de la Cuenta

| Dimensión | Puntuación (1–5) | Evidencia |
|---|---|---|
| **Adopción del producto** | [X/5] | [p. ej. 3 de 5 asientos comprados activos; feature core usado semanalmente] |
| **Resultados de negocio** | [X/5] | [p. ej. Cliente reporta X% de mejora en [métrica]; no se realizó revisión formal de ROI] |
| **Profundidad de relación** | [X/5] | [p. ej. Champion fuerte en [nombre/rol]; patrocinio ejecutivo limitado] |
| **Soporte y satisfacción** | [X/5] | [p. ej. 2 tickets P2 abiertos; último NPS 7; sin escalaciones en 6 meses] |
| **Engagement comercial** | [X/5] | [p. ej. Factura pagada a tiempo; sin presión de descuento planteada aún] |
| **Salud general** | [X/5 — ponderada] | [Verde / Ámbar / Rojo] |

**Tesis de renovación:** [Una frase: por qué esta cuenta se renovará — o qué debe cambiar para que se renueve.]

---

## 2. Mapa de Stakeholders

| Stakeholder | Rol | Influencia | Sentimiento | Nuestra relación |
|---|---|---|---|---|
| [Nombre] | Comprador económico | Alta | [Positivo / Neutral / Negativo] | [Cercana / Lejana / Desconocida] |
| [Nombre] | Champion | Alta | [Positivo] | [Cercana] |
| [Nombre] | Usuario final | Baja | [Neutral] | [Limitada] |
| [Nombre] | IT / procurement | Media | [Neutral] | [Transaccional] |

**Riesgo del champion:** [¿Es segura la posición de nuestro champion en su rol? ¿Hay señales de salida u reorganización?]

**Plan multi-thread:** [¿Con quién más necesitamos relaciones antes de la renovación? ¿Cómo llegamos allí?]

---

## 3. Registro de Riesgos

| Riesgo | Probabilidad (A/M/B) | Impacto (A/M/B) | Mitigación |
|---|---|---|---|
| [Presión presupuestaria / reducción de costos] | [A] | [A] | [Construir caso de ROI 90 días antes; identificar prioridades del responsable de presupuesto] |
| [Adopción baja en [departamento]] | [M] | [A] | [Ejecutar sesión de enablement dirigida; vincular a los OKRs del champion] |
| [Evaluación competitiva] | [M] | [M] | [Solicitar inteligencia competitiva; programar llamada de nivel ejecutivo] |
| [Salida del champion] | [B] | [A] | [Mapear dos stakeholders adicionales; llamada de introducción ejecutiva] |

---

## 4. Historia de Valor

Construye la narrativa de ROI para la conversación de renovación:

**Resultado principal:** [p. ej. "[Cuenta] ahorró X horas/semana o redujo [métrica] por X% usando [producto]"]

**Fuentes de evidencia:**
- [ ] Datos de uso del producto (logins, features utilizadas, utilización de asientos)
- [ ] Mejora de métrica de negocio (extraer del deck de QBR o plan de éxito)
- [ ] Mejora en tiempo de resolución de soporte
- [ ] Testimonial del cliente o citas de caso de estudio

**Brechas de valor a cerrar antes de renovación:** [¿Hay resultados que el cliente esperaba pero aún no ha visto? ¿Cuál es el plan para cerrar estos?]

---

## 5. Oportunidad de Expansión

Mapea el potencial más allá de renovación plana:

| Oportunidad | Tipo | Valor estimado | Probabilidad | Cronología |
|---|---|---|---|---|
| [Expansión de asientos — [dept] quiere agregar 10 usuarios] | Upsell | [+£X ARR] | [Alta] | [Renovación o +3M] |
| [Cross-sell — [Producto B] caso de uso identificado] | Cross-sell | [+£X ARR] | [Media] | [+6M] |
| [Compromiso multi-año] | Descuento por término | [+£X TCV / -X% descuento] | [Baja] | [En renovación] |

**Juego de expansión:** [Qué oportunidad llevar primero y la secuencia para plantearla en la conversación de renovación]

---

## 6. Estrategia Comercial

**Planificación de escenarios de renovación:**

| Escenario | Probabilidad | Resultado ARR | Estrategia de respuesta |
|---|---|---|---|
| **Renovación plana** | [X%] | [£X — igual al actual] | [Aceptar; sembrar semillas para expansión +6M] |
| **Expansión** | [X%] | [£X] | [Liderizar con evidencia de ROI; proponer expansión de asientos o features] |
| **Riesgo de contracción** | [X%] | [£X — degradación a tier inferior] | [Proponer compromiso escalonado; demostrar camino hacia adopción completa] |
| **Riesgo de churn** | [X%] | [£0] | [Escalar a liderazgo; engagement de patrocinador ejecutivo] |

**Guardarraíles de descuento:**
- Descuento mínimo: [X% — no ir por debajo sin aprobación de VP]
- Triggers para descuento: [Multi-año / volumen / compromiso de cliente referencia]
- Qué pedir a cambio: [Case study de referencia / reseña G2 / introducción ejecutiva / participación en case study]

**Flexibilidad de precios:**
- [p. ej. Puedo ofrecer facturación mensual a cambio de compromiso de 24 meses]
- [p. ej. Puedo ofrecer X asientos gratis a cambio de compromiso de expansión]

---

## 7. Respuestas a Objeciones

Prepárate para las objeciones más probables:

**"El precio es demasiado alto"**
> Ancla en valor entregado: "[Cliente] logró [X resultado] — a [£X ARR], eso es [£Y por resultado / hora ahorrada / usuario]. ¿Cuánto costaría entregar ese resultado sin nosotros?"
> Si el presupuesto es genuinamente limitado, explora: pago escalonado, reducción de scope en lugar de churn completo, precios multi-año.

**"No estamos viendo suficiente adopción"**
> Reconoce, luego compromete: "Tienes razón — [X asientos] están usando activamente [feature core] de [Y]. Queremos arreglarlo. Aquí está nuestro plan de 60 días: [llamada de patrocinador ejecutivo sobre enablement / sesión de training / campaña de nudge in-product]."

**"Estamos evaluando [Competidor]"**
> No entres en pánico. Pregunta: "¿Qué impulsa la evaluación — son features específicas, precios o algo más?" Luego mapea las brechas honestamente. Ofrece un preview de roadmap de features si es relevante. Obtén claridad sobre sus criterios y cronología antes de responder defensivamente.

**"Necesitamos reducir gastos este trimestre"**
> Separa la conversación comercial de la conversación de valor. Ofrece proteger la relación con scope reducido hoy con un trigger de expansión comprometido en un hito de negocio. Evita descontar sin razón.

---

## 8. Cronología de Renovación

| Semana | Acción | Propietario | Notas |
|---|---|---|---|
| **S–16** (4 meses antes) | Revisión interna de renovación — salud, oportunidad de expansión, riesgo | CSM | Alertar a liderazgo si está en Rojo |
| **S–12** | QBR / revisión de negocio ejecutivo — evidencia de ROI entregada | CSM + AE | Reservar 45–60 min con comprador económico |
| **S–10** | 1:1 con champion — verificación de pulso sobre satisfacción y prioridades próximas | CSM | Descubrir dinámicas internas antes de discusión comercial |
| **S–8** | Conversación de expansión — sembrar semillas, compartir roadmap | AE | No liderizar con precios |
| **S–6** | Enviar propuesta de renovación — precios, términos, opciones | AE | Incluir opción multi-año |
| **S–4** | Negociación — abordar objeciones, finalizar términos comerciales | AE + CSM | Escalar a VP si se requiere descuento >X% |
| **S–2** | Legal / procurement — redlines de contrato, proceso de firma | AE + Legal | |
| **S–0** | Firmado. Traspaso a plan de éxito post-renovación | CSM | Agradecer al champion; comenzar próximo ciclo |

---

## 9. Criterios de Éxito

- [ ] Renovación firmada antes de la fecha límite
- [ ] Resultado de ARR dentro del rango objetivo
- [ ] Relación del champion mantenida o mejorada
- [ ] Al menos una conversación de expansión iniciada
- [ ] Evidencia de ROI documentada y aceptada por cliente

---

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/risk-timeline.md`** — El reloj de la renovación: qué ocurre a T-menos-cuánto. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/renewal-plan.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Honestidad sobre la salud | ARR objetivo afirmado sin evaluación de salud, o una cuenta en rojo/ámbar con un plan de renovación plana basado en la esperanza | Hay instantánea de salud con evidencia, pero la tesis de renovación y el ARR objetivo no se derivan del todo de ella (p. ej. se reconoce software sin uso y el objetivo sigue plano) | Cada puntuación cita evidencia, la tesis de renovación se deriva del cuadro de salud y el ARR objetivo refleja la realidad, incluso recomendando contracción o redimensionamiento cuando esa es la jugada honesta |
| Cobertura de stakeholders y riesgos | Visión limitada al champion; comprador económico sin mapear; los riesgos son etiquetas genéricas sin mitigaciones | Comprador económico mapeado, pero las brechas de relación no se abordan; riesgos A/A enumerados, aunque algunas mitigaciones son vagas o sin responsable | Comprador económico, detractores y riesgo del champion evaluados con un plan concreto de múltiples hilos; cada riesgo A/A tiene una mitigación preventiva con fecha y responsable que reaparece en la cronología |
| Rigor comercial | Sin planificación de escenarios; el descuento es la primera y única palanca; sin suelo ni puerta de aprobación | Hay escenarios, pero las probabilidades no suman 100 % o las cifras de ARR no cuadran con los componentes del contrato; hay suelo, pero sin marco de contrapartidas | Las probabilidades de los escenarios suman 100 %, cada cifra de ARR se descompone en partidas reales del contrato, el suelo de descuento y la puerta de escalado son explícitos, y cada concesión nombra qué obtenemos a cambio |
| Especificidad de cronología y objeciones | Sin cronología, o una que empieza a menos de 90 días sin reconocerlo; las respuestas a objeciones son de plantilla | La cronología cubre 90 días o más con responsables, pero las objeciones valdrían para cualquier cuenta; la insatisfacción genuina y las tácticas de negociación se tratan igual | La cronología empieza con 90 días o más (o señala explícitamente el retraso y se comprime) con responsables por paso, y cada respuesta a objeciones usa las cifras reales de esta cuenta, distinguiendo la insatisfacción real que hay que resolver de las tácticas que hay que negociar |

## Controles de Calidad

- [ ] Mapa de stakeholders incluye el comprador económico — no solo el champion
- [ ] Registro de riesgos tiene mitigación para cada riesgo A/A
- [ ] Historia de valor usa datos de producto y resultados de negocio, no solo listas de features
- [ ] Estrategia comercial incluye descuento mínimo y framework de razón-para-descontar
- [ ] Cronología comienza al menos 90 días antes de fecha de renovación
- [ ] Respuestas a objeciones son específicas a esta cuenta, no genéricas

## Anti-Patrones

- [ ] No iniciar conversaciones de renovación menos de 90 días antes de la fecha de renovación para cuentas superiores a $50K ARR
- [ ] No construir estrategia de renovación sin primero evaluar honestamente la salud de la cuenta — el pensamiento ilusorio conduce a churn de último minuto
- [ ] No tratar todas las objeciones de renovación como tácticas de negociación — algunas objeciones señalan insatisfacción genuina que requiere resolución primero
- [ ] No ofrecer descuentos como primera respuesta a objeciones de precio — explora brechas de valor antes de reducir precio
- [ ] No cerrar la renovación sin confirmar la oportunidad de expansión — cada renovación es también una conversación de expansión

## Frases de Trigger de Ejemplo

- "Construye un playbook de renovación para [Nombre de Cuenta] renovando en [Mes]"
- "Ayúdame a planificar la estrategia de renovación para un cliente en riesgo"
- "Prepara un brief de renovación para mi QBR con [Empresa]"
- "¿Cuál es mi estrategia de renovación para una cuenta Roja que se renueva en 60 días?"
- "Crea un plan de renovación y expansión para [Cuenta]"
