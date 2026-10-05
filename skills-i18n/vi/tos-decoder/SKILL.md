---
name: tos-decoder
language: vi
description: "Giải mã điều khoản dịch vụ hoặc chính sách quyền riêng tư để biết bạn thực sự đang đồng ý với điều gì, xếp hạng theo tác động thực tế. Dùng khi ai đó hỏi 'mình đang đồng ý với cái gì vậy', 'giải mã chính sách quyền riêng tư này giúp mình', 'ToS này có tệ không' hoặc 'có nên bấm chấp nhận không'. Tạo ra bảng phát hiện được xếp hạng kèm kết luận 'mình có cần quan tâm không?' cho từng phát hiện, bao gồm việc bán lại dữ liệu, trọng tài và từ bỏ quyền khởi kiện tập thể, thay đổi đơn phương, giấy phép sử dụng nội dung và việc xóa thực sự có nghĩa là gì."
---

> Bản dịch tiếng Việt của [tos-decoder](../../../skills/tos-decoder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Giải mã Điều khoản Dịch vụ

Không ai đọc điều khoản cả, và đó chính là mô hình kinh doanh. Kỹ năng này đọc chúng và trả lời câu
hỏi duy nhất quan trọng với mỗi điều khoản: *bạn có thực sự cần quan tâm không?* Phần lớn một bản ToS
là điều khoản mẫu mang tính phòng thủ; giá trị nằm ở việc tìm ra ba điều khoản không phải như vậy.

## Kỹ năng này tạo ra gì

- Các phát hiện xếp hạng theo tác động thực tế, không theo thứ tự trong văn bản
- Phần "bạn đang đồng ý với điều gì" bằng ngôn ngữ dễ hiểu cho từng phát hiện, kèm kết luận "mình có cần quan tâm không?"
- Kết luận cuối cùng: chấp nhận / chấp nhận nhưng hiểu rõ / tránh
- Những gì bạn thực sự có thể làm với các phần xấu (cài đặt, lựa chọn từ chối, phương án thay thế)

## Thông tin đầu vào cần có

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **Nội dung ToS / chính sách quyền riêng tư**: dán toàn bộ hoặc từng phần. Nếu chỉ có trích đoạn, giải mã những gì có và liệt kê các chủ đề tác động cao (trọng tài, chia sẻ dữ liệu, giấy phép, xóa dữ liệu) chưa có trong phần được chia sẻ.
- **Dịch vụ là gì** và họ sẽ dùng nó ra sao (dùng thông thường hay cho kinh doanh, tải lên tác phẩm gốc, lưu trữ dữ liệu nhạy cảm).
- **Điều họ lo ngại nhất**, nếu có điều gì cụ thể.

## Khung đánh giá: Thang mức độ nghiêm trọng

Xếp hạng phát hiện theo điều xảy ra với một người thật, nghiêm trọng nhất trước:

- 🔴 **Có thể khiến bạn mất tiền hoặc mất quyền**: trọng tài ràng buộc + từ bỏ quyền khởi kiện tập thể (bạn không thể tham gia vụ kiện khi có chuyện), bán hoặc chia sẻ dữ liệu cá nhân với bên thứ ba/nhà môi giới dữ liệu, giấy phép vĩnh viễn và rộng đối với nội dung của bạn (đặc biệt khi có thể cấp phép lại/dùng để huấn luyện AI), điều khoản thay đổi đơn phương với "tiếp tục sử dụng = đồng ý", chấm dứt tài khoản kèm mất số dư đã trả hoặc nội dung.
- 🟡 **Bất thường, nên biết trước khi bấm**: "xóa" thực chất chỉ là vô hiệu hóa hoặc không bao gồm bản sao lưu, tự động gia hạn với việc hủy khó khăn, lưu giữ dữ liệu sau khi đóng tài khoản, khu vực pháp lý/nơi xét xử ở xa nơi bạn sống, điều khoản ý kiến đóng góp trở thành tài sản của họ.
- 🟢 **Điều khoản mẫu tiêu chuẩn**: từ chối bảo đảm, giới hạn trách nhiệm, quy tắc sử dụng được chấp nhận; nêu tên chúng để người đọc khỏi lo.

Với mỗi phát hiện 🔴/🟡, viết một dòng kết luận **"Mình có cần quan tâm không?"** phù hợp với cách sử dụng mà *chính người dùng này* đã nêu, ví dụ: "Có, nếu bạn tải lên tác phẩm gốc; bỏ qua nếu bạn chỉ xem." Kiểm tra cụ thể: dữ liệu được thu thập, được chia sẻ hay được bán; phạm vi chính xác của mọi giấy phép nội dung (vĩnh viễn? có thể cấp phép lại? còn hiệu lực sau khi xóa?); tranh chấp phải được giải quyết thế nào; điều khoản có thể thay đổi ra sao; việc xóa thực sự xóa những gì.

## Định dạng đầu ra

### Giải mã ToS: [tên dịch vụ]

**1. Kết luận cuối cùng**: chấp nhận / chấp nhận nhưng hiểu rõ / tránh, trong hai câu, cùng điều khoản tệ nhất.

**2. Các phát hiện, xếp hạng theo tác động**

| # | Bạn đang đồng ý với điều gì (ngôn ngữ dễ hiểu) | Ở đâu (dòng/mục được trích dẫn) | Mức độ | Mình có cần quan tâm không? |
|---|---|---|---|---|

**3. Sự thật về việc xóa**: "xóa tài khoản/dữ liệu của tôi" thực sự làm gì, theo văn bản.

**4. Bạn có thể làm gì**: lựa chọn từ chối, cài đặt, khoảng thời gian từ chối trọng tài nếu văn bản cho phép, và những gì đơn giản là chấp nhận hoặc bỏ.

Kết thúc sản phẩm bằng câu sau, giữ nguyên văn: *"Đây là phần diễn giải bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý/tài chính. Luật pháp khác nhau tùy khu vực pháp lý; hãy xác nhận mọi điểm quan trọng với chuyên gia có đủ chuyên môn."*

## Kiểm tra chất lượng

- [ ] Các phát hiện được xếp hạng theo tác động thực tế, không theo thứ tự của chính văn bản
- [ ] Mọi phát hiện 🔴/🟡 đều trích dẫn nguyên văn điều khoản hoặc số mục
- [ ] Mọi phát hiện đều có kết luận "mình có cần quan tâm không?" gắn với cách sử dụng người dùng đã nêu
- [ ] Điều khoản mẫu tiêu chuẩn được gắn nhãn 🟢 rõ ràng: trấn an cũng là một phần của sản phẩm
- [ ] Các chủ đề tác động cao không có trong văn bản được cung cấp được liệt kê là chưa rà soát, không mặc định là ổn
- [ ] Câu miễn trừ trách nhiệm xuất hiện nguyên văn trong sản phẩm

## Những điều cần tránh

- [ ] Không bịa ra điều khoản không có trong văn bản, chỉ giải mã văn bản được cung cấp
- [ ] Không làm nhẹ dấu hiệu cảnh báo để tỏ ra cân bằng: "ai cũng làm vậy" không khiến nó vô hại
- [ ] Không trình bày quy định phụ thuộc khu vực pháp lý (quyền riêng tư, giới hạn trọng tài) như quy tắc phổ quát
- [ ] Không phẫn nộ với điều khoản mẫu thông thường: kêu "sói đến" quá nhiều sẽ chôn vùi các phát hiện thật
- [ ] Không bỏ qua phần kết luận: một danh sách điều khoản không có "mình có cần quan tâm không?" chỉ là một bản ToS ngắn hơn

## Dựa trên

Thực hành rà soát hợp đồng tiêu dùng: phân loại điều khoản theo tác động, đọc phạm vi giấy phép, phân tích điều khoản giải quyết tranh chấp.

## Ví dụ câu kích hoạt

- "Giải thích chính sách quyền riêng tư này."
- "Điều khoản dịch vụ này có tệ không?"
- "Tôi có nên bấm đồng ý không?"
