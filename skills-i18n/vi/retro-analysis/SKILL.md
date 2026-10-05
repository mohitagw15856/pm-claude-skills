---
name: retro-analysis
language: vi
description: "Phân tích dữ liệu bàn giao của sprint và tạo ra bản brief retrospective có cấu trúc. Dùng khi được yêu cầu tổ chức retrospective, phân tích dữ liệu sprint, chuẩn bị brief cho buổi retro hoặc biến chỉ số sprint thành gợi ý thảo luận. Tạo ra một bản brief retrospective dựa trên dữ liệu gồm số liệu hoàn thành, phân tích xu hướng, gợi ý Start/Stop/Continue và một thử nghiệm cụ thể cho sprint tiếp theo."
---

> Bản dịch tiếng Việt của [retro-analysis](../../../skills/retro-analysis/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Phân tích Retrospective

Tạo một bản brief retrospective dựa trên dữ liệu, tách bạch sự thật với cảm nhận, để nhóm dành thời gian retro cho giải pháp thay vì tranh luận chuyện gì đã xảy ra.

## Thông tin đầu vào cần có

Hỏi người dùng nếu chưa được cung cấp:
- **Ticket của sprint: kế hoạch so với hoàn thành**
- **Ticket chuyển sang sprint sau (carry-over) và lý do** (nếu biết)
- **Ticket bị mở lại sau khi đóng** (tín hiệu chất lượng)
- **Sự cố hoặc công việc phát sinh ngoài kế hoạch** (tín hiệu phình phạm vi)
- **Velocity của sprint so với trung bình lịch sử** (bối cảnh xu hướng)

## Quy trình
1. Tính toán: tỷ lệ hoàn thành, tỷ lệ carry-over, phần trăm công việc ngoài kế hoạch
2. Nhận diện xu hướng: loại ticket nào dễ bị carry-over nhất? Loại nào gây vướng mắc?
3. Ghi nhận mọi đứt gãy về quy trình hoặc giao tiếp thể hiện trong dữ liệu
4. Chuẩn bị 3 gợi ý "Start / Stop / Continue" dựa trên dữ liệu: không chung chung, phải cụ thể cho sprint này
5. Đề xuất 1 thử nghiệm cụ thể cho sprint tiếp theo dựa trên điểm ma sát lớn nhất
6. **Xác minh**: đảm bảo mỗi gợi ý cụ thể cho sprint này (không phải gợi ý chung chung dùng lại) và thử nghiệm đề xuất là cụ thể, đo lường được

## Cấu trúc đầu ra

### Brief Retrospective Sprint [Số]

**Theo số liệu:**
- Kế hoạch: [n] ticket | Hoàn thành: [n] | Carry-over: [n] | Tỷ lệ hoàn thành: [%]
- Công việc ngoài kế hoạch: [n] ticket ([%] năng lực)
- Velocity: [điểm] so với trung bình [trung bình]

**Dữ liệu cho thấy điều gì:**
[2-3 nhận định dựa trên các con số trên]

**Gợi ý thảo luận:**
- Start: [gợi ý cụ thể dựa trên dữ liệu sprint này]
- Stop: [gợi ý cụ thể dựa trên dữ liệu sprint này]
- Continue: [gợi ý cụ thể dựa trên dữ liệu sprint này]

**Thử nghiệm đề xuất cho sprint tiếp theo:**
[Một thay đổi quy trình cụ thể, kiểm chứng được, kèm chỉ số thành công cụ thể]

## Tài liệu chuyên sâu

Kỹ năng này đi kèm các tệp hỗ trợ, hãy dùng khi có sẵn:

- **`references/root-cause-vs-symptom.md`** (xem [bản gốc](../../../skills/retro-analysis/references/root-cause-vs-symptom.md)): Những buổi retro tạo ra thay đổi: nguyên nhân gốc rễ và triệu chứng. Áp dụng khi tạo đầu ra; tài liệu này chứa các phán đoán và cách hiệu chỉnh mà phần tóm lược phương pháp ở trên đã rút gọn.
- **`templates/retro-board.md`** (xem [bản gốc](../../../skills/retro-analysis/templates/retro-board.md)): phiên bản điền sẵn của sản phẩm đầu ra, có các tiêu chí chất lượng ngay trong mẫu. Đề xuất khi người dùng muốn tự làm tài liệu thay vì để Claude tạo.

## Thang chấm điểm (0-40)

Chấm điểm mọi đầu ra của kỹ năng này trước khi bàn giao; từ 32 trở lên là đạt chất lượng phát hành.

| Tiêu chí | 0 | 5 | 10 |
|---|---|---|---|
| **Dựa trên dữ liệu** | Thiếu hoặc sai số liệu; nhận định là ý kiến không có nguồn truy vết | Các tỷ lệ cốt lõi được tính đúng, nhưng nhận định chỉ nhắc lại con số mà không phân tích xu hướng (loại ticket, so sánh lịch sử) | Mọi nhận định đều truy về một con số đã tính, carry-over được phân tách theo loại/nguyên nhân, và velocity được so với xu hướng lịch sử chứ không chỉ với trung bình |
| **Không đổ lỗi** | Brief nêu tên hoặc ngầm chỉ cá nhân/bộ phận là nguyên nhân ("QA đã bỏ sót") | Lời lẽ trung lập nhưng cách đặt vấn đề vẫn hướng vào nỗ lực hay sự cẩn thận thay vì điều kiện hệ thống | Các kiểu thất bại được diễn đạt lại thành vấn đề quy trình/độ bao phủ/lịch trình mà dữ liệu thực sự ủng hộ; một người đọc phòng thủ cũng không thấy câu nào nhắm vào mình |
| **Gợi ý cụ thể** | Start/Stop/Continue là các nhóm chung chung dùng lại ("giao tiếp tốt hơn") | Gợi ý có nhắc đến sprint này nhưng vẫn ở mức nhóm chung, không có số liệu, không nêu hành vi cụ thể | Mỗi gợi ý gắn chặt với dữ liệu sprint này, nêu một hành vi cụ thể và được diễn đạt để mở ra thảo luận chứ không áp đặt câu trả lời |
| **Chất lượng thử nghiệm** | Không có thử nghiệm, hoặc một sáng kiến kéo dài nhiều quý khoác áo thử nghiệm | Một thay đổi cụ thể, nhưng không đo được thành công hoặc không đánh giá được ở buổi retro tiếp theo | Một thay đổi quy trình kiểm chứng được trong một sprint, có chỉ số thành công rõ ràng và nêu cái giá nếu sai, kiểm tra được ở buổi retro tiếp theo |

## Kiểm tra chất lượng

- [ ] Mỗi gợi ý Start/Stop/Continue nêu một hành vi cụ thể, không phải một nhóm chung chung
- [ ] Thử nghiệm đề xuất có thể kiểm chứng trong một sprint
- [ ] Phân tích carry-over chỉ ra loại ticket hoặc nguyên nhân, không chỉ số lượng
- [ ] Các nhận định từ dữ liệu không đổ lỗi, chỉ mô tả xu hướng
- [ ] Xu hướng velocity được đặt trong bối cảnh (đây là trường hợp cá biệt hay là một xu hướng?)

## Những lỗi cần tránh

- [ ] Không đổ lỗi cho cá nhân trong brief retrospective: nhận định phải mô tả xu hướng, không phải con người
- [ ] Không đưa ra gợi ý Start/Stop/Continue là những nhóm chung chung: mỗi gợi ý phải nêu một hành vi cụ thể
- [ ] Không đề xuất thử nghiệm không thể hoàn thành trong một sprint: chỉ những thử nghiệm nhỏ, kiểm chứng được
- [ ] Không coi ticket carry-over là vấn đề velocity khi chưa xác định nhóm nguyên nhân gốc rễ
- [ ] Không dùng cùng một hình thức retrospective cho mọi sprint: thay đổi hình thức để tránh nhóm bị nhàm chán
