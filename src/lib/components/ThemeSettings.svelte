<script lang="ts">
	import { themes } from '$lib/themes';
	import type { Language } from '$lib/types';
	import themeStore from '$stores/theme';
	import { getThemeType } from '$lib';
	import Moon from '$lib/components/svg/Moon.svelte';
	import Sun from '$lib/components/svg/Sun.svelte';

	export let lang: Language;

	$: themeType = getThemeType($themeStore);
	const darkThemes = themes.filter(theme => theme.meta.mode === 'dark');
	const lightThemes = themes.filter(theme => theme.meta.mode === 'light');

	function handleSelectChange(e: Event) {
		$themeStore = (e.target as HTMLSelectElement).value;
	}
</script>

<li>
	<div class="theme-settings flex items-center justify-center">
		<div
			class="
        flex flex-col p-2 pl-3 items-start justify-center mx-2 mt-2 mb-1 gap-0
        rounded-xl w-[98%] bg-neutral/25
        text-neutral text-base font-semibold
    "
		>
			<h1 class="inline-block mb-1 text-left font-bold text-base-100">
				{lang === 'en' ? 'Themes selection' : 'Vizuálny štýl'}
			</h1>
            <ThemeSelect lang={lang} />
			<div
				class="
                flex flex-row justify-start items-center
                text-neutral text-base font-semibold
                m-2 gap-2
            "
			>
				<Moon></Moon>
				<select
					id="themedark"
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
					on:change={handleSelectChange}
				>
					{#if themeType !== 'dark'}
						<option value="" disabled selected
							>{lang === 'en' ? 'Pick one' : 'Vyber'}</option
						>
					{:else}
						<option value="" disabled>{lang === 'en' ? 'Pick one' : 'Vyber'}</option>
					{/if}
					{#each darkThemes as { theme } (theme)}
						{#if theme === $themeStore}
							<option value={theme} selected>{theme}</option>
						{:else}
							<option value={theme}>{theme}</option>
						{/if}
					{/each}
					<!-- <option value="" disabled>Select a theme</option>
                    <option value="system">System</option>
                    <option value="auto">Auto</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option> -->
				</select>
			</div>
			<div
				class="
                    flex flex-row justify-start items-center
                    text-neutral text-base font-semibold
                    m-2 gap-2
                "
			>
				<Sun></Sun>
				<select
					id="themelight"
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
					on:change={handleSelectChange}
				>
					{#if themeType !== 'light'}
						<option value="" disabled selected
							>{lang === 'en' ? 'Pick one' : 'Vyber'}</option
						>
					{:else}
						<option value="" disabled>{lang === 'en' ? 'Pick one' : 'Vyber'}</option>
					{/if}
					{#each lightThemes as { theme, meta } (theme)}
						{#if theme === $themeStore}
							<option value={theme} selected>{theme}</option>
						{:else}
							<option value={theme}>{theme}</option>
						{/if}
					{/each}
				</select>
			</div>
		</div>
	</div>
</li>
