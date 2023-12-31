<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faImage, faImages } from '@fortawesome/pro-light-svg-icons';
	import { faImage as faImageRegular, faTimes } from '@fortawesome/pro-regular-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Title from '$lib/components/typography/Title.svelte';

	export let id: string | undefined | null;
	export let name: string | undefined | null;
	export let multiple: boolean = false;
	export let label: string | null | undefined = null;
	export let required: boolean = false;
	export let overrideShowFilesInitially: boolean = false;

	export let srcs: string[] = [];
	let inputElement: HTMLInputElement;
	let files: FileList | undefined;

	function onChange() {
		overrideShowFilesInitially = false;
		srcs = [];
		if (files) {
			for (let i = srcs.length; i < files.length + srcs.length; i++) {
				const reader = new FileReader();
				reader.onload = function () {
					if (reader.result !== null) {
						srcs.push(reader.result as string);
					}
					srcs = srcs;
				};
				reader.readAsDataURL(files[i]);
			}
		}
	}

	function clearSelected() {
		overrideShowFilesInitially = false;
		files = undefined;
		srcs = [];
		inputElement.value = '';
	}
</script>

<div
	class="relative flex w-full flex-col gap-4 overflow-clip rounded-3xl p-4 text-center ring-1 ring-gray-300"
>
	{#if label}
		<Title class="py-2 text-left">{label}</Title>
	{/if}
	{#if files === undefined && !overrideShowFilesInitially}
		<label
			class="flex aspect-square h-48 flex-col items-center justify-center rounded-2xl border-2 border-dotted border-gray-300 transition space-y-4 hover:bg-red-50"
			for={id}
		>
			<Fa
				class="text-6xl opacity-40"
				icon={multiple ? faImages : faImage}
			/>
			<Body class="px-8 opacity-40">Choose {multiple ? 'images' : 'an image'} to upload</Body>
		</label>
	{:else}
		<div
			class="w-full grid grid-cols-4 grid-flow-row [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2 gap-4 relative"
		>
			{#each srcs as src}
				<img
					class="aspect-square h-auto w-full rounded-2xl object-scale-down ring-1 ring-gray-300"
					{src}
					alt=""
				/>
			{/each}
		</div>
		<Divider />
		<div class="flex w-full items-center justify-center space-x-2">
			<label
				for={id}
				class="cursor-pointer rounded-full transition hover:bg-red-50 hover:text-red-500"
			>
				<Button
					design="text"
					class="pointer-events-none"
				>
					<Fa
						icon={faImageRegular}
						slot="icon"
					/>
					Change
				</Button>
			</label>
			<Button
				design="text"
				on:click={() => clearSelected()}
			>
				<Fa
					icon={faTimes}
					slot="icon"
				/>
				Remove
			</Button>
		</div>
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
	{required}
	type="file"
/>
