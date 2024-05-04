<script lang="ts">
	import '../app.css';
	import themeStore from '$stores/theme';
	import { themes } from '$lib/themes';
	import Nav from '../lib/components/Nav.svelte';
	import toggleNavSettings from '$stores/toggleNavSettings';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

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
			if (currentTheme) {
				// delete the previous theme
				const classList = Array.from(document.documentElement.classList);
				const themeToRemove = classList.find((className: string) =>
					className.startsWith('code-theme-'),
				);
				document.documentElement.classList.remove(themeToRemove);
				document.documentElement.classList.add(
					`code-theme-${currentTheme.meta.shikiTheme}`,
				);
			}
		}
	}
</script>

<!-- <div class="h-full items-center"> -->
<!-- <div class="bg-info bg-opacity-10 h-full items-center"> -->
<!-- <div class="bg-clouds bg-repeat-space bg-cover bg-fixed bg-opacity-10 h-full items-center"> -->
<svelte:body
	on:scroll={e => {
		scrollY = e.target.scrollTop / e.target.scrollHeight;
	}}
	data-theme={$themeStore}
	on:click={event => {
		if (event.target instanceof Element) {
			if (
				event.target?.closest('.theme-settings') != null ||
				event.target.classList.contains('theme-settings') ||
				event.target?.closest('.nav-settings') != null ||
				event.target.classList.contains('theme-settings')
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
<Nav bind:bodyScrollY={scrollY}></Nav>
<div class="flex w-full h-full">
	<!-- <div class="container inset-0 max-h-full py-5 px-10 rounded max-w-screen-xlg mx-auto"> -->
	<div class="container items-center inset-0 max-h-full py-5 px-5 rounded max-w-4xl mx-auto">
		<!-- <Nav></Nav> -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<main
			bind:clientWidth={$mainClientWidth}
			class="flex mt-5 flex-col flex-grow w-full mx-auto"
		>
			<slot />
		</main>
	</div>

	<!-- <div class="flex flex-col container mx-auto max-w-[1200px] h-full">
		<header
			on:scroll={e => {
				console.log(e);
			}}
			class="fixed z-10 inset-x-0 px-2 py-6 rounded-xl max-w-[800px] w-[90%] mx-auto"
		>
			<nav class="flex items-center justify-between space-x-10 x-1 text-2xl">
				<a href="/">
					<Logo
						width="26"
						height="26"
						class="flex items-center gap-3 font-bold text-neutral-content "
					>
						<span>oliver kutis</span>
					</Logo>
					<div class="flex space-x-2 items-center">
						<a
							href="/about"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral">About</a
						>
						<a
							href="https://www.linkedin.com/in/oliver-kutiš-5248a1179/"
							target="_blank"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral"
						>
							<LinkedIn width="25" height="25" />
						</a>
						<a
							href=""
							target="_blank"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral"
						>
							<X width="23" height="23" />
						</a>
						<a
							href=""
							target="_blank"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral"
						>
							<Medium width="23" height="23" />
						</a>
					</div>
				</a>
			</nav>
		</header>
		<slot />
	</div> -->
</div>

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
