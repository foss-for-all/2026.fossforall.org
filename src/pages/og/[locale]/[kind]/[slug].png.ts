import type { APIRoute } from 'astro';
import { renderCard } from '../../../../data/og';
import { getSpeakers, getSessions, sessionLabels } from '../../../../data/sessions';
import { locales } from '../../../../i18n/config';

export async function getStaticPaths() {
	return (await Promise.all(locales.map(async (locale) => {
		const sessions = (await getSessions(locale)).groups.flatMap((group) => group.sessions);
		const speakers = await getSpeakers(locale);
		return [
			...sessions.map((session) => ({
				params: { locale, kind: 'sessions', slug: session.slug },
				props: {
					locale, title: session.title, label: session.type,
					people: session.speakers.map((speaker) => speaker.name).join(', '),
					avatar: session.speakers.find((speaker) => speaker.avatar)?.avatar,
				},
			})),
			...speakers.map((speaker) => ({
				params: { locale, kind: 'speakers', slug: speaker.slug },
				props: {
					locale, title: speaker.name, label: sessionLabels[locale].speaker,
					people: speaker.sessions.map((session) => session.title).join(', '),
					avatar: speaker.avatar,
				},
			})),
		];
	}))).flat();
}

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderCard(props as Parameters<typeof renderCard>[0])), { headers: { 'Content-Type': 'image/png' } });
