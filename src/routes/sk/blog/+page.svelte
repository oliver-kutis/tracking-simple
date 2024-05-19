<script lang="ts">
	import type { Post } from '$lib/types';
	import type { PageData } from '../$types';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import CollabsibleSection from '$lib/components/CollabsibleSection.svelte';
	import FilterIcon from '$lib/components/svg/FilterIcon.svelte';
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { isNordOrValentine } from '$lib';
	import themeStore from '$stores/theme';

	export let data: PageData;

	let posts: Post[] = data.posts;
	posts = posts.sort((a, b) => b.datePublished - a.datePublished);

	// get all the tags and put them in a set
	let tagsFilter: Writable<object> = writable({});
	posts.forEach(post => {
		post.tags.forEach(tag => ($tagsFilter[tag] = false));
	});

	let searchInput: Writable<string> = writable('');

	// create a function that will filter based on the search input
	// make it clever and not just use it as a whole string but as a list of words
	function filterPostsOnSearch(search: string) {
		if (search === '') {
			posts = data.posts;
			return;
		}
		posts = posts.filter(post => {
			const searchWords = search.split(' ');
			return searchWords.some(word => {
				return (
					post.title.toLowerCase().includes(word.toLowerCase()) ||
					post.summary.toLowerCase().includes(word.toLowerCase())
				);
			});
		});
	}

	function filterPostsOnTags(tag: string) {
		$tagsFilter[tag] = !$tagsFilter[tag];
		posts = posts.filter(post => {
			let isTrue = false;
			post.tags.forEach(tag => {
				isTrue = Array.from(Object.keys($tagsFilter)).some(keyTag => keyTag === tag);
			});
			return isTrue;
		});
	}

	function classesForTags(theme: string, tag: string): string {
		const isNordOrValentineResult = isNordOrValentine(theme);
		const defaultClasses = `px-2 py-1 rounded-xl focus:outline-none`;
		let inactiveClasses = `bg-base-300 text-base-content`;
		let activeClasses = `bg-primary text-base-100 font-semibold`;
		if (isNordOrValentineResult) {
			inactiveClasses = `bg-primary/25 text-base-content`;
			activeClasses = `bg-primary/75 text-base-content font-semibold`;
		}

		return `
			${defaultClasses}
			${$tagsFilter[tag] ? activeClasses : inactiveClasses}
		`;
	}

	let width: Writable<number> = writable(0);
	onMount(() => {
		width.set(window.innerWidth);
	});
</script>

<svelte:window on:resize={() => ($width = window.innerWidth)} />
<svelte:head>
	<title>My awesome blog posts</title>
</svelte:head>

<PageTitle>Blog</PageTitle>
<!-- <span class="divider w-[2%] my-0 before:bg-primary after:bg-primary rounded-full"></span> -->
<div class="flex flex-col gap-2 items-start justify-center mb-2 sm:mb-6 sm:mx-2">
	<input
		type="text"
		placeholder="Vyhľadať článok"
		class="w-56 p-2 border border-neutral/30 rounded-xl shadow-md bg-neutral/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary focus:bg-neutral/25"
		bind:value={$searchInput}
		on:input={() => filterPostsOnSearch($searchInput)}
	/>
	<div
		class="relative w-full flex flex-col items-start justify-between sm:flex-row sm:items-end gap-2"
	>
		<div class="flex flex-row items-center justify-between gap-1">
			{#if $width < 768}
				<CollabsibleSection headerText="Štítky" selectedText="vybrané" tags={$tagsFilter}>
					<div
						class="p-2 flex flex-wrap justify-start auto-cols-fr gap-x-2 gap-y-1 max-w-96"
						transition:slide={{ duration: 50, easing: cubicInOut }}
					>
						<!-- <div class="p-2 grid grid-cols-2 auto-cols-fr gap-x-2 gap-y-1"> -->
						{#each Object.keys($tagsFilter) as tag}
							<button
								class={classesForTags($themeStore, tag)}
								class:active={$tagsFilter[tag]}
								on:click={() => {
									filterPostsOnTags(tag);
								}}
							>
								{tag}
							</button>
						{/each}
					</div>
				</CollabsibleSection>
			{:else}
				<div
					class="flex items-center p-2 border border-neutral/30 rounded-xl shadow-md bg-neutral/10"
				>
					<div class="flex flex-row justify-start items-center gap-2 w-22">
						<FilterIcon></FilterIcon>
						<span class="mr-4">Štítky</span>
					</div>
					<div class="flex flex-wrap gap-1">
						{#each Object.keys($tagsFilter) as tag}
							<button
								class={classesForTags($themeStore, tag)}
								class:active={$tagsFilter[tag]}
								on:click={() => {
									filterPostsOnTags(tag);
								}}
							>
								{tag}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		<span class="mt-6 mx-2 sm:mt-0 text-nowrap">{posts.length} results</span>
	</div>
</div>
<section
	class="grid grid-cols-1 px-2 auto-rows-fr gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 mb-12"
>
	{#each posts as post}
		{#if post.tags.some(postTag => $tagsFilter[postTag]) || (Object.values($tagsFilter).every(tag => tag === false) && $searchInput === '')}
			<BlogPostCard post={post}></BlogPostCard>
		{/if}
		<!-- <BlogPostCard post={post}></BlogPostCard> -->
	{/each}
</section>
