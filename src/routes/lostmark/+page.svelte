<script lang="ts">
	// import Block from '$lib/components/Block.svelte';
</script>

<svelte:head>
	<title>Lost Mark - Cosmic Horror for Mothership RPG | Fables Monster</title>
	<meta name="description" content="A Pay What You Want cosmic horror adventure for Mothership RPG. Infiltrate cult ships, uncover dark secrets, and face impossible choices near a black hole's event horizon." />
</svelte:head>

<section class="relative h-96 overflow-hidden rounded-lg bg-gradient-to-r from-purple-900 via-black to-purple-900 mb-8">
	<img
		src="https://placehold.co/1200x600/png?text=Lost+Mark+Adventure"
		alt="Lost Mark - Cosmic Horror Adventure"
		class="absolute inset-0 h-full w-full object-cover opacity-30"
	/>
	<div class="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center">
		<h1 class="text-6xl font-extrabold text-white">Lost Mark</h1>
		<p class="text-xl text-indigo-200 italic">Cosmic horror among the wrecks and cults</p>
		<p class="text-lg text-gray-300">A Pay What You Want adventure for Mothership RPG</p>
	</div>
</section>

<div class="bg-gray-800 p-6 rounded-lg mb-8">
	<h2 class="text-4xl font-bold uppercase text-indigo-300 mb-4">The Signal</h2>
	<p class="text-gray-300 mb-4">
		Your crew picks up a ghostly signal from a derelict beacon near the event horizon of a black hole. 
		The transmission is fragmented, desperate, and impossibly old. As you approach to investigate, 
		you discover something far worse than a simple distress call.
	</p>
	<p class="text-indigo-200 italic">
		"The mark... the mark is lost... they're coming through the walls... 
		God help us, the ship is alive..."
	</p>
</div>

<div class="bg-gray-800 p-6 rounded-lg mb-8">
	<h2 class="text-4xl font-bold uppercase text-indigo-300 mb-4">What's Included</h2>
	<ul class="space-y-3 text-gray-300">
		<li class="flex items-start gap-3">
			<span class="text-indigo-400 font-bold">📖</span>
			<span><strong>Complete Adventure:</strong> 32 pages of cosmic horror, investigation, and social intrigue</span>
		</li>
		<li class="flex items-start gap-3">
			<span class="text-indigo-400 font-bold">🗺️</span>
			<span><strong>Detailed Maps:</strong> Ship layouts, encounter areas, and navigation aids</span>
		</li>
		<li class="flex items-start gap-3">
			<span class="text-indigo-400 font-bold">📋</span>
			<span><strong>Handouts:</strong> In-character documents, transmissions, and clues</span>
		</li>
		<li class="flex items-start gap-3">
			<span class="text-indigo-400 font-bold">💻</span>
			<span><strong>VTT Ready:</strong> Foundry VTT and Roll20 compatible assets</span>
		</li>
	</ul>
</div>

<div class="py-8 text-center">
	<h2 class="text-4xl font-bold text-indigo-300 mb-6">Get Lost Mark</h2>
	<p class="text-lg text-gray-300 mb-8">Pay What You Want - Support independent horror gaming</p>
	<div class="flex flex-wrap justify-center gap-6">
		<a
			href="https://fablesmonster.itch.io/lost-mark"
			target="_blank"
			class="flex items-center gap-2 rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500 transition-colors"
		>
			Download on itch.io
		</a>
		<a
			href="https://www.drivethrurpg.com/product/lost-mark"
			target="_blank" 
			class="flex items-center gap-2 rounded bg-red-600 px-6 py-3 text-white hover:bg-red-500 transition-colors"
		>
			Get on DriveThruRPG
		</a>
	</div>
</div>

<div class="py-8">
	<Block header="The Cult Ship" image="https://placehold.co/600x400/png?text=Patchwork+Ship" reverse>
		{#snippet main()}
			<p>
				Orbiting nearby is a monstrous, patchwork vessel—dozens of ships welded, grown, and fused 
				together into something that defies physics and sanity. A cannibal sect has made this 
				abomination their home, worshipping a god that has become one with the ship itself.
			</p>
			<ul class="mt-4 list-disc space-y-2 pl-6">
				<li>Navigate the twisted corridors of a living ship</li>
				<li>Encounter desperate cultists and their horrific rituals</li>
				<li>Uncover the truth behind the Lost Mark and its terrible purpose</li>
				<li>Face impossible choices that will determine your crew's fate</li>
			</ul>
		{/snippet}
	</Block>
</div>

<div class="py-8">
	<Block header="Multiple Paths, Multiple Endings" image="https://placehold.co/600x400/png?text=Branching+Story">
		{#snippet main()}
			<p>
				Lost Mark is designed for maximum replayability with multiple investigation paths 
				and dramatically different endings based on your crew's choices and discoveries.
			</p>
			<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="bg-gray-800 p-4 rounded">
					<h4 class="font-bold text-indigo-300">Escape</h4>
					<p class="text-sm">Get out alive, but the horror follows you</p>
				</div>
				<div class="bg-gray-800 p-4 rounded">
					<h4 class="font-bold text-indigo-300">Salvation</h4>
					<p class="text-sm">Save the cultists from their twisted fate</p>
				</div>
				<div class="bg-gray-800 p-4 rounded">
					<h4 class="font-bold text-indigo-300">Transformation</h4>
					<p class="text-sm">Become something more... or less... than human</p>
				</div>
				<div class="bg-gray-800 p-4 rounded">
					<h4 class="font-bold text-indigo-300">Utter Doom</h4>
					<p class="text-sm">Some knowledge is too terrible to survive</p>
				</div>
			</div>
		{/snippet}
	</Block>
</div>

<div class="py-8">
	<Block header="What's Included" image="https://placehold.co/600x400/png?text=Game+Materials" reverse>
		{#snippet main()}
			<ul class="space-y-3">
				<li class="flex items-start gap-3">
					<span class="text-indigo-400 font-bold">📖</span>
					<span><strong>Complete Adventure:</strong> 32 pages of cosmic horror, investigation, and social intrigue</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-indigo-400 font-bold">🗺️</span>
					<span><strong>Detailed Maps:</strong> Ship layouts, encounter areas, and navigation aids</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-indigo-400 font-bold">📋</span>
					<span><strong>Handouts:</strong> In-character documents, transmissions, and clues</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-indigo-400 font-bold">💻</span>
					<span><strong>VTT Ready:</strong> Foundry VTT and Roll20 compatible assets</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-indigo-400 font-bold">🎭</span>
					<span><strong>Solo Play:</strong> Adapted for solo gaming with AI or oracle systems</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-indigo-400 font-bold">🎨</span>
					<span><strong>Original Art:</strong> Atmospheric illustrations to set the mood</span>
				</li>
			</ul>
		{/snippet}
	</Block>
</div>

<div class="py-8">
	<Block header="Planned Updates & Expansions" image="https://placehold.co/600x400/png?text=Future+Content">
		{#snippet main()}
			<p class="mb-4">
				Lost Mark is a living document that we continue to expand based on community feedback 
				and our own creative vision. Here's what we're working on:
			</p>
			
			<h3 class="text-xl font-bold text-indigo-300 mb-3">Version 1.1 - Enhanced Edition</h3>
			<ul class="mb-6 list-disc space-y-2 pl-6">
				<li><strong>Extended Prequel:</strong> Additional scenarios leading up to the main adventure</li>
				<li><strong>Crew Backgrounds:</strong> Pre-made character hooks and backstories</li>
				<li><strong>Expanded Epilogues:</strong> More detailed consequences for each ending</li>
				<li><strong>Audio Supplements:</strong> Ambient soundscapes and voice clips</li>
			</ul>

			<h3 class="text-xl font-bold text-indigo-300 mb-3">The Lost Mark Trilogy</h3>
			<ul class="mb-6 list-disc space-y-2 pl-6">
				<li><strong>Echoing Void:</strong> Prequel adventure exploring the beacon's origins</li>
				<li><strong>Marked Souls:</strong> Sequel dealing with the aftermath and spread of the curse</li>
				<li><strong>The Final Mark:</strong> Epic conclusion to the cosmic horror storyline</li>
			</ul>

			<h3 class="text-xl font-bold text-indigo-300 mb-3">Community Features</h3>
			<ul class="list-disc space-y-2 pl-6">
				<li><strong>GM Resources:</strong> Additional random tables, NPC generators, and complications</li>
				<li><strong>Player Aids:</strong> Reference cards, quick rules summaries, and safety tools</li>
				<li><strong>Community Gallery:</strong> Showcase of player art, stories, and actual play reports</li>
				<li><strong>Translation Project:</strong> Multi-language versions for international play</li>
			</ul>

			<div class="mt-6 p-4 bg-gray-800 rounded-lg">
				<p class="text-indigo-200 italic text-center">
					"All future updates are free to existing owners. Your support helps us create more cosmic horror for everyone."
				</p>
			</div>
		{/snippet}
	</Block>
</div>

<div class="py-8 text-center">
	<h2 class="text-4xl font-bold text-indigo-300 mb-6">Get Lost Mark</h2>
	<p class="text-lg text-gray-300 mb-8">Pay What You Want - Support independent horror gaming</p>
	<div class="flex flex-wrap justify-center gap-6">
		<a
			href="https://fablesmonster.itch.io/lost-mark"
			target="_blank"
			class="flex items-center gap-2 rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500 transition-colors"
		>
			<img src="/logos/itch.svg" alt="itch.io" class="h-6 w-6" />
			Download on itch.io
		</a>
		<a
			href="https://www.drivethrurpg.com/product/lost-mark"
			target="_blank" 
			class="flex items-center gap-2 rounded bg-red-600 px-6 py-3 text-white hover:bg-red-500 transition-colors"
		>
			<img src="/logos/dtrpg.png" alt="DriveThruRPG" class="h-6 w-6" />
			Get on DriveThruRPG
		</a>
	</div>
</div>

<div class="py-8 text-center bg-gray-800 rounded-lg">
	<h3 class="text-2xl font-bold text-indigo-300 mb-4">What Players Are Saying</h3>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
		<blockquote class="bg-gray-700 p-4 rounded italic">
			"Absolutely terrifying in the best way. My crew still talks about the choices they had to make."
			<footer class="mt-2 text-sm text-gray-400">- Game Master Review</footer>
		</blockquote>
		<blockquote class="bg-gray-700 p-4 rounded italic">
			"Perfect balance of cosmic horror and player agency. Multiple playthroughs revealed new horrors."
			<footer class="mt-2 text-sm text-gray-400">- Player Feedback</footer>
		</blockquote>
	</div>
</div>
