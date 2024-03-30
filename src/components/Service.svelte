<script lang="ts">
	let klass: string = '';
	export { klass as class };
</script>

<div class={klass}>
	<slot name="title"><h2>Service</h2></slot>
	<slot name="content">
		<p>Service description</p>
	</slot>
</div>
