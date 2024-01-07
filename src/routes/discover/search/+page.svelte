<script lang="ts">
	import { onMount } from 'svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import LeaderboardItem from '$lib/components/leaderboard/LeaderboardItem.svelte';

	interface searchResult extends Response {
		logo_url: string;
		name: string;
		numReviews: number;
		avgRating: number;
		favorite_count: number;
	}

	let searchTerm = '';
	let searchResults: searchResult[] = []; // Store search results

	async function fetchData() {
		try {
			const response = await fetch(`/discover/search?q=${searchTerm}`);
			searchResults = await response.json(); // Store fetched search results
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	// Fetch data when the component is mounted
	onMount(() => {
		fetchData();
	});
</script>

<div class="py-8">
	<TextField
		autofocus
		bind:value={searchTerm}
		id="search"
		name="search"
		on:input={fetchData}
		placeholder="Search"
		type="search"
	/>
</div>
<div class="flex flex-col space-y-6">
	{#each searchResults as result}
		<LeaderboardItem
			showRank={false}
			rank={6}
			restaurantSrc={result.logo_url}
			restaurantName={result.name}
			checkIns={result.numReviews}
			rating={result.avgRating}
			favorites={result.favorite_count}
			href={`/places/${result.name}`}
		/>
	{/each}
	{#if searchResults.length === 0}
		<!-- Display a message when there are no search results -->
		<p>No results found</p>
	{/if}
</div>
