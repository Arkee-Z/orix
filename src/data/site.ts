export const site = {
	name: "Gene Max Zhang",
	url:
		(import.meta.env.ORIX_SITE_URL as string | undefined) ??
		"https://orix.example",
	issue: "04",
	description:
		"A personal arts and literature magazine in Chinese and English: writing, music and art, kept like a book.",
	email: "gene.max.zheng@foxmail.com",
	github: "https://github.com/Arkee-Z",
	githubLabel: "github.com/Arkee-Z",
	location: "Chengdu, China",
	timezone: "UTC+8 / Asia/Shanghai",
	imprint: "Orix Journal",
	volume: "Vol. IV",
	year: "MMXXVI",
	since: "Est. MMXIX",
} as const;

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

export function formatDate(date: Date): string {
	return dateFormatter.format(date).toUpperCase();
}

const ROMAN = [
	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII",
	"VIII",
	"IX",
	"X",
	"XI",
	"XII",
];

export function roman(value: number): string {
	return ROMAN[value - 1] ?? String(value);
}

export function pad(value: number): string {
	return String(value).padStart(2, "0");
}
