<script>
    import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
    import Divider from '$lib/components/layouts/Divider.svelte';
    import ListItem from '$lib/components/lists/ListItem.svelte';
    import Body from '$lib/components/typography/Body.svelte';
    import Fa from 'svelte-fa';
	import { faInfoCircle, faTrash } from '@fortawesome/pro-solid-svg-icons';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
</script>

<LargePageTitle showBackButton>
    Place Settings
</LargePageTitle>

<ListItem class="text-black"  href='/management/settings/update'>
<Fa icon={faInfoCircle} slot="leading" />
<Body slot="text">Update information</Body>
</ListItem>

<Divider />

<ListItem class="text-red-500"  on:click={() => {window.alert('hi')}}>
<Fa icon={faTrash} slot="leading" />
<Body slot="text">Delete restaurant</Body>
</ListItem>
