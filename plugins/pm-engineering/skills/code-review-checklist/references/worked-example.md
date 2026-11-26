# Worked Example — Code Review Checklist Skill

## The brief

Freightline sells rate-quoting and tender management to ~900 mid-market freight brokers. PR #4821 against `rate-svc` (Go 1.23) does two things at once: it fixes a rounding-drift bug — multi-leg quotes were rounded per leg and then summed, drifting 1–3¢ from carrier invoices on ~7% of multi-leg quotes, surfaced by invoice dispute FD-2214 from a top-10 broker — and it reshards the quote cache from a single `sync.RWMutex`-guarded map to 64 shards with singleflight, after p99 quote latency hit 840ms at 3,000 quotes/s. The diff is 640 lines across 9 files, of which ~180 lines are a pricing-package restructure a principal engineer asked the author to fold in "while you're in there". The author has four years on this service. Stated risk: high — pricing is the money path, and the cache change touches concurrency.

## The output

---

# Code Review: PR #4821 — Fix multi-leg quote rounding drift; shard quote cache

### 1. PR Overview
**Scope assessment:** Large — recommend splitting. Two risk-bearing changes (money-path rounding, cache concurrency) plus a ~180-line pricing-package restructure travel together; each deserves its own reviewable unit. The restructure is worthwhile and has principal-engineering support — moving it to a follow-up PR protects the review quality of all three changes rather than questioning any of them.
**Recommended review depth:** Deep dive — line-by-line on the rounding change and the shard/singleflight mechanism; hand-trace at least one 3-leg quote through the new math. Blast radius, not diff size, sets this: a wrong price quoted to 900 brokers outranks the 640-line count.
**Estimated review time:** 60–75 min (640 lines at ~5 min per 50 lines), in two sittings — rounding math in one, concurrency in the other. Do not review the concurrency change tired.

### 2. Correctness Checks

**For Go:**
- [ ] Errors are handled or explicitly ignored with a comment — check every `cache.Get` and carrier-API call site touched by the singleflight change; a swallowed error inside `singleflight.Do` is returned to *every* collapsed caller
- [ ] Context propagation is correct — the singleflight leader's context must not be a follower's context; if the first caller cancels, collapsed callers must not all fail
- [ ] Goroutine lifetimes are bounded — the per-shard eviction loop introduced in `quotecache/shard.go` needs a shutdown path tied to service stop, or tests will leak it
- [ ] No sync primitives copied by value — the restructure moves `shardedCache` between packages; confirm it is passed by pointer everywhere (`go vet -copylocks` should be clean)
- [ ] Monetary math stays in `int64` micro-units end to end — flag any intermediate `float64` in the new `SumLegs` path; one float conversion reintroduces the drift class this PR exists to kill

### 3. Change-Type-Specific Checks

**For bug fixes:**
- [ ] A test exists that would have caught this bug — specifically, a regression test reproducing the FD-2214 case: 3 legs, USD, per-leg round-then-sum vs sum-then-round diverging by ≥1¢
- [ ] The fix addresses root cause, not symptom — the root cause is *where* rounding happens (once, at quote total, half-even), not the values in the dispute; confirm per-leg amounts now carry full micro-unit precision until the final step
- [ ] Related code paths checked for the same issue — accessorial charges and fuel surcharges also sum sub-amounts; verify they use the new single-rounding path or are ticketed

**For the bundled performance change (cache sharding):**
- [ ] Shard key includes every quote-identity dimension (lane + currency + service tier) — a key that omits currency serves EUR prices to USD requests on hash collision, silently
- [ ] Singleflight result is treated as shared — callers must copy before mutating the returned quote, or one caller's markup edits leak into another's response
- [ ] Cache invalidation walks all 64 shards — the old single-map flush path no longer clears everything

### 4. Risk-Appropriate Checks

High risk — all of the below apply:
- [ ] Basic correctness, style conventions, test coverage (baseline)
- [ ] Rollback plan stated in the PR description — both changes must be individually revertible; this is another argument for the split
- [ ] Monitoring updated — quote-vs-invoice drift counter and per-shard hit-rate gauge, so a bad shard key is visible before a broker reports it
- [ ] Security/data implications reviewed — none identified beyond wrong-price risk, state that explicitly rather than skipping it
- [ ] Feature flag / gradual rollout — cache sharding behind `quote_cache_sharded`, rounding fix dark-launched with a comparison log (compute both old and new totals, log deltas, serve old) for 48h before cutover

### 5. Testing Adequacy
- [ ] Unit tests cover the new rounding path, including half-even ties (…\.5 micro-unit boundaries) and single-leg quotes (must be byte-identical to old output)
- [ ] Golden-file test replays the last 30 days of production quotes through both paths; every delta must be explained by the known drift bug, nothing else
- [ ] `go test -race` runs on the `quotecache` package in CI for this PR — a race detector pass on an untouched package proves nothing
- [ ] Failure modes tested: carrier API timeout inside singleflight, shard eviction racing a read, cancelled leader context
- [ ] Load test at ≥3,000 quotes/s comparing p99 before/after — the sharding change exists to fix a latency number, so the PR should show that number

### 6. Review Decision Framework

**Approve if:** (1) the FD-2214 regression test and 30-day golden-file replay are green with all deltas accounted for; (2) `-race` CI passes on `quotecache` and the shard key demonstrably includes lane + currency + tier; (3) rollout is behind `quote_cache_sharded` with the 48h dark-launch comparison for the rounding change.
**Request changes if:** any intermediate `float64` survives in the money path; the singleflight key or shard key omits a quote-identity dimension; cache invalidation misses shards; or the rounding change ships without the golden-file replay.
**Comment (non-blocking) if:** the pricing-package restructure stays bundled — suggest extracting it to a follow-up PR (`consider:` prefix, not `blocking:`), noting it has principal-engineering backing and deserves a review that isn't competing with two high-risk changes for attention. Also non-blocking: naming consistency between `shardFor` and `shardOf` helpers.

### 7. Common Pitfalls for This Change Type
- **Go + money math:** half-even ("banker's") rounding is not what `math.Round` does — verify the implementation against a table of tie cases, don't trust the function name.
- **Go + singleflight:** the returned value is shared across all collapsed callers; the classic escape is a handler that appends a request-specific surcharge to the shared slice. Hand-trace one mutation path.
- **Go + sharded caches:** FNV-1a of a composite key built by string concatenation without a separator makes `("AB","C")` and `("A","BC")` collide — check the key-building function, not just the hash choice.

**Reviewer's honest out:** if you verify the concurrency mechanism but not the freight-domain math (fuel surcharge interaction, accessorial ordering), say so in the approval — "reviewed logic and concurrency; domain math needs eyes from Pricing" is a professional statement, and silent partial review is the dangerous kind.

---

## Why it's shaped this way

- **Every correctness check names a construct actually in this diff** — `singleflight.Do`, the per-shard eviction loop, `SumLegs` — because the skill's first Anti-Pattern forbids a generic checklist that ignores the stated language, and a Go checklist that never mentions goroutine lifetimes or copied locks is a template, not a review.
- **Only the Go block and the matching change-type blocks appear.** The Output Format says "include only the section matching" — the TypeScript and Python blocks are gone, and the change-type section covers exactly the two changes the PR contains (bug fix + the bundled concurrency change), nothing speculative.
- **Depth is set by blast radius, not diff size**, per `references/review-depth-calibration.md`: the money-path rounding gets line-by-line and a hand-traced 3-leg quote even though it's the smaller half of the diff, while the review-time estimate (60–75 min) still follows the 5-min-per-50-lines guide from the Output Format.
- **The bundled refactor is handled diplomatically as a non-blocking `consider:`, not a blocker** — it names the principal engineer's backing as a reason to review it *properly in its own PR*, not as a reason to wave it through. This is the comment-discipline rule (severity prefixes; distinguish blocking correctness from non-blocking preferences) applied to an organisationally awkward situation.
- **The decision framework's conditions are all checkable artifacts** — a named regression test, a `-race` CI run on a named package, a named feature flag — because the Quality Checks require "at least one named blocking condition and one named non-blocking comment condition", and "looks fine" is explicitly not a valid review outcome.
- **Common pitfalls are specific to Go + this change-type combination** (half-even vs `math.Round`, shared singleflight results, separator-less composite keys) — the Quality Checks ban generic advice like "watch out for bugs", and this section is where the skill says the most valuable knowledge lives.
- **The reviewer's honest out is written into the checklist** because a silent partial review of freight-domain math is exactly the failure the calibration reference warns about; declaring the boundary of what was verified is part of a high-risk review, not an admission of weakness.
