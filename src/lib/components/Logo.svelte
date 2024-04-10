<script lang="ts">
	let klass: string = '';
	export { klass as class };
	export let width: string = '20';
	export let height: string = '20';
</script>

<div class={klass}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		><defs
			><linearGradient
				id="gradient"
				x1="12"
				y1="1"
				x2="12"
				y2="23"
				gradientUnits="userSpaceOnUse"
				><stop stop-color="#020024"></stop><stop offset="1" stop-color="#00D4FF"
				></stop></linearGradient
			></defs
		><g
			><path
				d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
				fill="#090979"
			></path><path
				d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
				fill="url(#gradient)"
			></path></g
		></svg
	>
	<slot><span>tracking simply</span></slot>
</div>

<!-- <style>
	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.5rem;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: 1.5px;
	}
</style> -->
