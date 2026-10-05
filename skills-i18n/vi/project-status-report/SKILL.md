---
name: project-status-report
language: vi
description: "Viết báo cáo tình trạng dự án có cấu trúc cho bất kỳ dự án nào. Dùng khi được yêu cầu viết bản cập nhật dự án, báo cáo tình trạng, báo cáo RAG, phần diễn giải cho dashboard dự án hoặc thông báo dự án hằng tuần. Tạo ra một báo cáo tình trạng rõ ràng với đánh giá RAG, tiến độ các mốc, rủi ro và các quyết định cần đưa ra."
---

> Bản dịch tiếng Việt của [project-status-report](../../../skills/project-status-report/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Báo cáo tình trạng dự án

Tạo ra một báo cáo tình trạng dự án rõ ràng, có cấu trúc: bản thông tin hằng tuần giúp các bên liên quan nắm được tình hình mà không cần họp.

## Thông tin đầu vào cần có
- **Tên dự án**
- **Kỳ báo cáo**
- **Trạng thái RAG hiện tại** (Đỏ / Vàng / Xanh)
- **Các mốc chính** (đến hạn, đã hoàn thành, sắp tới)
- **Vấn đề hoặc điểm vướng mắc**
- **Các quyết định cần từ các bên liên quan**
- **Tình hình ngân sách** (nếu có theo dõi)
- **Đối tượng đọc** (ban chỉ đạo / nhà tài trợ dự án / PMO / toàn bộ nhóm)

## Cấu trúc đầu ra

---

# Báo cáo tình trạng dự án: [Tên dự án]
**Kỳ báo cáo:** [Khoảng thời gian] | **Người viết:** [PM] | **Báo cáo tiếp theo:** [Ngày]

---

### Tình trạng tổng thể

| Khía cạnh | Trạng thái | Kỳ trước | Xu hướng |
|---|---|---|---|
| Tổng thể | Đỏ / Vàng / Xanh | [Kỳ trước] | Cải thiện / Ổn định / Đi xuống |
| Tiến độ | | | |
| Ngân sách | | | |
| Phạm vi | | | |
| Rủi ro | | | |

Định nghĩa RAG:
- Xanh: Đúng hướng. Không có vấn đề đáng kể.
- Vàng: Có rủi ro. Đã xác định vấn đề nhưng đã có biện pháp giảm thiểu.
- Đỏ: Chệch hướng. Cần leo thang hoặc ra quyết định để khôi phục.

---

### Tóm tắt cho lãnh đạo
[3-5 câu. Câu chuyện chính. Nếu là Đỏ, nói ngay và nêu lý do. Không bao giờ giấu tin xấu sau tin tốt.]

---

### Tiến độ các mốc

| Mốc | Hạn | Trạng thái | Ghi chú |
|---|---|---|---|
| [Mốc] | [Ngày] | Hoàn thành / Có rủi ro / Trễ / Đúng tiến độ | [Một dòng] |

**Đã hoàn thành trong kỳ:** [Những gì đã bàn giao]
**Đến hạn kỳ tới:** [Những gì dự kiến]

---

### Vấn đề và điểm vướng mắc

**[Tên vấn đề]: Nghiêm trọng / Cao / Thấp**
- **Mô tả:** [Vấn đề là gì]
- **Tác động:** [Điều gì xảy ra nếu không được giải quyết]
- **Người phụ trách:** [Ai đang giải quyết]
- **Hành động:** [Đang làm gì]
- **Ngày giải quyết:** [Khi nào sẽ đóng]

---

### Rủi ro

| Rủi ro | Khả năng xảy ra | Tác động | Giảm thiểu | Người phụ trách |
|---|---|---|---|---|
| [Rủi ro] | C/TB/T | C/TB/T | [Hành động] | [Tên] |

---

### Các quyết định cần đưa ra

| Quyết định | Bối cảnh | Phương án | Khuyến nghị | Cần trước ngày |
|---|---|---|---|---|
| [Quyết định] | [Bối cảnh] | [Phương án] | [Khuyến nghị] | [Ngày] |

---

### Tóm tắt ngân sách

| | Ngân sách | Thực chi đến nay | Dự báo | Chênh lệch |
|---|---|---|---|---|
| Tổng | £ | £ | £ | £ F/A |

---

### Kế hoạch kỳ tới
[3-5 gạch đầu dòng cụ thể: những gì sẽ diễn ra trong kỳ tới]

## Quy tắc viết
- Không bao giờ làm nhẹ đi trạng thái Đỏ
- Các mốc là nhị phân: hoàn thành hoặc chưa hoàn thành
- Các quyết định phải thực sự có thể hành động được
- Giữ trong một trang nếu có thể

## Kiểm tra chất lượng

- [ ] Trạng thái Đỏ được nêu ngay (không bị giấu sau các điểm tích cực)
- [ ] Mọi vấn đề đều có người phụ trách cụ thể và ngày giải quyết
- [ ] Các quyết định cần đưa ra thực sự nằm trong quyền hành động của đối tượng đọc
- [ ] Các mốc là nhị phân (hoàn thành hoặc chưa, không có kiểu "xong 85%")
- [ ] Phần tóm tắt cho lãnh đạo đứng độc lập được với người không đọc gì khác

## Những lỗi cần tránh

- [ ] Không đánh giá sức khỏe dự án là Xanh trong khi vẫn liệt kê các điểm vướng mắc nghiêm trọng chưa giải quyết
- [ ] Không báo cáo tiến độ mốc theo phần trăm: các mốc là nhị phân, hoàn thành hoặc chưa hoàn thành
- [ ] Không chôn rủi ro ở cuối: nếu có gì rủi ro cao, nó phải nằm trong phần tóm tắt cho lãnh đạo
- [ ] Không để các quyết định cần đưa ra mà không nêu rõ ai phải quyết định và hạn chót khi nào
- [ ] Không viết phần tóm tắt cho lãnh đạo mà phải đọc cả báo cáo mới hiểu: nó phải đứng độc lập

## Ví dụ câu kích hoạt
- "Viết báo cáo tình trạng dự án cho [dự án]"
- "Tạo bản cập nhật trạng thái RAG cho [dự án]"
- "Viết báo cáo gửi ban chỉ đạo cho [dự án]"
