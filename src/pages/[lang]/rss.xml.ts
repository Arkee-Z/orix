import type { APIRoute } from "astro";
import { site } from "../../data/site";
import { languages, getUi, type Lang } from "../../i18n/ui";
import { getAllContent } from "../../lib/posts";

export function getStaticPaths() {
	return languages.map((lang) => ({ params: { lang } }));
}

const escapeXml = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ params }) => {
	const lang = params.lang as Lang;
	const t = getUi(lang);
	const items = await getAllContent(lang);
	const home = new URL(lang === "zh" ? "/zh/" : "/en/", site.url).toString();
	const feedUrl = new URL(lang === "zh" ? "/zh/rss.xml" : "/en/rss.xml", site.url).toString();
	const lastBuild = items[0]?.date ?? new Date("2026-01-01T00:00:00Z");

	const entries = items
		.map((item) => {
			const link = new URL(item.url, site.url).toString();
			return `\n    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <category>${escapeXml(item.type)}</category>
      <description>${escapeXml(item.summary)}</description>
    </item>`;
		})
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(t.siteName)}</title>
    <link>${escapeXml(home)}</link>
    <description>${escapeXml(t.description)}</description>
    <language>${lang === "zh" ? "zh-CN" : "en"}</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
};
