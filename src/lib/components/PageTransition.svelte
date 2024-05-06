<script lang="ts">
	import { fade } from 'svelte/transition';

	export let url: string;
</script>

{#key url}
	<div
		class="transition h-full"
		in:fade={{
			delay: 100,
			duration: 500,
		}}
	>
		<slot />
	</div>
{/key}
