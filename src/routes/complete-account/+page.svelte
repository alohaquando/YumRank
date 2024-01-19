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
	import ErrorCard from '$lib/components/cards/FormStatusCard.svelte';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';
	import LoadingOverlay from '$lib/components/layouts/LoadingOverlay.svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	let isLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
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

<LoadingOverlay bind:isLoading />
<LargePageTitle>Complete your account</LargePageTitle>

<div class="form-widget flex-col flex space-y-6">
	<form
		action="?/update"
		class="form-widget flex-col flex space-y-8"
		enctype="multipart/form-data"
		method="POST"
		use:enhance={handleSubmit}
	>
	{#if form}
		<ErrorCard
			title="Failed to update account"
			message={form.message}
			failed={form.failed}
		/>
	{/if}

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
			value={fullName}
		/>
		<TextField
			id="username"
			label="Username"
			name="username"
			placeholder="Username"
			type="text"
			value={username}
		/>

		<ImageInput
			id="avatar_url"
			label="Profile picture"
			name="avatar_url"
			overrideShowFilesInitially
			srcs={[avatarUrl]}
		/>

		<!--		<Avatar-->
		<!--			bind:url={avatarUrl}-->
		<!--			on:upload={() => profileForm.requestSubmit()}-->
		<!--			size={10}-->
		<!--			{supabase}-->
		<!--		/>-->

		<Button
			disabled={isLoading}
			type="submit"
			width="full">{isLoading ? 'Loading...' : 'Update'}</Button
		>
	</form>

	<!--	<form action="?/signout" method="POST" use:enhance={handleSignOut}>-->
	<!--		<div>-->
	<!--			<Button disabled={isLoading} class="w-full">Sign Out</Button>-->
	<!--		</div>-->
	<!--	</form>-->
</div>
