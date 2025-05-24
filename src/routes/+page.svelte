<script lang="ts">
	import Block from '$lib/components/Block.svelte';
	import Manifest from '$lib/components/Manifest.svelte';
</script>

<div>
	<img src="https://placecats.com/600/300" alt="Fables Monsters" class="w-full rounded-lg" />
</div>

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
			<p>You can find our projects on:</p>
			<a href="https://www.drivethrurpg.com/en/" target="_blank" aria-label="DrivethruRPG">
				<img src="/logos/dtrpg.png" alt="DrivethruRPG" class="h-12 w-auto" />
			</a>
			<a href="https://itch.io" target="_blank" aria-label="Itch.io">
				<img src="/logos/itch.svg" alt="itch.io" class="h-12 w-auto" />
			</a>
		{/snippet}
	</Block>
</div>

<Manifest />
