import type { APIRoute } from 'astro';
import { cardPaths, renderCard, type Card } from '../../../../data/og';

export const getStaticPaths = cardPaths;

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await renderCard(props as Card)), { headers: { 'Content-Type': 'image/png' } });
