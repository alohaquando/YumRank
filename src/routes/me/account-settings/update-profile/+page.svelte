<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';

	export let data;
</script>

<LargePageTitle showBackButton>Update profile</LargePageTitle>

<form class="flex-col flex space-y-8">
	<TextField
		id="email"
		label="Email"
		name="email"
		placeholder="Email"
		type="email"
		value={data.session.user.email}
	/>

	<TextField
		id="full_name"
		label="Full name"
		name="full_name"
		placeholder="Full name"
		type="text"
		value={data.myProfile?.full_name}
	/>

	<ImageInput
		id="avatar"
		label="Profile picture"
		name="avatar"
		overrideShowFilesInitially
		srcs={[data.myProfile?.avatar_url]}
	/>

	<Button
		type="submit"
		width="full"
	>
		Update
	</Button>
</form>
