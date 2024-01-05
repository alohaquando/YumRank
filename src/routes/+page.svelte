<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';
	import { favoritesExample } from '$lib/data/exampleData';

	export let data;
</script>

<LargePageTitle>
	Popular this
	<TitleDropdown
		id="time_selected"
		name="time_selected"
		slot="trailing"
		value="week"
	/>
</LargePageTitle>

<div class="flex flex-col space-y-10">
	{#if data.restaurants}
		{#each data.restaurants as place, i}
			<LeaderboardItem
				rank={i + 1}
				restaurantSrc={place.res_images != null ? place.res_images[0] : ''}
				restaurantName={place.name}
				checkIns={place.numReviews}
				rating={place.avgRating}
				favorites={place.favorite_count}
				href="/places/{place.name}"
			/>
		{/each}
	{/if}
</div>
