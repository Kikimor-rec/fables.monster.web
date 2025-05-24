<script lang="ts">
	const manifest = [
		{
			title: 'Integrity',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			icon: 'https://placecats.com/100/100'
		},
		{
			title: 'Accuracy    ',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			icon: 'https://placecats.com/100/100'
		},
		{
			title: 'Creativity',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			icon: 'https://placecats.com/100/100'
		},
		{
			title: 'Fun',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			icon: 'https://placecats.com/100/100'
		},
		{
			title: 'Quality',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			icon: 'https://placecats.com/100/100'
		},
		{
			title: 'Responsibility',
			description:
				'We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and applications.',
			icon: 'https://placecats.com/100/100'
		}
	];
</script>

<div class="grid w-full grid-cols-1 gap-8">
	<h2 class="text-center text-4xl font-bold uppercase">Crew Manifest</h2>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each manifest as item}
			<div class="flex flex-col items-center justify-center gap-2">
				<img src={item.icon} alt={item.title} class="size-16" />
				<h3 class="text-2xl font-bold">{item.title}</h3>
				<p class="text-sm">{item.description}</p>
			</div>
		{/each}
	</div>
</div>
