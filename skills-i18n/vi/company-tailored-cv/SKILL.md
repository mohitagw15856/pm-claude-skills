---
name: company-tailored-cv
language: vi
description: "Tạo một CV được định hình cho một công ty và vị trí mục tiêu: hệ thống theo dõi ứng viên (ATS) của công ty, quy ước của quốc gia, chuẩn mực của ngành, các giá trị công ty công bố và tin tuyển dụng, với mọi lựa chọn đều được giải thích. Dùng khi được yêu cầu viết CV cho một công ty cụ thể, điều chỉnh CV cho Google, Amazon hay bất kỳ nhà tuyển dụng nào được nêu tên, làm cho CV khớp với định dạng của công ty này, hoặc biến kinh nghiệm của tôi thành CV cho công việc này. Tạo ra CV đã điều chỉnh, một phần giải thích ngắn về định dạng có trích dẫn nguồn công khai kèm ngày, và danh sách những nhận định mà người đó phải sẵn sàng bảo vệ. Không bao giờ bịa ra kinh nghiệm hay thông tin nội bộ."
version: 1.0.0
---

> Bản dịch tiếng Việt của [company-tailored-cv](../../../skills/company-tailored-cv/SKILL.md). Bản tiếng Anh là bản chuẩn.

# CV Điều chỉnh theo Công ty

Hầu như không công ty nào công bố định dạng CV. Điều thực sự quyết định một CV phù hợp với một công ty là năm yếu tố: hệ thống theo dõi ứng viên mà công ty dùng, quy ước của quốc gia, chuẩn mực của ngành, các giá trị công ty công bố, và tin tuyển dụng. Kỹ năng này xác định những yếu tố đó từ thông tin công khai và kinh nghiệm của chính người ứng tuyển, rồi viết một CV cho một lần ứng tuyển.

Kỹ năng cốt lõi của bộ pm-cv. Đọc đầu ra của `career-inventory` khi có.

## Kỹ năng này tạo ra gì

- **CV đã điều chỉnh**, sẵn sàng để dán hoặc xuất bằng `cv-docx-export`
- **Phần giải thích định dạng**: năm yếu tố, mỗi yếu tố đã thay đổi điều gì, và nguồn công khai của từng yếu tố, kèm ngày kiểm tra
- **Bản đồ từ khóa**: các yêu cầu của tin tuyển dụng và chỗ CV đáp ứng từng yêu cầu
- **Danh sách cần bảo vệ**: mọi nhận định mà người phỏng vấn có khả năng đào sâu, kèm bằng chứng đằng sau

## Đầu vào bắt buộc

Hỏi những thông tin này nếu chưa được cung cấp:
- **Kinh nghiệm của người ứng tuyển**: một file `career-inventory`, một CV có sẵn, hoặc câu trả lời cho một buổi phỏng vấn ngắn
- **Công ty và vị trí mục tiêu**
- **Tin tuyển dụng**: đường link hoặc toàn văn. Nếu không có, nói rõ CV sẽ chung chung và hỏi lại một lần
- **Quốc gia của vị trí**, có thể khác với quốc gia nơi công ty đặt trụ sở
- **Những gì cần giữ kín**: nhà tuyển dụng hiện tại, một khoảng trống, tình trạng thị thực

## Khung tư duy: Năm yếu tố

Xác định theo thứ tự sau, và ghi lại nguồn của từng yếu tố.

1. **Hệ thống theo dõi ứng viên.** Đọc đường link ứng tuyển. Dùng các quy tắc của `ats-detector`: `myworkdayjobs.com` là Workday, `boards.greenhouse.io` là Greenhouse, `jobs.lever.co` là Lever, v.v. Nếu không rõ, giả định một trình đọc khắt khe: một cột, tiêu đề chuẩn, không bảng, văn bản chứ không phải hình ảnh.
2. **Quốc gia.** Áp dụng `country-cv-format`: độ dài, ảnh, thông tin cá nhân, định dạng ngày, chính tả, khổ giấy.
3. **Ngành.** Tư vấn và ngân hàng muốn một trang với học vấn đặt trước. Học thuật muốn CV đầy đủ. Vị trí trong khu vực nhà nước có thể yêu cầu một mẫu đơn riêng. Startup muốn bằng chứng về sự đa năng và tốc độ.
4. **Giá trị được công bố.** Nếu công ty công bố giá trị hoặc nguyên tắc, dùng `values-mapped-cv` để chọn thành tích nào đặt lên đầu. Trích dẫn trang và ngày. Nếu không có, bỏ qua yếu tố này và nói rõ.
5. **Tin tuyển dụng.** Trích ra các yêu cầu bắt buộc và yêu cầu ưu tiên. Mọi yêu cầu bắt buộc đều được đáp ứng ở nửa trên trang một, dùng chính từ ngữ của tin tuyển dụng ở những chỗ kinh nghiệm của người đó thực sự khớp.

Sau đó viết:
- **Tóm tắt**: ba dòng, chức danh lấy từ tin tuyển dụng, số năm kinh nghiệm, hai bằng chứng mạnh nhất
- **Kinh nghiệm**: mới nhất trước; ba đến năm gạch đầu dòng cho mỗi vai trò gần đây, được chọn cho tin tuyển dụng này; các vai trò cũ được rút gọn
- **Kỹ năng**: chỉ những kỹ năng có minh chứng trong phần kinh nghiệm
- **Học vấn và phần còn lại**: theo thứ tự mà quốc gia và ngành mong đợi

Nếu không truy cập được web, hãy nói rõ, đề nghị người đó dán tin tuyển dụng và trang giá trị của công ty, và không đoán về cả hai.

## Định dạng đầu ra

### Tailored CV: [name] for [role], [company]

**1. CV** (hoàn chỉnh, ở dạng văn bản thuần hoặc markdown chuyển đổi gọn gàng)

**2. Giải thích định dạng**
| Yếu tố | Cụ thể cho lần ứng tuyển này | Đã thay đổi điều gì | Nguồn, ngày kiểm tra |

**3. Bản đồ từ khóa**
| Yêu cầu từ tin tuyển dụng | Bắt buộc hay ưu tiên | Được đáp ứng bởi | Mức độ: trực tiếp / liên quan / thiếu |

**4. Danh sách cần bảo vệ**
| Nhận định trên CV | Câu hỏi có khả năng gặp | Bằng chứng cần chuẩn bị |

**5. Yêu cầu còn thiếu**: các khoảng trống trung thực, mỗi khoảng trống kèm cách trình bày trung thực tốt nhất hoặc "không nhận"

## Kiểm tra chất lượng
- [ ] Mọi yêu cầu bắt buộc trong tin tuyển dụng đều được đáp ứng hoặc liệt kê là còn thiếu
- [ ] Mọi yếu tố trong phần giải thích đều có nguồn và ngày, hoặc ghi "không công bố"
- [ ] Không có kinh nghiệm, chức danh, ngày tháng hay con số nào xuất hiện mà người đó không đưa ra
- [ ] Bố cục tuân theo quy tắc của hệ thống theo dõi ứng viên: một cột, tiêu đề chuẩn, không bảng hay hình ảnh
- [ ] Thông tin cá nhân tuân theo quy tắc của quốc gia, kể cả những gì phải lược bỏ
- [ ] Danh sách cần bảo vệ bao quát mọi con số trên CV

## Những điều cần tránh
- **Tuyên bố một "định dạng" của công ty không hề tồn tại.** Hãy nói điều gì được suy ra và từ đâu.
- **Nhồi nhét từ khóa.** Chỉ dùng từ ngữ của tin tuyển dụng ở những chỗ kinh nghiệm thực sự khớp. Cả người sàng lọc lẫn người phỏng vấn đều sẽ nhận ra.
- **Bịa đặt để lấp khoảng trống.** Hãy liệt kê khoảng trống kèm một cách trình bày trung thực.
- **Sao chép giá trị của công ty thành tính từ.** "Lấy khách hàng làm trung tâm" chẳng chứng minh được gì. Một thành tích thể hiện điều đó mới có giá trị.
- **Một CV cho mọi lần ứng tuyển.** Kỹ năng này cố ý viết một CV cho một công việc.
- **Ghi cứng thông tin công ty từ trí nhớ.** Hệ thống theo dõi ứng viên, giá trị và tin tuyển dụng đều thay đổi. Hãy kiểm tra mỗi lần và ghi ngày.

## Ví dụ câu kích hoạt
- "Viết CV cho tôi ứng tuyển vị trí senior product manager ở Monzo. Đây là tin tuyển dụng."
- "Điều chỉnh CV của tôi cho công việc này ở Amazon, theo định dạng họ mong muốn."
- "Tôi đã có bản kiểm kê sự nghiệp. Làm CV cho vị trí này ở Siemens tại Munich."
- "Biến kinh nghiệm của tôi thành CV cho công ty này."
