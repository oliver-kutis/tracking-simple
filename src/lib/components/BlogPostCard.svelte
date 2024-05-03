<script lang="ts">
	// import {formatDate } from '$lib/utils';

	import PostMeta from './PostMeta.svelte';
	import DateIcon from './svg/DateIcon.svelte';
	import TagsIcon from './svg/TagsIcon.svelte';

	// import type { Post } from '$lib/types';
	export let post;
</script>

<div
	class="
		bg-neutral bg-opacity-10 border border-neutral border-opacity-10 shadow-xl rounded-3xl
		post overflow-hidden flex flex-col sm:flex-row
	"
>
	<!-- <a href={post.slug} class="w-1/4 md:w-full"> -->
	<!-- <a href={post.slug} class="p-4 w-full sm:w-2/5 sm:p-6">
		<img
			src={post.imgUrl}
			alt={post.title}
			loading="lazy"
			class="w-full h-full object-cover rounded-md shadow-2xl sm:shadow-none aspect-video"
		/>
	</a> -->
	<div class="flex flex-col p-6 w-full h-full justify-between">
		<div class="flex flex-col gap-2">
			<a
				href={post.slug}
				class="text-2xl font-bold text-primary hover:text-accent transition-colors"
				>{post.title}</a
			>

			<p class="mt-2">{post.summary}</p>
			<!-- <div class="mt-4">
				<a href={post.slug} class="text-primary hover:text-accent transition-colors"
					>Read more</a
				>
			</div> -->
		</div>
		<div class="flex flex-col gap-2 mt-2">
			<a href={post.slug} class="text-primary hover:text-accent transition-colors my-2"
				>Read more</a
			>
			<div class="flex flex-row gap-2 items-center">
				<DateIcon />
				<time datetime={post.date} class="text-sm">{post.date}</time>
			</div>
			<div class="flex flex-row gap-2 items-center">
				<TagsIcon />
				<p class="text-sm">{post.tags.join(' x ')}</p>
			</div>
		</div>
	</div>
</div>
