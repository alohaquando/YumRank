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


<div class="flex flex-col space-y-6">
	{#if data.places}
		{#each data.places as place}
			<TitleItem
				href="/places/{place.name}"
				trailingMoreIcon={true}
				title={place.name}
				src={place.logo_url}
			/>
		{/each}
	{/if}
</div>
