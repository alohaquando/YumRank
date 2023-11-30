<script lang="ts">
	import TabBar from '$lib/components/navigation/TabBar.svelte';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';

	export let title: string | undefined | null = 'Title';
	export let restaurantSrc: string | undefined | null = '';
</script>

<button class="w-full" on:click type="button">
	<TabBar class="justify-between">
		<TitleItem {title} src={restaurantSrc} />
		<Fa icon={faChevronDown} class="pr-2" />
	</TabBar>
</button>
