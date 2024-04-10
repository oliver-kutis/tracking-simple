<script lang="ts">
	import { onMount } from 'svelte';

	export let type: string;

	export let isModalOpen = false;
	function toggleModal() {
		isModalOpen = !isModalOpen;
	}

	let arr;
	onMount(() => {
		let headings = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id]'));
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

{#if type === 'static'}
	{#if arr}
		<h1 class="text-2xl font-bold mb-4">Table of Contents</h1>
		<ol class="list-disc pl-5">
			{#each arr as [index, { headingProps, children }]}
				<li class="mb-2">
					<a class=" hover:underline" href={headingProps.href}>{headingProps.text}</a>
					{#if children}
						<ol class="list-disc pl-5">
							{#each Object.values(children) as child}
								<li class="mb-2">
									<a class="hover:underline" href={child.headingProps.href}
										>{child.headingProps.text}</a
									>
									{#if child.children}
										<ol class="list-disc pl-5">
											{#each Object.values(child.children) as childChild}
												<li class="mb-2">
													<a
														class="hover:underline"
														href={childChild.headingProps.href}
														>{childChild.headingProps.text}</a
													>
												</li>
											{/each}
										</ol>
									{/if}
								</li>
							{/each}
						</ol>
					{/if}
				</li>
			{/each}
		</ol>
	{/if}
{:else if type === 'modal'}
	{#if arr}
		<!-- <div class="fixed right-0 top-1/2 transform -transalate-y-1/2 mt-10 mr-10">
			<button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={toggleModal}>
				{#if isModalOpen}
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
				{:else}
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
				{/if}
			</button>
		</div> -->

		{#if isModalOpen}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="fixed mr-6 inset-0 flex items-center justify-end"
				on:click={e => {
					toggleModal();
				}}
			>
				<button
					class="relative -inset-x-1 bg-primary text-neutral px-4 py-2 rounded-2xl"
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
					class="relative break-words bg-base-100 bg-opacity-95 p-5 border border-primary rounded-xl shadow-lg max-h-96 w-72 max-h-screen overflow-hidden"
				>
					<h1 class="text-2xl font-bold mb-4">Table of Contents</h1>
					<div
						class="max-h-72 overflow-y-auto scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar scrollbar-thin scrollbar-track-neutral scrollbar-thumb-primary"
					>
						<ol class="list-decimal px-5">
							{#each arr as [index, { headingProps, children }]}
								<li class="mb-2">
									<a class=" hover:underline" href={headingProps.href}
										>{headingProps.text}</a
									>
									{#if children}
										<ol class="list-decimal pl-5">
											{#each Object.values(children) as child}
												<li class="mb-2">
													<a
														class=" hover:underline"
														href={child.headingProps.href}
														>{child.headingProps.text}</a
													>
													{#if child.children}
														<ol class="list-decimal pl-5">
															{#each Object.values(child.children) as childChild}
																<li class="mb-2">
																	<a
																		class=" hover:underline"
																		href={childChild
																			.headingProps.href}
																		>{childChild.headingProps
																			.text}</a
																	>
																</li>
															{/each}
														</ol>
													{/if}
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
			<div class="fixed right-0 top-1/2 transform -translate-y-1/2">
				<button
					class="bg-primary text-neutral px-4 py-2 rounded-2xl mr-5"
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
{/if}
