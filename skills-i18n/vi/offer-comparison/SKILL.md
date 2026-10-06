---
name: offer-comparison
language: vi
description: "So sánh hai hay nhiều offer việc làm dưới dạng đường cong tổng đãi ngộ trong bốn năm: mốc cliff khi vesting, thưởng, khoản đóng góp đối ứng 401(k) (quỹ hưu trí của Mỹ) và năm giao cắt được tính toán, không phải cảm tính. Dùng khi được hỏi so sánh các offer, offer nào trả nhiều hơn theo thời gian, mô hình hóa lịch vesting cổ phần, hoặc offer từ startup có thực sự đáng không. Tạo ra bảng đãi ngộ theo từng năm và cộng dồn cho mỗi offer, phân tích điểm giao cắt, và các đòn bẩy đàm phán xếp hạng theo tác động bằng tiền."
---

> Bản dịch tiếng Việt của [offer-comparison](../../../skills/offer-comparison/SKILL.md). Bản tiếng Anh là bản chuẩn.

# Kỹ năng So sánh Offer

Các offer thường được nói đến bằng cảm giác ("startup có nhiều tiềm năng hơn") nhưng rốt cuộc chúng quy về những con số gắn với ngày tháng. Kỹ năng này tính toán các đường cong: mỗi offer trả bao nhiêu trong từng năm của bốn năm tới, các đường cắt nhau ở đâu, và đòn bẩy nào trong offer yếu hơn thực sự có thể thay đổi kết quả.

## Kỹ năng này tạo ra gì

- **Bảng đãi ngộ**: tổng theo từng năm và cộng dồn cho mỗi offer, từ script
- **Phân tích điểm giao cắt**: offer nào dẫn đầu vào lúc nào, và thứ hạng đó phụ thuộc vào giả định nào
- **Diễn giải rủi ro**: cổ phần công ty tư nhân được trình bày lại một cách trung thực thay vì theo mệnh giá
- **Đòn bẩy đàm phán**: xếp hạng theo tác động bằng tiền trên mỗi đơn vị "ngại khi đề nghị"

## Đầu vào bắt buộc

Hỏi những thông tin này nếu chưa được cung cấp:
- **Cho mỗi offer:** lương cơ bản, % thưởng, giá trị cổ phần được cấp, số năm vesting, số tháng cliff, tần suất vesting, mức đóng góp đối ứng 401(k) (% và mức trần), bất kỳ khoản cấp bổ sung (refresher) nào đã được hứa
- **Khoảng thời gian dự kiến của người dùng**: dự định ở lại 2 năm hay 4 năm sẽ thay đổi câu trả lời, vì cliff thay đổi
- **Quan điểm về rủi ro cổ phần**: RSU của công ty niêm yết tính theo mệnh giá; với cổ phần công ty tư nhân, thống nhất một mức chiết khấu với người dùng (ví dụ cắt giảm 50-75% trước vòng Series B) và đưa con số đã chiết khấu vào script, *ghi rõ là đã chiết khấu*

## Công cụ hỗ trợ lập trình

```bash
python3 scripts/offer_comparison.py offers.json
cat offers.json | python3 scripts/offer_comparison.py - --json
```

Cấu trúc đầu vào nằm trong docstring của script. Script tính vesting theo từng tháng (cliff 12 tháng sẽ giải ngân phần tích lũy của năm đầu), thưởng và khoản đối ứng theo năm, rồi báo cáo offer dẫn đầu về tổng cộng dồn và năm giao cắt. **Script định giá cổ phần đúng bằng con số bạn đưa vào**: việc điều chỉnh rủi ro là đầu vào của bạn, hiển thị rõ ràng, không bao giờ là một giả định ẩn.

## Khung tư duy: Sự phán đoán xung quanh phép tính

- **Cliff so với khoảng thời gian ở lại**: nếu dự kiến chỉ ở lại 18 tháng thì cổ phần năm thứ 4 là hư cấu; hãy so sánh theo khoảng thời gian thực tế của người dùng, không theo thời hạn của gói cổ phần
- **Một đồng rủi ro ≠ một đồng lương**: không bao giờ so cổ phần trên giấy của công ty tư nhân với tiền mặt theo tỷ lệ 1:1; hãy trình bày so sánh ở 2-3 mức chiết khấu nếu người dùng ngần ngại chọn một mức
- **Refresher là chính sách, không phải lời hứa**: chỉ mô hình hóa nếu có văn bản; nếu không, nhắc đến như một khoản tiềm năng nằm ngoài bảng
- **Các đòn bẩy, theo thứ hạng:** lương cơ bản (cộng dồn vào thưởng và khoản đối ứng) → gói cổ phần → thưởng ký hợp đồng (một lần, dễ được đồng ý nhất) → điều chỉnh cliff/ngày bắt đầu

## Định dạng đầu ra

---

# Offer Comparison: [A] vs [B]

## Các đường cong
[Kết quả script: theo từng năm, cộng dồn, offer dẫn đầu, điểm giao cắt]

## Thứ hạng phụ thuộc vào điều gì
[1-2 giả định có thể đảo ngược câu trả lời (thường là mức chiết khấu cổ phần tư nhân và khoảng thời gian ở lại), mỗi giả định kèm kết quả khi bị đảo ngược.]

## Đòn bẩy đàm phán
| Đòn bẩy | Áp dụng cho | Thay đổi tổng 4 năm | Độ khó khi đề nghị |
|---|---|---|---|

*Mô hình mang tính giáo dục, không phải lời khuyên tài chính. Hãy xác minh với chuyên gia được cấp phép trước khi hành động.*

---

## Kiểm tra chất lượng

- [ ] Mức chiết khấu cổ phần cho công ty tư nhân được nêu rõ và người dùng đã đồng ý
- [ ] So sánh được trình bày theo khoảng thời gian người dùng nêu, không chỉ ở mốc 4 năm
- [ ] Phần "thứ hạng phụ thuộc vào điều gì" trình bày thứ hạng khi bị đảo ngược, không chỉ nêu tên rủi ro
- [ ] Các đòn bẩy có tác động bằng tiền được tính từ chính các offer thực tế
- [ ] Dòng tuyên bố miễn trừ trách nhiệm xuất hiện trong tài liệu

## Những điều cần tránh

- [ ] Đừng so một đồng cổ phần rủi ro với một đồng lương theo tỷ lệ 1:1: mức chiết khấu chính là phần phân tích
- [ ] Đừng giấu cliff vesting trong các con số trung bình năm: năm đầu có cliff là một câu chuyện riêng
- [ ] Đừng mô hình hóa refresher chưa có văn bản như thu nhập
- [ ] Đừng tuyên bố offer thắng cuộc mà không nêu chiến thắng đó phụ thuộc vào giả định nào
- [ ] Đừng trình bày kết quả của mô hình mà không kèm các giả định

## Ví dụ câu kích hoạt

- "So sánh các lời mời làm việc."
- "Lời mời nào trả nhiều hơn về lâu dài?"
- "Tính lịch trao cổ phần của tôi."
- "Lời mời từ startup có thật sự đáng không?"
