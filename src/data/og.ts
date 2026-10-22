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

// The logo is drawn large on the right; a speaker photo fills its blue ring.
const logoSize = 600;
const ring = { center: 0.5, inner: 0.352 };
const logo = sharp(Buffer.from(lineArtSvg.replaceAll('currentColor', '#000000'))).resize(logoSize).png().toBuffer()
	.then((png) => `data:image/png;base64,${png.toString('base64')}`);

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

export async function renderCard({ locale, title, people, label, avatar }: Card): Promise<Buffer> {
	const t = useTranslations(locale);
	const image = avatar && await photo(avatar);
	const titleSize = title.length <= 20 ? 76 : title.length <= 40 ? 64 : 52;
	const photoSize = Math.round(logoSize * ring.inner * 2);
	// Bleed the logo off the right edge so the ring sits beside the text column.
	const logoLeft = ogSize.width - logoSize + 90;
	const logoTop = (ogSize.height - logoSize) / 2;
	const tree = h('div', { display: 'flex', width: ogSize.width, height: ogSize.height, background: '#ffffff', color: '#000000', fontFamily: 'Pretendard' }, [
		h('img', { position: 'absolute', left: logoLeft, top: logoTop, width: logoSize, height: logoSize }, undefined, { src: await logo, width: logoSize, height: logoSize }),
		...(image ? [h('img', {
			position: 'absolute', width: photoSize, height: photoSize, borderRadius: photoSize / 2, objectFit: 'cover',
			left: logoLeft + logoSize * ring.center - photoSize / 2, top: logoTop + logoSize * ring.center - photoSize / 2,
		}, undefined, { src: image, width: photoSize, height: photoSize })] : []),
		h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', top: 56, bottom: 56, left: 64, width: 600 }, [
			h('div', { display: 'flex', flexDirection: 'column', gap: 4 }, [
				h('div', { fontSize: 30, fontWeight: 700 }, t.site.title),
				h('div', { fontSize: 24, color: '#525252' }, `${t.event.date}, ${t.event.venue}`),
			]),
			h('div', { display: 'flex', flexDirection: 'column', gap: 14 }, [
				h('div', { fontSize: 28, fontWeight: 700, color: '#2979ff' }, label),
				h('div', { fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5, lineClamp: 3, display: 'block', wordBreak: 'keep-all' }, title),
				h('div', { fontSize: 36, fontWeight: 700, color: '#333333', lineClamp: 2, display: 'block', wordBreak: 'keep-all' }, people),
			]),
			h('div', { display: 'flex', flexDirection: 'column', fontSize: 22, color: '#737373' }, [
				h('div', {}, ui.ko.hero.subtitle),
				h('div', {}, ui.en.hero.subtitle),
			]),
		]),
	]);
	const svg = await satori(tree as never, { ...ogSize, fonts: await fonts, loadAdditionalAsset: missingGlyphs as never });
	return sharp(Buffer.from(svg)).png().toBuffer();
}
