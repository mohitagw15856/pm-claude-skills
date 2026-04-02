---
name: api-docs-writer
description: "Write clear, developer-facing API documentation. Use when asked to document an API endpoint, write API reference docs, create a developer guide, or turn a raw spec/Postman collection into documentation. Produces endpoint documentation with descriptions, parameters, request/response examples, and error codes."
---

# API Docs Writer Skill

This skill transforms raw API specs, endpoint descriptions, or Postman collections into clean, developer-facing documentation following OpenAPI-adjacent conventions. Output is ready for a developer portal, README, or Notion/Confluence page.

## Required Inputs

Ask the user for these if not provided:
- **API or endpoint details** (raw spec, Postman export, or verbal description)
- **Auth method** (API key / Bearer token / OAuth 2.0 / None)
- **Base URL**
- **Audience** (internal developers / external partners / public)
- **Output format** (Markdown / OpenAPI YAML / Plain prose)

## Output Structure

For each endpoint, produce the following:

---

## `[METHOD] /path/to/endpoint`

**Summary:** [One line — what this endpoint does]

**Description:** [2–4 sentences. When to use this endpoint. What it returns. Any important behaviour to know (pagination, rate limits, async processing, etc.)]

**Authentication:** [Required / Optional — method]

---

### Request

**Headers:**

| Header | Required | Description |
|---|---|---|
| `Authorization` | Yes | `Bearer <token>` |
| `Content-Type` | Yes | `application/json` |

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique identifier for the resource |

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `limit` | integer | No | 20 | Max results per page (1–100) |
| `cursor` | string | No | — | Pagination cursor from previous response |

**Request Body:**

```json
{
  "field_name": "value",
  "another_field": 42
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `field_name` | string | Yes | [Plain description of what this field does] |
| `another_field` | integer | No | [Description. Include valid range or enum values if applicable] |

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

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the created/retrieved resource |
| `status` | string | Current status. Enum: `active`, `inactive`, `pending` |
| `created_at` | ISO 8601 string | Timestamp of creation in UTC |

---

### Error Codes

| Status Code | Error Code | Description | How to Resolve |
|---|---|---|---|
| `400` | `INVALID_REQUEST` | Request body is malformed or missing required fields | Check request body against schema above |
| `401` | `UNAUTHORIZED` | Missing or invalid authentication token | Verify your API key or refresh your token |
| `404` | `NOT_FOUND` | The requested resource does not exist | Check the ID in the path parameter |
| `429` | `RATE_LIMITED` | Too many requests | Back off and retry after `Retry-After` header value |
| `500` | `INTERNAL_ERROR` | Unexpected server error | Retry with exponential backoff; contact support if persists |

---

### Code Examples

Produce examples in at least 2 languages relevant to the audience (default: cURL + Python):

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

## Quality Checks

- [ ] Every parameter is documented (type, required/optional, description)
- [ ] Response fields are fully documented with types
- [ ] All relevant error codes are listed with resolution guidance
- [ ] Code examples are copy-paste runnable (no pseudocode)
- [ ] Auth method is clearly stated at the top
- [ ] Enum values are listed where applicable
- [ ] Pagination documented if the endpoint is a list endpoint

## Example Trigger Phrases

- "Document this API endpoint: [paste spec or description]"
- "Turn this Postman collection into developer docs"
- "Write API reference docs for [endpoint]"
- "Write a developer guide for our [product] API"
