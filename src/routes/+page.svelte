<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';

	// import { onMount } from 'svelte';
	// import { fly, slide } from 'svelte/transition';
	// import { backOut } from 'svelte/easing';
	// import Service from '$components/Service.svelte';
	import { langConfigs } from '$lib/info';
	import Bio from '$lib/components/Bio.svelte';
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';

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
	export let data: Post;
	const { posts } = data;
	let lastPost: Post;

	console.log(data);
	onMount(() => {
		lastPost = posts.slice(0, 1)[0];
		// console.log(lastThreePosts);
	});
</script>

<!-- <div
	class="container mx-auto my-auto max-w-[1200px] h-full"
	style="background: url('/src/lib/img/bg-clouds.jpg') no-repeat center center fixed; background-size: cover;"
> -->
<svelte:head>
	<title>{langConfigs.en.title}</title>
	<meta name="description" content={langConfigs.en.description} />
</svelte:head>
<div class="mt-4 container justify-center mx-auto">
	<h1 class="text-3xl md:text-4xl text-base-content font-bold">
		Blog about web analytics, tracking and marketing measurement in general.
	</h1>
	<!-- <div class="grid gap-8 p-5 mt-20"> -->
	<!-- <div
		class="
			post py-10 px-2 overflow-hidden flex flex-col justify-between md:flex-row gap-4
		"
	> -->
	{#if lastPost}
		<!-- <BlogPostCard post={post} size="small" /> -->
		<div
			class="
					flex flex-col sm:flex-row
					gap-x-2 gap-y-2
					mt-8 p-4 sm:p-6
					w-full
					items-start sm:items-center justify-between
					bg-neutral bg-opacity-10 border border-neutral border-opacity-10 shadow-xl rounded-3xl
				"
		>
			<div
				class="
						flex flex-col justify-between
						my-2 h-2/3 sm:w-2/3
					"
			>
				<p class="pb-6 text-base-content font-semibold">Latest blog post</p>
				<a
					href={lastPost.slug}
					class="text-lg sm:text-2xl font-bold text-primary hover:text-accent transition-colors"
					>{lastPost.title}</a
				>
				<p class="mt-2">{lastPost.summary}</p>
				<div class="mt-4">
					<a href={lastPost.slug} class="text-primary hover:text-accent transition-colors"
						>Read more</a
					>
				</div>
				<!-- <div class="mt-4">
					<PostMeta type="date" post={lastPost} />
						<PostMeta type="tags" post={lastPost} />
					<span>Published on</span>
					<time datetime={lastPost.datePublished} class="text-sm"
						>{lastPost.datePublished}</time
					>
				</div> -->
			</div>
			<span class="divider sm:divider-horizontal my-2 mx-0 sm:mx-2"></span>
			<div class="text-lg flex flex-col gap-y-3 justify-center my-2 h-1/3 sm:w-1/3">
				<div class="">
					<span
						>Get to know <a class="text-primary text-xl hover:text-accent" href="/about"
							>me</a
						></span
					>
				</div>
				<div class="">
					<span
						>For updates, subscribe to <a
							class="text-primary text-xl hover:text-accent"
							href="">RSS feed</a
						>
					</span>
				</div>
				<div class="">
					<span
						>Contact me on <a class="text-primary text-xl hover:text-accent" href=""
							>LinkedIn</a
						>
						or by <a class="text-primary text-xl hover:text-accent" href="">Email</a>
					</span>
				</div>
			</div>
		</div>
	{/if}
</div>
<!-- <section class="w-full">
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
</section> -->
