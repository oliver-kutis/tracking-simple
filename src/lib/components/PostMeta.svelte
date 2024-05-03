<script lang="ts" module="context">
	export let post;
	export let type: string;
</script>

{#if type === 'date'}
	<div class="flex flex-col md:flex-row gap-2 justify-star mb-2">
		<div class="flex flex-row gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
				class="w-5 h-5 md:w-6 md:h-6 fill-base-content"
				><path
					d="M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z"
				/></svg
			>
			<time
				datetime={post.datePublished}
				class="text-base-content text-sm md:text-base font-light italic pr-4"
			>
				{post.datePublished}
			</time>
			{#if post.dateEdited}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512"
					class="w-5 h-5 md:w-6 md:h-6 fill-base-content"
					><path
						d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
					/></svg
				>
				<time
					datetime={post.dateEdited}
					class="text-base-content text-sm md:text-base font-light italic pr-4"
				>
					{post.dateEdited}
				</time>
			{/if}
		</div>
	</div>
{:else if type === 'tags'}
	{#if post.tags}
		<div class="flex flex-row gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 640 512"
				class="w-5 h-5 md:w-6 md:h-6 fill-base-content"
				><path
					d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"
				/></svg
			>
			<p class="text-base-content text-sm md:text-base font-light italic pr-4">
				{post.tags.join(' x ')}
			</p>
		</div>
	{/if}
{/if}
