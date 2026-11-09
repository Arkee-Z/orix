# Orix · 社区同步

Orix 是静态站，原文永远在本站。社区同步不是把内容托管出去，而是：

1. 本站为 canonical；
2. 通过 RSS / JSON Feed / community manifest 暴露内容；
3. 每篇文章可在 frontmatter 里记录社区副本链接；
4. 构建后可生成知乎、微信公众号、B站、网易云音乐的导出包；
5. 平台 API 的自动发布/回读作为后续适配器，需要凭据，不默认执行。

## 产物

构建后：

- `/zh/rss.xml`、`/en/rss.xml`
- `/zh/feed.json`、`/en/feed.json`
- `/zh/community.json`、`/en/community.json`

`community.json` 包含正文 Markdown、canonical、标签、系列信息、评分与已有的社区链接，适合作为同步层的输入。

## 导出

```sh
npm run build
npm run sync:export
```

输出到 `community-export/`（已 gitignore）：

```text
community-export/
├─ zh/
│  ├─ zhihu/
│  ├─ wechat/
│  ├─ bilibili/
│  └─ netease/          # 仅音乐条目
├─ en/
└─ manifest.json
```

这是 **dry run**：不会调用任何平台接口，也不会登录账号。你可以人工粘贴，或在适配器里接入已获授权的 API。

## 在文章里记录同步副本

```yaml
syndication:
  - platform: zhihu
    url: "https://zhuanlan.zhihu.com/p/xxxx"
    label: "知乎专栏"
  - platform: wechat
    url: "https://mp.weixin.qq.com/s/xxxx"
  - platform: bilibili
    url: "https://www.bilibili.com/read/cvxxxx"
  - platform: netease
    url: "https://music.163.com/#/album?id=xxxx"
```

文章页会显示“社区同步 / Community”区块，链接带 `rel="syndication"`。

## 平台接口的现实

- **知乎**：没有面向普通账号的公开写接口；以导出 Markdown + 人工发布为主。
- **微信公众号**：需要认证公众号、access_token、素材上传等凭据；自动发布需要单独适配器。
- **B站**：专栏/视频接口与账号权限相关；先导出标题、简介、标签和正文。
- **网易云音乐**：没有开放的通用乐评发布接口；先导出乐评文本与唱片链接。

因此默认只做**可同步的导出与链接层**，不绕过平台权限。要接自动发布，给对应平台的凭据与接口文档，再在 `scripts/community-export.mjs` 的 `PLATFORMS` 旁边增加 publish adapter。

## 站点地址

`src/data/site.ts` 里的 `url` 目前是 `https://orix.example` 占位。部署前改成正式域名，RSS、JSON Feed、canonical 和导出 manifest 都会使用它。

## 曲库与画廊

曲库音频与画廊图片是 `public/` 下的静态资源；`community.json` 与导出包默认只同步文本、元数据和链接，不复制二进制文件。无论音频或画作放在哪里，canonical 仍然指回本站作品页。
