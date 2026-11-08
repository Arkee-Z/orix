export const site = {
	name: "Gene Max Zhang",
	issue: "04",
	description:
		"Essays and field notes on terminals, Rust, TypeScript, and the craft of building for the web. A journal of code & consequence, written from a terminal in Chengdu.",
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

export type NavItem = {
	label: string;
	href: string;
	color: string;
};

export const nav: NavItem[] = [
	{ label: "Index", href: "/", color: "#9b2f24" },
	{ label: "Writing", href: "/writing", color: "#a4782d" },
	{ label: "Notes", href: "/notes", color: "#5a6844" },
	{ label: "About", href: "/about", color: "#3d5c56" },
	{ label: "Contact", href: "/contact", color: "#6c4b5f" },
];

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
