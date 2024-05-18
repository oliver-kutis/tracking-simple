<script lang="ts">
	import ArrowDownUp from './svg/ArrowDownUp.svelte';
	import FilterIcon from './svg/FilterIcon.svelte';

	export let headerText;
	export let tags;
	export let selectedText;

	let expanded = false;
	let heading = headerText;
	let nTags = 0;
	$: {
		if (tags) {
			nTags = Object.keys(tags).filter(tag => tags[tag]).length;
		} else {
			nTags = 0;
		}

		heading = headerText + (nTags === 0 ? '' : ` (${selectedText}: ${nTags})`);
	}
</script>

<div
	class={`
		collapsible
		${expanded ? 'bg-neutral/25 w-full rounded-xl shadow-md border border-neutral/30 ' : 'w-56'}
		`}
>
	<h3 class="m-0">
		<button
			class={`
				m-0 p-2 flex flex-row justify-between items-center w-full 
				focus:outline-none
				${expanded ? '' : 'border border-neutral/30 bg-neutral/10 shadow-md rounded-xl'}
			`}
			aria-expanded={expanded}
			on:click={() => (expanded = !expanded)}
		>
			<div class="flex flex-row justify-start items-center gap-2">
				<FilterIcon></FilterIcon>{heading}
			</div>
			<ArrowDownUp direction={expanded ? 'up' : 'down'}></ArrowDownUp>
		</button>
	</h3>

	{#if expanded}
		<div class="contents" class:hidden={!expanded}>
			<slot />
		</div>
	{/if}
</div>

<style>
	.hidden {
		display: none !important;
	}
</style>
