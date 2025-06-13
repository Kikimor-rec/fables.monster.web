<script lang="ts">
	import Block from '$lib/components/Block.svelte';
	import Manifest from '$lib/components/Manifest.svelte';
</script>

<section
	id="hero"
	class="relative h-72 overflow-hidden rounded-lg bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-800"
>
	<img
		src="https://placehold.co/1200x400/png?text=Fables+Monster"
		alt="Fables Monster"
		class="absolute inset-0 h-full w-full object-cover opacity-40"
	/>
	<div class="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center">
		<h2 class="text-4xl font-extrabold">Welcome to Fables Monster</h2>
		<a
			href="#lostmark"
			class="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
			>Start Exploring</a
		>
	</div>
</section>

<div id="about" class="w-full">
	<Block header="Who We Are" image="https://placecats.com/400/400" reverse>
		{#snippet main()}
			<p>
				Fables Monster is an independent studio bringing bold, original adventures and unforgettable
				monsters to the world of tabletop roleplaying games. Our team blends writers, artists, and
				developers to craft immersive stories for both in-person and virtual play.
			</p>
		{/snippet}
	</Block>
</div>

<div class="py-8">
	<Manifest />
</div>

<div id="projects" class="w-full">
	<Block header="Our Projects" image="https://placecats.com/600/500">
		{#snippet main()}
			<ul class="space-y-2">
				<li><strong>Lost Mark</strong> — Cosmic horror for Mothership RPG (featured)</li>
				<li>[Coming Soon] — More adventures and digital tools for your tabletop</li>
			</ul>
		{/snippet}
	</Block>
</div>

<div id="lostmark" class="w-full">
	<Block header="Lost Mark" image="https://placehold.co/600x500/png?text=Lost+Mark">
		{#snippet main()}
			<p class="text-indigo-200 italic">Cosmic horror among the wrecks and cults</p>
			<p>A Pay What You Want adventure for Mothership RPG (PDF, VTT-ready)</p>
			<p>
				Your crew picks up a ghostly signal from a derelict beacon near the event horizon of a black
				hole. Orbiting nearby is a monstrous, patchwork cult ship—a cannibal sect worships a god
				fused with the wreck itself, and nothing here is what it seems.
			</p>
			<ul class="ml-5 list-disc space-y-1">
				<li>Infiltrate the cult ship and uncover its secrets</li>
				<li>Psychological tension, social intrigue, impossible choices</li>
				<li>Multiple endings: escape, salvation, transformation, or utter doom</li>
				<li>Maps, handouts, VTT support (Foundry, Roll20), solo-play ready</li>
			</ul>
			<div class="mt-4 flex flex-wrap gap-4">
				<a
					href="https://fablesmonsters.itch.io"
					target="_blank"
					class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
					>Download on itch.io</a
				>
				<a
					href="https://www.drivethrurpg.com/en/"
					target="_blank"
					class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
					>Get on DriveThruRPG</a
				>
			</div>
		{/snippet}
	</Block>
</div>

<div id="why" class="w-full">
	<Block header="Why Fables Monster?" image="https://placecats.com/500/400" reverse>
		{#snippet main()}
			<ul class="ml-5 list-disc space-y-1">
				<li>Unconventional genres and fresh mechanics</li>
				<li>Designed for digital and physical play</li>
				<li>Beautiful illustrations, compelling NPCs, and memorable locations</li>
				<li>Fast, friendly community support</li>
			</ul>
		{/snippet}
	</Block>
</div>

<div id="contact" class="w-full space-y-4 py-8 text-center">
	<h2 class="text-4xl font-bold text-indigo-300 uppercase">Contact Us</h2>
	<p>info@fables.monster</p>
	<div class="flex justify-center gap-6">
		<a href="https://www.patreon.com/fablesmonsters" target="_blank" aria-label="Patreon"
			><img src="/logos/patreon.svg" alt="Patreon" class="h-8 w-8" /></a
		>
		<a href="https://x.com/FablesMonster" target="_blank" aria-label="X" class="text-xl">X</a>
		<a
			href="https://facebook.com/FablesMonster"
			target="_blank"
			aria-label="Facebook"
			class="text-xl">Facebook</a
		>
		<a href="https://discord.gg/fablesmonster" target="_blank" aria-label="Discord" class="text-xl"
			>Discord</a
		>
	</div>
	<p>We’re open for collaborations, feedback, and partnerships!</p>
</div>
