---
name: stakeholder-update
language: vi
description: "Soạn bản cập nhật ngắn gọn cho lãnh đạo và các bên liên quan theo khung BLUF (Bottom Line Up Front: nói kết luận trước). Dùng khi được yêu cầu viết bản cập nhật tình hình, báo cáo tiến độ, thông báo dự án hoặc bản tóm tắt cho ban lãnh đạo hay các bên liên quan. Tạo ra bản cập nhật mở đầu bằng BLUF, gồm trạng thái, chỉ số chính, rủi ro, các mốc sắp tới và các quyết định cần đưa ra, đọc xong trong chưa đầy 2 phút."
version: 1.0.0
---

> Bản dịch tiếng Việt của [stakeholder-update](../../../skills/stakeholder-update/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Cập nhật cho Các bên liên quan

Kỹ năng này giúp soạn các bản cập nhật tình hình hiệu quả cho lãnh đạo và các bên liên quan theo nguyên tắc BLUF (Bottom Line Up Front: nói kết luận trước).

## Thông tin đầu vào cần có

Hỏi người dùng những thông tin sau nếu chưa được cung cấp:
- **Dự án hoặc sản phẩm được báo cáo**
- **Đối tượng đọc** (CEO, hội đồng quản trị, trưởng các bộ phận liên quan, nhà đầu tư: ảnh hưởng đến độ sâu và hình thức)
- **Kỳ báo cáo** (tuần này / sprint này / tháng này)
- **Trạng thái hiện tại** (đúng tiến độ / có rủi ro / bị chặn)
- **Các chỉ số chính** cùng giá trị hiện tại so với mục tiêu

## Đọc từ / Ghi vào Brain

Nếu có [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), hãy dùng nó trước khi hỏi:

- **Đọc trước:** các file liên quan trong `stakeholders/` (mỗi người quan tâm điều gì và các yêu cầu trước đây của họ), `context.md` (giọng văn/sắc thái) và các `decisions/` gần đây để biết những gì đã thay đổi kể từ lần cập nhật trước.
- **Ghi sau:** thêm mọi yêu cầu, mối quan tâm hoặc cam kết mới phát sinh vào file `stakeholders/` tương ứng, có gắn nhãn nguồn gốc (`[verbal]` cho điều được nói trong cuộc họp nhưng chưa được ghi thành văn bản).

## Tài liệu chuyên sâu

- **[`references/status-honesty-guide.md`](../../../skills/stakeholder-update/references/status-honesty-guide.md)**: cách hiệu chỉnh khi chấm 🟢/🟡/🔴 (vấn đề "quả dưa hấu", quy tắc 🟡 liên tiếp, đặt lại baseline một cách trung thực) và cách diễn đạt tin xấu theo trình tự sự thật → tác động → hành động → đề nghị. Áp dụng bất cứ khi nào trạng thái là 🟡/🔴 hoặc ghi chú đầu vào nghe lạc quan hơn so với chỉ số.
- **[`templates/update-skeleton.md`](../../../skills/stakeholder-update/templates/update-skeleton.md)**: mẫu cập nhật một trang để điền, có sẵn các tiêu chí kiểm tra chất lượng và checklist trước khi gửi. Đề xuất cho người dùng muốn tự viết bản cập nhật.

## Cấu trúc bản cập nhật

### 1. BLUF (Nói kết luận trước)
Bắt đầu bằng thông tin quan trọng nhất:
- **Trạng thái**: 🟢 Đúng tiến độ / 🟡 Có rủi ro / 🔴 Bị chặn / ✅ Hoàn thành
- **Điểm mấu chốt**: Một câu tóm tắt tình hình hiện tại
- **Cần hỗ trợ**: Bạn cần gì từ các bên liên quan (nếu có)

### 2. Tóm tắt tiến độ
Tổng quan ngắn gọn về những gì đã đạt được:
- Những gì đã ra mắt trong kỳ
- Các mốc đã đạt
- Biến động của các chỉ số chính

Giới hạn tối đa 3-5 gạch đầu dòng.

### 3. Bảng chỉ số

**Chỉ số chính**
| Chỉ số | Hiện tại | Mục tiêu | Xu hướng | Trạng thái |
|--------|---------|--------|-------|--------|
| [Metric name] | [Value] | [Target] | ↑/→/↓ | 🟢/🟡/🔴 |

Chỉ đưa vào 3-5 chỉ số quan trọng nhất.

### 4. Rủi ro và điểm chặn

**Vấn đề ưu tiên cao:**
- **Vấn đề**: Mô tả ngắn gọn
- **Tác động**: Điều gì đang bị đe dọa
- **Giảm thiểu**: Bạn đang làm gì để xử lý
- **Cần hỗ trợ**: Các bên liên quan có thể làm gì (nếu có)

Chỉ đưa vào những vấn đề có ý nghĩa ở cấp lãnh đạo.

### 5. Các mốc sắp tới

**30 ngày tới:**
- Mốc (ngày dự kiến)
- Mốc (ngày dự kiến)

**90 ngày tới:**
- Mốc lớn (tháng)
- Mốc lớn (tháng)

### 6. Quyết định cần đưa ra (nếu có)
- **Quyết định**: Mô tả rõ ràng
- **Phương án**: 2-3 phương án kèm ưu/nhược điểm
- **Đề xuất**: Bạn đề xuất gì và vì sao
- **Thời hạn**: Khi nào cần có quyết định

## Hướng dẫn viết

**Giọng văn**: Chuyên nghiệp, súc tích, hướng đến hành động
**Độ dài**: Dưới 1 trang (hoặc 2 phút đọc)
**Tần suất**: Hằng tuần với dự án đang triển khai, hai tuần một lần với giai đoạn duy trì

**Nguyên tắc giao tiếp với lãnh đạo:**

1. **Nói kết luận trước, không kể quy trình**
   - ❌ "Tuần này chúng tôi đã chạy 5 thử nghiệm và phân tích dữ liệu..."
   - ✅ "Tỷ lệ chuyển đổi tăng 15% nhờ công tác tối ưu"

2. **Tập trung vào tác động, không liệt kê hoạt động**
   - ❌ "Đã thực hiện 12 buổi phỏng vấn khách hàng"
   - ✅ "Đã xác định rào cản số 1 khiến người dùng chưa áp dụng (thiết lập quá phức tạp)"

3. **Để vấn đề lộ diện sớm**
   - Không tô hồng rủi ro
   - Đề xuất giải pháp, không chỉ nêu vấn đề
   - Nói cụ thể cần hỗ trợ gì

4. **Dùng dữ liệu để kể câu chuyện**
   - Định lượng bất cứ khi nào có thể
   - Thể hiện xu hướng, không chỉ ảnh chụp tại một thời điểm
   - Gắn chỉ số với kết quả kinh doanh

5. **Giúp người đọc lướt nhanh**
   - Dùng tiêu đề và gạch đầu dòng
   - In đậm thông tin chính
   - Dùng ký hiệu trực quan (🟢🟡🔴, ↑→↓)

## Hướng dẫn về trạng thái

**🟢 Đúng tiến độ**: Đạt mọi mục tiêu, không có rủi ro đáng kể
**🟡 Có rủi ro**: Có vấn đề tiềm ẩn có thể ảnh hưởng đến việc bàn giao
**🔴 Bị chặn**: Vấn đề nghiêm trọng đang cản trở tiến độ, cần can thiệp

## Ví dụ bản cập nhật

```
# Cập nhật sản phẩm: Thiết kế lại quy trình Onboarding khách hàng
**Tuần 20/1/2026**

## BLUF
**Trạng thái**: 🟡 Có rủi ro  
**Điểm mấu chốt**: Luồng onboarding mới đang cho kết quả tốt khi thử nghiệm (+35% tỷ lệ hoàn thành), nhưng ngày ra mắt bị lùi một tuần do vấn đề tích hợp với hệ thống thanh toán.  
**Cần hỗ trợ**: Cần quyết định nên ra mắt onboarding riêng hay chờ sửa xong phần tích hợp thanh toán.

## Tóm tắt tiến độ
- Hoàn thành user testing với 24 người tham gia (94% phản hồi tích cực)
- Đã triển khai các cải tiến trải nghiệm cho người dùng lần đầu
- Đã xử lý 12/15 lỗi phát hiện trong QA
- Đội kỹ thuật đã phân bổ nguồn lực để sửa phần tích hợp thanh toán

## Chỉ số chính
| Chỉ số | Hiện tại | Mục tiêu | Xu hướng | Trạng thái |
|--------|---------|--------|-------|--------|
| Tỷ lệ hoàn thành onboarding | 45% | 60% | → | 🟡 |
| Thời gian đến giá trị đầu tiên | 4.2 phút | 3.0 phút | ↓ | 🟢 |
| Ticket hỗ trợ về thiết lập | 45/tuần | <30/tuần | ↓ | 🟢 |
| Tỷ lệ kích hoạt người dùng | 52% | 65% | → | 🟡 |

## Rủi ro và điểm chặn

**CAO: Chậm trễ tích hợp hệ thống thanh toán**
- **Tác động**: Người dùng không thể hoàn tất luồng onboarding; lùi ngày ra mắt 1-2 tuần
- **Nguyên nhân gốc**: Đơn vị xử lý thanh toán ngừng hỗ trợ API cũ, cần viết lại code
- **Giảm thiểu**: Đội kỹ thuật đã điều chuyển nguồn lực, dự kiến sửa xong ngày 3/2
- **Cần quyết định**: Ra mắt onboarding không kèm tích hợp thanh toán hay chờ sửa xong? (Xem bên dưới)

**TRUNG BÌNH: Độ bao phủ kiểm thử trên mobile**
- **Tác động**: Một số trường hợp biên trên các thiết bị Android đời cũ chưa được kiểm thử
- **Giảm thiểu**: Phối hợp với QA mở rộng ma trận kiểm thử; chạy beta với người dùng nội bộ trên nhiều loại thiết bị

## Các mốc sắp tới

**30 ngày tới:**
- Xử lý xong tích hợp thanh toán (3/2)
- Ra mắt onboarding mới (5/2 hoặc 12/2 tùy quyết định)
- Bắt đầu đo lường tác động lên chuyển đổi (12/2)

**90 ngày tới:**
- Cải tiến dựa trên dữ liệu thực tế (tháng 3)
- Mở rộng sang ứng dụng mobile (tháng 4)
- Ra mắt các tính năng nâng cao (tháng 5)

## Quyết định cần đưa ra

**Có nên ra mắt onboarding tách riêng khỏi tích hợp thanh toán không?**

**Phương án A: Ra mắt ngay (Đề xuất)**
- Ưu điểm: Người dùng hưởng ngay mức cải thiện 35% tỷ lệ hoàn thành, thu thập dữ liệu thực tế, giữ được đà
- Nhược điểm: Người dùng phải thanh toán qua luồng cũ, trải nghiệm hơi rời rạc
- Thời gian: Ra mắt 5/2

**Phương án B: Chờ sửa xong thanh toán**
- Ưu điểm: Trải nghiệm tích hợp trọn vẹn ngay từ ngày đầu, không phát sinh technical debt
- Nhược điểm: Lùi lợi ích 2 tuần, mục tiêu chỉ số Q1 bị đe dọa, team mất đà
- Thời gian: Ra mắt 12/2

**Đề xuất**: Phương án A. Các cải tiến onboarding có giá trị độc lập, và luồng thanh toán cũ vẫn hoạt động tốt. Việc chờ đợi có nguy cơ trượt mục tiêu Q1 và làm chậm việc đưa các cải tiến đã được kiểm chứng đến người dùng.

**Thời hạn**: Cần quyết định trước 22/1 để ra mắt ngày 5/2.

---

**Có câu hỏi?** Trả lời email này hoặc nhắn tôi trên Slack.
```

## Hướng dẫn về tần suất

**Daily standup**: 
- Siêu ngắn (3 gạch đầu dòng)
- Hôm qua đã ra mắt gì
- Hôm nay sẽ ra mắt gì
- Điểm chặn

**Cập nhật hằng tuần**:
- Dùng đầy đủ mẫu ở trên
- Tập trung vào tiến độ và rủi ro
- Giới hạn trong 1 trang

**Review hằng tháng**:
- Phân tích chỉ số sâu hơn
- Nhìn lại ở góc độ chiến lược
- Tiến độ mục tiêu quý
- Có thể dài hơn (2-3 trang)

**Quarterly business review (QBR)**:
- Phân tích toàn diện
- Xu hướng theo thời gian
- Đề xuất chiến lược
- Định dạng trình chiếu

## Điều chỉnh theo đối tượng đọc

### Cho ban điều hành cấp C
- Mở đầu bằng tác động kinh doanh
- Gắn với OKR của công ty
- Tập trung vào chiến lược và kết quả
- Hạn chế tối đa chi tiết kỹ thuật

### Cho lãnh đạo Product/Engineering
- Đưa vào bối cảnh kỹ thuật
- Thể hiện tiến độ sprint/mốc
- Thảo luận các hệ quả về kiến trúc
- Nhắc đến technical debt

### Cho các team liên chức năng
- Cân bằng giữa bối cảnh kỹ thuật và kinh doanh
- Làm nổi bật các phụ thuộc
- Nêu rõ nhu cầu phối hợp
- Nói rõ các đề nghị

### Cho hội đồng quản trị/nhà đầu tư
- Tập trung vào chỉ số và traction
- Vị thế cạnh tranh
- Cơ hội thị trường
- Tác động tài chính

## Thang điểm đánh giá (0-40)

Chấm điểm mọi đầu ra của kỹ năng này trước khi bàn giao; từ 32 điểm trở lên là đạt chất lượng để gửi đi.

| Tiêu chí | 0 | 5 | 10 |
|---|---|---|---|
| **BLUF và sự trung thực về trạng thái** | Trạng thái bị chôn vùi hoặc thiếu; bản cập nhật đọc như nhật ký hoạt động | Trạng thái và điểm mấu chốt nằm ở đầu, nhưng emoji tô đẹp hơn so với chỉ số (xanh vỏ, đỏ lòng) | Ba dòng đầu nêu trạng thái, điểm mấu chốt trong một câu và đề nghị; mức 🟢/🟡/🔴 khớp với chỉ số quan trọng tệ nhất và giải thích vì sao |
| **Bối cảnh của chỉ số** | Số liệu thô không có mục tiêu, xu hướng hay so sánh theo kỳ | Có mục tiêu, nhưng chỉ số chỉ là số đếm hoạt động, không gắn với kết quả kinh doanh | 3-5 chỉ số, mỗi chỉ số có mục tiêu, xu hướng và trạng thái, và những chỉ số quan trọng được gắn với doanh thu, khách hàng hoặc mục tiêu đang bị đe dọa |
| **Tính hành động của rủi ro** | Rủi ro được liệt kê như nỗi lo, không có người phụ trách, biện pháp giảm thiểu hay tác động | Có nêu biện pháp giảm thiểu, nhưng tác động chưa được định lượng và không rõ người đọc có cần làm gì không | Mọi rủi ro có tác động được định lượng, biện pháp giảm thiểu kèm ngày hoặc điều kiện thành công, và mục "cần hỗ trợ" rõ ràng (hoặc "không") |
| **Cách đặt vấn đề cho quyết định** | Ném câu hỏi mở cho lãnh đạo, hoặc không nêu quyết định nào | Có liệt kê phương án nhưng thiếu chi phí/đánh đổi hoặc đề xuất | Mỗi quyết định có 2-3 phương án kèm chi phí, một đề xuất rõ ràng có lập luận, và ngày cần có quyết định cùng lý do khiến ngày đó là hạn chót |

## Kiểm tra chất lượng

- [ ] Bản cập nhật mở đầu bằng BLUF: trạng thái, điểm mấu chốt và việc cần hỗ trợ đứng trước mọi chi tiết
- [ ] Mọi chỉ số đều có so sánh với mục tiêu (không chỉ là số liệu thô)
- [ ] Mọi rủi ro đều có biện pháp giảm thiểu và cờ "cần hỗ trợ" nếu cần các bên liên quan hành động
- [ ] Các quyết định cần đưa ra có phương án cụ thể và đề xuất rõ ràng
- [ ] Tổng độ dài dưới 1 trang / 2 phút đọc

## Các lỗi cần tránh

- [ ] Không chôn phần đánh giá trạng thái ở cuối: BLUF nghĩa là thông tin quan trọng nhất phải đứng đầu
- [ ] Không báo cáo chỉ số mà không có mục tiêu hoặc so sánh với kỳ trước: số liệu thô thiếu bối cảnh thì không hữu ích
- [ ] Không liệt kê rủi ro mà thiếu hành động giảm thiểu và cờ rõ ràng về việc cần các bên liên quan hỗ trợ
- [ ] Không viết các quyết định cần đưa ra dưới dạng câu hỏi mà không kèm đề xuất rõ ràng: lãnh đạo cần phương án, không cần câu hỏi bỏ ngỏ
- [ ] Không để bản cập nhật dài quá một trang: nếu cần nhiều hơn, thông điệp cần được biên tập lại chứ không phải mở rộng

## Thực thi

Dành cho các agent có dùng công cụ và truy cập được các kênh giao tiếp của team (Slack, email). Gửi bản cập nhật là hành động **hướng ra bên ngoài**: không bao giờ được tự động. Các môi trường chạy không có quyền truy cập công cụ thì bỏ qua phần này. Xem [SKILLSPEC.md §5](../../../SKILLSPEC.md).

### Điều kiện tiên quyết
- Nội dung cuối cùng của bản cập nhật đã được trình cho người dùng **nguyên văn** và được phê duyệt rõ ràng, bao gồm cả kênh/danh sách người nhận chính xác.
- Kênh hoặc danh sách người nhận do người dùng chỉ định, không suy đoán từ lịch sử.
- Nếu trạng thái là 🔴 hoặc có mục Quyết định cần đưa ra, xác nhận người ra quyết định được nêu tên có nằm trong danh sách người nhận.

### Hành động được phép
- Đăng nguyên văn nội dung đã duyệt, không chỉnh sửa, lên đúng một kênh đã được duyệt, hoặc gửi thành một email đến những người nhận đã được duyệt với tiêu đề đã được duyệt.
- Lưu một bản sao vào nơi người dùng chỉ định (tài liệu, Brain, file trong repo).
- Không làm gì khác: không lên lịch gửi định kỳ (dùng `schedule-recipe` cho việc đó, với các điều kiện kiểm soát riêng), không @-mention ai không có trong nội dung đã duyệt, không đăng chéo.

### Xác minh
- Xác nhận tin nhắn đã có trong kênh/thread (lấy permalink) và báo lại link.
- Xác nhận nội dung đã gửi giống hệt từng byte so với nội dung đã duyệt.

### Hoàn tác
- Nếu nền tảng cho phép, chỉ được xóa tin nhắn vừa đăng **khi** người dùng yêu cầu rõ ràng; nếu không, hãy đăng một phản hồi đính chính.
- Dừng lại và hỏi người dùng nếu: không tìm thấy kênh, việc đăng bị lỗi một phần, hoặc nội dung đã duyệt không còn khớp với nội dung sắp gửi.

## Ví dụ câu kích hoạt

- "Viết bản cập nhật tình hình."
- "Viết báo cáo tiến độ cho lãnh đạo."
- "Viết bản cập nhật dự án cho các bên liên quan."
- "Viết bản tóm tắt cho ban điều hành."
