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

<div>
	<div class="flex flex-col space-y-0 py-4">
		{#if data.post}
			<Post
				content={data.post[0].content}
				imageSrcs={data.post[0].post_image_urls}
				postHref=""
				placeName={data.restaurant_name}
				placeSrc={data.restaurant_logo}
				timeStamp={convertTimestampToLocale(data.post[0].created_at)}
			/>
		{:else}
			<Body class="text-center opacity-50">No posts yet</Body>
		{/if}
	</div>
</div>

<Divider />

<!-- SEPERATED THIS WITH POST DETAIL -->
{#if data.post}
	<LargePageTitle showBackButton>Update post</LargePageTitle>
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
			label="content"
			name="content"
			placeholder="Content"
			required
			type="text"
			value={data.post[0].content}
		/>

		<ImageInput
			id="postImages"
			label="Images of your post"
			multiple
			name="postImages"
			overrideShowFilesInitially
			srcs={data.post[0].post_image_urls}
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
			type="submit">Delete</Button
		>
	</form>
{/if}

<Divider />
