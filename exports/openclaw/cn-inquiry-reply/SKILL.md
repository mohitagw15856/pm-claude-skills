---
name: cn-inquiry-reply
description: "Use when asked 回复询盘, 外贸询盘怎么回, 帮我回客户邮件, 阿里国际站询盘回复, 客户只问价格怎么回, 跟进没回复的客户, or reply to a foreign-trade inquiry from a Chinese exporter. Produces a reply email in English (or the buyer's language) with a Chinese version for the sales team, a read of the inquiry's quality and the buyer's likely type, the questions to qualify the buyer, a price or quotation approach without underselling, and a follow-up sequence for no reply, with export-control and sanctions checks flagged."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-inquiry-reply.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Inquiry Reply (外贸询盘回复)

Export sales teams on 阿里巴巴国际站, Made-in-China, trade shows and their own websites receive inquiries that range from a serious buyer with a specification to a one-line "price?" from a competitor. The usual replies are either a long company introduction nobody reads or a price with no questions asked. This skill reads the inquiry, judges its quality, and writes a reply that answers what was asked, qualifies the buyer and moves to a quotation, in English for the buyer and Chinese for the team.

Write the reply in English unless the buyer wrote in another language, with a Chinese version (中文对照) and the analysis in Simplified Chinese. For the formal quotation sheet, use `cn-trade-quotation`. Export controls, sanctions and destination restrictions are checked by the company's compliance process; this skill flags them but does not clear them.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The inquiry**: the full text, the platform or channel, the buyer's name, company, country and email domain
- **Product**: model, specifications, certifications (CE, FCC, RoHS and so on), MOQ, lead time, capacity
- **Pricing position**: an indicative price range and Incoterm, or "do not quote yet"
- **Company facts**: factory or trading company, years, key markets, sample policy
- **History**: first contact or a follow-up; previous replies

## Output Structure

### 1. 询盘分析
| 维度 | 判断 | 依据 |
Inquiry quality (specific or generic), likely buyer type (importer, distributor, retailer, end user, sourcing agent, possibly a competitor fishing for prices), urgency, red flags (free email with a big-company name, unrealistic volumes, requests to pay fees or click links). A priority: 高, 中, 低.

### 2. 回复邮件（英文）
- **Subject line** that repeats the buyer's product and adds one concrete point
- **Opening** that answers their question directly in the first two lines
- **Two or three relevant facts** (not a company history): certification, capacity, a similar market served
- **Three qualifying questions** (quantity, target price or market, required certifications, delivery port and timing)
- **A clear next step**: samples, a call, or a formal quotation once the questions are answered
- **Signature** with name, title, WhatsApp or WeChat if used
About 120 to 180 words. Plain business English; no "Dear Sir/Madam" when the name is known.

### 3. 中文对照
The same email in Chinese for the sales manager to check.

### 4. 价格策略建议
Whether to give a range now or wait for answers, how to anchor (quantity tiers, Incoterm choice), and what not to concede in the first reply.

### 5. 跟进节奏
| 天数 | 内容 | 渠道 |
For example day 3, day 7, day 14, each adding something new (a photo, a case, a stock update), not "just following up".

### 6. 合规提醒（需核实）
Flags for destination country, end use or product category that need a sanctions or export-control check before quoting, and a reminder to verify the buyer's company independently.

## Quality Checks

- [ ] The reply answers the buyer's question in the first two lines
- [ ] At least three qualifying questions are asked
- [ ] The email is under about 180 words and specific to the inquiry
- [ ] Red flags and buyer type are assessed
- [ ] The Chinese version matches the English
- [ ] Compliance flags are raised where relevant and marked to confirm

## Anti-Patterns

- **The company brochure reply.** Buyers skim; answer first.
- **Quoting the lowest price immediately.** Without quantity and terms, you set a floor you cannot raise.
- **Copy-paste replies.** Buyers send the same inquiry to many suppliers and can tell.
- **"Just following up."** Each follow-up should add value.
- **Ignoring red flags.** Fake buyers and phishing are common on trade platforms.

## Example Trigger Phrases

- "阿里国际站来了个询盘，客户在德国，问 LED 灯带价格和 MOQ，怎么回？"
- "客户只发了一句 please send price list，要怎么回复才能拿到更多信息？"
- "帮我写一封英文邮件，跟进两周没回复的美国客户。"
- "这个询盘看起来像同行套价，怎么判断？"
- "Reply to this export inquiry in English with a Chinese version."
