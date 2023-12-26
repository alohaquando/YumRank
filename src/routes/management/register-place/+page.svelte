<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import { enhance } from '$app/forms';
	import ImageInput from '$lib/components/inputs/ImageInput.svelte';
	import Fa from 'svelte-fa';

	export let data;
	export let form;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let restaurantForm: HTMLFormElement;
	let name: string;
	let address: string;
	let description: string;
	let logoUrl: undefined;
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
	enctype="multipart/form-data"
	method="post"
	use:enhance={handleSubmit}
>
	<ImageInput bind:bucketUrls={logoUrl} name="logoUrl" id="logo" label="Logo" supabase={supabase} bucket="logo"/>

	<ImageInput bind:bucketUrls={restaurantImages} name="restaurantImages" id="resimages" label="Images of your place" multiple supabase={supabase} bucket="resimages"/>

	<Title>Info</Title>

	<TextField bind:value={name} id="name" label="Name" name="name" placeholder="Name" type="text" />
	<TextField
		bind:value={address}
		id="address"
		label="Address"
		name="address"
		placeholder="Address"
		type="text"
	/>
	
	<p>{logoUrl}</p>
	<p>{restaurantImages}</p>
	<TextField
		bind:value={description}
		id="description"
		label="Description"
		name="description"
		placeholder="Description"
		type="text"
	/>

	<!-- Probably create component for the 3 input field -->

	<!-- <FileInput id="logoUrl" label="Logo" name="logoUrl" bind:url={logoUrl} />
	<FileInput id="restaurantImages" label="Restaurant Images" name="restaurantImages" bind:urls={restaurantImages} multiple />
	<FileInput id="menuImages" label="Menu Images" name="menuImages" bind:urls={menuImages} multiple /> -->
	<Button disabled={loading} type="submit">{loading ? 'Loading...' : 'Create'}</Button>
</form>
