<!--suppress JSUnreachableSwitchBranches -->
<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let size: 'md' | 'lg' = 'md';
	export let design: 'filled' | 'outlined' | 'tonal' | 'text' = 'filled';
	export let disabled: boolean = false;
	export let form: string | undefined | null = undefined;

	export let href: string | undefined = undefined;
	let customClasses = '';
	export { customClasses as class };

	let sizeClasses: string;
	switch (size) {
		case 'md': {
			sizeClasses = 'w-10 h-10 aspect-square';
			break;
		}
		case 'lg': {
			sizeClasses = 'w-14 h-14 aspect-square';
			break;
		}
	}

	let designClasses: string;
	$: switch (design) {
		case 'filled': {
			designClasses = 'bg-red-500 text-white hover:bg-red-600';
			break;
		}
		case 'outlined': {
			designClasses = 'outline outline-1 outline-gray-300 hover:bg-red-50 disabled:bg-gray-50 disabled:text-gray-300';
			break;
		}
		case 'tonal': {
			designClasses = 'bg-red-100 text-red-500 hover:bg-red-500 hover:text-white disabled:bg-gray-100 disabled:text-gray-300';
			break;
		}
		case 'text': {
			designClasses = ' hover:bg-red-100 hover:text-red-500';
			break;
		}
	}
</script>

<svelte:element
	class="flex justify-center items-center rounded-full transition {sizeClasses} {designClasses} {customClasses}"
	{disabled}
	{form}
	{href}
	on:click
	role="button"
	tabindex="0"
	this={href ? 'a' : 'button'}
	{type}
>
	<slot />
</svelte:element>
