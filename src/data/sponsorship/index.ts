import type { Locale } from '../../i18n/config';
import { en } from './en';
import { ko } from './ko';
import type { SponsorshipContent } from './types';

const content: Record<Locale, SponsorshipContent> = { ko, en };

const links: Record<Locale, { prospectus: string; register: string }> = {
	ko: {
		prospectus: '/sponsorship-prospectus-ko.pdf',
		register: 'https://app.formbricks.com/s/s909lvma241enebpktbf4lpv',
	},
	en: {
		prospectus: '/sponsorship-prospectus-en.pdf',
		register: 'https://app.formbricks.com/s/s909lvma241enebpktbf4lpv?lang=en-US',
	},
};

export function getSponsorship(locale: Locale) {
	return { ...content[locale], links: links[locale] };
}

export type { SponsorshipContent } from './types';
