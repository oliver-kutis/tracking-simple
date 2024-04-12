<script lang="ts">
	import { onMount } from 'svelte';
	import elementInViewport from '../../actions/elementInViewport';

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

	let showModalTOC = false;

	let arr;

	$: console.log(timeoutId);
	onMount(() => {
		let headings = Array.from(document.querySelectorAll('h1[id], h2[id]'));
		let obj = {};
		let currentHeading = null;
		let currentLevel = 1;

		headings.forEach((heading, index) => {
			let level = parseInt(heading.tagName.slice(1));

			if (level <= currentLevel) {
				currentLevel = level;
				currentHeading = {
					headingProps: {
						tagName: heading.tagName,
						id: heading.id,
						text: heading.textContent,
						href: heading.querySelector('a') ? heading.querySelector('a').href : null,
					},
					children: {},
				};

				obj[index] = currentHeading;
			} else if (currentHeading && level === currentLevel + 1) {
				currentHeading.children[index] = {
					headingProps: {
						tagName: heading.tagName,
						text: heading.textContent,
						id: heading.id,
						href: heading.querySelector('a') ? heading.querySelector('a').href : null,
					},
					children: {},
				};
			} else if (currentHeading && level > currentLevel + 1) {
				let parent = Object.values(currentHeading.children).slice(-1)[0];
				if (!parent) {
					parent = currentHeading;
				}
				parent.children[index] = {
					headingProps: {
						tagName: heading.tagName,
						id: heading.id,
						text: heading.textContent,
						href: heading.querySelector('a') ? heading.querySelector('a').href : null,
					},
					children: {},
				};
			}
		});

		arr = Object.entries(obj);
	});
</script>

<!-- <svelte:window bind:scrollY={scrollY} /> -->

{#if arr}
	<div
		use:elementInViewport
		on:enterViewport={() => {
			if (showModalTOC) showModalTOC = false;
		}}
		on:leaveViewport={() => {
			if (!showModalTOC) showModalTOC = true;
			if (timeoutId < 1) onClick();
		}}
	>
		<h1 class="text-4xl font-bold mb-4">Table of Contents</h1>
		<ol class="pl-2 border-b border-neutral pb-5 mb-5">
			{#each arr as [index, { headingProps, children }]}
				<li class="my-2">
					<a class=" hover:text-accent text-lg font-medium" href={headingProps.href}
						>{headingProps.text}</a
					>
					{#if children}
						<ol class="list-disc marker:text-secondary pl-5">
							{#each Object.values(children) as child}
								<li class="my-2">
									<a
										class="hover:text-accent text-md font-normal"
										href={child.headingProps.href}>{child.headingProps.text}</a
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
			class="fixed mr-6 inset-0 flex items-center justify-end text-sm"
			on:click={() => {
				if (isModalOpen) toggleModal();
			}}
		>
			<button
				class="relative -inset-x-1 bg-neutral text-primary border border-primary px-2 py-2 rounded-2xl"
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
				class="relative break-words bg-neutral bg-opacity-95 p-5 border border-primary rounded-xl shadow-lg max-h-96 w-64 max-h-screen overflow-hidden"
			>
				<h1 class="text-xl font-bold mb-4">Table of Contents</h1>
				<div
					class="max-h-72 overflow-y-auto scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar scrollbar-thin scrollbar-track-neutral scrollbar-thumb-primary"
				>
					<ol class="list-none pl-2 pr-5">
						{#each arr as [index, { headingProps, children }]}
							<li class="mb-2">
								<a class="hover:text-primary" href={headingProps.href}
									>{headingProps.text}</a
								>
								{#if children}
									<ol class="list-none pl-4">
										{#each Object.values(children) as child}
											<li class="mb-2">
												<a
													class="hover:text-primary"
													href={child.headingProps.href}
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
		<div class="fixed right-0 top-1/2 -translate-y-1/2 transform">
			<button
				class={`bg-neutral text-primary border border-primary px-2 py-2 rounded-2xl sm:mr-5 ${clicked ? 'scale-wiggle' : ''}`}
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
