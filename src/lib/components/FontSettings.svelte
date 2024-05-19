<script lang="ts">
	import type { Language } from '$lib/types';
	import fontStore from '$stores/font';
	import { isNordOrValentine } from '$lib';
	import themeStore from '$stores/theme';

	export let lang: Language;
	let fontToggleOn = false;
	const selectTextLang = {
		en: {
			normal: 'Normal font',
			dyslexic: 'Dyslexic font',
		},
		sk: {
			normal: 'Normálny font',
			dyslexic: 'Dyslexický font',
		},
	};

	$: $fontStore = fontToggleOn ? 'font-lexend' : 'font-monterrat';
	$: selectText = fontToggleOn ? selectTextLang[lang].normal : selectTextLang[lang].dyslexic;

	$: isNordOrValentineResult = isNordOrValentine($themeStore);
</script>

<li>
	<div class="font-settings flex items-center justify-center">
		<div
			class={`
				flex flex-col p-2 pl-3 items-start justify-center mx-2 my-2 gap-0
				rounded-xl w-[98%] 
				${isNordOrValentineResult ? 'bg-neutral-content/25' : 'bg-neutral/25'}
				text-neutral text-base font-semibold
				`}
		>
			<h1
				class={`
				inline-block mb-1 text-left font-bold 
				${isNordOrValentineResult ? 'text-base-content' : 'text-base-100'}
			`}
			>
				{lang === 'en' ? 'Font selection' : 'Font'}
			</h1>
			<div class="flex flex-col w-full items-start justify-center">
				<!-- <p class="text-sm">Font for dislexia</p> -->
				<!-- <input
                    type="checkbox"
                    class="toggle w-6 row-start-1 col-start-1 col-span-1"
                /> -->

				<label
					class="flex ml-2 mr-0 gap-1 w-36 items-center justify-between cursor-pointer"
				>
					<span
						class={`
							text-sm 
							${isNordOrValentineResult ? 'text-base-content' : 'text-base-100'} 
							${fontToggleOn ? 'font-montserrat' : 'font-lexend'}
						`}>{selectText}</span
					>
					<input
						type="checkbox"
						value="Lexend"
						class="sr-only peer"
						bind:checked={fontToggleOn}
					/>
					<div
						class={`
                            relative w-9 h-5 bg-neutral peer-focus:outline-none peer-focus:ring-1
                            peer-focus:ring-black rounded-full
                            peer peer-checked:after:translate-x-full
                            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-neutral
                            after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary
                            peer-checked:after:bg-neutral
                            after:border-primary after:border after:rounded-full after:h-4 after:w-4
                            after:transition-all peer-checked:bg-primary

							${
								isNordOrValentineResult
									? `
										bg-neutral-content/100 peer-checked:bg-base-content
										after:border-base-content peer-checked:after:border-neutral-content
										after:bg-base-content peer-checked:after:bg-neutral-content
									`
									: ''
							}
						`}
					></div>
					<!-- class="
								relative w-9 h-5 bg-neutral peer-focus:outline-none peer-focus:ring-1
								peer-focus:ring-black rounded-full
								peer peer-checked:after:translate-x-full
								rtl:peer-checked:after:-translate-x-full peer-checked:after:border-neutral
								after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary
								peer-checked:after:bg-neutral
								after:border-primary after:border after:rounded-full after:h-4 after:w-4
								after:transition-all peer-checked:bg-primary" -->
				</label>
			</div>
		</div>
	</div>
</li>
