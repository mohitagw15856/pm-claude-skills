# Licence compatibility: a working reference

Not legal advice. A starting map for the audit; check each component's own licence text, and take red findings to a lawyer.

## Code licences

| Licence (SPDX) | Family | Main obligations when you distribute | Typical trigger |
|---|---|---|---|
| MIT, ISC, BSD-2-Clause, BSD-3-Clause | Permissive | Keep the copyright and licence text | Any distribution of source or binaries |
| Apache-2.0 | Permissive with patent grant | Keep the licence; carry over the component's NOTICE file; state significant changes | Any distribution |
| MPL-2.0 | File-level copyleft | Modified MPL files stay MPL and their source is offered; your other files can use any licence | Distributing modified MPL files |
| LGPL-2.1, LGPL-3.0 | Library copyleft | Changes to the library stay LGPL; users must be able to replace the library (dynamic linking is the usual route) | Distributing a program that includes the library |
| GPL-2.0, GPL-3.0 | Strong copyleft | The combined work, when distributed, is offered under the GPL with source | Distributing binaries or source of the combined work |
| AGPL-3.0 | Network copyleft | As GPL-3.0, and users interacting over a network must be offered the source | Running a modified version as a hosted service |
| No licence | All rights reserved | You have no permission beyond what the law allows | Any use beyond viewing |

Known one-way combinations and conflicts:
- Apache-2.0 code can be combined into a GPL-3.0 work; Apache-2.0 and **GPL-2.0-only** are widely treated as incompatible.
- "GPL-2.0-or-later" can be used under GPL-3.0, which resolves the Apache-2.0 conflict.
- Permissive code can go into almost anything, as long as its notices are kept.
- A hosted service does not "distribute" GPL code, but it does trigger the AGPL.

## Non-code licences

| Licence | What it allows | Watch for |
|---|---|---|
| CC0-1.0 | Anything; no attribution required | Confirm the person applying it owned the work |
| CC-BY-4.0 | Any use with attribution | Attribution in the product or its notices |
| CC-BY-SA-4.0 | Any use with attribution; adaptations under the same licence | Share-alike on adapted assets. Stack Overflow contributions since 2018 are CC-BY-SA-4.0 |
| CC-BY-NC-*, CC-BY-ND-* | Non-commercial only, or no adaptations | Red for commercial products or modified assets |
| OFL-1.1 (SIL Open Font Licence) | Bundling and embedding fonts | The font cannot be sold on its own; reserved font names cannot be used for modified versions |
| Stock image licences | Varies by provider and plan | Seat limits, no redistribution of the raw file, no use in templates or merchandise |

## Unclear-ownership flags

- Screenshots or logos of other companies' products (trademark and copyright)
- Datasets scraped from websites without a stated licence
- Model weights with use restrictions (for example acceptable-use or "open RAIL" licences)
- Code written by contractors without an assignment of rights
- AI-generated code or images: record the tool and its terms of service in the inventory
