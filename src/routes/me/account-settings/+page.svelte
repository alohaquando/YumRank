<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte'
	import { href } from '$lib/data-mock/data-mock';
	import Fa from 'svelte-fa';
	import Body from '$lib/components/typography/Body.svelte';
	import { faUserCircle,faKey } from '@fortawesome/pro-regular-svg-icons';
</script>

<!--waiting for the back component-->
<div class="pt-2">
	<Button href="/me" design="outlined">Back</Button>
</div>

<LargePageTitle>Account Settings</LargePageTitle>

<div class="space-y-5">
	<ListItem href={$href}>
		<Fa icon={faUserCircle} slot="leading" />
		<Body slot="text">Update profile</Body>
	</ListItem>
	<ListItem href={$href}>
		<Fa icon={ faKey } slot="leading" />
		<Body slot="text">Update password</Body>
	</ListItem>
</div>