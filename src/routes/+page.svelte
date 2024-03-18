<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let categories: string[] = [
		'Web tracking',
		'Tag management',
		'Data quality',
		'Marketing analytics',
	];
	let currentCategoryIndex = 0;
	let showText: boolean = false;

	onMount(() => {
		showText = true;
		const interval = setInterval(() => {
			currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
			// clearTimeout(timer);
		}, 3000);
	});
</script>

<!-- <div class="absolute top-0 max-w-[1200px] w-[1200px] mx-auto"> -->
<main class="h-screen m-0 p-0 mx-auto my-auto top-1/2">
	<section
		id="intro"
		class="relative w-full h-screen text-left items-center mx-auto justify-between"
	>
		{#if showText}
			<div
				class="w-full absolute flex flex-col top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 p-2 m-2 justify-items-start"
				transition:fly={{
					delay: 1000,
					duration: 1000,
					x: -100,
					easing: backOut,
					// axis: 'x',
				}}
			>
				<h1 class="font-bold text-left text-5xl text-white justify-between ml-20">
					Blog for those Interested in
				</h1>
				{#each categories as category, index (category)}
					{#if index === currentCategoryIndex}
						<h1
							class="font-bold text-right text-5xl text-white justify-between mr-60 my-2 italic"
							in:fly={{
								delay: 200,
								duration: 1000,
								x: -100,
								y: 0,
								// easing: backOut,
								// axis: 'x',
							}}
						>
							{category}
						</h1>
					{/if}
				{/each}
				<!-- <div class="gap-2 text-3xl text-white"> -->
				<!-- </div> -->
			</div>
			<a class="absolute bottom-1/4 left-1/2" href="#topics"> See more </a>
		{/if}
	</section>
	<section id="topics"></section>
</main>
<!-- </div> -->
