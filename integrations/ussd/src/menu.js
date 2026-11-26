// The USSD menu: topics, then skills. Edit labels freely (a screen holds about
// 160 characters, so keep them short); every skill name must exist in skills/
// (test.mjs checks). Translate by copying this file and pointing index.js at it.
export const TITLE = 'PM Skills: free help';
export const MENU = [
  { label: 'Money and work', skills: [
    ['market-stall-pricing', 'Price what I sell'],
    ['daily-cash-book', 'Keep a cash book'],
    ['microloan-comparison', 'Compare small loans'],
    ['loan-decoder', 'Understand a loan'],
    ['interview-prep', 'Job interview'],
  ] },
  { label: 'Home and rent', skills: [
    ['security-deposit-recovery', 'Get my deposit back'],
    ['repair-request-escalation', 'Repairs not done'],
    ['renting-after-disaster-damage', 'Home damaged'],
  ] },
  { label: 'Health and care', skills: [
    ['doctor-visit-prep', 'Before a doctor visit'],
    ['medical-bill-decoder', 'A medical bill'],
    ['functional-assessment-prep', 'Disability assessment'],
    ['disability-benefit-appeal', 'Appeal a benefit refusal'],
  ] },
  { label: 'Papers and help', skills: [
    ['lost-documents-replacement', 'Lost my documents'],
    ['emergency-grant-application', 'Emergency grant'],
    ['benefits-decoder', 'A benefits letter'],
    ['newcomer-school-enrolment', 'Enrol a child in school'],
    ['crop-insurance-claim', 'Crop insurance claim'],
  ] },
  { label: 'Is this a scam?', skills: [
    ['scam-message-decoder', 'Check a message'],
  ] },
];
