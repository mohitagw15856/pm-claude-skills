---
name: career-inventory
language: vi
description: "Phỏng vấn một người về quá trình làm việc của họ và biến các câu trả lời thành một bản kiểm kê CV gốc: mọi vai trò, dự án và thành tích kèm số liệu thật, trước khi điều chỉnh bất kỳ CV nào. Dùng khi được yêu cầu xây dựng CV gốc của tôi, ghi lại đầy đủ kinh nghiệm của tôi, tôi không biết nên đưa gì vào CV, hoặc làm bước đầu tiên trước khi viết CV theo từng công ty. Tạo ra một bản kiểm kê có cấu trúc gồm các vai trò, thành tích theo một khuôn cố định kèm bằng chứng và số liệu, kỹ năng có minh chứng, và danh sách những khoảng trống cần bổ sung. Không bao giờ bịa ra con số."
version: 1.0.0
---

> Bản dịch tiếng Việt của [career-inventory](../../../skills/career-inventory/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kiểm kê Sự nghiệp

Phần lớn CV yếu là do đầu vào yếu, không phải do cách viết. Người ta nhớ nhiệm vụ chứ không nhớ kết quả, và họ đánh giá thấp cả những con số mà họ biết. Kỹ năng này phỏng vấn từng người, lần lượt từng vai trò, và xây dựng một bản kiểm kê gốc để từ đó cắt ra mọi CV được điều chỉnh riêng.

Bước đầu tiên của bộ pm-cv. `company-tailored-cv` và các kỹ năng định dạng sẽ đọc đầu ra của nó.

## Kỹ năng này tạo ra gì

- **Một bản kiểm kê gốc**: mọi vai trò kèm thời gian, phạm vi và các thành tích trong đó
- **Thành tích theo một khuôn**: điều gì đã thay đổi, bao nhiêu, nhờ hành động nào, với bằng chứng gì
- **Kỹ năng có minh chứng**: mỗi kỹ năng gắn với một nơi nó đã được sử dụng, không phải danh sách từ khóa trơ trọi
- **Danh sách khoảng trống**: những con số và dữ kiện mà người đó có thể tìm ra nhưng chưa làm
- **Một file được lưu** (`career-inventory.md`) để không bao giờ phải phỏng vấn lại

## Đầu vào bắt buộc

Hỏi những thông tin này nếu chưa được cung cấp:
- **Những gì đã có**: một CV cũ, file xuất từ LinkedIn, hoặc chưa có gì
- **Các vai trò cần ghi lại**: bắt đầu với mười năm gần nhất trừ khi người đó muốn khác
- **Có phải để chuyển hướng nghề nghiệp không**, vì điều này thay đổi những gì đáng để đào sâu

## Khung tư duy: Buổi phỏng vấn

Làm từng vai trò một, mới nhất trước. Với mỗi vai trò, hỏi theo thứ tự sau:

1. **Phạm vi**: quy mô nhóm, ngân sách, số người dùng, doanh thu hoặc khối lượng bạn chịu trách nhiệm
2. **Trước đó**: điều gì đang hỏng, chậm, thiếu hoặc rủi ro khi bạn đến
3. **Việc bạn đã làm**: những quyết định và hành động là của bạn, không phải của cả nhóm
4. **Sau đó**: điều gì đã thay đổi, và làm sao người khác nhận ra điều đó
5. **Con số**: nếu có. Nếu không, hỏi về chỉ số thay thế trung thực gần nhất (thời gian tiết kiệm được, số lượng, phần trăm, thứ hạng, trước và sau)
6. **Bằng chứng**: một tài liệu, một dashboard, một lời trích dẫn, một giải thưởng, một người tham chiếu

Quy tắc đào sâu:
- Hỏi "làm sao bạn biết?" một lần cho mỗi kết quả được nêu. Câu hỏi này biến tính từ thành bằng chứng.
- Chấp nhận câu "tôi không biết con số". Ghi nó vào danh sách khoảng trống kèm nơi có thể tìm thấy.
- Tách bạch "tôi" và "chúng tôi". Cả hai đều được phép dùng trên CV; người đó phải biết rõ đâu là đâu.
- Mỗi câu trả lời một thành tích. Tách các câu trả lời gộp nhiều ý.

Khuôn thành tích:
**[Kết quả, kèm con số] nhờ [hành động bạn đã thực hiện], [bối cảnh hoặc ràng buộc].** Bằng chứng: [nguồn].

## Định dạng đầu ra

### Career inventory: [name], updated [date]

**Role: [title], [organisation], [start] to [end]**
- Phạm vi: [nhóm, ngân sách, người dùng, khối lượng]
- Thành tích:
  1. [thành tích theo khuôn ở trên] · Bằng chứng: [nguồn] · Độ tin cậy: đã xác nhận / ước tính / cần tìm
- Kỹ năng đã dùng ở đây: [kỹ năng, kèm số thứ tự thành tích chứng minh nó]

(lặp lại cho mỗi vai trò)

**Chỉ mục kỹ năng**: | Kỹ năng | Được chứng minh ở | Ví dụ mạnh nhất |

**Khoảng trống cần bổ sung**: | Dữ kiện cần có | Vai trò | Nơi có thể tìm |

**Bước tiếp theo**: "Chạy `company-tailored-cv` với bản kiểm kê này và công việc bạn đang ứng tuyển."

## Kiểm tra chất lượng
- [ ] Mọi thành tích đều có một hành động do chính người đó thực hiện
- [ ] Mọi con số đều được đánh dấu là đã xác nhận, ước tính hoặc cần tìm
- [ ] Không có con số nào xuất hiện mà người đó không đưa ra
- [ ] Mỗi kỹ năng trong chỉ mục đều trỏ đến ít nhất một thành tích
- [ ] Danh sách khoảng trống có tồn tại, dù ngắn

## Những điều cần tránh
- **Bịa ra hoặc làm tròn lên các con số.** Một ước tính được ghi rõ là ước tính. Con số còn thiếu đưa vào danh sách khoảng trống.
- **Ghi lại nhiệm vụ.** "Chịu trách nhiệm báo cáo" là mô tả công việc, không phải thành tích. Hãy hỏi điều gì đã thay đổi.
- **Phỏng vấn tất cả vai trò cùng lúc.** Từng vai trò một sẽ có chi tiết; một tràng câu hỏi chỉ nhận về những bản tóm tắt.
- **Điều chỉnh quá sớm.** Bản kiểm kê phải đầy đủ và trung lập. Việc điều chỉnh diễn ra sau, cho từng công việc.
- **Tâng bốc.** Chính xác hữu ích hơn ấn tượng. Người phỏng vấn sẽ kiểm tra từng dòng.

## Ví dụ câu kích hoạt
- "Giúp tôi ghi lại toàn bộ kinh nghiệm trước khi viết CV."
- "Tôi chẳng bao giờ biết nên đưa gì vào CV. Phỏng vấn tôi đi."
- "Xây dựng CV gốc cho tôi từ CV cũ và LinkedIn."
- "Tôi đang chuyển ngành. Thực sự tôi đã đạt được những gì?"
