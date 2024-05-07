<!-- <script lang="ts" context="module">
	import type { Post } from '$lib/types';
	import type { PageData } from '../$types';

	console.log(data);
	let posts: Post[] = data.posts;
	posts = posts.sort((a, b) => b.datePublished - a.datePublished);
	const tagsSet = new Set();
	posts.forEach(post => {
		post.tags.forEach(tag => tagsSet.add(tag));
	});
	const tagsArr = Array.from(tagsSet);
</script> -->

<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import type { Post } from '$lib/types';
	import type { PageData } from '../$types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let data: PageData;

	let posts: Post[] = data.posts;
	posts = posts.sort((a, b) => b.datePublished - a.datePublished);
	// get all the tags and put them in a set
	const tagsFilter = {};
	posts.forEach(post => {
		post.tags.forEach(tag => (tagsFilter[tag] = false));
	});
	// console.log(tagsArr);
	// console.log(posts);

	let searchInput = '';
	let selected = null;

	function filterPosts(tag: string) {
		if (selected === tag) {
			selected = null;
			posts = data.posts;
			return;
		}
		selected = tag;
		posts = posts.filter(post => post.tags.includes(tag));
	}
	console.log(posts);

	$: width = window.innerWidth;
	$: console.log(width);

	// let mainClientWidth: Writable<Number> = getContext('mainClientWidth');
	// $: console.log($mainClientWidth);
</script>

<svelte:window on:resize={() => (width = window.innerWidth)} />
<svelte:head>
	<title>My awesome blog posts</title>
</svelte:head>

<div class="flex flex-col gap-2 items-start justify-center mt-2 mb-6 sm:mx-2">
	<input
		type="text"
		placeholder="Search for a post"
		class="w-56 p-2 border border-neutral/30 rounded-xl shadow-md bg-neutral/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary focus:bg-neutral/25"
		bind:value={searchInput}
	/>
	<div
		class="relative w-full flex flex-col items-start justify-between sm:flex-row sm:items-center sm:mx-2 gap-6"
	>
		<div class="flex flex-row items-center gap-2">
			{#if width < 768}
				<select
					class="w-56 px-1 py-2 border border-neutral/30 rounded-xl shadow-md bg-neutral/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary focus:bg-neutral/25"
					on:change={e => filterPosts(e.target.value)}
				>
					<option value="">Filter tags</option>
					{#each Object.keys(tagsFilter) as tag}
						<option value={tag}>{tag}</option>
					{/each}
				</select>
			{:else}
				<span class="mr-4">Filter tags</span>
				{#each Object.keys(tagsFilter) as tag}
					<button
						class={`
					${selected === tag ? 'bg-primary text-neutral font-semibold' : 'bg-neutral/10 text-neutral-content'}
					px-2 py-1 border border-neutral/30 rounded-xl shadow-lg
					focus:outline-none 
				`}
						class:active={selected === tag}
						on:click={e => filterPosts(tag)}
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
		<BlogPostCard post={post}></BlogPostCard>
	{/each}
</section>
