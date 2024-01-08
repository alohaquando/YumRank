<script lang="ts">
	// noinspection ES6UnusedImports
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { enhance } from '$app/forms';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';
	import ErrorCard from '$lib/components/cards/FormStatusCard.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Post from '$lib/components/posts/Post.svelte';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';
	import Body from '$lib/components/typography/Body.svelte';
	import LoadingOverlay from '$lib/components/layouts/LoadingOverlay.svelte';

	export let data;
	export let form;

	let { session, supabase, restaurant } = data;
	$: ({ session, supabase, restaurant } = data);

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

<!-- SEPERATED THIS WITH POST DETAIL -->
{#if data.post}
	<LargePageTitle showBackButton>Edit post</LargePageTitle>
	<div class="flex flex-col space-y-6">
		<form
			action="?/update"
			class="flex flex-col form-widget space-y-10"
			enctype="multipart/form-data"
			method="POST"
			use:enhance={handleSubmit}
		>
			{#if form}
				<ErrorCard
					title="Failed to update post"
					message={form.message}
					failed={form.failed}
				/>
			{/if}

			<TextField
				id="content"
				label="Content"
				name="content"
				placeholder="Content"
				required
				type="text"
				value={data.post.content}
			/>

			<ImageInput
				id="postImages"
				label="Images of your post"
				multiple
				name="postImages"
				overrideShowFilesInitially
				srcs={data.post.post_image_urls}
			/>

			<Button
				disabled={isLoading}
				type="submit"
				width="full">{isLoading ? 'Loading...' : 'Update'}</Button
			>
		</form>

		<Divider />

		<form
			action="?/delete"
			class="form-widget flex-col flex space-y-8"
			enctype="multipart/form-data"
			method="POST"
		>
			<Button
				class="w-full"
				type="submit">Delete post
			</Button
			>
		</form>
	</div>
{/if}
