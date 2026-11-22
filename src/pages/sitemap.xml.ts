import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site as siteConfig } from '../config';
import { getSessions, getSpeakers } from '../data/sessions';
import { locales } from '../i18n/config';
import { getLocalizedPath } from '../i18n/utils';

const staticPaths = ['', 'sessions', 'timetable', 'sponsors', 'become-a-sponsor'];

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
	const base = site ?? new URL(siteConfig.url);
	const [pages, { groups }, speakers] = await Promise.all([
		getCollection('pages', ({ data }) => !data.noindex),
		getSessions('ko'),
		getSpeakers('ko'),
	]);
	const sessions = groups.flatMap((group) => group.sessions);

	const paths = [
		...locales.flatMap((locale) => staticPaths.map((path) => getLocalizedPath(locale, path))),
		...pages.map(({ data }) => getLocalizedPath(data.locale, data.path)),
		...locales.flatMap((locale) => sessions.map((session) => getLocalizedPath(locale, `sessions/${session.slug}`))),
		...locales.flatMap((locale) => speakers.map((speaker) => getLocalizedPath(locale, `speakers/${speaker.slug}`))),
	];

	const urls = [...new Set(paths.map((path) => new URL(path, base).href))].sort();
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...urls.map((url) => `\t<url><loc>${escapeXml(url)}</loc></url>`),
		'</urlset>',
		'',
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
