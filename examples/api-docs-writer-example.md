# Example: api-docs-writer

## What this skill does

Turns a raw endpoint spec or Postman collection into developer-facing API documentation: summary, parameters, request and response examples, and error codes, in a consistent reference format.

## How to trigger it

### Example 1: documenting one endpoint

**You say:**
> "Document our endpoint: POST /v1/invoices, creates an invoice, needs a Bearer token, body takes customer_id (string, required), amount_cents (integer, required), currency (default 'gbp'), due_date (ISO date, optional). Returns the invoice object. 402 if the account is suspended."

**Claude produces (excerpt):**

## `POST /v1/invoices`

**Summary:** Create a new invoice for a customer.

**Description:** Creates an invoice in draft state and returns the full invoice object. Amounts are in minor units (pence, cents). Invoices are not sent to the customer until finalised.

**Authentication:** Required, Bearer token.

### Request

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | string | Yes | ID of an existing customer, e.g. `cus_8f3k2` |
| `amount_cents` | integer | Yes | Amount in minor units, e.g. `12500` for £125.00 |
| `currency` | string | No | ISO 4217 code, defaults to `gbp` |
| `due_date` | string | No | ISO 8601 date, e.g. `2026-11-01` |

### Errors

| Status | Code | Meaning |
|---|---|---|
| 402 | `account_suspended` | The account cannot create invoices until reactivated |

### Example 2: a developer guide from a Postman export

**You say:**
> "Here's our Postman collection for the webhooks API [attached]. Turn it into reference docs; audience is external partners."

**Claude produces (excerpt):**

**Webhooks API, partner reference**

Covers 4 endpoints: register, list, test and delete a webhook subscription. All requests require `Authorization: Bearer <token>` and are rate limited to 120 requests/minute; exceeding it returns `429` with a `Retry-After` header.

## `POST /v1/webhooks`
**Summary:** Register a webhook endpoint for event delivery.
[continues endpoint by endpoint in the same format]

## Tips for best results

- Paste the raw spec, a cURL that works, or the Postman export; real shapes beat descriptions.
- Say who the audience is: internal docs can assume context that partner docs must spell out.
- State auth, rate limits and versioning once; the skill repeats them where developers look for them.

## Related skills

- `technical-spec-template` when the API does not exist yet and needs designing first
- `changelog-generator` for documenting what changed between API versions
