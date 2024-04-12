<script lang="ts">
	import themeStore from '$stores/theme';
	import { themes } from '$lib/themes';
	import type { Theme } from '../../../lib/types';
	import './prism-coldark-dark.css';
	// import './prism-dracula.css';
	// import './prism-duotone-dark.css';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	// import theme from '$stores/theme';

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

	export let data: PageData;
	const { metadata, post: Post } = data;
	let headingElems;
	let arr;
	onMount(() => {
		let headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
		let obj = {};
		// let arr;
		let currentHeading: Heading = {};
		let currentLevel = 1;

		headings.forEach((heading, index) => {
			let level = parseInt(heading.tagName.slice(1));

			if (level <= currentLevel) {
				currentLevel = level;
				currentHeading = {
					headingProps: {
						tagName: heading.tagName,
						id: heading.id,
						text: heading.textContent,
						href: heading.querySelector('a') ? heading.querySelector('a').href : null,
					},
					children: {},
				};

				obj[index] = currentHeading;
			} else if (currentHeading && level === currentLevel + 1) {
				currentHeading.children[index] = {
					headingProps: {
						tagName: heading.tagName,
						text: heading.textContent,
						id: heading.id,
						href: heading.querySelector('a') ? heading.querySelector('a').href : null,
					},
					children: {},
				};
			} else if (currentHeading && level > currentLevel + 1) {
				let parent = Object.values(currentHeading.children).slice(-1)[0];
				if (!parent) {
					parent = currentHeading;
				}
				parent.children[index] = {
					headingProps: {
						tagName: heading.tagName,
						id: heading.id,
						text: heading.textContent,
						href: heading.querySelector('a') ? heading.querySelector('a').href : null,
					},
					children: {},
				};
			}
		});

		arr = Object.entries(obj);
		console.log(arr);
	});
	// onMount(() => {
	// 	document.querySelectorAll('.shiki').forEach(el => {
	// 		if (currentThemeMode === 'light') el.classList.add('shiki-light');
	// 		else if (currentThemeMode === 'dark') el.classList.add('shiki-dark');
	// 	});
</script>

<article>
	<!-- <TableOfContents type="static"></TableOfContents> -->
	<TableOfContents></TableOfContents>
	<div
		class={`shiki-${currentThemeMode} prose py-2 px-2 max-w-none prose-p:text-neutral-content prose-p:text-lg prose-headings:font-bold`}
	>
		<Post />
	</div>
</article>

<!-- <div class="root max-w-5xl mx-auto lg:max-w-none">
	<div class="w-full mx-auto overflow-x-hidden">
		<div class="prose">
			<article>
				<Post />
			</article>
		</div>
		<div class="hidden xl:block pt-10">
			<aside
				class="sticky hidden w-48 ml-8 xl:block top-8"
				aria-label="Table of Contents"
			></aside>
			<p>Text</p>
		</div>
	</div>
</div>
-->
<style>
	/* :global(h1[id] a) {
		position: relative;
		color: red;
	} */
	:global(.prose :where(a)) {
		/* content: ''; */
		width: 1.4em;
		height: 1em;
		background: url("data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20style='width:24px;height:24px'%20viewBox='0%200%2024%2024'%3e%3cstyle%3e%20path%20{%20stroke:%20%23333;%20fill:%20none;%20}%20@media%20(prefers-color-scheme:%20dark)%20{%20path%20{%20stroke:%20%23ccc;%20}%20}%20%3c/style%3e%3cpath%20d='M9,7L6,7A2%202%200%200%200%206,17L9,17'/%3e%3cpath%20d='M15,7L18,7A2%202%200%200%201%2018,17L15,17'/%3e%3cpath%20d='M7,12L17,12'/%3e%3c/svg%3e")
			0/1em 1em no-repeat;
		position: absolute;
		display: block;
		left: -1.3em;
		/* top: 0.2em; */
		bottom: 0.5em;
		/* top: 0; */
		line-height: 1;
		opacity: 0;
		/* text-decoration: underline; */
		/* padding-left: 10px; */
		/* padding-right: 30px */
	}
	/* :global(hover .icon-link::before) {
		opacity: 1;
	} */

	/* :global(.prose h1 a),
  	:global(.prose h2 a),
  	:global(.prose h3 a),
  	:global(.prose h4 a),
  	:global(.prose h5 a),
  	:global(.prose h6 a) {
    	padding-left: 30px;
  	} */
	/* &:hover .icon-link::before {
		 	opacity: 1;
		 } */
	/* 
	.shiki-dark.shiki span {
		color: var(--shiki-dark) !important;
		background-color: var(--shiki-dark-bg) !important;
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}
	.shiki-light.shiki span {
		color: var(--shiki-light) !important;
		background-color: var(--shiki-light-bg) !important;
		font-style: var(--shiki-light-font-style) !important;
		font-weight: var(--shiki-light-font-weight) !important;
		text-decoration: var(--shiki-light-text-decoration) !important;
	} */
</style>
