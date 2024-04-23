import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import sveltePreprocess from 'svelte-preprocess';
// import autoprefixer from 'autoprefixer';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';

/**@type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: './src/mdsvex.svelte',
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: [
					'poimandres',
					'andromeeda',
					'github-light',
					'min-light',
					// 'catppuccin-latte',
					// 'light-plus',
					'material-theme-lighter',
					'rose-pine-dawn',
					'slack-ochin',
					// 'solarized-dark',
					'vitesse-dark',
					'vesper',
					'rose-pine-moon',
					'min-dark',
					'material-theme-ocean',
					'nord',
					'ayu-dark',
					'solarized-dark',
					'synthwave-84',
					'dracula',
					'tokyo-night',
					'red',
				],
				langs: ['javascript', 'typescript', 'html', 'css', 'bash', 'python'],
			});
			await highlighter.loadLanguage(
				'javascript',
				'typescript',
				'html',
				'css',
				'bash',
				'python',
			);
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes: {
						'min-light': 'min-light',
						// light: 'vitesse-light',
						'min-dark': 'min-dark',
						vesper: 'vesper',
						nord: 'nord',
						'ayu-dark': 'ayu-dark',
						'solarized-dark': 'solarized-dark',
						'synthwave-84': 'synthwave-84',
						dracula: 'tokyo-night',
						red: 'red',
					},
					defaultColor: false,
					cssVariablePrefix: '--shiki-',
				}),
			);
			return `{@html \`${html}\` }`;
		},
	},
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		// sveltePreprocess({
		// 	postcss: {
		// 		plugins: [autoprefixer],
		// 	},
		// }),
		mdsvex(mdsvexOptions),
	],
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$stores: './src/stores',
			// $library: './src/library',
			// $models: './src/models',
			// $pages: './src/pages',
			// $routes: './src/routes',
			// $services: './src/services',
			// $styles: './src/styles',
			// utils: './src/utils',
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
	},
};

export default config;
