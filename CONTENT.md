# 在 Orix 发布内容

Orix 是纯静态站：一篇内容就是一个 Markdown 文件，提交后由 Astro 构建。
中文是默认语言；英文是独立版本。

**内容不按艺术形式分栏。** 目录 `/zh/index` 把所有文字、声音和图像按时间混排；`kind` 只决定详情页排版，不再生成“文章 / 小说 / 随笔 / 诗”的栏目页。聆听室和画廊是可以进入的空间，不是顶部导航的分类。

内容目录：

```text
src/content/
├─ writing/     # 文学：文章、小说、随笔、诗
├─ music/       # 音乐评论 / 听后感
├─ tracks/      # 曲库：可播放的音轨
└─ art/         # 美术作品、画框与评论
public/
├─ audio/       # 音轨文件（.m4a / .mp3 / .wav）
├─ music/       # 专辑封面
└─ art/         # 画廊图片
```

## 通用字段

```yaml
---
title: "标题"
date: 2026-11-09
summary: "列表页和 SEO 用的一两句话"
tags: ["标签一", "标签二"]
lang: zh                  # zh | en，默认 zh
draft: false              # true 时只在开发环境可见
---
```

`date` 建议写 `YYYY-MM-DD`。`summary` 可以留空，但列表页会少一行介绍。

## 文学：文章 / 随笔

```yaml
---
title: "夜里的终端"
date: 2026-11-01
summary: "关于光标、雨声，和把一句话写完的耐心。"
tags: ["随笔", "终端"]
kind: essay               # article | essay | fiction | poem
lang: zh
minutes: 4                # 可选
---
```

- `kind` 只用于详情页排版：`fiction` 支持系列/章节，`poem` 保留换行；它不是公开分类。
- 正文用 Markdown；中文正文会自动使用宋体/思源宋体的阅读排版。
- 所有文字都会进入混合目录；没有 `/literature/articles`、`/fiction` 之类的分类页。

## 小说：一章一个文件

小说通过 `series` 聚合成“小说 / 系列”。`series` 用英文 slug，`seriesTitle` 用中文书名：

```yaml
---
title: "雨落在旧服务器上"
date: 2026-09-01
summary: "档案室的第一章。"
tags: ["小说", "科幻"]
kind: fiction
lang: zh
series: the-archive         # ASCII slug，用于 URL
seriesTitle: "档案室"
order: 1                    # 阅读顺序
chapter: "第一章"           # 可选；不写则按 order 生成
minutes: 6
---
```

- 系列页：`/zh/literature/series/the-archive`
- 章节页：`/zh/literature/<文件名>`
- 同一 `series` 的章节会按 `order` 升序排列；系列页展示第一章的 `summary` 作为简介。
- 独立短篇不写 `series` 即可，会作为一条文字进入目录。

## 诗：保留换行

```yaml
---
title: "夜航"
date: 2026-10-20
summary: "给还没有睡的人。"
tags: ["诗"]
kind: poem
lang: zh
series: night-notes         # 可选：诗集 slug
seriesTitle: "夜航札记"
order: 1
---

夜里没有海
只有一盏灯
把房间推向更远的地方
```

诗页会把 Markdown 正文按**纯文本**呈现，保留换行与空格；不要依赖粗体/斜体等 Markdown 语法。诗集同样使用系列页。

## 音乐：曲库与播放器

`/zh/music` 与 `/en/music` 是**聆听室**，会读取 `tracks`，渲染播放器 + 曲库；下方还会显示 `music` 里的文字（如果有）。目录里的声音条目会链接到 `/zh/music#<track-id>`。

```yaml
---
title: "纸页"
date: 2026-11-02
summary: "一段关于纸、光与缓慢翻页的习作。"
tags: ["氛围", "习作"]
lang: zh
artist: "Orix Studio"
album: "Studies in Paper"
duration: "0:32"            # 只用于初始显示；播放时会读取真实时长
audio: "/audio/paper.m4a"   # public/audio 下的文件，或外部 URL
cover: "/music/paper-cover.svg"
order: 1
---
```

- 播放器支持上一首/下一首、播放/暂停、进度拖动、自动接下一首。
- 不自动播放；点击播放按钮或曲目才开始。
- 音频文件放在 `public/audio/`。当前仓库里有 3 个**示例音轨**（2 中文、1 英文），可以在 `src/content/tracks/` 和 `public/audio/` 中替换或删除。
- 曲目没有单独详情页；曲库本身就是内容。
- 乐评仍然使用 `src/content/music/`，字段见下方美术示例的 `artist / release / medium / rating / links / syndication`。

## 美术：画框与画廊

**画廊**页面会把 `images` 里的图片渲染成带卡纸和画框的画廊墙；点击画框打开大图灯箱。没有 `images` 时回退到 `cover`。

```yaml
---
title: "静室：三幅习作"
date: 2026-11-08
summary: "关于空房间、光的边缘，以及观看的距离。"
tags: ["绘画", "习作"]
lang: zh
artist: "Orix Studio"
work: "静室"
medium: "数字绘画"
year: 2026
venue: "纸上 / On paper"
rating: 4.5
cover: "/art/study-ochre.svg"
images:
  - src: "/art/study-ochre.svg"
    alt: "赭色与朱红构成的抽象习作"
    caption: "习作一：赭色的墙"
    medium: "数字绘画"
    year: 2026
  - src: "/art/still-room.svg"
    alt: "墨线勾勒的空房间与红色小方块"
    caption: "习作二：空房间"
    medium: "数字绘画"
    year: 2026
translationKey: "quiet-rooms"
---
```

- 画廊页：`/zh/art`；作品详情：`/zh/art/<文件名>`。画作在目录里只是一条“图像”，不单独设栏目。
- 图片可以使用本地 `/art/...`，也可以使用外部 URL。
- 当前仓库里有 3 张**示例画作**（SVG），用于演示画框和灯箱；可以在 `src/content/art/` 和 `public/art/` 中替换或删除。
- 美术评论正文仍然用 Markdown，写在图片之后。

## 多语言与译文

- 默认 `lang: zh`；英文版内容写 `lang: en`，会进入 `/en/...`。
- 如果一篇中文和一篇英文是同一作品的译文，给它们相同的 `translationKey`。
- 当前中文版有卷首语、曲库和示例画作；现有 5 篇英文文章保留在 `/en`。
- 顶部导航只有卷首、目录、关于、联系；聆听室和画廊在页脚与目录条目中进入。

## 草稿

`draft: true` 的内容在开发服务器可见，在 `astro build` 的静态产物中会被排除。

## 社区同步链接

在任意内容里添加：

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

文章页会显示“社区同步”区块。更多导出/API 说明见 [SYNC.md](SYNC.md)。

## 常用命令

```sh
npm run dev          # 本地写作预览（草稿可见）
npm run build        # 生成静态站
npm run preview      # 预览构建结果
npm run sync:export  # 构建后导出知乎/公众号/B站/网易云同步包
```
