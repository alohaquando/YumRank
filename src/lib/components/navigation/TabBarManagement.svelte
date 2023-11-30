<script>
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import TabBar from '$lib/components/navigation/TabBar.svelte';
</script>

<TabBar>
	<ActionChip width="fit" href="/management/today">Today</ActionChip>
	<ActionChip width="fit" href="/">Posts</ActionChip>
	<ActionChip width="fit" href="/">Discounts</ActionChip>
	<ActionChip width="fit" href="/">All check-ins</ActionChip>
	<ActionChip width="fit" href="/">Settings</ActionChip>
</TabBar>
