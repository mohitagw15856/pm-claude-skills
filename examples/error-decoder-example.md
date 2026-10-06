# Example: error-decoder

## What this skill does

Decodes an error message or stack trace into plain English: what it actually says, the most likely cause with the trace line that matters, a copy-pasteable fix, and a guardrail to stop it recurring.

## How to trigger it

### Example 1: the cryptic production error

**You say:**
> "Explain this error, it started after yesterday's deploy: `TypeError: Cannot read properties of undefined (reading 'map') at OrderList (OrderList.jsx:42)` but only for some users."

**Claude produces (excerpt):**

### 1. What it means
The code at `OrderList.jsx:42` calls `.map()` on something that is `undefined`. JavaScript is telling you: the array you expected is not there yet, or not there at all, for these users.

### 2. Most likely cause
"Only for some users" plus "after a deploy" points at a data-shape change, ranked:
1. **The API now returns `{ orders: [...] }` where it used to return `[...]`** (or omits `orders` entirely for users with none). Users with no orders get `undefined`, users with orders may still work if a cache serves the old shape.
2. A loading state: the component renders before the fetch resolves, so the first render sees `undefined`.
The frame that matters is `OrderList.jsx:42` itself; check what feeds the variable being mapped.

### 3. The fix
```jsx
// OrderList.jsx:42: guard the shape, don't assume it
const orders = data?.orders ?? [];
return orders.map(order => <OrderRow key={order.id} {...order} />);
```
Fallback if cause 2: render a loading state until the query resolves rather than defaulting to an empty list, so "no orders" and "still loading" stay distinguishable.

### 4. Why it happened / prevent it
The component trusted a shape nobody enforces. Add a type (or runtime schema check) at the API boundary; with TypeScript, `data.orders` being possibly undefined would have failed the build, not the user.

### Example 2: a backend trace with a misleading surface

**You say:**
> "Why is this throwing? `psycopg2.OperationalError: SSL SYSCALL error: EOF detected` randomly in our Python worker."

**Claude produces (excerpt):**

### 1. What it means
The database connection died mid-conversation; "EOF" is Postgres hanging up (or the network dropping) while the client was mid-query. It is a connection-lifetime problem, not an SSL problem, despite the name.

### 2. Most likely cause
"Randomly in a worker" is the signature of a connection opened at startup, idled past a timeout (database `idle_timeout`, or a load balancer's, often 350s on common cloud defaults), then reused.

### 3. The fix
Enable pre-ping/recycling so stale connections are tested before use:
```python
engine = create_engine(DB_URL, pool_pre_ping=True, pool_recycle=300)
```

### 4. Prevent it
Treat every pooled connection as mortal; pre-ping plus a recycle shorter than the shortest timeout in the path makes the class of error disappear.

## Tips for best results

- Paste the full trace, not the last line; the frame that matters is often three levels up.
- Say what changed (deploy, upgrade, config) and who is affected; "some users" halves the search space.
- Ask for the prevention line too; the fix stops the bleeding, the guardrail stops the recurrence.

## Related skills

- `incident-postmortem` when the error became an outage and needs a write-up
- `runbook-writer` to turn the diagnosis into a repeatable on-call procedure
