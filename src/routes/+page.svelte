<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';

	let options = {
		day: { value: 'day', title: 'day' },
		week: { value: 'week', title: 'week' },
		month: { value: 'month', title: 'month' },
		year: { value: 'year', title: 'year' }
	};

	let restaurantSrc =
		'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	let dishSrc =
		'https://media.istockphoto.com/id/1422866960/photo/seared-foie-gras.webp?b=1&s=170667a&w=0&k=20&c=OE-eBOGn69F0eIUU1nsGN5JBiOfUDvvN2XqxWaZf8ag=';
	let restaurantName = "Hell's Kitchen";
	let dishName = 'Foie Gras';
	let checkIns = 5489;
	let rating = 4.5;
	let favorites = 84;
	let href = '/';

</script>

<LargePageTitle>
	Popular this
	<TitleDropdown id="time_selected" name="time_selected" {options} slot="trailing" value="week" />
</LargePageTitle>

<div class="flex flex-col space-y-10">
	{#each { length: 15 } as _, i}
		<LeaderboardItem
			rank={i + 1}
			{restaurantSrc}
			{dishSrc}
			{restaurantName}
			{dishName}
			{checkIns}
			{rating}
			{favorites}
			{href}
		/>
	{/each}
</div>

