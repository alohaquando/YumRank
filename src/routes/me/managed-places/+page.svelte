<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
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
	import Button from '$lib/components/buttons/Button.svelte';
	import { faPlus } from '@fortawesome/pro-regular-svg-icons';

	export let data;
</script>

<LargePageTitle showBackButton>Managed places</LargePageTitle>

<div class="flex-col space-y-10 pb-6">
	{#if data.myPlaces}
		{#each data.myPlaces as place, i}
			<!--	TODO: Get actual ranking AND favorite count -->
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

<div class="bg-white sticky bottom-16 py-4 border-t">
	<Button
		href="/add-place"
		width="full"
	>
		<Fa
			icon={faPlus}
			slot="icon"
		/>
		Add a place
	</Button>
</div>
