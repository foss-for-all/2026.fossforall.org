import { pretalx } from '../config';
import type { Locale } from '../i18n/config';
import { getSessions, localizedName } from './sessions';

type LocalizedName = string | Record<string, string>;
interface WidgetSlot {
	code?: string;
	title: LocalizedName;
	start: string;
	end: string;
	room: number;
	speakers?: string[];
	content_locale?: string | null;
	slot_type?: string;
}
interface WidgetSchedule {
	talks: WidgetSlot[];
	rooms: { id: number; name: LocalizedName }[];
	speakers: { code: string; name: string }[];
	timezone: string;
}

export interface TimetableCell {
	row: number;
	rowEnd: number;
	column: number;
	columnEnd: number;
	start: string;
	title: string;
	talk: boolean;
	keynote: boolean;
	speakers: string;
	language: string;
	href?: string;
}
export interface Timetable {
	rooms: string[];
	times: string[];
	cells: TimetableCell[];
}

export const timetableLabels = {
	ko: {
		title: '한눈에 보는 일정표',
		description: 'FOSS for All Conference 2026 하루 일정을 A4 한 장에 담았습니다.',
		print: '인쇄 / PDF 저장',
		list: '자세한 일정표',
		keynote: '기조연설',
		other: 'EN',
		otherLegend: '영어 발표',
		note: '일정은 바뀔 수 있습니다. 최신 일정',
		pending: '일정표는 일정이 확정되면 공개됩니다. 그동안 세션 목록을 확인해 주세요.',
		unavailable: '일정을 불러올 수 없습니다. Pretalx에서 일정을 확인해 주세요.',
		sessions: '세션 목록 보기',
		time: '시간',
	},
	en: {
		title: 'Timetable at a glance',
		description: 'The whole day of FOSS for All Conference 2026 on one A4 page.',
		print: 'Print / Save as PDF',
		list: 'Detailed schedule',
		keynote: 'Keynote',
		other: 'KO',
		otherLegend: 'Talk in Korean',
		note: 'The schedule may change. Latest schedule',
		pending: 'The schedule will be published once it is finalized. In the meantime, check out the session list.',
		unavailable: 'The schedule is currently unavailable. Please check it on Pretalx.',
		sessions: 'View sessions',
		time: 'Time',
	},
} as const;

const scheduleUrl = `${pretalx.baseUrl}/${pretalx.eventSlug}/schedule/widgets/schedule.json`;

// 404 means no schedule is released yet; any other failure throws so CI keeps the deployed site.
async function fetchSchedule(): Promise<WidgetSchedule | null> {
	const response = await fetch(scheduleUrl, { signal: AbortSignal.timeout(15000) });
	if (response.status === 404) return null;
	if (!response.ok) throw new Error(`Pretalx schedule returned ${response.status}`);
	return response.json();
}

export async function getTimetable(locale: Locale): Promise<{ timetable: Timetable | null; unavailable: boolean }> {
	let data: WidgetSchedule | null;
	try {
		data = await fetchSchedule();
	} catch (error) {
		if (process.env.CI) throw error;
		console.warn('Unable to load the timetable:', error instanceof Error ? error.message : 'Unknown error');
		return { timetable: null, unavailable: true };
	}
	if (!data) return { timetable: null, unavailable: false };

	const { groups } = await getSessions(locale);
	const pages = new Map(groups.flatMap((group) => group.sessions).map((session) => [session.code, session]));
	const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: data.timezone });

	// Pretalx lists rooms in no stable order; ids follow creation order.
	const rooms = data.rooms.filter(({ id }) => id !== pretalx.everyRoom).sort((a, b) => a.id - b.id);
	const columnsOf = (room: number) => room === pretalx.everyRoom ? rooms.map((_, i) => i) : [rooms.findIndex(({ id }) => id === room)].filter((i) => i >= 0);
	const at = (value: string) => new Date(value).getTime();

	const talks = data.talks.filter((slot) => slot.code);
	const overlaps = (a: WidgetSlot, b: WidgetSlot) => at(a.start) < at(b.end) && at(b.start) < at(a.end);
	// Breaks that sit under talks only reserve the room in Pretalx, like "Opening + Keynote" over the keynotes.
	const breaks = data.talks.filter((slot) => !slot.code && !talks.some((talk) =>
		overlaps(slot, talk) && columnsOf(slot.room).some((column) => columnsOf(talk.room).includes(column))));

	// One cell per run of adjacent columns, so a break held in every room becomes one row.
	const items = new Map<string, { slot: WidgetSlot; columns: Set<number> }>();
	for (const slot of [...talks, ...breaks]) {
		const key = slot.code ?? `${localizedName(slot.title, locale)}|${at(slot.start)}|${at(slot.end)}`;
		if (!items.has(key)) items.set(key, { slot, columns: new Set() });
		for (const column of columnsOf(slot.room)) items.get(key)!.columns.add(column);
	}

	const bounds = [...new Set([...items.values()].flatMap(({ slot }) => [at(slot.start), at(slot.end)]))].sort((a, b) => a - b);
	const row = (value: string) => bounds.indexOf(at(value));
	const cells: TimetableCell[] = [];
	for (const { slot, columns } of items.values()) {
		const sorted = [...columns].sort((a, b) => a - b);
		const runs = sorted.reduce<number[][]>((all, column) => {
			const last = all.at(-1);
			if (last && last.at(-1) === column - 1) last.push(column);
			else all.push([column]);
			return all;
		}, []);
		const session = slot.code ? pages.get(slot.code) : undefined;
		for (const run of runs) {
			cells.push({
				row: row(slot.start),
				rowEnd: row(slot.end),
				column: run[0],
				columnEnd: run.at(-1)! + 1,
				start: time.format(new Date(slot.start)),
				title: localizedName(slot.title, locale),
				talk: Boolean(slot.code),
				keynote: session?.keynote ?? false,
				speakers: (slot.speakers ?? []).map((code) => data.speakers.find((speaker) => speaker.code === code)?.name).filter(Boolean).join(', '),
				language: slot.content_locale ?? '',
				href: session?.slug,
			});
		}
	}
	cells.sort((a, b) => a.row - b.row || a.column - b.column);

	return {
		timetable: {
			rooms: rooms.map(({ name }) => localizedName(name, locale)),
			times: bounds.map((value) => time.format(new Date(value))),
			cells,
		},
		unavailable: false,
	};
}
