import type { Locale } from './config';

export type FooterLink = {
	key: string;
	label: string;
	href: string;
	external?: boolean;
};

type FooterConfig = {
	title: string;
	copyright: string;
	links: FooterLink[];
};

const footer = {
	ko: {
		title: 'FOSS for All Conference 2026',
		copyright:
			'© 2026-Present FOSS for All. 별도 고지가 없는 경우, 콘텐츠는 CC BY 4.0 소스코드는 MIT 라이센스 아래 이용 가능.',
		links: [
			{ key: 'email', label: '이메일로 연락하기', href: 'mailto:contact@fossforall.org' },
			{
				key: 'privacy',
				label: '개인정보 처리방침',
				href: 'https://fossforall.org/disclosures/privacy/2025.fossforall.org/',
				external: true,
			},
			{
				key: 'source',
				label: '소스코드 확인하기',
				href: 'https://github.com/foss-for-all/2026.fossforall.org',
				external: true,
			},
			{
				key: 'org',
				label: 'FOSS for All 단체에 대해 알아보기',
				href: 'https://fossforall.org',
				external: true,
			},
		],
	},
	en: {
		title: 'FOSS for All Conference 2026',
		copyright:
			'© 2026-Present FOSS for All. Unless otherwise noted, content is available under CC BY 4.0 and source code under the MIT License.',
		links: [
			{ key: 'email', label: 'Contact by email', href: 'mailto:contact@fossforall.org' },
			{
				key: 'privacy',
				label: 'Privacy Policy',
				href: 'https://fossforall.org/disclosures/privacy/2025.fossforall.org/',
				external: true,
			},
			{
				key: 'source',
				label: 'View source code',
				href: 'https://github.com/foss-for-all/2026.fossforall.org',
				external: true,
			},
			{
				key: 'org',
				label: 'Learn about FOSS for All',
				href: 'https://fossforall.org',
				external: true,
			},
		],
	},
} satisfies Record<Locale, FooterConfig>;

export function getFooter(locale: Locale) {
	return footer[locale];
}
