#!/usr/bin/env node
// Demo data generator template: realistic, internally consistent, and never real.
// Seeded, so the same seed always produces the same files. No dependencies.
//
//   node generate-demo-data.mjs --seed 42 --users 25 --out seed/
//
// Adapt the ENTITIES section to your schema. Keep these guarantees:
//   - every foreign key points at a record that exists
//   - every date respects the entity's lifecycle (created before updated, signup before orders)
//   - derived values are computed, not invented (order total = sum of its lines)
//   - personal data is fictional by construction: example.com emails (reserved by RFC 2606),
//     phone numbers from ranges reserved for fiction, names from a fixed fictional list
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i === -1 ? d : process.argv[i + 1]; };
const SEED = Number(arg('seed', 42));
const N_USERS = Number(arg('users', 25));
const OUT = arg('out', 'seed');

// Mulberry32: small, fast, deterministic.
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const rand = rng(SEED);
const int = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const pick = (xs) => xs[Math.floor(rand() * xs.length)];
const id = (prefix, n) => `${prefix}_${String(n).padStart(4, '0')}`;

const FIRST = ['Avery', 'Bram', 'Cleo', 'Dara', 'Eli', 'Farah', 'Gus', 'Hana', 'Ivo', 'Juno', 'Kit', 'Lior', 'Mina', 'Noor', 'Otto', 'Pia', 'Quin', 'Rosa', 'Sami', 'Tova'];
const LAST = ['Ashdown', 'Brightwell', 'Calloway', 'Dunmore', 'Everly', 'Fairbank', 'Greystone', 'Hollins', 'Ivers', 'Juniper'];
const PRODUCTS = [['Notebook', 450], ['Desk lamp', 3200], ['Mug', 900], ['Tote bag', 1200], ['Pen set', 650]];
const START = Date.UTC(2026, 0, 1);
const DAY = 86400000;
const iso = (ms) => new Date(ms).toISOString();

// ── ENTITIES ────────────────────────────────────────────────────────────────
const users = [];
for (let i = 1; i <= N_USERS; i++) {
  const first = pick(FIRST); const last = pick(LAST);
  const createdAt = START + int(0, 200) * DAY + int(0, DAY - 1);
  users.push({
    id: id('usr', i),
    name: `${first} ${last}`,
    email: `${first}.${last}.${i}@example.com`.toLowerCase(),
    phone: `+44 7700 900${String(int(0, 999)).padStart(3, '0')}`, // Ofcom range reserved for drama
    plan: pick(['free', 'free', 'free', 'pro', 'team']),
    createdAt: iso(createdAt),
  });
}

const orders = []; const lines = []; let lineNo = 0;
for (const u of users) {
  const signup = Date.parse(u.createdAt);
  const count = u.plan === 'free' ? int(0, 2) : int(1, 5);
  for (let k = 0; k < count; k++) {
    const placedAt = signup + int(1, 120) * DAY;
    const orderId = id('ord', orders.length + 1);
    let total = 0;
    const lineCount = int(1, 3);
    for (let l = 0; l < lineCount; l++) {
      const [name, price] = pick(PRODUCTS); const qty = int(1, 3);
      lines.push({ id: id('lin', ++lineNo), orderId, product: name, unitPricePence: price, qty });
      total += price * qty;
    }
    orders.push({ id: orderId, userId: u.id, placedAt: iso(placedAt), status: pick(['paid', 'paid', 'shipped', 'refunded']), totalPence: total });
  }
}

// ── CONSISTENCY CHECKS (fail loudly rather than ship broken demo data) ─────────
const userIds = new Set(users.map((u) => u.id));
for (const o of orders) {
  if (!userIds.has(o.userId)) throw new Error(`order ${o.id} points at missing user`);
  const u = users.find((x) => x.id === o.userId);
  if (Date.parse(o.placedAt) <= Date.parse(u.createdAt)) throw new Error(`order ${o.id} placed before signup`);
  const sum = lines.filter((l) => l.orderId === o.id).reduce((a, l) => a + l.unitPricePence * l.qty, 0);
  if (sum !== o.totalPence) throw new Error(`order ${o.id} total does not match its lines`);
}
for (const u of users) if (!u.email.endsWith('@example.com')) throw new Error(`user ${u.id} has a non-reserved email`);

mkdirSync(OUT, { recursive: true });
for (const [name, rows] of Object.entries({ users, orders, order_lines: lines })) {
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(rows, null, 2) + '\n');
}
console.log(`seed ${SEED}: ${users.length} users, ${orders.length} orders, ${lines.length} order lines -> ${OUT}/ (all checks passed)`);
