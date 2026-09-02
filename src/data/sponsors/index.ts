import type { Locale } from '../../i18n/config';
import { en } from './en';
import { ko } from './ko';
import type { SponsorContent } from './types';

const content: Record<Locale, SponsorContent> = { ko, en };

export function getSponsors(locale: Locale) {
	return content[locale];
}

export type { Sponsor, SponsorContent, SponsorLevel } from './types';
export { sponsorLevels } from './types';
