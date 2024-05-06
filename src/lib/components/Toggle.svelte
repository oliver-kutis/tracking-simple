<script lang="ts">
	import type { Language } from '$lib/types';
	import { goto } from '$app/navigation';

	// export let spanClass: string = `text-sm text-base-100 ${fontToggleOn ? 'font-montserrat' : 'font-lexend'}`;
	export let lang: Language;
	export let path: string;

	$: toggleOn = lang === 'en';
</script>

<label
	class="inline-block flex flex-row mr-2 gap-1 w-fit items-center justify-normal cursor-pointer"
>
	<span class={`text-sm`}>en</span>
	<input
		type="checkbox"
		value="Lexend"
		class="sr-only peer"
		bind:checked={toggleOn}
		on:change={e => {
			let newPath;
			if (toggleOn) {
				newPath = '/sk' + path;
			} else {
				if (path.startsWith('/sk')) {
					newPath = path.slice(3);
				} else {
					newPath = path;
				}
			}

			goto(newPath);
		}}
	/>
	<div
		class="
            relative w-9 h-5 sm:w-11 sm:h-6 bg-neutral peer-focus:outline-none peer-focus:ring-1
            peer-focus:ring-black rounded-full
            peer peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-neutral
            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary
            peer-checked:after:bg-neutral
            after:border-primary after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5
            after:transition-all peer-checked:bg-primary
        "
	></div>
	<span>sk</span>
</label>
