# हिन्दी (hi) — Hindi translations

**Status: scaffold.** Skill bodies are not yet translated. The pack index below is machine-drafted and **needs a native-speaker review** before it's relied on — see *How to contribute*.

Why Hindi: a very large audience that maps directly onto the library's most human bundles — `pm-newcomer`, `pm-hardship`, `pm-caregiving`, `pm-family`. Start with the **packs**, not all 1,170+ skills.

## स्किल पैक (Skill Packs) — draft index

| पैक | एक पंक्ति में |
|---|---|
| 🍼 नए माता-पिता | वह सारी व्यवस्था जो कोई नहीं बताता — कागज़ी काम, डेकेयर बनाम घर पर रहना, नींद |
| 💼 अभी-अभी नौकरी गई | पहले दो हफ़्ते, सही क्रम में — सेवरेंस समझें, पैसे संभालें, फिर नौकरी खोजें |
| 🌍 नए देश में | शून्य से ज़िंदगी बनाना — पहले दिन की व्यवस्था, क्रेडिट, योग्यता की मान्यता |
| 👵 माता-पिता की देखभाल | जब आप ज़िम्मेदार बन जाते हैं — डॉक्टर की मुलाक़ात, देखभाल टीम, थकान से बचाव |
| 🕊️ किसी को खोना | कागज़ी काम और इंसानी पक्ष — किसे सूचित करें, श्रद्धांजलि, पहला साल |
| 💸 पैसों का संकट | खून बहना रोकें — कौन-सा बिल पहले, वसूली एजेंट से क्या कहें, आपके अधिकार |
| 🔑 नई शुरुआत | जेल के बाद पहले 90 दिन — रिकॉर्ड, काम, घर, परिवार से फिर जुड़ना |
| 🤖 AI को गंभीरता से | AI का सही उपयोग — प्रॉम्प्ट लाइब्रेरी, काम सौंपना, गलतियाँ पकड़ना |

> ⚠️ ये स्किल शैक्षिक जानकारी हैं — क़ानूनी, चिकित्सा या वित्तीय सलाह नहीं। नियम हर जगह अलग होते हैं; अपने स्थानीय नियम ज़रूर जाँचें।

## How to contribute (native speakers wanted)
1. Pick a skill from a pack above. Copy `skills/<name>/SKILL.md` to `skills-i18n/hi/<name>/SKILL.md` (same folder-per-skill convention as `es/`).
2. Translate **meaning, not words** — keep the framework, the output template, the quality checks, and the not-advice boundary intact. Plain, everyday Hindi; Devanagari script.
3. Keep `name:` unchanged (it's the ID); translate `description:`.
4. Run `node scripts/skillcheck.mjs` and `node tests/i18n-parity.mjs`, then open a PR titled `i18n(hi): <skill>`.

High-stakes skills (money, legal, health) should get a **domain reviewer** who reads Hindi before they're marked complete — see `docs/EXPERT-REVIEW-PROGRAM.md`.
