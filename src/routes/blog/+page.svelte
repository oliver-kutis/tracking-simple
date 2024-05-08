<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import type { Post } from '$lib/types';
	import type { PageData } from '../$types';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { tags } from '../../mdsvex.svelte';

	export let data: PageData;

	let posts: Post[] = data.posts;
	posts = posts.sort((a, b) => b.datePublished - a.datePublished);
	// get all the tags and put them in a set
	let tagsFilter: Writable<object> = writable({});
	posts.forEach(post => {
		post.tags.forEach(tag => ($tagsFilter[tag] = false));
	});

	// let searchInput = '';
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

	let width: Writable<number> = writable(0);
	onMount(() => {
		width.set(window.innerWidth);
	});

	$: console.log($width);
</script>

<svelte:window on:resize={() => ($width = window.innerWidth)} />
<svelte:head>
	<title>My awesome blog posts</title>
</svelte:head>

<div class="flex flex-col gap-2 items-start justify-center mt-2 mb-6 sm:mx-2">
	<input
		type="text"
		placeholder="Search for a post"
		class="w-56 p-2 border border-neutral/30 rounded-xl shadow-md bg-neutral/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary focus:bg-neutral/25"
		bind:value={$searchInput}
		on:input={() => filterPostsOnSearch($searchInput)}
	/>
	<div
		class="relative w-full flex flex-col items-start justify-between sm:flex-row sm:items-center sm:mx-2 gap-6"
	>
		<div class="flex flex-row items-center gap-2">
			<!-- TODO: How to create a GRID from the tags instead of having 
			a dropdown select for smaller screens? I won't to be able to make the tags filter
			look good on mobiles as well. I'd probably make it somehow collabsable (not modal) -->
			{#if $width < 768}
				<select
					class="w-56 px-1 py-2 border border-neutral/30 rounded-xl shadow-md bg-neutral/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary focus:bg-neutral/25"
					on:change={e => filterPostsOnTags(e.target.value)}
				>
					<option value="">Filter tags</option>
					{#each Object.keys($tagsFilter) as tag}
						<option value={tag}>{tag}</option>
					{/each}
				</select>
			{:else}
				<span class="mr-4">Filter tags</span>
				{#each Object.keys($tagsFilter) as tag}
					<button
						class={`
					${$tagsFilter[tag] ? 'bg-primary text-neutral font-semibold' : 'bg-neutral/10 text-neutral-content'}
					px-2 py-1 border border-neutral/30 rounded-xl shadow-lg
					focus:outline-none 
				`}
						class:active={$tagsFilter[tag]}
						on:click={() => {
							filterPostsOnTags(tag);
						}}
					>
						{tag}
					</button>
				{/each}
			{/if}
		</div>
		<span class="mt-4 mx-2 sm:mt-0">{posts.length} results</span>
	</div>
</div>
<section class="grid grid-cols-1 auto-rows-fr gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
	{#each posts as post}
		{#if post.tags.some(postTag => $tagsFilter[postTag]) || (Object.values($tagsFilter).every(tag => tag === false) && $searchInput === '')}
			<BlogPostCard post={post}></BlogPostCard>
		{/if}
		<!-- <BlogPostCard post={post}></BlogPostCard> -->
	{/each}
</section>
