---
name: loan-decoder
language: vi
description: "Giải mã một đề nghị vay tiêu dùng, vay mua ô tô hoặc vay thế chấp mua nhà để biết khoản vay thực sự tốn bao nhiêu và bẫy nằm ở đâu. Dùng khi ai đó hỏi 'khoản vay này có hời không', 'giải mã đề nghị vay giúp mình', 'mình sắp ký cái gì vậy' hoặc 'khoản vay mua nhà này thực sự tốn bao nhiêu'. Tạo ra con số tổng chi phí khoản vay, đối chiếu APR với lãi suất quảng cáo, các dấu hiệu cảnh báo được xếp hạng (phí trả nợ trước hạn, phí vô lý, rủi ro điều chỉnh lãi suất) và ba câu hỏi làm thay đổi thỏa thuận nhiều nhất."
---

> Bản dịch tiếng Việt của [loan-decoder](../../../skills/loan-decoder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Giải mã Khoản vay

Giấy tờ vay được xây dựng xoay quanh con số họ muốn bạn thấy (số tiền trả hằng tháng) và vài con số
họ không muốn bạn để ý. Kỹ năng này tính ra tổng số tiền bạn thực sự phải trả, rồi xếp hạng mọi thứ
trong đề nghị vay có thể âm thầm đẩy con số đó theo hướng bất lợi cho bạn.

## Kỹ năng này tạo ra gì

- Con số tổng chi phí khoản vay: mọi khoản phải trả trong suốt thời hạn vay, cùng tổng tiền lãi + phí
- APR so với lãi suất quảng cáo, được đối chiếu: chênh lệch đến từ đâu
- Các dấu hiệu cảnh báo xếp hạng: phí trả nợ trước hạn, phí vô lý, rủi ro điều chỉnh lãi suất thả nổi, sản phẩm bán kèm
- Ba câu hỏi làm thay đổi thỏa thuận cụ thể này nhiều nhất, cùng những điểm có thể thương lượng

## Thông tin đầu vào cần có

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **Nội dung văn bản đề nghị vay**: bảng ước tính khoản vay, bảng điều khoản hoặc hợp đồng. Nếu giấy tờ chưa đầy đủ, giải mã những gì có và liệt kê các con số còn thiếu (APR, bảng kê phí, điều khoản phạt).
- **Thông tin cơ bản của khoản vay nếu không có trong văn bản**: số tiền, lãi suất, thời hạn, cố định hay thả nổi.
- **Kế hoạch của họ**: định giữ khoản vay/tài sản bao lâu, và có thể trả trước hạn hay không.

## Khung đánh giá: Thang mức độ nghiêm trọng

- 🔴 **Có thể khiến bạn mất tiền thật**: phí trả nợ trước hạn (trích dẫn công thức, tính một ví dụ), lãi tính trước / Rule of 78s, sản phẩm bán kèm bắt buộc được cộng vào gốc (bảo hiểm tín dụng, bảo hành, GAP), khoản thanh toán cuối kỳ lớn (balloon), rủi ro lãi suất thả nổi không có trần, lãi suất bị cộng thêm biên.
- 🟡 **Bất thường, nên phản bác**: phí vô lý (phí hồ sơ/xử lý/hành chính vượt quá chi phí thực của bên thứ ba), trọng tài bắt buộc, thế chấp chéo, chồng chất phí trả chậm.
- 🟢 **Tiêu chuẩn**: cấu trúc phí khởi tạo thông thường, chi phí thực của bên thứ ba (thẩm định giá, đăng ký); gắn nhãn để người đọc yên tâm.

Luôn trình bày phép tính:
1. **Tổng chi phí khoản vay** = tất cả các khoản thanh toán + tất cả các khoản phí bên cho vay giữ lại; ghi rõ số tiền hằng tháng × số tháng + phí và tổng tiền lãi.
2. **APR so với lãi suất quảng cáo**: giải thích chênh lệch là các khoản phí được quy đổi thành lãi suất; nếu không nêu APR, hãy gắn cờ, không âm thầm ước tính.
3. **Cách trình bày việc điều chỉnh lãi suất thả nổi**: chỉ số tham chiếu + biên độ, mức trần, và số tiền phải trả khi chạm trần. Trình bày như rủi ro ("khoản trả có thể tăng từ X lên Y"), không phải dự đoán.
4. **Phép tính tất toán sớm**: chi phí trả hết nợ trong khung thời gian người dùng nêu, đã tính phí phạt.

## Định dạng đầu ra

### Giải mã Khoản vay: [loại khoản vay, số tiền]

**1. Kết luận**: chấp nhận / thương lượng các điều khoản này trước / tìm nơi khác, với con số tổng chi phí nêu ngay đầu.

**2. Các con số thật**: tổng chi phí, tổng tiền lãi, tổng phí, APR so với lãi suất quảng cáo kèm giải thích chênh lệch; khoản trả xấu nhất sau điều chỉnh nếu là lãi suất thả nổi.

**3. Bảng giải mã**

| Điều khoản / phí | Văn bản ghi gì | Ý nghĩa với bạn | Mức độ |
|---|---|---|---|

**4. 🚩 Dấu hiệu cảnh báo, xếp hạng**: câu trích dẫn, chi phí tính bằng tiền trong một tình huống thực tế, và cách sửa cần đề nghị.

**5. Ba câu hỏi làm thay đổi thỏa thuận nhiều nhất**: cụ thể cho đề nghị này (ví dụ: "Lãi suất là bao nhiêu nếu bỏ các sản phẩm bán kèm?", "Có phí trả nợ trước hạn không, xin ghi bằng văn bản?", "Khoản phí nào là của bên anh/chị, khoản nào của bên thứ ba?").

**6. Những gì có thể thương lượng**: lãi suất, phí, sản phẩm bán kèm, bỏ điều khoản phạt, và đòn bẩy nào làm thay đổi tổng chi phí nhiều nhất.

Kết thúc sản phẩm bằng câu sau, giữ nguyên văn: *"Đây là phần diễn giải bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý/tài chính. Luật pháp khác nhau tùy khu vực pháp lý; hãy xác nhận mọi điểm quan trọng với chuyên gia có đủ chuyên môn."*

## Kiểm tra chất lượng

- [ ] Tổng chi phí khoản vay được tính với phép tính hiển thị rõ, không chỉ khẳng định
- [ ] APR so với lãi suất quảng cáo được đối chiếu hoặc gắn cờ rõ là còn thiếu
- [ ] Rủi ro lãi suất thả nổi được thể hiện bằng số tiền phải trả cụ thể khi chạm trần
- [ ] Mọi dấu hiệu cảnh báo đều trích dẫn văn bản và định giá thiệt hại bằng tiền
- [ ] Các con số còn thiếu được liệt kê là `[to confirm]`, không bao giờ âm thầm ước tính
- [ ] Câu miễn trừ trách nhiệm xuất hiện nguyên văn trong sản phẩm

## Những điều cần tránh

- [ ] Không bịa ra điều khoản, lãi suất hoặc phí không có trong văn bản
- [ ] Không làm nhẹ dấu hiệu cảnh báo để tỏ ra cân bằng: phí trả nợ trước hạn là một khoản chi phí, hãy gọi đúng tên
- [ ] Không trình bày quy định cho vay phụ thuộc khu vực pháp lý như quy tắc phổ quát
- [ ] Không so sánh với "lãi suất thị trường điển hình" như sự thật: trình bày so sánh dưới dạng khoảng cần kiểm chứng
- [ ] Không để số tiền trả hằng tháng quyết định kết luận: tổng chi phí mới là tiêu điểm

## Dựa trên

Thực hành rà soát khoản vay từ phía người đi vay: tính tổng chi phí, đối chiếu APR, kiểm tra phí, trình bày kịch bản điều chỉnh lãi suất.
