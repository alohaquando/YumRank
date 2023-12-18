<!--suppress JSUnreachableSwitchBranches -->
<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let size: 'md' | 'lg' = 'md';
	export let design: 'filled' | 'outlined' | 'tonal' = 'filled';
	export let disabled: boolean = false;
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

<button
	on:click
	{disabled}
	{type}
	class="flex justify-center items-center rounded-full transition {sizeClasses} {designClasses} {customClasses}"
>
	<slot />
</button>
