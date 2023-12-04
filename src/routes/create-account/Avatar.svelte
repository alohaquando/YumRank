<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import Image from '$lib/components/media/Image.svelte';

	export let size = 10;
	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			const { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>


<FileInput
	bind:files
	disabled={uploading}
	id="profile-picture"
	label={uploading ? 'Uploading ...' : 'Upload your profile picture'}
	name="profile-picture"
	value={url}
	on:change={uploadAvatar}
	placeholder="Add your image"
/>

<input type="hidden" name="avatarUrl" value={url}>

{#if avatarUrl}
	<Image
		src={avatarUrl}
		alt={avatarUrl ? 'Profile picture' : 'No image'}
		class=" rounded-2xl max-w-sm mx-auto aspect-square object-cover ring-1 ring-gray-200"
	/>
{/if}

