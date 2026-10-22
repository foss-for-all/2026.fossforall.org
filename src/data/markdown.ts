import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Pretalx text is speaker-supplied, so pasted HTML is parsed and then sanitized.
// remark-rehype already prefixes footnote ids; a second prefix would break their links.
const processor = createMarkdownProcessor({
	syntaxHighlight: false,
	rehypePlugins: [rehypeRaw, [rehypeSanitize, { ...defaultSchema, clobberPrefix: '', strip: [...(defaultSchema.strip ?? []), 'style'] }]],
});

export async function renderMarkdown(source: string): Promise<string> {
	return (await (await processor).render(source)).code;
}

// Plain text for meta descriptions, cut on code points so emoji stay whole.
export async function summarize(source: string, length = 160): Promise<string | undefined> {
	const text = (await renderMarkdown(source)).replace(/<[^>]*>/g, ' ').replace(/&[^;\s]+;/g, ' ').replace(/\s+/g, ' ').trim();
	return text ? [...text].slice(0, length).join('') : undefined;
}
