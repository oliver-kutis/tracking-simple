<script lang="ts">
	import { langConfigs } from '$lib/config';
	import type { Post, Language } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { socials } from '$lib/config';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { page } from '$app/stores';
	import { dataLayerPush } from '$lib';

	export let data: PageData;

	const { posts } = data;
	let lastPost: Post;

	let lang: Language = data.lang;
	let title = langConfigs[lang].title;
	let description = langConfigs[lang].description;
	let h1 =
		lang === 'en'
			? 'Web analytics, tagging & marketing measurement blog'
			: 'Webová analytika, tagging a marketingová analýza';
	let latestBlogPost = lang === 'en' ? 'Latest blog post' : 'Najnovší článok';

	onMount(() => {
		lastPost = posts.slice(0, 1)[0];
		// console.log(lastThreePosts);
	});

	$: console.log($page);
</script>

<!-- <div
	class="container mx-auto my-auto max-w-[1200px] h-full"
	style="background: url('/src/lib/img/bg-clouds.jpg') no-repeat center center fixed; background-size: cover;"
> -->
<svelte:head>
	<title>{langConfigs[lang].title}</title>
	<meta name="description" content={langConfigs[lang].description} />
</svelte:head>
<div class="mt-4 justify-center mx">
	<h1 class="text-3xl md:text-4xl text-base-content font-semibold text-center sm:px-5">
		{h1}
	</h1>
	{#if lastPost}
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
				<p class="pb-6 text-base-content font-semibold">{latestBlogPost}</p>
				<a
					href={lastPost.slug}
					class="text-lg sm:text-2xl font-bold text-primary hover:text-accent transition-colors"
					on:click={() => dataLayerPush('latest_post_click')}>{lastPost.title}</a
				>
				<p class="mt-2">{lastPost.summary}</p>
				<div class="mt-4">
					<a href={lastPost.slug} class="text-primary hover:text-accent transition-colors"
						>Read more</a
					>
				</div>
			</div>
			<span class="divider sm:divider-horizontal my-2 mx-0 sm:mx-2"></span>
			<div class="text-lg flex flex-col gap-y-3 justify-center my-2 h-1/3 sm:w-1/3">
				<div class="">
					<span
						>Get to know <a
							class="text-primary text-xl hover:text-accent"
							href="/about"
						>
							me</a
						></span
					>
				</div>
				<div class="">
					<span
						>For updates, subscribe to <a
							class="text-primary text-xl hover:text-accent"
							href="{$page.url.origin}/rss.xml?lang={lang}">RSS feed</a
						>
					</span>
				</div>
				<div class="">
					<span
						>Contact me on <a
							class="text-primary text-xl hover:text-accent"
							href={socials.linkedin}>LinkedIn</a
						>
						or by
						<a class="text-primary text-xl hover:text-accent" href={socials.email}
							>Email</a
						>
					</span>
				</div>
			</div>
		</div>
	{/if}
</div>
