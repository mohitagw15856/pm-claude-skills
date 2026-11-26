---
# machine-translated to es from skills/rice-prioritisation/SKILL.md — review: pending. Native fixes welcome via PR.
name: rice-prioritisation
description: "Califica y clasifica iniciativas de producto usando el marco RICE. Úsalo cuando se te pida priorizar funcionalidades, clasificar un backlog mediante RICE, calificar iniciativas para la planificación trimestral, o aplicar un marco objetivo a una lista de ideas en competencia. Produce una tabla RICE clasificada con puntuaciones, indicadores de victorias rápidas y apuestas moonshot, notas de dependencias, y un orden de secuenciación recomendado."
---

# Habilidad de Priorización RICE

Aplica puntuación RICE consistente y basada en criterios a una lista de funcionalidades o iniciativas para producir una clasificación de priorización objetiva.

## Lee desde / Escribe en el Cerebro

Si existe un [`professional-brain`](../professional-brain/SKILL.md) (`brain/`), toma como base en lugar de volver a preguntar lo que ya sabes:

- **Lee primero:** `knowledge/strategy.md` (para que la clasificación sirva a la dirección), los elementos como `entities/`, e `hypotheses/` de impacto. Ejecuta `python3 ../professional-brain/scripts/brain_query.py ./brain "<tema de iniciativa>"` y lleva la etiqueta de procedencia de cada hecho — una estimación de impacto es normalmente una `[hunch]`, no `[data]`.
- **📥 Propón al Cerebro:** después de producir, propón registrar la decisión de clasificación en `decisions/` y las estimaciones de alcance/impacto como `hypotheses/` etiquetadas por fortaleza de evidencia. Muéstraselas, obtén un sí, luego escribe con `../professional-brain/scripts/brain_write.py … --commit` (solo append, dry-run por defecto).

## Entradas Requeridas

Pide al usuario estas si no se proporcionan:
- **Lista de iniciativas o funcionalidades a calificar** (nombres y breves descripciones)
- **Estimaciones de alcance** (usuarios afectados por trimestre — de análisis si está disponible)
- **Estimaciones de impacto** (usa la escala estándar abajo)
- **Estimaciones de esfuerzo** (person-meses — de ingeniería si está disponible)
- **Trimestre o período de planificación**

## Definiciones RICE (adapta a tu contexto)
- **Alcance (Reach):** Número de usuarios afectados por trimestre (usa datos reales de DAU/MAU donde esté disponible)
- **Impacto (Impact):** Efecto en tu métrica principal — usa escala: 3=masivo, 2=alto, 1=medio, 0.5=bajo, 0.25=mínimo
- **Confianza (Confidence):** ¿Cuán seguro estamos sobre las estimaciones de R e I? 100%=alta, 80%=media, 50%=baja
- **Esfuerzo (Effort):** Person-meses requeridos en todas las funciones

## Fórmula RICE
Puntuación RICE = (Alcance × Impacto × Confianza) / Esfuerzo

## Asistente Programático

Esta habilidad incluye un script de Python solo con stdlib que calcula y clasifica puntuaciones RICE para que las matemáticas sean consistentes y los indicadores de victoria rápida / moonshot se apliquen por regla, no por intuición. Aliméntalo con las iniciativas una vez que R, I, C y E estén reunidos.

```bash
# Desde un archivo JSON (confianza acepta 0.8 u 80)
python3 scripts/rice_calculator.py initiatives.json

# O desde un CSV con encabezado: name,reach,impact,confidence,effort
python3 scripts/rice_calculator.py initiatives.csv --format csv

# O por tubería
echo '[{"name":"Onboarding","reach":5000,"impact":2,"confidence":0.8,"effort":3}]' \
  | python3 scripts/rice_calculator.py -
```

Produce una tabla clasificada con puntuaciones RICE calculadas e indicadores automáticos de **victoria rápida** (puntuación fuerte, esfuerzo bajo relativo), **moonshot** (impacto alto, esfuerzo alto), y elementos de **baja confianza** (≤50%). Usa la clasificación calculada como punto de partida, luego aplica el paso de validación abajo — nunca aceptes una clasificación superior sorprendente sin verificar las estimaciones detrás de ella.

## Materiales Más Profundos

- **`references/estimate-calibration.md`** — cómo anclar cada una de las cuatro estimaciones (fuentes de alcance, escala de impacto con ejemplos de reserva, confianza basada en evidencia, esfuerzo multifuncional) y las verificaciones cruzadas a ejecutar en la clasificación finalizada. Aplícalo cuando cuestiones los datos del usuario.
- **`templates/scoring-worksheet.md`** — una hoja de trabajo rellenable cuyas columnas de evidencia fuerzan que cada puntuación nombre su fuente. Ofrécela cuando un equipo quiera puntuar junto en lugar de que la clasificación se genere.

## Dónde encaja — puntuar en la columna vertebral

Tercero en la columna vertebral de decisiones de producto: **`/assumption-mapper` → `/prd-template` →
`rice-prioritisation` → `/roadmap-narrative`**. Recibe **la métrica de éxito** del PRD de
cada iniciativa: el *Impact* de RICE es el movimiento estimado sobre *ese* número con línea base,
no una conjetura nueva, y entrega a `/roadmap-narrative` **las iniciativas clasificadas con sus
puntuaciones** para agruparlas en temas. Los cuatro términos de RICE se definen una sola vez en
[`docs/craft/product-decisions.md`](../../docs/craft/product-decisions.md); allí la *Confidence*
es la válvula de honestidad, y esta habilidad vive o muere según la use.

## Proceso
1. Para cada iniciativa proporcionada, reúne o estima valores R, I, C, E
2. Señala dónde las estimaciones son débiles y anota qué datos las mejorarían
3. Calcula la puntuación RICE para cada una
4. Clasifica de mayor a menor
5. Señala cualesquiera "victorias rápidas" (puntuación RICE alta, esfuerzo bajo) y "moonshots" (impacto alto, esfuerzo alto)
6. Anota dependencias entre elementos que afecten el secuenciamiento
7. **Valida** — Verificación cruzada: si el elemento clasificado más alto sorprende al equipo, investiga si una estimación está inflada. RICE es una herramienta, no un veredicto.

## Estructura de Salida

### Priorización RICE: [Backlog/Trimestre]
| Iniciativa | Alcance | Impacto | Confianza | Esfuerzo | Puntuación RICE | Notas |
|------------|---------|---------|-----------|----------|-----------------|-------|
| [nombre] | [n] | [puntuación] | [%] | [meses] | [puntuación] | [indicadores] |

#### Secuencia Recomendada
[Top 5 iniciativas con lógica]

#### Victorias Rápidas (puntuación alta, esfuerzo bajo)
[Elementos a recoger junto a apuestas más grandes]

#### Brechas de Datos a Abordar
[Qué información mejoraría más la precisión de la puntuación]

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Credibilidad de las estimaciones | Conjeturas con números redondos al 100 % de confianza; el esfuerzo lo estima el PM a solas | Alcance basado en analítica, pero confianza uniforme en todos los elementos sin importar la evidencia | Cada estimación nombra su fuente; lo que no tiene datos queda al 50 % de confianza; el esfuerzo viene de ingeniería, y el documento lo dice |
| Discriminación del impacto | Todo puntuado entre 2 y 3: la escala no produce señal | Algo de dispersión en la escala, pero sin anclas definidas, así que las puntuaciones no son comparables | Se usa toda la escala con un ancla declarada por nivel; "masivo" se reserva para elementos realmente raros |
| Interrogación de la clasificación | La salida ordenada en bruto se acepta como veredicto | Se señalan victorias rápidas y apuestas lejanas, pero los puestos sorprendentes y las dependencias no se examinan | Los primeros puestos sorprendentes se investigan y la estimación inflada se encuentra o se defiende; las dependencias se anotan donde cambian la secuencia |
| Secuenciación accionable | Una tabla puntuada sin recomendación | Tabla más una lista de los 5 primeros, pero sin razones ni seguimiento de las lagunas de datos | Secuencia recomendada con razón por elemento, victorias rápidas encajadas junto a apuestas mayores, y lagunas de datos con nombre que afinarían la siguiente pasada |

## Verificaciones de Calidad

- [ ] Cada iniciativa tiene los cuatro componentes RICE estimados (aunque sea aproximadamente)
- [ ] La confianza es 50% para cualquier cosa sin respaldo de datos (no 100% como predeterminado)
- [ ] Las victorias rápidas y moonshots se señalan explícitamente
- [ ] Las dependencias que afecten el secuenciamiento se anotan
- [ ] Cualquier clasificación sorprendente se investiga antes de aceptarla

## Patrones Adversos

- [ ] No predetermines el 100% de confianza en estimaciones sin datos de apoyo — esto infla puntuaciones y engaña la planificación
- [ ] No trates las puntuaciones RICE como una decisión final — una clasificación que sorprenda al equipo debe investigarse antes de aceptarla
- [ ] No omitas estimaciones de esfuerzo de ingeniería — las estimaciones de esfuerzo solo de PM frecuentemente son optimistas y sesgan resultados
- [ ] No olvides anotar dependencias que cambiarían el secuenciamiento incluso si las puntuaciones RICE sugieren lo contrario
- [ ] No puntúes cada iniciativa al mismo nivel de impacto — si todo es "impacto alto," el marco no produce señal útil

## Frases de activación de ejemplo

- "Prioriza funcionalidades."
- "Clasifica un backlog con RICE."
- "Puntúa iniciativas para la planificación trimestral."
- "Aplica un marco objetivo a una lista de ideas en competencia."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/rice-prioritisation.html
