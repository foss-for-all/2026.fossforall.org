import { createHash } from 'node:crypto';
import type { Locale } from '../i18n/config';
import rawTranslations from './translations.json' with { type: 'json' };

export interface TextTranslation {
	hash: string;
	bilingual?: boolean;
	ko?: string;
	en?: string;
}

export interface SessionTranslationEntry {
	title?: TextTranslation;
	description?: TextTranslation;
}

export interface SpeakerTranslationEntry {
	biography?: TextTranslation;
}

export interface TranslationsFile {
	sessions: Record<string, SessionTranslationEntry>;
	speakers: Record<string, SpeakerTranslationEntry>;
}

export interface ResolvedText {
	text?: string;
	bilingual: boolean;
	sourceLocale?: Locale;
}

export interface SessionTranslation {
	title?: ResolvedText;
	description?: ResolvedText;
}

export interface SpeakerTranslation {
	biography?: ResolvedText;
}

const translations = rawTranslations as TranslationsFile;
const warned = new Set<string>();

export function hashSource(text: string): string {
	return createHash('sha256')
		.update(text.replace(/\r\n?/g, '\n').trim(), 'utf8')
		.digest('hex')
		.slice(0, 16);
}

function resolveText(
	key: string,
	entry: TextTranslation | undefined,
	sourceText: string,
	targetLocale: Locale,
): ResolvedText | undefined {
	if (!entry || !sourceText.trim()) return undefined;
	const actual = hashSource(sourceText);
	if (entry.hash !== actual) {
		if (!warned.has(key)) {
			warned.add(key);
			console.warn(`Translation hash mismatch for ${key}: expected ${entry.hash}, got ${actual}`);
		}
		return undefined;
	}
	if (entry.bilingual) return { bilingual: true };
	const text = entry[targetLocale];
	if (text) {
		return {
			text,
			bilingual: false,
			sourceLocale: targetLocale === 'en' ? 'ko' : 'en',
		};
	}
	return undefined;
}

export function getSessionTitleTranslation(
	code: string,
	sourceTitle: string,
	targetLocale: Locale,
): ResolvedText | undefined {
	return resolveText(`session:${code}:title`, translations.sessions[code]?.title, sourceTitle, targetLocale);
}

export function getSessionTranslation(
	code: string,
	sourceTitle: string,
	sourceBody: string,
	targetLocale: Locale,
): SessionTranslation | undefined {
	const entry = translations.sessions[code];
	if (!entry) return undefined;
	const title = resolveText(`session:${code}:title`, entry.title, sourceTitle, targetLocale);
	const description = resolveText(`session:${code}:description`, entry.description, sourceBody, targetLocale);
	if (!title && !description) return undefined;
	return {
		...(title ? { title } : {}),
		...(description ? { description } : {}),
	};
}

export function getSpeakerTranslation(
	code: string,
	sourceBio: string,
	targetLocale: Locale,
): SpeakerTranslation | undefined {
	const biography = resolveText(
		`speaker:${code}:biography`,
		translations.speakers[code]?.biography,
		sourceBio,
		targetLocale,
	);
	return biography ? { biography } : undefined;
}
