<script lang="ts">
	import themeStore from '$stores/theme';
	import { themes } from '$lib/themes';
	import type { PageData, Theme } from './$types';
	import { onMount } from 'svelte';
	import addTOC from '$actions/addTOC';
	import CopyCodeButton from '$lib/components/CopyCodeButton.svelte';

	interface Theme {
		theme: string;
		meta: {
			mode: string;
		};
	}
	interface Heading {
		headingProps: {
			tagName: string;
			id: string;
			text: string;
			href: string;
		};
		children: Record<string, Heading>;
	}

	$: currentTheme = themes.find((theme: Theme) => theme.theme === $themeStore);
	$: currentThemeMode = currentTheme ? currentTheme.meta.mode : 'light';
	$: console.log(currentThemeMode);

	export let data: PageData;
	const { metadata, post: Post } = data;

	onMount(() => {
		// Get code blocks
		const preTags: HTMLCollectionOf<HTMLPreElement> = document.getElementsByTagName('pre');
		for (let preTag of preTags) {
			const classList = Array.from(preTag.classList);
			const isCodeBlock = classList.some(className => className.startsWith('shiki'));
			if (isCodeBlock) {
				const preTagParent = preTag.parentElement;

				const newCodeBlockWrapper = document.createElement('div');
				newCodeBlockWrapper.className = 'relative z-[-1]';

				new CopyCodeButton({
					target: newCodeBlockWrapper,
				});

				if (preTagParent) {
					preTagParent.replaceChild(newCodeBlockWrapper, preTag);
					newCodeBlockWrapper.appendChild(preTag);
				}
			}
		}

		// get block quotes and remove '"' quotation marks
		const blockQuotes: HTMLCollectionOf<HTMLQuoteElement> =
			document.getElementsByTagName('blockquote');
		for (let blockQuote of blockQuotes) {
			const blockQuoteText = blockQuote.textContent;
			if (blockQuoteText) {
				blockQuote.textContent = blockQuoteText.replace(/"/g, '');
			}
		}
	});
</script>

<article>
	<div class="mx-auto mt-5 mb-16">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={`/${metadata?.imgUrl}`} alt="Article image" class="w-4/5 mx-auto" />
	</div>
	<!-- <TableOfContents></TableOfContents> -->
	<!-- <div
		id="post"
		class={`shiki-${currentTheme?.meta.shikiTheme} prose py-2 px-2 max-w-none prose-blockquote: text-lg prose-p:text-lg prose-headings:font-bold`}
	> -->
	<div
		use:addTOC
		id="post"
		class={`shiki-${currentTheme?.meta.shikiTheme} prose prose-base lg:prose-lg py-2 px-2 max-w-none prose-blockquote:prose-lg md:prose-blockquote:prose-2xl prose-headings:font-bold`}
	>
		<!-- <div
		use:addTOC
		id="post"
		class={`shiki-${currentTheme?.meta.shikiTheme} prose py-2 px-2 max-w-none prose-blockquote:text-lg text-lg prose-headings:font-bold`}
	> -->
		<Post />
	</div>
</article>

<style>
	:global(html.code-theme-vesper .shiki-vesper div > pre, html.code-theme-vesper .shiki span) {
		color: var(--shiki-vesper) !important;
		/* background-color: var(--shiki-vesper-bg) !important; */
		background-color: var(--fallback-n, oklch(var(--n) / 1)) !important;
		font-style: var(--shiki-vesper-font-style) !important;
		font-weight: var(--shiki-vesper-font-weight) !important;
		text-decoration: var(--shiki-vesper-text-decoration) !important;
	}
	:global(
			html.code-theme-min-dark .shiki-min-dark div > pre,
			html.code-theme-min-dark .shiki span
		) {
		color: var(--shiki-min-dark) !important;
		/* background-color: var(--shiki-min-dark-bg) !important; */
		background-color: var(--fallback-n, oklch(var(--n) / 1)) !important;
		font-style: var(--shiki-min-dark-font-style) !important;
		font-weight: var(--shiki-min-dark-font-weight) !important;
		text-decoration: var(--shiki-min-dark-text-decoration) !important;
	}

	:global(
			html.code-theme-min-light .shiki-minight div > pre,
			html.code-theme-min-light .shiki span
		) {
		color: var(--shiki-min-light) !important;
		background-color: var(--shiki-min-light-bg) !important;
		font-style: var(--shiki-min-light-font-style) !important;
		font-weight: var(--shiki-min-light-font-weight) !important;
		text-decoration: var(--shiki-min-light-text-decoration) !important;
	}
	:global(html.code-theme-nord .shiki-nord div > pre, html.code-theme-nord .shiki span) {
		color: var(--shiki-nord) !important;
		background-color: var(--shiki-nord-bg) !important;
		/* background-color: var(--fallback-n, oklch(var(--n) / 1)) !important; */
		font-style: var(--shiki-nord-font-style) !important;
		font-weight: var(--shiki-nord-font-weight) !important;
		text-decoration: var(--shiki-nord-text-decoration) !important;
	}
	:global(
			html.code-theme-ayu-dark .shiki-ayuark div > pre,
			html.code-theme-ayu-dark .shiki span
		) {
		color: var(--shiki-ayu-dark) !important;
		background-color: var(--shiki-ayu-dark-bg) !important;
		font-style: var(--shiki-ayu-dark-font-style) !important;
		font-weight: var(--shiki-ayu-dark-font-weight) !important;
		text-decoration: var(--shiki-ayu-dark-text-decoration) !important;
	}
	:global(
			html.code-theme-solarized-dark .shiki-solized-dark div > pre,
			html.code-theme-solarized-dark .shiki span
		) {
		color: var(--shiki-solarized-dark) !important;
		background-color: var(--fallback-n, oklch(var(--n) / 1)) !important;
		/* background-color: var(--shiki-solarized-dark-bg) !important; */
		font-style: var(--shiki-solarized-dark-font-style) !important;
		font-weight: var(--shiki-solarized-dark-font-weight) !important;
		text-decoration: var(--shiki-solarized-dark-text-decoration) !important;
	}
	:global(
			html.code-theme-synthwave-84 .shiki-synwave-84 div > pre,
			html.code-theme-synthwave-84 .shiki span
		) {
		color: var(--shiki-synthwave-84) !important;
		background-color: var(--fallback-n, oklch(var(--n) / 1)) !important;
		/* background-color: var(--shiki-synthwave-84-bg) !important; */
		font-style: var(--shiki-synthwave-84-font-style) !important;
		font-weight: var(--shiki-synthwave-84-font-weight) !important;
		text-decoration: var(--shiki-synthwave-84-text-decoration) !important;
	}
	:global(html.code-theme-red .shiki-red pre, html.code-theme-red .shiki span) {
		color: var(--shiki-red) !important;
		/* background-color: var(--fallback-nc, oklch(var(--bc) / 1)) !important; */
		background-color: #361b23 !important;
		/* background-color: var(--shiki-red-bg) !important; */
		font-style: var(--shiki-red-font-style) !important;
		font-weight: var(--shiki-red-font-weight) !important;
		text-decoration: var(--shiki-red-text-decoration) !important;
	}
</style>
