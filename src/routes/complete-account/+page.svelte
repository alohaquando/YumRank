<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import Avatar from './Avatar.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	// const handleSignOut: SubmitFunction = () => {
	// 	isLoading = true;
	// 	return async ({ update }) => {
	// 		isLoading = false;
	// 		update();
	// 	};
	// };
</script>

<LargePageTitle>Complete your account</LargePageTitle>

<div class="form-widget flex-col flex space-y-6">
	<form
		action="?/update"
		bind:this={profileForm}
		class="form-widget flex-col flex space-y-8"
		enctype="multipart/form-data"
		method="POST"
		use:enhance={handleSubmit}
	>
		<TextField
			id="email"
			label="Email"
			name=""
			placeholder="Email"
			readonly
			type="text"
			value={session.user.email}
		/>

		<Divider />

		<TextField
			id="fullName"
			label="Full Name"
			name="fullName"
			placeholder="Full Name"
			type="text"
			value={form?.fullName ?? fullName}
		/>
		<TextField
			id="username"
			label="Username"
			name="username"
			placeholder="Username"
			type="text"
			value={form?.username ?? username}
		/>

		<ImageInput
			id="avatar_url"
			label="Profile picture"
			multiple
			name="avatar_url"
			overrideShowFilesInitially
			srcs={session.user.user_metadata.avatar_url ?? ''}
		/>

		<!--		<Avatar-->
		<!--			bind:url={avatarUrl}-->
		<!--			on:upload={() => profileForm.requestSubmit()}-->
		<!--			size={10}-->
		<!--			{supabase}-->
		<!--		/>-->

		<Button
			class="w-full"
			disabled={loading}
			type="submit">{loading ? 'Loading...' : 'Update'}</Button
		>
	</form>

	<!--	<form action="?/signout" method="POST" use:enhance={handleSignOut}>-->
	<!--		<div>-->
	<!--			<Button disabled={isLoading} class="w-full">Sign Out</Button>-->
	<!--		</div>-->
	<!--	</form>-->
</div>
