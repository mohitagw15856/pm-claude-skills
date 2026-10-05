# PM Skills in Word and WPS · Word 与 WPS 加载项

A task pane for **Microsoft Word** and **WPS 文字** that brings the library into the document you are writing:

- **Insert template**: drop a skill's output structure (the headings and tables of a PRD, a 周报, a demand letter) into the document to fill in yourself.
- **Insert full skill**: paste the whole skill, for example to share the method with a colleague.
- **Run on the selected text**: send the selection to your own OpenAI-compatible endpoint (DeepSeek, 魔搭 ModelScope, 通义千问, a local Ollama, OpenAI) with the skill as instructions, read the result, then insert it.

The pane is served from the project site (`office/taskpane.html`), so there is nothing to host and updates arrive by themselves. Both add-ins are **sideloaded**: listing them in the Microsoft or WPS stores would need publisher accounts, which this project does not have. The API key you enter stays in the pane's local storage and is sent only to the endpoint you choose.

## Word

`word/manifest.xml` is the add-in manifest.

- **Word on the web**: open a document, then **Home → Add-ins → More add-ins → My add-ins → Upload my add-in**, and choose `manifest.xml`.
- **Word for Windows**: put `manifest.xml` in a shared network folder, add that folder under **File → Options → Trust Center → Trust Center Settings → Trusted Add-in Catalogs** (tick "Show in Menu"), restart Word, then **Home → Add-ins → Shared Folder**.
- **Word for Mac**: copy `manifest.xml` to `~/Library/Containers/com.microsoft.Word/Data/Documents/wef/` (create the folder if needed), restart Word, then **Home → Add-ins**.

Microsoft's own guide: <https://learn.microsoft.com/office/dev/add-ins/testing/test-debug-office-add-ins>. Organisations can deploy the same manifest to everyone from the Microsoft 365 admin centre (Integrated apps).

## WPS 文字

The add-in loads online from the project site (`office/wps/`), described by `wps/jsplugins.xml`.

1. Close WPS.
2. Copy `wps/jsplugins.xml` into the WPS `jsaddons` folder, or merge its `<jspluginonline>` line into the `jsplugins.xml` already there:
   - Windows: `%APPDATA%\kingsoft\wps\jsaddons\`
   - Linux (including 统信 UOS and 银河麒麟): `~/.local/share/Kingsoft/wps/jsaddons/`
3. Open WPS 文字. A **PM Skills** tab appears; click **打开技能面板** to open the pane.

WPS's JS add-in support differs between versions and editions; check WPS's developer documentation (<https://open.wps.cn>) if the tab does not appear. Some managed (enterprise) editions turn third-party add-ins off.

## 中文说明

- **插入模板**：把技能的输出结构（PRD、周报、催款函的标题和表格）插入文档，自己填写。
- **对选中文字运行**：把选中的文字发给你自己的模型接口（DeepSeek、魔搭、通义千问、本地 Ollama 等），技能作为指令，检查结果后再插入。Key 只保存在本机。
- **安装方式**：两个加载项都需要手动加载（旁加载），因为上架微软或 WPS 的应用商店需要开发者账号。WPS 的安装步骤见上面的“WPS 文字”一节：把 `jsplugins.xml` 复制到 `jsaddons` 文件夹，重启 WPS 文字即可看到“PM Skills”选项卡。

## Files

| File | What it is |
|---|---|
| `word/manifest.xml` | Word add-in manifest (task pane, read and write document) |
| `wps/jsplugins.xml` | WPS online add-in entry |
| `../../web/office/taskpane.html`, `taskpane.js` | The shared task pane, served at `/office/` |
| `../../web/office/wps/` | WPS ribbon (`ribbon.xml`), entry page and callbacks (`main.js`) |
