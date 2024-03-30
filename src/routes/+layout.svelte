<script>
	import '../app.css';
	import Logo from '../components/Logo.svelte';
	import SearchIcon from '../components/svg/SearchIcon.svelte';
	import LinkedIn from '../components/svg/LinkedIn.svelte';
	import Bio from '../components/Bio.svelte';
	import X from '../components/svg/X.svelte';
	import Medium from '../components/svg/Medium.svelte';
	import { fly, slide } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	// import Footer from '../components/Footer.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<!-- <div class="h-full items-center"> -->
<!-- <div class="bg-info bg-opacity-10 h-full items-center"> -->
<!-- <div class="bg-clouds bg-repeat-space bg-cover bg-fixed bg-opacity-10 h-full items-center"> -->
<div class="flex w-full h-full">
	<div class="container inset-0 max-h-full py-5 px-10 rounded max-w-screen-xlg mx-auto">
		<Nav></Nav>
		<main class="flex mt-5 flex-col flex-grow w-full mx-auto">
			<slot />
		</main>
	</div>

	<!-- <div class="flex flex-col container mx-auto max-w-[1200px] h-full">
		<header
			on:scroll={e => {
				console.log(e);
			}}
			class="fixed z-10 inset-x-0 px-2 py-6 rounded-xl max-w-[800px] w-[90%] mx-auto"
		>
			<nav class="flex items-center justify-between space-x-10 x-1 text-2xl">
				<a href="/">
					<Logo
						width="26"
						height="26"
						class="flex items-center gap-3 font-bold text-neutral-content "
					>
						<span>oliver kutis</span>
					</Logo>
					<div class="flex space-x-2 items-center">
						<a
							href="/about"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral">About</a
						>
						<a
							href="https://www.linkedin.com/in/oliver-kutiš-5248a1179/"
							target="_blank"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral"
						>
							<LinkedIn width="25" height="25" />
						</a>
						<a
							href=""
							target="_blank"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral"
						>
							<X width="23" height="23" />
						</a>
						<a
							href=""
							target="_blank"
							class="p-1 rounded-lg text-neutral-content hover:bg-neutral"
						>
							<Medium width="23" height="23" />
						</a>
					</div>
				</a>
			</nav>
		</header>
		<slot />
	</div> -->
</div>

<!-- <Footer></Footer> -->

<style>
</style>
