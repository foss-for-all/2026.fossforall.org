import type { Locale } from './config';
import { getLocalizedPath } from './utils';

type NavigationSourceLink = {
	type: 'link';
	key: string;
	label: string;
	href?: string;
	path?: string;
	external?: boolean;
};

type NavigationSourceGroup = {
	type: 'group';
	key: string;
	label: string;
	items: NavigationSourceLink[];
};

type NavigationSourceItem = NavigationSourceLink | NavigationSourceGroup;

export type NavigationLink = {
	type: 'link';
	key: string;
	label: string;
	href: string;
	external?: boolean;
};

export type NavigationGroup = {
	type: 'group';
	key: string;
	label: string;
	items: NavigationLink[];
};

export type NavigationItem = NavigationLink | NavigationGroup;

const navigation = {
	ko: [
    {
			type: 'group',
			key: 'about',
			label: '소개',
			items: [
				{ type: 'link', key: 'about', label: '행사 소개', path: 'about' },
				{ type: 'link', key: 'coc', label: '행동강령', path: 'coc' },
			],
    },
    {
			type: 'group',
			key: 'sponsors',
			label: '후원사 & 개인후원',
			items: [
				{ type: 'link', key: 'become-a-sponsor', label: '후원사로 참여하기', path: 'become-a-sponsor' },
			],
		},
		{
			type: 'link',
			key: 'fossforall',
			label: 'fossforall.org',
			href: 'https://fossforall.org',
			external: true,
		},
	],
	en: [
    {
			type: 'group',
			key: 'about',
			label: 'About',
			items: [
				{ type: 'link', key: 'about', label: 'About the event', path: 'about' },
				{ type: 'link', key: 'coc', label: 'Code of Conduct', path: 'coc' },
			],
    },
    {
			type: 'group',
			key: 'sponsors',
			label: 'Sponsors & Patrons',
			items: [
				{ type: 'link', key: 'become-a-sponsor', label: 'Become a sponsor', path: 'become-a-sponsor' },
			],
		},
		{
			type: 'link',
			key: 'fossforall',
			label: 'fossforall.org',
			href: 'https://fossforall.org',
			external: true,
		},
	],
} as const satisfies Record<Locale, NavigationSourceItem[]>;

function resolveHref(locale: Locale, item: NavigationSourceLink) {
	if (item.path) {
		return getLocalizedPath(locale, item.path);
	}

	if (item.href?.startsWith('/') && !item.external) {
		return getLocalizedPath(locale, item.href);
	}

	return item.href ?? '#';
}

function resolveLink(locale: Locale, item: NavigationSourceLink): NavigationLink {
	return {
		type: 'link',
		key: item.key,
		label: item.label,
		href: resolveHref(locale, item),
		external: item.external,
	};
}

export function getNavigation(locale: Locale): NavigationItem[] {
	return navigation[locale].map((item) => {
		if (item.type === 'group') {
			return {
				type: 'group',
				key: item.key,
				label: item.label,
				items: item.items.map((child) => resolveLink(locale, child)),
			};
		}

		return resolveLink(locale, item);
	});
}
