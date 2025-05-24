<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/geist';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Fables Monsters</title>
	<meta name="description" content="" />
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<div class="container mx-auto grid w-full max-w-4xl gap-8 px-4 py-8 sm:gap-16">
	<Header />

	{@render children()}

	<Footer />
</div>
