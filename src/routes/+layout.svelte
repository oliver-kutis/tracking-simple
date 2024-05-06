<script lang="ts">
	import '../app.css';
	import themeStore from '$stores/theme';
	import fontStore from '$stores/font';
	import { themes } from '$lib/themes';
	import Nav from '../lib/components/Nav.svelte';
	import toggleNavSettings from '$stores/toggleNavSettings';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { beforeNavigate } from '$app/navigation';
	import PageTransition from '$lib/components/PageTransition.svelte';

	export let data;

	beforeNavigate(() => {
		document.body.scrollTop = 0;
	});

	// For passing the scrollY value to the Nav component
	let scrollY = 0;

	// For passing width to the Nav component
	let mainElement: HTMLElement;
	let mainClientWidth = writable(0);
	$: $mainClientWidth = mainElement?.clientWidth;
	// $: console.log($mainClientWidth);
	$: setContext('mainClientWidth', mainClientWidth);

	$: {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', $themeStore);
			const currentTheme = themes.find(
				(theme: { theme: string }) => theme.theme === $themeStore,
			);
			const classList = Array.from(document.documentElement.classList);

			// theme switch
			if (currentTheme) {
				// delete the previous theme
				const themeToRemove: string | undefined = classList.find((className: string) =>
					className.startsWith('code-theme-'),
				);
				if (themeToRemove) {
					document.documentElement.classList.remove(themeToRemove);
					document.documentElement.classList.add(
						`code-theme-${currentTheme.meta.shikiTheme}`,
					);
				} else
					document.documentElement.classList.add(
						`code-theme-${currentTheme.meta.shikiTheme}`,
					);
				// add a new one
			}
			// font switch
			const fontToRemove = classList.find((className: string) =>
				className.startsWith('font-'),
			);
			if (fontToRemove) {
				document.documentElement.classList.remove(fontToRemove);
				document.documentElement.classList.add($fontStore);
			} else {
				document.documentElement.classList.add($fontStore);
			}
		}
	}

	function handleBodyScroll(e: Event) {
		scrollY = (e.target as HTMLElement).scrollTop / (e.target as HTMLElement).scrollHeight;
	}
</script>

<svelte:body
	on:scroll={handleBodyScroll}
	data-theme={$themeStore}
	on:click={event => {
		if (event.target instanceof Element) {
			if (
				event.target?.closest('.theme-settings') != null ||
				event.target.classList.contains('theme-settings') ||
				event.target?.closest('.nav-settings') != null ||
				event.target.classList.contains('theme-settings') ||
				event.target?.closest('.font-settings') != null ||
				event.target.classList.contains('font-settings')
			)
				return;

			if ($toggleNavSettings.theme === true) {
				$toggleNavSettings.theme = false;
				$toggleNavSettings.nav = false;
			}
			if ($toggleNavSettings.nav === true) {
				$toggleNavSettings.nav = false;
				$toggleNavSettings.theme = false;
			}
		}
	}}
/>
<Nav bind:bodyScrollY={scrollY} lang={data.lang}></Nav>
<PageTransition url={data.url}>
	<div class="flex w-full h-full">
		<div class="container items-center inset-0 max-h-full py-5 px-5 rounded max-w-4xl mx-auto">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<main
				bind:clientWidth={$mainClientWidth}
				class="flex mt-5 flex-col flex-grow w-full mx-auto"
			>
				<slot />
			</main>
		</div>
	</div>
</PageTransition>

<!-- <Footer></Footer> -->

<style>
	:global(blockquote > p):after {
		content: '' !important;
		/* display: block; */
	}
	:global(blockquote > p):before {
		content: '' !important;
		/* display: block; */
	}
</style>
