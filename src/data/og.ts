import { readFile } from 'node:fs/promises';
import logoSvg from '../assets/f4a-logo.svg?raw';
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
const logo = sharp(Buffer.from(logoSvg)).resize(440).png().toBuffer().then(dataUri);

async function photo(url: string): Promise<string | undefined> {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
		if (!response.ok) return undefined;
		const png = await sharp(Buffer.from(await response.arrayBuffer())).resize(440, 440, { position: 'top' }).png().toBuffer();
		return `data:image/png;base64,${png.toString('base64')}`;
	} catch { return undefined; }
}

// Pretendard has no Han characters; fetch just the missing glyphs, and draw nothing if that fails.
async function missingGlyphs(_code: string, text: string) {
	try {
		const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&text=${encodeURIComponent(text)}`, { signal: AbortSignal.timeout(15000) })).text();
		return await Promise.all([...css.matchAll(/font-weight: (400|700);\s*src: url\((.+?)\)/g)].map(async ([, weight, src]) => ({
			name: 'Noto Sans KR',
			data: await (await fetch(src, { signal: AbortSignal.timeout(15000) })).arrayBuffer(),
			weight: Number(weight) as 400 | 700,
		})));
	} catch { return []; }
}

// Satori's keep-all still breaks at script and punctuation boundaries ("Team\n의");
// word joiners inside each word leave spaces as the only break points.
const words = (text: string) => text.split(' ').map((word) => [...word].join('\u2060')).join(' ');

// Shrink long titles until they fit the text column instead of truncating them.
function titleSize(title: string): number {
	const width = [...title].reduce((sum, char) => sum + (/[\u1100-\u11ff\u3000-\u9fff\uac00-\ud7af]/.test(char) ? 1 : 0.56), 0);
	// Largest size whose estimated line count fits both 4 lines and the space under the header.
	return [104, 92, 80, 70, 62, 56, 50, 44].find((size) => {
		const lines = Math.ceil((width * size) / (textWidth * 0.85));
		return lines <= 4 && lines * size * 1.18 <= 240;
	}) ?? 44;
}

const textWidth = 640;
const circle = 360;
// Leaves room for the slogan under the circle.
const circleTop = 116;
const nameTop = 474;

export async function renderCard({ locale, title, people, label, avatar }: Card): Promise<Buffer> {
	const t = useTranslations(locale);
	const image = avatar && await photo(avatar);
	const size = titleSize(title);
	const border = 12;
	const tree = h('div', { display: 'flex', width: ogSize.width, height: ogSize.height, background: '#ffffff', color: '#000000', fontFamily: 'Pretendard' }, [
		h('div', { display: 'flex', alignItems: 'center', gap: 20, position: 'absolute', top: 52, left: 60 }, [
			h('img', { width: 92, height: 92 }, undefined, { src: await logo, width: 92, height: 92 }),
			h('div', { display: 'flex', flexDirection: 'column', gap: 2 }, [
				h('div', { fontSize: 44, fontWeight: 700 }, t.site.title),
				h('div', { fontSize: 33, color: '#525252' }, `${t.event.date}, ${t.event.venue}`),
			]),
		]),
		// Title grows upward from a fixed bottom so every speaker name sits on the same line.
		h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'absolute', top: 160, left: 60, width: textWidth, height: nameTop - 28 - 160 }, [
			h('div', { fontSize: 36, fontWeight: 700, color: '#262626', marginBottom: 12 }, label),
			h('div', { fontSize: size, fontWeight: 700, lineHeight: 1.18, letterSpacing: -1, lineClamp: 4, display: 'block' }, words(title)),
		]),
		h('div', { position: 'absolute', top: nameTop, left: 60, width: textWidth, fontSize: 54, fontWeight: 700, color: '#333333', lineClamp: 1, display: 'block' }, words(people)),
		h('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', right: 64, bottom: 32, fontSize: 24, color: '#737373' }, [
			h('div', {}, ui.ko.hero.subtitle),
			h('div', {}, ui.en.hero.subtitle),
		]),
		image
			? h('img', { position: 'absolute', right: 64, top: circleTop, width: circle, height: circle, borderRadius: circle / 2, border: `${border}px solid #2979ff`, objectFit: 'cover' }, undefined, { src: image, width: circle, height: circle })
			: h('img', { position: 'absolute', right: 64, top: circleTop, width: circle, height: circle }, undefined, { src: await logo, width: circle, height: circle }),
	]);
	const svg = await satori(tree as never, { ...ogSize, fonts: await fonts, loadAdditionalAsset: missingGlyphs as never });
	return sharp(Buffer.from(svg)).png().toBuffer();
}
