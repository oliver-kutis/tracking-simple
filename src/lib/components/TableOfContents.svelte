<script lang="ts">
	import { onMount } from 'svelte';
	import elementInViewport from '../../actions/elementInViewport';
	import themeStore from '$stores/theme';
	import { extractHeadings, isNordOrValentine } from '$lib';
	import type { ArrayOfHeadings } from '$lib/types';

	// animation start
	let clicked = false;
	let timeoutId = 0;

	const onClick = () => {
		clicked = !clicked;
		timeoutId++;
		const tId = timeoutId;
		setTimeout(() => {
			// cancel timeout if new was set
			if (tId === timeoutId) clicked = false;
		}, 1000);
	};
	// animation end

	let isModalOpen = false;
	let wasClosedByUser = false;
	let showModalTOC = true;
	function toggleModal() {
		isModalOpen = !isModalOpen;
		wasClosedByUser = false;
	}

	let arr: ArrayOfHeadings = [];

	function handleAnchorClick(event) {
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'smooth',
		});
	}

	// function handleLeaveViewport(event) {
	// 	console.log('leave');
	// 	const element = event.target;
	// 	let top = 0;
	// 	let currentElement = element;

	// 	// add offset top of all parent elements
	// 	while (currentElement) {
	// 		top += currentElement.offsetTop;
	// 		currentElement = currentElement.offsetParent;
	// 	}
	// 	const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// 	console.log(`scrollPosition: ${scrollPosition}`);
	// 	console.log(`top: ${top}`);
	// 	// show the modal only if the user has scrolled below the static TOC in the viewport
	// 	if (scrollPosition > top) {
	// 		isModalOpen = window.innerWidth >= 1200 ? true : false;
	// 		console.log('below');
	// 		console.log(isModalOpen);
	// 	} else if (scrollPosition < top) {
	// 		isModalOpen = false;
	// 		console.log('above');
	// 		console.log(isModalOpen);
	// 	}
	// 	if (timeoutId < 1) onClick();
	// }
	function handleLeaveViewport(event, wasClosedByUser) {
		const element = event.target;
		let top = 0;
		let currentElement = element;

		// add offset top of all parent elements
		while (currentElement) {
			top += currentElement.offsetTop;
			currentElement = currentElement.offsetParent;
		}
		const bottom = top + element.offsetHeight;
		const scrollPosition =
			window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		// Do thing A if the current TOP is above the TOP of the target element
		if (scrollPosition < top) {
			isModalOpen = false;
		}
		// Do thing B when current TOP is below the BOTTOM of the target element
		else if (scrollPosition > bottom) {
			isModalOpen = window.innerWidth >= 1200 && !wasClosedByUser;
		}
		if (timeoutId < 1) onClick();
	}

	// TODO:
	// - add animations to the modal
	// - make the modal button and modal itself smaller on mobile
	// - zasa sa dojebalo to zatvorenie modalu ked kliknem mimo... nutne opravit

	onMount(() => {
		arr = extractHeadings(arr);
	});
</script>

<!-- <svelte:window bind:scrollY={scrollY} /> -->
<svelte:body
	on:click={e => {
		if (!isModalOpen) return;
		const target = e.target;
		if (target instanceof Element) {
			if (
				target.closest('.toc-modal') === null ||
				target.parentElement.closest('.toc-modal') === null
			) {
				isModalOpen = false;
			}
		}
		// isModalOpen = false
	}}
/>
{#if arr}
	<div
		class="prose prose-h1:-mb-5 toc toc-static my-10 w-full max-w-4xl prose-h1:text-3xl"
		use:elementInViewport
		on:enterViewport={() => {
			isModalOpen = false;
		}}
		on:leaveViewport={e => handleLeaveViewport(e, wasClosedByUser)}
	>
		<span class="divider before:bg-primary after:bg-primary mb-6 print:mb-0" />
		<h1 class="pt-2">Table of Contents</h1>
		<ol class="py-2 prose-li:pl-[0px">
			{#each arr as [index, { headingProps, children }]}
				<li class="list-none prose-a:font-bold">
					<a
						on:click={handleAnchorClick}
						class="hover:text-accent prose-base md:prose-lg no-underline"
						href={`#${headingProps.id}`}>{headingProps.text}</a
					>
					{#if children}
						<ol class="list-disc marker:text-secondary pl-6 prose-base md:prose-lg">
							{#each Object.values(children) as child}
								<li class="list-none prose-a:font-semibold">
									<a
										on:click={handleAnchorClick}
										class="hover:text-accent font-normal no-underline"
										href={`#${child.headingProps.id}`}
										>{child.headingProps.text}</a
									>
								</li>
							{/each}
						</ol>
					{/if}
				</li>
			{/each}
		</ol>
		<span class="divider before:bg-primary after:bg-primary mb-6 print:mb-0" />
	</div>
{/if}

{#if arr && showModalTOC}
	{#if isModalOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- class={`bg-neutral text-primary border border-primary px-2 py-2 rounded-2xl sm:mr-5 ${clicked ? 'scale-wiggle' : ''}`} -->
		<div
			class="z-2 toc toc-modal fixed mr-6 inset-0 flex items-center justify-end text-sm pointer-events-none"
		>
			<button
				class={`${isNordOrValentine($themeStore) ? 'text-white bg-primary border-primary' : 'text-primary bg-neutral border-primary'} toc-modal-close relative -inset-x-1 border-4 px-2 py-2 rounded-2xl pointer-events-auto`}
				on:click={() => {
					toggleModal();
					wasClosedByUser = true;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
			<div
				class="z-2 toc-modal relative break-words bg-primary bg-opacity-100 p-4 rounded-xl shadow-inner w-64 max-h-screen pointer-events-auto"
			>
				<h1
					class={`${isNordOrValentine($themeStore) ? 'text-white' : 'text-neutral'} not-prose text-lg font-bold mb-2`}
				>
					Table of Contents
				</h1>
				<div
					class="max-h-82 overflow-y-auto scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-neutral scrollbar-thumb-primary"
				>
					<ol class="list-none not-prose">
						{#each arr as [index, { headingProps, children }]}
							<li class="my-2 not-prose">
								<a
									on:click={handleAnchorClick}
									class={`${isNordOrValentine($themeStore) ? 'text-white hover:text-black' : 'text-neutral hover:text-white'} text-base font-medium no-underline not-prose`}
									href={`#${headingProps.id}`}>{headingProps.text}</a
								>
								{#if children}
									<ol class="list-none mb-2 pl-4 not-prose">
										{#each Object.values(children) as child}
											<li class="my-2">
												<a
													on:click={handleAnchorClick}
													class={`${isNordOrValentine($themeStore) ? 'text-white hover:text-black' : 'text-neutral hover:text-white'} text-base font-medium no-underline not-prose`}
													href={`#${child.headingProps.href}`}
													>{child.headingProps.text}</a
												>
											</li>
										{/each}
									</ol>
								{/if}
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	{:else}
		<!-- <div
			class="fixed transform right-1/2 bottom-8 translate-x-1/2 sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
		> -->
		<div
			class="toc toc-modal toc-modal-open z-10 fixed right-0 top-1/2 -translate-y-1/2 transform"
		>
			<button
				class={`${isNordOrValentine($themeStore) ? 'text-white bg-primary border-primary' : 'text-primary bg-neutral border-primary'} border-4 px-2 py-2 rounded-2xl mr-2 sm:mr-5 ${clicked ? 'scale-wiggle' : ''}`}
				class:active={clicked}
				on:click={toggleModal}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
		</div>
	{/if}
{/if}

<style>
	.toc-modal {
		z-index: 100;
	}
	.active {
		animation-duration: 1s;
		animation-play-state: paused;
		animation-fill-mode: forwards;
	}
	@keyframes scale-wiggle {
		0% {
			transform: scale(1);
		}
		20% {
			transform: scale(1.2);
		}
		40% {
			transform: scale(0.9);
		}
		60% {
			transform: scale(1.15);
		}
		80% {
			transform: scale(0.95);
		}
		90% {
			transform: scale(1.02);
		}
		95% {
			transform: scale(0.98);
		}
		100% {
			transform: scale(1);
		}
	}
	.scale-wiggle {
		animation-name: scale-wiggle;
		animation-play-state: running;
	}
</style>
