<script>
	import '../app.css';
	import Logo from '../components/Logo.svelte';
	import SearchIcon from '../components/svg/SearchIcon.svelte';
	import LinkedIn from '../components/svg/LinkedIn.svelte';
	import X from '../components/svg/X.svelte';
	import Medium from '../components/svg/Medium.svelte';
	import { fly, slide } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
</script>

<div class="h-full bg-white bg-opacity-20 items-center">
	<div class="container mx-auto max-w-[1200px]">
		<header
			class="sticky z-10 top-5 inset-x-0 p-2 rounded-xl max-w-[800px] bg-neutral bg-opacity-30 container mx-auto"
		>
			<nav class="flex items-center justify-between space-x-10 x-1">
				<a href="/">
					<Logo
						width="23"
						height="23"
						class="flex items-center gap-3 font-mono text-white text-xl"
					/>
				</a>
				<!-- <button
			class="flex items-center gap-2 bg-slate-800 rounded-lg px-2 py-1 hover:bg-slate-600"
		>
			<SearchIcon class="w-4 h-4 opacity-70" />
			<span>Search</span>
			<div class="shortcuts">
				<kbd class="text-sm px-1 py-0.1 bg-slate-400 rounded-sm text-slate-800">⌘</kbd>
				+
				<kbd class="text-sm px-1 py-0.1 bg-slate-400 rounded-sm text-slate-800">K</kbd>
			</div>
		</button> -->
				<div class="flex space-x-2 items-center">
					<a
						href="/about"
						class="p-1 rounded-lg text-white hover:bg-slate-800 hover:text-white text-xl"
						>About</a
					>
					<!-- LinkedIn -->
					<a
						href="https://www.linkedin.com/in/oliver-kutiš-5248a1179/"
						target="_blank"
						class="p-1 rounded-lg text-white hover:bg-slate-800 hover:text-white"
					>
						<LinkedIn width="25" height="25" />
					</a>
					<!-- X -->
					<a
						href=""
						target="_blank"
						class="p-1 rounded-lg text-white hover:bg-slate-800 hover:text-white"
					>
						<X width="23" height="23" />
					</a>
					<!-- Medium -->
					<a
						href=""
						target="_blank"
						class="p-1 rounded-lg text-white hover:bg-slate-800 hover:text-white"
					>
						<Medium width="23" height="23" />
					</a>
				</div>
			</nav>
		</header>
		<slot />
	</div>
</div>

<style>
	/* :global(body) {
		background-image: url('../lib/img/background-main.jpg');
		background-size: cover;
		background-position: center;
	} */
</style>
