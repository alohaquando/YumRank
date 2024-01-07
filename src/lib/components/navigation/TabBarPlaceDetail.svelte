<script lang="ts">
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import TabBar from '$lib/components/navigation/TabBar.svelte';

	export let placeName: string;
	placeName = placeName.replace(/ /g, '%20');

	export let currentLocation: string;
	export let isOwner = false;

	console.log(currentLocation);
	console.log(placeName);
</script>

<TabBar>
	<ActionChip
		design={currentLocation.endsWith(placeName) ? 'tonal' : 'outlined'}
		href="/places/{placeName}"
		width="fit"
	>Overview
	</ActionChip>
	<ActionChip
		design={currentLocation.includes(placeName + '/check-ins') ? 'tonal' : 'outlined'}
		href="/places/{placeName}/check-ins"
		width="fit"
	>Check-ins
	</ActionChip>
	<ActionChip
		design={currentLocation.includes(placeName + '/posts') ? 'tonal' : 'outlined'}
		href="/places/{placeName}/posts"
		width="fit"
	>Posts
	</ActionChip>
	{#if isOwner}
		<ActionChip
			design={currentLocation.includes(placeName + '/settings') ? 'tonal' : 'outlined'}
			href="/places/{placeName}/settings"
			width="fit"
		>Settings
		</ActionChip>
	{/if}
</TabBar>
