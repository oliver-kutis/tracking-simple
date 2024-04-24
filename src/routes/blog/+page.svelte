<script lang="ts">
	// import {formatDate } from '$lib/utils';
	import type { Post } from '$lib/types';

	export let data: Post;
</script>

<svelte:head>
	<title>My awesome blog posts</title>
</svelte:head>

<!-- <section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
	{#each data.posts as post}
		<div class="post bg-white shadow-md rounded-lg overflow-hidden">
			<a href={post.slug}>
				<img
					src={post.imgUrl}
					alt={post.title}
					loading="lazy"
					class="w-full h-64 object-cover"
				/>
			</a>
			<div class="p-6">
				<a
					href={post.slug}
					class="text-2xl font-bold text-primary hover:text-accent transition-colors"
					>{post.title}</a
				>
				<p class="text-gray-700 mt-2">{post.summary}</p>
				<div class="mt-4">
					<a href={post.slug} class="text-primary hover:text-accent transition-colors"
						>Read more</a
					>
				</div>
				<div class="mt-4">
					<span class="text-gray-700">Published on</span>
					<time datetime={post.date} class="text-sm text-gray-500">{post.date}</time>
				</div>
			</div>
		</div>
	{/each}
</section> -->

<section class="grid gap-8 p-5 mt-20">
	{#each data.posts as post}
		<!-- class="post bg-neutral border-2 border-neutral shadow-lg shadow-base-300 rounded-3xl overflow-hidden flex flex-col md:flex-row" -->
		<div
			class="bg-neutral bg-opacity-10 border border-neutral border-opacity-10 shadow-xl rounded-xl post p-2 border-b border-neutral overflow-hidden flex flex-col md:flex-row"
		>
			<!-- <a href={post.slug} class="w-1/4 md:w-full"> -->
			<a href={post.slug} class="p-4 w-full md:w-2/5 md:p-6">
				<img
					src={post.imgUrl}
					alt={post.title}
					loading="lazy"
					class="w-full h-full object-cover rounded-md shadow-2xl md:shadow-none"
				/>
			</a>
			<div class="py-6 px-4 w-full md:w-3/5 md:p-6">
				<a
					href={post.slug}
					class="text-2xl font-bold text-primary hover:text-accent transition-colors"
					>{post.title}</a
				>
				<p class="mt-2">{post.summary}</p>
				<div class="mt-4">
					<a href={post.slug} class="text-primary hover:text-accent transition-colors"
						>Read more</a
					>
				</div>
				<div class="mt-4">
					<span>Published on</span>
					<time datetime={post.date} class="text-sm">{post.date}</time>
				</div>
			</div>
		</div>
	{/each}
</section>

<!-- <section class="pb-5">
	<ul class="grid border border-neutral border-b-primary gap-8">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="text-3xl capitalize">{post.title}</a>
				<p class="date text-accent">2023-01-01</p>
				<p class="summary mt-2">{post.summary}</p>
			</li>
		{/each}
	</ul>
</section>
<section>
	<ul class="posts grid gap-8 border-primary border-b-2">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="text-3xl capitalize">{post.title}</a>
				<p class="date text-accent">2023-01-01</p>
				<p class="summary mt-2">{post.summary}</p>
			</li>
		{/each}
	</ul>
</section> -->
