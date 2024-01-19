<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import { faUserCircle, faKey } from '@fortawesome/pro-regular-svg-icons';
</script>

<LargePageTitle showBackButton>Account Settings</LargePageTitle>

<div class="">
	<ListItem href="/complete-account">
		<Fa
			icon={faUserCircle}
			slot="leading"
		/>
		<Body slot="text">Update profile</Body>
	</ListItem>
	
</div>
