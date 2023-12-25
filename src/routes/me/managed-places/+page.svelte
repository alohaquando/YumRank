<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';

	import {
		restaurantSrc,
		dishSrc,
		restaurantName,
		dishName,
		checkIns,
		rating,
		favorites,
		href
	} from '$lib/data-mock/data-mock.ts';
	import Button from '$lib/components/buttons/Button.svelte';
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/pro-regular-svg-icons';
	import Divider from '$lib/components/layouts/Divider.svelte';
</script>

<LargePageTitle showBackButton>
	Managed places
</LargePageTitle>

<div class="flex-col space-y-10 pb-6">
	{#each [1, 5, 8, 9, 12, 15] as i}
		<LeaderboardItem
			rank={i}
			restaurantSrc={$restaurantSrc}
			dishSrc={$dishSrc}
			restaurantName={$restaurantName}
			dishName={$dishName}
			checkIns={$checkIns}
			rating={$rating}
			favorites={$favorites}
			href={$href}
		/>
	{/each}
</div>

<div class="bg-white sticky bottom-16 py-4 border-t" >
	<Button width="full" href="/management/register-place">
		<Fa icon={faPlus} slot="icon" />
		Add a place
	</Button>
</div>

