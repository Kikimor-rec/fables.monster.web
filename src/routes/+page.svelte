<script lang="ts">
	import Block from '$lib/components/Block.svelte';
	import Manifest from '$lib/components/Manifest.svelte';
</script>

<section class="relative h-64 overflow-hidden rounded-lg bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-800">
       <img src="https://placehold.co/1200x400/png?text=Fables+Monsters" alt="Fables Monsters" class="absolute inset-0 h-full w-full object-cover opacity-40" />
       <h2 class="relative z-10 flex h-full items-center justify-center text-4xl font-extrabold">Welcome to Fables Monsters</h2>
</section>

<div id="about" class="w-full">
	<Block header="About" image="https://placecats.com/400/400" reverse>
		{#snippet main()}
			<p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
		{/snippet}
	</Block>
</div>

<div id="projects" class="w-full">
       <Block header="Projects" image="https://placecats.com/600/500">
               {#snippet main()}
                       <p>You can find our projects and support us on:</p>
                       <a href="https://www.drivethrurpg.com/en/" target="_blank" aria-label="DrivethruRPG">
                               <img src="/logos/dtrpg.png" alt="DrivethruRPG" class="h-12 w-auto" />
                       </a>
                       <a href="https://fablesmonsters.itch.io" target="_blank" aria-label="itch.io">
                               <img src="/logos/itch.svg" alt="itch.io" class="h-12 w-auto" />
                       </a>
                       <a href="https://www.patreon.com/fablesmonsters" target="_blank" aria-label="Patreon">
                               <img src="/logos/patreon.svg" alt="Patreon" class="h-12 w-auto" />
                       </a>
               {/snippet}
       </Block>
</div>

<div id="lostmark" class="w-full">
       <Block header="Lost Mark" image="https://placehold.co/600x500/png?text=Lost+Mark">
               {#snippet main()}
                       <p>Lost Mark is our newest TTRPG adventure. Join our heroes as they unravel the mystery behind a forgotten sign and explore dangerous ruins.</p>
               {/snippet}
       </Block>
</div>

<Manifest />
