<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	const { work: Work, intro: Intro, whereToMeetMe: WhereToMeetMe, lang: lang } = data;

	import Card from '$lib/components/Card.svelte';

	import { langConfigs } from '$lib/config';
	import Bio from '$lib/components/Bio.svelte';
	import ResumeBasics from '$lib/components/ResumeBasics.svelte';
	import type { CardData, Language } from '$lib/types';

	const cardData: CardData = [
		{
			mainHeading: {
				en: 'Web analyst',
				sk: 'Webový analytik',
			},
			subHeadings: {
				en: ['Skills', 'Platforms', 'Languages'],
				sk: ['Skills', 'Platformy', 'Jazyky'],
			},
			subParagraphs: {
				en: [
					'Tag management (GTM, sGTM), Web analytics (GA, GA4), Marketing analytics',
					'Google Ads, Meta Pixel, Sklik & Zbozi.cz, LinkedIn, Twitter, TikTok, Heureka, Biano, Glami, Criteo, ...',
					'JavaScript, Python, SQL',
				],
				sk: [
					'Správa značiek (GTM, sGTM), Webový analytika (GA, GA4), Analýza marketingových dát',
					'Google Ads, Meta Pixel, Sklik & Zboží.cz, LinkedIn, Twitter, TikTok, Heureka, Biano, Glami, Criteo, ...',
					'JavaScript, Python, SQL',
				],
			},
		},
		{
			mainHeading: {
				en: 'Other skills',
				sk: 'Ostatné schopnosti',
			},
			subHeadings: {
				en: ['Google Cloud Platform', 'Data analytics', 'Other'],
				sk: ['Google Cloud Platform', 'Dátový analytika', 'Ostatné'],
			},
			subParagraphs: {
				en: [
					'Dataform, Cloud Functions, Workflows',
					'Bigquery, Keboola, Adverity, Looker Studio',
					'Marketing Mix Modeling (MMM), Causal Impact, GeoLift',
				],
				sk: [
					'Dataform, Cloud Functions, Workflows',
					'Bigquery, Keboola, Adverity, Looker Studio',
					'Marketing Mix Modeling (MMM), Causal Impact, GeoLift',
				],
			},
		},
		{
			mainHeading: {
				en: 'Experience',
				sk: 'Skúsenosti',
			},
			subHeadings: {
				en: ['Years', 'Areas', 'Clients'],
				sk: ['Roky', 'Oblasti', 'Klienti'],
			},
			subParagraphs: {
				en: ['2+ years', 'Ecommerce, B2B', 'eyerim.sk, krmimkvalitne.cz, svetpeceni.cz'],
				sk: ['2+ roky', 'Ecommerce, B2B', 'eyerim.sk, krmimkvalitne.cz, svetpeceni.cz'],
			},
		},
	];

	// // TODO: Make this dynamic
	// let lang = 'en';
</script>

<!-- <Head title={title} description={description} url={url} paymentPointer={paymentPointer} /> -->

<svelte:head>
	<title>{langConfigs[lang].title}</title>
	<meta name="description" content={langConfigs[lang].description} />
</svelte:head>
<Bio lang={lang} />
<section class="w-full">
	<ul class="grid grid-cols-1 auto-rows-fr gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
		{#each cardData as card}
			<Card
				mainHeading={card.mainHeading[lang]}
				subHeadings={card.subHeadings[lang]}
				subParagraphs={card.subParagraphs[lang]}
			></Card>
		{/each}
		<!-- <Card
			mainHeading="Web analyst"
			subHeadings={['Skills', 'Platforms', 'Languages']}
			subParagraphs={[
				'Tag management (GTM, sGTM), Web analytics (GA, GA4), Marketing analytics',
				'Google Ads, Meta Pixel, Sklik & Zbozi.cz, LinkedIn, Twitter, TikTok, Heureka, Biano, Glami, Criteo, ...',
				'JavaScript, Python, SQL',
			]}
			lang={lang}
		></Card>
		<Card
			mainHeading="Other Skills"
			subHeadings={['Google Cloud Platform', 'Data analytics', 'Other']}
			subParagraphs={[
				'Dataform, Cloud Functions, Workflows',
				'Bigquery, Keboola, Adverity, Looker Studio',
				'Marketing Mix Modeling (MMM), Causal Impact, GeoLift',
			]}
			lang={lang}
		></Card>

		<Card
			mainHeading="Experience"
			subHeadings={['Years', 'Areas', 'Clients']}
			subParagraphs={[
				'2+ years',
				'Ecommerce, B2B',
				'eyerim.sk, krmimkvalitne.cz, svetpeceni.cz',
			]}
			lang={lang}
		></Card> -->
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
	<div class="mb-2 print:mb-1">
		<h1 class="font-bold tracking-wide text-primary print:text-xl print:text-black">
			Predošlé skúsenosti a projekty
		</h1>
		<p>
			Nižšie nájdete stručný popis zodpovedností a úkonov na bývalých aj existujúcich
			projektoch.
		</p>
	</div>
	<!-- <ResumeBasics></ResumeBasics> -->
	<Work></Work>
	<div class="mb-2 print:mb-1">
		<h1 class="font-bold tracking-wide text-primary print:text-xl print:text-black">
			Kde na mňa môžete naraziť?
		</h1>
		<p>
			Pravideľne navštevujem analytické a marketingové konferencie. Najčastejšie ma môžete
			stretnúť na Measurecampe v rámci CEE regiónu.
		</p>
	</div>
	<WhereToMeetMe></WhereToMeetMe>
</div>

<style>
</style>
