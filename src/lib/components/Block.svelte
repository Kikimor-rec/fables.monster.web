<script lang="ts">
	let { header, main, image, reverse = false } = $props();
</script>

<div class="grid w-full grid-cols-1 items-center gap-12 sm:grid-cols-2">
       <div class={['prose lg:prose-xl text-gray-300', reverse ? 'sm:order-last' : 'sm:order-first']}>
               <h2 class="mb-4 text-4xl font-bold uppercase text-indigo-300">{header}</h2>

		{@render main()}
	</div>

	<img src={image} alt={header} class="aspect-square h-full w-full rounded-lg object-cover" />
</div>
