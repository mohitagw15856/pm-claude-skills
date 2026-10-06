---
name: meeting-notes
language: vi
description: "Cấu trúc và định dạng biên bản cuộc họp theo các thực hành tốt nhất của PM. Dùng khi được yêu cầu soạn biên bản họp, định dạng ghi chú thảo luận, ghi lại các đầu việc cần làm hoặc ghi nhận các quyết định từ bất kỳ loại cuộc họp nào. Tạo ra biên bản có cấu trúc gồm các quyết định, đầu việc (người phụ trách + hạn chót), câu hỏi còn bỏ ngỏ và các bước tiếp theo."
version: 1.0.0
---

> Bản dịch tiếng Việt của [meeting-notes](../../../skills/meeting-notes/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Biên bản Cuộc họp

Kỹ năng này giúp cấu trúc biên bản cuộc họp để tối đa hóa giá trị và đảm bảo mọi việc được theo dõi đến cùng.

## Thông tin đầu vào cần có

Hỏi người dùng những thông tin sau nếu chưa được cung cấp:
- **Tên và ngày diễn ra cuộc họp**
- **Người tham dự** (tên và vai trò)
- **Ghi chú thô hoặc bản ghi lời thoại** (dán ghi chú thảo luận, bản transcript, hoặc mô tả những gì đã được bàn)
- **Loại cuộc họp** (1:1 / sprint planning / product review / đồng bộ với các bên liên quan / khác): quyết định mẫu nào sẽ được dùng

## Đọc từ / Ghi vào Brain

Nếu có [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), đây là nơi biên bản trở thành bộ nhớ lâu dài:

- **Đọc trước:** các file liên quan trong `stakeholders/` (để bạn bước vào cuộc họp đã nắm được các yêu cầu
  và mối quan tâm còn tồn đọng của từng người tham dự) và mọi `decisions/` mà cuộc họp xem xét lại.
- **Ghi sau:** thêm từng **quyết định** (kèm lý do và điều kiện `reopen-when`) vào
  `decisions/`, bổ sung các **yêu cầu/mối quan tâm** mới vào đúng file trong `stakeholders/`, và đánh dấu mọi
  **giả định** mới vào `hypotheses/`. Gắn nhãn nguồn gốc cho mọi thông tin được ghi lại: phần lớn phát biểu
  trong cuộc họp là `[verbal]` cho đến khi được xác nhận độc lập. Lưu ghi chú thô vào `source/`.

## Mẫu Biên bản Cuộc họp Chuẩn

### Phần đầu biên bản
**Cuộc họp**: [Meeting Title]  
**Ngày**: [Date]  
**Người tham dự**: [Names/Roles]  
**Người ghi biên bản**: [Name]  
**Thời lượng**: [Actual duration]

### Chương trình họp
- [ ] Chủ đề 1
- [ ] Chủ đề 2
- [ ] Chủ đề 3

*(Đánh dấu các mục khi đã thảo luận)*

### Các quyết định đã đưa ra
Ghi nhận rõ ràng các quyết định:

**Quyết định**: [What was decided]  
**Bối cảnh**: [Why this decision]  
**Người phụ trách**: [Who's responsible for executing]  
**Hạn chót**: [When if applicable]  

Dùng định dạng này cho từng quyết định.

### Đầu việc cần làm
Mọi đầu việc cần có dạng:
- [ ] **[Action item]** - @Owner - Hạn: [Date]
- [ ] **[Action item]** - @Owner - Hạn: [Date]

Định dạng:
- Hành động rõ ràng, cụ thể
- Một người phụ trách duy nhất (không giao cho "cả team")
- Hạn chót cụ thể
- Ô đánh dấu để theo dõi

### Ghi chú thảo luận
Các điểm chính được thảo luận, sắp xếp theo chủ đề:

**Chủ đề 1: [Name]**
- Điểm chính hoặc nội dung nổi bật của cuộc thảo luận
- Bối cảnh quan trọng hoặc mối lo ngại được nêu ra
- Dữ liệu hoặc thông tin được chia sẻ

**Chủ đề 2: [Name]**
- Các điểm thảo luận chính
- Quyết định hoặc kết luận đạt được

### Câu hỏi bỏ ngỏ / Cần theo dõi
Những câu hỏi chưa có câu trả lời:
- **Câu hỏi**: [What we need to know]
- **Người phụ trách**: [Who will find out]
- **Hạn**: [Deadline]

### Các bước tiếp theo
Tóm tắt rõ ràng những gì sẽ diễn ra tiếp theo:
1. [Immediate next action]
2. [Follow-up meeting if needed]
3. [Any broader process to start]

## Thực hành tốt nhất

**Trong cuộc họp:**
- Tập trung vào quyết định và đầu việc thay vì lời qua tiếng lại
- Ghi lại các cam kết cụ thể, không ghi thảo luận chung chung
- Ghi nhận ý kiến phản đối đối với các quyết định quan trọng
- Yêu cầu làm rõ các cam kết mơ hồ ("Để tôi xem thử" → "Tôi sẽ phân tích dữ liệu và chia sẻ kết quả trước thứ Sáu")

**Sau cuộc họp:**
- Gửi biên bản trong vòng 2 giờ khi thông tin còn mới
- Tag người phụ trách đầu việc (@mention họ)
- Đính kèm link đến các tài liệu liên quan
- Theo dõi các đầu việc quá hạn

**Những gì cần ghi lại:**
✅ Các quyết định đã đưa ra
✅ Đầu việc kèm người phụ trách và hạn chót
✅ Các điểm thảo luận chính
✅ Câu hỏi bỏ ngỏ
✅ Các bước tiếp theo

**Những gì nên bỏ qua:**
❌ Bản ghi nguyên văn từng lời
❌ Các chủ đề lạc đề
❌ Phần thảo luận sơ bộ trước khi ra quyết định
❌ Thông tin trùng lặp

## Các loại cuộc họp và cách điều chỉnh

### Họp 1:1
Tập trung vào:
- Thảo luận về phát triển sự nghiệp
- Phản hồi (theo cả hai chiều)
- Những khó khăn hiện tại
- Đầu việc cho cả hai bên

Bổ sung vào mẫu:
- **Thành công gần đây**: Những gì đang diễn ra tốt
- **Khó khăn**: Những gì chưa ổn
- **Thảo luận sự nghiệp**: Các chủ đề phát triển
- **Phản hồi**: Cho cả hai bên

### Sprint Planning
Tập trung vào:
- Tiêu chí chấp nhận (acceptance criteria) của story
- Quyết định về sizing/ước lượng
- Xác định các phụ thuộc
- Cam kết của sprint

Bổ sung vào mẫu:
- **Mục tiêu sprint**: Những gì chúng ta cam kết
- **Story Points**: Năng lực và ước lượng
- **Phụ thuộc**: Các yếu tố chặn từ bên ngoài
- **Definition of Done**: Tiêu chí chấp nhận

### Product Review
Tập trung vào:
- Các quyết định thiết kế
- Phản hồi người dùng được thảo luận
- Các thay đổi được yêu cầu
- Đánh giá mức độ sẵn sàng ra mắt

Bổ sung vào mẫu:
- **Quyết định thiết kế**: Những gì được duyệt/bị từ chối
- **Phản hồi người dùng**: Các insight chính được thảo luận
- **Câu hỏi thiết kế còn mở**: Những gì cần lặp lại cải tiến
- **Tiêu chí ra mắt**: Các yêu cầu còn lại

### Đồng bộ với các bên liên quan
Tập trung vào:
- Cập nhật tiến độ đã trình bày
- Các mối lo ngại được nêu ra
- Các phê duyệt đã nhận
- Nhu cầu escalation

Bổ sung vào mẫu:
- **Tổng quan tình hình**: Tiến độ ở mức tổng thể
- **Phê duyệt đã nhận**: Các xác nhận đồng ý đã có
- **Escalation**: Các vấn đề đã nâng lên các bên liên quan
- **Buổi đồng bộ tiếp theo**: Khi nào và sẽ bàn gì

## Ví dụ Biên bản Cuộc họp

```
# Review Roadmap Sản phẩm - Q1 2026
**Ngày**: 20 tháng 1, 2026  
**Người tham dự**: Sarah (CPO), Mike (Eng Lead), Jennifer (Design), Tom (PM)  
**Người ghi biên bản**: Tom  
**Thời lượng**: 45 phút

## Chương trình họp
- [x] Review các tính năng dự kiến cho Q1
- [x] Thảo luận về giới hạn nguồn lực
- [x] Thảo luận về thứ tự ưu tiên
- [x] Thống nhất timeline

## Các quyết định đã đưa ra

**Quyết định**: Dời multi-channel dashboard sang Q2, ưu tiên cải thiện ứng dụng mobile trong Q1  
**Bối cảnh**: Phản hồi khách hàng cho thấy trải nghiệm mobile đang ảnh hưởng đáng kể đến tỷ lệ giữ chân (65% người dùng chủ yếu dùng mobile). Đội kỹ thuật chỉ có thể đảm nhận một sáng kiến lớn trong quý này.  
**Người phụ trách**: Tom (PM) thông báo cho các bên liên quan  
**Hạn chót**: 22 tháng 1

**Quyết định**: Dành 20% thời gian kỹ thuật cho technical debt  
**Bối cảnh**: Tech debt tích tụ đang làm chậm việc phát triển tính năng. Velocity của team giảm 30% trong quý trước.  
**Người phụ trách**: Mike (Eng Lead) lập backlog tech debt  
**Hạn chót**: 27 tháng 1

**Quyết định**: Chạy bản beta mobile với 100 người dùng trước khi ra mắt toàn bộ
**Bối cảnh**: Cần kiểm chứng các cải tiến trên nhiều loại thiết bị khác nhau
**Người phụ trách**: Jennifer (Design) phối hợp với QA
**Hạn chót**: 10 tháng 2

## Đầu việc cần làm
- [ ] **Cập nhật slide roadmap Q1 theo thứ tự ưu tiên mới** - @Tom - Hạn: 22/1
- [ ] **Lên lịch họp thống nhất với team hỗ trợ về việc dời dashboard** - @Tom - Hạn: 24/1
- [ ] **Xây dựng bộ tiêu chí ưu tiên tech debt** - @Mike - Hạn: 27/1
- [ ] **Chạy user testing cho thiết kế mobile** - @Jennifer - Hạn: 3/2
- [ ] **Ghi lại lý do của quyết định cho ban lãnh đạo** - @Sarah - Hạn: 23/1
- [ ] **Xác định 100 người dùng beta cho mobile** - @Tom - Hạn: 1/2

## Ghi chú thảo luận

**Ưu tiên tính năng Q1**
- Giữ chân khách hàng là ưu tiên số 1 của công ty trong quý này
- Điểm NPS của ứng dụng mobile là 6.2 (so với 8.1 của web)
- Mobile chiếm 65% người dùng hoạt động hằng ngày
- Multi-channel dashboard sẽ tốn 8 tuần kỹ thuật
- Cải thiện mobile ước tính 6 tuần kỹ thuật với ROI cao hơn
- Sales đang có 3 deal doanh nghiệp chờ tính năng dashboard

**Giới hạn nguồn lực**
- Hiện có 4 kỹ sư (giảm từ 6 trong quý trước do nghỉ việc)
- Team thiết kế có thể hỗ trợ cả hai sáng kiến nhưng với năng lực giảm
- Team QA cần 2 tuần để kiểm thử kỹ trên mobile
- Một kỹ sư được điều sang team bảo mật đến hết tháng 2

**Thảo luận rủi ro**
- Dời dashboard có thể ảnh hưởng đến doanh số doanh nghiệp (3 deal đang chờ)
- Sarah lưu ý: "Chúng ta có thể định vị các cải tiến mobile là nền tảng cho các tính năng doanh nghiệp"
- Mike nêu lo ngại về độ ổn định của tech stack mobile, đã được giải quyết qua phần thời gian dành cho tech debt
- Cần truyền đạt rõ ràng với Sales về việc thay đổi timeline

**Kế hoạch triển khai mobile**
- Tuần 1-2: Tinh chỉnh thiết kế dựa trên phản hồi người dùng
- Tuần 3-4: Triển khai kỹ thuật
- Tuần 5: Kiểm thử nội bộ
- Tuần 6: Beta với 100 người dùng
- Tuần 7: Ra mắt toàn bộ

## Câu hỏi bỏ ngỏ
- **Câu hỏi**: Pipeline doanh nghiệp bị ảnh hưởng thế nào nếu dời dashboard?  
  **Người phụ trách**: Sarah sẽ hỏi lại lãnh đạo Sales  
  **Hạn**: 23 tháng 1

- **Câu hỏi**: Có thể làm bản beta giới hạn của dashboard cho khách hàng doanh nghiệp không?  
  **Người phụ trách**: Tom sẽ cùng Mike tìm hiểu phạm vi MVP  
  **Hạn**: 25 tháng 1

- **Câu hỏi**: Kế hoạch của chúng ta là gì nếu cải tiến mobile không đạt chỉ số mục tiêu?
  **Người phụ trách**: Tom sẽ lập kế hoạch dự phòng
  **Hạn**: 27 tháng 1

## Các bước tiếp theo
1. Tom gửi roadmap cập nhật cho ban lãnh đạo trước cuối ngày thứ Tư (22/1)
2. Team bắt đầu sprint planning cho cải tiến mobile vào thứ Hai tới (27/1)
3. Họp tiếp vào 1/2 để review tiến độ và xác nhận lại thứ tự ưu tiên
4. Sarah trình bày lý do của quyết định với ban điều hành vào 24/1

---

**Cuộc họp tiếp theo**: 1 tháng 2, 2026 - Check-in tiến độ
**Đã gửi biên bản**: 20 tháng 1, 2026 lúc 17:30
```

## Tài liệu chuyên sâu

Kỹ năng này đi kèm các file hỗ trợ, hãy dùng chúng khi có sẵn:

- **[`references/decisions-vs-discussion.md`](../../../skills/meeting-notes/references/decisions-vs-discussion.md)**: Tách bạch Quyết định và Thảo luận. Áp dụng khi soạn đầu ra; tài liệu này chứa các hiệu chỉnh và những phán đoán mà phần tóm tắt phương pháp ở trên đã rút gọn.
- **[`templates/notes-skeleton.md`](../../../skills/meeting-notes/templates/notes-skeleton.md)**: phiên bản điền sẵn của sản phẩm đầu ra, có các tiêu chí kiểm tra chất lượng ngay trong đó. Đề xuất khi người dùng muốn tự làm tài liệu thay vì để Claude tạo.

## Thang điểm đánh giá (0-40)

Chấm điểm mọi đầu ra của kỹ năng này trước khi bàn giao; từ 32 điểm trở lên là đạt chất lượng để gửi đi.

| Tiêu chí | 0 | 5 | 10 |
|---|---|---|---|
| Trách nhiệm với đầu việc | Đầu việc giao cho "cả team" hoặc không ai, không có ngày | Có tên người phụ trách nhưng hạn chót mơ hồ ("tuần sau", "sớm thôi") hoặc nhiều người cùng phụ trách một cục | Mỗi đầu việc có đúng một người phụ trách có tên và một ngày cụ thể; việc chung được tách thành các đầu việc riêng có người phụ trách |
| Truy vết quyết định | Quyết định bị chôn trong phần thảo luận hoặc ghi lại mà không có lý do | Quyết định được liệt kê kèm người phụ trách nhưng lý do sơ sài; ý kiến bất đồng không được thể hiện | Mỗi quyết định có bối cảnh, người phụ trách và hạn chót; ý kiến phản đối được ghi ngay trong quyết định kèm điều kiện xem xét lại, không bị làm mờ đi |
| Tổng hợp thay vì ghi nguyên văn | Ghi nguyên văn ai nói gì theo thứ tự | Bản ghi đã rút gọn và nhóm theo chủ đề nhưng vẫn là đối thoại chứ chưa được chắt lọc | Thảo luận được rút gọn còn các điểm then chốt; trích dẫn chỉ xuất hiện khi có sức nặng đối với quyết định |
| Khép vòng | Câu hỏi bỏ ngỏ, chủ đề bị hoãn và các escalation bị bỏ rơi trong im lặng | Có liệt kê các mục còn mở nhưng không có người phụ trách hoặc ngày; các mục bị hoãn biến mất khỏi các bước tiếp theo | Mọi câu hỏi bỏ ngỏ có người phụ trách và hạn; các mục bị hoãn xuất hiện lại trong các bước tiếp theo kèm ngày; biên bản được gửi trong khung 2 giờ |

## Kiểm tra chất lượng

- [ ] Mọi đầu việc có một người phụ trách duy nhất có tên (không phải "team")
- [ ] Mọi đầu việc có hạn chót cụ thể
- [ ] Các quyết định có kèm bối cảnh (lý do đưa ra quyết định)
- [ ] Các câu hỏi bỏ ngỏ có người phụ trách và "hạn"
- [ ] Không ghi nguyên văn, chỉ tổng hợp

## Các lỗi cần tránh

- [ ] Không giao đầu việc cho "cả team" hay "mọi người": mỗi đầu việc phải có đúng một người phụ trách có tên, nếu không sẽ không bao giờ được hoàn thành
- [ ] Không ghi lại nội dung nguyên văn: biên bản họp ghi nhận quyết định và cam kết, không phải toàn bộ diễn biến cuộc trò chuyện để đi đến đó
- [ ] Không bỏ qua bối cảnh của quyết định: một quyết định không kèm lý do sẽ vô dụng khi sáu tháng sau có người hỏi "sao hồi đó mình lại làm vậy?"
- [ ] Không để câu hỏi bỏ ngỏ mà không có người phụ trách và hạn chót: một câu hỏi chưa được trả lời và không ai được giao theo dõi chính là một quyết định đang bị chặn
- [ ] Không gửi biên bản muộn quá 2 giờ sau cuộc họp: biên bản gửi vào ngày hôm sau sẽ bỏ lỡ thời điểm người phụ trách có thể hành động khi cam kết còn mới

## Phân phối biên bản

**Định dạng tiêu đề email**: "Biên bản [Meeting Type] - [Date] - [Key Topic]"

Ví dụ: "Biên bản Review Roadmap Sản phẩm - 20/1 - Ưu tiên Q1"

**Người nhận**:
- Tất cả người tham dự
- Bất kỳ ai được nhắc đến trong đầu việc
- Bất kỳ ai đã yêu cầu nhận biên bản

**Theo dõi**:
- Gửi nhắc nhở 3 ngày trước hạn của đầu việc
- Tổng hợp hằng tuần tất cả đầu việc còn mở
- Đánh dấu đầu việc đã hoàn thành và chia sẻ cập nhật

## Thực thi

Dành cho các agent có dùng công cụ và đã kết nối MCP server (Notion, Linear/Jira, Slack). Các môi trường chạy không có quyền truy cập công cụ thì bỏ qua phần này và chỉ bàn giao tài liệu. Xem [SKILLSPEC.md §5](../../../SKILLSPEC.md) và [connectors/mcp-pairings.md](../../../connectors/mcp-pairings.md).

### Điều kiện tiên quyết
- Biên bản có cấu trúc ở trên đã được trình cho người dùng và **được phê duyệt rõ ràng**, bao gồm cả nơi lưu (database/trang Notion nào, dự án tracker nào).
- Các MCP server đã được kết nối và xác thực sẵn trong môi trường của agent.
- Mỗi đầu việc đều có người phụ trách có tên: các mục chưa có người phụ trách phải được xử lý với người dùng trước, tuyệt đối không giao theo phỏng đoán.

### Hành động được phép
- Tạo MỘT trang trong database Notion đã được duyệt (hoặc công cụ tài liệu tương đương) chứa nguyên văn biên bản đã được phê duyệt.
- Tạo một issue trên tracker cho mỗi đầu việc đã được duyệt (tiêu đề, người phụ trách, hạn chót lấy từ biên bản) trong dự án đã được duyệt.
- Đăng link trang (chỉ link và một dòng tóm tắt) lên kênh đã được duyệt, nếu người dùng có chỉ định kênh.
- Không làm gì khác: không chỉnh sửa trang/issue có sẵn, không mời hay thông báo cho ai ngoài kênh đã chỉ định, không ghi vào lịch.

### Xác minh
- Mở lại trang vừa tạo và từng issue vừa tạo; xác nhận tiêu đề, người phụ trách và ngày khớp với biên bản đã duyệt.
- Báo lại cho người dùng mọi URL đã tạo trong một danh sách.

### Hoàn tác
- Hoàn tác = lưu trữ/xóa trang và các issue vừa tạo, chỉ khi người dùng yêu cầu rõ ràng.
- Dừng lại và hỏi người dùng nếu: không tìm thấy database/dự án đích, việc tạo issue thất bại giữa chừng (báo lại những gì ĐÃ được tạo), hoặc người phụ trách đầu việc không tồn tại trong tracker.

## Ví dụ câu kích hoạt

- "Tạo biên bản cuộc họp."
- "Định dạng ghi chú thảo luận."
- "Ghi lại các việc cần làm."
- "Ghi lại các quyết định của cuộc họp."
