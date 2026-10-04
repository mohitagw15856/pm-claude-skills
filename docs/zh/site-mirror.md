# 网站国内镜像（阿里云 OSS）

> **In English, briefly.** `.github/workflows/mirror-site-cn.yml` copies the published playground, including the live README cards, to an Alibaba Cloud OSS bucket after every deploy, so it loads reliably inside mainland China. It does nothing until four repository secrets are set. Serving web pages from a mainland bucket needs a custom domain, and a custom domain on a mainland bucket needs an ICP filing (备案). Without one, use a Hong Kong bucket or mirror only the images. Steps below, in Chinese.

GitHub Pages 在国内有时打不开或很慢。这个工作流在每次部署 GitHub Pages 之后，把同一份网站文件（包括 README 里的实时卡片）同步到阿里云 OSS 的一个存储空间（Bucket）里。

## 先想清楚：要不要备案

| 方案 | 需要备案吗 | 能做什么 |
|---|---|---|
| 中国内地地域的 Bucket + 自定义域名 | **需要**，域名要先完成 ICP 备案 | 网页、图片都能正常访问，速度最好 |
| 中国内地地域的 Bucket，只用 OSS 默认域名 | 不需要 | 图片、JSON、日历文件可以直接引用；**网页文件通过默认域名访问会被强制下载**，不能当网站浏览 |
| 中国香港地域的 Bucket + 自定义域名 | 不需要 ICP 备案 | 网页、图片都能访问；内地访问速度通常比 GitHub Pages 稳定，但不如内地节点 |

如果暂时没有备案的域名，建议先用第二种方案：只让 README 里的实时卡片图片走国内地址，网页仍然用 GitHub Pages 和 Gitee 镜像。具体规则以阿里云当前文档为准，开通前请再核对一次。

## 第一步：创建 Bucket

1. 登录阿里云控制台，打开“对象存储 OSS”，新建 Bucket，例如 `pm-skills-site`。
2. 地域按上表选择；读写权限选“公共读”（网站本来就是公开的）。
3. 如果要当网站用：在 Bucket 的“数据管理 → 静态页面”里，把默认首页设为 `index.html`，默认 404 页设为 `404.html`（没有的话可以留空）。
4. 记下 Endpoint，例如 `oss-cn-hangzhou.aliyuncs.com`。

## 第二步：创建只能写这个 Bucket 的 RAM 用户

不要用主账号的 AccessKey。在“访问控制 RAM”里新建一个用户，只开“OpenAPI 调用访问”，然后给它一条只针对这个 Bucket 的自定义权限策略，例如：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["oss:PutObject", "oss:GetObject", "oss:ListObjects", "oss:GetBucketInfo"],
      "Resource": ["acs:oss:*:*:pm-skills-site", "acs:oss:*:*:pm-skills-site/*"]
    }
  ]
}
```

把 `pm-skills-site` 换成你的 Bucket 名，创建 AccessKey，保存好 ID 和 Secret。

## 第三步：在 GitHub 仓库里加四个 Secret

仓库 Settings → Secrets and variables → Actions → New repository secret：

| 名称 | 值 |
|---|---|
| `OSS_ACCESS_KEY_ID` | RAM 用户的 AccessKey ID |
| `OSS_ACCESS_KEY_SECRET` | RAM 用户的 AccessKey Secret |
| `OSS_BUCKET` | Bucket 名，例如 `pm-skills-site` |
| `OSS_ENDPOINT` | Endpoint，例如 `oss-cn-hangzhou.aliyuncs.com` |

加好以后，在 Actions 里手动运行一次 “Mirror site to China (Alibaba Cloud OSS)”。之后每次网站部署成功，它都会自动同步；实时卡片的缓存时间设为 10 分钟，其他文件 1 小时。

## 第四步（可选）：自定义域名和 CDN

- 在 Bucket 的“Bucket 配置 → 域名管理”里绑定自定义域名。内地 Bucket 的域名必须先完成 ICP 备案。
- 访问量大时可以开启阿里云 CDN，回源到这个 Bucket。
- 配好以后，可以把 `README.zh-CN.md` 里实时卡片的地址从 `https://mohitagw15856.github.io/pm-claude-skills/live/...` 换成你的域名，再在 Gitee 镜像上同步。

## 费用

网站全部文件大约一百多 MB，存储费用很低；主要费用是外网流出流量，按实际访问量计费。开通前请看阿里云 OSS 的当前价格，并给账号设置费用预警。

## 工作流做了什么

`.github/workflows/mirror-site-cn.yml`：

1. 在 “Deploy Skill Playground” 成功之后触发（也可以手动运行）。
2. 下载那次部署上传的 Pages 文件包，解压。
3. 下载固定版本的 ossutil，并校验 SHA-256。
4. 用 `ossutil cp -r -u` 增量同步到 Bucket。

没有设置这四个 Secret 时，工作流会显示一条提示然后跳过，不会报错。
