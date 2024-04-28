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

	export let isModalOpen = false;
	function toggleModal() {
		isModalOpen = !isModalOpen;
	}

	let showModalTOC = true;
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

	function handleLeaveViewport(event) {
		const element = event.target;
		let top = 0;
		let currentElement = element;

		// add offset top of all parent elements
		while (currentElement) {
			top += currentElement.offsetTop;
			currentElement = currentElement.offsetParent;
		}
		const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

		// show the modal only if the user has scrolled below the static TOC in the viewport
		if (scrollPosition > top) {
			isModalOpen = window.innerWidth >= 1200 ? true : false;
		} else if (scrollPosition > top) {
			isModalOpen = false;
		}
		if (timeoutId < 1) onClick();
	}

	// TODO:
	// - add animations to the modal
	// - make the modal button and modal itself smaller on mobile

	onMount(() => {
		arr = extractHeadings(arr);
	});
</script>

<!-- <svelte:window bind:scrollY={scrollY} /> -->

{#if arr}
	<div
		class="toc-static"
		use:elementInViewport
		on:enterViewport={() => {
			isModalOpen = false;
		}}
		on:leaveViewport={handleLeaveViewport}
	>
		<h1 class="text-4xl font-bold my-5 py-5 border-t border-neutral">Table of Contents</h1>
		<ol class="pl-2 border-b border-neutral pb-5 mb-5">
			{#each arr as [index, { headingProps, children }]}
				<li class="list-none my-2">
					<a
						on:click={handleAnchorClick}
						class="hover:text-accent text-lg font-medium no-underline"
						href={`#${headingProps.id}`}>{headingProps.text}</a
					>
					{#if children}
						<ol class="list-disc marker:text-secondary pl-5">
							{#each Object.values(children) as child}
								<li class="my-2">
									<a
										on:click={handleAnchorClick}
										class="hover:text-accent text-md font-normal no-underline"
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
	</div>
{/if}

{#if arr && showModalTOC}
	{#if isModalOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- class={`bg-neutral text-primary border border-primary px-2 py-2 rounded-2xl sm:mr-5 ${clicked ? 'scale-wiggle' : ''}`} -->
		<div
			class="z-10 fixed mr-6 inset-0 flex items-center justify-end text-sm"
			on:click={() => {
				if (isModalOpen) toggleModal();
			}}
		>
			<button
				class={`${isNordOrValentine($themeStore) ? 'text-white bg-primary border-primary' : 'text-primary bg-neutral border-primary'} relative -inset-x-1 border-4 px-2 py-2 rounded-2xl`}
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
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
			<div
				class="relative break-words bg-primary bg-opacity-100 p-5 rounded-xl shadow-inner w-64 max-h-screen overflow-hidden"
			>
				<h1
					class={`${isNordOrValentine($themeStore) ? 'text-white' : 'text-neutral'} text-xl font-bold mb-2`}
				>
					Table of Contents
				</h1>
				<div
					class="max-h-82 overflow-y-auto scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-neutral scrollbar-thumb-primary"
				>
					<ol class="list-none pl-2 pr-5">
						{#each arr as [index, { headingProps, children }]}
							<li class="mb-2">
								<a
									on:click={handleAnchorClick}
									class={`${isNordOrValentine($themeStore) ? 'text-white hover:text-black' : 'text-neutral hover:text-white'} text-base font-medium no-underline`}
									href={`#${headingProps.id}`}>{headingProps.text}</a
								>
								{#if children}
									<ol class="list-none pl-4">
										{#each Object.values(children) as child}
											<li class="mb-2">
												<a
													on:click={handleAnchorClick}
													class={`${isNordOrValentine($themeStore) ? 'text-white hover:text-black' : 'text-neutral hover:text-white'} text-base font-medium no-underline`}
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
		<div class="z-10 fixed right-0 top-1/2 -translate-y-1/2 transform">
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
