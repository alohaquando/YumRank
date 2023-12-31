<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import Image from '$lib/components/media/Image.svelte';

	export let form;
	let email = 'example@gmail.com';
</script>
<LargePageTitle showBackButton>Update password</LargePageTitle>

<div class="flex-col flex space-y-6">
	<form class="flex-col flex space-y-6">
		<Body>Current password</Body>
		<TextField
			id="password"
			name="password"
			placeholder="Current password"
			type="password"
		/>
		<Divider />
		<Body>New password</Body>
		<TextField
			id="newpass"
			name="newpass"
			placeholder="New password"
			type="password"
		/>
		<Body>New password confirmation</Body>
		<TextField
			id="newpass"
			name="newpass"
			placeholder="New password confirmation"
			type="password"
		/>
	</form>

	<div class="pt-8">
		<Button
			type="submit"
			width="full">Update
		</Button
		>
	</div>
</div>
