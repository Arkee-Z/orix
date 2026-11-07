export const site = {
	name: "Gene Max Zhang",
	description:
		"The notebook of Gene Max Zhang — essays and field notes on terminals, Rust, TypeScript, and the craft of building for the web.",
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
	{ label: "Index", href: "/", color: "#76382e" },
	{ label: "Writing", href: "/writing", color: "#795d33" },
	{ label: "Notes", href: "/notes", color: "#55603b" },
	{ label: "About", href: "/about", color: "#405a57" },
	{ label: "Contact", href: "/contact", color: "#56435a" },
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
