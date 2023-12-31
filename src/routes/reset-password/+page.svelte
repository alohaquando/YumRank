<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Body from '$lib/components/typography/Body.svelte';
</script>

<LargePageTitle showBackButton>Reset my password</LargePageTitle>

<form class="flex-col flex space-y-8">
	<Body class="opacity-50"
		>Enter your email address below. If the email address is registered, a password reset link will
		be sent to it.
	</Body>

	<TextField
		id="email"
		label="Registered email"
		name="email"
		placeholder="Email"
		type="email"
	/>

	<Button
		type="submit"
		width="full"
	>
		Reset my password
	</Button>
</form>
