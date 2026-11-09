# Orix 文艺志

一个以**中文为主**的多语种个人文艺志。它不按“文学 / 音乐 / 美术”做目录，也不把内容切成板块；首页本身就是一本 **issue**，按版面展开。

顶部只有三个入口：**卷首 / 关于 / 联系**。整本刊物的顺序是：封面 → 特稿 → 图版 → 聆听 → 版权页。聆听室和画廊是版面的延伸，不在导航里做分类。

![首页](docs/preview-desktop.jpg)

## 版面

- **封面**：刊名、卷号、本期选读。
- **特稿**：一篇主文，一段正文摘引，加同期的其他文字；是版面，不是文章列表。
- **图版**：画框墙直接嵌在首页上，作为一整版图像；可进入完整画廊。
- **聆听**：播放器与曲库作为一整版声音；可进入完整聆听室。
- **版权页**：卷号、地点、起始年份。

![图版与特稿](docs/preview-spreads.jpg)

## 聆听室与画廊

- **聆听室**：播放/暂停、上一首/下一首、进度拖动、自动接下一首；曲库与封面；不自动播放。
- **画廊**：卡纸、画框、错落的画廊墙；点击画框打开灯箱；作品详情页有多图展示与评论正文。

![聆听室](docs/preview-music.jpg)

![画廊](docs/preview-gallery.jpg)

## 内容怎么发

```text
src/content/
├─ writing/   # 特稿与其他文字
├─ music/     # 关于声音的文字
├─ tracks/    # 曲库
└─ art/       # 图像与文字
public/
├─ audio/     # 音频
├─ music/     # 专辑封面
└─ art/       # 画廊图片
```

`kind: article | fiction | essay | poem` 仍保留，但它只是排版信息：小说可以有 `series`/`order`，诗会按纯文本保留换行。它不会生成公开分类页，也不会出现在导航里。首页会自动把最新文字放进特稿，把画作放进图版，把曲目放进聆听。

音乐曲目示例：

```yaml
---
title: "纸页"
date: 2026-11-02
lang: zh
artist: "Orix Studio"
album: "Studies in Paper"
duration: "0:32"
audio: "/audio/paper.m4a"
cover: "/music/paper-cover.svg"
order: 1
---
```

美术作品示例：

```yaml
---
title: "静室：三幅习作"
date: 2026-11-08
lang: zh
artist: "Orix Studio"
work: "静室"
medium: "数字绘画"
year: 2026
images:
  - src: "/art/study-ochre.svg"
    alt: "赭色与朱红构成的抽象习作"
    caption: "习作一：赭色的墙"
---
```

完整字段、系列、诗、乐评、画廊、草稿和译文规则见 **[CONTENT.md](CONTENT.md)**。

## 视觉系统

这套主题是“当代文学评论刊物”，首页按版面组织，而不是按目录组织：

- 书眉/页脚/聆听室/重点面板：深松绿
- 纸面：骨白
- 强调：陶土红、赭金、鼠尾草
- 标题：Fraunces（拉丁）/ Noto Serif SC（中文）
- 界面：Inter
- 用色块、卡片、留白和深色面板建立层级；不使用页面分割线
- 画框是唯一的边框例外

完整的色板、字号、版面顺序、两栏编辑头、图版/聆听模块和新增内容的规则见 **[DESIGN.md](DESIGN.md)**。

## 演示内容

- `src/content/tracks/`：2 首中文 + 1 首英文示例音轨
- `src/content/art/`：1 组中文 + 1 组英文示例画作
- `src/content/writing/first-issue-note.md`：中文卷首语
- 英语版保留原有 5 篇文章

替换或删除这些文件即可；播放器和画廊不需要改代码。

## 路由

```text
/                         -> /zh/
/zh/                      整本 issue：封面 / 特稿 / 图版 / 聆听 / 版权页
/zh/music                 聆听室（播放器 + 曲库）
/zh/art                   完整画廊
/zh/literature/<slug>     单篇文字（技术路径）
/zh/literature/series/*   小说 / 诗集系列
/zh/about, /zh/contact    关于 / 联系
/en/...                   英文版对应路由
```

## 运行

```sh
npm install
npm run dev          # 本地写作预览；草稿可见
npm run build        # 静态输出到 dist/
npm run preview      # 预览构建
npm run sync:export  # 构建后导出社区同步包
```

## 社区同步

构建后生成：

- `/zh/rss.xml`、`/en/rss.xml`
- `/zh/feed.json`、`/en/feed.json`
- `/zh/community.json`、`/en/community.json`

内容支持 `syndication` 链接；构建后可导出知乎/微信公众号/B站/网易云音乐包（dry run），不会调用第三方接口。详见 **[SYNC.md](SYNC.md)**。

## 站点地址

`src/data/site.ts` 的 `url` 默认是 `https://orix.example`。部署前用环境变量覆盖：

```sh
ORIX_SITE_URL=https://your-domain.example npm run build
```

RSS、JSON Feed、canonical、hreflang 和社区导出都会使用它。

## 结构

```text
src/
├─ components/
│  ├─ MusicPlayer.astro     # 播放器 + 曲库
│  ├─ ArtWall.astro         # 画框墙
│  ├─ ArtLightbox.astro
│  ├─ ReviewList.astro
│  ├─ SyndicationLinks.astro
│  └─ Tabs.astro            # 卷首/关于/联系
├─ content/ writing/ music/ art/ tracks/
├─ i18n/ui.ts
├─ layouts/Layout.astro
├─ lib/posts.ts
├─ pages/[lang]/
│  ├─ index.astro           # 整本 issue 的版面
│  ├─ literature/           # 单篇与系列
│  ├─ music/ art/           # 聆听室 / 完整画廊
│  ├─ about.astro contact.astro
│  └─ rss.xml.ts feed.json.ts community.json.ts
├─ styles/global.css
public/
├─ fonts/                   # Noto Serif SC（自托管）
├─ audio/ music/ art/
scripts/community-export.mjs
```

## 字体

- Fraunces、Inter 通过 `@fontsource-variable` 本地打包。
- 中文 Noto Serif SC 以 WOFF2 自托管在 `public/fonts/`，不依赖 Google Fonts。
- 授权文件在 `public/fonts/licenses/` 与 `public/fonts/noto-serif-sc-OFL.txt`。

![文章内页](docs/preview-article.jpg)

![英文版首页](docs/preview-english.jpg)

![移动端首页](docs/preview-mobile.jpg)
