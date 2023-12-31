<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { enhance } from '$app/forms';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';
	import ErrorCard from '$lib/components/cards/FormStatusCard.svelte';
	import LoadingOverlay from '$lib/components/layouts/LoadingOverlay.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';

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

<div class="flex flex-col pb-8 space-y-4 pointer-events-none">
	<Body class="opacity-75">Posting as</Body>
	<TitleItem
		src={data.restaurant.logo_url}
		title={data.placeName}
	/>
	<Divider />
</div>

<form
	action="?/create"
	class="flex flex-col form-widget space-y-10"
	enctype="multipart/form-data"
	method="POST"
	use:enhance={handleSubmit}
>
	{#if form}
		<ErrorCard
			title="Failed to add post"
			message={form.message}
			failed={form.failed}
		/>
	{/if}

	<ImageInput
		id="post_images"
		label="Images"
		multiple
		name="post_images"
	/>

	<TextArea
		id="content"
		label="Content"
		name="content"
		placeholder="Share something interesting..."
	/>

	<Button
		disabled={isLoading}
		type="submit"
		width="full">{isLoading ? 'Loading...' : 'Post'}</Button
	>
</form>
