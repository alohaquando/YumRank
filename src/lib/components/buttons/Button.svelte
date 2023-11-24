<!--suppress JSUnreachableSwitchBranches -->
<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';

	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let size: 'md' | 'lg' = 'md';
	export let design: 'filled' | 'outlined' | 'tonal' = 'filled';
	export let disabled: boolean = false;
	export let width: "fit" | "full" = "fit";
	let customClasses: string = '';
	export { customClasses as class };

	let sizeClasses: string;
	switch (size) {
		case 'md': {
			sizeClasses = 'px-6 h-10';
			break;
		}
		case 'lg': {
			sizeClasses = 'px-8 h-14';
			break;
		}
	}

	let widthClasses: string;
	switch (width) {
		case 'fit': {
			widthClasses = 'w-fit';
			break;
		}
		case 'full': {
			widthClasses = 'w-full';
			break;
		}
	}

	let designClasses: string;
	switch (design) {
		case 'filled': {
			designClasses = 'bg-red-500 text-white hover:bg-red-600';
			break;
		}
		case 'outlined': {
			designClasses = 'outline outline-1 outline-gray-300 hover:bg-red-50';
			break;
		}
		case 'tonal': {
			designClasses = 'bg-red-100 text-red-500 hover:bg-red-500 hover:text-white';
			break;
		}
	}
</script>

<button on:click {disabled} {type}
				class="flex justify-center items-center rounded-full transition space-x-2 {sizeClasses} {designClasses} {widthClasses} {customClasses}">
	{#if $$slots.icon}
		<div>
			<slot name="icon" />
		</div>
	{/if}
	<Title>
		<slot />
	</Title>
</button>