import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../../data/site";
import { languages, type Lang } from "../../i18n/ui";
import { artHref, musicHref, postHref } from "../../lib/posts";

export function getStaticPaths() {
	return languages.map((lang) => ({ params: { lang } }));
}

const isPublished = (entry: { data: { draft: boolean } }) =>
	import.meta.env.DEV || !entry.data.draft;

export const GET: APIRoute = async ({ params }) => {
	const lang = params.lang as Lang;
	const [writing, music, art] = await Promise.all([
		getCollection("writing"),
		getCollection("music"),
		getCollection("art"),
	]);

	const items = [
		...writing
			.filter((entry) => entry.data.lang === lang && isPublished(entry))
			.map((entry) => ({
				type: "literature" as const,
				id: entry.id,
				title: entry.data.title,
				summary: entry.data.summary,
				date: entry.data.date.toISOString(),
				url: new URL(postHref(entry, lang), site.url).toString(),
				tags: entry.data.tags,
				kind: entry.data.kind,
				series: entry.data.series ?? null,
				seriesTitle: entry.data.seriesTitle ?? null,
				chapter: entry.data.chapter ?? null,
				order: entry.data.order ?? null,
				body: entry.body ?? "",
				syndication: entry.data.syndication,
			})),
		...music
			.filter((entry) => entry.data.lang === lang && isPublished(entry))
			.map((entry) => ({
				type: "music" as const,
				id: entry.id,
				title: entry.data.title,
				summary: entry.data.summary,
				date: entry.data.date.toISOString(),
				url: new URL(musicHref(entry, lang), site.url).toString(),
				tags: entry.data.tags,
				artist: entry.data.artist,
				release: entry.data.release ?? null,
				medium: entry.data.medium,
				year: entry.data.year ?? null,
				rating: entry.data.rating ?? null,
				body: entry.body ?? "",
				links: entry.data.links,
				syndication: entry.data.syndication,
			})),
		...art
			.filter((entry) => entry.data.lang === lang && isPublished(entry))
			.map((entry) => ({
				type: "art" as const,
				id: entry.id,
				title: entry.data.title,
				summary: entry.data.summary,
				date: entry.data.date.toISOString(),
				url: new URL(artHref(entry, lang), site.url).toString(),
				tags: entry.data.tags,
				artist: entry.data.artist,
				work: entry.data.work ?? null,
				medium: entry.data.medium ?? null,
				year: entry.data.year ?? null,
				venue: entry.data.venue ?? null,
				rating: entry.data.rating ?? null,
				body: entry.body ?? "",
				links: entry.data.links,
				syndication: entry.data.syndication,
			})),
	].sort((a, b) => b.date.localeCompare(a.date));

	return new Response(
		JSON.stringify(
			{
				version: 1,
				site: site.url,
				lang,
				generatedAt: new Date().toISOString(),
				items,
			},
			null,
			2,
		),
		{ headers: { "Content-Type": "application/json; charset=utf-8" } },
	);
};
