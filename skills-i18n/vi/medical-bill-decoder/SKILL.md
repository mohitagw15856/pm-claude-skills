---
name: medical-bill-decoder
language: vi
description: "Giải mã hóa đơn y tế chi tiết hoặc EOB (giải trình quyền lợi bảo hiểm) sang ngôn ngữ dễ hiểu và tìm ra các khoản phí đáng khiếu nại. Dùng khi ai đó hỏi 'sao hóa đơn viện phí của mình cao thế', 'giải mã hóa đơn bệnh viện giúp mình', 'EOB này nói gì vậy' hoặc 'mình có thể thương lượng hóa đơn này không'. Tạo ra bản giải mã từng dòng, gắn cờ phí trùng lặp và tách gói dịch vụ, các dấu hiệu cảnh báo về tính phí phần chênh lệch (balance billing), cùng kịch bản nói sẵn để yêu cầu hóa đơn chi tiết, hỏi về hỗ trợ tài chính và gọi điện thương lượng."
---

> Bản dịch tiếng Việt của [medical-bill-decoder](../../../skills/medical-bill-decoder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Giải mã Hóa đơn Y tế

Hóa đơn y tế được viết bằng mã, theo đúng nghĩa đen, và sai sót phổ biến đến mức đọc kỹ hóa đơn
của bạn sẽ giúp tiết kiệm tiền thật. Kỹ năng này dịch từng dòng, gắn cờ các khoản phí có vẻ sai,
và đưa cho bạn chính xác những câu cần nói qua điện thoại.

## Kỹ năng này tạo ra gì

- Bản giải mã từng dòng phí sang ngôn ngữ dễ hiểu
- Các dấu hiệu cảnh báo xếp hạng: phí trùng lặp, tách gói dịch vụ, tính phí phần chênh lệch, khoản phí bất hợp lý
- Ba kịch bản: yêu cầu hóa đơn chi tiết, hỏi về hỗ trợ tài chính, thương lượng số dư
- Danh sách hành động theo thứ tự ưu tiên: khiếu nại khoản nào trước và với ai

## Thông tin đầu vào cần có

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **Nội dung hóa đơn và/hoặc EOB**: dán vào hoặc chép lại. Nếu chỉ là hóa đơn tóm tắt, hãy nói rõ và bắt đầu bằng kịch bản yêu cầu hóa đơn chi tiết; giải mã những gì nhìn thấy.
- **Tình trạng bảo hiểm**: có bảo hiểm (trong/ngoài mạng lưới, nếu biết), không có bảo hiểm, hoặc không chắc.
- **Bối cảnh**: lần khám vì lý do gì, và cơ sở y tế có được chọn trong tình huống cấp cứu không.

## Khung đánh giá: Thang mức độ nghiêm trọng

Đánh giá mọi phát hiện:

- 🔴 **Có thể khiến bạn mất tiền thật**: phí trùng lặp, tách gói dịch vụ (một thủ thuật bị tính thành nhiều mã thành phần), tính phí phần chênh lệch cho dịch vụ ngoài mạng lưới tại cơ sở trong mạng lưới hoặc trong cấp cứu, tính phí cho dịch vụ không hề diễn ra, hóa đơn không khớp EOB, bị tính nhiều hơn mức "patient responsibility" (phần bệnh nhân chi trả) trên EOB.
- 🟡 **Bất thường, nên phản bác**: các dòng mơ hồ ("vật tư", "phí cơ sở") với số tiền lớn, dấu hiệu nâng mã mức dịch vụ (mã khám mức cao nhất cho một lần khám đơn giản), khoản phí cao hơn mức thông thường quá nhiều.
- 🟢 **Tiêu chuẩn**: tiền đồng chi trả, áp dụng mức khấu trừ, và các dòng phí trông bình thường; hãy nói rõ như vậy.

Giải mã mã số bằng cách diễn giải theo ngữ cảnh, không dùng bảng tra: giải thích *loại* mã CPT/HCPCS hoặc mã doanh thu nghĩa là gì dựa trên ngữ cảnh trên hóa đơn, và đánh dấu mã nào không thể diễn giải chắc chắn là `[to confirm: ask billing what this covers]` (cần xác nhận: hỏi phòng thu phí xem mã này bao gồm những gì). Không bao giờ bịa ra chuẩn giá theo mã. Luôn đối chiếu hóa đơn với EOB khi có cả hai: khoảng chênh giữa chúng là nơi có tiền.

## Định dạng đầu ra

### Giải mã Hóa đơn Y tế: [cơ sở y tế / ngày khám chữa bệnh]

**1. Kết luận**: tổng số tiền bị tính, phần nào có vẻ hợp lệ, phần nào có thể khiếu nại, và một con số mục tiêu thực tế.

**2. Giải mã từng dòng**

| Dòng / mã | Có vẻ là gì | Số tiền | Đánh giá | Mức độ |
|---|---|---|---|---|

**3. 🚩 Dấu hiệu cảnh báo, xếp hạng**: mỗi mục kèm dòng cụ thể được trích dẫn, lý do đáng ngờ, và cần nêu với ai (phòng thu phí, công ty bảo hiểm, hoặc cả hai).

**4. Kịch bản của bạn**: ba kịch bản ngắn, dùng nguyên văn được: (a) yêu cầu hóa đơn chi tiết đầy đủ kèm mã, (b) hỏi về hỗ trợ tài chính / chương trình từ thiện và giảm giá khi thanh toán ngay, (c) cuộc gọi thương lượng: mở đầu bằng các khiếu nại, sau đó đề nghị giảm và trả góp; yêu cầu mọi thứ bằng văn bản.

**5. Thứ tự hành động**: các bước tiếp theo được đánh số, ghi rõ thời hạn (đừng để khoản nợ bị chuyển sang công ty đòi nợ trong lúc đang khiếu nại; hãy nói rõ cần yêu cầu tạm hoãn).

Kết thúc sản phẩm bằng câu sau, giữ nguyên văn: *"Đây là phần diễn giải bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý/tài chính. Luật pháp khác nhau tùy khu vực pháp lý; hãy xác nhận mọi điểm quan trọng với chuyên gia có đủ chuyên môn."*

## Kiểm tra chất lượng

- [ ] Mọi khoản phí bị gắn cờ đều chỉ đến một dòng cụ thể trên hóa đơn, được trích dẫn hoặc đánh số
- [ ] Hóa đơn và EOB được đối chiếu chéo khi có cả hai; các điểm không khớp là cảnh báo hàng đầu
- [ ] Các mã không diễn giải được đánh dấu `[to confirm]`, không bao giờ đoán thành chẩn đoán
- [ ] Cả ba kịch bản đều dùng nguyên văn được, không phải bản tóm tắt điều cần nói
- [ ] Các cảnh báo về tính phí phần chênh lệch ghi chú rằng mức bảo vệ phụ thuộc khu vực pháp lý và loại gói bảo hiểm
- [ ] Câu miễn trừ trách nhiệm xuất hiện nguyên văn trong sản phẩm

## Những điều cần tránh

- [ ] Không bịa ra khoản phí, mã hoặc giá không có trong tài liệu
- [ ] Không làm nhẹ dấu hiệu cảnh báo để tỏ ra cân bằng: khả năng trùng lặp thì gọi là khả năng trùng lặp
- [ ] Không trình bày các biện pháp bảo vệ về hóa đơn phụ thuộc khu vực pháp lý như quy tắc phổ quát
- [ ] Không chẩn đoán hay phán xét lại việc điều trị: chỉ giải mã phần hóa đơn
- [ ] Không hứa hẹn kết quả ("họ sẽ miễn khoản này"): trình bày kịch bản như những đề nghị có khả năng thành công cao

## Dựa trên

Thực hành hỗ trợ bệnh nhân về hóa đơn: kiểm tra hóa đơn chi tiết, đối chiếu EOB, soạn kịch bản thương lượng.
