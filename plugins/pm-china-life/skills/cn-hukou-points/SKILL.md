---
name: cn-hukou-points
description: "Use when asked 积分落户怎么算, 我能不能落户上海 / 北京 / 深圳, 居转户条件, 落户积分差多少, 人才引进落户, or check eligibility for a city household registration (户口) in China. Produces the routes available in the person's city (积分落户, 居转户, 人才引进, 应届生落户 and others), a score estimate built only from the city's current official scoring table, the gap and how to close it, a document checklist and a timeline, each marked to confirm with the city's official notice."
version: 1.0.0
---

# Hukou Points (积分落户)

Moving one's 户口 to a big city affects schooling, home buying and social benefits, and every city runs its own routes with rules that change most years. People lose years by chasing the wrong route or by miscounting points. This skill maps the routes in one city, estimates points only from the city's current official table, and turns the gap into a plan.

Write in Simplified Chinese. This is preparation, not a determination: only the city's 人社局 or 公安户籍部门 decides eligibility, and every rule, threshold and date here must be checked against the current official notice (以当地最新官方通知为准).

## Required Inputs

Ask for these if not provided:
- **City**, and the person's current 户口 location
- **Age, education** (degree, school, whether 应届), and any professional titles or skills certificates
- **Social insurance and tax history** in the city: years, continuity, contribution base
- **Housing**: owned or rented in the city, and for how long
- **The current official scoring table or notice**, if the person has it; otherwise the skill lists what to find

## Output Structure

### 1. Routes in this city
| Route | Typical conditions (to confirm) | Fits you? | Why |
Common routes: 积分落户 (points), 居转户 (residence permit to hukou, for example in Shanghai), 人才引进 (talent introduction), 应届毕业生落户, 投靠 (joining family), and special schemes for shortage skills.

### 2. Score estimate
Built only from the official table the person provides or the skill points them to. Show each indicator, the person's value, the points, and the source line in the table:
| Indicator | Your value | Points | Source (table clause) |
If no official table is available, do not estimate; list the indicators that usually count (age, education, social insurance years, tax, housing, titles) and what to obtain.

### 3. Gap and plan
The points or conditions missing, the actions that close them (for example a professional title, continuous social insurance, a recognised qualification), how long each takes, and whether the gap can close before the next application window.

### 4. Documents and timeline
A checklist of documents and a month-by-month timeline to the application window, with every date marked 以官方通知为准.

## Quality Checks

- [ ] Every rule and threshold is marked to confirm with the current official notice
- [ ] Points are computed only from an official table the person supplied or was directed to
- [ ] Each route shows why it does or does not fit the person
- [ ] The plan states how long each action takes and whether it fits the next window
- [ ] No past year's cut-off score is presented as this year's
- [ ] The output names the office that decides (人社局 or 公安户籍部门)

## Anti-Patterns

- **Using last year's numbers.** Tables and cut-offs change; old scores mislead.
- **Guessing points.** An estimate without the official table is false precision.
- **One route only.** The person may qualify faster by another route.
- **Treating the estimate as approval.** Only the city decides.

## Example Trigger Phrases

- "我在上海工作五年，硕士，能落户吗？走哪条路？"
- "北京积分落户我大概多少分，还差多少？"
- "应届生落户深圳需要什么材料？"
- "Can I get a Shanghai hukou, and how long would it take?"
