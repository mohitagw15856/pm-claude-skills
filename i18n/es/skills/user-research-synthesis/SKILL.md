---
# machine-translated to es from skills/user-research-synthesis/SKILL.md — review: pending. Native fixes welcome via PR.
name: user-research-synthesis
description: "Analiza y sintetiza hallazgos de investigación de usuarios en insights estructurados y accionables. Úsalo cuando te proporcionen datos de investigación de usuarios, transcripciones de entrevistas, resultados de encuestas o feedback de usuarios que necesiten ser analizados y resumidos. Produce una síntesis temática con datos de prevalencia, citas de apoyo, análisis de puntos de dolor, priorización de solicitudes de funcionalidades y próximos pasos recomendados. Para transcripciones de entrevistas específicamente, usa `user-interview-synthesis` en su lugar."
---

# Habilidad de Síntesis de Investigación de Usuarios

Esta habilidad ayuda a analizar datos de investigación de usuarios y transformarlos en insights accionables siguiendo una metodología estructurada.

## Entradas Requeridas

Solicita al usuario estos elementos si no se proporcionan:
- **Datos de investigación** (transcripciones, notas, resultados de encuestas o puntos de resumen)
- **Método de investigación** (entrevistas, encuestas, pruebas de usabilidad, etc.)
- **Número de participantes** y sus perfiles (rol, contexto)
- **Preguntas de investigación** que el estudio buscaba responder

## Lee desde / Escribe en el Brain

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), úsalo antes de preguntar:

- **Lee primero:** abre `hypotheses/` (qué suposiciones esta investigación puede validar o invalidar) y `context.md` (quiénes son los usuarios).
- **Escribe después:** actualiza el estado de cada hipótesis que hayas tocado, añade insights duraderos a `knowledge/users.md`, y mantén las notas brutas en `source/`. Etiqueta las afirmaciones derivadas de entrevistas como `[interview]` — nunca las conviertas en `[data]`.

## Marco de Síntesis

### 1. Resumen de Recopilación de Datos
- **Tipo de Investigación**: Entrevistas, encuestas, pruebas de usabilidad, etc.
- **Perfil de Participantes**: Demografía, segmentos, tamaño de muestra
- **Preguntas de Investigación**: Qué buscábamos aprender
- **Metodología**: Cómo se recopilaron los datos

### 2. Identificación de Temas Clave

Organiza hallazgos en temas usando esta estructura:

**Nombre del Tema**
- **Descripción**: Qué representa este tema
- **Prevalencia**: Cuántos participantes lo mencionaron (p. ej., "8 de 12 participantes")
- **Citas de Apoyo**: 2-3 citas representativas
- **Implicación**: Qué significa esto para nuestro producto

Apunta a 4-8 temas mayores por esfuerzo de investigación.

### 3. Análisis de Puntos de Dolor

Para cada punto de dolor identificado:
- **Punto de Dolor**: Descripción clara
- **Severidad**: Alta/Media/Baja (basada en impacto y frecuencia)
- **Solución Actual**: Cómo los usuarios lo manejan hoy
- **Evidencia**: Ejemplos específicos de la investigación

### 4. Solicitudes de Funcionalidades

Categoriza solicitudes:
- **Imprescindible**: Necesidades críticas que bloquean el éxito del usuario
- **Alto Valor**: Mejoraría significativamente la experiencia
- **Agradable Tener**: Mejoras incrementales

Para cada solicitud:
- **Solicitud**: Qué pidieron los usuarios
- **Frecuencia**: Con qué frecuencia surgió
- **Cita del Usuario**: Ejemplo representativo
- **Necesidad Subyacente**: Por qué la quieren (profundiza más allá de la solicitud superficial)

### 5. Insights de Flujos de Trabajo del Usuario

Documenta flujos de trabajo reales observados:
- **Estado Actual**: Cómo los usuarios realizan tareas hoy
- **Puntos de Dolor**: Dónde luchan
- **Estado Ideal**: Qué desearían poder hacer
- **Oportunidades**: Dónde podemos añadir valor

### 6. Insights de Segmentación

Si la investigación revela segmentos de usuario distintos:
- **Nombre del Segmento**: Etiqueta descriptiva
- **Características**: Qué define este segmento
- **Necesidades Únicas**: Cómo sus necesidades difieren
- **Tamaño/Importancia**: Peso relativo para la priorización

### 7. Insights Competitivos

Si los usuarios mencionaron competidores o alternativas:
- **Competidor/Alternativa**: Qué usan
- **Por Qué lo Usan**: Qué hace bien
- **Brechas**: Qué no hace
- **Barreras de Cambio**: Por qué no cambian completamente

### 8. Recomendaciones

Recomendaciones priorizadas basadas en insights:

**Alta Prioridad**
- Recomendación con evidencia de apoyo
- Impacto esperado

**Prioridad Media**
- Recomendación con evidencia de apoyo
- Impacto esperado

**Baja Prioridad / Consideración Futura**
- Recomendación con evidencia de apoyo
- Impacto esperado

### 9. Preguntas Abiertas

Brechas de investigación identificadas:
- Qué aún necesitamos entender
- Investigación de seguimiento sugerida
- Incertidumbres que requieren validación

## Directrices de Análisis

**Al sintetizar entrevistas:**
- Busca patrones entre múltiples participantes
- Ten en cuenta tanto qué dicen los usuarios COMO qué hacen
- Presta atención a reacciones emocionales
- Identifica trabajos-a-realizar, no solo solicitudes de funcionalidades

**Al analizar citas:**
- Usa citas textuales entre "comillas"
- Atribuye citas: [ID del Participante, Rol, Contexto]
- Selecciona citas que ilustren patrones, no excepciones
- Incluye feedback tanto positivo como negativo

**Al identificar temas:**
- Usa nombres descriptivos, no etiquetas genéricas
- Proporciona evidencia para cada tema
- Cuantifica cuando sea posible ("7 de 10 usuarios...")
- Conecta temas con objetivos empresariales

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/theme-validity.md`** — ¿Cuándo es real un tema? Reglas de validez para la síntesis. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/synthesis-report.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Disciplina de la evidencia | Las afirmaciones flotan sueltas: sin recuentos de participantes, sin citas, o citas sin atribuir | La mayoría de los temas están cuantificados, pero algunas citas no tienen atribución o la prevalencia es vaga ("muchos usuarios") | Cada tema indica su prevalencia a partir de los datos ("8 de 12") y lleva 2 o 3 citas atribuidas que ilustran el patrón |
| Altitud de la síntesis | Una lista de comentarios individuales disfrazada de hallazgos | Temas reales entre participantes, pero uno o dos son anécdotas de un solo participante ascendidas a tema | De 4 a 8 patrones genuinos entre participantes; los atípicos etiquetados como atípicos; las brechas entre lo que dicen y lo que hacen detectadas, no solo opiniones declaradas |
| Conexión con decisiones | Observaciones sin implicaciones: una visita guiada por los datos | Hay implicaciones, pero genéricas ("mejorar el onboarding") sin prioridad ni impacto esperado | Cada tema nombra la decisión de producto a la que afecta; las recomendaciones están priorizadas con evidencia, impacto esperado y esfuerzo |
| Honestidad sobre conflictos y lagunas | Camino feliz saneado: contradicciones e incertidumbre invisibles | Los datos contradictorios se reconocen, pero no se exploran; las interpretaciones se confunden con las observaciones | Los hallazgos contradictorios se muestran con un camino de resolución; observación e interpretación explícitamente separadas; las preguntas abiertas tienen seguimientos con nombre |

## Verificaciones de Calidad

- [ ] Los temas identifican patrones entre múltiples participantes, no respuestas individuales
- [ ] Los insights se conectan con decisiones de producto específicas, no solo observaciones
- [ ] Cada afirmación incluye evidencia de apoyo (citas, conteos o ejemplos)
- [ ] Las observaciones e interpretaciones se separan claramente
- [ ] Los hallazgos se priorizan por impacto, no solo se enumeran

## Anti-Patrones

- [ ] No enumeres cada comentario individual — la síntesis debe identificar patrones entre participantes
- [ ] No hagas saltos interpretativos sin evidencia de apoyo de los datos
- [ ] No te enfoque en solicitudes de funcionalidades antes de entender el problema subyacente — siempre identifica primero el trabajo-a-realizar
- [ ] No ignores datos contradictorios — los hallazgos conflictivos deben señalarse y anotarse
- [ ] No presentes resultados sin cuantificar la prevalencia — indica cuántos participantes sostuvieron cada punto de vista

## Ejemplo de Tema

```
**Tema: Sobrecarga de Información Durante la Incorporación**

**Descripción**: Los usuarios expresaron consistentemente sentirse abrumados por la cantidad de información presentada durante la configuración inicial, lo que llevó a una incorporación incompleta y a retrasar el tiempo para valor.

**Prevalencia**: 9 de 12 participantes mencionaron este problema sin ser preguntados

**Citas de Apoyo**:
- "Solo quería empezar, pero sentía que necesitaba leer un manual primero" [P3, Gerente de Marketing]
- "Para la tercera pantalla de instrucciones, empecé a hacer clic en 'Siguiente' sin leer" [P7, Representante de Ventas]
- "Desearía que hubiera una opción de 'inicio rápido' para personas como yo que solo quieren probarlo" [P11, Diseñador de Producto]

**Implicación**: Nuestro flujo de incorporación actual prioriza la integridad sobre el engagement. Deberíamos considerar un enfoque de divulgación progresiva donde los usuarios puedan comenzar a usar el producto rápidamente y aprendan funciones avanzadas contextualmente.

**Acción Recomendada**:
- Diseña una ruta de "Inicio Rápido" que lleve a los usuarios al primer valor en <3 minutos
- Mueve la configuración avanzada a ayuda contextual dentro de la app
- Prueba con 5-10 nuevos usuarios antes del lanzamiento completo
- Impacto esperado: mejora de tasa de activación de +20-30%
```

## Estructura de Salida de Plantilla

Al sintetizar investigación, usa esta estructura:

```markdown
# Síntesis de Investigación de Usuarios: [Tema de Investigación]

## Resumen de Investigación
- **Fecha**: [Rango de fechas]
- **Metodología**: [Entrevista/Encuesta/Pruebas]
- **Participantes**: [Número] [Tipos de usuarios]
- **Preguntas de Investigación**: 
  1. [Pregunta 1]
  2. [Pregunta 2]
  3. [Pregunta 3]

## Resumen Ejecutivo
[Resumen en 2-3 oraciones de los hallazgos clave e implicaciones]

## Temas Clave

### Tema 1: [Nombre del Tema]
[Documentación completa del tema como se muestra en el ejemplo anterior]

### Tema 2: [Nombre del Tema]
[Documentación completa del tema]

[Continúa con 4-8 temas]

## Resumen de Puntos de Dolor

| Punto de Dolor | Severidad | Frecuencia | Solución Actual |
|---|---|---|---|
| [Dolor 1] | Alta | 10/12 usuarios | [Cómo lo manejan] |
| [Dolor 2] | Media | 7/12 usuarios | [Cómo lo manejan] |

## Solicitudes de Funcionalidades

### Imprescindible
1. **[Solicitud]** - Mencionada por [X] participantes
   - Cita: "[Cita representativa]"
   - Necesidad subyacente: [Por qué la quieren]

### Alto Valor
[Estructura similar]

### Agradable Tener
[Estructura similar]

## Recomendaciones

### Alta Prioridad (0-3 meses)
1. **[Recomendación]**
   - Evidencia de apoyo: [Datos de investigación]
   - Impacto esperado: [Qué mejorará]
   - Estimación de esfuerzo: [Dimensionamiento aproximado]

### Prioridad Media (3-6 meses)
[Estructura similar]

### Consideración Futura (6+ meses)
[Estructura similar]

## Preguntas Abiertas
1. [Pregunta que requiere más investigación]
2. [Incertidumbre a validar]
3. [Estudio de seguimiento necesario]

## Apéndice
- Guía de entrevista utilizada
- Datos completos de participantes
- Notas brutas/transcripciones (enlace)
```

## Frases de activación de ejemplo

- "Sintetiza estas transcripciones de entrevistas."
- "Analiza los resultados de nuestra encuesta."
- "Encuentra temas en este feedback de usuarios."
- "Resume esta investigación de usuarios."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/user-research-synthesis.html
