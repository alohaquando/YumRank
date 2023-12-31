<script lang="ts">
	import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	export let id: string | undefined;
	export let name: string | undefined;
	export let placeholder: string | undefined = 'Select an image';
	export let accept: string | undefined = 'image/png, image/jpeg';
	export let files: FileList | null = null;
	export let disabled: boolean = false;
	export let label: string | undefined = undefined;
	export let error: boolean = false;
	export let errorMessage: string | undefined = 'Please check this input again';
	export let value: any = undefined;
	export let multiple: boolean = false;
</script>

<div class="flex flex-col w-full">
	{#if label}
		<label
			class="block mb-2 text-sm font-sans trim-both pb-4"
			for={id}>{label}</label
		>
	{/if}
	<input
		{accept}
		bind:files
		class="rounded-full border border-gray-300 w-full placeholder-black/50 block transition outline-none text-black font-sans trim-both
	file:rounded-full file:outline file:outline-1 file:outline-gray-300 file:hover:bg-red-50 file:bg-white file:px-4 file:border-0 file:transition file:py-2.5 file:me-4 file:mr-40
		focus:ring-black/70 focus:ring-2
		disabled:bg-black/5
		disabled:placeholder-black/20 disabled:text-black/50
"
		{id}
		{name}
		{placeholder}
		on:change
		{disabled}
		{multiple}
		type="file"
		bind:value
	/>
	{#if error}
		<div class="flex space-x-2 items-center text-red-300 pt-4">
			<Fa icon={faExclamationCircle} />
			<label
				class="block mb-2 text-sm font-sans trim-both"
				for={id}>{errorMessage}</label
			>
		</div>
	{/if}
</div>
