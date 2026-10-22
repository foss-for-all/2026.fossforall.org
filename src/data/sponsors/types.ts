import type { ImageMetadata } from 'astro';

export const sponsorLevels = ['gold', 'silver', 'bronze'] as const;

export type SponsorLevel = (typeof sponsorLevels)[number];

export type Sponsor = {
	name: string;
	level: SponsorLevel;
	logo: ImageMetadata;
	description: string;
	website: string;
};

export type SponsorContent = {
	title: string;
	kicker: string;
	description: string;
	intro: string;
	viewAll: string;
	empty: string;
	levels: Record<SponsorLevel, string>;
	dialog: {
		website: string;
		close: string;
	};
	sponsors: Sponsor[];
};
