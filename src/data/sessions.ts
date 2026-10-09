import { pretalx } from '../config';
import type { Locale } from '../i18n/config';

type LocalizedName = string | Record<string, string>;
interface Submission {
	code: string;
	title: string;
	speakers: string[];
	submission_type: number;
	track?: number | null;
	content_locale?: string | null;
	resources?: { resource: string; is_public?: boolean }[];
}
interface Speaker { code: string; name: string }
interface NamedItem { id: number; name: LocalizedName }
export interface Session {
	code: string;
	title: string;
	speakers: string[];
	track: string;
	language: string;
	url: string;
	video?: string;
}
export interface SessionGroup { id: number; name: string; sessions: Session[] }

export const sessionLabels = {
	ko: {
		title: '세션 목록', description: '컨퍼런스 세션과 발표자를 만나 보세요.',
		details: '자세히 보기', feedback: '피드백 보내기', video: '영상 보기',
		empty: '아직 공개된 세션이 없습니다. 곧 다시 확인해 주세요.',
		unavailable: '세션 목록을 불러올 수 없습니다. Pretalx에서 프로그램을 확인해 주세요.',
		program: 'Pretalx에서 프로그램 보기', unknownType: '세션', unknownSpeaker: '발표자 추후 공개',
	},
	en: {
		title: 'Sessions', description: 'Explore the conference sessions and meet our speakers.',
		details: 'Details', feedback: 'Give feedback', video: 'Watch video',
		empty: 'No sessions have been published yet. Check back soon.',
		unavailable: 'The session list is currently unavailable. Please check the program on Pretalx.',
		program: 'View program on Pretalx', unknownType: 'Session', unknownSpeaker: 'Speaker to be announced',
	},
} as const;

export function localizedName(name: LocalizedName | undefined, locale: Locale): string {
	return typeof name === 'string' ? name : name?.[locale] || name?.en || Object.values(name ?? {})[0] || '';
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

export async function getSessions(locale: Locale): Promise<{ groups: SessionGroup[]; unavailable: boolean }> {
	try {
		const [submissions, speakers, tracks, types] = await Promise.all([
			fetchPages<Submission>('submissions/?state=confirmed&expand=resources'),
			fetchPages<Speaker>('speakers/'),
			fetchPages<NamedItem>('tracks/'),
			fetchPages<NamedItem>('submission-types/'),
		]);
		const groups = new Map<number, SessionGroup>();
		for (const submission of submissions) {
			const id = submission.submission_type;
			if (!groups.has(id)) groups.set(id, {
				id, name: localizedName(types.find((type) => type.id === id)?.name, locale) || sessionLabels[locale].unknownType,
				sessions: [],
			});
			groups.get(id)!.sessions.push({
				code: submission.code, title: submission.title,
				speakers: submission.speakers.map((code) => speakers.find((speaker) => speaker.code === code)?.name || sessionLabels[locale].unknownSpeaker),
				track: localizedName(tracks.find((track) => track.id === submission.track)?.name, locale),
				language: submission.content_locale || '',
				url: `${pretalx.baseUrl}/${pretalx.eventSlug}/talk/${encodeURIComponent(submission.code)}/`,
				video: videoUrl(submission.resources),
			});
		}
		const rank = (group: SessionGroup) => {
			const name = types.find((type) => type.id === group.id)?.name;
			const names = typeof name === 'string' ? name : Object.values(name ?? {}).join(' ');
			if (/keynote|기조/i.test(names)) return 0;
			if (/lightning|라이트닝/i.test(names)) return 2;
			if (/session|talk|세션|발표/i.test(names)) return 1;
			return 3;
		};
		return { groups: [...groups.values()].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name, locale)), unavailable: false };
	} catch (error) {
		console.warn('Unable to load sessions:', error instanceof Error ? error.message : 'Unknown error');
		return { groups: [], unavailable: true };
	}
}
