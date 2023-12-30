<script>
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import TabBar from '$lib/components/navigation/TabBar.svelte';
</script>

<TabBar>
	<ActionChip
		width="fit"
		href="/place-detail">Overview</ActionChip
	>
	<ActionChip
		width="fit"
		href="/place-detail/place-checkin">Check-ins</ActionChip
	>
	<ActionChip
		width="fit"
		href="/place-detail/place-posts">Posts</ActionChip
	>
</TabBar>
