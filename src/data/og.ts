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

const lineArt = sharp(Buffer.from(lineArtSvg.replaceAll('currentColor', '#0a0a0a'))).resize(240).png().toBuffer()
	.then((png) => `data:image/png;base64,${png.toString('base64')}`);

async function photo(url: string): Promise<string | undefined> {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
		if (!response.ok) return undefined;
		const png = await sharp(Buffer.from(await response.arrayBuffer())).resize(300, 300, { position: 'top' }).png().toBuffer();
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
	// Without a photo the text takes the full width rather than leaving a placeholder.
	const titleSize = title.length > (image ? 40 : 60) ? 52 : 64;
	const tree = h('div', { display: 'flex', width: ogSize.width, height: ogSize.height, background: '#ffffff', color: '#0a0a0a', fontFamily: 'Pretendard' }, h('div', { display: 'flex', flexDirection: 'column', position: 'absolute', top: 56, right: 64, bottom: 56, left: 64, gap: 40 }, [
		h('div', { display: 'flex', alignItems: 'center', gap: 24 }, [
			h('img', { width: 120, height: 120 }, undefined, { src: await lineArt, width: 120, height: 120 }),
			h('div', { display: 'flex', flexDirection: 'column', gap: 4 }, [
				h('div', { fontSize: 32, fontWeight: 700 }, t.site.title),
				h('div', { fontSize: 24, color: '#525252' }, `${t.event.date} | ${t.event.venue}`),
				h('div', { fontSize: 24, color: '#525252' }, `${ui.ko.hero.subtitle} · ${ui.en.hero.subtitle}`),
			]),
		]),
		h('div', { display: 'flex', flex: 1, alignItems: 'center', gap: 48 }, [
			h('div', { display: 'flex', flexDirection: 'column', flex: 1, gap: 16 }, [
				h('div', { fontSize: 26, fontWeight: 700, color: '#2b7fff' }, label),
				h('div', { fontSize: titleSize, fontWeight: 700, lineHeight: 1.15, lineClamp: 3, display: 'block', wordBreak: 'keep-all' }, title),
				h('div', { fontSize: 36, fontWeight: 700, color: '#404040', lineClamp: 2, display: 'block', wordBreak: 'keep-all' }, people),
			]),
			...(image ? [h('img', { width: 300, height: 300, borderRadius: 150, objectFit: 'cover', flexShrink: 0 }, undefined, { src: image, width: 300, height: 300 })] : []),
		]),
	]));
	const svg = await satori(tree as never, { ...ogSize, fonts: await fonts, loadAdditionalAsset: missingGlyphs as never });
	return sharp(Buffer.from(svg)).png().toBuffer();
}
