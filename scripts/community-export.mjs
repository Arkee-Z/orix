#!/usr/bin/env node
/**
 * Orix community export (dry run by default).
 *
 * Reads the static manifests produced by `astro build`:
 *   dist/zh/community.json
 *   dist/en/community.json
 *
 * Then writes platform-ready packages into community-export/.
 * Nothing is posted to a third-party service from this script. Platform
 * adapters can be added in PLATFORMS; publishing APIs/credentials are a
 * separate, explicit step.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outRoot = path.join(root, "community-export");
const langs = process.env.ORIX_LANGS?.split(",").filter(Boolean) ?? ["zh", "en"];

const platformHeader = (item, lang) => {
	const lines = [
		`<!-- Orix / ${lang} / ${item.type} -->`,
		`<!-- canonical: ${item.url} -->`,
		`<!-- tags: ${(item.tags ?? []).join(", ")} -->`,
		"",
	];
	return lines.join("\n");
};

const PLATFORMS = {
	zhihu: {
		ext: "md",
		format(item) {
			const header = platformHeader(item, item.lang);
			return `${header}# ${item.title}\n\n${item.body}\n\n---\n\n原文：${item.url}\n\n标签：${(item.tags ?? []).join(" · ")}`;
		},
	},
	wechat: {
		ext: "md",
		format(item) {
			const header = platformHeader(item, item.lang);
			return `${header}# ${item.title}\n\n${item.summary ? `> ${item.summary}\n\n` : ""}${item.body}\n\n---\n\n原文链接：${item.url}`;
		},
	},
	bilibili: {
		ext: "json",
		format(item) {
			return JSON.stringify(
				{
					title: item.title,
					description: `${item.summary}\n\n原文：${item.url}`,
					tags: item.tags ?? [],
					canonical: item.url,
					type: item.type,
					body: item.body,
				},
				null,
				2,
			);
		},
	},
	netease: {
		ext: "md",
		only: (item) => item.type === "music",
		format(item) {
			const header = platformHeader(item, item.lang);
			return `${header}# ${item.title}\n\n${item.artist ? `${item.artist}${item.release ? ` — ${item.release}` : ""}\n\n` : ""}${item.body}\n\n---\n\n原文：${item.url}`;
		},
	},
};

async function main() {
	const manifest = { generatedAt: new Date().toISOString(), items: 0, platforms: {} };
	for (const lang of langs) {
		const source = path.join(root, "dist", lang, "community.json");
		let payload;
		try {
			payload = JSON.parse(await readFile(source, "utf8"));
		} catch {
			throw new Error(
				`Missing ${source}. Run "npm run build" before exporting community packages.`,
			);
		}

		for (const [platform, adapter] of Object.entries(PLATFORMS)) {
			const dir = path.join(outRoot, lang, platform);
			await mkdir(dir, { recursive: true });
			const items = payload.items.filter((item) => !adapter.only || adapter.only(item));
			for (const item of items) {
				const file = `${item.id}.${adapter.ext}`;
				await writeFile(path.join(dir, file), adapter.format(item), "utf8");
				manifest.items += 1;
				manifest.platforms[platform] = (manifest.platforms[platform] ?? 0) + 1;
			}
			await writeFile(
				path.join(dir, "_index.json"),
				JSON.stringify(
					{
						platform,
						lang,
						items: items.map((item) => ({
							id: item.id,
							title: item.title,
							canonical: item.url,
							tags: item.tags ?? [],
						})),
					},
					null,
					2,
				),
				"utf8",
			);
		}
	}

	await mkdir(outRoot, { recursive: true });
	await writeFile(
		path.join(outRoot, "manifest.json"),
		JSON.stringify({ ...manifest, dryRun: true }, null, 2),
		"utf8",
	);
	console.log(`Exported ${manifest.items} packages to community-export/ (dry run; nothing published).`);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
