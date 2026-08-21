# Architectural Specification Section

Wide tender prices are almost always a specification problem: three contractors read the same section and priced three different buildings. The cure is not more words. It is being precise about performance, unambiguous about who does what at the interfaces, and explicit about what must be submitted and tested — so the cheap tender and the expensive one are pricing the same thing.

## What This Skill Produces

- **Scope and interfaces** — what this section covers, what it does not, and who is responsible at each junction
- **Performance requirements** — measurable criteria with the standard and test method named
- **Product or system definition** — either a named product with an equivalence rule, or a performance description a contractor can propose against
- **Execution requirements** — preparation, sequence, workmanship, and stated tolerances
- **Submittals and samples** — what must be approved before order, and before installation
- **Testing and inspection** — what is tested, when, to what standard, and who witnesses

## Required Inputs

Ask for these if not provided:
- **The element** — what is being specified, and where it occurs in the building
- **The performance it must achieve** — structural, thermal, acoustic, fire, weather, durability, or appearance
- **The selection basis** — whether a specific product is intended, or a performance outcome is being sought
- **The interfaces** — what this element meets, and which other trades are involved
- **The procurement context** — the contract form, the specification system in use, and whether equivalents are permitted

## Framework: Performance, Product, Execution, Proof

1. **Define scope by exclusion as well as inclusion.** Most interface defects live in the gap between two sections that each assumed the other covered the junction.
2. **State performance as a measurable with a test method.** 'Weathertight' is not specifiable; a pressure test to a named standard is.
3. **Choose your specification mode deliberately.** Prescriptive names a product and gets what you drew. Performance describes an outcome and transfers design risk. Mixing them accidentally is how you get an unpriceable section.
4. **If naming a product, state the equivalence rule.** What 'or equal approved' means, who approves, what evidence is required, and by when.
5. **Give tolerances.** Unspecified tolerance becomes whatever was achieved, and the argument happens on site with the work already built.
6. **Specify the proof.** Submittals before order, samples before installation, tests during. An unproved requirement is an aspiration.
7. **Coordinate with the drawings explicitly.** Where the two could conflict, say which governs.

## Output Format

### Specification: [section] · [project] · [revision]

**1. GENERAL**
1.1 Scope — this section covers: [list] · **Not covered by this section:** [list, with the section that does]
1.2 Interfaces — [element] meets [element] at [location]; responsibility: [which section/trade]
1.3 Related sections — [refs]
1.4 Precedence — where this specification and the drawings conflict, [which governs]

**2. PERFORMANCE**
| Requirement | Criterion | Standard | Test method |
|---|---|---|---|
| [e.g. thermal] | [U-value] | [standard ref] | [method] |

**3. PRODUCTS**
- Mode: ☐ Prescriptive ☐ Performance ☐ Prescriptive with equivalents
- Specified: [product, manufacturer, reference] or [performance description]
- **Equivalence:** proposals accepted until [date]; must demonstrate [criteria]; approved by [who]; evidence required [what]

**4. EXECUTION**
4.1 Preparation — [substrate condition, tolerances required before starting]
4.2 Installation — [sequence, method, restrictions, weather limits]
4.3 Workmanship — [standard of finish, jointing, fixing]
4.4 **Tolerances** — [dimension: permitted deviation], each stated

**5. SUBMITTALS & TESTING**
| Item | Type | Before | Approved by |
|---|---|---|---|
| [shop drawings / sample / certificate / test result] | | [order / installation / handover] | |

> A drafting framework only. Standards, test methods, statutory requirements and product certification must be taken from current published sources and verified as applicable to your jurisdiction and contract. Fire, structural and life-safety specification requires the relevant qualified designer.

## Quality Checks
- [ ] Scope states what is excluded and which section covers it
- [ ] Every performance requirement has a criterion, a standard, and a test method
- [ ] The specification mode is deliberate and consistent within the section
- [ ] The equivalence rule states the evidence, the approver, and the deadline
- [ ] Tolerances are given for every dimension that matters
- [ ] Submittals distinguish what is needed before order from before installation
- [ ] Precedence between specification and drawings is stated

## Anti-Patterns
- **'Or equal approved' with no rule.** Guarantees a dispute at tender and again at submittal.
- **Unmeasurable performance.** 'Robust', 'high quality', 'to a good standard' — none of these can be priced or enforced.
- **Silence on tolerance.** The tolerance becomes whatever was built.
- **Mixing prescriptive and performance by accident.** Contractors price the risk, and price it high.
- **No interface allocation.** The junction is everyone's responsibility, so it is nobody's.
- **Copying a section from another project.** Carries the last building's assumptions into this one.
- **Specifying without submittals.** No proof required means no compliance achieved.

## Example Trigger Phrases
- "Write a specification section for the external cladding"
- "Our tender prices came back wildly different — is it the spec?"
- "How do I write a performance specification for windows?"
- "What should 'or equal approved' actually say?"
- "Write the execution and tolerance clauses for this finish"
