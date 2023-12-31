<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
</script>

<LargePageTitle>New password</LargePageTitle>

<form class="flex-col flex space-y-8">
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
		Finish
	</Button>
</form>
