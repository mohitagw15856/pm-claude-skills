# Expert skills: list a paid skill

The library is free and stays free. **Expert skills** are for professionals whose method is worth paying for, so they can sell it themselves: a solicitor's lease review, an accountant's year-end checklist, a clinician's care-plan guide, a structural engineer's survey brief. Buyers find them on [experts.html](https://mohitagw15856.github.io/pm-claude-skills/experts.html), and each one has a free preview to run first.

This puts [RFC-0003](rfcs/0003-paid-community-packs.md) into practice. The listing rules are enforced by `scripts/check-registry.mjs` on every registry pull request.

## Who can list

Anyone with a professional qualification or long practice in the field the skill covers, **stated in one sentence and checkable on a public page**: a regulator's register, a firm's staff page, a professional body's directory, or a LinkedIn profile that matches. Listings without a checkable credential are not merged.

## What you provide

1. **Your skill in your own repository.** The full version can be private, for example delivered through Polar's "GitHub repository access" benefit.
2. **A free preview**: a real, useful public SKILL.md, a smaller version or a single chapter, not a teaser. It must pass SkillSpec (frontmatter, Required Inputs, an output structure) and the security scan. It's what the registry entry's `path` points at, pinned by `sha256`.
3. **A checkout** on Polar, Lemon Squeezy or GitHub Sponsors. These act as merchant of record: they take the payment, handle VAT and sales tax, and issue refunds. This project never sees card details or holds money.

## The registry entry

Add this to `skills` in [`community/registry.json`](../community/registry.json) by pull request:

```json
{
  "name": "your-github-handle/lease-review-pro",
  "description": "A solicitor-written lease review that flags the clauses tenants most often regret signing.",
  "repo": "https://github.com/your-github-handle/lease-skills",
  "path": "preview/SKILL.md",
  "ref": "v1.0.0",
  "sha256": "sha256:<shasum -a 256 preview/SKILL.md>",
  "pricing": { "model": "paid", "price": "19.00", "currency": "GBP", "checkout": "https://polar.sh/your-handle/lease-review-pro" },
  "expert": { "name": "Your Name", "credential": "Solicitor in England and Wales, 12 years in residential property", "profile": "https://www.sra.org.uk/consumers/register/..." }
}
```

Check it locally: `node scripts/check-registry.mjs --fetch`.

## Rules

- **The name** must not shadow a free library skill (CI enforces this), and the namespace must match your GitHub account.
- **The price** is yours to set. Revenue: today, the whole price goes to you, less the checkout's fees. RFC-0003 proposes a 15% project share through Polar's revenue split once the project's Polar organisation exists; if adopted, it applies only to new listings and is announced first.
- **Not advice.** A skill helps someone think and prepare; it doesn't create a client relationship. Say so in the skill, as free library skills do, and keep any regulated-advice limits your profession sets.
- **Delisting.** A failed security scan, a credential that can't be confirmed, or a preview that turns into an advert removes the listing until it's fixed.

## Questions

Open an issue titled "expert skill: <your field>" before you build, and we'll tell you whether it fits.
