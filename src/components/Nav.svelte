<script>
	import Logo from '../components/Logo.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { themes } from '$lib/themes';
	import themeStore from '../stores/theme';
	import toggleThemeSettings from '../stores/toggleThemeSetts';
	import { writable } from 'svelte/store';

	let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true;
	let toggleMenu = false;

	const navMenu = [
		{
			title: 'Home',
			link: '/',
		},
		{
			title: 'About',
			link: '/about',
		},
	];

	function disableTransitionsTemporarily() {
		document.documentElement.classList.add('[&_*]:!transition-none');
		window.setTimeout(() => {
			document.documentElement.classList.remove('[&_*]:!transition-none');
		}, 0);
	}
</script>

<!-- <div class="h-full items-center"> -->
<!-- <div class="bg-info bg-opacity-10 h-full items-center"> -->
<!-- <div class="bg-clouds bg-repeat-space bg-cover bg-fixed bg-opacity-10 h-full items-center"> -->

<header class="flex items-center justify-between w-full py-4 mx-auto lg:pb-8 gap-16">
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
		<div class="dropdown flex mr-2 sm:hidden gap-2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<button
				on:click={() => {
					toggleMenu = !toggleMenu;
				}}
				class="bg-transparent"
			>
				{#if toggleMenu}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-6 w-6 stroke-current"
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
						class="inline-block h-6 w-6 stroke-current"
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
				class={`${toggleMenu ? 'block' : 'hidden'} w-52  absolute right-8 z-50 top-16  py-2 mt-2 mr-10 rounded-lg shadow-xl bg-primary light:bg-white`}
			>
				{#each navMenu as item}
					<li class="mb-2">
						<a
							on:blur={() => {
								toggleMenu = false;
							}}
							href={item.link}
							class="inline-block px-4 py-2 text-sm rounded font-medium text-zinc-900 dark:text-zinc-50 w-full hover:bg-indigo-800 hover:text-white focus:relative"
						>
							{item.title}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="mailto:jranand.py@gmail.com"
						class="inline-block px-4 py-2 text-sm rounded w-full border-indigo-500 font-medium text-zinc-900 dark:text-zinc-50 hover:bg-indigo-800 hover:text-white focus:relative"
						>Say Hello</a
					>
				</li>
			</ul>
		</div>
		<div class="theme-settings dropdown flex mr-2 gap-2">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<button
				on:click={() => {
					$toggleThemeSettings = !$toggleThemeSettings;
				}}
				class="bg-transparent"
			>
				{#if $toggleThemeSettings}
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
				class={`${$toggleThemeSettings ? 'block' : 'hidden'} w-52  absolute right-8 z-50 top-16  py-2 mt-2 mr-10 rounded-lg shadow-xl bg-primary light:bg-white`}
			>
				{#each themes as { theme } (theme)}
					<li class="mb-2">
						<button
							on:click={() => {
								$themeStore = theme;
								$toggleThemeSettings = false;
							}}
							class="inline-block px-4 py-2 text-sm text-left rounded w-full border-indigo-500 font-medium text-neutral hover:bg-neutral hover:text-primary focus:relative"
						>
							{theme}
						</button>
						<!-- <button
							on:click={() => {
								$themeStore = theme;
								toggleMenu = false;
							}}
							class="inline-block px-4 py-2 text-sm text-left rounded w-full border-indigo-500 font-medium text-zinc-900 dark:text-zinc-50 hover:bg-indigo-800 hover:text-white focus:relative"
						>
							{theme}
						</button> -->
						<!-- <a
							on:blur={() => {
								toggleMenu = false;
							}}
							href={item.link}
							class="inline-block px-4 py-2 text-sm rounded font-medium text-zinc-900 dark:text-zinc-50 w-full hover:bg-indigo-800 hover:text-white focus:relative"
						>
							{item.title}
						</a> -->
					</li>
				{/each}
			</ul>
		</div>
		<button
			type="button"
			role="switch"
			aria-label="Toggle Dark Mode"
			aria-checked={isDarkMode}
			class="w-5 h-5 sm:h-8 sm:w-8 sm:p-1"
			on:click={() => {
				isDarkMode = !isDarkMode;
				localStorage.setItem('isDarkMode', isDarkMode.toString());

				disableTransitionsTemporarily();

				if (isDarkMode) {
					document.querySelector('html')?.classList.add('dark');
				} else {
					document.querySelector('html')?.classList.remove('dark');
				}
			}}
		>
			<!-- <MoonIcon class="hidden text-zinc-500 dark:block" />
			<SunIcon class="block text-zinc-400 dark:hidden" /> -->
		</button>
	</div>
</header>
