<script lang="ts">
	import { isNordOrValentine } from '$lib';
	import Moon from '$lib/components/svg/Moon.svelte';
	import Sun from '$lib/components/svg/Sun.svelte';
	import type { Theme } from '$lib/types';
	import themeStore from '$stores/theme';

	export let lang: string;
	export let themeType: string;
	export let themeMode: string;
	export let themes: Theme[];
	export let selectHandler: (e: Event) => void;

	$: isNordOrValentineResult = isNordOrValentine($themeStore);
</script>

<div
	class="
                flex flex-row justify-start items-center
                text-neutral text-base font-semibold
                m-2 gap-2
            "
>
	{#if themeMode === 'dark'}
		<Moon
			class={`
			w-4 h-4 rounded-full
			${isNordOrValentineResult ? 'fill-base-content' : 'fill-neutral'}
		`}
		></Moon>
	{:else}
		<Sun
			class={`
			w-4 h-4 rounded-full
			${isNordOrValentineResult ? 'fill-base-content' : 'fill-neutral'}
		`}
		></Sun>
	{/if}
	<!-- class="
				cursor-pointer
				w-32
				shadow-md
				text-neutral text-sm text-left font-semibold
				bg-primary rounded-badge px-2
				border border-neutral border-opacity-25
				hover:bg-primary hover:border-neutral hover:border-opacity-100 hover:shadow-lg
				hover:text-base-100
				outline-primary/50
		" -->
	<select
		id={themeMode === 'dark' ? 'themedark' : 'themelight'}
		class={`
			px-2
			w-32 cursor-pointer 
			text-sm text-left font-semibold  
			border border-opacity-25 hover:border-opacity-100
			rounded-badge shadow-md
			outline-primary/50
			hover:shadow-lg
			${
				isNordOrValentineResult
					? `
						text-base-content 
						bg-neutral-content/50 hover:bg-neutral-content/100
						border-base-content 
					`
					: `
						text-neutral hover:text-base-100 
						bg-primary hover:bg-primary 
						border-neutral 
					`
			}
		`}
		on:change={selectHandler}
	>
		{#if themeType !== themeMode}
			<option value="" disabled selected>{lang === 'en' ? 'Pick one' : 'Vyber'}</option>
		{:else}
			<option value="" disabled>{lang === 'en' ? 'Pick one' : 'Vyber'}</option>
		{/if}
		{#each themes as { theme } (theme)}
			{#if theme === $themeStore}
				<option value={theme} selected>{theme}</option>
			{:else}
				<option value={theme}>{theme}</option>
			{/if}
		{/each}
	</select>
</div>
