export type Note = {
	date: string;
	text: string;
	tag: string;
};

export const notes: Note[] = [
	{
		date: "2026-10-30",
		tag: "Log",
		text: "Rewrote the feed generator at midnight. Three hundred lines became ninety, and the build went from nine seconds to two. Deleting code is still the fastest optimization I know.",
	},
	{
		date: "2026-10-22",
		tag: "Desk",
		text: "A good keyboard is quiet enough to hear yourself think. Mine has been the same model since 2019 — no RGB, no screen, no opinions. It types, then it gets out of the way.",
	},
	{
		date: "2026-10-09",
		tag: "Reading",
		text: "Spent the evening in the SQLite source. Not to fix anything — just to watch how carefully a small program can be written. There are comments in there that read like letters.",
	},
	{
		date: "2026-09-18",
		tag: "Tooling",
		text: "SQLite is not a toy. It is a library that happens to be a database, which is the more useful arrangement. Most side projects need a file, not a server.",
	},
	{
		date: "2026-08-21",
		tag: "Craft",
		text: "The best diff is the one you can read in the morning and still understand. Write for the person who will be woken up by your bug report at 3 a.m. — usually that person is you.",
	},
	{
		date: "2026-07-04",
		tag: "Rust",
		text: "Ownership is not a restriction; it is documentation the compiler checks. Once you stop arguing with the borrow checker, it starts reading like an editor with very strong opinions.",
	},
];
