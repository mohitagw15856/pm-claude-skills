---
# machine-translated to es from skills/pr-description-writer/SKILL.md — review: pending. Native fixes welcome via PR.
name: pr-description-writer
description: "Redacta una descripción de pull request clara y estructurada a partir de un diff de git, resumen de rama o lista de commits. Úsalo cuando te pidan escribir una descripción de PR, redactar una solicitud de cambios o documentar cambios de código. Produce una descripción con resumen, motivación, cambios realizados, pasos de prueba y orientación para revisores."
---

# Habilidad de Redacción de Descripciones de PR

Redacta descripciones de pull request estructuradas y amigables para revisores a partir de un diff, lista de commits o notas informales. Cubre el qué, por qué y cómo revisar para que los revisores puedan empezar inmediatamente.

## Inputs Requeridos

Solicita estos si no se proporcionan:
- **Qué cambió** (pega un git diff, `git log --oneline`, o describe los cambios en texto plano)
- **Por qué cambió** (el problema que se resuelve o la funcionalidad que se añade)
- **Cómo probarlo** (cualquier paso específico que un revisor necesite para verificar que funciona)
- **Nivel de riesgo** (bajo / medio / alto — afecta cuánta orientación para revisores incluir)
- **Tipo de PR** (feature / bug fix / refactor / dependency upgrade / config change / hotfix)
- **Rama destino** (p. ej. main / develop / release/2.4 — afecta el encuadre de riesgo y la orientación para revisores)
- **Issue o ticket vinculado** (p. ej. JIRA-1234, GitHub #567 — o "ninguno")

## Formato de Salida

### Título
Un título claro en modo imperativo de menos de 72 caracteres:
`[type]: [descripción concisa de qué cambió]`

Ejemplos:
- `feat: añadir rate limiting a la API pública`
- `fix: resolver race condition en expiración de sesión`
- `refactor: extraer lógica de pagos a PaymentService`

### Resumen
2–3 oraciones que cubran:
- Qué hace este PR (el cambio)
- Por qué era necesario (el problema u objetivo)
- El enfoque adoptado (a alto nivel)

### Cambios Realizados
Lista con viñetas de cambios específicos — una viñeta por cambio lógico, no por archivo:
- Añadido [X] para manejar [Y]
- Refactorizado [A] para reducir [B]
- Eliminado [C] ya que fue reemplazado por [D]
- Actualizado [E] para corregir [F]

### Capturas de Pantalla / Demo
[Si hay cambio de UI: incluye capturas antes/después o una grabación de pantalla]
[Si hay cambio de API: incluye ejemplo de request/response]
[Si no hay cambio visual y sin cambio de contrato de API: omite completamente esta sección — no dejes un marcador vacío]

### Cómo Probar
Instrucciones paso a paso que un revisor pueda seguir:
1. [Paso de configuración si es necesario]
2. [Acción a realizar]
3. [Qué verificar]
4. [Caso extremo a comprobar]

Incluye comandos específicos, datos de prueba o flags de entorno necesarios.

### Lista de Verificación de Pruebas
- [ ] Pruebas unitarias añadidas/actualizadas
- [ ] Pruebas de integración añadidas/actualizadas
- [ ] Casos extremos cubiertos
- [ ] Pruebas manuales completadas
- [ ] Sin regresiones en pruebas existentes

### Notas para Revisores
Señala cualquier cosa que merezca atención adicional:
- Áreas de incertidumbre donde una segunda opinión es bienvenida
- Trade-offs deliberados realizados (y por qué)
- Elementos fuera de alcance notados pero no abordados
- Dependencias en otros PRs (vinculalos)

### Relacionado
- Closes #[número de issue] (si aplica)
- Related to #[número de PR/issue]

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/reviewer-empathy.md`** — Descripciones de PR como navegación para la revisión. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/pr-template.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **El porqué sobre el qué** | La descripción solo repite el diff; no se da la motivación | El qué está claro, pero el porqué es flojo o genérico ("mejora el código") | Problema, objetivo y enfoque son explícitos; la descripción añade el contexto que el diff no puede transmitir |
| **Título y estructura** | Un solo párrafo sin estructura; título vago, sin prefijo de tipo o de más de 72 caracteres | Estructurado con encabezados, pero el título o el uso de secciones falla (secciones de relleno sin completar) | Prefijo de tipo válido, modo imperativo, menos de 72 caracteres; las secciones permiten al revisor ir directo a lo que necesita |
| **Reproducibilidad de las pruebas** | Sin pasos de prueba | Hay pasos, pero asumen familiaridad con el código o saltan casos límite | Alguien ajeno al código puede reproducir la verificación: comandos, datos de prueba, flags y al menos un caso límite |
| **Guía al revisor calibrada por riesgo** | PR de alto riesgo sin notas para el revisor, o notas puramente de plantilla | Hay notas, pero no nombran ninguna disyuntiva, incertidumbre o elemento fuera de alcance concreto | La guía se ajusta al riesgo: en alto riesgo señala preocupaciones específicas y disyuntivas deliberadas; en bajo riesgo se limita a una línea o se omite |

## Verificaciones de Calidad
- [ ] El título está en modo imperativo y tiene menos de 72 caracteres
- [ ] El resumen explica qué Y por qué (no solo qué)
- [ ] La lista de cambios describe cambios lógicos (no cambios archivo por archivo)
- [ ] El título comienza con un prefijo de tipo válido (feat / fix / refactor / chore / deps / config / hotfix) y tiene menos de 72 caracteres
- [ ] Los pasos de prueba son reproducibles por alguien no familiarizado con el código
- [ ] Para PRs de alto riesgo, Notas para Revisores señala al menos un área específica de preocupación o trade-off deliberado; para PRs de bajo riesgo, Notas para Revisores se omite o se reduce a una línea

## Anti-Patrones

- [ ] No escribas una descripción que solo restate qué cambió — explica por qué se hizo el cambio
- [ ] No omitas los pasos de prueba — los revisores necesitan saber cómo verificar que el cambio funciona
- [ ] No omitas las notas para revisores en PRs de alto riesgo — señala trade-offs deliberados y áreas que necesitan revisión cuidadosa
- [ ] No describas detalles de implementación obvios en el diff — añade contexto que el diff no puede proporcionar
- [ ] No produzcas un solo párrafo — estructura con encabezados para que los revisores puedan navegar a lo que necesitan

## Ejemplos de Uso
- "Escribe una descripción de PR para estos cambios" + [pega diff o descripción]
- "Redacta una solicitud de cambios para [feature]"
- "Necesito una descripción de PR — aquí está lo que cambié"
- "Resume estos commits en una descripción de PR"
- "Escribe el cuerpo del PR para esta rama"
