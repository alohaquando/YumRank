<script>
	import TextField from '$lib/components/inputs/TextField.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';
	import {
		checkInsExample,
		favoritesExample,
		hrefExample,
		placeNameExample,
		placeSrcExample, ratingExample
	} from '$lib/data/exampleData';
	import Body from '$lib/components/typography/Body.svelte';
</script>

<div class="py-8">
	<TextField
		autofocus
		id="search"
		name="search"
		on:change={() => {}}
		placeholder="Search"
		type="search"
	/>
</div>
<div class="flex flex-col space-y-6">
	<!--	TODO: Implement search-->
	<!--	NOTE: Keep rank as a number higher than 5 for the correct layout -->
	{#each { length: 3 } as _}
		<LeaderboardItem showRank={false}
										 rank={6}
										 restaurantSrc={$placeSrcExample}
										 restaurantName={$placeNameExample}
										 checkIns={$checkInsExample}
										 rating={$ratingExample}
										 favorites={$favoritesExample}
										 href="/places/{$hrefExample}"></LeaderboardItem>
	{/each}
	<!--	TODO: Implement empty state -->
	<!--	<Body class="opacity-50 text-center">No results</Body>-->
</div>