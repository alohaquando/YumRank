<script lang="ts">
	import Display from '$lib/components/typography/Display.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
	import Title from '$lib/components/typography/Title.svelte';

	export let design: 'display' | 'title' = 'display';
	export let value: string;
	export let name: string;
	export let id: string;

	type ThemeOption = {
		value: string;
		title: string;
	};

	type Options<K extends string> = {
		[key in K]: ThemeOption;
	};
	export let options: Options<string> = {};

	let borderClasses: string;
	let iconClasses: string;

	// noinspection JSUnreachableSwitchBranches
	switch (design) {
		case 'display': {
			borderClasses = 'border-b-2 pb-2 space-x-2';
			iconClasses = 'text-xl';
			break;
		}
		case 'title': {
			borderClasses = 'border-b pb-1 space-x-1';
			iconClasses = 'text-xs';
			break;
		}
	}
</script>

<div class="relative w-fit transition group pointer-events-none">
	<select
		aria-label="Select theme for website"
		bind:value
		class="absolute -bottom-2 -left-2 -right-2 -top-2 bg-white opacity-0 dark:bg-zinc-900 pointer-events-auto"
		{id}
		{name}
		on:change
	>
		{#each Object.values(options) as option}
			<option value={option.value}>{option.title}</option>
		{/each}
	</select>
	<div
		class="flex flex-row border-gray-900 w-fit h-fit group-hover:text-red-500 group-hover:border-red-500 transition items-center {borderClasses}"
	>
		<svelte:component this={design === 'display' ? Display : Title}>{value}</svelte:component>
		<Fa class={iconClasses} icon={faChevronDown} />
	</div>
</div>
