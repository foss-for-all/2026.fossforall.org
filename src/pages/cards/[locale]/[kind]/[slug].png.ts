import type { APIRoute } from 'astro';
import { cardPaths, renderSquareCard, type Card } from '../../../../data/og';

// Square card-news images are large, so they are built only by `npm run cards`.
export async function getStaticPaths() {
	return process.env.CARDS ? cardPaths() : [];
}

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderSquareCard(props as Card)), { headers: { 'Content-Type': 'image/png' } });
