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

<LargePageTitle showBackButton>Add a post</LargePageTitle>
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

	<ImageInput
		id="post_images"
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
