<script lang="ts">
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
	} from '$lib/data/exampleData.ts';
	import Button from '$lib/components/buttons/Button.svelte';
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/pro-regular-svg-icons';
	import Divider from '$lib/components/layouts/Divider.svelte';
</script>

<LargePageTitle showBackButton>Managed places</LargePageTitle>

<div class="flex-col space-y-10 pb-6">
	{#each [1, 5, 8, 9, 12, 15] as i}
		<LeaderboardItem
			rank={i}
			restaurantSrc={$placeSrcExample}
			dishSrc={$dishSrcExample}
			restaurantName={$placeNameExample}
			dishName={$dishNameExample}
			checkIns={$checkInsExample}
			rating={$ratingExample}
			favorites={$favoritesExample}
			href={$hrefExample}
		/>
	{/each}
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
