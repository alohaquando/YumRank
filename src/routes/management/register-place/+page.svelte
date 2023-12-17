<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let restaurantForm: HTMLFormElement;
	let name: string;
	let address: string;
	let description: string;
	let logoUrl: string;
	let restaurantImages: string[];
	let menuImages: string[];
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<LargePageTitle showBackButton>Add a place</LargePageTitle>

<form
		action="?/create"
		bind:this={restaurantForm}
		class="form-widget flex-col flex space-y-8"
		method="post"
		enctype="multipart/form-data"
		use:enhance={handleSubmit}
	>
	<Title>Logo</Title>

	<input
		accept="image/png, image/jpeg"
		class="rounded-full border border-gray-300 pr-4 placeholder-black/50 block w-full transition outline-none text-black font-sans trim-both
	file:rounded-full file:outline file:outline-1 file:outline-gray-300 file:hover:bg-red-50 file:bg-white file:px-4 file:border-0 file:transition file:py-2.5 file:me-4
		focus:ring-black/70 focus:ring-2
		disabled:bg-black/5
		disabled:placeholder-black/20 disabled:text-black/50
"
		id="logo"
		name="logo"
		type="file"
		placeholder="Upload logo"
		multiple={true}
	/>

	<Title>Info</Title>

	<TextField id="name" label="Name" name="name" placeholder="Name" type="text" bind:value={name} />
    <TextField id="address" label="Address" name="address" placeholder="Address" type="text" bind:value={address} />
    <TextField id="description" label="Description" name="description" placeholder="Description" type="text" bind:value={description} />

<!-- Probably create component for the 3 input field -->

<!-- <FileInput id="logoUrl" label="Logo" name="logoUrl" bind:url={logoUrl} />
<FileInput id="restaurantImages" label="Restaurant Images" name="restaurantImages" bind:urls={restaurantImages} multiple />
<FileInput id="menuImages" label="Menu Images" name="menuImages" bind:urls={menuImages} multiple /> -->
<Button disabled={loading} type="submit">{loading ? 'Loading...' : 'Create'}</Button>
</form>

