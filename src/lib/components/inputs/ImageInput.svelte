<script lang="ts">
	import Fa from 'svelte-fa';
	import { faImage, faImages } from '@fortawesome/pro-light-svg-icons';
	import { faImage as faImageRegular, faTimes, faUp } from '@fortawesome/pro-regular-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import { SupabaseClient } from '@supabase/supabase-js';

	export let id: string | undefined | null;
	export let name: string | undefined | null;
	export let multiple: boolean = false;
	export let label: string | null | undefined = null;
	export let bucket: 'resimages' | 'resmenu' | 'avatars' | 'logo' | 'postimages' | 'testing';
	export let supabase: SupabaseClient;
	export let bucketUrls: string[] = [];

	let srcs: unknown[] = [];
	let inputElement: HTMLInputElement;
	let files: FileList | undefined;
	let isUploading = false;

	function onChange() {
		if (!multiple) {
			srcs = [];
		}
		if (files) {
			for (let i = 0; i < files.length; i++) {
				const reader = new FileReader();
				reader.onload = function() {
					srcs.push(reader.result);
					srcs = srcs;
				};
				reader.readAsDataURL(files[i]);
			}
		}
	}

	function clearSelected() {
		files = undefined;
		srcs = [];
		inputElement.value = '';
	}

	async function uploadSelected() {
		try {
			isUploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			for (let i = 0; i < files.length; i++) {
				const file = files[0];
				const fileExt = file.name.split('.').pop();
				const filePath = `${Math.random()}.${fileExt}`;

				const { error } = await supabase.storage.from(bucket).upload(filePath, file);

				if (error) {
					throw error;
				}

				const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
				bucketUrls.push(data);
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				alert(error.message);
			}
		} finally {
			bucketUrls = bucketUrls;
			isUploading = false;
		}
	}
</script>


<div
	class="relative flex w-full flex-col gap-4 overflow-clip rounded-3xl p-4 text-center ring-1 ring-gray-300"
>
	{#if label}
		<Title class="py-2 text-left">{label}</Title>
	{/if}
	{#if files === undefined}
		<label
			class="flex aspect-square h-48 flex-col items-center justify-center rounded-2xl border-2 border-dotted border-gray-300 transition space-y-4 hover:bg-red-50"
			for={id}
		>
			<Fa class="text-6xl opacity-40" icon={multiple ? faImages : faImage} />
			<Body class="px-8 opacity-40">Choose {multiple ? 'images' : 'an image'} to upload</Body>
		</label>
	{:else}
		<div
			class="w-full grid grid-cols-4 grid-flow-row [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2 gap-4 ">
			{#each srcs as src}
				<img
					class="aspect-square h-full w-full rounded-2xl object-scale-down ring-1 ring-gray-300"
					src={src}
					alt=""
				/>
			{/each}
		</div>
		<Divider />
		<div class="flex w-full items-center justify-center space-x-2">
			<label for={id} class="cursor-pointer rounded-full transition hover:bg-red-50 hover:text-red-500">
				<Button design="text" class="pointer-events-none">
					<Fa icon={faImageRegular} slot="icon" />
					Change
				</Button>
			</label>
			<Button design="text" on:click={() => clearSelected()}>
				<Fa icon={faTimes} slot="icon" />
				Remove
			</Button>
			<Button design="tonal" on:click={() => uploadSelected()} disabled={isUploading}>
				<Fa icon={faUp} slot="icon" />
				{isUploading ? "Uploading..." : "Test upload"}
			</Button>
		</div>
		{#each bucketUrls as url}
			{url.publicUrl}
			<br/>
		{/each}
	{/if}

</div>

<input
	accept="image/png, image/jpeg"
	bind:files
	bind:this={inputElement}
	class="hidden"
	{id}
	{multiple}
	{name}
	on:change={() => {
			onChange();
		}}
	on:submit={() => {
			uploadSelected();
		}}
	type="file"
/>