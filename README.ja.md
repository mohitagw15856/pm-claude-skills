<sub>[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [한국어](README.ko.md) · **日本語** · [Español](README.es.md) · [Português (BR)](README.pt-BR.md)</sub>

# 🧠 PM Skills: プロフェッショナルの Agent Skills

> この日本語版は機械翻訳を元に作成されています。ネイティブスピーカーによる修正 PR を歓迎します。訳し方は [CONTRIBUTING.md](CONTRIBUTING.md) をご覧ください。

> **AI にひとこと頼むだけで、完成した成果物が返ってくる。** PRD、ステークホルダー向け報告、意思決定の判断を、シニア PM の水準で。

インストールしてから、アシスタントにこう貼り付けてみてください:

```text
顧客ヒアリング 6 件の生メモです: [メモを貼り付け]。
これを 1 ページの PRD、担当者つきのリスク一覧、
今日そのまま送れる経営層向け報告にまとめてください。
```

アシスタントが [user-interview-synthesis](skills/user-interview-synthesis/SKILL.md)、[prd-template](skills/prd-template/SKILL.md)、[stakeholder-update](skills/stakeholder-update/SKILL.md) を読み込み、助言ではなく 3 つの文書そのものを返します。

PM Skills は、1285 個のプレーン Markdown スキル(SKILL.md)からなるオープンソースのライブラリです。それぞれが 1 つの業務を、枠組み・出力テンプレート・品質チェック・アンチパターンつきで、プロの水準でこなせるように AI アシスタントに教えます。MIT ライセンスで、Claude、ChatGPT、Gemini、Cursor、Codex で動きます。(PM は Professional の略で、プロダクトマネージャー専用ではありません。)

## ⚡ 30 秒でインストール

```bash
npx pm-claude-skills add          # どのツールでも: Cursor、Codex、Windsurf など
# Claude Code では:  /plugin → 「pm-skills」を検索(Anthropic 公式ディレクトリ)
npx pm-claude-skills setup        # 対話式: エージェント検出、プラン表示、バックアップつき
```

スキルは AI が読む Markdown ファイルにすぎません。インストールはテキストファイルのコピー、アンインストールはその削除で、環境を壊すことはありません。ツール別の手順: [docs/installation.md](docs/installation.md)

## 🔄 最新の状態を保つ

スキルは毎週改善されています。どの方法でインストールしても、更新は一手順です。

| インストール方法 | 更新方法 |
|---|---|
| `npx pm-claude-skills add`（どのツールでも） | 同じコマンドをもう一度実行します。`npx pm-claude-skills doctor` で、インストール済みと古くなったスキルを確認できます。 |
| Claude Code のマーケットプレイス | `/plugin` を開き、pm-claude-skills マーケットプレイスを選んで Update を押します。 |
| Python パッケージ | `pip install -U pm-skills` |
| MCP サーバー | MCP 設定で `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp` を使うと、起動ごとに最新版になります。 |
| このリポジトリのフォーク | 同梱の `sync-fork.yml` ワークフローが毎週 `main` を上流に追従させます。[docs/fork-sync.md](docs/fork-sync.md) を参照。 |

困ったときは **[よくある質問（日本語）](docs/faq/ja.md)** をご覧ください。

## 🗺 できること

| 今週の仕事 | バンドル | 得られるもの | 用意するもの |
|---|---|---|---|
| リサーチを意思決定に変える | [pm-discovery](plugins/pm-discovery/) | インタビューガイド、引用つきの定性分析 | 文字起こしや生メモ |
| PRD と報告を書く | [pm-essentials](plugins/pm-essentials/) | PRD、議事録、ステークホルダー報告、競合分析 | 機能概要と目標 |
| 四半期を計画する | [pm-planning](plugins/pm-planning/) | OKR、RICE などの優先順位付け、ロードマップ | バックログと会社目標 |
| スプリントとローンチ | [pm-delivery](plugins/pm-delivery/) | スプリント計画、技術仕様、A/B テスト計画 | ストーリー、工数、日程 |
| 数字を読む | [pm-data](plugins/pm-data/) | 指標設計、コホート・解約分析 | 自分の指標か CSV |
| 難しい判断を下す | [pm-decisions](plugins/pm-decisions/) | 確率つきの ship-or-slip などの型付き判断 | 判断材料の実際の状態 |
| 契約書を読んでから署名する | [pm-decoders](plugins/pm-decoders/) | 賃貸契約・請求書・待遇の平易な解読と金額計算 | 文書そのもの |
| 転職活動 | [pm-jobsearch](plugins/pm-jobsearch/) | 求人票の解読、面接準備、フォローアップ | 求人票と履歴書 |

全 152 バンドルとインストールコマンド: [docs/catalogue.md](docs/catalogue.md) · 全スキル一覧: [SKILLS.md](SKILLS.md)

## 🇯🇵 日本語のスキル

**pm-japan** バンドルには日本語で書かれたスキルがあります: [jp-year-end-adjustment](skills/jp-year-end-adjustment/SKILL.md)(年末調整)、[jp-tax-return](skills/jp-tax-return/SKILL.md)(確定申告)、[jp-resignation-procedures](skills/jp-resignation-procedures/SKILL.md)(退職の手続き)、[jp-ringisho](skills/jp-ringisho/SKILL.md)(稟議書)。

```bash
npx pm-claude-skills add --bundle pm-japan
```

## ✅ 信頼と品質

- すべての変更は CI で検査されます: 構造(SkillCheck L3、全 1285 スキル)、セキュリティ監査、重複チェック、翻訳の整合、プロンプトインジェクション試験。
- 1285 スキル中 389 に評価ケースがあり、28 はブラインド採点済み。未採点のものは未採点と明示しています。
- 法律・税務・労務系のスキルは明確な免責事項で終わり、相談すべき窓口を示します。専門家の代わりにはなりません。
- プライバシー: ローカルで完結します。スキル、CLI、エクスポートは何も送信しません。詳細: [docs/TELEMETRY.md](docs/TELEMETRY.md) · [SECURITY.md](SECURITY.md) · ライセンス: [MIT](LICENSE)

## 💛 このプロジェクトのスポンサーになる

このスキルライブラリを使うプロダクトマネージャー、エンジニア、創業者、運用担当者に、あなたの製品を届けられます。枠は 6 種類あり、それぞれ契約期間中は 1 社だけに提供します。

<!-- sponsor-reach:start (written by scripts/sponsor-report.mjs --update-docs) -->
2026年11月26日 時点の数値:

| 指標 | 数値 | 出典 |
|---|---:|---|
| GitHub スター | 1,608 | GitHub |
| フォーク | 290 | GitHub |
| リポジトリのページビュー（直近 14 日） | 14,366 | GitHub トラフィック |
| リポジトリのユニーク訪問者（直近 14 日） | 6,860 | GitHub トラフィック |
| README バナーが表示されるリポジトリのトップページのビュー（直近 14 日） | 1,720 (1,380 ユニーク) | GitHub トラフィック |
| npm ダウンロード（直近 7 日） | 1,962 | npm |
| npm ダウンロード（直近 30 日） | 11,086 | npm |

この 14 日間で最も多い流入元: Google、4,772 ビュー。
<!-- sponsor-reach:end -->

| 予約できる枠 | 表示される場所 |
|---|---|
| README バナー | [英語版 README](README.md) の最上部、タイトルの直下（ライトとダーク） |
| 中国語 README バナー | [README.zh-CN.md](README.zh-CN.md) の最上部。Gitee と GitCode のミラーのトップページでもあります |
| プレイグラウンドとサイト | スポンサー一覧とプレイグラウンドのフッター |
| リリースニュースレター | 各リリース号に、スポンサーと明記した 1 行 |
| 今週のスキル | 毎週の注目スキル投稿に「提供」の 1 行 |
| スポンサードスキル | スポンサー提供と明記した、自社製品についてのスキル |

**予約と料金のお問い合わせ:** [mohit15856@gmail.com](mailto:mohit15856@gmail.com?subject=Sponsoring%20PM%20Skills) までメールでご連絡ください。期間、毎月お送りするレポート、スポンサードスキルのルールは **[SPONSORS.md](SPONSORS.md)**（英語）にあります。個人の方は [GitHub Sponsors](https://github.com/sponsors/mohitagw15856) から支援できます。

現在のスポンサー: **[FocuSee](https://focusee.ai/?utm_source=github&utm_medium=display&utm_campaign=pm_claude_skills_2611&utm_content=readme_sponsor_section)**（2026 年 11 月 25 日から）

## 🤝 参加する

スキルの追加は PR で([執筆標準](SKILL-AUTHORING-STANDARD.md)・[CONTRIBUTING](CONTRIBUTING.md))、欲しいスキルは [リクエスト](https://github.com/mohitagw15856/pm-claude-skills/issues/new?labels=skill-request&title=Skill:%20)から。使ってみた結果の共有は [Show and Tell](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=show-and-tell.yml) へ。

プロジェクト: https://github.com/mohitagw15856/pm-claude-skills
