<script lang="ts">
	// import { onMount } from 'svelte';
	// import { fly, slide } from 'svelte/transition';
	// import { backOut } from 'svelte/easing';
	// import Service from '$components/Service.svelte';
	import { langConfigs } from '$lib/config';
	import Bio from '$lib/components/Bio.svelte';
	import themeStore from '$stores/theme';
	import { getThemeType } from '$lib';

	export let mainHeading: string;
	export let subHeadings: string[] = [];
	export let subParagraphs: string[] = [];

	const cardClasses = `bg-neutral bg-opacity-10 ${getThemeType($themeStore) === 'dark' ? 'border-neutral/30' : 'border-neutral/10'} border shadow-xl p-6 rounded-3xl`;
</script>

<li class={cardClasses}>
	<h2 class="flex text-lg font-semibold text-primary">
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="h-6 w-6 flex-none"
			><path
				d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
				class="fill-none stroke-primary"
			/><path
				d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
				class="stroke-primary"
			/></svg
		><span class="ml-3">{mainHeading}</span>
	</h2>
	{#each subHeadings as heading, index}
		<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">{heading}</h4>
		<p class="mb-5 text-base">
			{subParagraphs[index]}
		</p>
	{/each}
</li>
