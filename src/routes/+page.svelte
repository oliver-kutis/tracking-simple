<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	// import { onMount } from 'svelte';
	// import { fly, slide } from 'svelte/transition';
	// import { backOut } from 'svelte/easing';
	// import Service from '$components/Service.svelte';
	import { langConfigs } from '$lib/info';
	import Bio from '$lib/components/Bio.svelte';

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
	<ul class="grid grid-cols-1 auto-rows-fr gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
		<Card
			mainHeading="Web analyst"
			subHeadings={['Skills', 'Platforms', 'Languages']}
			subParagraphs={[
				'Tag management (GTM, sGTM), Web analytics (GA, GA4), Marketing analytics',
				'Google Ads, Meta Pixel, Sklik & Zbozi.cz, LinkedIn, Twitter, TikTok, Heureka, Biano, Glami, Criteo, ...',
				'JavaScript, Python, SQL',
			]}
		></Card>
		<Card
			mainHeading="Other Skills"
			subHeadings={['Google Cloud Platform', 'Data analytics', 'Other']}
			subParagraphs={[
				'Dataform, Cloud Functions, Workflows',
				'Bigquery, Keboola, Adverity, Looker Studio',
				'Marketing Mix Modeling (MMM), Causal Impact, GeoLift',
			]}
		></Card>

		<Card
			mainHeading="Experience"
			subHeadings={['Years', 'Areas', 'Clients']}
			subParagraphs={[
				'2+ years',
				'Ecommerce, B2B',
				'eyerim.sk, krmimkvalitne.cz, svetpeceni.cz',
			]}
		></Card>
	</ul>
</section>
