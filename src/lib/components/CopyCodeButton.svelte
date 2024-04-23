<script lang="ts">
	import CheckIcon from './svg/CheckIcon.svelte';
	import CopyIcon from './svg/CopyIcon.svelte';
	import themeStore from '$stores/theme';
	import { isNordOrValentine } from '$lib';

	let copyButton: HTMLButtonElement;
	let showCheckmark = false;

	function handleClick() {
		const preTagSibling = copyButton.nextElementSibling as HTMLPreElement;

		navigator.clipboard.writeText(preTagSibling.innerText);

		showCheckmark = true;

		setTimeout(() => (showCheckmark = false), 2000);
	}
</script>

<button
	bind:this={copyButton}
	on:click={handleClick}
	class={`p-1 absolute top-2 right-2 rounded-md
    shadow-md
    ${showCheckmark ? ' bg-primary' : 'bg-neutral hover:bg-primary'}`}
>
	{#if showCheckmark}
		<CheckIcon class="w-6 h-6 fill-neutral" />
	{:else}
		<CopyIcon class={'w-6 h-6 fill-primary hover:fill-neutral'} />
	{/if}
</button>
