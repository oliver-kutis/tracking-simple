<script lang="ts">
	import Moon from '$lib/components/svg/Moon.svelte';
	import Sun from '$lib/components/svg/Sun.svelte';
	import type { Theme } from '$lib/types';
	import themeStore from '$stores/theme';

	export let lang: string;
	export let themeType: string;
	export let themeMode: string;
	export let themes: Theme[];
	export let selectHandler: (e: Event) => void;
</script>

<div
	class="
                flex flex-row justify-start items-center
                text-neutral text-base font-semibold
                m-2 gap-2
            "
>
	{#if themeMode === 'dark'}
		<Moon></Moon>
	{:else}
		<Sun></Sun>
	{/if}
	<select
		id={themeMode === 'dark' ? 'themedark' : 'themelight'}
		class="
                        cursor-pointer
                        w-32
                        shadow-md
                        text-neutral text-sm text-left font-semibold
                        bg-primary rounded-badge px-2
                        border border-neutral border-opacity-25
                        hover:bg-primary hover:border-neutral hover:border-opacity-100 hover:shadow-lg
                        hover:text-base-100
                        outline-primary/50
                    "
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
