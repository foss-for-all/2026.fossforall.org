import { pretalx } from '../config';
import type { Locale } from '../i18n/config';

type LocalizedName = string | Record<string, string>;
interface Slot { start?: string | null; end?: string | null; room?: { name: LocalizedName } | null }
interface Submission {
	code: string;
	title: string;
	abstract?: string | null;
	description?: string | null;
	speakers: string[];
	submission_type: number;
	track?: number | null;
	content_locale?: string | null;
	resources?: { resource: string; is_public?: boolean }[];
	slots?: Slot[];
}
interface Speaker { code: string; name: string; biography?: string | null; avatar_url?: string | null }
interface NamedItem { id: number; name: LocalizedName }
interface Program { submissions: Submission[]; speakers: Speaker[]; tracks: NamedItem[]; types: NamedItem[]; started: boolean; visible: Set<string> }
export interface SessionSpeaker { code: string; slug: string; name: string; biography: string; avatar?: string }
export interface Session {
	code: string;
	slug: string;
	title: string;
	type: string;
	keynote: boolean;
	abstract: string;
	description: string;
	speakers: SessionSpeaker[];
	track: string;
	language: string;
	start?: string;
	end?: string;
	room?: string;
	url?: string;
	feedback?: string;
	video?: string;
}
export interface SessionGroup { id: number; name: string; keynote: boolean; sessions: Session[] }
export interface SpeakerProfile extends SessionSpeaker { sessions: Session[] }

export const sessionLabels = {
	ko: {
		title: '세션 목록', description: '컨퍼런스 세션과 발표자를 만나 보세요.',
		feedback: '피드백 보내기', video: '영상 보기', pretalx: 'Pretalx에서 보기',
		empty: '아직 공개된 세션이 없습니다. 곧 다시 확인해 주세요.',
		unavailable: '세션 목록을 불러올 수 없습니다. Pretalx에서 프로그램을 확인해 주세요.',
		program: 'Pretalx에서 프로그램 보기', unknownType: '세션', unknownSpeaker: '발표자 추후 공개',
		type: '유형', track: '트랙', language: '언어', time: '시간', room: '장소',
		speakers: '발표자', speaker: '발표자', links: '링크', speakerSessions: '발표', keynotes: '기조연사', allSessions: '전체 세션 보기',
	},
	en: {
		title: 'Sessions', description: 'Explore the conference sessions and meet our speakers.',
		feedback: 'Give feedback', video: 'Watch video', pretalx: 'View on Pretalx',
		empty: 'No sessions have been published yet. Check back soon.',
		unavailable: 'The session list is currently unavailable. Please check the program on Pretalx.',
		program: 'View program on Pretalx', unknownType: 'Session', unknownSpeaker: 'Speaker to be announced',
		type: 'Type', track: 'Track', language: 'Language', time: 'Time', room: 'Room',
		speakers: 'Speakers', speaker: 'Speaker', links: 'Links', speakerSessions: 'Sessions', keynotes: 'Keynote Speakers', allSessions: 'View all sessions',
	},
} as const;

export function localizedName(name: LocalizedName | undefined, locale: Locale): string {
	return typeof name === 'string' ? name : name?.[locale] || name?.en || Object.values(name ?? {})[0] || '';
}

async function isReachable(url: string): Promise<boolean> {
	try {
		return (await fetch(url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(15000) })).ok;
	} catch { return false; }
}

// Pretalx accepts feedback only after a talk has started.
async function hasStarted(): Promise<boolean> {
	try {
		const response = await fetch(`${pretalx.baseUrl}/api/events/${pretalx.eventSlug}/`, { signal: AbortSignal.timeout(15000) });
		if (!response.ok) return false;
		const { date_from }: { date_from: string } = await response.json();
		return new Date() >= new Date(`${date_from}T00:00:00+09:00`);
	} catch { return false; }
}

async function fetchPages<T>(endpoint: string): Promise<T[]> {
	const base = new URL(`${pretalx.baseUrl}/api/events/${pretalx.eventSlug}/`);
	let next: URL | null = new URL(endpoint, base);
	const results: T[] = [];
	const visited = new Set<string>();
	while (next) {
		// Reverse proxies may cause Pretalx to advertise HTTP pagination links.
		// Upgrade links on the configured host before sending authenticated requests.
		if (base.protocol === 'https:' && next.protocol === 'http:' && next.host === base.host) {
			next.protocol = 'https:';
		}
		// Only send the token to this event's API, including on paginated requests.
		if (next.origin !== base.origin || !next.pathname.startsWith(base.pathname)) {
			throw new Error(`Unexpected Pretalx pagination destination: ${next.origin}${next.pathname}`);
		}
		if (visited.has(next.href)) {
			throw new Error(`Repeated Pretalx pagination page for ${endpoint.split('?')[0]}`);
		}
		visited.add(next.href);
		const response = await fetch(next, {
			headers: {
				'Pretalx-Version': 'v2',
				...(import.meta.env.PRETALX_TOKEN ? { Authorization: `Token ${import.meta.env.PRETALX_TOKEN}` } : {}),
			},
			signal: AbortSignal.timeout(15000),
			redirect: 'error',
		});
		if (!response.ok) throw new Error(`Pretalx ${endpoint.split('?')[0]} returned ${response.status}`);
		const data: { results: T[]; next?: string | null } = await response.json();
		if (!Array.isArray(data.results)) throw new Error('Invalid Pretalx response');
		results.push(...data.results);
		next = data.next ? new URL(data.next, next) : null;
	}
	return results;
}

function videoUrl(resources: Submission['resources']): string | undefined {
	return resources?.find(({ resource, is_public }) => {
		if (is_public === false) return false;
		try {
			const url = new URL(resource);
			return ['https:', 'http:'].includes(url.protocol) &&
				(url.hostname === 'youtu.be' || url.hostname === 'youtube.com' || url.hostname.endsWith('.youtube.com'));
		} catch { return false; }
	})?.resource;
}

let program: Promise<Program> | undefined;

// Every page shares one set of API requests per build.
function loadProgram(): Promise<Program> {
	if (program) return program;
	program = (async () => {
		const [submissions, speakers, tracks, types, started] = await Promise.all([
			fetchPages<Submission>('submissions/?state=confirmed&expand=resources,slots,slots.room'),
			fetchPages<Speaker>('speakers/'),
			fetchPages<NamedItem>('tracks/'),
			fetchPages<NamedItem>('submission-types/'),
			hasStarted(),
		]);
		// Talk pages are public only once the talk is featured or in a released schedule.
		const visible = new Set<string>();
		await Promise.all(submissions.map(async ({ code }) => {
			if (await isReachable(talkUrl(code))) visible.add(code);
		}));
		// A broken avatar would fail the image build step.
		const presenting = new Set(submissions.flatMap((submission) => submission.speakers));
		await Promise.all(speakers.filter(({ code, avatar_url }) => presenting.has(code) && avatar_url).map(async (speaker) => {
			if (!await isReachable(speaker.avatar_url!)) speaker.avatar_url = null;
		}));
		return { submissions, speakers, tracks, types, started, visible };
	})();
	// Do not keep a failed load for the life of the dev server.
	program.catch(() => { program = undefined; });
	return program;
}

// Keeps the title's own letters (Hangul, Hanja, kana, accents) like Namuwiki does; browsers percent-encode them.
// Long titles keep their main title (before ":" or " - ") and are cut at a word boundary.
// The code at the end keeps the URL unique.
export function slugify(code: string, text: string): string {
	const main = text.split(/:| - /)[0].trim() || text;
	const words = main.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
	const chars = [...words];
	const short = chars.length <= 50 ? words : chars.slice(0, 51).join('').replace(/-[^-]*$/, '');
	return [short, code.toLowerCase()].filter(Boolean).join('-');
}

function talkUrl(code: string) {
	return `${pretalx.baseUrl}/${pretalx.eventSlug}/talk/${encodeURIComponent(code)}/`;
}

function typeRank(name: LocalizedName | undefined) {
	const names = typeof name === 'string' ? name : Object.values(name ?? {}).join(' ');
	if (/keynote|기조/i.test(names)) return 0;
	if (/lightning|라이트닝/i.test(names)) return 2;
	if (/session|talk|세션|발표/i.test(names)) return 1;
	return 3;
}

function toSession(submission: Submission, data: Program, locale: Locale): Session {
	const typeName = data.types.find((type) => type.id === submission.submission_type)?.name;
	const slot = submission.slots?.find((candidate) => candidate.start);
	const url = data.visible.has(submission.code) ? talkUrl(submission.code) : undefined;
	return {
		code: submission.code,
		slug: slugify(submission.code, submission.title),
		title: submission.title,
		type: localizedName(typeName, locale) || sessionLabels[locale].unknownType,
		keynote: typeRank(typeName) === 0,
		abstract: submission.abstract ?? '',
		description: submission.description ?? '',
		speakers: submission.speakers.flatMap((code) => {
			const speaker = data.speakers.find((candidate) => candidate.code === code);
			return speaker ? [{ code, slug: slugify(code, speaker.name), name: speaker.name, biography: speaker.biography ?? '', avatar: speaker.avatar_url ?? undefined }] : [];
		}),
		track: localizedName(data.tracks.find((track) => track.id === submission.track)?.name, locale),
		language: submission.content_locale || '',
		start: slot?.start ?? undefined,
		end: slot?.end ?? undefined,
		room: localizedName(slot?.room?.name, locale) || undefined,
		url,
		feedback: url && data.started ? `${url}feedback/` : undefined,
		video: videoUrl(submission.resources),
	};
}

export async function getSessions(locale: Locale): Promise<{ groups: SessionGroup[]; unavailable: boolean }> {
	try {
		const data = await loadProgram();
		const groups = new Map<number, SessionGroup>();
		// Pretalx decides publication: unreleased talks stay off the site too.
		for (const submission of data.submissions.filter(({ code }) => data.visible.has(code))) {
			const session = toSession(submission, data, locale);
			const id = submission.submission_type;
			if (!groups.has(id)) groups.set(id, { id, name: session.type, keynote: session.keynote, sessions: [] });
			groups.get(id)!.sessions.push(session);
		}
		const rank = (group: SessionGroup) => typeRank(data.types.find((type) => type.id === group.id)?.name);
		return { groups: [...groups.values()].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name, locale)), unavailable: false };
	} catch (error) {
		// Fail CI builds so a transient outage does not replace the deployed list.
		if (process.env.CI) throw error;
		console.warn('Unable to load sessions:', error instanceof Error ? error.message : 'Unknown error');
		return { groups: [], unavailable: true };
	}
}

export async function getSpeakers(locale: Locale): Promise<SpeakerProfile[]> {
	const { groups } = await getSessions(locale);
	const profiles = new Map<string, SpeakerProfile>();
	for (const session of groups.flatMap((group) => group.sessions)) {
		for (const speaker of session.speakers) {
			if (!profiles.has(speaker.code)) profiles.set(speaker.code, { ...speaker, sessions: [] });
			profiles.get(speaker.code)!.sessions.push(session);
		}
	}
	return [...profiles.values()];
}
