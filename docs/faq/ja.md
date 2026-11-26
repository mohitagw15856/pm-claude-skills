# よくある質問

[English](README.md) · [简体中文](zh-CN.md) · [繁體中文](zh-TW.md) · 日本語 · [한국어](ko.md) · [Español](es.md) · [Português](pt-BR.md)

## スキルとは何ですか。モデルに直接聞くのと何が違いますか

スキルは `SKILL.md` という素の Markdown ファイルで、AI アシスタントに一つの専門的な仕事をベテランの水準でこなす方法を教えます。モデルに直接聞くと、記憶からの答えが返り、構成も深さも毎回変わります。スキルを読み込むと、モデルは書かれた手順に従います。足りない入力を確認し、決まった構成で出力し、チェックリストで自分の仕事を検証します。数字には計算過程が付きます。スキルはモデルの代わりではなく、モデルに方法を与えるものです。

## 無料ですか。仕事で使えますか

はい。ライブラリは MIT ライセンスです。商用利用、改変、社内ツールへの組み込みができます。費用は、あなたが使うモデル提供者のトークン料金だけです。

## データはどこかに送られますか

いいえ。インストール後、スキルはあなたのパソコン上の Markdown ファイルです。ランタイムもアカウントも不要で、テレメトリは既定で無効です。会話は、あなたが選んだ AI ツールとモデルにだけ、それぞれのプライバシーポリシーのもとで送られます。オンラインのプレイグラウンドでは API キーはブラウザ内に留まり、リクエストは提供者に直接送られます。コマンドラインの `run` サブコマンドには任意の利用カウンターがあり、`PM_SKILLS_TELEMETRY=1` を設定した場合にのみスキル名だけを送ります。

## どのツールで使えますか

Claude Code、Claude Desktop と Cowork、Claude.ai、Cursor、Codex、Windsurf、Cline、Zed、Gemini CLI など、Markdown のルールを読めるか MCP を話せるツールならどれでも使えます。`npx pm-claude-skills add --agent <ツール>` が各ツールの期待する場所にファイルを書き込みます。スキルは説明文に基づいて発火するので、毎回すべてが読み込まれるわけではありません。

## インストール方法は

- **どのツールでも:** `npx pm-claude-skills add` を実行し、案内に従います。
- **Claude Code:** `/plugin` を開き、公式ディレクトリで pm-skills を検索して、必要なバンドルをインストールします。
- **Python:** `pip install pm-skills`
- **MCP:** MCP 設定に `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp` を追加します。
- **インストール不要:** [プレイグラウンド](https://mohitagw15856.github.io/pm-claude-skills/) ならブラウザでどのスキルも動きます。

## コードは書けません。それでも使えますか

はい。[プレイグラウンド](https://mohitagw15856.github.io/pm-claude-skills/) を開き、スキルを選んで、やりたいことを普通の言葉で伝えてください。Claude.ai のユーザーは Add-to-Claude ボタンからスキルを ZIP でアップロードできます。Claude Desktop のように MCP に対応したデスクトップアプリなら、ターミナルなしで設定画面から MCP サーバーを追加できます。

## スキルが発火しません

はっきり言い切ってください。「これを手伝って」ではなく、スキルの説明文にあるように「〜の PRD を書いて」と頼みます。`npx pm-claude-skills doctor` でインストール済みか確認してください。それでも動かなければ、使った文言をそのまま添えて[バグ報告](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)を送ってください。

## 更新方法は

インストールコマンドをもう一度実行します。`npx pm-claude-skills doctor` でインストール済みと古くなったスキルが分かります。Claude Code では `/plugin` を開いて pm-claude-skills マーケットプレイスを更新します。Python は `pip install -U pm-skills` です。リポジトリをフォークしている場合は、同梱の `sync-fork.yml` ワークフローが毎週 `main` を上流に追従させます。[fork-sync.md](../fork-sync.md) を参照してください。

## 法律、税務、人事の回答は信頼できますか

助言ではなく、準備資料として扱ってください。これらのスキルは計算過程を示し、確認が必要な数字を列挙し、相談すべき窓口（労働基準監督署、税務署、弁護士など）を挙げます。ルールは地域で異なり、よく変わります。規制に関わるスキルの公式情報源は週次で変更を監視していますが、最新の現地ルールが常に優先です。

## 社内で、独自のスキルと一緒に使えますか

はい。Org Edition はコンテナとして動きます。`docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills` を実行し、独自スキルを公開スキルの隣にマウントします。独自スキルは別のフォルダかリポジトリに置くと、このライブラリのコピーをいつでも更新できます。

## スキルの要望、バグ報告、貢献はどうすれば

Issue フォームを使ってください。[スキルの要望](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml)、[バグ報告](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml)、[質問](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml)。スキルを追加するには [CONTRIBUTING.md](../../CONTRIBUTING.md) を読んでプルリクエストを送ってください。👍 が多い要望から順に作られます。
