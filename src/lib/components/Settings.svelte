<script lang="ts">
	import toggleNavSettings from '$stores/toggleNavSettings';
	import CloseCross from '$lib/components/svg/CloseCross.svelte';
	import SettingsWheel from '$lib/components/svg/SettingsWheel.svelte';
	import ThemeSettings from './ThemeSettings.svelte';
	import FontSettings from './FontSettings.svelte';
	// import { themes } from '$lib/themes';
	// import themeStore from '$stores/theme';
	// import { getThemeType } from '$lib';

	export let lang;

	console.log($toggleNavSettings);
	// $: themeType = getThemeType($themeStore);
	// const darkThemes = themes.filter(theme => theme.meta.mode === 'dark');
	// const lightThemes = themes.filter(theme => theme.meta.mode === 'light');
</script>

<div class="settings dropdown flex mr-2 gap-2">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<button
		on:click={() => {
			$toggleNavSettings.theme = !$toggleNavSettings.theme;
			$toggleNavSettings.nav = false;
		}}
		class="bg-transparent"
	>
		{#if $toggleNavSettings.theme}
			<CloseCross></CloseCross>
		{:else}
			<SettingsWheel></SettingsWheel>
		{/if}
	</button>
	<ul
		class={`${$toggleNavSettings.theme ? 'block' : 'hidden'} w-52 absolute right-1 z-50 top-10 mt-2 mr-2 rounded-xl shadow-xl bg-primary bg-opacity-100`}
	>
		<ThemeSettings lang={lang} />
		<FontSettings lang={lang} />
	</ul>
</div>
