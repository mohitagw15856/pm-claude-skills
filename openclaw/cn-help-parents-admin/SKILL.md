---
name: cn-help-parents-admin
description: "Use when asked 帮爸妈办医保, 帮父母办养老金认证, 爸妈异地就医备案, 帮老人办银行业务, 父母被诈骗了怎么办, 教爸妈用手机办事, 代办委托书, or help an adult child handle 医保, 社保, 养老金, banking or scam protection for ageing parents in mainland China. Produces a task list for this errand, what the adult child can do remotely versus what needs the parent in person, the documents and authorisation needed, a step list for the parent in very plain large-step language (长辈版) with a call-for-help line, and an anti-scam card, with every local rule marked to confirm."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/cn-help-parents-admin.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Helping Parents With Admin (帮爸妈办事)

Many adult children in China live in a different city from their parents and handle their admin by phone: the annual pension eligibility check (养老金领取资格认证), registering for medical treatment in another city (异地就医备案), a bank card that has been frozen, or a call from someone claiming to be the police. Parents find apps hard to use and are the main target of phone scams. This skill works out what the adult child can do remotely, what needs the parent in person, and writes the parent's part in language they can follow alone.

Write in Simplified Chinese unless asked otherwise. Procedures, apps and documents differ by city and change; every rule here is marked 需核实 and should be confirmed through official channels: the 12333 social insurance hotline, the 12393 medical insurance hotline, the bank's official number, the 国家医保服务平台 or 国家社会保险公共服务平台 apps, or the local 政务服务 app. For the detail of a medical claim use `cn-medical-insurance-claim`; for contributions, `cn-social-insurance-explainer`; for a scam already in progress, call 110 first. This is practical help, not legal or financial advice.

## Required Inputs

Ask for these if not provided, otherwise infer and label the assumption:
- **The errand**: pension certification, 异地就医备案, medical reimbursement, a 社保 or pension query, a bank task (lost card, frozen account, changing a phone number, large deposit), setting up an app, or a suspected scam
- **Where the parents live** and where their 社保 and 医保 are registered (city and scheme)
- **Parents' situation**: age, health, mobility, phone skills (smartphone or not, WeChat or not), hearing or sight difficulties
- **What the adult child can do**: distance, whether they can visit, whether siblings or neighbours can help
- **Documents at hand**: 身份证, 社保卡, 户口簿, 存折 or bank card, the parent's phone number

## Output Structure

### 1. 这件事要做什么
A short task list in order, with the official channel for each step.

### 2. 你能远程办的 vs 需要爸妈本人的
| 步骤 | 子女远程可办 | 需本人到场或刷脸 | 需核实 |
For example many pension certifications can be done by face recognition in the 掌上 12333 or a local app, sometimes on the child's phone with the parent present on a video call; bank changes to the account holder's details usually need the holder in person or a notarised authorisation. Mark which steps need 委托书, 公证 or the parent's own face check.

### 3. 需要准备的材料
| 材料 | 原件/复印件 | 谁保管 |
And a reminder not to send photos of 身份证 or bank cards to anyone except an official channel.

### 4. 长辈版：给爸妈的步骤
For the parent to read alone or to print in large type:
- One action per step, numbered 第一步, 第二步, … no more than eight steps
- Short sentences, no jargon (say 手机上的"国家医保服务平台" app, not 线上渠道)
- What they will see on the screen and what to press
- What to do if something goes wrong: stop, do not press anything else
- A call-for-help line at the end: 有任何不明白，先别点，给 [子女姓名] 打电话：[号码]

### 5. 防骗提醒卡
Five short rules for the parent's phone or fridge: the police, 社保 or 医保 never ask for transfers to a "safe account"; never tell anyone a verification code (验证码); hang up and call the child; "免费领养老金补贴""保健品治病" are scams; the 96110 anti-fraud warning number calls to warn, and 110 is for reporting. Suggest installing the 国家反诈中心 App and turning on the elderly mode (关怀模式 or 长辈模式) in WeChat and Alipay.

### 6. 如果已经被骗
Immediate steps: call 110, call the bank to freeze the card, keep the call records and messages, do not pay any "recovery" service. Tell the parent it is not their fault.

## Quality Checks

- [ ] The remote and in-person steps are separated
- [ ] Every rule, app name and hotline is marked 需核实 with an official channel
- [ ] The 长辈版 uses one action per step, plain words and a call-for-help line
- [ ] Sensitive documents go only through official channels
- [ ] Scam guidance includes 110 and contacting the bank
- [ ] The tone towards the parent is respectful, not patronising

## Anti-Patterns

- **Doing everything with the parent's password.** Use official authorisation routes; shared passwords cause problems later.
- **Jargon in the parent's steps.** 备案, 认证, 结算 need a plain explanation or a picture of the screen.
- **Ten steps on one screen.** Break it up; one action at a time.
- **Blaming a parent who was scammed.** Shame stops them telling you next time.
- **Third-party "代办" agents for pension certification.** Use official channels only.

## Example Trigger Phrases

- "我在深圳，我妈在老家湖南，养老金认证怎么帮她在手机上做？"
- "我爸要来北京住院，医保异地就医备案我能在网上帮他办吗？"
- "我妈接到电话说她社保卡涉嫌洗钱，让她转钱，怎么办？"
- "帮我写一份给爸妈看的、用医保电子凭证看病的步骤，要特别简单。"
- "Help me handle my parents' pension and medical insurance admin in China from another city."
