<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
</script>

<LargePageTitle showBackButton>Update password</LargePageTitle>

<form class="flex-col flex space-y-8">
	<TextField
		error={false}
		errorMessage="This does not match your current password"
		id="current_password"
		label="Current password"
		name="current_password"
		placeholder="Current password"
		type="password"
	/>

	<Divider />

	<TextField
		error={false}
		errorMessage="The new password does not match the required format"
		id="new_password"
		label="New password"
		name="new_password"
		placeholder="New password"
		type="password"
	/>

	<TextField
		error={false}
		errorMessage="The confirmation does not match the new password"
		id="new_password_confirmation"
		label="New password confirmation"
		name="new_password_confirmation"
		placeholder="New password confirmation"
		type="password"
	/>

	<Button
		type="submit"
		width="full"
	>
		Update
	</Button>
</form>
