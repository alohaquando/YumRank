<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';
	import {
		placeSrcExample,
		dishSrcExample,
		placeNameExample,
		dishNameExample,
		checkInsExample,
		ratingExample,
		favoritesExample,
		hrefExample
	} from '$lib/data/exampleData';
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
	{#each { length: 15 } as _, i}
		<LeaderboardItem
			rank={i + 1}
			restaurantSrc={$placeSrcExample}
			restaurantName={$placeNameExample}
			checkIns={$checkInsExample}
			rating={$ratingExample}
			favorites={$favoritesExample}
			href={$hrefExample}
		/>
	{/each}
</div>
