---
name: prd-template
language: vi
description: "Soạn tài liệu yêu cầu sản phẩm (PRD) theo cấu trúc mẫu đã được kiểm chứng trong nghề PM. Dùng khi được yêu cầu viết PRD, product spec, đặc tả tính năng hoặc tài liệu yêu cầu cho một tính năng hay sản phẩm mới. Tạo ra một PRD hoàn chỉnh gồm phát biểu vấn đề, user story, yêu cầu chức năng, các cân nhắc kỹ thuật và chỉ số thành công."
version: 1.0.0
---

> Bản dịch tiếng Việt của [prd-template](../../../skills/prd-template/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Mẫu PRD

Kỹ năng này giúp soạn tài liệu yêu cầu sản phẩm (PRD) chuyên nghiệp theo các thực hành tốt nhất của ngành.

## Vị trí của kỹ năng này: phần giữa của chuỗi ra quyết định

Đứng thứ hai trong chuỗi ra quyết định sản phẩm: **`/assumption-mapper` → `prd-template` →
`/rice-prioritisation` → `/roadmap-narrative`**. Kỹ năng này nhận **giả định rủi ro nhất**
từ `/assumption-mapper` (nếu bước đó đã chạy, hãy đọc bản đồ của nó thay vì đoán lại các rủi ro)
và chuyển cho `/rice-prioritisation` **chỉ số thành công của PRD**: con số duy nhất đã có baseline,
sẽ trở thành *Impact* trong RICE. Các thuật ngữ dùng chung (phát biểu vấn đề, giả thuyết, chỉ số
thành công, nguồn gốc) được định nghĩa một lần tại
[`docs/craft/product-decisions.md`](../../../docs/craft/product-decisions.md); hãy dùng
đúng như vậy.

## Vòng lặp

PRD được viết từ ngoài vào trong (luôn là vấn đề trước, giải pháp sau) qua bốn giai đoạn. Giai đoạn 1
là nền móng: một PRD dựng trên một vấn đề mơ hồ thì dù trau chuốt đến đâu vẫn
sai từ gốc.

1. **Chốt phát biểu vấn đề.** Một câu: ai gặp vấn đề gì, khi nào, và cái giá của việc
   để nguyên. Không dùng ngôn ngữ giải pháp. Mọi thứ bên dưới phải bám về câu này.
   **Hoàn thành khi:** phát biểu vấn đề đứng độc lập, không nêu tên tính năng nào, và một
   người ngoài cũng hiểu "đã giải quyết" nghĩa là gì.
2. **Lấy baseline cho chỉ số thành công.** Con số duy nhất chứng minh vấn đề đã được giải quyết,
   kèm *baseline hiện tại* và mức thay đổi được xem là thành công. Đưa mọi rủi ro từ bước
   `/assumption-mapper` phía trước vào đây dưới dạng Câu hỏi bỏ ngỏ, không đặt cược ngầm.
   **Hoàn thành khi:** chỉ số có baseline (hoặc được đánh dấu rõ là chưa có baseline),
   và nó đo lường vấn đề chứ không đo hoạt động.
3. **Soạn các phần, mỗi phần đều truy ngược lên.** Điền mẫu (bên dưới) sao cho mọi
   yêu cầu và story đều truy về phát biểu vấn đề; bỏ những gì không truy về được.
   Gắn nhãn nguồn gốc cho các dữ kiện: một con số phỏng đoán là [hunch], phải được ghi rõ.
   **Hoàn thành khi:** mọi yêu cầu đều truy về phát biểu vấn đề, và mọi dữ kiện được nêu
   đều mang nhãn [data]/[hunch]/[assumption].
4. **Bàn giao.** Nêu rõ chỉ số thành công và (các) sáng kiến để
   `/rice-prioritisation` có thể chấm Impact từ *chính* chỉ số này, không phải một chỉ số tự nghĩ lại.
   **Hoàn thành khi:** PRD nêu tên chỉ số và phạm vi mà `/rice-prioritisation` cần
   để chấm điểm mà không phải hỏi lại.

## Thông tin đầu vào cần có

Hỏi người dùng những thông tin sau nếu chưa được cung cấp:
- **Tên tính năng hoặc sản phẩm**
- **Vấn đề cần giải quyết** (từ góc nhìn của người dùng)
- **Người dùng mục tiêu** (vai trò, bối cảnh, điều họ đang cố đạt được)
- **Chỉ số thành công** (làm sao biết là nó hiệu quả?)
- **Phạm vi** (MVP hay tầm nhìn đầy đủ: những gì nằm trong và ngoài phạm vi)
- **Các bên liên quan chính** (ai cần review và phê duyệt)

## Đọc từ / Ghi vào Brain

Nếu có [`professional-brain`](../../../skills/professional-brain/SKILL.md) (`brain/`), hãy dùng nó thay vì hỏi lại bối cảnh bạn đã có:

- **Đọc trước:** `context.md` (sản phẩm, định nghĩa chỉ số, giọng văn), `knowledge/strategy.md`
  (sản phẩm đang hướng tới đâu), mọi `hypotheses/` liên quan và file tính năng tương ứng trong `entities/`.
  Chạy `python3 ../professional-brain/scripts/brain_query.py ./brain "<feature>"` để lấy
  các dữ kiện có căn cứ, và giữ nguyên nhãn nguồn gốc của chúng khi đưa vào PRD (đừng trình bày một `[hunch]` như một
  yêu cầu đã được chốt).
- **Ghi sau:** lưu tính năng thành/vào `entities/<feature>.md`, ghi mọi quyết định về phạm vi vào
  `decisions/`, và thêm các giả định mới vào `hypotheses/`. Gắn nhãn nguồn gốc cho từng mục.

## Tài liệu chuyên sâu

Kỹ năng này đi kèm hai file hỗ trợ, hãy dùng chúng khi có sẵn:

- **[`templates/prd-skeleton.md`](../../../skills/prd-template/templates/prd-skeleton.md)**: khung PRD để điền, mỗi phần có gợi ý "thế nào là tốt". Bắt đầu từ file này khi người dùng muốn một tài liệu để tự hoàn thiện thay vì một bản nháp được tạo sẵn.
- **[`references/success-metrics-guide.md`](../../../skills/prd-template/references/success-metrics-guide.md)**: hướng dẫn hiệu chỉnh cho phần Chỉ số thành công: bài kiểm tra chỉ số bốn phần, bộ chỉ số chuẩn adoption/outcome/business/guardrail, và các bẫy thường gặp. Tham khảo bất cứ khi nào viết hoặc review bảng chỉ số.

## Cấu trúc mẫu

Mọi PRD nên có các phần sau theo đúng thứ tự:

### 1. Tổng quan
- **Phát biểu vấn đề**: Chúng ta đang giải quyết vấn đề gì? (2-3 câu)
- **Giải pháp đề xuất**: Mô tả tổng quát những gì sẽ xây dựng (2-3 câu)
- **Chỉ số thành công**: Cách đo lường thành công (3-5 chỉ số chính)

### 2. Bối cảnh và nền tảng
- **Tại sao là bây giờ**: Vì sao đây là thời điểm phù hợp?
- **Gắn kết chiến lược**: Điều này phù hợp với mục tiêu của công ty như thế nào?
- **Tóm tắt nghiên cứu người dùng**: Các insight chính từ nghiên cứu (nếu có)

### 3. User story và tình huống sử dụng
Định dạng: "Là một [user type], tôi muốn [action] để [benefit]"
- Đưa vào 3-7 user story chính
- Thêm tiêu chí chấp nhận (acceptance criteria) cho từng story

### 4. Yêu cầu
**Yêu cầu chức năng:**
- Tính năng bắt buộc phải có (P0)
- Tính năng nên có (P1)
- Tính năng có thì tốt (P2)

**Yêu cầu phi chức năng:**
- Kỳ vọng về hiệu năng
- Các cân nhắc về bảo mật
- Yêu cầu về khả năng tiếp cận (accessibility)

### 5. Thiết kế và trải nghiệm người dùng
- Link đến mockup hoặc wireframe
- Các luồng người dùng chính
- Trường hợp biên và trạng thái lỗi

### 6. Cân nhắc kỹ thuật
- Hệ quả về kiến trúc
- Phụ thuộc vào các hệ thống khác
- Rủi ro kỹ thuật và biện pháp giảm thiểu

### 7. Kế hoạch triển khai
- **Giai đoạn 1 (MVP)**: Những gì có trong phiên bản đầu tiên
- **Giai đoạn 2**: Những gì đến tiếp theo
- **Giai đoạn 3**: Các cải tiến trong tương lai

### 8. Câu hỏi bỏ ngỏ
- Các quyết định vẫn cần đưa ra
- Các bên liên quan cần tham vấn
- Nghiên cứu cần thực hiện

### 9. Phụ lục
- Link nghiên cứu
- Tài liệu liên quan
- Phân tích đối thủ cạnh tranh

## Hướng dẫn viết

**Giọng văn**: Rõ ràng, súc tích, có thể hành động được
**Đối tượng đọc**: Kỹ sư, designer, các bên liên quan
**Độ dài**: Khoảng 3-6 trang cho tính năng, 8-12 trang cho sản phẩm

**Thực hành tốt nhất:**
- Dùng ví dụ cụ thể thay vì khái niệm trừu tượng
- Nêu "vì sao" chứ không chỉ "cái gì"
- Viết yêu cầu sao cho kiểm thử được
- Link đến các tài liệu hỗ trợ
- Cập nhật khi các quyết định được đưa ra

## Thế nào là một PRD tốt

✅ **Nên:**
- Viết từ góc nhìn của người dùng
- Đưa vào các chỉ số thành công cụ thể
- Xử lý các trường hợp biên
- Link đến nghiên cứu và dữ liệu
- Nêu rõ các đánh đổi

❌ **Không nên:**
- Viết chi tiết triển khai (đó là việc của tech spec)
- Mặc định ai cũng có đủ bối cảnh
- Để yêu cầu mơ hồ
- Bỏ qua phần "vì sao"
- Quên khả năng tiếp cận (accessibility)

## Thang điểm đánh giá (0-40)

Chấm điểm mọi đầu ra của kỹ năng này trước khi bàn giao; từ 32 điểm trở lên là đạt chất lượng để gửi đi.

| Tiêu chí | 0 | 5 | 10 |
|---|---|---|---|
| **Cơ sở của vấn đề** | Vấn đề được nêu từ góc nhìn của công ty, hoặc khẳng định mà không có bằng chứng | Vấn đề được đặt theo góc nhìn người dùng, nhưng dữ liệu hỗ trợ mơ hồ ("người dùng thấy bực bội") và không dẫn nguồn nghiên cứu | Vấn đề là của người dùng, được định lượng bằng dữ liệu hiện trạng, và phần Tại sao là bây giờ giải thích điều gì đã thay đổi; các nhận định truy về được nghiên cứu có dẫn nguồn |
| **Khả năng kiểm thử của yêu cầu** | Yêu cầu là những phẩm chất mơ hồ ("nhanh", "trực quan") mà người review không thể kiểm chứng | Phần lớn yêu cầu cụ thể, nhưng tiêu chí chấp nhận sơ sài và yêu cầu phi chức năng chỉ là văn mẫu | Mọi mục P0/P1/P2 và NFR đều kiểm chứng được (ngưỡng, percentile, tiêu chuẩn), và mỗi mục truy về một user story hoặc phát hiện nghiên cứu |
| **Độ chặt chẽ của chỉ số** | Thiếu chỉ số thành công, hoặc chỉ có phần trăm mà không có baseline | Có baseline và mục tiêu, nhưng chỉ số chỉ đo adoption: không có gì phát hiện được trường hợp tính năng thành công trong khi doanh nghiệp chịu thiệt | Mọi chỉ số có baseline → mục tiêu, bộ chỉ số bao phủ cả outcome lẫn adoption, và có ít nhất một guardrail ngăn việc thắng ở chỉ số nhưng gây hại cho người dùng |
| **Trung thực về phạm vi và rủi ro** | MVP và các giai đoạn sau lẫn lộn; không liệt kê câu hỏi bỏ ngỏ | Các giai đoạn được tách bạch, nhưng thiếu lý do cho các đường cắt phạm vi và các bất đồng bị làm mờ đi | Mỗi ranh giới giai đoạn có lý do được nêu rõ, các yêu cầu ngoài phạm vi được ghi lại kèm điều kiện đưa trở lại, và câu hỏi bỏ ngỏ có người phụ trách, hạn chót và cái giá của từng câu trả lời |

## Kiểm tra chất lượng

- [ ] Phát biểu vấn đề được viết từ góc nhìn của người dùng (không phải của công ty)
- [ ] Chỉ số thành công cụ thể và đo lường được
- [ ] User story có tiêu chí chấp nhận
- [ ] Yêu cầu kiểm thử được (không mơ hồ)
- [ ] Câu hỏi bỏ ngỏ được liệt kê rõ ràng
- [ ] Kế hoạch triển khai phân biệt MVP với các giai đoạn sau

## Các lỗi cần tránh

- [ ] Không viết yêu cầu từ góc nhìn của công ty: mọi yêu cầu phải truy về được một nhu cầu của người dùng
- [ ] Không đưa vào yêu cầu mơ hồ kiểu "hệ thống phải nhanh": mọi yêu cầu phải kiểm thử được
- [ ] Không gộp MVP với các giai đoạn sau: nêu rõ những gì nằm trong và ngoài phạm vi của bản phát hành đầu tiên
- [ ] Không để chỉ số thành công chỉ là phần trăm mà thiếu baseline: nêu rõ hiện trạng và mục tiêu
- [ ] Không bỏ qua câu hỏi bỏ ngỏ: các giả định chưa được giải quyết chính là rủi ro; đưa chúng ra ánh sáng là việc của PM

## Ví dụ phần mở đầu PRD

```
# PRD: Dashboard hỗ trợ khách hàng đa kênh

## Tổng quan

**Phát biểu vấn đề**: Các team hỗ trợ hiện đang xử lý yêu cầu của khách hàng qua email, chat và mạng xã hội bằng ba công cụ riêng biệt, dẫn đến phản hồi chậm, công việc bị trùng lặp và trải nghiệm khách hàng không nhất quán. Trung bình, mỗi nhân viên hỗ trợ lãng phí 2.3 giờ mỗi ngày để chuyển qua lại giữa các công cụ và tự theo dõi lịch sử hội thoại.

**Giải pháp đề xuất**: Xây dựng một dashboard hợp nhất, gom yêu cầu của khách hàng từ mọi kênh vào một giao diện duy nhất, lưu giữ lịch sử hội thoại xuyên kênh và định tuyến thông minh dựa trên chuyên môn và mức độ sẵn sàng của nhân viên.

**Chỉ số thành công**:
- Giảm thời gian phản hồi trung bình từ 4 giờ xuống 1 giờ
- Giảm 80% thời gian chuyển đổi công cụ (từ 2.3 giờ xuống <0.5 giờ)
- Tăng điểm hài lòng của khách hàng từ 3.8 lên 4.5 (trên thang 5)
- Tăng năng suất của nhân viên hỗ trợ thêm 35%

## Bối cảnh và nền tảng

**Tại sao là bây giờ**: Mức độ hài lòng của khách hàng đã giảm 15% trong 6 tháng qua, chủ yếu do phản hồi chậm. Đối thủ hàng đầu của chúng ta đã ra mắt dashboard hỗ trợ hợp nhất vào quý trước, và chúng ta đang nghe khách nhắc đến nó trong các cuộc gọi bán hàng. Tỷ lệ nghỉ việc của team hỗ trợ ở mức 45% mỗi năm, với "công cụ quá phức tạp" là một trong những lý do gây bực bội hàng đầu.

**Gắn kết chiến lược**: Điều này phù hợp với mục tiêu Q1 của công ty là "Tăng tỷ lệ giữ chân khách hàng thêm 10%" và OKR của team hỗ trợ là "Giảm 25% thời gian xử lý trung bình."

**Tóm tắt nghiên cứu người dùng**: Chúng tôi đã phỏng vấn 12 nhân viên hỗ trợ và quan sát 20 giờ làm việc hỗ trợ. Các phát hiện chính:
- Nhân viên dành 35% thời gian để tìm lại bối cảnh từ các lần tương tác trước
- 65% các trường hợp escalation là do thiếu lịch sử hội thoại
- Nhân viên đánh giá việc chuyển đổi công cụ là nỗi bực bội số 1 hằng ngày (mức khó chịu 9.2/10)
- NPS hiện tại cho trải nghiệm hỗ trợ là -12

## User story và tình huống sử dụng

**US1: Hộp thư hợp nhất**
Là một nhân viên hỗ trợ, tôi muốn thấy mọi yêu cầu của khách hàng ở một nơi để không bỏ sót yêu cầu khẩn cấp và có thể sắp xếp ưu tiên hiệu quả.

Tiêu chí chấp nhận:
- Hộp thư hiển thị yêu cầu từ email, chat và mạng xã hội
- Yêu cầu được sắp xếp theo mức ưu tiên (khẩn cấp, cao, bình thường, thấp)
- Nhân viên có thể lọc theo kênh, khách hàng hoặc trạng thái
- Cập nhật theo thời gian thực khi có yêu cầu mới

**US2: Bối cảnh xuyên kênh**
Là một nhân viên hỗ trợ, tôi muốn thấy toàn bộ lịch sử hội thoại bất kể kênh nào để có thể phản hồi nhất quán, đầy đủ thông tin mà không bắt khách hàng phải nhắc lại.

Tiêu chí chấp nhận:
- Chế độ xem dòng thời gian hiển thị mọi tương tác theo thứ tự thời gian
- Mỗi tương tác hiển thị kênh, thời điểm và nội dung
- Hồ sơ khách hàng hiển thị thông tin nhân khẩu học và thông tin tài khoản
- Có thể truy cập các vấn đề và cách giải quyết trước đây

[Tiếp tục với tổng cộng 5-7 user story...]
```
