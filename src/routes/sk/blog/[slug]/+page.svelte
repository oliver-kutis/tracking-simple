<script lang="ts">
	import themeStore from '$stores/theme';
	import { themes } from '$lib/themes';
	import type { PageData } from './$types';
	import type { Theme } from '$lib/types';
	import { onMount } from 'svelte';
	import addTOC from '$actions/addTOC';
	import CopyCodeButton from '$lib/components/CopyCodeButton.svelte';
	import TagsIcon from '$lib/components/svg/TagsIcon.svelte';
	import DateIcon from '$lib/components/svg/DateIcon.svelte';
	import Pencil from '$lib/components/svg/Pencil.svelte';

	// interface Heading {
	// 	headingProps: {
	// 		tagName: string;
	// 		id: string;
	// 		text: string;
	// 		href: string;
	// 	};
	// 	children: Record<string, Heading>;
	// }

	let isModalOpen = false;

	$: currentTheme = themes.find((theme: Theme) => theme.theme === $themeStore);
	$: currentThemeMode = currentTheme ? currentTheme.meta.mode : 'light';
	$: console.log(currentThemeMode);

	export let data: PageData;
	const { metadata, post: Post } = data;

	let readTime: number = 0;

	onMount(() => {
		// Get code blocks
		const preTags: HTMLCollectionOf<HTMLPreElement> = document.getElementsByTagName('pre');
		for (let preTag of preTags) {
			const classList = Array.from(preTag.classList);
			const isCodeBlock = classList.some(className => className.startsWith('shiki'));
			if (isCodeBlock) {
				const preTagParent = preTag.parentElement;

				const newCodeBlockWrapper = document.createElement('div');
				newCodeBlockWrapper.className = 'relative z-1';

				new CopyCodeButton({
					target: newCodeBlockWrapper,
				});

				if (preTagParent) {
					preTagParent.replaceChild(newCodeBlockWrapper, preTag);
					newCodeBlockWrapper.appendChild(preTag);
				}
			}
		}

		const text: string = document.querySelector('article')?.innerText || '';
		const wordsPerMinute: number = text.split(' ').length / 200;
		readTime = Math.round(wordsPerMinute);
	});
</script>

<article class="">
	<div class="mx-auto mb-6">
		<!-- TODO: Place these items in the components, use module context and differentiate type using props -->
		<h1 class="text-base-content text-3xl md:text-4xl font-bold mb-4">{metadata.title}</h1>
		<div class="flex flex-col md:flex-row gap-2 justify-star mb-2">
			<div class="flex flex-row gap-2 items-center">
				<time
					datetime={metadata.datePublished}
					class="text-base-content text-sm md:text-base font-light"
				>
					{metadata.datePublished}
				</time>
				{#if readTime}
					<p class="text-base-content text-sm md:text-base font-light">
						/ Čas čítania: {readTime} minút
					</p>
				{/if}
				<!-- {#if metadata.dateEdited}
					<Pencil />
					<time
						datetime={metadata.datePublished}
						class="text-base-content text-sm md:text-base font-light italic pr-4"
					>
						{metadata.dateEdited}
					</time>
				{/if} -->
			</div>
			<!-- {#if metadata.tags}
				<div class="flex flex-row gap-2 items-center">
					<TagsIcon />
					<p class="text-base-content text-sm md:text-base font-light italic pr-4">
						{metadata.tags.join(' x ')}
					</p>
				</div>
			{/if} -->
		</div>
		<img
			src={`/${metadata?.imgUrl}`}
			alt={metadata?.imgAlt}
			class="object-fill w-full h-fit aspect-video"
			loading="lazy"
		/>
		<div class="flex justify-end items-right prose max-w-full prose-a:text-60">
			<span class="text-base font-light italic text-right"
				>TAKEN from <a href="" class="prose text-primary hover:text-accent">SOME WEBSITE</a
				></span
			>
		</div>
	</div>

	<div
		use:addTOC
		id="post"
		class={`

			shiki-${currentTheme?.meta.shikiTheme} prose prose-base md:prose-lg 
			prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg md:prose-h1:text-3xl md:prose-h2:text-2xl md:prose-h3:text-xl
			py-2 px-2 max-w-none prose-headings:prose-2xl md:prose-headings:prose-2xl
			prose-blockquote:prose-base md:prose-blockquote:prose-lg prose-headings:font-bold prose-headings:my-4 
			hover:prose-a:text-accent prose-a:text-primary`}
	>
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
			html.code-theme-min-light .shiki-min-light div > pre,
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
			html.code-theme-solarized-dark .shiki-solarized-dark div > pre,
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
