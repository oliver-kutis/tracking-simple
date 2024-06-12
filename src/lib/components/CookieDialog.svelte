<script lang="ts">
	import CloseCross from './svg/CloseCross.svelte';

	let isOpen = true;

	const open = () => {
		isOpen = true;
	};
	const close = () => {
		isOpen = false;
	};
</script>

<!-- You can open the modal using ID.showModal() method -->
<!-- <button class="btn" onclick="my_modal_4.showModal()">open modal</button> -->
<dialog open={isOpen} id="my_modal_4" class={`modal ${isOpen ? 'modal-open' : ''}`}>
	<div class="modal-box w-11/12 max-w-5xl">
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Click the button below to close</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button, it will close the modal -->
				<button class="btn" on:click={close}>Close</button>
			</form>
		</div>
	</div>
</dialog>
<!-- <dialog
	class="cookie-dialog block z-[1055] bg-base
			shadow-lg fixed left-1/2 top-4 m-0 translate-x-1/2 w-1/3
"
	open={isOpen}
>
	<div class="flex flex-row mx-auto h-full m-2">
		<div class="absolute p-4 right-0 top-0">
			<CloseCross></CloseCross>
		</div>
		<div class="container flex flex-col items-center gap-y-2 max-w-4xl p-5">
			<p class="text-base-content text-center">
				Apart from functional cookies. Besides that, the only cookies the website uses are
				analytical cookies, which is straightforward as I am a web analyst 😀. So please hit
				the accept so I can play with the data.
			</p>
			<div class="flex flex-row gap-x-2 max-w-4xl">
				<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1"
					>Accept</button
				>
				<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1"
					>Decline</button
				>
			</div>
		</div>
	</div>
</dialog> -->
<!-- <dialog
	class="cookie-dialog fixed left-0 bottom-0 z-[1055] w-full h-1/4 bg-base
			shadow-lg
"
	open={isOpen}
>
	<div class="absolute p-4 right-0 top-0">
		<CloseCross></CloseCross>
	</div>
	<div class="container mx-auto h-full flex flex-col items-center gap-y-2 max-w-4xl m-10 p-5">
		<p class="text-base-content text-center">
			Apart from functional cookies. Besides that, the only cookies the website uses are
			analytical cookies, which is straightforward as I am a web analyst 😀. So please hit the
			accept so I can play with the data.
		</p>
		<div class="flex flex-row gap-x-2 max-w-4xl">
			<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1">Accept</button>
			<button class="text-neutral bg-primary rounded-btn shadow-md px-2 py-1">Decline</button>
		</div>
	</div>
</dialog> -->
