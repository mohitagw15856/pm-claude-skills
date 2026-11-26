---
# machine-translated to es from skills/user-interview-synthesis/SKILL.md — review: pending. Native fixes welcome via PR.
name: user-interview-synthesis
description: "Sintetiza transcripciones de entrevistas con usuarios en hallazgos de investigación estructurados. Utiliza cuando se te pida analizar notas de entrevistas, sintetizar investigación cualitativa, identificar temas en entrevistas o convertir datos brutos de entrevistas en insights accionables para el producto. Produce una síntesis temática con citas de apoyo por tema, implicaciones 'y qué significa esto', y pasos recomendados. Para fuentes mixtas más allá de entrevistas (encuestas, tickets, feedback) utiliza user-research-synthesis en su lugar."
---

# Habilidad de Síntesis de Entrevistas con Usuarios

Transforma transcripciones de entrevistas brutes en un documento de síntesis estructurado que destaque temas, puntos de dolor e insights accionables.

## Inputs Requeridos

Solicita al usuario estos datos si no están disponibles:
- **Transcripciones o notas de entrevistas** (incluso notas aproximadas sirven)
- **Número de participantes y sus perfiles** (rol, tamaño de empresa, contexto)
- **Preguntas de investigación** (¿qué pretendía responder el estudio?)
- **Rango de fechas** de la investigación (para contexto)

## Proceso
1. Lee todas las transcripciones proporcionadas en su totalidad antes de extraer conclusiones
2. Identifica temas recurrentes (mínimo 3 menciones para calificar como tema)
3. Categoriza hallazgos en: Puntos de Dolor, Insights de Flujo de Trabajo, Solicitudes de Features, Momentos de Satisfacción
4. Selecciona 2-3 citas textuales por tema que mejor representen el patrón
5. Redacta implicaciones "y qué significa esto" para cada tema — ¿qué significa esto para el producto?
6. **Valida** — Confirma que cada tema tiene citas de al menos 3 participantes. Marca como baja confianza cualquier insight basado en menos participantes.

## Estructura del Output

### Síntesis de Investigación: [Nombre del Estudio]
**Participantes:** [n]
**Rango de Fechas:** [fechas]
**Preguntas de Investigación:** [lista]

#### Tema 1: [Nombre del Tema]
- Resumen (2-3 oraciones)
- Citas de apoyo (de al menos 3 participantes)
- Implicación para el producto

[Repite para cada tema]

#### Señales de Baja Confianza (1-2 participantes solamente)
[Hallazgos que vale la pena monitorear pero aún no actuar — nota qué investigación adicional confirmaría o negaría]

#### Pasos Recomendados
[Recomendaciones específicas y accionables basadas en hallazgos]

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/coding-transcripts.md`** — Codificar transcripciones de entrevistas sin perder la señal. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/per-session-capture.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Trazabilidad de la evidencia | Temas afirmados sin citas ni atribución a participantes | La mayoría de los temas llevan citas, pero algunos se apoyan en 1 o 2 participantes o en paráfrasis sin atribuir | Cada tema lleva citas textuales de 3 o más participantes distintos, con recuentos de frecuencia ("6 de 9") coherentes con la lista |
| Accionabilidad de las implicaciones | Las implicaciones repiten la observación ("los usuarios encuentran X frustrante") | Las implicaciones apuntan una dirección, pero no nombran decisión, responsable ni cambio | Cada implicación habilita una decisión de producto concreta sobre la que alguien podría actuar este trimestre |
| Honestidad con las contradicciones | Todos los hallazgos apoyan convenientemente la hipótesis del patrocinador; los datos incómodos no aparecen | La evidencia contradictoria está, pero enterrada o suavizada; las citas ambivalentes recortadas a la mitad conveniente | Los hallazgos que contradicen la hipótesis se muestran de forma destacada, y las citas ambiguas se mantienen enteras con la tensión señalada |
| Separación de señal y cobertura de preguntas | Anécdotas de una sola fuente mezcladas con los temas principales; preguntas de investigación ignoradas | Las señales de baja confianza están separadas, pero sin camino de seguimiento, o una pregunta de investigación queda sin tratar | Cada señal de 1 o 2 participantes va en su propia sección con la prueba barata que la confirmaría, y cada pregunta de investigación recibe una respuesta explícita, incluida "no concluyente" |

## Controles de Calidad

- [ ] Cada tema está respaldado por citas de al menos 3 participantes
- [ ] Las implicaciones conectan con decisiones específicas de producto, no solo observaciones
- [ ] Verificación de sesgos del investigador: sin lenguaje tendencioso, hallazgos no todos favorecen una hipótesis
- [ ] Las señales de fuente única están marcadas por separado, no mezcladas en temas principales
- [ ] Cada pregunta de investigación del brief del estudio está respondida (incluso si la respuesta es "inconclusivo")

## Anti-Patrones

- [ ] No mezcles señales de fuente única en temas principales — insights citados por solo un participante deben estar marcados por separado
- [ ] No escribas implicaciones que sean solo observaciones reformuladas en lugar de decisiones de producto habilitadas
- [ ] No incluyas temas que solo apoyen la hipótesis del proyecto — hallazgos contradictorios deben ser expuestos, no omitidos
- [ ] No presentes hallazgos sin citas — cada tema requiere evidencia textual de al menos 3 participantes
- [ ] No dejes preguntas de investigación sin responder — cada pregunta del brief del estudio debe ser explícitamente respondida, incluso si la respuesta es inconclusiva

## Frases de activación de ejemplo

- "Analiza las notas de las entrevistas."
- "Sintetiza la investigación cualitativa."
- "Convierte los datos en bruto de las entrevistas en conclusiones de producto accionables."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/user-interview-synthesis.html
