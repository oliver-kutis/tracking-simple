<script>
	import { socials } from '$lib/config';
	import Email from '$lib/components/svg/Email.svelte';
	import LinkedIn from '$lib/components/svg/LinkedIn.svelte';
	import X from '$lib/components/svg/X.svelte';
	import Github from '$lib/components/svg/Github.svelte';
	import Medium from '$lib/components/svg/Medium.svelte';
</script>

{#if socials.email}
	<a href={socials.email} class="group" aria-label="Follow on LinkedIn">
		<Email />
	</a>
{/if}

{#if socials.linkedin}
	<a href={socials.linkedin} class="group" aria-label="Follow on LinkedIn">
		<LinkedIn></LinkedIn>
	</a>
{/if}
{#if socials.medium}
	<a href={socials.medium} class="group" aria-label="Follow on LinkedIn">
		<Medium></Medium>
	</a>
{/if}

{#if socials.github}
	<a href={socials.github} class="group" aria-label="Follow on GitHub">
		<Github />
	</a>
{/if}

{#if socials.twitter}
	<a href={socials.twitter} class="group" aria-label="Follow on Twitter">
		<X />
	</a>
{/if}

<!-- {#if resume}
	<a
		target="_blank"
		rel="noreferrer"
		href={'#'}
		class="flex border px-5 dark:border-zinc-50 dark:text-zinc-100 hover:bg-zinc-100 hover:dark:text-zinc-800 font-semibold py-1 text-sm rounded-full"
		aria-label="Download Resume"
	>
		Resume
	</a>
{/if} -->
