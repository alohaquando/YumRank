<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faExclamationCircle, faSearch } from '@fortawesome/pro-regular-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';

	export let id: string;
	export let placeholder: string;
	export let name: string;
	export let label: string | undefined = undefined;
	export let error: boolean = false;
	export let errorMessage: string | undefined = 'Please check this input again';
	export let type = 'text';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let autocomplete: string | null | undefined = undefined;
	export let form: string | undefined = undefined;
	export let min: number | never | undefined = undefined;
	export let max: number | never | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let pattern: never | undefined = undefined;
	export let size: number | undefined = undefined;
	export let value = '';
	export let options: string[] = [];

	let stateClasses: string;
	if (error) {
		stateClasses = '!border-red-300';
	}

	export let forceValueFromOptions = false;
	let showDropdown = false;

	const handleChangeForceValueFromOptions = () => {
		handleHideDropdown();

		if (forceValueFromOptions) {
			if (!options.includes(value as string)) {
				error = true;
				value = '';
			} else {
				error = false;
			}
		}
	};

	const handleShowDropdown = () => {
		showDropdown = true;
	};

	const handleHideDropdown = () => {
		showDropdown = false;
	};

	const handleSelectOption = (selectedOption: string) => {
		value = selectedOption;
		handleHideDropdown();
	};
</script>

<div class="flex flex-col w-full relative pb-2">
	{#if label}
		<label class="block mb-2 text-sm font-sans trim-both pb-4" for={id}>{label}</label>
	{/if}
	<input
		{...{ type }}
		{autocomplete}
		bind:value
		class="{stateClasses} rounded-full border border-gray-300 px-4 py-2.5 placeholder-black/50 block w-full transition outline-none text-black font-sans trim-both
		focus:ring-black/70 focus:ring-2
		disabled:bg-black/5
		disabled:placeholder-black/20 disabled:text-black/50
		read-only:bg-black/5
		read-only:focus:ring-0 read-only:text-black/70"
		{disabled}
		{form}
		{id}
		list="{id}-list"
		{max}
		{maxlength}
		{min}
		{minlength}
		{name}
		on:change={handleChangeForceValueFromOptions}
		on:focus={handleShowDropdown}
		{pattern}
		{placeholder}
		{readonly}
		{required}
		{size}
	/>
	{#if showDropdown}
		<div class="absolute z-10 bg-white divide-y divide-gray-200 rounded-3xl shadow w-full top-[4.6rem]"
				 id="{id}-list">
			<div class="py-4 flex flex-col space-y-4  ">
				{#each options as option}
					<button on:click={handleSelectOption(option)}>
						<Body
							class="block mx-2 px-4 py-2 hover:bg-red-50 rounded-3xl transition text-start">{option}</Body>
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<Fa class="absolute right-4 top-[2.1rem]" icon={faSearch} />

	{#if error}
		<div class="flex space-x-2 items-center text-red-500 pt-4">
			<Fa icon={faExclamationCircle} />
			<label class="block mb-2 text-sm font-sans trim-both" for={id}>{errorMessage}</label>
		</div>
	{/if}
</div>

<!--Example-->
<!--<Datalist label="Label" id="" displayName="" placeholder="Select an option or enter your own value" options={['Choice A', "Choice B", "Choice C"]}></Datalist>-->

<style>
    ::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
</style>
