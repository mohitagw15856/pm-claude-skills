# Rejection patterns

A working catalogue of the ways submissions get rejected, grouped by cause. Each pattern says what a reviewer sees, how to check for it yourself, and the usual fix. Use it as the checklist behind the skill's findings table.

**Authority.** The stores publish and revise their own rules, and those pages are the only authority:

- Apple: App Store Review Guidelines, https://developer.apple.com/app-store/review/guidelines/
- Google: Play Developer Policy Center, https://play.google.com/about/developer-content-policy/

This file deliberately gives no guideline section numbers, because they are renumbered and reworded. Find the current section on the pages above and quote it from there. Last reviewed against those pages: not yet reviewed by a maintainer; treat every pattern as a prompt to check, not as a statement of the current rule.

## A. The reviewer cannot use the app

| # | Pattern | How to check | Usual fix |
|---|---------|--------------|-----------|
| A1 | No demo account for an app that needs sign-in | Is a working username and password in the review notes? | Add credentials that do not expire during review |
| A2 | Sign-in needs something the reviewer lacks: a real phone number, a company email domain, an invitation | Try to sign in from a fresh device with only the notes | Provide a bypass account or a demo mode |
| A3 | The feature needs hardware or a location the reviewer does not have | List what each reviewed feature needs | Supply a video and explain in the notes |
| A4 | The app crashes or shows a blank screen on launch | Install the release build on a clean device, offline and online | Fix, and test the exact build submitted |
| A5 | Backend not live, or pointing at a test server | Check the build's server addresses | Keep production up for the whole review |

## B. The listing does not match the app

| # | Pattern | How to check | Usual fix |
|---|---------|--------------|-----------|
| B1 | Screenshots show features or devices not in the build | Compare each screenshot with the build | Retake from the submitted build |
| B2 | Unsupported superlatives or rankings ("number one", "best") | Search the listing for claims | Remove, or be ready to substantiate |
| B3 | Another company's name or trademark in the title, keywords or icon | Read the metadata for other brands | Remove |
| B4 | Placeholder text, test data or "beta" wording | Read every screen and the listing | Clean up |
| B5 | The description mentions another platform or its store | Search the listing | Remove |
| B6 | Age rating answers do not match the content | Re-answer the questionnaire against the real content | Correct the rating |

## C. Payments

| # | Pattern | How to check | Usual fix |
|---|---------|--------------|-----------|
| C1 | Digital goods or subscriptions sold through an outside payment system where the store requires its own | List what is sold and how it is paid for | Use the store's purchase system, or confirm an exemption on the current policy page |
| C2 | Links, buttons or wording that steer users to pay elsewhere, where that is restricted | Search the app for external purchase links | Remove or follow the store's current rules for such links |
| C3 | Subscription terms unclear: price, period, renewal and how to cancel not shown before purchase | Read the purchase screen as a new user | State all four before the buy button |
| C4 | No way to restore purchases | Reinstall and look for it | Add a restore control |
| C5 | A free trial that converts with no clear notice | Read the trial screen | State when and how much will be charged |

## D. Privacy and data

| # | Pattern | How to check | Usual fix |
|---|---------|--------------|-----------|
| D1 | A permission is requested with no stated reason, or with a generic one | Read every permission prompt | Say what the access is used for, in the user's terms |
| D2 | Permissions requested at launch before any feature needs them | Note when each prompt appears | Ask at the moment of use |
| D3 | The app does not work at all if an optional permission is refused | Refuse each permission and continue | Degrade gracefully |
| D4 | Privacy answers in the listing do not match what the app and its third-party kits collect | List every kit and what it sends | Correct the declarations |
| D5 | No privacy policy link, or a link that does not load | Open it from the listing and inside the app | Publish and link it in both places |
| D6 | Accounts can be created in the app but not deleted from it | Look for account deletion in settings | Add an in-app deletion path |
| D7 | Tracking across apps or sites with no consent prompt where one is required | Check the kits used for advertising and analytics | Add the consent flow the platform requires |

## E. Content and safety

| # | Pattern | How to check | Usual fix |
|---|---------|--------------|-----------|
| E1 | User-generated content with no way to report it or block a user | Post, then try to report and block | Add both, and a moderation statement |
| E2 | Health or medical claims without evidence or the required disclaimers | Read the listing and app for claims | Remove, substantiate, or add the required wording |
| E3 | Financial, lending, gambling or similar regulated features without the licences the store asks for | Identify regulated features per country | Provide the documents or restrict the region |
| E4 | An app aimed at children that includes advertising, tracking or external links not allowed for that audience | Check the target age and every kit | Remove or use kits approved for children |

## F. Quality and design

| # | Pattern | How to check | Usual fix |
|---|---------|--------------|-----------|
| F1 | A website in a wrapper with nothing a browser does not offer | Ask what the app does that the site cannot | Add native value or reconsider submitting |
| F2 | Dead buttons, broken links, unfinished sections | Tap everything | Finish or remove |
| F3 | Near-duplicate of another app by the same developer | Compare with your other listings | Merge into one app |
| F4 | Sign-in required for features that do not need an account | Try the app without signing in | Allow use before sign-in where possible |
| F5 | Third-party sign-in offered without the platform's own sign-in option where that is required | List the sign-in methods | Check the current rule and add the option if it applies |

## How to use this file

1. For each pattern, record **found**, **not found in the material given**, or **could not check**.
2. For anything found, open the store's current policy page, find the matching section, and quote it in the finding.
3. Route every pattern in group E to a qualified reviewer. Do not clear those alone.
