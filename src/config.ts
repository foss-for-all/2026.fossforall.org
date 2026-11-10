export const site = {
	url: 'https://2026.fossforall.org',
	ticketUrl: 'https://ticketa.co/event/ytbqha4p',
	socialImage: '/f4ac26.png',
	socialImageWidth: 1200,
	socialImageHeight: 630,
	socialImageAlt: 'FOSS for All Conference 2026 - Your Gateway to Open Source',
} as const;

export const discourse = {
	baseUrl: 'https://forum.fossforall.org',
	newsUrl: 'https://forum.fossforall.org/tags/c/news/notices/13/conf-2026/6',
	newsFeedUrl: 'https://forum.fossforall.org/tags/c/news/notices/13/conf-2026/6.json',
} as const;

export const pretalx = {
	baseUrl: 'https://pretalx.fossforall.org',
	eventSlug: '2026',
	// Talks listed here come first in their group, in this order.
	pinned: ['8VEJRP', 'W3TMNX'],
} as const;
