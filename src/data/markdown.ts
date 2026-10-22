import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

// Pretalx text is speaker-supplied, so pasted HTML is parsed and then sanitized.
// remark-rehype already prefixes footnote ids, so clobberPrefix is off; instead only those ids
// survive, and `name` is dropped, so speaker text cannot shadow document properties or page ids.
const schema = {
	...defaultSchema,
	clobberPrefix: '',
	strip: [...(defaultSchema.strip ?? []), 'style'],
	// Remote images would be hotlinked from the speaker's host.
	tagNames: defaultSchema.tagNames?.filter((tag) => tag !== 'img'),
	attributes: {
		...defaultSchema.attributes,
		'*': [...(defaultSchema.attributes?.['*'] ?? []).filter((attribute) => attribute !== 'id' && attribute !== 'name'), ['id', /^(user-content-|footnote-label$)/]],
	},
};

const processor = createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [rehypeRaw, [rehypeSanitize, schema]] });

export async function renderMarkdown(source: string): Promise<string> {
	return (await (await processor).render(source)).code;
}

// Plain text for meta descriptions, cut on code points so emoji stay whole.
export async function summarize(source: string, length = 160): Promise<string | undefined> {
	const text = (await renderMarkdown(source)).replace(/<[^>]*>/g, ' ').replace(/&[^;\s]+;/g, ' ').replace(/\s+/g, ' ').trim();
	return text ? [...text].slice(0, length).join('') : undefined;
}
