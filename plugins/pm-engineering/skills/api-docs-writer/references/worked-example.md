# Worked Example — API Docs Writer Skill

## The brief

Fareloom is a travel-booking platform whose Partner API lets ~340 travel agencies and corporate-booking tools create bookings from held fare quotes. The docs team has a Postman collection and a Slack thread from the booking-service lead; the target is the external partner portal (Markdown). Auth is Bearer tokens, base URL `https://api.fareloom.example.com`, version v2, rate limit 10 requests/s per token. The endpoint to document is `POST /v2/bookings`, which is asynchronous (bookings confirm in seconds via supplier systems) and carries two pieces of legacy behaviour partners keep tripping on: idempotent replays return `200` instead of `409`, and small fare re-prices book anyway with a warning unless the caller opts into strict mode — both kept because the largest partners' v1-era retry frameworks treat any non-2xx as fatal.

## The output

---

## `POST /v2/bookings`

**Summary:** Creates a booking from a previously held fare quote.

**Description:** Converts a held quote (from `POST /v2/quotes`) into a booking with the underlying supplier. This endpoint is **asynchronous**: it returns immediately with `status: "processing"`, and the booking confirms via webhook (`booking.confirmed`) or polling `GET /v2/bookings/{booking_id}` — typically within 8 seconds, up to 90 seconds for rail suppliers. Quotes expire 20 minutes after creation; booking an expired quote returns `422 QUOTE_EXPIRED`. Requests are rate-limited to 10 requests/second per token. Always send an `Idempotency-Key`: supplier timeouts leave booking state unknown, and retrying **with the same key** is the only safe retry.

**Authentication:** Required — Bearer token (partner API token, prefix `fl_live_` / `fl_test_`).

---

### Request

**Headers:**

| Header | Required | Description |
|---|---|---|
| `Authorization` | Yes | `Bearer <token>` |
| `Content-Type` | Yes | `application/json` |
| `Idempotency-Key` | Strongly recommended | UUID, unique per booking attempt. Replaying a key returns the original booking with `200 OK` — see Legacy behaviour below |
| `Fareloom-Strict-Pricing` | No | Set to `true` to receive `409 PRICE_CHANGED` instead of auto-booking on small re-prices. Recommended for all new integrations |

**Path Parameters:**

None.

**Query Parameters:**

None.

**Request Body:**

```json
{
  "quote_id": "qt_8f2c1a94",
  "passengers": [
    {
      "type": "adult",
      "given_name": "Amara",
      "surname": "Osei",
      "date_of_birth": "1988-11-04",
      "document": { "type": "passport", "number": "FAKE12345", "country": "GH", "expires": "2031-06-30" }
    }
  ],
  "contact": { "email": "amara.osei@agency.example.com", "phone": "+233201234567" },
  "payment": { "method": "deposit_account" },
  "partner_reference": "AGY-2026-118203"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `quote_id` | string | Yes | The held quote to book. Must be unexpired (20-minute TTL) and belong to the authenticated partner |
| `passengers` | array of objects | Yes | Must match the passenger count and types the quote was priced for, or the request fails with `400`. Max 9 |
| `passengers[].type` | string | Yes | Enum: `adult`, `child`, `infant`. Determines fare bucket and document validation rules |
| `passengers[].given_name` / `surname` | string | Yes | As printed on the travel document — supplier systems reject mismatches at check-in, not at booking |
| `passengers[].date_of_birth` | string | Yes | ISO 8601 date. Validated against `type` (e.g. `infant` must be under 2 at travel date) |
| `passengers[].document` | object | Required for international itineraries | Passport or national ID used at check-in. `country` and `document.country` are ISO 3166-1 alpha-2 |
| `contact.email` | string | Yes | Receives supplier confirmations and schedule-change notices — use the traveller's or agency's monitored address, not a noreply |
| `contact.phone` | string | Yes | E.164 format. Used by suppliers for disruption contact |
| `payment.method` | string | Yes | Enum: `deposit_account` (draws on your partner deposit balance), `card_token` (requires `payment.card_token` from the vault endpoint) |
| `payment.card_token` | string | Required when `method` is `card_token` | Single-use token from `POST /v2/vault/cards`. Raw card numbers are rejected with `400` |
| `partner_reference` | string | No | Your internal reference, ≤64 chars. Echoed in webhooks and reports — the field to use for reconciliation |

---

### Response

**Success Response: `201 Created`**

```json
{
  "booking_id": "bk_7d31e6c2",
  "status": "processing",
  "pnr": null,
  "quote_id": "qt_8f2c1a94",
  "fare": {
    "base_minor": 41200,
    "taxes_minor": 9640,
    "total_minor": 50840,
    "currency": "USD",
    "repriced": false
  },
  "warnings": [],
  "partner_reference": "AGY-2026-118203",
  "created_at": "2026-05-19T14:22:31Z"
}
```

| Field | Type | Description |
|---|---|---|
| `booking_id` | string | Unique identifier used to poll status, retrieve documents, or cancel this booking |
| `status` | string | Enum: `processing`, `confirmed`, `failed`. Always `processing` on creation; terminal state arrives via webhook or polling |
| `pnr` | string or null | Supplier record locator. `null` until `status` is `confirmed` |
| `fare.base_minor` / `taxes_minor` / `total_minor` | integer | Amounts in minor units (cents) — never floats. `total_minor` is what your deposit account or card is charged |
| `fare.currency` | ISO 4217 string | Settlement currency of the quote |
| `fare.repriced` | boolean | `true` when the supplier re-priced between quote and booking — see Legacy behaviour |
| `warnings` | array | Non-fatal notices. Currently the only code is `FARE_REPRICED` (with `old_total_minor` / `new_total_minor`). **Check this array** — a 2xx with warnings is still a state your reconciliation must handle |
| `partner_reference` | string | Echo of the value you sent |
| `created_at` | ISO 8601 string | Booking creation time, UTC |

**Legacy behaviour (please read — this is where integrations break):**

- **Idempotent replay returns `200 OK`, not `409`.** Re-sending an `Idempotency-Key` returns the *original* booking body with `200`. This v1-era semantic is retained because several high-volume partner retry frameworks treat any non-2xx as fatal. Treat `200`-on-replay as success and compare `booking_id` against your records; do not create a duplicate on your side.
- **Small re-prices book anyway.** If the supplier fare moved by ≤2% between quote and booking, the booking proceeds at the **new** price: `201`, `fare.repriced: true`, and a `FARE_REPRICED` warning carrying both totals. Moves >2% always fail with `409 PRICE_CHANGED`. New integrations should send `Fareloom-Strict-Pricing: true`, which turns *any* re-price into a `409` so your traveller confirms the new fare before you commit funds.

---

### Error Codes

| Status Code | Error Code | Description | How to Resolve |
|---|---|---|---|
| `400` | `INVALID_REQUEST` | Malformed body, passenger mismatch with the quote, or a raw card number in `payment` | Compare the body against the schema above; the `errors[]` array names each offending field |
| `401` | `UNAUTHORIZED` | Missing, expired, or revoked token | Check the `Authorization` header and token environment (`fl_test_` tokens cannot book live inventory) |
| `402` | `INSUFFICIENT_FUNDS` | `deposit_account` balance below `total_minor` | Top up the deposit account or switch to `card_token` |
| `404` | `QUOTE_NOT_FOUND` | `quote_id` does not exist or belongs to another partner | Verify the ID; quotes are partner-scoped |
| `409` | `PRICE_CHANGED` | Fare moved >2% (or any amount in strict mode) since the quote | Fetch a fresh quote, present the new total to the traveller, and book the new `quote_id` |
| `422` | `QUOTE_EXPIRED` | The 20-minute quote TTL has passed | Re-quote and book within the TTL; do not retry the same `quote_id` |
| `429` | `RATE_LIMITED` | More than 10 requests/s on this token | Back off and retry after the `Retry-After` header value; batch bookings should be queued, not parallel-fired |
| `500` | `INTERNAL_ERROR` | Unexpected error on Fareloom's side | Retry with exponential backoff **and the same `Idempotency-Key`** |
| `504` | `SUPPLIER_TIMEOUT` | The supplier did not respond; booking state is **unknown** | Do not blind-retry. Retry with the same `Idempotency-Key`, or poll `GET /v2/bookings?partner_reference=...` before creating anything new |

---

### Code Examples

**cURL:**
```bash
curl -X POST "https://api.fareloom.example.com/v2/bookings" \
  -H "Authorization: Bearer fl_test_zz9x4" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 5f0c9d2e-8a41-4b7a-9c33-d61e02a7f110" \
  -H "Fareloom-Strict-Pricing: true" \
  -d '{
    "quote_id": "qt_8f2c1a94",
    "passengers": [{"type": "adult", "given_name": "Amara", "surname": "Osei", "date_of_birth": "1988-11-04"}],
    "contact": {"email": "amara.osei@agency.example.com", "phone": "+233201234567"},
    "payment": {"method": "deposit_account"},
    "partner_reference": "AGY-2026-118203"
  }'
```

**Python:**
```python
import uuid
import requests

response = requests.post(
    "https://api.fareloom.example.com/v2/bookings",
    headers={
        "Authorization": "Bearer fl_test_zz9x4",
        "Idempotency-Key": str(uuid.uuid4()),
        "Fareloom-Strict-Pricing": "true",
    },
    json={
        "quote_id": "qt_8f2c1a94",
        "passengers": [{"type": "adult", "given_name": "Amara",
                        "surname": "Osei", "date_of_birth": "1988-11-04"}],
        "contact": {"email": "amara.osei@agency.example.com", "phone": "+233201234567"},
        "payment": {"method": "deposit_account"},
        "partner_reference": "AGY-2026-118203",
    },
)
booking = response.json()
if booking.get("warnings"):
    # FARE_REPRICED can arrive on a 2xx — reconcile the new total before ticketing
    print(booking["warnings"])
```

---

## Why it's shaped this way

- **The legacy quirks are documented candidly, not hidden** — the `200`-on-replay and book-anyway-under-2% behaviours get their own called-out block, with the *reason* they exist (large partners' v1-era retry frameworks) stated diplomatically and the modern escape hatch (`Fareloom-Strict-Pricing`) recommended for new integrations. Docs that pretend the API behaves ideally are the failure `references/example-first-docs.md` warns about: the half you didn't document is the half that pages someone at 2am.
- **Error codes go beyond the minimum five and tell the developer what to DO** — including the genuinely dangerous case (`504` with unknown state → retry only with the same `Idempotency-Key`), because the Anti-Patterns forbid documenting only the happy path, and the Quality Checks require resolution guidance per code, not just meanings.
- **Every field description says what the field *does*, not what it *is*** — `partner_reference` is "the field to use for reconciliation", `contact.email` "receives schedule-change notices — not a noreply" — because "the ID" is not documentation per the Anti-Patterns.
- **Enums are enumerated everywhere they exist** (`passengers[].type`, `payment.method`, `status`, the warning code), since undocumented enums cause integration bugs per the Quality Checks — and `pnr: null`-until-confirmed is stated so partners don't treat null as an error.
- **Code examples are copy-paste-runnable against the real base URL with obviously-fake placeholders** (`fl_test_zz9x4`, a literal UUID) — no `YOUR_ENDPOINT`, no undefined variables — and the Python example demonstrates the non-obvious behaviour (checking `warnings` on a 2xx), because developers integrate by pasting examples, and in 2026 agent readers execute them verbatim.
- **The async contract is in the Description, not buried**: `processing` first, webhook or poll, typical 8s / worst-case 90s — the "important behaviour to know" slot the Output Format reserves, so nobody builds a synchronous integration against an async endpoint.
- **Money is integers in minor units with the type stated**, and the docs say which number is charged — a small choice that prevents the classic float-parsing reconciliation bug, in the spirit of constraints-in-prose from the example-first reference.
