<!--suppress JSUnreachableSwitchBranches -->
<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/prefer-as-const
	export let size: 'md' | 'sm' = 'sm';
	export let design: 'filled' | 'outlined' | 'tonal' | 'text' | 'subtle' = 'subtle';
	export let width: "fit" | "full" = "fit";
	let customClasses: string = '';
	export { customClasses as class };

	let sizeClasses: string;
	switch (size) {
		case 'md': {
			sizeClasses = 'px-4 h-8';
			break;
		}
		case 'sm': {
			sizeClasses = '';
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
			designClasses = 'bg-gray-900/50 text-white font-medium';
			break;
		}
		case 'outlined': {
			designClasses = 'outline outline-1 outline-gray-300 ';
			break;
		}
		case 'tonal': {
			designClasses = 'bg-red-100 text-red-500 hover:bg-red-500';
			break;
		}
		case 'text': {
			designClasses = '';
			break;
		}
		case 'subtle': {
			designClasses = 'text-gray-400';
			break;
		}
	}
</script>

<div
				class="flex justify-center items-center rounded-full transition space-x-2 text-sm {sizeClasses} {designClasses} {widthClasses} {customClasses}">
	{#if $$slots.icon}
		<div>
			<slot name="icon" />
		</div>
	{/if}
	<p class="font-sans trim-both truncate">
		<slot />
	</p>
</div>

