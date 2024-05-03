<script lang="ts">
	import Email from '$lib/components/svg/Email.svelte';
	import Globe from '$lib/components/svg/Globe.svelte';

	// const { name, label, email, phone, website, imgSrc } = $$props;
	// const { name, label, email, phone, website, imgSrc } = $props<{
	// 	name: string;
	// 	label: string;
	// 	email: string;
	// 	phone: string;
	// 	website: string;
	// 	imgSrc: string;
	// }>();

	const name: string = 'Oliver Kutis';
	const label = 'Web Analyst';
	const email = 'test@test.cz';
	const phone = '+420 123 456 789';
	const website = 'example.com';
	const imgSrc: string = '/img/me.png';
</script>

<div class="mb-6 mt-10 print:mb-4">
	<!-- <span
		class="mb-6 divider before:bg-opacity-100 after:bg-opacity-100 before:bg-neutral after:bg-neutral print:hidden"
	/> -->
	<div class="mb-2 print:mb-1">
		<h1 class="font-bold tracking-wide text-primary print:text-xl print:text-black">
			Past Experience & Projects
		</h1>
		<p>Below is a list of projects and clients I have worked with in the past.</p>
	</div>
</div>

<!-- .divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    margin-top: 1rem/* 16px */;
    margin-bottom: 1rem/* 16px */;
    height: 1rem/* 16px */;
    white-space: nowrap;
}
.divider:before,
  .divider:after {
    height: 0.125rem/* 2px */;
    width: 100%;
    flex-grow: 1;
    --tw-content: '';
    content: var(--tw-content);
    background-color: var(--fallback-bc,oklch(var(--bc)/0.1));
}
.divider:before,
  .divider:after {
    height: 0.125rem/* 2px */;
    width: 100%;
    flex-grow: 1;
    --tw-content: '';
    content: var(--tw-content);
    background-color: var(--fallback-bc,oklch(var(--bc)/0.1));
}
.divider:not(:empty) {
    gap: 1rem/* 16px */; -->
<!-- 
<style>
	:global(.divider:before, .divider:after) {
		height: 0.075rem;
	}
</style> -->
