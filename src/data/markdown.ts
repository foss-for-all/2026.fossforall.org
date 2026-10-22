import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';

// Pretalx text is speaker-supplied; sanitizing before rehype-raw also drops raw HTML.
const processor = createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [rehypeSanitize] });

export async function renderMarkdown(source: string): Promise<string> {
	return (await (await processor).render(source)).code;
}
