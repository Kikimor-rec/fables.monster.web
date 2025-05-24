<script lang="ts">
	let { header, main, image, reverse = false } = $props();
</script>

<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
	<div class={['prose', reverse ? 'sm:order-last' : 'sm:order-first']}>
		<h2 class="text-4xl font-bold uppercase">{header}</h2>

		{@render main()}
	</div>

	<img src={image} alt={header} class="aspect-square h-full w-full rounded-lg object-cover" />
</div>
