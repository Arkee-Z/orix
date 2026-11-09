import type { APIRoute } from "astro";
import { site } from "../../data/site";
import { languages, getUi, type Lang } from "../../i18n/ui";
import { getAllContent } from "../../lib/posts";

export function getStaticPaths() {
	return languages.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) => {
	const lang = params.lang as Lang;
	const t = getUi(lang);
	const items = await getAllContent(lang);
	const home = new URL(lang === "zh" ? "/zh/" : "/en/", site.url).toString();
	const feedUrl = new URL(lang === "zh" ? "/zh/feed.json" : "/en/feed.json", site.url).toString();

	const feed = {
		version: "https://jsonfeed.org/version/1.1",
		title: t.siteName,
		home_page_url: home,
		feed_url: feedUrl,
		description: t.description,
		language: lang === "zh" ? "zh-CN" : "en",
		items: items.map((item) => ({
			id: new URL(item.url, site.url).toString(),
			url: new URL(item.url, site.url).toString(),
			title: item.title,
			summary: item.summary,
			content_text: item.summary,
			date_published: item.date.toISOString(),
			tags: [item.type, ...item.tags],
		})),
	};

	return new Response(JSON.stringify(feed, null, 2), {
		headers: { "Content-Type": "application/feed+json; charset=utf-8" },
	});
};
