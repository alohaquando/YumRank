<script>
	import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';

	export let data;
</script>

<LargePageTitle showBackButton>Favorite places</LargePageTitle>

<!-- TODO: Replace with correct data -->
<Body class="py-8">NOTE: This is myManagedPlaces and NOT myFavorites. Please replace with correct data, then delete this
line. Thanks 🥺
</Body>
<div class="flex flex-col space-y-6">
	{#if data.myPlaces}
		{#each data.myPlaces as place}
			<TitleItem
				href="/places/{place.name}"
				trailingMoreIcon={true}
				title={place.name}
				src={place.logo_url}
			/>
		{/each}
	{/if}
</div>