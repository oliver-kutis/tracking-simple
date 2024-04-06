<script>
	// import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { langConfigs } from '$lib/info';
	export let lang = 'en';
</script>

<!-- bio -->
<section class="flex justify-start items-center gap-16 pt-8 pb-16">
	<div class="bio">
		<img
			src="../src/lib/img/me.png"
			alt="Oliver Kutis"
			class="block h-24 w-24 mb-5 origin-left pointer-events-auto rounded-full ring-primary border border-primary"
		/>
		<div class="mx-auto max-w-2xl lg:max-w-5xl">
			<div class="max-w-2xl">
				<h1 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
					Hi, I am Oliver Kutis - {langConfigs[lang].bio}
				</h1>
				<p class="mt-6 text-base">
					{langConfigs[lang].bioDescription}
				</p>
				<div class="mt-6 flex items-center gap-6">
					<!-- <SocialLinks /> -->
				</div>
			</div>
		</div>
	</div>
</section>
