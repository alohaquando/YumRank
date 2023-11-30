<script>
	import TabBar from '$lib/components/navigation/TabBar.svelte';
	import RestaurantTitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
</script>

<button class="w-full" on:click type="button">
	<TabBar class="justify-between">
		<RestaurantTitleItem></RestaurantTitleItem>
		<Fa icon={faChevronDown} class="pr-2" />
	</TabBar>
</button>