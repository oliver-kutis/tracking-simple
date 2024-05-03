<script lang="ts">
	import { page } from '$app/stores';
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

	import Card from '$lib/components/Card.svelte';

	// import { onMount } from 'svelte';
	// import { fly, slide } from 'svelte/transition';
	// import { backOut } from 'svelte/easing';
	// import Service from '$components/Service.svelte';
	import { langConfigs } from '$lib/info';
	import Bio from '$lib/components/Bio.svelte';
	import { onMount } from 'svelte';
	import ResumeBasics from '$lib/components/ResumeBasics.svelte';

	// TODO: Make this dynamic
	let lang = 'en';
</script>

<!-- <Head title={title} description={description} url={url} paymentPointer={paymentPointer} /> -->

<svelte:head>
	<title>{langConfigs.en.title}</title>
	<meta name="description" content={langConfigs.en.description} />
</svelte:head>
<Bio lang={lang} />
<section class="w-full">
	<ul class="grid grid-cols-1 auto-rows-fr gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
		<Card
			mainHeading="Web analyst"
			subHeadings={['Skills', 'Platforms', 'Languages']}
			subParagraphs={[
				'Tag management (GTM, sGTM), Web analytics (GA, GA4), Marketing analytics',
				'Google Ads, Meta Pixel, Sklik & Zbozi.cz, LinkedIn, Twitter, TikTok, Heureka, Biano, Glami, Criteo, ...',
				'JavaScript, Python, SQL',
			]}
		></Card>
		<Card
			mainHeading="Other Skills"
			subHeadings={['Google Cloud Platform', 'Data analytics', 'Other']}
			subParagraphs={[
				'Dataform, Cloud Functions, Workflows',
				'Bigquery, Keboola, Adverity, Looker Studio',
				'Marketing Mix Modeling (MMM), Causal Impact, GeoLift',
			]}
		></Card>

		<Card
			mainHeading="Experience"
			subHeadings={['Years', 'Areas', 'Clients']}
			subParagraphs={[
				'2+ years',
				'Ecommerce, B2B',
				'eyerim.sk, krmimkvalitne.cz, svetpeceni.cz',
			]}
		></Card>
	</ul>
</section>

<span class="divider before:bg-primary after:bg-primary mb-6 print:mb-0" />

<div
	class="prose prose-base md:prose-lg prose-headings:font-bold
	prose-headings:text-primary
	prose-headings:prose-2xl md:prose-headings:prose-2xl
	prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg md:prose-h1:text-3xl md:prose-h2:text-2xl md:prose-h3:text-xl
	prose-headings:my-4 hover:prose-a:text-accent prose-a:text-primary max-w-none"
>
	<Intro></Intro>
	<ResumeBasics></ResumeBasics>
	<Work></Work>
</div>

<style>
</style>
