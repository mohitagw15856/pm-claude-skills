---
name: lease-decoder
language: vi
description: "Giải mã hợp đồng thuê nhà ở sang ngôn ngữ dễ hiểu và xếp hạng những điều khoản có thể gây bất lợi cho bạn. Dùng khi ai đó hỏi 'mình sắp ký cái gì vậy', 'giải mã hợp đồng thuê nhà giúp mình', 'hợp đồng thuê này có bình thường không' hoặc 'chủ nhà thật sự được làm thế này à'. Tạo ra bảng giải mã từng điều khoản, các dấu hiệu cảnh báo được xếp hạng, phép tính chấm dứt hợp đồng sớm và tiền đặt cọc, các câu hỏi cần hỏi trước khi ký và những điểm thực sự có thể thương lượng."
---

> Bản dịch tiếng Việt của [lease-decoder](../../../skills/lease-decoder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Giải mã Hợp đồng Thuê nhà

Hợp đồng thuê nhà do phía chủ nhà soạn, vì quyền lợi của phía chủ nhà. Kỹ năng này đọc hợp đồng như
một người bạn tinh ý chuyên đọc hợp đồng thuê để kiếm sống: mỗi điều khoản nghĩa là gì, điều khoản
nào có thể khiến bạn mất tiền thật, và cần phản bác điều gì trước khi ký, chứ không phải sau khi ký.

## Kỹ năng này tạo ra gì

- Bảng giải mã từng điều khoản bằng ngôn ngữ dễ hiểu
- Các dấu hiệu cảnh báo xếp hạng theo mức độ nghiêm trọng, kèm phép tính tiền cụ thể (phạt chấm dứt sớm, tự động gia hạn, điều kiện hoàn cọc)
- Các câu hỏi cần hỏi chủ nhà trước khi ký
- Danh sách ngắn những điểm thực sự có thể thương lượng

## Thông tin đầu vào cần có

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **Nội dung hợp đồng thuê**: dán trực tiếp, chép lại từ ảnh chụp, hoặc chỉ một phần. Làm việc với những gì có sẵn và nói rõ điều khoản tiêu chuẩn nào bị thiếu hoặc không đọc được.
- **Tiền thuê, tiền cọc và thời hạn** nếu không có trong văn bản.
- **Địa điểm tương đối** (bang/quốc gia): không bao giờ đoán; hiệu lực thi hành khác nhau rất nhiều giữa các nơi.
- Tùy chọn: điều họ quan tâm nhất (nuôi thú cưng, cho thuê lại, rời đi sớm, làm việc tại nhà).

## Khung đánh giá: Thang mức độ nghiêm trọng

Đánh giá mọi phát hiện theo thang này, sắp xếp theo chi phí thực tế:

- 🔴 **Có thể khiến bạn mất tiền thật**: tự động gia hạn thành một kỳ hạn mới trọn vẹn, phạt chấm dứt sớm vượt quá chi phí tìm người thuê mới, gánh nặng sửa chữa/bảo trì bị đẩy sang người thuê, điều kiện hoàn cọc được viết để bạn không thể đạt (ví dụ: yêu cầu hóa đơn "vệ sinh chuyên nghiệp"), chồng chất phí, điều khoản miễn trừ trách nhiệm.
- 🟡 **Bất thường, nên phản bác**: vào nhà khi báo trước ngắn hoặc không báo, hạn chế khách đến chơi một cách tràn lan, bắt buộc dùng công ty bảo hiểm của chủ nhà, đơn phương thay đổi nội quy, "hư hỏng vượt quá hao mòn thông thường" mơ hồ.
- 🟢 **Điều khoản mẫu tiêu chuẩn**: nói thẳng như vậy, để người đọc biết chỗ nào không cần lo.

Rà soát hợp đồng cụ thể về: **bẫy tự động gia hạn** (thời hạn thông báo; im lặng sẽ ràng buộc bạn vào điều gì), **đẩy gánh nặng sửa chữa**, **quyền vào nhà** (thời gian báo trước, lý do), **phép tính điều khoản chấm dứt sớm** (tính ra số tiền thực tế để rời đi), **điều kiện hoàn cọc** (liệt kê mọi điều kiện được nêu). Với điều khoản thường không có hiệu lực thi hành (ví dụ: từ bỏ quyền được ở nơi đủ điều kiện sinh sống), gắn cờ như sau: *"thường không có hiệu lực thi hành, hãy hỏi một tổ chức hỗ trợ người thuê nhà tại địa phương; hiệu lực thi hành khác nhau tùy khu vực pháp lý."* Không bao giờ tuyên bố một điều khoản vô hiệu như một sự thật phổ quát.

## Định dạng đầu ra

### Giải mã Hợp đồng Thuê: [địa chỉ hoặc "hợp đồng của bạn"]

**1. Kết luận trong một đoạn**: ký / thương lượng trước / bỏ qua, và lý do.

**2. Giải mã từng điều khoản**

| Điều khoản (§) | Nội dung | Ý nghĩa với bạn | Mức độ |
|---|---|---|---|

**3. 🚩 Dấu hiệu cảnh báo, xếp hạng**: nghiêm trọng nhất trước, mỗi mục gồm: câu trích dẫn, tình huống xấu nhất thực tế tính bằng tiền hoặc rắc rối, và cách sửa cần đề nghị.

**4. Phép tính rời đi sớm & tiền cọc**: rời đi sớm thực sự tốn bao nhiêu, và mọi điều kiện gắn với việc lấy lại tiền cọc.

**5. Câu hỏi cần hỏi trước khi ký**: 3-6 câu, sắp xếp theo mức độ tạo đòn bẩy.

**6. Những gì có thể thương lượng**: các điều khoản chủ nhà thường sửa khi được đề nghị.

Kết thúc sản phẩm bằng câu sau, giữ nguyên văn: *"Đây là phần diễn giải bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý/tài chính. Luật pháp khác nhau tùy khu vực pháp lý; hãy xác nhận mọi điểm quan trọng với chuyên gia có đủ chuyên môn."*

## Kiểm tra chất lượng

- [ ] Mọi dấu hiệu cảnh báo đều trích dẫn ngôn từ thực tế của hợp đồng: số điều khoản hoặc nguyên văn
- [ ] Phép tính chấm dứt sớm và tiền cọc được tính bằng con số thật, không mô tả chung chung
- [ ] Các điểm phụ thuộc khu vực pháp lý được gắn cờ rõ, kèm câu giới thiệu tổ chức hỗ trợ người thuê
- [ ] Các phần bị thiếu hoặc không đọc được được nêu tên rõ ràng, không lấp liếm
- [ ] Các điều khoản thực sự tiêu chuẩn được đánh dấu 🟢 để người đọc không sợ hãi điều khoản mẫu
- [ ] Câu miễn trừ trách nhiệm xuất hiện nguyên văn trong sản phẩm

## Những điều cần tránh

- [ ] Không bịa ra điều khoản không có trong văn bản, chỉ giải mã những gì có
- [ ] Không làm nhẹ dấu hiệu cảnh báo để tỏ ra cân bằng: nếu nó có thể khiến mất tiền thật, hãy nói thẳng
- [ ] Không trình bày quy định phụ thuộc khu vực pháp lý như quy tắc phổ quát: gắn cờ và giới thiệu nơi hỏi
- [ ] Không đánh dấu mọi thứ là 🔴: một bản giải mã toàn báo động cũng vô dụng như không có
- [ ] Không đưa ra chiến lược kiện tụng hay phán quyết "điều này là bất hợp pháp": đó là việc của luật sư

## Dựa trên

Thực hành rà soát hợp đồng thuê từ phía người thuê: phân loại điều khoản, tính chi phí rời đi, kiểm tra điều kiện hoàn cọc.

## Ví dụ câu kích hoạt

- "Tôi sắp ký cái gì vậy?"
- "Giải mã hợp đồng thuê nhà giúp tôi."
- "Hợp đồng thuê này có bình thường không?"
- "Chủ nhà thật sự được làm thế này à?"
