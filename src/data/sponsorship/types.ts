// Web edition of the sponsorship prospectus (github.com/foss-for-all/sponsorship-prospectus).
// Both locales share these types so a row added to one matrix cannot be forgotten in the other.

export type ReasonIcon =
	| 'audience'
	| 'promotion'
	| 'talent'
	| 'leadership'
	| 'branding'
	| 'ecosystem'
	| 'esg'
	| 'transparency';

/** `true` renders a filled mark, `false` a dash, a string renders as-is. */
export type Cell = string | boolean;

export type MatrixRow =
	| { type: 'group'; label: string }
	| { type: 'item'; label: string; values: [Cell, Cell, Cell] };

export type Tier = {
	name: string;
	price: string;
	priceSub: string;
	slots: string;
	/** Metal accent, kept out of the theme tokens on purpose: gold/silver/bronze are literal. */
	accent: string;
};

export type Fact = { label: string; value: string };
export type Stat = { value: string; label: string };
export type Bar = { label: string; value: number };
export type Reason = { icon: ReasonIcon; title: string; body: string };
export type Term = { term: string; body: string };
export type Stop = { when: string; what: string; done?: boolean };
export type Step = { n: string; title: string; body?: string; bullets?: Term[] };

/** `ar` is the artwork aspect ratio; height is derived from it so optical area stays constant. */
export type Logo = { file: string; ar: number; name: string; scale?: number };
export type Community = Logo & { body: string };

export type SponsorshipContent = {
	title: string;
	description: string;
	hero: {
		kicker: string;
		heading: string;
		slogan: string;
		lead: string;
		facts: Fact[];
		prospectus: string;
		register: string;
	};
	why: { num: string; title: string; lead: string; reasons: Reason[] };
	record: { num: string; title: string; lead: string; stats: Stat[]; caption: string };
	audience: {
		num: string;
		title: string;
		lead: string;
		stats: Stat[];
		jobsTitle: string;
		jobs: Bar[];
		affiliationTitle: string;
		affiliation: Bar[];
		note: string;
		channelsKicker: string;
		channelsTotal: Stat;
		channels: { name: string; value: string }[];
	};
	packages: {
		num: string;
		title: string;
		lead: string;
		tiers: [Tier, Tier, Tier];
		matrix: MatrixRow[];
		pricingTitle: string;
		pricing: string[];
		availabilityTitle: string;
		availability: string[];
		callout: string;
	};
	addons: {
		num: string;
		title: string;
		lead: string;
		session: { title: string; meta: string; price: string; priceSub: string; body: string; bullets: string[] };
		booth: { title: string; meta: string; price: string; body: string };
		inKind: { title: string; meta: string; body: string };
		examplesTitle: string;
		examples: string;
		caption: string;
	};
	benefits: { num: string; title: string; groups: { title: string; items: Term[] }[]; callout: Term };
	partners: {
		num: string;
		title: string;
		lead: string;
		walls: { label: string; logos: Logo[] }[];
		communitiesTitle: string;
		communitiesLead: string;
		communities: Community[];
		callout: string;
	};
	process: {
		num: string;
		title: string;
		timelineTitle: string;
		timeline: Stop[];
		stepsTitle: string;
		steps: Step[];
		callout: string;
	};
	about: { num: string; title: string; lead: string; body: string; items: Term[]; homepage: string };
	closing: { title: string; lines: string[]; mail: string; site: string; siteLabel: string };
};
