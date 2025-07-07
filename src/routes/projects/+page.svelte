<script lang="ts">
	import Block from '$lib/components/Block.svelte';
</script>

<svelte:head>
	<title>Our Projects | Fables Monster</title>
	<meta name="description" content="Discover our collection of tabletop RPG adventures, digital tools, and upcoming projects. From cosmic horror to fantasy adventures." />
</svelte:head>

<section class="text-center py-12">
	<h1 class="text-5xl font-extrabold text-indigo-400 mb-4">Our Projects</h1>
	<p class="text-xl text-gray-300">Adventures, tools, and stories for your tabletop</p>
</section>

<div class="bg-red-600 text-white p-4 mb-4">
	<h2>DEBUG: This should always be visible</h2>
	<p>If you see this, the page loads but Block components don't work</p>
</div>

<div class="py-8">
	<div class="bg-gray-800 p-6 rounded-lg mb-8">
		<h2 class="text-4xl font-bold uppercase text-indigo-300 mb-4">Featured: Lost Mark</h2>
		<p class="text-indigo-200 italic text-lg">Cosmic horror among the wrecks and cults</p>
		<p class="text-gray-300 mt-2">
			Our flagship adventure for Mothership RPG. A Pay What You Want cosmic horror experience 
			that puts your crew face-to-face with impossible choices and eldritch truths.
		</p>
		<ul class="mt-4 list-disc space-y-1 pl-6 text-gray-300">
			<li>32 pages of atmospheric horror and investigation</li>
			<li>Multiple endings based on player choices</li>
			<li>VTT-ready with maps and handouts</li>
			<li>Solo play adaptations included</li>
		</ul>
		<div class="mt-6 flex flex-wrap gap-4">
			<a href="/lostmark" class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors">Learn More</a>
			<a href="https://fablesmonster.itch.io/lost-mark" target="_blank" class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors">itch.io</a>
			<a href="https://www.drivethrurpg.com/product/lost-mark" target="_blank" class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500 transition-colors">DriveThruRPG</a>
		</div>
	</div>
	
	<div class="bg-gray-800 p-6 rounded-lg mb-8">
		<h2 class="text-4xl font-bold uppercase text-indigo-300 mb-4">Coming Soon</h2>
		
		<h3 class="text-xl font-bold text-indigo-300 mb-3">Cemetery of Broken Ships</h3>
		<p class="text-indigo-200 italic">Sci-Fi Horror for the Mothership system</p>
		<p class="text-gray-300 mt-2">
			5 ships to explore, connected by a common lore. Use each ship separately or let players 
			solve the mystery of the debris field.
		</p>
		<p class="mt-3 text-sm text-gray-300">
			<strong>Progress:</strong>
			<span class="text-yellow-400">Scriptwriting - in progress</span> • 
			<span class="text-yellow-400">Playtests - in progress</span>
		</p>
		
		<h3 class="text-xl font-bold text-indigo-300 mb-3 mt-6">Hellish Bureaucracy</h3>
		<p class="text-indigo-200 italic">Fantasy Adventure for D&D 5e/2024</p>
		<p class="text-gray-300 mt-2">
			Send the players' characters to the very heart of the Seven Hells with the task of stealing 
			a hellish contract or trying to prove that the contract is invalid.
		</p>
		<p class="mt-3 text-sm text-gray-300">
			<strong>Progress:</strong>
			<span class="text-yellow-400">Scriptwriting - in progress</span> • 
			<span class="text-yellow-400">Playtesting - in progress</span>
		</p>
	</div>
</div>

<div id="coming-soon" class="py-8">
	<Block header="Coming Soon" image="https://placehold.co/600x400/png?text=Coming+Soon" reverse>
		{#snippet main()}
			<h3 class="text-xl font-bold text-indigo-300 mb-3">Cemetery of Broken Ships</h3>
			<p class="text-indigo-200 italic">Sci-Fi Horror for the Mothership system</p>
			<p class="mt-2">
				5 ships to explore, connected by a common lore. Use each ship separately or let players 
				solve the mystery of the debris field. Each vessel tells a piece of a larger, more 
				sinister story hidden among the wreckage.
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6 text-sm">
				<li>Modular design - use ships individually or as connected campaign</li>
				<li>Detailed ship layouts and environmental hazards</li>
				<li>Overarching mystery spanning multiple locations</li>
				<li>Full compatibility with Mothership RPG rules</li>
			</ul>
			<div class="mt-3 text-sm">
				<strong>Progress:</strong>
				<span class="text-yellow-400">Scriptwriting - in progress</span> • 
				<span class="text-yellow-400">Playtests - in progress</span>
			</div>
			
			<h3 class="text-xl font-bold text-indigo-300 mb-3 mt-6">Hellish Bureaucracy</h3>
			<p class="text-indigo-200 italic">Fantasy Adventure for D&D 5e/2024</p>
			<p class="mt-2">
				Send the players' characters to the very heart of the Seven Hells with the task of stealing 
				a hellish contract or trying to prove that the contract is invalid. Navigate infernal red tape, 
				demonic middle management, and literal hellish bureaucracy.
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6 text-sm">
				<li>Unique blend of comedy and horror in the Nine Hells</li>
				<li>Social encounters with devils, demons, and damned souls</li>
				<li>Creative problem-solving over combat solutions</li>
				<li>Compatible with D&D 5e and D&D 2024 editions</li>
			</ul>
			<div class="mt-3 text-sm">
				<strong>Progress:</strong>
				<span class="text-yellow-400">Scriptwriting - in progress</span> • 
				<span class="text-yellow-400">Playtesting - in progress</span>
			</div>

			<h3 class="text-xl font-bold text-indigo-300 mb-3 mt-6">Digital Tools Suite</h3>
			<p class="text-indigo-200 italic">Web-based GM and player aids</p>
			<p class="mt-2">
				Name generators, random encounter tables, campaign management tools, and more—all designed 
				to seamlessly integrate with your favorite RPG systems.
			</p>
			<ul class="mt-3 list-disc space-y-1 pl-6 text-sm">
				<li>NPC generators with personality and motivation</li>
				<li>Dynamic encounter builders</li>
				<li>Campaign timeline and notes management</li>
				<li>VTT integration tools</li>
			</ul>
			<div class="mt-3 text-sm">
				<strong>Progress:</strong>
				<span class="text-blue-400">Concept development</span>
			</div>
		{/snippet}
	</Block>
</div>

<div id="custom" class="py-8">
	<Block header="Custom Adventures" image="https://placehold.co/600x400/png?text=Custom+Work">
		{#snippet main()}
			<p>
				Looking for something specific? We work with individual GMs, gaming groups, and publishers 
				to create custom adventures, campaigns, and digital tools tailored to your needs.
			</p>
			<ul class="mt-4 list-disc space-y-1 pl-6">
				<li>One-shot adventures for conventions or special events</li>
				<li>Multi-session campaigns with interconnected storylines</li>
				<li>System conversions and adaptations</li>
				<li>Digital tools and VTT integrations</li>
				<li>Publishing and layout services</li>
			</ul>
			<div class="mt-6">
				<a
					href="#contact"
					class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 transition-colors"
				>
					Get in Touch
				</a>
			</div>
		{/snippet}
	</Block>
</div>

<div class="py-8 text-center bg-gray-800 rounded-lg">
	<h2 class="text-3xl font-bold text-indigo-300 mb-4">Join Our Community</h2>
	<p class="text-gray-300 mb-6">
		Get updates on new releases, behind-the-scenes content, and early access to playtests.
	</p>
	<div class="flex justify-center gap-6">
		<a href="https://www.patreon.com/fablesmonsters" target="_blank" class="text-indigo-400 hover:text-indigo-300">
			Support on Patreon
		</a>
		<a href="https://discord.gg/fablesmonster" target="_blank" class="text-indigo-400 hover:text-indigo-300">
			Join Discord
		</a>
		<a href="https://x.com/FablesMonster" target="_blank" class="text-indigo-400 hover:text-indigo-300">
			Follow on X
		</a>
	</div>
</div>
