<script>
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import { langConfigs } from '$lib/info';
	import img from '$lib/img/me.png';
	export let lang = 'en';
</script>

<!-- bio -->
<section class="flex justify-start items-center gap-16 pt-8 pb-16">
	<div class="bio">
		<img
			src={img}
			alt="Oliver Kutis"
			class="block h-24 w-24 mb-5 origin-left pointer-events-auto rounded-full border border-primary"
		/>
		<div class="mx-auto max-w-3xl lg:max-w-5xl">
			<div class="max-w-3xl">
				<h1 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
					{langConfigs[lang].bio}
				</h1>
				<p class="mt-6 text-base">
					{langConfigs[lang].bioDescription}
				</p>
				<div class="mt-6 flex items-center gap-6">
					<SocialLinks />
				</div>
			</div>
		</div>
	</div>
</section>
