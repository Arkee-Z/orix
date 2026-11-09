import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lang = z.enum(["zh", "en"]).default("zh");
const draft = z.boolean().default(false);
const syndication = z
	.array(
		z.object({
			platform: z.enum(["zhihu", "wechat", "bilibili", "netease", "other"]),
			url: z.string().url(),
			label: z.string().optional(),
		}),
	)
	.default([]);

const links = z
	.array(
		z.object({
			label: z.string(),
			url: z.string().url(),
		}),
	)
	.default([]);

const writing = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string().default(""),
		tags: z.array(z.string()).default([]),
		minutes: z.number().int().positive().optional(),
		kind: z.enum(["article", "fiction", "essay", "poem"]).default("essay"),
		lang,
		draft,
		translationKey: z.string().optional(),
		series: z.string().optional(),
		seriesTitle: z.string().optional(),
		order: z.number().optional(),
		chapter: z.union([z.string(), z.number()]).optional(),
		syndication,
	}),
});

const music = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string().default(""),
		tags: z.array(z.string()).default([]),
		lang,
		draft,
		translationKey: z.string().optional(),
		artist: z.string(),
		release: z.string().optional(),
		medium: z
			.enum(["album", "track", "ep", "live", "compilation", "other"])
			.default("album"),
		year: z.union([z.number(), z.string()]).optional(),
		label: z.string().optional(),
		rating: z.number().min(0).max(5).optional(),
		cover: z.string().optional(),
		links,
		syndication,
	}),
});

const art = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/art" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string().default(""),
		tags: z.array(z.string()).default([]),
		lang,
		draft,
		translationKey: z.string().optional(),
		artist: z.string(),
		work: z.string().optional(),
		medium: z.string().optional(),
		year: z.union([z.number(), z.string()]).optional(),
		venue: z.string().optional(),
		rating: z.number().min(0).max(5).optional(),
		cover: z.string().optional(),
		images: z
			.array(
				z.object({
					src: z.string(),
					alt: z.string(),
					caption: z.string().optional(),
					medium: z.string().optional(),
					year: z.union([z.number(), z.string()]).optional(),
				}),
			)
			.default([]),
		links,
		syndication,
	}),
});

const tracks = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/tracks" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string().default(""),
		tags: z.array(z.string()).default([]),
		lang,
		draft,
		artist: z.string(),
		album: z.string().optional(),
		duration: z.string().optional(),
		audio: z.string(),
		cover: z.string().optional(),
		order: z.number().optional(),
		links,
		syndication,
	}),
});

export const collections = { writing, music, art, tracks };
