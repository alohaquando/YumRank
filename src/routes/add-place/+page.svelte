<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { enhance } from '$app/forms';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';
	import ErrorCard from '$lib/components/cards/FormStatusCard.svelte';
	import LoadingOverlay from '$lib/components/layouts/LoadingOverlay.svelte';

	export let data;
	export let form;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let isLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	};
</script>

<LoadingOverlay bind:isLoading />

<LargePageTitle showBackButton>Add a place</LargePageTitle>
<form
	action="?/create"
	class="flex flex-col form-widget space-y-10"
	enctype="multipart/form-data"
	method="POST"
	use:enhance={handleSubmit}
>
	{#if form}
		<ErrorCard
			title="Failed to update place"
			message={form.message}
			failed={form.failed}
		/>
	{/if}

	<TextField
		id="name"
		label="Name"
		name="name"
		pattern="[a-zA-Z0-9 ]*"
		placeholder="Name"
		required
		type="text"
	/>

	<TextField
		id="address"
		label="Address"
		name="address"
		placeholder="Address"
		required
		type="text"
	/>

	<TextField
		id="description"
		label="Description"
		name="description"
		placeholder="Description"
		required
		type="text"
	/>

	<ImageInput
		id="logo"
		label="Logo"
		name="logoUrl"
	/>

	<ImageInput
		id="resimages"
		label="Images of your place"
		multiple
		name="restaurantImages"
	/>

	<Button
		disabled={isLoading}
		type="submit"
		width="full">{isLoading ? 'Loading...' : 'Create'}</Button
	>
</form>
