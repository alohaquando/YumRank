<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import { userFullNameExample, userSrcExample } from '$lib/data/exampleData';

	export let form;
</script>

<LargePageTitle showBackButton>Update profile</LargePageTitle>

<div class="flex-col flex space-y-6">
	<form class="flex-col flex space-y-6">
		<Body>Email</Body>
		<TextField
			id="email"
			name="email"
			type="email"
		/>
		<Divider />
		<Body>Full name</Body>
		<TextField
			id="fullname"
			name="fullname"
			type="text"
			value={$userFullNameExample}
		/>
	</form>

	<Body>Profile picture</Body>
	<FileInput />
	<Image
		class="aspect-square"
		src={$userSrcExample}
	/>
	<Button
		type="submit"
		width="full"
	>Update
	</Button>
</div>
