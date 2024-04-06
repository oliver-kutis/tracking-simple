<script lang="ts">
	// import { onMount } from 'svelte';
	// import { fly, slide } from 'svelte/transition';
	// import { backOut } from 'svelte/easing';
	// import Service from '$components/Service.svelte';
	import { langConfigs } from '$lib/info';
	import Bio from '$components/Bio.svelte';

	// TODO: Make this dynamic
	let lang = 'en';

	// let categories: string[] = ['Web tracking', 'Tag management', 'Marketing analytics'];
	// let currentCategoryIndex = 0;
	// let showText: boolean = false;

	// onMount(() => {
	// 	showText = true;
	// 	const interval = setInterval(() => {
	// 		currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
	// 		// clearTimeout(timer);
	// 	}, 5000);
	// });
</script>

<!-- <div
	class="container mx-auto my-auto max-w-[1200px] h-full"
	style="background: url('/src/lib/img/bg-clouds.jpg') no-repeat center center fixed; background-size: cover;"
> -->
<svelte:head>
	<title>{langConfigs.en.title}</title>
	<meta name="description" content={langConfigs.en.description} />
</svelte:head>
<Bio lang={lang} />
<section class="w-full">
	<ul class="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 mb-12">
		<li class="rounded-2xl border-2 p-6 border-neutral">
			<h2 class="flex text-lg font-semibold text-base">
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
				><span class="ml-3">Web Analyst</span>
			</h2>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Skills</h4>
			<p class="mb-5 text-base">
				Tag management (GTM, sGTM), Web analytics (GA, GA4), Marketing analytics
			</p>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Platforms</h4>
			<p class="mb-5 text-base">
				Google Ads, Meta Pixel, Sklik & Zbozi.cz, LinkedIn, Twitter, TikTok, Heureka, Biano,
				Glami, Criteo, ...
			</p>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Languages</h4>
			<p class=" mb-5 text-base">JavaScript, Python, SQL</p>
		</li>
		<li class="rounded-2xl border-2 p-6 border-neutral">
			<h2 class="flex text-lg font-semibold text-base">
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
				><span class="ml-3">Other Skills</span>
			</h2>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Google Cloud Platform</h4>
			<p class="mb-5 text-base">Dataform, Cloud Functions, Workflows</p>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Data analytics</h4>
			<p class=" mb-5 text-base">Bigquery, Keboola, Adverity, Looker Studio</p>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Other</h4>
			<p class="mb-5 text-base">Marketing Mix Modeling (MMM), Causal Impact, GeoLift</p>
		</li>
		<li class="rounded-2xl border-2 p-6 border-neutral">
			<h2 class="flex text-lg font-semibold text-base">
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
					/>
				</svg><span class="ml-3">Experience</span>
				<!-- <svg
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
						class="stroke-zinc-400 dark:stroke-zinc-500"
					/>
					</svg
				><span class="ml-3">Experience</span> -->
			</h2>
			<p class="mt-5 mb-5 text-base">2+ years</p>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Areas</h4>
			<p class="mb-5 text-base">Ecommerce, B2B</p>
			<h4 class="text-sm mt-5 mb-2 font-semibold text-primary">Clients</h4>
			<p class="mb-5 text-base">eyerim.sk, krmimkvalitne.cz, svetpeceni.cz</p>
		</li>
	</ul>
</section>
<!-- <div class="container mx-auto my-auto max-w-[1240px] h-full flex flex-col py-20">
	<main
		class="flex flex-col m-0 p-0 container mx-auto my-auto inset-x-0 inset-y-0 items-center justify-center mt-10"
	>
		{#if showText}
			<div
				class="w-full max-w-[1000px] py-20"
				transition:fly={{
					delay: 1000,
					duration: 1000,
					x: -100,
					// easing: backOut,
					// axis: 'x',
				}}
			>
				<div class="flex-1 text-left pr-2 mx-auto">
					<h1
						class="font-bold text-3xl md:text-5xl xl:text-6xl text-primary italic lowercase"
					>
						Place for those Interested in
					</h1>
				</div>
				<div class="flex-1 text-right pl-2 mx-auto">
					{#each categories as category, index (category)}
						{#if index === currentCategoryIndex}
							<h1
								class="font-bold text-3xl md:text-5xl xl:text-6xl text-primary italic lowercase"
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
			</div>
		{/if}
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-stretch mx-auto w-full h-full p-4 lowercase text-primary"
		>
			<Service class="bg-neutral bg-opacity-30 rounded-3xl p-3">
				<h2
					slot="title"
					class="font-medium text-center text-xl md:text-2xl lg:text-4xl mt-0 mb-2"
				>
					Web analytics
				</h2>
				<p slot="content" class="p-3 text-lg md:text-xl lg:text-2xl text-neutral-content">
					From setup to enhancement, I can create complex analytics solutions using Google
					Analytics, Google Tag Manager, and custom tracking.
				</p>
			</Service>
			<Service class="bg-neutral bg-opacity-30 rounded-3xl p-3">
				<h2
					slot="title"
					class="font-medium text-center text-xl md:text-2xl lg:text-4xl mt-0 mb-2"
				>
					Tag management
				</h2>
				<p slot="content" class="p-3 text-lg md:text-xl lg:text-2xl text-neutral-content">
					I manage not only analytics tags but also marketing tags, pixels, and other
					third-party scripts. I can provide guidance on best practices and help you avoid
					common pitfalls.
				</p>
			</Service>
			<Service class="bg-neutral bg-opacity-30 rounded-3xl p-3">
				<h2
					slot="title"
					class="font-medium text-center text-xl md:text-2xl lg:text-4xl mt-0 mb-2"
				>
					Marketing analytics
				</h2>
				<p slot="content" class="p-3 text-lg md:text-xl lg:text-2xl text-neutral-content">
					From simple BI dashboard to causal inference models, I can help you understand
					your marketing data and guide you through the process of making data-driven
					decisions.
				</p>
			</Service>
		</div>
	</main>
</div> -->
