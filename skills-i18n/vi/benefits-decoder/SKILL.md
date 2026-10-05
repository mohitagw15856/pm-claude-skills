---
name: benefits-decoder
language: vi
description: "Giải mã gói phúc lợi việc làm để biết nó thực sự đáng giá bao nhiêu và chữ nhỏ gây bất lợi ở đâu. Dùng khi ai đó hỏi 'offer này có tốt không', 'giải mã gói phúc lợi giúp mình', 'cổ phần của mình thực sự có nghĩa là gì' hoặc 'nên hỏi HR gì trước khi ký'. Tạo ra bản giải mã từng phúc lợi với giá trị tiền thật, các dấu hiệu cảnh báo được xếp hạng (mốc cliff khi vesting, thu hồi, thưởng 'tùy quyết định', bài toán kinh tế của nghỉ phép không giới hạn) và các câu hỏi cần hỏi HR trước khi ký."
---

> Bản dịch tiếng Việt của [benefits-decoder](../../../skills/benefits-decoder/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng Giải mã Phúc lợi

Các slide "tổng thu nhập" là tài liệu marketing. Kỹ năng này đọc văn bản chính sách như một người bạn
từng bị thiệt: mỗi phúc lợi thực sự đáng giá bao nhiêu, lời hứa nào có lối thoát, và cần có gì
bằng văn bản trước khi bạn ký.

## Kỹ năng này tạo ra gì

- Bản giải mã từng phúc lợi với giá trị thực tế hằng năm khi tính được
- Các dấu hiệu cảnh báo xếp hạng: mốc cliff khi vesting, thu hồi, mọi thứ "tùy quyết định", lỗ hổng bảo hiểm
- Phép tính khoản đóng góp đối ứng 401k/lương hưu và phép tính cổ phần, có hiển thị phép tính
- Các câu hỏi cần hỏi HR trước khi ký, và câu trả lời nào cần có bằng văn bản

## Thông tin đầu vào cần có

Chỉ hỏi những thông tin này nếu chưa được cung cấp:

- **Tài liệu phúc lợi**: thư mời làm việc, bản tóm tắt phúc lợi, điều khoản cấp cổ phần, trích đoạn chính sách. Giải mã những gì được cung cấp; liệt kê những gì còn cần (chính sách cổ phần, bản tóm tắt quyền lợi bảo hiểm, điều khoản chính sách thưởng).
- **Lương cơ bản và chi tiết cấp cổ phần** nếu không có trong văn bản: cần cho phép tính.
- **Hoàn cảnh của họ**: người phụ thuộc/nhu cầu sức khỏe, thực tế dự kiến làm ở đó bao lâu.

## Khung đánh giá: Thang mức độ nghiêm trọng

- 🔴 **Có thể khiến bạn mất tiền thật**: mốc cliff khi vesting so với thời gian dự kiến làm việc, thu hồi (thưởng ký hợp đồng, hỗ trợ chuyển chỗ ở, học phí, thậm chí cổ phần đã vest khi có lý do "cause"), thưởng chỉ trả nếu "còn làm việc vào ngày chi trả", thời hạn thực hiện quyền chọn cổ phần sau khi nghỉ việc ngắn, mức khấu trừ cao ẩn sau con số quảng cáo đẹp, mất khoản đối ứng do vesting.
- 🟡 **Bất thường, cần làm rõ trước khi ký**: ngôn từ thưởng "tùy quyết định" (giải mã thẳng: đó là mục tiêu, không phải lời hứa), nghỉ phép không giới hạn (giải mã bài toán kinh tế: không có khoản chi trả phép tích lũy khi nghỉ việc), phúc lợi có thể thay đổi "theo quyết định của công ty", thời gian chờ.
- 🟢 **Tiêu chuẩn**: thời gian đăng ký thông thường, cấu trúc vesting tiêu chuẩn, điều khoản mẫu điển hình của chính sách; gắn nhãn để người đọc biết chỗ nào ổn.

Luôn trình bày phép tính:
1. **Phép tính khoản đối ứng**: ví dụ "50% của 6% đầu tiên" = X/năm với mức lương của họ; ghi chú lịch vesting riêng của khoản đối ứng và nghỉ việc ở năm thứ N sẽ mất những gì.
2. **Phép tính cổ phần**: lượng cổ phần được cấp ÷ số năm vesting = giá trị hằng năm theo mức định giá đã nêu, kèm kịch bản cliff ("nghỉ ở tháng 11 = 0"); đánh dấu các con số phụ thuộc định giá là `[to confirm]`.
3. **Đọc mức bảo hiểm thực tế**: phần phí bảo hiểm phải đóng, mức khấu trừ, mức chi trả tối đa từ túi: năm tệ nhất tính bằng tiền, không phải câu trong tờ quảng cáo.
4. **Bài toán kinh tế của nghỉ phép**: không giới hạn so với tích lũy: chênh lệch khoản chi trả khi nghỉ việc tính bằng tiền.

## Định dạng đầu ra

### Giải mã Phúc lợi: [công ty / offer]

**1. Kết luận**: gói này thực sự đáng giá bao nhiêu mỗi năm (một khoảng, nêu rõ giả định), và hai điều cần giải quyết trước khi ký.

**2. Giải mã từng phúc lợi**

| Phúc lợi | Văn bản ghi gì | Thực sự đáng giá bao nhiêu / thực sự có nghĩa là gì | Mức độ |
|---|---|---|---|

**3. 🚩 Dấu hiệu cảnh báo, xếp hạng**: ngôn từ được trích dẫn, tình huống nó gây hại, chi phí tính bằng tiền.

**4. Phần tính toán**: khoản đối ứng, cổ phần, bảo hiểm trong trường hợp xấu nhất, nghỉ phép, có hiển thị phép tính.

**5. Câu hỏi cho HR trước khi ký**: 4-7 câu, sắp xếp theo số tiền liên quan; đánh dấu câu trả lời nào cần có bằng văn bản (điều khoản thưởng, tài liệu chính sách cổ phần, các điều kiện thu hồi).

**6. Những gì có thể thương lượng**: thường là các khoản một lần (thưởng ký hợp đồng, cổ phần, ngày bắt đầu, hỗ trợ chuyển chỗ ở) hơn là bản thân các chính sách.

Kết thúc sản phẩm bằng câu sau, giữ nguyên văn: *"Đây là phần diễn giải bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý/tài chính. Luật pháp khác nhau tùy khu vực pháp lý; hãy xác nhận mọi điểm quan trọng với chuyên gia có đủ chuyên môn."*

## Kiểm tra chất lượng

- [ ] Mọi định giá đều được trình bày dưới dạng phép tính với giả định nêu rõ, không chỉ khẳng định
- [ ] Ngôn từ "tùy quyết định" và "còn làm việc vào ngày chi trả" được trích dẫn và giải mã thẳng thắn
- [ ] Các cảnh báo về cliff/thu hồi được gắn với thời gian dự kiến làm việc mà người dùng nêu
- [ ] Tài liệu còn thiếu và các con số không kiểm chứng được liệt kê là `[to confirm]`
- [ ] Các điều khoản thực sự tiêu chuẩn được đánh dấu 🟢: không phải mọi thứ đều là bẫy
- [ ] Câu miễn trừ trách nhiệm xuất hiện nguyên văn trong sản phẩm

## Những điều cần tránh

- [ ] Không bịa ra phúc lợi hoặc điều khoản không có trong tài liệu
- [ ] Không làm nhẹ dấu hiệu cảnh báo để tỏ ra cân bằng: "tùy quyết định" nghĩa là công ty không nợ bạn khoản thưởng nào; hãy nói rõ
- [ ] Không trình bày quy định phụ thuộc khu vực pháp lý (chi trả phép, thu hồi) như quy tắc phổ quát
- [ ] Không chấp nhận giá trị cổ phần theo bề ngoài mà không gắn cờ giả định định giá
- [ ] Không để con số "tổng thu nhập" đứng nguyên: hãy dựng lại nó từ văn bản chính sách

## Dựa trên

Thực hành rà soát offer: dựng lại tổng thu nhập, giải mã văn bản chính sách, lập danh sách câu hỏi trước khi ký.
