import { readFile } from 'node:fs/promises';
import lineArtSvg from '../assets/f4a_line_art.svg?raw';
import satori from 'satori';
import sharp from 'sharp';
import type { Locale } from '../i18n/config';
import { ui } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

export const ogSize = { width: 1200, height: 630 } as const;

interface Card {
	locale: Locale;
	title: string;
	people: string;
	label: string;
	avatar?: string;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra?: Record<string, unknown>): Node =>
	({ type, props: { style, children, ...extra } });

// Bundling moves this module, so resolve from the project root.
const font = (weight: string) => readFile(`${process.cwd()}/node_modules/pretendard/dist/public/static/alternative/Pretendard-${weight}.ttf`);
const fonts = Promise.all([font('Regular'), font('Bold')]).then(([regular, bold]) => [
	{ name: 'Pretendard', data: regular, weight: 400 as const },
	{ name: 'Pretendard', data: bold, weight: 700 as const },
]);

const dataUri = (png: Buffer) => `data:image/png;base64,${png.toString('base64')}`;
const lineArt = Buffer.from(lineArtSvg.replaceAll('currentColor', '#000000'));
const logo = sharp(lineArt).resize(184).png().toBuffer().then(dataUri);
// Without a photo the circle shows the logo's own artwork, cropped to its blue ring (r = 0.3765).
const ringArt = sharp(lineArt).resize(1000).png().toBuffer()
	.then((png) => sharp(png).extract({ left: 124, top: 124, width: 752, height: 752 }).resize(440).png().toBuffer()).then(dataUri);

async function photo(url: string): Promise<string | undefined> {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
		if (!response.ok) return undefined;
		const png = await sharp(Buffer.from(await response.arrayBuffer())).resize(440, 440, { position: 'top' }).png().toBuffer();
		return `data:image/png;base64,${png.toString('base64')}`;
	} catch { return undefined; }
}

// Pretendard has no Han characters; fetch just the missing glyphs from Noto Sans KR.
// Other scripts and emoji are not covered and are left out. In CI a failed fetch fails the build,
// so a card without its Han characters is never deployed.
async function missingGlyphs(code: string, text: string) {
	if (code === 'emoji') return [];
	const get = async (url: string) => {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
		if (!response.ok) throw new Error(`${url} returned ${response.status}`);
		return response;
	};
	try {
		const css = await (await get(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&text=${encodeURIComponent(text)}`)).text();
		return await Promise.all([...css.matchAll(/font-weight: (400|700);\s*src: url\((.+?)\)/g)].map(async ([, weight, src]) => ({
			// Satori keeps the first font registered under a name, so each subset needs its own.
			name: `Noto Sans KR ${text}`,
			data: await (await get(src)).arrayBuffer(),
			weight: Number(weight) as 400 | 700,
		})));
	} catch (error) {
		if (process.env.CI && /[\p{Script=Han}\p{Script=Hangul}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text)) throw error;
		return [];
	}
}

// Emoji and scripts without a font here would render as boxes, so they are left out.
const drawable = (text: string) => text
	.replace(/[\p{Extended_Pictographic}\u200d\ufe0f]/gu, '')
	.replace(/[^\p{Script=Latin}\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Common}\p{Script=Inherited}]/gu, '')
	.replace(/\s+/g, ' ').trim();

// Rough width in em: CJK is full width, everything else about half.
const estimate = (text: string) => [...text].reduce((sum, char) => sum + (/[\u1100-\u11ff\u3000-\u9fff\uac00-\ud7af]/.test(char) ? 1 : 0.56), 0);

// Satori's keep-all still breaks at script and punctuation boundaries ("Team\n의");
// word joiners inside each word leave spaces as the only break points, except for words
// too wide for one line (no-space CJK, long URLs), which stay breakable.
const words = (text: string, size: number) => text.split(' ')
	.map((word) => (estimate(word) * size <= textWidth * 0.9 ? [...word].join('\u2060') : word)).join(' ');

// Shrink long text until it fits instead of truncating it.
function fit(text: string, sizes: number[], maxLines: number, maxHeight: number): number {
	const width = estimate(text);
	return sizes.find((size) => {
		const lines = Math.ceil((width * size) / (textWidth * 0.85));
		return lines <= maxLines && lines * size * 1.18 <= maxHeight;
	}) ?? sizes.at(-1)!;
}

const textWidth = 640;
const circle = 360;
// Leaves room for the slogan under the circle.
const circleTop = 116;
// Label and name are pinned; the title is centred in the band between them.
const labelTop = 176;
const titleTop = 224;
const nameTop = 468;

export async function renderCard({ locale, title: rawTitle, people: rawPeople, label, avatar }: Card): Promise<Buffer> {
	const title = drawable(rawTitle);
	const people = drawable(rawPeople);
	const t = useTranslations(locale);
	const image = avatar && await photo(avatar);
	const size = fit(title, [104, 92, 80, 70, 62, 56, 50, 44, 40], 4, nameTop - 20 - titleTop);
	const peopleSize = fit(people, [54, 48, 42, 38, 34, 30, 28, 26], 3, 104);
	const border = 12;
	const tree = h('div', { display: 'flex', width: ogSize.width, height: ogSize.height, background: '#ffffff', color: '#000000', fontFamily: 'Pretendard' }, [
		h('div', { display: 'flex', alignItems: 'center', gap: 20, position: 'absolute', top: 52, left: 60 }, [
			h('img', { width: 92, height: 92 }, undefined, { src: await logo, width: 92, height: 92 }),
			h('div', { display: 'flex', flexDirection: 'column', gap: 2 }, [
				h('div', { fontSize: 44, fontWeight: 700 }, t.site.title),
				h('div', { fontSize: 33, color: '#525252' }, `${t.event.date}, ${t.event.venue}`),
			]),
		]),
		h('div', { position: 'absolute', top: labelTop, left: 60, fontSize: 36, fontWeight: 700, color: '#262626', paddingBottom: 6, borderBottom: '4px solid #262626' }, label),
		h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'absolute', top: titleTop, left: 60, width: textWidth, height: nameTop - 20 - titleTop }, [
			h('div', { fontSize: size, fontWeight: 700, lineHeight: 1.18, letterSpacing: -1, lineClamp: 4, display: 'block' }, words(title, size)),
		]),
		h('div', { position: 'absolute', top: nameTop, left: 60, width: textWidth, fontSize: peopleSize, fontWeight: 700, lineHeight: 1.18, color: '#333333', lineClamp: 3, display: 'block' }, words(people, peopleSize)),
		h('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', right: 64, bottom: 32, fontSize: 24, color: '#737373' }, [
			h('div', {}, ui.ko.hero.subtitle),
			h('div', {}, ui.en.hero.subtitle),
		]),
		image
			? h('img', { position: 'absolute', right: 64, top: circleTop, width: circle, height: circle, borderRadius: circle / 2, border: `${border}px solid #2979ff`, objectFit: 'cover' }, undefined, { src: image, width: circle, height: circle })
			: h('img', { position: 'absolute', right: 64, top: circleTop, width: circle, height: circle, borderRadius: circle / 2 }, undefined, { src: await ringArt, width: circle, height: circle }),
	]);
	const svg = await satori(tree as never, { ...ogSize, fonts: await fonts, loadAdditionalAsset: missingGlyphs as never });
	return sharp(Buffer.from(svg)).png().toBuffer();
}
