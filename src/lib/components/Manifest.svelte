<script lang="ts">
	type Person = {
		name: string;
		title: string;
		description: string;
		avatar: string;
	};

	const manifest: Person[] = [
		{
			name: 'Stepan Kulikov',
			title: 'Script and idia',
			description:
				'Project idea and scripting. Host of TTRPG games, fan of virtual tabletop and a fan of good stories.',
			avatar: 'https://placecats.com/100/100'
		},
		{
			name: 'Tanka Bond',
			title: 'Desing',
			description:
				'Amazing lady who knows how shuld look like a good design and implement it.',
			avatar: 'https://placecats.com/100/200'
		},
		{
			name: 'Alxander',
			title: 'Coding and scripting ',
			description:
				'Wizard of coding and scripting. He is a good person and a good developer.',
			avatar: 'https://placecats.com/100/300'
		},
		{
			name: 'Zlata',
			title: 'Art',
			description:
				'Artist of the project. She makes our project very impressive.',
			avatar: 'https://placecats.com/100/400'
		},

		{
			name: 'Stas',
			title: 'music',
			description:
				'Our music guru. He makes our project more immersive.',
			avatar: 'https://placecats.com/100/500'
		}
	];
</script>

{#snippet card(item: Person)}
	<div class="flex flex-col items-center justify-center gap-2">
		<img src={item.avatar} alt={item.name} class="size-16 rounded-full" />
		<h3 class="text-2xl font-bold">{item.name}</h3>
		<span class="text-sm text-gray-500">{item.title}</span>
		<p class="text-sm">{item.description}</p>
	</div>
{/snippet}

<div class="grid w-full grid-cols-1 gap-8">
	<h2 class="text-center text-4xl font-bold uppercase">Crew Manifest</h2>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each manifest.slice(0, 3) as item}
			{@render card(item)}
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each manifest.slice(3) as item}
			{@render card(item)}
		{/each}
	</div>
</div>
