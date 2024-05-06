<script lang="ts" context='module'> 
    import Moon from '$lib/components/svg/Moon.svelte';

    export let lang: string;
    export const handleSelectChange;
</script>
<div
	class="
                flex flex-row justify-start items-center
                text-neutral text-base font-semibold
                m-2 gap-2
            "
>
	<Moon></Moon>
	<select
		id="themedark"
		class="
                        cursor-pointer
                        w-32
                        shadow-md
                        text-neutral text-sm text-left font-semibold
                        bg-primary rounded-badge px-2
                        border border-neutral border-opacity-25
                        hover:bg-primary hover:border-neutral hover:border-opacity-100 hover:shadow-lg
                        hover:text-base-100
                        outline-primary/50
                    "
		on:change={handleSelectChange}
	>
		{#if themeType !== 'dark'}
			<option value="" disabled selected>{lang === 'en' ? 'Pick one' : 'Vyber'}</option>
		{:else}
			<option value="" disabled>{lang === 'en' ? 'Pick one' : 'Vyber'}</option>
		{/if}
		{#each darkThemes as { theme } (theme)}
			{#if theme === $themeStore}
				<option value={theme} selected>{theme}</option>
			{:else}
				<option value={theme}>{theme}</option>
			{/if}
		{/each}
		<!-- <option value="" disabled>Select a theme</option>
                    <option value="system">System</option>
                    <option value="auto">Auto</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option> -->
	</select>
</div>
