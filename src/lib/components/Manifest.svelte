<script lang="ts">
	type Person = {
		name: string;
		title: string;
		description: string;
		avatar: string;
	};

	const manifest: Person[] = [
		{
			name: 'Kikimor 1',
			title: 'CEO',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			avatar: 'https://placecats.com/100/100'
		},
		{
			name: 'Kikimor 2',
			title: 'CEO',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			avatar: 'https://placecats.com/100/100'
		},
		{
			name: 'Kikimor 3',
			title: 'CEO',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			avatar: 'https://placecats.com/100/100'
		},
		{
			name: 'Kikimor 4',
			title: 'CEO',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			avatar: 'https://placecats.com/100/100'
		},

		{
			name: 'Kikimor 5',
			title: 'CEO',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			avatar: 'https://placecats.com/100/100'
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
