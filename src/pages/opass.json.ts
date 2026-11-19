import type { APIRoute } from 'astro';
import { pretalx, site } from '../config';
import { getSessions, localizedName, type Session } from '../data/sessions';
import { fetchSchedule, scheduleBreaks } from '../data/timetable';
import { getLocalizedPath } from '../i18n/utils';

// Schedule for the OPass app, in the format checked by github.com/CCIP-App/schedule-json-validator.
// The apps show `zh` to Chinese locales and `en` to everyone else, Korean included,
// so both carry the original text and names are written in both languages.
type Name = string | Record<string, string>;
const both = <T>(value: T) => ({ zh: value, en: value });
const bilingual = (name: Name) => {
	const [ko, en] = [localizedName(name, 'ko'), localizedName(name, 'en')];
	return ko === en ? ko : `${ko} (${en})`;
};
const languages = new Intl.DisplayNames(['en'], { type: 'language' });
// Pretalx mixes UTC and local offsets; give the apps one form in Korea time (no DST).
const kst = (value: string) => `${new Date(new Date(value).getTime() + 9 * 3600e3).toISOString().slice(0, 19)}+09:00`;

export const GET: APIRoute = async () => {
	const data = await fetchSchedule().catch((error) => {
		if (process.env.CI) throw error;
		return null;
	});
	const [ko, en] = await Promise.all([getSessions('ko'), getSessions('en')]);
	const sessions = new Map(ko.groups.flatMap((group) => group.sessions).map((session) => [session.code, session]));
	const typeNames = new Map(en.groups.map((group) => [group.id, group.name]));
	const typeOf = (session: Session) => ko.groups.find((group) => group.sessions.includes(session))!;

	const scheduled = (data?.talks ?? []).flatMap((slot) => {
		const session = slot.code ? sessions.get(slot.code) : undefined;
		return session ? [{ slot, session }] : [];
	});
	const talks = scheduled.map(({ slot, session }) => {
		const type = typeOf(session);
		return {
			id: session.code,
			type: String(type.id),
			room: String(slot.room),
			start: kst(slot.start),
			end: kst(slot.end),
			language: session.language ? languages.of(session.language) : undefined,
			uri: new URL(getLocalizedPath('ko', `sessions/${session.slug}`), site.url).href,
			record: session.video,
			...both({ title: session.title, description: [session.abstract, session.description].filter(Boolean).join('\n\n') }),
			speakers: session.speakers.map(({ code }) => code),
			tags: slot.track ? [String(slot.track)] : [],
		};
	});

	// Plain breaks repeat between talks; one-off ones such as the opening, lunch and closing are worth listing.
	const breaks = data ? scheduleBreaks(data) : [];
	const once = breaks.filter((slot, _, all) =>
		new Set(all.filter((other) => bilingual(other.title) === bilingual(slot.title)).map((other) => other.start)).size === 1);
	const events = [...new Map(once.map((slot) => [bilingual(slot.title), slot])).values()].map((slot) => ({
		id: `break-${slot.id}`,
		room: String(once.filter((other) => bilingual(other.title) === bilingual(slot.title)).length > 1 ? pretalx.everyRoom : slot.room),
		start: kst(slot.start),
		end: kst(slot.end),
		...both({ title: bilingual(slot.title), description: '' }),
		speakers: [],
		tags: [],
	}));

	const speakers = new Map(scheduled.flatMap(({ session }) => session.speakers).map((speaker) => [speaker.code, {
		id: speaker.code,
		avatar: speaker.avatar ?? '',
		...both({ name: speaker.name, bio: speaker.biography }),
	}]));

	return Response.json({
		sessions: [...talks, ...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()),
		speakers: [...speakers.values()],
		session_types: ko.groups.map((group) => ({ id: String(group.id), ...both({ name: bilingual({ ko: group.name, en: typeNames.get(group.id) ?? group.name }) }) })),
		rooms: (data?.rooms ?? []).toSorted((a, b) => a.id - b.id).map((room) => ({
			id: String(room.id),
			...both({ name: room.id === pretalx.everyRoom ? '전체 (All rooms)' : localizedName(room.name, 'ko') }),
		})),
		tags: (data?.tracks ?? []).map((track) => ({ id: String(track.id), ...both({ name: bilingual(track.name) }) })),
	});
};
