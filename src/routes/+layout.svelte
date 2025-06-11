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

<div class="min-h-screen flex flex-col">
       <div class="container mx-auto grid w-full max-w-5xl flex-grow gap-8 px-2 py-4 sm:gap-16 sm:px-4 sm:py-8">
               <Header />

               {@render children()}

               <Footer />
       </div>
</div>
