<script lang="ts">
	import { dataLayerPush, handleConsentUpdate, isNordOrValentine } from '$lib';
	import { langConfigs } from '$lib/config';
	import { onMount } from 'svelte';
	import { cubicInOut, quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import themeStore from '$stores/theme';

	export let lang: string;
	// export let data: LayoutData;
	// $: lang = data.lang;

	let isOpen;

	const open = () => {
		isOpen = true;
		dataLayerPush('cookie_modal_impression');
	};
	const close = event => {
		const target = event.target;
		handleConsentUpdate(target.id);
		isOpen = false;
	};

	onMount(() => {
		const cookieConsent = getCookie('cookie-consent-analytics');
		if (!cookieConsent) {
			open();
		}
	});
</script>

<!-- You can open the modal using ID.showModal() method -->
<!-- <button class="btn" onclick="my_modal_4.showModal()">open modal</button> -->
<!-- <dialog
	open={isOpen}
	id="my_modal_4"
	class={`modal ${isOpen ? 'modal-open' : ''} items-start max-w-4xl mx-auto`}
>
	<div class="modal-box w-10/12 sm:w-5/12 max-w-sm m-10 rounded-3xl">
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Click the button below to close</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn" on:click={close}>Close</button>
			</form>
		</div>
	</div>
</dialog> -->

<div
	transition:fade={{ duration: 300, easing: quintOut }}
	on:visibilitychange={() => console.log('visibilitychange')}
	class={`cookie-modal modal ${isOpen ? 'modal-open' : ''} items-start max-w-4xl mx-auto`}
	style={`display: ${isOpen ? 'grid' : 'none'};`}
>
	<div
		class="absolute modal-box
			w-10/12 sm:w-6/12 max-w-sm
			border border-neutral
			mt-5 sm:mr-8 p-5 mr-10
			top-0 left-0 right-0 m-auto sm:right-0
			rounded-3xl
			shadow-3xl
		"
	>
		<!-- <form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={close}>
				<CloseCross></CloseCross>
			</button>
		</form> -->
		<h2 class="font-bold text-xl">
			{#if lang === 'sk'}
				Súhlas s analytickými cookies
			{:else}
				Analytical cookies consent
			{/if}
		</h2>
		<p class="py-4">
			{#if lang === 'sk'}
				Mimo funkčných cookies tento web používa iba analytické cookie, čo by sa od <b
					>webového analytika</b
				>
				asi dalo čakať 😀.<br />
				Takže vás chcem požiadať aby ste klikli na akceptovať, aby som sa mohol hrať a testovať
				riešenia, o ktorých sa potom dočítate na tomto blogu alebo ich uplatním ak budede využívať
				moje služby.
			{:else}
				Besides functional, the only cookies the website uses are analytical cookies, which
				is straightforward as I am a <b>web analyst</b> 😀.<br />So please hit the accept so
				I can play with the data and test out solutions which you can read about on this
				blog or get implemented in case you need my services.
			{/if}
		</p>
		<div class="flex flex-row justify-end">
			<div class="modal-action m-0">
				<button
					id="accept"
					class={`
						${isNordOrValentine($themeStore) ? 'bg-secondary border-secondary' : 'bg-accent border-accent'}
						shadow-md
						font-semibold
						btn text-base-100 rounded-xl
						py-1 px-2 h-10 min-h-10 
						hover:bg-primary hover:border-primary
					`}
					on:click={close}>{lang === 'sk' ? 'Akceptovať' : 'Accept'}</button
				>
				<button
					id="deny"
					class={`
						btn text-base-content rounded-xl py-1
						font-semibold
						px-2 h-10 min-h-10
						hover:bg-neutral hover:border-neutral
						${isNordOrValentine($themeStore) || $themeStore === 'garden' ? 'hover:text-neutral-content' : ''}
					`}
					on:click={close}>{lang === 'sk' ? 'Odmietnuť' : 'Deny'}</button
				>
			</div>
		</div>
	</div>
</div>

<!-- <dialog
	class="cookie-dialog block z-[1055] bg-base
			shadow-lg fixed left-1/2 top-4 m-0 translate-x-1/2 w-1/3
"
	open={isOpen}
>
	<div class="flex flex-row mx-auto h-full m-2">
		<div class="absolute p-4 right-0 top-0">
			<CloseCross></CloseCross>
		</div>
		<div class="container flex flex-col items-center gap-y-2 max-w-4xl p-5">
			<p class="text-base-content text-center">
				Apart from functional cookies. Besides that, the only cookies the website uses are
				analytical cookies, which is straightforward as I am a web analyst 😀. So please hit
				the accept so I can play with the data.
			</p>
			<div class="flex flex-row gap-x-2 max-w-4xl">
				<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1"
					>Accept</button
				>
				<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1"
					>Decline</button
				>
			</div>
		</div>
	</div>
</dialog> -->
<!-- <dialog
	class="cookie-dialog fixed left-0 bottom-0 z-[1055] w-full h-1/4 bg-base
			shadow-lg
"
	open={isOpen}
>
	<div class="absolute p-4 right-0 top-0">
		<CloseCross></CloseCross>
	</div>
	<div class="container mx-auto h-full flex flex-col items-center gap-y-2 max-w-4xl m-10 p-5">
		<p class="text-base-content text-center">
			Apart from functional cookies. Besides that, the only cookies the website uses are
			analytical cookies, which is straightforward as I am a web analyst 😀. So please hit the
			accept so I can play with the data.
		</p>
		<div class="flex flex-row gap-x-2 max-w-4xl">
			<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1">Accept</button>
			<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1">Decline</button>
		</div>
	</div>
</dialog> -->

<style>
	:global(.modal-box) {
		pointer-events: auto !important;
	}
	:global(.modal) {
		pointer-events: none !important;
		background: none !important;
		/* height: auto !important;
		max-height: 90vh;
		overflow-y: auto !important;
		overscroll-behavior: none !important; */
	}
</style>
