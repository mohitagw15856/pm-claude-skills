# Example: cn-inquiry-reply

## What this skill does

Reads an export inquiry, judges its quality and the buyer's likely type, and writes a short reply in English with a Chinese version that answers first, qualifies the buyer and moves to a quotation, plus a follow-up sequence and compliance flags.

## How to trigger it

### Example 1: a German distributor asking for price and MOQ

**You say:**
> "阿里国际站询盘：Hi, we are interested in your LED strip lights, please send price and MOQ. We are a distributor in Germany. 我们是工厂，有 CE 和 RoHS 认证，MOQ 500 卷，交期 15 天，FOB 深圳单价大概 3.2 到 4.5 美元。帮我回复，要英文和中文对照。"

**Claude produces (excerpt):**

**询盘分析**：较泛的询盘，但给出了国家和身份（分销商）。优先级：中。需要核实公司网站和邮箱域名。

**Reply (English)**

Subject: LED strip lights for your German distribution: MOQ 500 rolls, CE and RoHS

Hi Markus,

Thank you for your inquiry. Our LED strips start at 500 rolls per order, with FOB Shenzhen prices from USD 3.20 to 4.50 per roll depending on LED density and IP rating. All models carry CE and RoHS certificates, and our standard lead time is 15 days.

To send you an exact quotation, could you tell me:
1. Which voltage, LED density and IP rating you need?
2. Your expected quantity per order and per year?
3. Your delivery port and preferred Incoterm?

Happy to send samples once we know the specification.

Best regards,
Lily Chen, Export Sales

**中文对照**：（同上内容的中文版本，供主管审核）

**跟进节奏**：第 3 天发两款热销型号的实拍图；第 7 天发一个欧洲客户案例；第 14 天告知库存或交期变化。

## Tips for best results

- Paste the whole inquiry with the buyer's email domain.
- Give your price range and what you will not concede.
- Run your normal sanctions and export-control checks before quoting.

## Related skills

- `cn-trade-quotation` for the formal quotation sheet
- `cn-letter-of-credit-check` once an L/C arrives
