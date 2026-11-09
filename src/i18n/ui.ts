export const languages = ["zh", "en"] as const;
export type Lang = (typeof languages)[number];

export function isLang(value: string | undefined): value is Lang {
	return value === "zh" || value === "en";
}

export function otherLang(lang: Lang): Lang {
	return lang === "zh" ? "en" : "zh";
}

/** Prefix an app path with a locale: ("en", "/music") => "/en/music". */
export function localeHref(lang: Lang, path: string): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	return `/${lang}${clean === "/" ? "/" : clean}`;
}

/** Change /zh/foo to /en/foo without touching the rest of the path. */
export function switchLocalePath(pathname: string, target: Lang): string {
	const stripped = pathname.replace(/^\/(zh|en)(?=\/|$)/, "") || "/";
	return localeHref(target, stripped);
}

export const sectionMeta = [
	{ key: "index", path: "/", zh: "卷首", en: "Cover" },
	{ key: "catalog", path: "/index", zh: "目录", en: "Index" },
	{ key: "about", path: "/about", zh: "关于", en: "About" },
	{ key: "contact", path: "/contact", zh: "联系", en: "Contact" },
] as const;

export type SectionKey = (typeof sectionMeta)[number]["key"];

export type GenreKey = "article" | "fiction" | "essay" | "poem";

export const genres = [
	{
		key: "article",
		path: "/literature/articles",
		color: "#c0392b",
		zh: "文章",
		en: "Articles",
		zhDek: "长文、札记，以及关于技术与写作的思考。",
		enDek: "Long-form notes on craft, tools and the work of writing.",
	},
	{
		key: "fiction",
		path: "/literature/fiction",
		color: "#b08d57",
		zh: "小说",
		en: "Fiction",
		zhDek: "长篇与短篇；章节、系列和未完成的世界。",
		enDek: "Novels, stories, chapters and unfinished worlds.",
	},
	{
		key: "essay",
		path: "/literature/essays",
		color: "#8a9668",
		zh: "随笔",
		en: "Essays",
		zhDek: "短一些的观察、日记式的片段和页边笔记。",
		enDek: "Shorter observations, diary fragments and margin notes.",
	},
	{
		key: "poem",
		path: "/literature/poetry",
		color: "#7c9d98",
		zh: "诗",
		en: "Poetry",
		zhDek: "分行写下的东西；保留换行与空白。",
		enDek: "Words set in lines, with their breaks and silences kept.",
	},
] as const;

export const platformLabels: Record<string, { zh: string; en: string }> = {
	zhihu: { zh: "知乎", en: "Zhihu" },
	wechat: { zh: "微信公众号", en: "WeChat" },
	bilibili: { zh: "B站", en: "Bilibili" },
	netease: { zh: "网易云音乐", en: "NetEase Cloud Music" },
	other: { zh: "其他平台", en: "Elsewhere" },
};

const zh = {
	siteName: "Orix 文艺志",
	imprint: "Orix 文艺志",
	volume: "第四卷",
	location: "成都，中国",
	since: "始于 MMXIX",
	description:
		"一个以中文为主的个人文艺杂志，收录文学、音乐与美术的写作与札记。",
	skip: "跳到正文",
	spine: "ORIX · 文学与艺术",
	language: "语言",
	switchLanguage: "English",
	leafPrefix: "第",
	leafSuffix: "页",
	nav: {
		index: "卷首",
		catalog: "目录",
		literature: "阅读",
		music: "聆听室",
		art: "画廊",
		about: "关于",
		contact: "联系",
	},
	formats: {
		text: "文字",
		sound: "声音",
		image: "图像",
	},
	home: {
		notebook: "第 04 号",
		name: "Gene Max Zhang",
		role: "写作者 · 工程师 · 读者",
		intro:
			"文字、声音与图像混在一起的一份私人刊物。文章、诗、唱片与画作，从终端里编辑，在纸页上归档。",
		selected: "本卷选读",
		open: "打开全部作品",
		sections: "本卷栏目",
		empty: "中文稿件正在编入本卷。",
	},
	literature: {
		section: "阅读",
		title: "阅读",
		de: "文章、小说、随笔与诗。它们是这本刊物最长的呼吸。",
		all: "全部作品",
		latest: "最近编入",
		books: "小说与系列",
		collections: "诗集",
		back: "返回文学",
		count: (n: number) => `${n} 篇`,
		empty: "这一栏还没有中文作品。",
	},
	music: {
		section: "聆听",
		title: "聆听室",
		de: "唱片、曲库与反复播放的歌。听，或者只是让房间有声音。",
		all: "全部乐评",
		artists: "音乐人",
		empty: "还没有音乐评论。",
		rating: "评分",
		album: "专辑",
		track: "单曲",
		ep: "EP",
		compilation: "合辑",
		live: "现场",
		other: "其他",
		library: "曲库",
		nowPlaying: "正在播放",
		tracks: "曲",
		reviews: "乐评",
		noTracks: "曲库还是空的。把音频放进 public/audio，再加一条 tracks 内容。",
		play: "播放",
		pause: "暂停",
		previous: "上一首",
		next: "下一首",
	},
	art: {
		section: "画廊",
		title: "画廊",
		de: "画框、墙面与观看的距离。展览、画作与图像笔记。",
		all: "全部作品",
		empty: "还没有作品。",
		rating: "评分",
		gallery: "画廊",
		works: "作品",
		viewWork: "作品与文字",
	},
	entry: {
		filed: "编入",
		reading: "阅读",
		minutes: "分钟",
		series: "系列",
		chapter: "章节",
		collection: "诗集",
		previous: "上一篇",
		next: "下一篇",
		older: "较早",
		newer: "较新",
		backToLiterature: "返回文学",
		backToMusic: "返回音乐",
		backToArt: "返回美术",
		startReading: "从第一章开始",
		startPoetry: "从第一首开始",
		readCommunity: "在社区阅读",
		externalLinks: "相关链接",
		standalone: "独立作品",
	},
	sync: {
		label: "社区同步",
		note: "本站是原文；以下为社区副本或外链。",
	},
	common: { read: "阅读", browse: "浏览", back: "返回" },
	notFound: {
		section: "迷路",
		title: "这一页不在本卷里。",
		text: "你找的页面可能已移动、更名，或只是还没写出来。",
		back: "返回卷首",
	},
};

const en: typeof zh = {
	siteName: "Orix Journal",
	imprint: "Orix Journal",
	volume: "Vol. IV",
	location: "Chengdu, China",
	since: "Est. MMXIX",
	description:
		"A personal arts and literature magazine in Chinese and English: writing, music and art, kept like a book.",
	skip: "Skip to the page",
	spine: "ORIX · LITERATURE & ARTS",
	language: "Language",
	switchLanguage: "中文",
	leafPrefix: "Leaf",
	leafSuffix: "",
	nav: {
		index: "Cover",
		catalog: "Index",
		literature: "Reading",
		music: "Listening Room",
		art: "Gallery",
		about: "About",
		contact: "Contact",
	},
	formats: {
		text: "Text",
		sound: "Sound",
		image: "Image",
	},
	home: {
		notebook: "Issue 04",
		name: "Gene Max Zhang",
		role: "Writer · Engineer · Reader",
		intro:
			"A private magazine of text, sound and image. Essays, poems, records and pictures — edited from a terminal, filed like paper.",
		selected: "Selected Entries",
		open: "Open the full archive",
		sections: "Departments",
		empty: "The English edition is being prepared.",
	},
	literature: {
		section: "Reading",
		title: "Reading",
		de: "Articles, novels, essays and poems — the longest breath in this issue.",
		all: "All writing",
		latest: "Recently filed",
		books: "Novels & series",
		collections: "Collections",
		back: "Back to literature",
		count: (n: number) => `${n} pieces`,
		empty: "No English writing here yet.",
	},
	music: {
		section: "Listening",
		title: "Listening Room",
		de: "Records, a library, and songs on repeat. Listen, or just let the room have a voice.",
		all: "All listening",
		artists: "Artists",
		empty: "No music writing yet.",
		rating: "Rating",
		album: "Album",
		track: "Track",
		ep: "EP",
		compilation: "Compilation",
		live: "Live",
		other: "Other",
		library: "Library",
		nowPlaying: "Now playing",
		tracks: "tracks",
		reviews: "Reviews",
		noTracks: "The library is empty. Put audio in public/audio and add a track entry.",
		play: "Play",
		pause: "Pause",
		previous: "Previous",
		next: "Next",
	},
	art: {
		section: "Gallery",
		title: "Gallery",
		de: "Frames, walls and the distance of looking. Exhibitions, images and visual notes.",
		all: "All works",
		empty: "No works yet.",
		rating: "Rating",
		gallery: "Gallery",
		works: "Works",
		viewWork: "Work & notes",
	},
	entry: {
		filed: "Filed",
		reading: "Reading",
		minutes: "minutes",
		series: "Series",
		chapter: "Chapter",
		collection: "Collection",
		previous: "Previous",
		next: "Next",
		older: "Older",
		newer: "Newer",
		backToLiterature: "Back to literature",
		backToMusic: "Back to music",
		backToArt: "Back to art",
		startReading: "Start with chapter one",
		startPoetry: "Start with the first poem",
		readCommunity: "Read elsewhere",
		externalLinks: "Related links",
		standalone: "Standalone",
	},
	sync: {
		label: "Community",
		note: "The original lives here; these are copies and conversations elsewhere.",
	},
	common: { read: "Read", browse: "Browse", back: "Back" },
	notFound: {
		section: "Missing",
		title: "This page is not in this issue.",
		text: "It may have moved, changed its name, or never been written.",
		back: "Back to the index",
	},
};

export const ui: Record<Lang, typeof zh> = { zh, en };

export function getUi(lang: Lang) {
	return ui[lang];
}

export function sectionLabel(key: SectionKey | string, lang: Lang): string {
	const nav = ui[lang].nav as Record<string, string>;
	return nav[key] ?? key;
}

export function dateLabel(date: Date, lang: Lang): string {
	if (lang === "zh") {
		const y = date.getUTCFullYear();
		const m = String(date.getUTCMonth() + 1).padStart(2, "0");
		const d = String(date.getUTCDate()).padStart(2, "0");
		return `${y}.${m}.${d}`;
	}
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	})
		.format(date)
		.toUpperCase();
}

export function stars(rating: number | undefined): string {
	if (typeof rating !== "number") return "";
	const full = Math.round(rating);
	return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}


export function mediumLabel(medium: string, lang: Lang): string {
	const names: Record<string, { zh: string; en: string }> = {
		album: { zh: "专辑", en: "Album" },
		track: { zh: "单曲", en: "Track" },
		ep: { zh: "EP", en: "EP" },
		live: { zh: "现场", en: "Live" },
		compilation: { zh: "合辑", en: "Compilation" },
		other: { zh: "其他", en: "Other" },
	};
	return names[medium]?.[lang] ?? medium;
}
