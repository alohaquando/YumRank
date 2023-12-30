<script lang="ts">
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import TabBar from '$lib/components/navigation/TabBar.svelte';
	import { currentPlaceName } from '$lib/data/currentPlaceName';
	import { page } from '$app/stores';

	let placeName: string;
	$: placeName = $currentPlaceName;
	let currentLocation: string;
	$: currentLocation = $page.url.pathname;
</script>

<TabBar>
	<ActionChip
		design={currentLocation?.endsWith(placeName) ? 'tonal' : 'outlined'}
		href="/places/{placeName?.toString()}"
		width="fit"
	>Overview
	</ActionChip
	>
	<ActionChip
		design={currentLocation?.endsWith(placeName + '/check-ins') ? 'tonal' : 'outlined'}
		href="/places/{placeName?.toString()}/check-ins"
		width="fit">Check-ins
	</ActionChip
	>
	<ActionChip
		design={currentLocation?.endsWith(placeName + '/posts') ? 'tonal' : 'outlined'}
		href="/places/{placeName?.toString()}/posts"
		width="fit">Posts
	</ActionChip>
</TabBar>

<div class="h-14" />
