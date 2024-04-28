<script lang="ts">
	import { page } from '$app/stores';
	import ResumeBasics from '$lib/components/ResumeBasics.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { work: Work, intro: Intro } = data;

	// import { authorName, siteName } from '$lib/config';
	// import { Basics, Interests, Work } from '$lib/copy'
	// import { Head } from 'svead'

	// let title = `Web Development Related Experience · ${siteName}`;
	// let description = `Relevant web development experience for JavaScript developer ${authorName}`;
	// let url = $page.url.toString();
	// let paymentPointer = `$ilp.uphold.com/bzPBWkMBzLmN`;

	// import { Email, Globe, Mobile } from '$lib/icons'

	// const { name, label, email, phone, website, imgSrc } = $$props;
	// const { name, label, email, phone, website, imgSrc } = $props<{
	// 	name: string;
	// 	label: string;
	// 	email: string;
	// 	phone: string;
	// 	website: string;
	// 	imgSrc: string;
	// }>();
</script>

<!-- <Head title={title} description={description} url={url} paymentPointer={paymentPointer} /> -->

<ResumeBasics />

<div class="prose md:prose-lg prose-headings:font-bold max-w-none">
	<Intro></Intro>
	<span class="divider before:bg-primary after:bg-primary mb-6 print:mb-0" />
	<Work></Work>
</div>
