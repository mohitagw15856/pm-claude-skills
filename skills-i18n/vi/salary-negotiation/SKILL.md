---
name: salary-negotiation
language: vi
description: "Lên kế hoạch đàm phán lương thưởng dựa trên con số và đòn bẩy, không dựa trên sự lo lắng. Dùng khi được yêu cầu đàm phán lương, đánh giá hoặc đưa ra đề nghị ngược lại cho một offer, chuẩn bị cho cuộc trao đổi về đãi ngộ, hoặc so sánh các offer. Tạo ra một kế hoạch đàm phán: so sánh tổng đãi ngộ giữa các offer, mức mục tiêu/mức từ chối và BATNA của bạn, lập luận dựa trên giá trị, kịch bản đề nghị ngược lại, và những gì có thể đàm phán ngoài lương cơ bản."
---

> Bản dịch tiếng Việt của [salary-negotiation](../../../skills/salary-negotiation/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Đàm phán Lương

Phần lớn mọi người để mất tiền vì đàm phán trong lo lắng thay vì có sự chuẩn bị. Kỹ năng này
thay sự lo lắng bằng một kế hoạch: so sánh các offer theo **tổng đãi ngộ** (không chỉ lương cơ bản), đặt mức mục tiêu và
mức từ chối dựa trên BATNA của bạn, biện minh cho đề nghị bằng giá trị bạn mang lại, và soạn sẵn kịch bản đề nghị ngược lại, kể cả
những đòn bẩy ngoài lương cơ bản thường dễ thắng hơn.

## Đầu vào bắt buộc

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **(Các) offer**: lương cơ bản, thưởng, cổ phần (equity), thưởng ký hợp đồng (sign-on) và mọi thành phần khác (cùng các offer cạnh tranh, nếu có).
- **Tình hình của bạn**: đãi ngộ hiện tại, BATNA của bạn (phương án thay thế tốt nhất: một offer cạnh tranh, hoặc ở lại chỗ cũ), và mức độ mỗi bên cần nhau.
- **Dữ liệu thị trường**: các khoảng lương tương đương cho vị trí/cấp bậc/địa điểm (levels.fyi, Glassdoor, đồng nghiệp), nếu bạn có.
- **Điều quan trọng với bạn**: tiền mặt ngay hay tiềm năng tăng giá của cổ phần, sự linh hoạt, chức danh, ngày bắt đầu.

## Định dạng đầu ra

### Negotiation Plan: [role] at [company]

**1. So sánh tổng đãi ngộ**: không bao giờ so lương cơ bản với lương cơ bản. Trình bày tổng đãi ngộ hằng năm của (các) offer và mức hiện tại/phương án thay thế của bạn (dùng script hỗ trợ). Cổ phần và thưởng thường làm đảo ngược thứ hạng.

**2. Các con số của bạn**: **mục tiêu** (tham vọng nhưng có thể biện minh), **mức từ chối** (dưới mức này bạn sẽ từ chối), và **mức neo** (mở đầu cao hơn mục tiêu một chút). Cả ba đều dựa trên thị trường và BATNA của bạn.

**3. Đánh giá đòn bẩy**: bạn có bao nhiêu đòn bẩy (có offer cạnh tranh? kỹ năng khan hiếm? họ đã đầu tư nhiều vào quy trình tuyển?) và cách dùng nó mà không cần bluff.

**4. Lập luận**: lý lẽ dựa trên giá trị cho đề nghị của bạn: bằng chứng của bạn (tác động, mức đãi ngộ tương đương, offer cạnh tranh), được đặt trong tinh thần hợp tác ("Tôi rất hào hứng; để mọi thứ có thể thành công…").

**5. Kịch bản đề nghị ngược lại**: câu chữ chính xác cho: đề nghị tăng lương cơ bản, phản hồi câu "đó là mức tối đa của chúng tôi", và các **đòn bẩy ngoài lương cơ bản** (thưởng ký hợp đồng, cổ phần, chức danh/cấp bậc, ngày bắt đầu, làm việc từ xa, thời điểm xét tăng lương) thường thay đổi được khi lương cơ bản không thể.

**6. Kế hoạch rút lui**: bạn sẽ làm gì nếu họ không đáp ứng mức từ chối (và vì sao việc quyết định điều này từ trước chính là sức mạnh thực sự của bạn).

## Công cụ hỗ trợ lập trình

`scripts/comp_compare.py` (chỉ dùng thư viện chuẩn) tính tổng đãi ngộ hằng năm giữa các offer để bạn so sánh cùng một thước đo (cổ phần được phân bổ theo năm, thưởng ký hợp đồng được quy ra năm):

```bash
# offers.json: [{"name":"Offer A","base":160000,"bonus":24000,"equity_total":200000,"equity_years":4,"signing":20000}, ...]
python3 scripts/comp_compare.py offers.json
python3 scripts/comp_compare.py offers.json --signing-years 1 --json
```

## Kiểm tra chất lượng

- [ ] Các offer được so sánh theo **tổng đãi ngộ**, không chỉ lương cơ bản (bao gồm cổ phần, thưởng và thưởng ký hợp đồng)
- [ ] Đã đặt mức mục tiêu, mức từ chối và mức neo, và cả ba đều gắn với thị trường và BATNA
- [ ] Lập luận dựa trên giá trị và có bằng chứng, không phải "tôi cần thêm tiền"
- [ ] Có bao gồm các đòn bẩy ngoài lương cơ bản (thưởng ký hợp đồng, cổ phần, chức danh, ngày bắt đầu, làm việc từ xa)
- [ ] Quyết định về mức từ chối được đưa ra *trước* cuộc trao đổi

## Những điều cần tránh

- [ ] Đừng so lương cơ bản với lương cơ bản: tổng đãi ngộ mới là con số thật, và cổ phần/thưởng thường thay đổi offer nào thắng
- [ ] Đừng đàm phán khi chưa quyết định trước mức từ chối: đó là nguồn đòn bẩy của bạn
- [ ] Đừng bluff về một offer cạnh tranh mà bạn không có: nếu bị phát hiện, bạn mất hết uy tín
- [ ] Đừng neo thấp hay chấp nhận con số đầu tiên: offer đầu tiên gần như luôn còn chỗ để thương lượng
- [ ] Đừng chỉ chăm chăm vào lương cơ bản: thưởng ký hợp đồng, cổ phần, cấp bậc và ngày bắt đầu thường thay đổi được khi lương cơ bản đã chạm trần

## Cơ sở

Thực hành đàm phán theo nguyên tắc (*Getting to Yes* của Fisher và Ury: BATNA, lợi ích thay vì lập trường) áp dụng vào đãi ngộ.

## Ví dụ câu kích hoạt

- "Đàm phán lương giúp tôi."
- "Trả giá lời mời làm việc này."
- "Chuẩn bị cho cuộc nói chuyện về lương."
- "So sánh các lời mời làm việc."
