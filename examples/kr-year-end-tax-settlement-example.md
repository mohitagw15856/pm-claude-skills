# Example: kr-year-end-tax-settlement

## What this skill does

Walks an employee in Korea through 연말정산: the timeline, which deductions apply to their family and spending, what evidence proves each one, the 홈택스 간소화 steps, and what has to wait for 5월 종합소득세 신고 or a 경정청구. Every amount and limit is marked to confirm with 국세청.

## How to trigger it

### Example 1: first settlement with a parent and monthly rent

**You say:**
> "올해 연말정산 처음 해요. 총급여는 4,200만원이고, 어머니(62세, 국민연금 연 600만원)를 부양가족으로 올릴 수 있는지 궁금해요. 월세 55만원 내고 있고 신용카드는 1,500만원 썼어요. 뭘 준비해야 하나요?"

**Claude produces (excerpt):**

**2. 해당 공제**
| 공제 | 해당 여부 | 조건 (올해 기준 확인 필요) | 증빙 |
|---|---|---|---|
| 부양가족 기본공제 (어머니) | 확인 필요 | 나이 요건과 연간 소득금액 요건을 모두 충족해야 함. 국민연금 수령액은 연금소득으로 계산되므로 소득금액 기준 초과 여부 확인 | 가족관계증명서, 간소화 자료 제공 동의 |
| 월세 세액공제 | 해당 가능 | 무주택 세대주, 총급여 기준 이하, 주민등록 주소와 임대차계약서 주소 일치 | 임대차계약서 사본, 월세 이체 내역 |
| 신용카드 등 소득공제 | 해당 | 총급여의 일정 비율을 넘는 사용분만 공제. 체크카드, 전통시장, 대중교통은 공제율이 더 높음 | 간소화 자료 |

**5. 연말정산으로 처리되지 않는 것**: 간소화에서 빠진 안경 구입비나 일부 의료비는 영수증을 따로 제출하고, 놓친 공제는 5월 종합소득세 신고나 경정청구로 바로잡을 수 있습니다 (기한 확인).

## Tips for best results

- Give each family member's age and income, not just their relationship.
- Say whether you changed jobs this year.
- Paste last year's 원천징수영수증 summary if you have it.

## Related skills

- `kr-severance-pay` when you leave a job during the year
- `jp-year-end-adjustment` for the Japanese equivalent
