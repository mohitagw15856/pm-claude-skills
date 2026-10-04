---
name: cross-border-listing
description: "Write a product listing for an overseas marketplace or store, localised for the buyer rather than translated from Chinese: title, bullet points, description, search terms and the compliance claims that must or must not appear. Use when asked 帮我写亚马逊 listing, 跨境电商标题, write a product listing for Amazon, TikTok Shop, Shopee, Lazada, Etsy or Shopify, or localise my listing for the US, UK, Germany or Japan. Produces the listing in the target language within the platform's field limits, a keyword map, a compliance check of every claim, and a list of images the listing needs."
version: 1.0.0
---

# Cross-Border Listing

A listing translated word for word from Chinese reads as foreign and ranks badly. A listing that makes an unsupported claim ("FDA approved", "100% safe", "best") can be removed or worse. This skill writes the listing for the buyer in the target market, inside the platform's limits, and checks every claim.

Part of the pm-chuhai bundle. Name the marketplace; field limits differ by platform and change over time.

## What This Skill Produces

- **The listing** in the target language: title, bullets or key features, description, search terms
- **A keyword map**: the buyer's search terms and where each is used
- **A claim check**: every claim marked supported, needs evidence, or remove
- **An image list**: the photos and graphics the listing needs, in order

## Required Inputs

Ask for these if not provided:
- **The product**: specifications, materials, what is in the box, certifications held
- **The marketplace and country** (for example Amazon US, Amazon.de, TikTok Shop UK, Shopee Malaysia)
- **The buyer**: who they are and the problem the product solves for them
- **Competitor listings** the person admires, if any
- **The current Chinese listing**, if there is one

## Framework

1. **Buyer language first.** List the words a buyer in that market would search, not a translation of the Chinese title. Ask for keyword data if the person has a tool; otherwise mark keywords as estimates.
2. **Title**: brand, product type, the one or two features buyers filter on, size or quantity. Within the platform's character limit; check the current limit in the seller guidelines.
3. **Bullets or key features**: one benefit per bullet, benefit first, then the feature that delivers it. Five bullets on Amazon-style marketplaces.
4. **Description**: use cases, specifications, care, what is in the box.
5. **Search terms**: synonyms and other spellings not already used; no competitor brand names.
6. **Claims check**:
   - Certifications (CE, UKCA, FCC, and so on) only if held, with the certificate on file
   - No medical, safety or environmental claims without evidence
   - No superlatives the platform or local advertising law restricts ("best", "No. 1")
   - Units and sizes in the market's system (inches and pounds for the US)

## Output Format

### Listing: [product], [marketplace], [country]

**1. Listing**
- Title ([n] characters, limit [n])
- Bullets 1 to 5
- Description
- Search terms

**2. Keyword map** | Keyword | Estimated or measured | Used in |

**3. Claim check** | Claim | Status: supported / needs evidence / remove | Note |

**4. Images needed** | Order | Image | Purpose |

**5. 中文说明**（可选）: a short Chinese note on the choices made, for the seller's team

## Quality Checks
- [ ] Every field is within the stated platform limit, and the limit's source is named
- [ ] Every certification claimed is one the person said they hold
- [ ] No restricted superlative or unsupported health or safety claim remains
- [ ] Units match the target market
- [ ] The listing reads as written for the market, not translated

## Anti-Patterns
- **Machine translation of the Chinese listing.**
- **Keyword stuffing** in the title. It hurts conversion and can breach platform rules.
- **Claiming certifications not held.** Listings get removed and accounts suspended.
- **Competitor brand names** in search terms.

## Example Trigger Phrases
- "帮我写一个亚马逊美国站的 listing，产品是便携榨汁机。"
- "Localise my product listing for Amazon Germany."
- "Write a TikTok Shop UK listing for this phone stand."
- "检查一下我的 listing 有没有违规的词。"
