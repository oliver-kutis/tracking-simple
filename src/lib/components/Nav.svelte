<script>
	import Logo from './Logo.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { themes } from '$lib/themes';
	import themeStore from '../../stores/theme';
	import toggleNavSettings from '../../stores/toggleNavSettings';
	import elementInViewport from '../../actions/elementInViewport';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { isNordOrValentine } from '$lib';

	let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true;
	// let $toggleNavSettings.nav = false;

	const navMenu = [
		{
			title: 'Home',
			link: '/',
		},
		{
			title: 'Blog',
			link: '/blog',
		},
		{
			title: 'About',
			link: '/about',
		},
	];

	$toggleNavSettings = {
		nav: false,
		theme: false,
	};

	function disableTransitionsTemporarily() {
		document.documentElement.classList.add('[&_*]:!transition-none');
		window.setTimeout(() => {
			document.documentElement.classList.remove('[&_*]:!transition-none');
		}, 0);
	}

	const darkThemes = themes.filter(theme => theme.meta.mode === 'dark');
	const lightThemes = themes.filter(theme => theme.meta.mode === 'light');
</script>

<!-- <div class="h-full items-center"> -->
<!-- <div class="bg-info bg-opacity-10 h-full items-center"> -->
<!-- <div class="bg-clouds bg-repeat-space bg-cover bg-fixed bg-opacity-10 h-full items-center"> -->

<header
	class="flex border-b border-neutral items-center justify-between w-full px-4 py-2 mx-auto lg:mb-8 gap-16"
>
	<!-- <a class="text-lg font-bold sm:text-2xl dark:text-indigo-500 text-indigo-700" href="/"> -->
	<a class="text-lg font-bold sm:text-2xl text-primary font" href="/"> oliver kutis </a>

	<div class="flex justify-around gap-2 items-center">
		<div
			class="sm:flex hidden justify-center p-1 relative sm:w-auto sm:-space-x-px overflow-hidden sm:rounded-xl"
		>
			<nav aria-label="Global">
				<ul class="flex items-center gap-2 text-sm">
					{#each navMenu as item}
						<li>
							<a
								href={item.link}
								class={`${$page.url.pathname === item.link ? 'border-2 border-primary text-primary' : 'bg-transparent'} inline-block px-4 py-2 text-sm rounded-full font-medium hover:bg-primary hover:text-base-100 focus:relative`}
							>
								{item.title}
							</a>
						</li>
					{/each}
					<li>
						<a
							href="mailto:jranand.py@gmail.com"
							class="inline-block px-4 py-2 text-sm rounded-full font-medium hover:bg-secondary hover:text-base-100 focus:relative"
							>Say Hello</a
						>
					</li>
				</ul>
			</nav>
		</div>
		<!-- <div class="nav-settings dropdown flex mr-2 gap-2"> -->
		<div class="nav-settings dropdown flex mr-2 sm:hidden gap-2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<button
				on:click={() => {
					// console.log($toggleNavSettings.nav);
					$toggleNavSettings.nav = !$toggleNavSettings.nav;
					$toggleNavSettings.theme = false;
				}}
				class="bg-transparent"
			>
				{#if $toggleNavSettings.nav}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="nav-settings inline-block h-6 w-6 stroke-current"
					>
						<title>Close Dropdown</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="nav-settings inline-block h-6 w-6 stroke-current"
					>
						<title>Open Dropdown</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
			<ul
				class={`${$toggleNavSettings.nav ? 'block' : 'hidden'} w-52 absolute right-1 z-50 top-10 py-2 mt-2 mr-2 rounded-lg shadow-xl bg-primary bg-opacity-90`}
			>
				{#each navMenu as item}
					<li class="mb-2">
						<a
							on:blur={() => {
								$toggleNavSettings.nav = false;
							}}
							href={item.link}
							class={`${item.link === $page.url.pathname ? 'text-base font-semibold' : 'text-sm'} inline-block px-4 py-2  rounded-sm font-medium text-neutral w-full hover:bg-neutral hover:text-primary hover:text-base focus:relative`}
						>
							{item.title}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="mailto:jranand.py@gmail.com"
						class="inline-block px-4 py-2 text-sm rounded-sm w-full font-medium text-neutral hover:bg-neutral hover:text-primary hover:text-base focus:relative"
						>Say Hello</a
					>
				</li>
			</ul>
		</div>
		<div class="theme-settings dropdown flex mr-2 gap-2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<button
				on:click={() => {
					$toggleNavSettings.theme = !$toggleNavSettings.theme;
					$toggleNavSettings.nav = false;
				}}
				class="bg-transparent"
			>
				{#if $toggleNavSettings.theme}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="theme-settings inline-block h-6 w-6 stroke-current"
					>
						<title>Close Dropdown</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						width="24"
						height="24"
						aria-hidden="true"
						class="theme-settings"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
						></path><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						></path></svg
					>
				{/if}
			</button>
			<ul
				class={`${$toggleNavSettings.theme ? 'block' : 'hidden'} w-52 absolute right-1 z-50 top-10 py-2 mt-2 mr-2 rounded-lg shadow-xl bg-primary bg-opacity-90`}
			>
				<li>
					<p class="pl-3 py-1 text-neutral font-bold">🌛 Dark themes</p>
					{#each darkThemes as { theme, meta } (theme)}
						<ul>
							<li class="mb-2">
								<button
									on:click={() => {
										$themeStore = theme;
										$toggleNavSettings.theme = false;
									}}
									class={`${theme === $themeStore ? 'text-base font-semibold' : 'text-sm'} ${isNordOrValentine($themeStore) ? 'text-base hover:bg-neutral hover:text-white' : 'text-neutral hover:bg-neutral hover:text-primary'} inline-block px-4 py-2 text-left rounded-sm w-full focus:relative`}
								>
									{theme}
								</button>
							</li>
						</ul>
					{/each}
				</li>
				<li>
					<p class="pl-3 py-1 text-neutral font-bold">☀️ Light themes</p>
					{#each lightThemes as { theme, meta } (theme)}
						<ul>
							<li class="mb-2">
								<button
									on:click={() => {
										$themeStore = theme;
										$toggleNavSettings.theme = false;
									}}
									class={`${theme === $themeStore ? 'text-base font-semibold' : 'text-sm'} ${isNordOrValentine($themeStore) ? 'text-base hover:bg-neutral hover:text-white' : 'text-neutral hover:bg-neutral hover:text-primary'} inline-block px-4 py-2 text-left rounded-sm w-full focus:relative`}
								>
									{theme}
								</button>
							</li>
						</ul>
					{/each}
				</li>
				<!-- <li class="mb-2">
							<button
								on:click={() => {
									$themeStore = theme;
									$toggleNavSettings.theme = false;
								}}
								class={`${theme === $themeStore ? 'text-base font-semibold' : 'text-sm'} ${isNordOrValentine($themeStore) ? 'text-base hover:bg-neutral hover:text-white' : 'text-neutral hover:bg-neutral hover:text-primary'} inline-block px-4 py-2 text-left rounded-sm w-full focus:relative`}
							>
								{`${meta.mode === 'dark' ? '🌚' : '☀️'} ${theme}`}
							</button>
						</li> -->
			</ul>
			<!-- <ul
				class={`${$toggleNavSettings.theme ? 'block' : 'hidden'} w-52 absolute right-1 z-50 top-10 py-2 mt-2 mr-2 rounded-lg shadow-xl bg-primary bg-opacity-90`}
			>
				{#each themes as { theme, meta } (theme)}
					<li class="mb-2">
						<button
							on:click={() => {
								$themeStore = theme;
								$toggleNavSettings.theme = false;
							}}
							class={`${theme === $themeStore ? 'text-base font-semibold' : 'text-sm'} ${isNordOrValentine($themeStore) ? 'text-base hover:bg-neutral hover:text-white' : 'text-neutral hover:bg-neutral hover:text-primary'} inline-block px-4 py-2 text-left rounded-sm w-full focus:relative`}
						>
							{`${meta.mode === 'dark' ? '🌚' : '☀️'} ${theme}`}
						</button>
					</li>
				{/each}
			</ul> -->
		</div>
	</div>
</header>
