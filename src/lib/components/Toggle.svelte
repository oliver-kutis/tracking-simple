<script lang="ts">
	import type { Language } from '$lib/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// export let spanClass: string = `text-sm text-base-100 ${fontToggleOn ? 'font-montserrat' : 'font-lexend'}`;
	export let lang: Language;

	$: path = $page.url.pathname;
	$: toggleOn = path.split('/')[1] === 'sk';

	function handleToggle() {
		const splited = path.split('/');
		if (splited[1] !== 'sk' && toggleOn) {
			path = path === '/' ? '/sk' : path.replace(/^\/?/, '/sk/');
			goto(path);
		} else if (splited[1] === 'sk' && !toggleOn) {
			path = path === '/sk' ? '/' : path.replace(/^\/sk\//, '/');
			goto(path);
		}
	}
</script>

<label
	class="inline-block flex flex-row mr-2 gap-1 w-fit items-center justify-normal cursor-pointer"
>
	<span
		class={`${toggleOn ? 'text-base-content/65 font-medium' : 'text-primary font-bold'} uppercase text-sm`}
		>en</span
	>
	<input
		type="checkbox"
		value="Lexend"
		class="sr-only peer"
		bind:checked={toggleOn}
		on:change={handleToggle}
	/>
	<div
		class="
            relative w-9 h-5 md:w-11 md:h-6 bg-neutral peer-focus:outline-none peer-focus:ring-1
            peer-focus:ring-black rounded-full
            peer peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary
            peer-checked:after:bg-primary
            after:border-primary after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5
            after:transition-all peer-checked:bg-neutral
        "
	></div>
	<span
		class={`${toggleOn ? 'text-primary font-bold' : 'text-base-content/65 font-medium'} uppercase text-sm`}
		>sk</span
	>
</label>
