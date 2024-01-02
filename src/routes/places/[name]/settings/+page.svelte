<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import { faInfoCircle, faTrash } from '@fortawesome/pro-solid-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';

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

<!-- <ListItem
    class="text-red-500"
on:click={() => data.placeName && deleteRestaurant(data.placeName)}
>
    <Fa
        icon={faTrash}
        slot="leading"
    />
    <Body slot="text">Delete restaurant</Body>
</ListItem> -->

<form
	action="?/delete"
	class="form-widget flex-col flex space-y-8"
	enctype="multipart/form-data"
	method="POST"
>
	<Button
		class="w-full"
		type="submit">Delete</Button
	>
</form>
