import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { genres, localeHref, type GenreKey, type Lang } from "../i18n/ui";

export type Post = CollectionEntry<"writing">;
export type Music = CollectionEntry<"music">;
export type Art = CollectionEntry<"art">;
export type Track = CollectionEntry<"tracks">;

const includeDrafts = import.meta.env.DEV;

function published<T extends { data: { draft: boolean } }>(entry: T): boolean {
	return includeDrafts || !entry.data.draft;
}

/** All literature in one language, newest first. */
export async function getPosts(lang: Lang, kind?: GenreKey): Promise<Post[]> {
	const posts = await getCollection("writing", (entry) => {
		return entry.data.lang === lang && published(entry) && (!kind || entry.data.kind === kind);
	});
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getMusic(lang: Lang): Promise<Music[]> {
	const entries = await getCollection("music", (entry) => {
		return entry.data.lang === lang && published(entry);
	});
	return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getArt(lang: Lang): Promise<Art[]> {
	const entries = await getCollection("art", (entry) => {
		return entry.data.lang === lang && published(entry);
	});
	return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export async function getTracks(lang: Lang): Promise<Track[]> {
	const entries = await getCollection("tracks", (entry) => {
		return entry.data.lang === lang && published(entry);
	});
	return entries.sort((a, b) => {
		const order = (a.data.order ?? 99) - (b.data.order ?? 99);
		return order || b.data.date.valueOf() - a.data.date.valueOf();
	});
}

export function postHref(post: Post, lang: Lang): string {
	return localeHref(lang, `/literature/${post.id}`);
}

export function musicHref(entry: Music, lang: Lang): string {
	return localeHref(lang, `/music/${entry.id}`);
}

export function artHref(entry: Art, lang: Lang): string {
	return localeHref(lang, `/art/${entry.id}`);
}

export function genreHref(kind: GenreKey, lang: Lang): string {
	const genre = genres.find((item) => item.key === kind);
	return localeHref(lang, genre?.path ?? "/literature");
}

export function genreMeta(kind: GenreKey) {
	return genres.find((item) => item.key === kind) ?? genres[0];
}

export function kindHref(kind: GenreKey, lang: Lang): string {
	return genreHref(kind, lang);
}

export function seriesHref(series: string, lang: Lang): string {
	return localeHref(lang, `/literature/series/${series}`);
}

export function seriesTitle(entries: Post[]): string {
	const first = entries[0];
	return first?.data.seriesTitle || first?.data.series || "";
}

export function sortSeries(entries: Post[]): Post[] {
	return [...entries].sort((a, b) => {
		const ao = a.data.order ?? Number.MAX_SAFE_INTEGER;
		const bo = b.data.order ?? Number.MAX_SAFE_INTEGER;
		if (ao !== bo) return ao - bo;
		return a.data.date.valueOf() - b.data.date.valueOf();
	});
}

export type SeriesGroup = {
	series: string;
	title: string;
	kind: GenreKey;
	entries: Post[];
};

/** Group literature entries by their series slug, in reading order. */
export function groupSeries(entries: Post[]): SeriesGroup[] {
	const groups = new Map<string, Post[]>();
	for (const entry of entries) {
		if (!entry.data.series) continue;
		const list = groups.get(entry.data.series) ?? [];
		list.push(entry);
		groups.set(entry.data.series, list);
	}
	return [...groups.entries()]
		.map(([series, list]) => {
			const sorted = sortSeries(list);
			return {
				series,
				title: seriesTitle(sorted),
				kind: sorted[0]?.data.kind ?? "fiction",
				entries: sorted,
			};
		})
		.sort((a, b) => {
			const aDate = a.entries[0]?.data.date.valueOf() ?? 0;
			const bDate = b.entries[0]?.data.date.valueOf() ?? 0;
			return bDate - aDate;
		});
}

export function chapterLabel(post: Post, lang: Lang): string {
	const { chapter, order, kind } = post.data;
	if (chapter !== undefined && chapter !== null && chapter !== "") {
		return String(chapter);
	}
	if (typeof order === "number") {
		if (kind === "poem") {
			return lang === "zh" ? `第 ${order} 首` : `Poem ${order}`;
		}
		return lang === "zh" ? `第 ${order} 章` : `Chapter ${order}`;
	}
	return "";
}

export function seriesEntries(post: Post, all: Post[]): Post[] {
	if (!post.data.series) return [];
	return sortSeries(all.filter((entry) => entry.data.series === post.data.series));
}

export type FeedItem = {
	type: "literature" | "music" | "art";
	id: string;
	title: string;
	date: Date;
	summary: string;
	url: string;
	lang: Lang;
	tags: string[];
};

/** One combined, typed stream for feeds and the community export. */
export async function getAllContent(lang: Lang): Promise<FeedItem[]> {
	const [posts, music, art] = await Promise.all([
		getPosts(lang),
		getMusic(lang),
		getArt(lang),
	]);
	const items: FeedItem[] = [
		...posts.map((entry) => ({
			type: "literature" as const,
			id: entry.id,
			title: entry.data.title,
			date: entry.data.date,
			summary: entry.data.summary,
			url: postHref(entry, lang),
			lang,
			tags: entry.data.tags,
		})),
		...music.map((entry) => ({
			type: "music" as const,
			id: entry.id,
			title: entry.data.title,
			date: entry.data.date,
			summary: entry.data.summary,
			url: musicHref(entry, lang),
			lang,
			tags: entry.data.tags,
		})),
		...art.map((entry) => ({
			type: "art" as const,
			id: entry.id,
			title: entry.data.title,
			date: entry.data.date,
			summary: entry.data.summary,
			url: artHref(entry, lang),
			lang,
			tags: entry.data.tags,
		})),
	];
	return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
