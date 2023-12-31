<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';
	import {
		favoritesExample
	} from '$lib/data/exampleData';

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
		{#each data.restaurants as restaurant, i}
			<!--	TODO: Get actual ranking AND favorite count -->
			<LeaderboardItem
				rank={i + 1}
				restaurantSrc={restaurant.res_images != null ? restaurant.res_images[0]: ""}
				restaurantName={restaurant.name}
				checkIns={restaurant.numReviews}
				rating={restaurant.avgRating}
				favorites={$favoritesExample}
				href="/places/{restaurant.name}"
			/>
		{/each}
	{/if}
</div>
