<script lang="ts">
	// import { Email, Globe, Mobile } from '$lib/icons'

	// const { name, label, email, phone, website, imgSrc } = $$props;
	// const { name, label, email, phone, website, imgSrc } = $props<{
	// 	name: string;
	// 	label: string;
	// 	email: string;
	// 	phone: string;
	// 	website: string;
	// 	imgSrc: string;
	// }>();

	const name: string = 'Oliver Kutis';
	const label = 'Web Developer';
	const email = 'test@test.cz';
	const phone = '+420 123 456 789';
	const website = 'example.com';
	const imgSrc: string = '/img/me.png';
</script>

<div class="flex items-center justify-between print:-mt-6">
	<h1 class="text-5xl font-bold uppercase tracking-wide print:text-2xl print:text-black">
		{name}
	</h1>

	{#if imgSrc !== undefined}
		<div class="avatar print:hidden">
			<div class="mask mask-circle h-24 w-24 transform transition">
				<img src={imgSrc} alt={name} />
			</div>
		</div>
	{/if}
</div>

<div class="mb-6 print:mb-4">
	<span class="divider before:bg-primary after:bg-primary print:hidden" />

	<div class="mb-5 print:mb-1">
		<h2 class="text-3xl font-bold tracking-wide text-primary print:text-xl print:text-black">
			{label}
		</h2>
	</div>

	<div
		class="text-accent-focus mt-2 flex flex-col justify-start gap-x-10 tracking-wide sm:flex-row print:mb-4 print:flex-row print:justify-start"
	>
		<div class="print:text-black">
			<dt><span class="sr-only">Email address</span></dt>
			<dd class="mb-2 flex items-end text-base print:mr-2 print:text-sm">
				<!-- <Email /> -->
				<span class="ml-3 print:ml-0">
					<a href="mailto: {email}" class="text-md">{email}</a>
				</span>
			</dd>
		</div>

		<div class="print:text-black">
			<dt><span class="sr-only">Website</span></dt>
			<dd class="mb-2 flex items-end text-base print:text-sm">
				<!-- <Globe /> -->
				<span class="ml-3 print:ml-0">
					<a href="https://{website}" class="text-md block">
						{website}
					</a>
				</span>
			</dd>
		</div>
	</div>
</div>
