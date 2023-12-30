<script lang="ts">
	import TabBarPlaceDetail from '$lib/components/navigation/TabBarPlaceDetail.svelte';
	import { page } from '$app/stores';
	import { currentPlaceName } from '$lib/data/currentPlaceName';

	if ($page.url.pathname.split('/')[2] != 'undefined') {
		$currentPlaceName = $page.url.pathname.split('/')[2];
	}

	export let data;
</script>


<TabBarPlaceDetail currentLocation={$page.url.pathname} isOwner={data.owner} placeName={data.placeName} />
<div class="h-20" />
<slot />


