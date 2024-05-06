<script context="module" lang="ts">
	import img from '$lib/components/Img.svelte';
	export { img };
	export let title;
	export let alternativeTitle;
	export let imgUrl;
	export let imgAlt;
	export let datePublished;
	export let dateEdited;
	export let tags;
	export let summary;
</script>

<slot />

<!-- <style>
		:global(.icon-link) {
		position: relative;
		color: red;
	}
	:global(.iloc-link::before) {
		content: '#';
		position: absolute;
		left: -1ch;
		top: 0;
		line-height: 1;
		opacity: 0;
		text-decoration: underline;
	}
</style> -->
