// A second menu for Nigeria, Kenya and South Africa, built from the pm-africa
// bundle. Select it with USSD_MENU = "africa" in wrangler.toml [vars]. The same
// rules as menu.js apply: short labels, plain GSM characters, and every skill
// name must exist in skills/ (test.mjs checks both menus).
export const TITLE = 'PM Skills: work and money';
export const MENU = [
  { label: 'Nigeria', skills: [
    ['ng-payslip-decoder', 'Understand my payslip'],
    ['ng-pension-rsa-guide', 'My pension (RSA)'],
    ['microloan-comparison', 'Compare small loans'],
  ] },
  { label: 'Kenya', skills: [
    ['ke-payslip-decoder', 'Understand my payslip'],
    ['ke-mpesa-reversal-dispute', 'M-Pesa sent wrongly'],
    ['crop-insurance-claim', 'Crop insurance claim'],
  ] },
  { label: 'South Africa', skills: [
    ['za-retrenchment-package-check', 'Retrenchment package'],
    ['za-uif-claim-guide', 'Claim UIF'],
    ['security-deposit-recovery', 'Get my deposit back'],
  ] },
  { label: 'Trading', skills: [
    ['market-stall-pricing', 'Price what I sell'],
    ['daily-cash-book', 'Keep a cash book'],
  ] },
  { label: 'Is this a scam?', skills: [
    ['scam-message-decoder', 'Check a message'],
  ] },
];
