<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import Service from '$components/Service.svelte';

	let categories: string[] = ['Web tracking', 'Tag management', 'Marketing analytics'];
	let currentCategoryIndex = 0;
	let showText: boolean = false;

	onMount(() => {
		showText = true;
		const interval = setInterval(() => {
			currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
			// clearTimeout(timer);
		}, 5000);
	});
</script>

<!-- <div class="absolute top-0 max-w-[1200px] w-[1200px] mx-auto"> -->
<main class="m-0 p-0 mx-auto my-auto absolute inset-x-0 inset-y-0">
	<section
		id="intro"
		class="flex flex-col relative w-full h-screen text-left items-center mx-auto justify-center"
	>
		{#if showText}
			<div
				class="absolute w-full max-w-[1000px] flex flex-col justify-center"
				transition:fly={{
					delay: 1000,
					duration: 1000,
					x: -100,
					// easing: backOut,
					// axis: 'x',
				}}
			>
				<div class="flex-1 text-left pr-2 ml-5 md:ml-10 lg:ml-20">
					<h1 class="font-bold text-3xl md:text-5xl xl:text-6xl text-warning italic">
						Place for those Interested in
					</h1>
				</div>
				<div class="flex-1 text-right pl-2 mr-5 md:mr-10 lg:mr-20">
					{#each categories as category, index (category)}
						{#if index === currentCategoryIndex}
							<h1
								class="font-bold text-3xl md:text-5xl xl:text-6xl text-warning italic"
								in:fly={{
									delay: 200,
									duration: 1000,
									x: -100,
									y: 0,
								}}
							>
								{category}
							</h1>
						{/if}
					{/each}
				</div>
				<!-- <div class="gap-2 text-3xl text-white"> -->
				<!-- </div> -->
			</div>
			<a
				class="absolute bottom-0 text-xl text-center text-nowrap mb-10 text-white hover:text-warning"
				href="#topics"
			>
				See more
			</a>
		{/if}
	</section>
	<section id="topics mx-auto">
		<h3 class="text-3xl my-4">What I can do</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<Service />
			<Service />
			<Service />
		</div>
	</section>
</main>
