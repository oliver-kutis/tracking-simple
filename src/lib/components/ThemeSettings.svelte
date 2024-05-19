<script lang="ts">
	import { themes } from '$lib/themes';
	import type { Language } from '$lib/types';
	import themeStore from '$stores/theme';
	import { getThemeType } from '$lib';
	import ThemeSelect from '$lib/components/ThemeSelect.svelte';
	import { isNordOrValentine } from '$lib';

	export let lang: Language;

	$: themeType = getThemeType($themeStore);
	const darkThemes = themes.filter(theme => theme.meta.mode === 'dark');
	const lightThemes = themes.filter(theme => theme.meta.mode === 'light');

	function handleSelectChange(e: Event) {
		$themeStore = (e.target as HTMLSelectElement).value;
	}

	$: isNordOrValentineResult = isNordOrValentine($themeStore);
</script>

<li>
	<div class="theme-settings flex items-center justify-center">
		<div
			class={`
        flex flex-col p-2 pl-3 items-start justify-center mx-2 mt-2 gap-0
        rounded-xl w-[98%] 
		${isNordOrValentineResult ? 'bg-neutral-content/25' : 'bg-neutral/25'}
        text-neutral text-base font-semibold
		`}
		>
			<h1
				class={`
				inline-block mb-1 text-left font-bold 
				${isNordOrValentineResult ? 'text-base-content' : 'text-base-100'}
			`}
			>
				{lang === 'en' ? 'Themes selection' : 'Vizuálny štýl'}
			</h1>
			<ThemeSelect
				lang={lang}
				selectHandler={handleSelectChange}
				themeMode="dark"
				themeType={themeType}
				themes={darkThemes}
			/>
			<ThemeSelect
				lang={lang}
				selectHandler={handleSelectChange}
				themeMode="light"
				themeType={themeType}
				themes={lightThemes}
			/>
		</div>
	</div>
</li>
