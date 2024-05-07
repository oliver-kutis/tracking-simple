<script lang="ts">
	import Logo from './Logo.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { langConfigs } from '$lib/config';
	import { themes } from '$lib/themes';
	import themeStore from '$stores/theme';
	import toggleNavSettings from '$stores/toggleNavSettings';
	import { getContext } from 'svelte';
	import { getThemeType } from '$lib';
	import Settings from '$lib/components/Settings.svelte';
	import type { Language } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import Toggle from './Toggle.svelte';

	// let $toggleNavSettings.nav = false;
	export let lang: Language = 'en';
	export let bodyScrollY = 0;

	let mainClientWidth: Writable<Number> = getContext('mainClientWidth');
	// $: console.log($mainClientWidth);

	let headerElement: HTMLHeadElement;

	$: themeType = getThemeType($themeStore);
	$: console.log(themeType);

	$: classesOnScroll = {
		add: [
			'bg-base-100/85',
			'rounded-badge',
			'shadow-3xl',
			'top-2',
			'border',
			// themeType === 'dark' ? 'border-neutral',
			'border-primary/90',
			// 'sm:border-neutral',
			themeType === 'dark' ? 'sm:border-neutral-content/20' : 'sm:border-primary/75',
		],
		remove: ['border-b', 'border-neutral', 'top-0'],
	};
	$: {
		if (headerElement) {
			if (bodyScrollY > 0.001) {
				classesOnScroll.add.forEach(className => {
					if (!headerElement.classList.contains(className)) {
						headerElement.classList.add(className);
					}
				});
				classesOnScroll.remove.forEach(className => {
					if (headerElement.classList.contains(className)) {
						if (className !== 'rounded-badge') {
							headerElement.classList.remove(className);
						}
					}
				});
				// headerElement.classList.add(classesOnScroll);
			} else {
				classesOnScroll.add.forEach(className => headerElement.classList.remove(className));
				classesOnScroll.remove.forEach(className => headerElement.classList.add(className));
				// headerElement.classList.remove(classesOnScroll);
			}
		}
	}

	const navMenu = [
		{
			title: {
				en: 'Home',
				sk: 'Domov',
			},
			link: '/',
		},
		{
			title: {
				en: 'Blog',
				sk: 'Blog',
			},
			link: '/blog',
		},
		{
			title: {
				en: 'About',
				sk: 'O mne',
			},
			link: '/about',
		},
	];

	$toggleNavSettings = {
		nav: false,
		theme: false,
	};
</script>

<!-- <div class="h-full items-center"> -->
<!-- <div class="bg-info bg-opacity-10 h-full items-center"> -->
<!-- <div class="bg-clouds bg-repeat-space bg-cover bg-fixed bg-opacity-10 h-full items-center"> -->
<!-- max-w-[94%] sm:max-w-[88%]  -->
<header
	class="
		 sticky top-0 bg-base-100 flex border-b border-neutral backdrop-blur-sm
		 items-center justify-between px-3 sm:px-6 py-2
		 mx-auto sm:mb-2 gap-8 md:gap-16
		"
	style:width={Number($mainClientWidth) + 0 + 'px'}
	bind:this={headerElement}
>
	<!-- <header
	class="container fixed left-0 right-0 top-0 bg-base-100 flex border-b border-neutral items-center justify-between w-full max-w-4xl px-4 py-2 mx-auto lg:mb-8 gap-16"
> -->
	<!-- <a class="text-lg font-bold sm:text-2xl dark:text-indigo-500 text-indigo-700" href="/"> -->
	<a
		class="text-lg font-bold sm:text-2xl text-primary font lowercase"
		href={lang === 'sk' ? '/sk' : '/'}
	>
		{langConfigs[lang].name}
	</a>

	<div class="flex justify-around gap-2 sm:gap-4 items-center">
		<div
			class="md:flex hidden justify-center p-1 relative md:w-auto md:-space-x-px overflow-hidden md:rounded-xl"
		>
			<nav aria-label="Global">
				<ul class="flex items-center gap-4 text-sm">
					{#each navMenu as item}
						<li>
							<a
								href={lang === 'sk'
									? `/sk${item.link === '/' ? '' : item.link}`
									: item.link}
								class={`${[(item.link, '/sk' + item.link.slice(1))].includes($page.url.pathname) ? 'border-2 border-primary text-primary' : 'bg-transparent'} inline-block px-4 py-2 text-sm rounded-full font-medium hover:text-accent hover:border-accent focus:relative`}
							>
								{item.title[lang]}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
		<!-- <div class="nav-settings dropdown flex mr-2 gap-2"> -->
		<Toggle lang={lang}></Toggle>
		<div class="nav-settings dropdown flex mr-2 md:hidden gap-4">
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
						class="nav-settings inline-block h-6 w-6 stroke-current hover:stroke-accent"
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
				class={`${$toggleNavSettings.nav ? 'block' : 'hidden'} w-40 absolute right-1 z-50 top-10 py-2 mt-2 mr-2 rounded-xl shadow-xl bg-primary bg-opacity-100`}
			>
				{#each navMenu as item}
					<li class="mb-1">
						<a
							on:blur={() => {
								$toggleNavSettings.nav = false;
							}}
							href={lang === 'sk'
								? `/sk${item.link === '/' ? '' : item.link}`
								: item.link}
							class={`${item.link === $page.url.pathname ? 'text-base font-semibold' : 'text-sm'} 
							inline-block px-4 py-2 rounded-sm font-semibold text-neutral w-full
							hover:bg-neutral hover:text-primary hover:text-base focus:relative
							
							`}
						>
							{item.title[lang]}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<!-- Theme settings -->
		<Settings lang={lang} />
	</div>
</header>

<style>
	header {
		z-index: 1;
		/* add transition */
		transition: all 0.3s ease-in-out;
	}
</style>
