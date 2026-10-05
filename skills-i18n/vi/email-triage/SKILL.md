---
name: email-triage
language: vi
description: "Phân loại hộp thư Gmail, chỉ giữ lại những gì thực sự cần đến bạn. Dùng khi được yêu cầu phân loại email, dọn hộp thư, tìm những email cần trả lời hoặc tóm tắt thư gần đây. Tạo ra danh sách ưu tiên các mục cần hành động (trả lời, quyết định, theo dõi tiếp) trong một khoảng thời gian tùy chỉnh (mặc định 8 giờ qua), lọc bỏ hóa đơn, thông báo và bản tin."
---

> Bản dịch tiếng Việt của [email-triage](../../../skills/email-triage/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Phân loại Email

## Vấn đề

Phần lớn chúng ta tốn khá nhiều thời gian phân loại những email có thể được sắp xếp tự động. Lướt qua một hộp thư lẫn lộn bản tin, xác nhận đơn hàng, thông báo Jira và những yêu cầu thật từ con người là một khoản "thuế" đánh vào sự tập trung. 40 email từ sau bữa trưa có lẽ chỉ có 4 cái thực sự cần đến bạn, và kỹ năng này tìm ra 4 cái đó.

## Điều kiện tiên quyết

| Yêu cầu | Chi tiết |
|-------------|---------|
| Gmail connector | Phải được bật trong cài đặt Claude (Settings → Connectors → Gmail) |
| Tài khoản Gmail | Tài khoản bạn muốn phân loại |

Nếu Gmail connector chưa được kết nối, Claude sẽ nhắc bạn kết nối trước khi tiếp tục.

## Thông tin đầu vào cần có

| Đầu vào | Bắt buộc | Mặc định | Ghi chú |
|-------|----------|---------|-------|
| Khoảng thời gian | Không | 8 giờ qua | Chấp nhận: "8 giờ qua", "24h qua", "hôm nay", "từ thứ Hai", "3 ngày qua" |
| Người gửi luôn hiển thị | Không | Không có | Tên hoặc địa chỉ email cụ thể luôn được hiển thị, bất kể nội dung |
| Người gửi luôn bỏ qua | Không | Không có | Tên miền hoặc địa chỉ luôn bị ẩn (ví dụ noreply@*, jira@company.com) |
| Trọng tâm | Không | Không có | Bối cảnh tùy chọn: "tập trung vào mọi thứ từ khách hàng" hoặc "đánh dấu mọi thứ liên quan đến đợt ra mắt" |

## Những gì bị lọc bỏ

Claude ẩn các nhóm sau. Chúng được đếm trong phần tổng kết nhưng không hiển thị:

- Xác nhận đơn hàng và thông báo vận chuyển
- Email marketing và khuyến mãi (kể cả email ưu đãi "một lần duy nhất")
- Bản tin đăng ký và email tổng hợp (digest)
- Thông báo hệ thống tự động (cảnh báo giám sát, CI/CD, báo cáo build)
- Lời mời lịch đã được chấp nhận hoặc từ chối
- Xác nhận đã đọc và xác nhận đã gửi
- Thông báo mạng xã hội (LinkedIn, Twitter/X, v.v.)
- Cập nhật ticket nội bộ, trừ khi ticket được giao cho bạn và cần hành động
- Sao kê ngân hàng và tài chính (chỉ hiển thị số lượng, không hiển thị nội dung)

## Những gì được hiển thị

Claude chỉ hiển thị những email đáp ứng ít nhất một tiêu chí sau:

- Có người đang chờ bạn trả lời
- Có yêu cầu đưa ra quyết định
- Có hạn chót hoặc yêu cầu gấp, nói rõ hoặc ngầm hiểu
- Người gửi là người thường không email cho bạn (tín hiệu ưu tiên tiềm năng)
- Email đến từ người gửi trong danh sách luôn hiển thị

## Định dạng đầu ra

```
## Phân loại hộp thư: [Khoảng thời gian] | [Ngày], [Giờ]
**Tổng số email đã quét:** X | **Cần hành động:** Y | **Đã lọc bỏ:** Z

---

### 🔴 Ưu tiên cao: Cần trả lời hoặc quyết định trong hôm nay

**Từ:** [Tên] <email@domain.com>
**Tiêu đề:** [Dòng tiêu đề]
**Nhận lúc:** [Giờ, ví dụ 14:14]
**Họ cần gì:** [Một câu: yêu cầu thực sự, không phải tóm tắt email]
**Câu mở đầu trả lời:** "[Một câu mở đầu để bạn viết tiếp, tối đa 1 câu]"

---

**Từ:** [Tên] <email@domain.com>
**Tiêu đề:** [Dòng tiêu đề]
**Nhận lúc:** [Giờ]
**Họ cần gì:** [Một câu]
**Câu mở đầu trả lời:** "[Câu mở đầu]"

---

### 🟡 Ưu tiên trung bình: Trả lời trong 24-48 giờ

**Từ:** [Tên] <email@domain.com>
**Tiêu đề:** [Dòng tiêu đề]
**Nhận lúc:** [Giờ]
**Họ cần gì:** [Một câu]
**Câu mở đầu trả lời:** "[Câu mở đầu]" *(hoặc "Không cần trả lời, chỉ cần hành động: [việc cần làm]")*

---

### 🟢 FYI: Nên biết, không cần hành động

- **[Tên]** về: [Tiêu đề] - [Tóm tắt một dòng vì sao có thể liên quan]
- **[Tên]** về: [Tiêu đề] - [Tóm tắt một dòng]

---

### ⚪ Đã lọc bỏ: [Z email]
Hóa đơn: X | Bản tin: X | Thông báo: X | Tự động khác: X
*(Không cần hành động, không hiển thị chi tiết)*
```

## Hướng dẫn cho Claude

### Bước 1: Kết nối và xác nhận khoảng thời gian

Xác nhận Gmail connector đang hoạt động. Phân tích khoảng thời gian được yêu cầu và chuyển thành khoảng ngày giờ chính xác (ví dụ "8 giờ qua" = [thời điểm hiện tại trừ 8 giờ] đến bây giờ). Ghi rõ khoảng thời gian ở đầu đầu ra.

### Bước 2: Đọc hộp thư

Lấy email trong hộp thư trong khoảng thời gian chỉ định. Bao gồm: tên người gửi, email người gửi, tiêu đề, thời gian nhận và nội dung email (hoặc 500 từ đầu nếu dài). Không lấy email cũ hơn khoảng thời gian.

### Bước 3: Áp dụng quy tắc bỏ qua

Nếu người dùng đã chỉ định người gửi hoặc tên miền luôn bỏ qua, hãy ẩn chúng ngay. Nếu không có danh sách bỏ qua, áp dụng quy tắc ẩn tiêu chuẩn (xem Những gì bị lọc bỏ). Đếm số lượng cho phần tổng kết đã lọc bỏ.

### Bước 4: Phân loại từng email còn lại

Với mỗi email không bị ẩn, xếp vào một trong bốn nhóm:

- **Ưu tiên cao**: Có người đang chờ trả lời trong hôm nay, hoặc có hạn chót rõ ràng trong vòng 24 giờ
- **Ưu tiên trung bình**: Cần trả lời nhưng không gấp, hoặc có yêu cầu ngầm không có hạn chót cứng
- **FYI**: Không cần hành động, nhưng người dùng nhiều khả năng muốn biết
- **Đã lọc bỏ**: Thuộc nhóm bị ẩn, cộng vào số đếm, không hiển thị

Áp dụng danh sách luôn hiển thị sau khi phân loại: mọi email từ người gửi được đánh dấu đều hiển thị bất kể nhóm nào, với đúng phân loại thực tế của nó.

### Bước 5: Viết dòng "Họ cần gì"

Đây là phần giá trị nhất của đầu ra. Viết đúng một câu nắm bắt yêu cầu thực sự: không phải tóm tắt email, mà là yêu cầu.

Chưa tốt: "Sarah đã gửi email về báo cáo Q3."
Tốt: "Sarah cần bạn duyệt báo cáo Q3 trước khi cô ấy gửi lên hội đồng quản trị lúc 5 giờ chiều."

Nếu không có yêu cầu rõ ràng, nhiều khả năng đó là FYI hoặc nên bị lọc bỏ.

### Bước 6: Viết câu mở đầu trả lời

Với email ưu tiên cao và trung bình, viết một câu mở đầu trả lời. Câu mở đầu nên:
- Khớp giọng điệu của người gửi (trang trọng hay thân mật)
- Phản hồi trực tiếp yêu cầu
- Là câu người dùng thực sự có thể gửi đi mà chỉ cần sửa rất ít

Ví dụ: "Cảm ơn anh/chị đã báo, em sẽ trao đổi với nhóm và phản hồi trước cuối ngày."

Nếu email cần hành động thay vì trả lời (ví dụ "vui lòng duyệt khoản chi này"), hãy viết: "Không cần trả lời, chỉ cần hành động: [mô tả hành động]."

### Bước 7: Tổng hợp và trả kết quả

Dùng đúng định dạng đầu ra như đã nêu. Không thêm mục, không bình luận, không giải thích lập luận. Đầu ra phải đọc lướt được trong chưa đầy 60 giây.

### Bước 8: Đề xuất bước tiếp theo

Sau phần phân loại, đề xuất một trong các câu:
- "Bạn có muốn tôi soạn trả lời cho email nào không?"
- "Nói 'trả lời [tên]' và tôi sẽ soạn thư."

Chỉ một dòng. Không giải thích thêm.

## Kiểm tra chất lượng

- [ ] Khoảng thời gian được áp dụng đúng, không có email nào ngoài khoảng
- [ ] Đã xác nhận Gmail connector hoạt động trước khi đọc
- [ ] Mọi email ưu tiên cao đều có câu "Họ cần gì" cụ thể, rõ ràng, không phải tóm tắt mơ hồ
- [ ] Câu mở đầu trả lời khớp giọng điệu của email gốc (trang trọng/thân mật)
- [ ] Số lượng đã lọc bỏ chính xác và được chia theo nhóm
- [ ] Mục FYI chỉ chứa email không cần hành động, không có gì cần làm bị lẫn vào đây
- [ ] Người gửi luôn hiển thị được hiển thị bất kể nhóm
- [ ] Người gửi/tên miền luôn bỏ qua bị ẩn hoàn toàn
- [ ] Đầu ra dễ đọc lướt, không văn vẻ thừa, không độn chữ
- [ ] Sao kê tài chính và nội dung nhạy cảm được đếm nhưng không hiển thị đầy đủ

## Những lỗi cần tránh

- [ ] Không đưa email FYI vào mục ưu tiên cao hoặc trung bình: trộn việc cần làm với thông tin tham khảo làm mất mục đích của việc phân loại
- [ ] Không viết câu "Họ cần gì" mơ hồ ("Sarah đã gửi email về báo cáo"): mọi câu phải nêu yêu cầu thực sự, không phải mô tả email
- [ ] Không dùng cùng một giọng điệu cho mọi câu mở đầu trả lời: email trang trọng từ khách hàng cần câu mở đầu khác với email thân mật kiểu Slack từ đồng nghiệp
- [ ] Không đưa vào email ngoài khoảng thời gian được yêu cầu: độ chính xác của khoảng thời gian là tín hiệu tin cậy cốt lõi của kỹ năng này
- [ ] Không bỏ qua số lượng đã lọc bỏ: người dùng cần biết đã quét bao nhiêu, không chỉ những gì được hiển thị, để tin rằng việc phân loại là đầy đủ

## Sử dụng qua Dispatch / Di động

Kỹ năng này hoạt động từ ứng dụng Claude trên di động (Dispatch). Trên di động, đầu ra hiển thị gọn gàng với các biểu tượng emoji mức ưu tiên làm điểm neo thị giác để đọc lướt nhanh. Câu kích hoạt khuyến nghị trên di động: "Kiểm tra email giúp tôi" hoặc "/email-triage".

## Ví dụ câu kích hoạt

- `/email-triage`
- "Kiểm tra email giúp tôi"
- "Có email nào cần tôi chú ý không?"
- "Phân loại hộp thư 8 giờ qua giúp tôi"
- "Từ sáng đến giờ có thư gì mới?"
- "Có email gấp nào tôi cần xử lý không?"
- "Phân loại hộp thư, bỏ qua mọi thứ từ Jira và tên miền marketing"
- "Kiểm tra email trong 24 giờ qua, đánh dấu mọi thứ từ [tên khách hàng]"
- "Hôm nay tôi cần trả lời những email nào?"
