<script lang="ts">
	import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	export let id: string;
	export let placeholder: string;
	export let name: string;
	export let label: string | undefined = undefined;
	export let error: boolean = false;
	export let errorMessage: string | undefined = 'Please check this input again';
	export let type: 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'range' | 'reset' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' = 'text';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let autocomplete: string | null | undefined = undefined;
	export let autofocus: boolean | null | undefined = undefined;
	export let form: string | undefined = undefined;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let size: number | undefined = undefined;
	export let value: string | undefined | null = null;

	let stateClasses: string;
	if (error) {
		stateClasses = '!border-red-300';
	}
</script>


<div class="flex flex-col">
	{#if label}
		<label class="block mb-2 text-sm font-sans trim-both pb-4" for={id}>{label}</label>
	{/if}
	<textarea
		{autocomplete}
		{autofocus}
		class="{stateClasses} rounded-3xl min-h-[9rem] h-36 border border-gray-300 px-4 py-2.5 placeholder-black/50 block w-full transition outline-none text-black font-sans trim-both
		focus:ring-black/70 focus:ring-2
		disabled:bg-black/5
		disabled:placeholder-black/20 disabled:text-black/50
		read-only:bg-black/5
		read-only:focus:ring-0 read-only:text-black/70"
		{disabled}
		{form}
		{id}
		{max}
		{maxlength}
		{min}
		{minlength}
		{name}
		on:change
		{pattern}
		{placeholder}
		{readonly}
		{required}
		{size}
		{type}
		{value} />
	{#if error}
		<div class="flex space-x-2 items-center text-red-300 pt-4">
			<Fa icon={faExclamationCircle} />
			<label class="block mb-2 text-sm font-sans trim-both" for={id}>{errorMessage}</label>
		</div>
	{/if}
</div>