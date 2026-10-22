import { readFile } from 'node:fs/promises';
import lineArtSvg from '../assets/f4a_line_art.svg?raw';
import satori from 'satori';
import sharp from 'sharp';
import type { Locale } from '../i18n/config';
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

const lineArt = sharp(Buffer.from(lineArtSvg.replaceAll('currentColor', '#0a0a0a'))).resize(200).png().toBuffer()
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
	const tree = h('div', { display: 'flex', width: ogSize.width, height: ogSize.height, background: '#ffffff', color: '#0a0a0a', fontFamily: 'Pretendard' }, h('div', { display: 'flex', position: 'absolute', top: 64, right: 64, bottom: 64, left: 64 }, [
		h('div', { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }, [
			h('div', { display: 'flex', flexDirection: 'column', gap: 6 }, [
				h('div', { fontSize: 30, fontWeight: 700 }, t.site.title),
				h('div', { fontSize: 24, color: '#525252' }, `${t.event.date} · ${t.event.venue}`),
			]),
			h('div', { display: 'flex', flexDirection: 'column', gap: 18, paddingRight: 32 }, [
				h('div', { fontSize: 24, fontWeight: 700, color: '#2b7fff' }, label),
				h('div', { fontSize: 56, fontWeight: 700, lineHeight: 1.15, lineClamp: 3, display: 'block', wordBreak: 'keep-all' }, title),
				h('div', { fontSize: 32, color: '#404040', wordBreak: 'keep-all' }, people),
			]),
			h('div', { fontSize: 24, color: '#525252' }, '2026.fossforall.org'),
		]),
		h('div', { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', width: 300, flexShrink: 0 }, [
			image
				? h('img', { width: 300, height: 300, borderRadius: 150, objectFit: 'cover' }, undefined, { src: image, width: 300, height: 300 })
				: h('div', { width: 300, height: 300 }),
			h('img', { width: 160, height: 160 }, undefined, { src: await lineArt, width: 160, height: 160 }),
		]),
	]));
	const svg = await satori(tree as never, { ...ogSize, fonts: await fonts, loadAdditionalAsset: missingGlyphs as never });
	return sharp(Buffer.from(svg)).png().toBuffer();
}
