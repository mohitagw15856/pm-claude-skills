# Example: kr-cover-letter

## What this skill does

Writes a 항목별 자기소개서 for a Korean employer: one answer per question, within the character limit, each with a 소제목, a 두괄식 opening and one concrete experience, tied to the company and role, with a character count and the interview questions each answer invites.

## How to trigger it

### Example 1: an R&D graduate role

**You say:**
> "현대자동차 연구개발(전동화 제어) 신입 지원해요. 지원동기 및 입사 후 포부 1,000자(공백 포함)로 써 주세요. 경험: 학부 연구실에서 BLDC 모터 제어기 펌웨어 개발, 효율 3% 개선, 교내 전기차 동아리 팀장."

**Claude produces (excerpt):**

**[3%의 효율을 양산 차량의 주행거리로]**
전동화 제어 직무에 지원한 이유는 연구실에서 개선한 3%의 모터 효율이 실제 차량에서는 주행거리와 배터리 원가로 이어진다는 것을 직접 확인하고 싶었기 때문입니다. 학부 연구실에서 BLDC 모터 제어기 펌웨어를 맡아 전류 제어 주기를 조정하고...

(공백 포함 968자 / 1,000자)

**4. 예상 면접 질문**
| 답변 | 예상 질문 | 준비할 내용 |
|---|---|---|
| 효율 3% 개선 | 어떤 조건에서 측정했고, 기준값은 무엇이었나요? | 측정 조건, 비교 대상, 본인의 역할 |

## Tips for best results

- Paste each question exactly and say how characters are counted.
- Give real numbers from your experience; the skill will not invent them.
- Say if the posting is 블라인드 채용.

## Related skills

- `kr-work-report` once you have the job
- `cover-letter` for English-language applications
