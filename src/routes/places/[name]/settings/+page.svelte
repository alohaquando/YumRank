<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import { faInfoCircle, faTrash } from '@fortawesome/pro-solid-svg-icons';

	export let data;
</script>

<LargePageTitle showBackButton>Place Settings</LargePageTitle>

<ListItem
	class="text-black"
	href="/places/{data.placeName}/settings/update"
>
	<Fa
		icon={faInfoCircle}
		slot="leading"
	/>
	<Body slot="text">Update information</Body>
</ListItem>

<Divider />

<!-- TODO: Confirm dialog -->

<ListItem
	class="text-red-500"
	on:click={() => {
		window.alert('Delete clicked');
	}}
>
	<Fa
		icon={faTrash}
		slot="leading"
	/>
	<Body slot="text">Delete restaurant</Body>
</ListItem>
