---
# machine-translated to es from skills/technical-debt-register/SKILL.md — review: pending. Native fixes welcome via PR.
name: technical-debt-register
description: "Documenta y prioriza un backlog de deuda técnica con impacto empresarial, estimaciones de esfuerzo y estrategia de resolución. Úsalo cuando se te pida auditar deuda técnica, crear un registro de deuda, priorizar deuda técnica para un trimestre, documentar atajos arquitectónicos o construir una hoja de ruta de reducción de deuda. Produce un registro de deuda técnica estructurado que cubre inventario de deuda por categoría, impacto empresarial por elemento, puntuaciones de esfuerzo y prioridad, planes de resolución de elementos principales y una hoja de ruta trimestral de reducción de deuda."
---

# Skill de Registro de Deuda Técnica

Produce un registro completo de deuda técnica para un equipo o servicio. Un registro de deuda no es una lista de quejas — es un inventario priorizado y consciente del impacto empresarial que permite a un equipo de ingeniería tomar decisiones deliberadas sobre qué deuda pagar, en qué orden y con qué retorno esperado.

Una buena gestión de deuda no es eliminar toda la deuda. Es asegurar que la deuda sea visible, asignada y resuelta cuando el costo de los intereses supera el costo de arreglarlo.

## Entradas Requeridas

Solicita estas si aún no se han proporcionado:
- **Nombre del equipo o servicio** — qué equipo y/o servicio cubre este registro
- **Elementos de deuda conocidos** — lista de deuda técnica conocida, o solicita a Claude que los extraiga preguntando sobre: código heredado, pruebas faltantes, dependencias desactualizadas, atajos arquitectónicos, procesos manuales, brechas de observabilidad, backlogs de seguridad
- **Stack técnico** — lenguaje, frameworks, infraestructura (ayuda a Claude a categorizar y calificar elementos correctamente)
- **Tamaño del equipo y velocidad** — número de ingenieros y aproximadamente story points o días por sprint (necesario para estimar esfuerzos)
- **Trimestre actual / período de planificación** — para que la hoja de ruta se enfoque en el marco de tiempo correcto

## Formato de Salida

---

# Registro de Deuda Técnica: [Nombre del Equipo / Servicio]

**Equipo:** [Nombre] | **Servicio(s):** [Nombre(s)]
**Autor:** [Nombre] | **Última actualización:** [Fecha]
**Período de planificación:** [Q[X] [Año]] | **Cadencia de revisión:** [Mensual / Trimestral]

---

## Descripción General

[2–3 oraciones describiendo la situación actual de deuda del equipo, las categorías principales de deuda y el contexto empresarial — ej. ¿están en una fase de crecimiento donde la velocidad es importante, o acercándose a una fecha límite de cumplimiento donde la deuda de seguridad es crítica?]

**Total de elementos en el registro:** [X]
**Elementos sin resolver:** [X]
**Elementos críticos/Alta prioridad:** [X]
**Esfuerzo total estimado de resolución:** [X story points / X semanas de ingeniero]

---

## Definiciones de Categoría de Deuda

| Categoría | Descripción | Ejemplos |
|---|---|---|
| **Calidad del código** | Código que funciona pero es difícil de cambiar de forma segura | Lógica duplicada, condicionales profundamente anidados, manejo de errores inconsistente, abstracción faltante |
| **Arquitectura** | Decisiones estructurales que limitan la escalabilidad o aumentan el acoplamiento | Monolito que debería descomponerse, llamadas síncronas que deberían ser asincrónicas, límites de dominio faltantes |
| **Pruebas** | Brechas en cobertura de pruebas que aumentan el riesgo de regresión | Pruebas unitarias faltantes, sin pruebas de integración, suite de pruebas inestable, sin gestión de datos de prueba |
| **Seguridad** | Vulnerabilidades conocidas o controles de seguridad faltantes | Dependencias desactualizadas con CVEs, limitación de tasas faltante, secretos codificados, autenticación insuficiente |
| **Dependencias** | Dependencias externas desactualizadas o riesgosas | Librerías de fin de vida, retraso de versión principal, paquetes abandonados |
| **Infraestructura** | Infraestructura que limita la confiabilidad o productividad del desarrollador | Pasos de implementación manual, sin IaC, zona única de disponibilidad, escalado automático faltante |
| **Observabilidad** | Brechas en visibilidad que ralentizan la respuesta ante incidentes | Métricas faltantes, sin trazado distribuido, estructura de registros pobre, sin alertas en SLIs clave |
| **Proceso** | Procesos operacionales manuales o propensos a errores | Migraciones de BD manuales, sin runbooks, conocimiento tribal no documentado |

---

## Registro de Deuda Técnica

### Método de Puntuación

**Impacto empresarial (1–5):**
- 5 — Bloqueando crecimiento, causando incidentes en producción o creando riesgo de cumplimiento
- 4 — Ralentizando significativamente la entrega o aumentando la probabilidad de incidentes
- 3 — Desaceleración notable; manejable pero acumulándose
- 2 — Fricción menor; bajo riesgo inmediato
- 1 — Cosmético o aspiracional; sin impacto empresarial actual

**Esfuerzo para resolver (1–5, menor = más fácil):**
- 1 — <0.5 día; ingeniero único
- 2 — 0.5–2 días; ingeniero único
- 3 — 3–5 días; ingeniero único o par pequeño
- 4 — 1–2 semanas; colaboración de equipo requerida
- 5 — >2 semanas; planificación y coordinación significativa

**Puntuación de prioridad = Impacto empresarial × (6 − Esfuerzo)** *(recompensa a elementos de alto impacto y bajo esfuerzo)*

---

| ID | Elemento | Categoría | Impacto empresarial (1–5) | Esfuerzo (1–5) | Puntuación de prioridad | Estado | Propietario |
|---|---|---|---|---|---|---|---|
| TD-001 | [ej. Sin pruebas de integración para flujo de pago] | Pruebas | 5 | 3 | 15 | Abierto | [Nombre] |
| TD-002 | [ej. Biblioteca de autenticación 3 versiones principales atrás] | Seguridad | 5 | 2 | 20 | Abierto | [Nombre] |
| TD-003 | [ej. Consultas de base de datos sin usar agrupación de conexiones] | Arquitectura | 4 | 2 | 16 | Abierto | [Nombre] |
| TD-004 | [ej. Proceso de implementación manual para [servicio]] | Infraestructura | 4 | 3 | 12 | En progreso | [Nombre] |
| TD-005 | [ej. Función Dios de 200 líneas en procesamiento de pedidos] | Calidad del código | 3 | 3 | 9 | Abierto | [Nombre] |
| TD-006 | [ej. Sin registros estructurados — solo texto plano] | Observabilidad | 3 | 2 | 12 | Abierto | [Nombre] |
| TD-007 | [ej. Versión de ORM tiene problema de consulta N+1 conocido] | Dependencias | 3 | 3 | 9 | Abierto | [Nombre] |
| TD-008 | [ej. Sin runbook para [operación crítica]] | Proceso | 3 | 1 | 15 | Abierto | [Nombre] |
| TD-009 | [ej. Cobertura de pruebas al 34% — sin red de seguridad significativa] | Pruebas | 4 | 4 | 8 | Abierto | [Nombre] |
| TD-010 | [ej. Valores de configuración codificados en el código de aplicación] | Calidad del código | 2 | 1 | 10 | Abierto | [Nombre] |
| TD-011 | [ej. Servicio implementado en zona única de disponibilidad sin conmutación] | Infraestructura | 5 | 4 | 10 | Abierto | [Nombre] |
| TD-012 | [ej. Sin alertas en latencia P95 para [endpoint]] | Observabilidad | 4 | 1 | 20 | Abierto | [Nombre] |

---

## Desglose por Categoría

```
Distribución de categorías (por número de elementos):
─────────────────────────────────────────────
Calidad del código     ████████░░  [X elementos]  ([X]%)
Arquitectura           ██████░░░░  [X elementos]  ([X]%)
Pruebas                █████████░  [X elementos]  ([X]%)
Seguridad              ████░░░░░░  [X elementos]  ([X]%)
Dependencias           ███░░░░░░░  [X elementos]  ([X]%)
Infraestructura        ████░░░░░░  [X elementos]  ([X]%)
Observabilidad         ████░░░░░░  [X elementos]  ([X]%)
Proceso                ██░░░░░░░░  [X elementos]  ([X]%)
─────────────────────────────────────────────

Distribución de prioridad:
Crítico (puntuación 20–25): [X elementos]
Alto    (puntuación 12–19): [X elementos]
Medio   (puntuación  6–11): [X elementos]
Bajo    (puntuación   1–5): [X elementos]
```

---

## Top 5 Elementos Prioritarios — Planes de Resolución

### TD-XXX: [Nombre del elemento de máxima prioridad]

**Puntuación de prioridad:** [Puntuación] | **Categoría:** [Categoría] | **Propietario:** [Nombre]

**Problema:**
[2–3 oraciones describiendo cuál es la deuda, cómo se manifiesta y qué dolor causa actualmente. Sé específico — haz referencia a incidentes reales, desaceleraciones o riesgos.]

**Impacto empresarial:**
[Qué sucede si esto no se resuelve? Haz referencia a incidentes, casi-fallos o bloqueadores de crecimiento. Ej. "Esto causó 2 incidentes en producción en el último trimestre y añade ~30 minutos de depuración a cualquier cambio en esta área."]

**Enfoque de resolución:**
[Descripción clara de la solución. No "mejorar el código" — describe el trabajo real: "Extrae la lógica de procesamiento de pagos en una clase `PaymentService` dedicada, escribe pruebas unitarias al 80% de cobertura y actualiza los 3 sitios de llamada."]

**Pasos:**
1. [Paso específico y asignable]
2. [Paso específico y asignable]
3. [Paso específico y asignable]

**Criterios de aceptación:**
- [ ] [Criterio medible — ej. "Cero valores de configuración codificados permanecen en el código de aplicación"]
- [ ] [Criterio medible — ej. "El pipeline de CI pasa con nuevas pruebas"]
- [ ] [Criterio medible]

**Estimación de esfuerzo:** [X story points / X días]
**Sprint sugerido:** [Q[X] Sprint [Y] / Cuando [dependencia] esté completa]

---

### TD-XXX: [Nombre del segundo elemento prioritario]

**Puntuación de prioridad:** [Puntuación] | **Categoría:** [Categoría] | **Propietario:** [Nombre]

**Problema:**
[Descripción]

**Impacto empresarial:**
[Descripción de impacto]

**Enfoque de resolución:**
[Descripción de enfoque]

**Pasos:**
1. [Paso]
2. [Paso]
3. [Paso]

**Criterios de aceptación:**
- [ ] [Criterio]
- [ ] [Criterio]

**Estimación de esfuerzo:** [X story points / X días]
**Sprint sugerido:** [Sprint o marco de tiempo]

---

### TD-XXX: [Tercer elemento prioritario]

*(Sigue el mismo formato que arriba)*

---

### TD-XXX: [Cuarto elemento prioritario]

*(Sigue el mismo formato que arriba)*

---

### TD-XXX: [Quinto elemento prioritario]

*(Sigue el mismo formato que arriba)*

---

## Hoja de Ruta de Reducción de Deuda

### Principios Orientadores

- Asigna [X%] de la capacidad de cada sprint a resolución de deuda — recomendado 15–20% para equipos saludables
- La deuda de seguridad y dependencias se aborda en cadencia fija independientemente de la puntuación de prioridad
- Sin nuevo trabajo de características en módulos con deuda Crítica a menos que la deuda esté programada para el sprint actual
- Los elementos de deuda cerrados sin resolución (aceptados/diferidos) deben tener un propietario designado y una fecha de revisión

### Plan trimestral

| Trimestre | Área de enfoque | Elementos objetivo | Capacidad estimada | Resultado esperado |
|---|---|---|---|---|
| **[Q1 Año]** (actual) | Seguridad + observabilidad | TD-002, TD-012, TD-006 | [X] points / [Y] días-ing | Biblioteca de autenticación actual; alertas de latencia en vivo; registros estructurados entregados |
| **[Q2 Año]** | Arquitectura + confiabilidad | TD-003, TD-011, TD-004 | [X] points / [Y] días-ing | Agrupación de conexiones corregida; multi-AZ implementado; automatización de implementación completa |
| **[Q3 Año]** | Cobertura de pruebas | TD-001, TD-009 | [X] points / [Y] días-ing | Pruebas de integración de flujo de pago en vivo; cobertura general ≥60% |
| **[Q4 Año]** | Calidad del código + proceso | TD-005, TD-008, TD-010 | [X] points / [Y] días-ing | Funciones Dios refactorizadas; runbooks completos; cero configuración codificada |

### Modelo de asignación de sprint

```
Capacidad de sprint: [X] story points

Asignación:
  ├── Trabajo de características:   [X * 0.75 = ~Y] points  (75%)
  ├── Resolución de deuda:          [X * 0.15 = ~Y] points  (15%)
  └── No planificado/bugs:          [X * 0.10 = ~Y] points  (10%)

Elementos de deuda que caben en un sprint ([≤Y] points cada uno):
  ✓ TD-002 ([X] points)
  ✓ TD-012 ([X] points)
  ✓ TD-006 ([X] points)
  ✓ TD-008 ([X] points)

Elementos de deuda de múltiples sprints (dividir en fases):
  ~ TD-001: Fase 1 ([X] pts) → Fase 2 ([X] pts)
  ~ TD-009: Requiere sprint dedicado de deuda o pareado
```

---

## Deuda Aceptada / Diferida

Elementos donde el costo de remediación actualmente supera el valor empresarial, aceptados con fechas de revisión explícitas.

| ID | Elemento | Razón del aplazamiento | Fecha de revisión | Propietario |
|---|---|---|---|---|
| TD-XXX | [Elemento] | [ej. "La reescritura requeriría 3 semanas sin valor visible al usuario a escala actual; revisar a 10× tráfico"] | [Fecha] | [Nombre] |
| TD-XXX | [Elemento] | [ej. "La dependencia tiene CVE pero no existe ruta de actualización hasta Q3; mitigado por regla WAF"] | [Fecha] | [Nombre] |

**Política:** Ningún elemento puede aplazarse más de dos veces sin escalación al gerente de ingeniería.

---

## Materiales más profundos

Esta habilidad incluye archivos de apoyo; úsalos cuando estén disponibles:

- **`references/debt-pricing.md`** — Poner precio a la deuda: convertir "está mal" en un número que alguien pueda clasificar. Aplícalo mientras produces el resultado; contiene la calibración y los criterios de juicio que el resumen del método de arriba comprime.
- **`templates/debt-entry.md`** — una versión para rellenar del entregable con las comprobaciones de calidad integradas. Ofrécela cuando el usuario prefiera trabajar el documento por su cuenta en lugar de que se genere.

## Rúbrica de puntuación (0–40)

Puntúa cualquier resultado de esta habilidad antes de entregarlo; 32 o más es calidad de entrega.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| Traducción a impacto de negocio | Elementos descritos solo en términos de ingeniería | Impacto indicado pero sin cuantificar | Cada elemento valorado en términos de negocio (riesgo, freno a la velocidad, coste) que alguien no ingeniero podría clasificar |
| Disciplina de puntuación | Prioridades asignadas por intuición | Se usa la fórmula, pero los elementos de seguridad y dependencias siguen infravalorados | Fórmula aplicada de forma consistente, con el sesgo de "parece técnico" corregido explícitamente |
| Calidad del plan de resolución | Los elementos principales tienen intenciones vagas | Hay planes, pero no se pueden convertir en tickets | Los planes de los 5 principales son pasos concretos y convertibles en tickets, con secuencia y definición de hecho |
| Realismo de la capacidad | El roadmap ignora el presupuesto del sprint | La asignación se indica, pero supera la capacidad real | La asignación trimestral cabe en la capacidad real, y los elementos aceptados o aplazados tienen responsables y fechas de revisión |

## Verificaciones de Calidad

- [ ] Cada elemento tiene un propietario designado — sin deuda sin propietario
- [ ] Las puntuaciones de prioridad se calculan usando la fórmula, no se asignan arbitrariamente
- [ ] Los elementos de seguridad y dependencias no se califican por debajo de su impacto empresarial real porque parecen "técnicos"
- [ ] Los planes de resolución de los 5 principales incluyen pasos específicos y asignables — no descripciones vagas como "mejorar cobertura de pruebas"
- [ ] La hoja de ruta trimestral asigna capacidad realista — la asignación de deuda no excede el presupuesto real del sprint
- [ ] Los elementos aceptados/diferidos tienen una fecha de revisión y un propietario designado — sin elementos permanentemente diferidos
- [ ] El registro distingue entre deuda (atajos deliberados o acumulados) y bugs (defectos involuntarios)
- [ ] Los elementos se cierran como resueltos solo cuando se cumplen los criterios de aceptación — no cuando se fusiona el PR

## Antipatrones

- [ ] No califiques elementos de deuda arbitrariamente — las puntuaciones de prioridad deben calcularse usando la fórmula documentada
- [ ] No confundas deuda técnica (atajos deliberados) con bugs (defectos involuntarios) — requieren estrategias de remediación diferentes
- [ ] No subestimes elementos de seguridad y dependencias porque parecen abstractos — califica en función del impacto empresarial real
- [ ] No crees elementos "permanentemente diferidos" — cada elemento aceptado debe tener una fecha de revisión y propietario designado
- [ ] No incluyas planes de resolución que sean descripciones vagas — cada plan debe tener pasos específicos y asignables

## Frases de activación de ejemplo

- "Audita la deuda técnica."
- "Crea un registro de deuda."
- "Prioriza la deuda técnica para un trimestre."
- "Documenta los atajos de arquitectura."
- "Construye un roadmap de reducción de deuda."

Ejecuta esta habilidad en tu navegador: https://mohitagw15856.github.io/pm-claude-skills/skill/technical-debt-register.html
