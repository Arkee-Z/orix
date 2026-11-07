import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"writing">;

/** All entries, newest first. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection("writing");
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function postHref(post: Post): string {
	return `/writing/${post.id}`;
}
