import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang) => {
			// const theme = 'abyss';

			const highlighter = await createHighlighter({
				themes: ['catppuccin-mocha'],
				langs: ['javascript', 'typescript', 'rust', 'c', 'c++', 'python'],
			});

			const html = escapeSvelte(
				highlighter.codeToHtml(code,
					{
						lang: lang,
						theme: 'catppuccin-mocha'
					}
				)
			);
			console.log(html);

			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeMathjax]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === "production" ? "/neural-flux" : "",
			relative: false
		},
		prerender: {
			handleMissingId: 'warn'
		}
	}
};

export default config;
