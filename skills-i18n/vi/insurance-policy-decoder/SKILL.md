---
name: insurance-policy-decoder
language: vi
description: "Giải mã hợp đồng bảo hiểm nhà ở, bảo hiểm cho người thuê nhà hoặc bảo hiểm ô tô để biết thực sự được bảo hiểm những gì, bị loại trừ những gì và phép tính chi trả thực tế ra sao trước khi bạn cần đến. Dùng khi ai đó hỏi 'bảo hiểm của mình thực sự chi trả những gì', 'giải mã hợp đồng bảo hiểm giúp mình', 'mức khấu trừ này có bình thường không' hoặc 'giá trị thực tế (ACV) khác gì chi phí thay thế'. Tạo ra bản giải mã quyền lợi với các kịch bản chi trả thực tế, các điều khoản loại trừ đáng lo được xếp hạng, phép tính ACV so với chi phí thay thế và các câu hỏi cần hỏi đại lý trước khi tái tục."
---

> Bản dịch tiếng Việt của [insurance-policy-decoder](../../../skills/insurance-policy-decoder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Giải mã Hợp đồng Bảo hiểm

Hợp đồng bảo hiểm được đọc hai lần: lúc ký (không ai đọc) và sau khi xảy ra tổn thất (quá muộn). Kỹ năng này làm tốt lần đọc đầu tiên: mỗi hạng mục bảo hiểm chi trả bao nhiêu trong một tình huống thực tế, điều khoản loại trừ nào nuốt mất lời hứa nào, và "được bảo hiểm" nghĩa là thay mới hay khấu hao còn vài đồng. Trang tóm tắt hợp đồng (declarations page) là để quảng cáo; phần loại trừ và phần định nghĩa mới là hợp đồng thật.

## Kỹ năng này tạo ra gì

- Bản giải mã từng hạng mục bảo hiểm với một kịch bản chi trả cụ thể cho mỗi hạng mục ("cháy bếp, thiệt hại $40k → hợp đồng trả X vì…")
- Các dấu hiệu cảnh báo xếp hạng: điều khoản loại trừ làm rỗng quyền lợi chính, hạn mức phụ, bẫy ACV, phạt đồng bảo hiểm
- Phép tính ACV so với chi phí thay thế, áp dụng trên tài sản thực tế của người dùng
- Câu hỏi cho đại lý: các lỗ hổng phát hiện được, các điều khoản bổ sung đáng hỏi giá, và những gì cần có bằng văn bản

## Thông tin đầu vào cần có

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **Tài liệu hợp đồng**: tối thiểu là trang tóm tắt hợp đồng; phần loại trừ/định nghĩa nếu có. Nếu chỉ có trang tóm tắt, giải mã những gì nhìn thấy và liệt kê các phần còn cần: phần loại trừ mới là nơi việc đọc có ý nghĩa.
- **Tài sản được bảo vệ**: giá trị nhà và giá trị đồ đạc ước chừng, hoặc phương tiện + cách sử dụng; mọi điều bất thường (kinh doanh tại nhà, thiết bị đắt tiền, tầng hầm hoàn thiện ở vùng hay mưa).
- **Danh sách lo ngại của họ**: những tổn thất họ thực sự sợ; bản giải mã xếp hạng dựa trên những điều đó.

## Khung đánh giá: Thang mức độ nghiêm trọng

- 🔴 **Có thể khiến bạn mất tiền thật**: bồi thường theo giá trị thực tế (ACV) cho mái nhà/đồ đạc (khấu hao ăn mất khoản chi trả), loại trừ nước/lũ/trào ngược cống (lỗ hổng hay bị phát hiện quá muộn nhất; lũ lụt gần như không bao giờ nằm trong hợp đồng tiêu chuẩn), hạn mức phụ thấp hơn nhiều so với tài sản đã kê khai ("trang sức: tổng cộng $1,500"), điều khoản đồng bảo hiểm (mua bảo hiểm dưới X% giá trị → mọi yêu cầu bồi thường bị phạt theo tỷ lệ), lỗ hổng tuân thủ quy chuẩn xây dựng (xây lại theo quy chuẩn hiện hành mặc định không được bảo hiểm), loại trừ sử dụng cho kinh doanh khiến yêu cầu bồi thường cho thiết bị văn phòng tại nhà hoặc việc lái xe giao hàng bị vô hiệu.
- 🟡 **Bất thường, cần tìm hiểu trước khi tái tục**: mức khấu trừ gió/mưa đá cao hoặc tính theo phần trăm (2% giá trị căn nhà ≠ 2% số tiền yêu cầu bồi thường), khấu hao với yêu cầu bồi thường mái nhà một phần, bảo hiểm đồ đạc theo rủi ro được liệt kê nhưng đội lốt bảo hiểm toàn diện, hạn mức xe thuê và mất quyền sử dụng hết giữa chừng khi đang sửa chữa.
- 🟢 **Tiêu chuẩn**: cấu trúc trách nhiệm dân sự thông thường, mức khấu trừ tiêu chuẩn, các loại trừ thông thường được nêu tên (chiến tranh, hao mòn); gắn nhãn để người đọc khỏi lo.

Luôn trình bày phép tính: **ví dụ ACV** (mái nhà 10 năm tuổi, chi phí thay thế $30k, tuổi thọ 25 năm → khoản chi trả sau khấu hao ≈ $12k trừ mức khấu trừ; hãy tính ra); **ví dụ đồng bảo hiểm** nếu có điều khoản này; **kiểm tra hạn mức phụ** so với đồ giá trị thực tế của người dùng. Khi một thuật ngữ được định nghĩa trong phần định nghĩa, nghĩa theo định nghĩa sẽ được ưu tiên hơn nghĩa thông thường: hãy trích dẫn nó.

## Định dạng đầu ra

### Giải mã Hợp đồng Bảo hiểm: [loại, công ty bảo hiểm, thời hạn hợp đồng]

**1. Kết luận**: ba phát hiện làm thay đổi nhiều nhất điều người dùng này nghĩ mình đang có, viết bằng câu đơn giản.

**2. Giải mã quyền lợi bảo hiểm**

| Hạng mục bảo hiểm | Hạn mức / cơ sở | Chi trả bao nhiêu trong tình huống thực tế | Mức độ |
|---|---|---|---|

**3. 🚩 Dấu hiệu cảnh báo, xếp hạng**: trích dẫn câu chữ phần loại trừ/định nghĩa, tình huống nó gây hại, và khoản thiếu hụt tính bằng tiền.

**4. Phần tính toán**: ACV so với chi phí thay thế áp dụng trên tài sản của họ; mức khấu trừ thực tế (khấu trừ theo phần trăm quy ra tiền); hạn mức phụ so với đồ giá trị thực tế của họ.

**5. Câu hỏi cho đại lý**: các lỗ hổng cần hỏi giá (lũ lụt, trào ngược cống, đồ giá trị liệt kê riêng, điều khoản bổ sung chi phí thay thế), và những câu trả lời nào cần có bằng văn bản.

Kết thúc sản phẩm bằng câu sau, giữ nguyên văn: *"Đây là phần diễn giải bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý/tài chính. Luật pháp khác nhau tùy khu vực pháp lý; hãy xác nhận mọi điểm quan trọng với chuyên gia có đủ chuyên môn."*

## Kiểm tra chất lượng

- [ ] Mọi hạng mục bảo hiểm đều có một kịch bản chi trả cụ thể, không chỉ nhắc lại hạn mức
- [ ] ACV so với chi phí thay thế được tính trên con số của người dùng, không giải thích trừu tượng
- [ ] Mức khấu trừ theo phần trăm được quy đổi ra tiền
- [ ] Các điều khoản loại trừ được trích dẫn, và thuật ngữ được định nghĩa dùng đúng định nghĩa của hợp đồng
- [ ] Các phần không được cung cấp (loại trừ, định nghĩa) được nêu là lỗ hổng, không mặc định là tiêu chuẩn
- [ ] Câu miễn trừ trách nhiệm xuất hiện nguyên văn trong sản phẩm

## Những điều cần tránh

- [ ] Không bịa ra điều khoản bảo hiểm hoặc hạn mức không có trong tài liệu
- [ ] Không làm nhẹ dấu hiệu cảnh báo để tỏ ra cân bằng: bồi thường ACV cho mái nhà 15 năm tuổi là khoản chi trả nhỏ, hãy nói thẳng
- [ ] Không trình bày quy định phụ thuộc khu vực pháp lý (thời hạn yêu cầu bồi thường, tiêu chuẩn thiếu thiện chí) như quy tắc phổ quát
- [ ] Không xếp hạng theo thứ tự các phần trong hợp đồng: xếp hạng theo nỗi lo người dùng nêu và khoản thiếu hụt tính bằng tiền
- [ ] Không giới thiệu công ty bảo hiểm hay báo giá: giải mã hợp đồng này; việc đi tìm mua là quyết định của người dùng

## Dựa trên

Thực hành rà soát quyền lợi bảo hiểm từ phía người được bảo hiểm: đối chiếu trang tóm tắt với phần loại trừ, kiểm thử kịch bản chi trả, kiểm tra hạn mức phụ.

## Ví dụ câu kích hoạt

- "Bảo hiểm của tôi thực sự chi trả những gì?"
- "Giải thích hợp đồng bảo hiểm của tôi."
- "Mức khấu trừ này có bình thường không?"
