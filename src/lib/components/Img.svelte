<script lang="ts">
	let klass: string;
	export { klass as class };
	export let src: string;
	export let alt: string;
</script>

<img class={klass} src={src} alt={alt} loading="lazy" />
