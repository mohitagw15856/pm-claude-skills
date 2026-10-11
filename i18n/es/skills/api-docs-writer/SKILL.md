---
# machine-translated to es from skills/api-docs-writer/SKILL.md — review: pending. Native fixes welcome via PR.
name: api-docs-writer
description: "Escribe documentación clara y orientada a desarrolladores. Úsalo cuando se te pida documentar un endpoint de API, escribir docs de referencia de API, crear una guía de desarrollador, o convertir una especificación cruda o colección Postman en documentación. Produce documentación de endpoint con descripciones, parámetros, ejemplos de request/response y códigos de error."
---

# API Docs Writer Skill

Esta skill transforma especificaciones de API crudas, descripciones de endpoint o colecciones Postman en documentación limpia y orientada a desarrolladores, siguiendo convenciones adyacentes a OpenAPI. El resultado está listo para un portal de desarrolladores, README o página en Notion/Confluence.

## Inputs Requeridos

Trabaja con lo que se proporciona. Si falta alguno de estos, aun así produce el output completo: llena cada brecha con una suposición razonable marcada como *(assumed, confirm)* y lista esas suposiciones al final. Haz una pregunta solo cuando el tema central en sí falte (no hay nada sobre qué escribir).
- **Detalles de API o endpoint** (especificación cruda, export de Postman o descripción verbal)
- **Método de autenticación** (API key / Bearer token / OAuth 2.0 / Ninguno)
- **URL base**
- **Versión de API** (p. ej. v1, v2.3, o "sin versionar" — afecta notas de deprecación y headers de versionado)
- **Rate limits** (requests por segundo/minuto por token o IP, si se conoce — o "desconocido")
- **Audiencia** (desarrolladores internos / partners externos / público)
- **Formato de output** (Markdown para portales de desarrolladores y READMEs / Prosa plana para Confluence o Notion — nota: OpenAPI YAML no es producido por esta skill)

## Formato de Output

Para cada endpoint, produce lo siguiente:

---

## `[METHOD] /path/to/endpoint`

**Summary:** [Una línea — qué hace este endpoint]

**Description:** [2–4 oraciones. Cuándo usar este endpoint. Qué devuelve. Cualquier comportamiento importante a conocer (paginación, rate limits, procesamiento asincrónico, etc.)]

**Authentication:** [Requerida / Opcional — método]

---

### Request

**Headers:**

| Header | Requerido | Descripción |
|---|---|---|
| `Authorization` | Sí | `Bearer <token>` |
| `Content-Type` | Sí | `application/json` |

**Path Parameters:**

| Parámetro | Tipo | Requerido | Descripción |
|---|---|---|---|
| `id` | string | Sí | Identificador único para el recurso |

**Query Parameters:**

| Parámetro | Tipo | Requerido | Default | Descripción |
|---|---|---|---|---|
| `limit` | integer | No | 20 | Máximo de resultados por página (1–100) |
| `cursor` | string | No | — | Cursor de paginación de response anterior |

**Request Body:**

```json
{
  "field_name": "value",
  "another_field": 42
}
```

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `field_name` | string | Sí | [Descripción clara de qué hace este campo] |
| `another_field` | integer | No | [Descripción. Incluye rango válido o valores enum si aplica] |

---

### Response

**Success Response: `200 OK`**

```json
{
  "id": "abc123",
  "status": "active",
  "created_at": "2025-04-01T10:00:00Z"
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador único para el recurso creado/recuperado |
| `status` | string | Estado actual. Enum: `active`, `inactive`, `pending` |
| `created_at` | ISO 8601 string | Timestamp de creación en UTC |

---

### Error Codes

| Status Code | Error Code | Descripción | Cómo Resolver |
|---|---|---|---|
| `400` | `INVALID_REQUEST` | El request body está mal formado o faltan campos requeridos | Verifica el request body contra el schema arriba |
| `401` | `UNAUTHORIZED` | Token de autenticación faltante o inválido | Verifica tu API key o refresca tu token |
| `404` | `NOT_FOUND` | El recurso solicitado no existe | Verifica el ID en el parámetro de path |
| `429` | `RATE_LIMITED` | Demasiadas requests | Espera y reintentas después del valor del header `Retry-After` |
| `500` | `INTERNAL_ERROR` | Error inesperado del servidor | Reintentas con exponential backoff; contacta soporte si persiste |

---

### Code Examples

Produce ejemplos en al menos 2 lenguajes relevantes para la audiencia (default: cURL + Python):

**cURL:**
```bash
curl -X POST https://api.example.com/v1/endpoint \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"field_name": "value"}'
```

**Python:**
```python
import requests

response = requests.post(
    "https://api.example.com/v1/endpoint",
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    json={"field_name": "value"}
)
data = response.json()
```

---

## Materiales Más Profundos

Esta skill incluye archivos de soporte — úsalos cuando estén disponibles:

- **`references/example-first-docs.md`** — Example-First API Docs: las Reglas Que Hacen la Documentación Usable. Aplícalas mientras produces el output; contiene la calibración y decisiones de juicio que el resumen de método arriba comprime.
- **`templates/endpoint-entry.md`** — una versión para rellenar del entregable con los quality gates inline. Ofrécela cuando el usuario quiera trabajar el documento por sí mismo en lugar de tenerlo generado.

## Scoring Rubric (0–40)

Puntúa cualquier output de esta skill antes de entregarlo; 32+ es de calidad para producción.

| Dimensión | 0 | 5 | 10 |
|---|---|---|---|
| **Completitud de parámetros** | Campos listados sin tipos o flags requerido/opcional | Tablas completas, pero descripciones dicen qué es un campo, no qué hace; faltan enums y rangos | Cada campo tipado y restringido (enums, rangos, formatos), descrito por comportamiento y consecuencia |
| **Cobertura de error-path** | Solo happy path — sin tabla de errores | Rows estándar 400/401/404/429/500 presentes pero sin guía de resolución | Conjunto estándar completo más códigos específicos del endpoint, cada uno con qué *debe* hacer el desarrollador, incluyendo casos no-seguros para retry |
| **Runnability de ejemplos** | Pseudo-código, variables indefinidas, o placeholders "YOUR_ENDPOINT" | Los ejemplos existen pero no son copy-paste-runnable o usan solo un lenguaje | ≥2 lenguajes, URL base real, credenciales placeholder obviamente falsas, runnable tal como está pegado |
| **Candor conductual** | Comportamiento asincrónico, paginación, idempotencia, y quirks heredados omitidos | Quirks mencionados en prosa pero ausentes de ejemplos y rows de error | Gotchas documentadas con los exact requests/responses que producen, incluyendo comportamiento heredado incómodo |

## Quality Checks

- [ ] Cada parámetro está documentado (tipo, requerido/opcional, descripción)
- [ ] Los campos de response están totalmente documentados con tipos
- [ ] Todos los códigos de error relevantes están listados con guía de resolución
- [ ] Los códigos de error cubren como mínimo: 400 (bad request), 401/403 (auth), 404 (not found), 429 (rate limited), 500 (server error) — o explícitamente anota cuáles no aplican a este endpoint
- [ ] Los ejemplos de código usan la URL base actual y un token placeholder realista — no hay ejemplos que referencien variables indefinidas o "YOUR_ENDPOINT" fuera del snippet
- [ ] El método de auth está claramente declarado al inicio
- [ ] Los valores enum están listados donde aplica
- [ ] La paginación está documentada si el endpoint es un endpoint de lista

## Anti-Patterns

- [ ] No documentes solo el happy path — cada endpoint debe tener códigos de error para al menos 400, 401/403, 404, 429, y 500
- [ ] No uses valores placeholder como "YOUR_ENDPOINT" o "INSERT_TOKEN" en ejemplos de código — usa placeholders realistas anclados a la URL base actual
- [ ] No omitas valores enum para campos con un conjunto fijo de valores aceptados — enums no documentados causan bugs de integración
- [ ] No omitas documentación de paginación en endpoints de lista — desarrolladores que se la pierdan construirán integraciones que silenciosamente pierdan datos
- [ ] No describas qué "es" un campo sin describir qué "hace" — "el ID" no es documentación; "el identificador único usado para recuperar o actualizar este recurso" es

## Usage Examples
- "Documenta este endpoint de API: [pega spec o descripción]"
- "Convierte esta colección Postman en docs para desarrolladores"
- "Escribe docs de referencia de API para [endpoint]"
- "Escribe una guía de desarrollador para nuestra API [product]"

## Example Trigger Phrases

- "Documenta un endpoint de API."
- "Escribe docs de referencia de API."
- "Crea una guía de desarrollador."
- "Convierte una especificación cruda/colección Postman en documentación."
