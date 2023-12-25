<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import { enhance } from '$app/forms';
	import Body from '$lib/components/typography/Body.svelte';
	import Fa from 'svelte-fa';
	import { faImage } from '@fortawesome/pro-light-svg-icons';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faTimes } from '@fortawesome/pro-regular-svg-icons';

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

	let input: HTMLInputElement;
	let image: HTMLElement;
	let showImage = false;
	let file;

	function onChange() {
		file = input.files[0];

		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);
			reader.removeEventListener('load', function () {
				image.setAttribute('src', reader.result);
			});
		}
	}

	function clearImage() {
		showImage = false;
		//
		// const reader = new FileReader();
		// reader.addEventListener("load", function () {
		// 	image.setAttribute("src", reader.result);
		// });
		// reader.readAsDataURL(" ");

		console.log('hi');
	}
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
	<Title>Logo</Title>

	<div
		class="w-full h-64 rounded-3xl ring-1 ring-gray-300 text-center flex items-center justify-center overflow-clip p-4 relative"
	>
		{#if showImage}
			<img
				bind:this={image}
				src=""
				class="ring-1 ring-gray-300 rounded-2xl aspect-square h-full object-cover hover:brightness-75 transition"
				alt="Preview"
			/>
			<div class="absolute top-0 right-0 p-2 flex justify-end z-10">
				<IconButton on:click={clearImage}><Fa icon={faTimes} /></IconButton>
			</div>
		{:else}
			<label
				class="ring-1 ring-gray-300 rounded-2xl aspect-square h-full flex flex-col space-y-4 items-center justify-center hover:bg-red-50 transition"
				for="logo"
			>
				<Fa class="text-6xl opacity-40 " icon={faImage} />
				<Body class="opacity-40 px-8">Choose an image to upload</Body>
			</label>
		{/if}
	</div>

	<input
		accept="image/png, image/jpeg"
		class="hidden"
		id="logo"
		name="logo"
		placeholder="Upload logo"
		type="file"
		bind:this={input}
		on:change={() => {
			onChange();
		}}
	/>

	<!--	<FileInput id="logo"-->
	<!--						 name="logo"-->
	<!--						 label="Logo"/>-->

	<!--	<FileInput id="place_images"-->
	<!--						 name="place_images"-->
	<!--						 label="Images of your place"-->
	<!--	multiple={true}/>-->

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
