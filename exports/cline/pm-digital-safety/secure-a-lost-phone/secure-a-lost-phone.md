# Secure a Lost Phone

A lost phone isn't just a lost device — it's a key to your email, banking, 2FA, and payments. The first 30 minutes matter. This gives the correct order: locate and lock it, stop the SIM and card access, change the passwords that matter, and decide when to remotely wipe — so a bad day doesn't become account takeover and fraud.

## What This Skill Produces

- **The ordered checklist** — locate/lock via the find-my service, then protect the high-risk stuff, in priority sequence
- **SIM & payment protection** — contact your carrier to suspend the SIM (stops SMS-2FA hijack) and your bank to protect cards/wallet
- **Account priorities** — change passwords on email and key accounts the phone can unlock or reset
- **The wipe decision** — locate-and-lock vs. remote-wipe, and the tradeoffs (recovery vs. data exposure)
- **Reporting** — police report (for theft/insurance) and carrier notification
- **Prevention setup** — what to enable now so next time is a shrug, not a crisis

## Required Inputs

Ask for these if not provided:
- **Lost or stolen** — and any sense of where (changes locate vs. wipe)
- **Phone type** — iPhone/Android (determines the find-my/lock tools)
- **What's on it** — banking/payment apps, 2FA/authenticator, work data
- **Protections it had** — passcode, biometrics, encryption, find-my enabled
- **Access to another device** — to run the find-my and change passwords

## Framework: Lock, Cut Access, Decide To Wipe

1. **Locate and lock immediately.** Use the platform's find-my service from another device to lock the phone, show a contact message, and see its location — before anything else.
2. **Cut the SIM and payment access.** Call the carrier to suspend the SIM (prevents SMS-code interception) and your bank to protect cards and mobile wallet.
3. **Change the keystone passwords.** Email first (it resets everything), then banking and primary accounts — especially if the phone held 2FA.
4. **Decide: locate or wipe.** If recovery looks likely and it's well-protected, lock and track; if sensitive data is exposed or recovery is hopeless, remote-wipe (accepting you lose tracking).
5. **Report and prevent.** File a police report for theft/insurance, note the IMEI, and set up strong prevention (passcode, biometrics, find-my, encrypted backups) for the future.

## Output Format

### Lost/stolen phone: [iPhone/Android] · [lost/stolen] · has [banking/2FA]?

**Do now (in order)**
1. Find-my from another device: lock + message + locate.
2. Carrier: suspend the SIM. Bank: protect cards/wallet.
3. Change passwords: email → banking → primary accounts (esp. if 2FA was on it).
4. Wipe decision: [lock & track if recoverable/protected] vs [remote-wipe if data exposed].
5. Report: police (theft/insurance, note IMEI) + carrier.

**Set up for next time:** passcode + biometrics · find-my on · encrypted backups · 2FA that isn't only this phone.

## Quality Checks
- [ ] Locate/lock via find-my is the first step
- [ ] SIM suspension and bank/wallet protection are included early
- [ ] Prioritizes changing email + key account passwords (2FA risk)
- [ ] Presents the locate-vs-wipe decision with tradeoffs
- [ ] Covers police report + IMEI and carrier notification
- [ ] Ends with prevention setup

## Anti-Patterns
- **Wiping instantly** and losing all chance to locate it (when it was protected/recoverable).
- **Forgetting the SIM** — leaving SMS 2FA hijackable.
- **Ignoring banking/wallet** access on the device.
- **Not changing passwords** when the phone held 2FA.
- **Skipping the police report/IMEI** needed for insurance.

## Example Trigger Phrases
- "My phone was just stolen — what do I do right now?"
- "I lost my iPhone and my banking app is on it."
- "Someone took my Android, help me secure everything."
- "Should I wipe my lost phone or try to find it?"
- "My phone's gone and it had my authenticator app on it."
