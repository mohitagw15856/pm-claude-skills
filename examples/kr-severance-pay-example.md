# Example: kr-severance-pay

## What this skill does

Checks eligibility for 퇴직금, calculates it step by step from the person's own figures (평균임금, 계속근로기간, bonus and leave shares), explains how 퇴직금, DB형 and DC형 differ, covers the payment deadline, IRP and 퇴직소득세, and sets out what to do if it is unpaid. Every legal figure is marked to confirm.

## How to trigger it

### Example 1: three years and a DB pension

**You say:**
> "2022년 3월 2일 입사해서 2025년 6월 30일까지 일하고 퇴사했어요. 마지막 3개월 월급은 매달 350만원, 상여금은 1년에 600만원, 작년 연차수당 40만원 받았어요. 회사는 DB형 퇴직연금이래요. 퇴직금 얼마인지 계산해 주세요."

**Claude produces (excerpt):**

**2. 계산**
| 단계 | 금액 | 근거 |
|---|---|---|
| 3개월 임금총액 | 10,500,000원 | 350만원 × 3 |
| 상여금 가산 | 1,500,000원 | 600만원 × 3/12 |
| 연차수당 가산 | 100,000원 | 40만원 × 3/12 |
| 3개월 총일수 | 91일 | 4월 1일 ~ 6월 30일 (퇴직일 7월 1일 기준, 확인 필요) |
| 1일 평균임금 | 약 132,967원 | 12,100,000원 ÷ 91 |
| 재직일수 | 1,217일 | 2022-03-02 ~ 2025-06-30 |
| 퇴직금 (추정) | 약 13,300,000원 | 132,967 × 30 × 1,217 ÷ 365 |

DB형이므로 이 산식대로 퇴직연금 사업자가 지급합니다. 지급 기한, IRP 이전 의무와 예외, 퇴직소득세는 고용노동부 또는 노무사에게 확인하세요.

## Tips for best results

- Give exact start and last working dates.
- Include bonuses and leave pay from the last year.
- Ask HR whether the scheme is 퇴직금, DB or DC before you calculate.

## Related skills

- `kr-year-end-tax-settlement` for the tax year you leave in
- `severance-agreement-decoder` if you are offered a separation agreement
