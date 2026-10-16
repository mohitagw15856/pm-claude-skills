---
name: jp-ringisho
description: "Use when asked 稟議書の書き方, write a ringi approval request in Japanese, 稟議書を作って, how to get a purchase or project approved in a Japanese company, or 帮我写一份日本公司的稟議書. Produces a finished 稟議書 in standard Japanese corporate structure and polite register: purpose, background, proposal, cost and its basis, alternatives compared, expected effect, risks, approval route, and attachments, plus the questions approvers are likely to ask."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/jp-ringisho.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Japanese Approval Request (稟議書)

In many Japanese companies a purchase, contract, hire or project needs a 稟議書: a written proposal that circulates through every approver before a decision. A vague 稟議書 comes back with questions, or stalls at one stamp for weeks. Approvers want the purpose, the cost and its basis, the alternatives considered and the risks, in a familiar structure and register. This skill writes one that moves.

Write in Japanese business register (です・ます, with appropriate 敬語) unless the person asks for an English draft alongside. Follow the company's own template where the person provides one.

## Required Inputs

Ask for these if not provided:
- **What is being requested**: purchase, contract, hire, project, policy change
- **Why now**: the problem or opportunity, with numbers where possible
- **Cost**: amount, one-off or recurring, quotes received, budget line
- **Alternatives** considered, including doing nothing
- **Expected effect**: savings, revenue, time, risk reduced
- **Approval route** (決裁ルート) and the decision deadline
- **Company template**, if there is one

## Output Structure

### 1. The 稟議書
件名; 起案日 and 起案者; 決裁期限; 1. 目的; 2. 背景・現状の課題; 3. 提案内容; 4. 費用（内訳と根拠、予算との関係）; 5. 比較検討（他案と見送った理由）; 6. 期待効果（定量・定性）; 7. リスクと対策; 8. スケジュール; 9. 添付資料. Each section short, numbers specific, no unsupported claims.

### 2. One-line summary
A 要旨 of one or two sentences for approvers who read only the top.

### 3. Likely questions
| Approver | Likely question | Prepared answer |
Finance on cost and budget, legal on contract terms, the department head on priority.

## Quality Checks

- [ ] The purpose and the request fit in the first lines
- [ ] Every cost has a basis (quote, unit price times quantity) and a budget line
- [ ] At least one alternative, and doing nothing, are compared
- [ ] Risks come with a countermeasure
- [ ] The register is consistent です・ます business Japanese
- [ ] No figures or quotes are invented; missing ones are marked as to be filled

## Anti-Patterns

- **Burying the request.** Approvers should not have to read to page two to learn what they are approving.
- **A cost with no basis.** It is the first thing finance sends back.
- **No alternatives.** It reads as a decision already made.
- **Overly humble filler.** Polite is right; padding slows every reader in the route.

## Example Trigger Phrases

- "新しい勤怠管理システム導入の稟議書を書いてください。月額12万円です。"
- "外部デザイナーへの発注、稟議を通したい。比較検討も入れて。"
- "Write a ringi-sho in Japanese to approve buying 20 laptops."
- "帮我写一份日本公司的稟議書，申请参加一个展会。"
