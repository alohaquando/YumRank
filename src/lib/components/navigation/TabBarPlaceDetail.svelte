<script lang="ts">
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import TabBar from '$lib/components/navigation/TabBar.svelte';
	import { currentPlaceName } from '$lib/data/currentPlaceName';
	import { page } from '$app/stores';

	export let placeName: string;
	export let currentLocation: string;
	export let isOwner = false;
</script>

<TabBar>
	<ActionChip
		design={currentLocation.endsWith(placeName) ? 'tonal' : 'outlined'}
		href="/places/{placeName}"
		width="fit"
	>Overview
	</ActionChip
	>
	<ActionChip
		design={currentLocation.endsWith(placeName + '/check-ins') ? 'tonal' : 'outlined'}
		href="/places/{placeName}/check-ins"
		width="fit">Check-ins
	</ActionChip
	>
	<ActionChip
		design={currentLocation.endsWith(placeName + '/posts') ? 'tonal' : 'outlined'}
		href="/places/{placeName}/posts"
		width="fit">Posts
	</ActionChip>
	{#if isOwner}
		<ActionChip
			design={currentLocation.endsWith(placeName + '/settings') ? 'tonal' : 'outlined'}
			href="/places/{placeName}/settings"
			width="fit">Settings
		</ActionChip>
	{/if}
</TabBar>


