---
name: okr-builder
language: vi
description: "Xây dựng OKR (Mục tiêu và Kết quả then chốt) có cấu trúc tốt cho các nhóm sản phẩm, startup và cá nhân. Dùng khi được yêu cầu viết OKR, đặt mục tiêu theo quý, xác định key result hoặc rà soát OKR hiện có. Tạo ra một bộ OKR hoàn chỉnh gồm objective, key result đo lường được, mức cơ sở (baseline) và hướng dẫn chấm điểm."
---

> Bản dịch tiếng Việt của [okr-builder](../../../skills/okr-builder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Xây dựng OKR

Viết các OKR tham vọng, đo lường được, gắn công việc sản phẩm với chiến lược công ty. Tránh chỉ số phù phiếm (vanity metric), key result tập trung vào đầu ra (output) và những objective nghe như danh sách việc cần làm.

## Đọc từ / Ghi vào Brain

Nếu đã có [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), hãy dựa vào đó thay vì hỏi lại những gì đã biết:

- **Đọc trước:** `context.md` (định nghĩa chỉ số), `knowledge/strategy.md` (sản phẩm đang đi về đâu) và mọi `hypotheses/` đang mở. Chạy `python3 ../professional-brain/scripts/brain_query.py ./brain "<objective theme>"` và giữ nguyên thẻ nguồn gốc (provenance tag) của từng dữ kiện: đừng đặt key result dựa trên một `[hunch]` như thể đó là `[data]`.
- **📥 Đề xuất ghi vào Brain:** sau khi tạo xong, đề xuất ghi các objective đã chọn và mục tiêu KR thành một bản ghi `decisions/` (canh bạc của kỳ này) và mọi định nghĩa chỉ số mới vào `knowledge/`, mỗi mục đều gắn thẻ nguồn gốc. Trình bày cho người dùng, nhận được đồng ý, rồi ghi bằng `../professional-brain/scripts/brain_write.py … --commit` (chỉ ghi thêm, mặc định chạy thử dry-run).

## Làm việc từ một bản brief

Bạn thường sẽ nhận được một brief ngắn không đủ mọi chi tiết (không có baseline, không có con số chính xác). **Luôn đưa ra một bộ OKR hoàn chỉnh, cụ thể**: không dừng lại để hỏi và không để lại placeholder trong ngoặc như `[target]`. Khi thiếu baseline hoặc con số, hãy suy ra một giá trị thực tế từ brief và lĩnh vực, rồi đánh dấu *(giả định, cần xác nhận)*. Một baseline giả định được ghi rõ (ví dụ "tỷ lệ kích hoạt 40% *(giả định)* → 60%") luôn tốt hơn một ô trống hoặc một con số bịa ra như thể là sự thật.

## Tài liệu chuyên sâu

- **`references/bad-okr-gallery.md`** (xem [bản gốc](../../../skills/okr-builder/references/bad-okr-gallery.md)): sáu OKR tệ thực tế kèm chẩn đoán và bản viết lại (roadmap trá hình, objective không thể kiểm chứng, đặt mục tiêu thấp cho an toàn (sandbagging), KR ngoài tầm kiểm soát, "vườn thú" chỉ số, thiếu chỉ số bảo vệ (guardrail)), kết thúc bằng bộ chẩn đoán 5 câu hỏi. Dùng khi *rà soát* OKR hiện có: đối chiếu với bộ sưu tập trước khi viết nhận xét.
- **`templates/okr-worksheet.md`** (xem [bản gốc](../../../skills/okr-builder/templates/okr-worksheet.md)): bảng tính điền sẵn với các cột buộc tuân thủ tiêu chí chất lượng (nguồn baseline, kiểm tra trôi lệch, kiểm tra quyền kiểm soát, guardrail) cùng thang chấm điểm cuối quý được cam kết từ trước. Đề xuất khi một nhóm muốn tự soạn OKR.

## Nền tảng OKR

**Objective:** Định tính, truyền cảm hứng, có thời hạn. Trả lời câu hỏi "chúng ta đang đi đâu?"
**Key Result:** Định lượng, cụ thể, đo lường được. Trả lời câu hỏi "làm sao biết chúng ta đã đến nơi?"

### Phép thử cho một KR tốt
- Có thể chấm điểm từ 0.0 đến 1.0 vào cuối kỳ không?
- Có đo kết quả (outcome) chứ không phải đầu ra (output) không? ("Doanh thu từ khách hàng mới tăng 30%" chứ không phải "Ra mắt 3 tính năng")
- Có tham vọng nhưng khả thi không? (Đạt 70% là chuẩn vàng)
- Có nằm trong tầm kiểm soát của nhóm không?

## Các lỗi OKR phổ biến cần chỉ ra và sửa

| Lỗi | Ví dụ | Phiên bản tốt hơn |
|---|---|---|
| Đầu việc đội lốt KR | "Ra mắt thiết kế lại quy trình onboarding" | "Tỷ lệ kích hoạt người dùng mới tăng từ 42% lên 65%" |
| Chỉ số phù phiếm | "Đạt 10.000 lượt tải ứng dụng" | "Tỷ lệ giữ chân sau 30 ngày của người dùng mới đạt 40%" |
| KR nhị phân | "Phát hành API v2" | "API v2 được 80% tích hợp đang hoạt động sử dụng" |
| Quá nhiều KR | Từ 6 trở lên mỗi objective | Tối đa 3-4 KR mỗi objective |
| Không có baseline | "Cải thiện NPS" | "NPS tăng từ 32 lên 50" |

Luôn chỉ ra lỗi và đề xuất bản viết lại.

## Định dạng đầu ra

### OKR [Quý]: [Nhóm/Mảng sản phẩm]

---

**Objective 1: [Phát biểu định tính, truyền cảm hứng]**

*Vì sao điều này quan trọng:* [1-2 câu bối cảnh chiến lược]

| # | Key Result | Baseline | Mục tiêu | Phương pháp đo |
|---|---|---|---|---|
| KR1 | [Kết quả đo lường được] | [Hiện trạng] | [Mục tiêu] | [Cách đo] |
| KR2 | [Kết quả đo lường được] | [Hiện trạng] | [Mục tiêu] | [Cách đo] |
| KR3 | [Kết quả đo lường được] | [Hiện trạng] | [Mục tiêu] | [Cách đo] |

*Người phụ trách:* [Tên/Vai trò]
*Nhịp check-in:* Hằng tuần

---

Lặp lại cho từng objective. Khuyến nghị 2-4 objective cho mỗi nhóm mỗi quý.

## Hướng dẫn chấm điểm cần đưa vào

Cuối quý, chấm điểm từng KR:
- 0.7-1.0 = Xuất sắc (0.7 là "điểm ngọt": nếu mọi KR đều đạt 1.0, chúng chưa đủ tham vọng)
- 0.4-0.6 = Có tiến bộ nhưng chưa đạt
- 0.0-0.3 = Không đạt, cần thảo luận trong buổi retrospective

## Đầu vào (tự suy ra nếu thiếu, ghi rõ giả định)

- **Nhóm hoặc cá nhân** áp dụng OKR
- **Quý và năm**
- **North Star metric của công ty hoặc sản phẩm** (OKR nên gắn với chỉ số này; nếu không được cung cấp, hãy suy ra một chỉ số hợp lý và ghi *(giả định)*)
- **3 ưu tiên hoặc mục tiêu hàng đầu của quý** (ghi chú sơ bộ cũng được)
- **OKR hiện có cần rà soát hoặc cải thiện** (không bắt buộc)

## Hướng dẫn

- Gắn OKR với North Star của công ty/sản phẩm; nếu chưa có, hãy suy ra một chỉ số hợp lý và ghi *(giả định)* thay vì hỏi
- Khuyến nghị không quá 3 objective cho mỗi nhóm mỗi quý
- Nếu người dùng đưa ra mục tiêu dạng đầu ra, luôn chuyển thành kết quả
- Có một phần "kiểm tra sức khỏe" chỉ ra những KR chưa có dữ liệu baseline hiện tại
- Nhắc người dùng: OKR không phải là đánh giá hiệu suất, chúng nên đủ tham vọng để việc không đạt là chấp nhận được

## Thang chấm điểm (0-40)

Chấm điểm mọi đầu ra của kỹ năng này trước khi bàn giao; từ 32 trở lên là đạt chất lượng phát hành.

| Tiêu chí | 0 | 5 | 10 |
|---|---|---|---|
| Định hướng kết quả | KR là danh sách đầu việc tính năng đã phát hành ("ra mắt X", "hoàn thành Y") | Phần lớn là kết quả, nhưng có một hoặc nhiều KR là đầu ra hoặc dạng nhị phân phát hành/không phát hành | Mọi KR là chỉ số kết quả, chấm được từ 0.0 đến 1.0 theo mức độ đạt |
| Baseline và khả năng đo lường | Không có baseline hay phương pháp đo; KR không thể chấm vào cuối quý | Có mục tiêu nhưng nhiều baseline thiếu hoặc không rõ nguồn, không có cảnh báo kiểm tra sức khỏe | Mọi KR có baseline, mục tiêu và phương pháp đo; dữ liệu thiếu được ghi trong phần kiểm tra sức khỏe kèm kế hoạch đo lường |
| Hiệu chỉnh mức tham vọng | Mục tiêu chỉ là đường xu hướng của quý trước (sandbagging) hoặc hoàn toàn viển vông không có lộ trình | Có phần thách thức, nhưng không ai nói được điểm 0.7 trông như thế nào | Được hiệu chỉnh để đạt 0.7 là một quý tốt như kỳ vọng; các đề xuất sandbagging và "moonshot" được chỉ ra và sửa |
| Trọng tâm chiến lược và quyền kiểm soát | Không gắn với North Star; từ 5 objective trở lên hoặc "vườn thú" KR; KR phụ thuộc vào công việc của nhóm khác | Gắn lỏng lẻo với chiến lược nhưng objective quá tải hoặc có một KR không qua được phép thử quyền kiểm soát | Tối đa 3 objective với tối đa 4 KR mỗi objective, mọi objective gắn rõ với North Star và mọi KR nằm trong tầm kiểm soát của nhóm |

## Kiểm tra chất lượng

- [ ] Mỗi KR đo lường được, có baseline và mục tiêu
- [ ] Không có KR dạng đầu ra (không có "ra mắt X" hay "hoàn thành Y")
- [ ] Tối đa 4 KR mỗi objective
- [ ] OKR gắn với North Star của công ty hoặc sản phẩm
- [ ] Đủ tham vọng để đạt 0.7 là mức điểm kỳ vọng

## Những lỗi cần tránh

- [ ] Không chấp nhận key result dạng đầu ra: mọi KR viết kiểu "ra mắt X" hay "hoàn thành Y" phải được viết lại thành kết quả có baseline và mục tiêu
- [ ] Không viết OKR mà không hỏi về North Star của công ty hoặc sản phẩm: OKR tách rời bối cảnh chiến lược chỉ là một bài tập đặt mục tiêu
- [ ] Không viết quá 4 KR mỗi objective: quá nhiều KR làm loãng trọng tâm và khiến việc chấm điểm cuối quý mơ hồ
- [ ] Không dùng KR nhị phân (phát hành/không phát hành): mọi KR phải chấm được trên thang 0.0-1.0 theo mức độ đạt
- [ ] Không bỏ qua phần kiểm tra sức khỏe về baseline: OKR thiếu baseline hiện tại không thể chấm điểm khách quan vào cuối quý

## Ví dụ câu kích hoạt

- "Viết OKR cho tôi."
- "Đặt mục tiêu quý."
- "Xác định kết quả then chốt."
- "Rà soát OKR hiện có."
