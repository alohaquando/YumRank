<!--suppress JSUnreachableSwitchBranches -->
<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let size: 'md' | 'lg' = 'md';
	export let design: 'filled' | 'outlined' = 'filled';
	export let disabled: boolean = false;

	let size_classes: string;
	switch (size) {
		case 'md': {
			size_classes = 'w-10 h-10';
			break;
		}
		case 'lg': {
			size_classes = 'w-14 h-14';
			break;
		}
	}

	let design_classes: string;
	switch (design) {
		case 'filled': {
			design_classes = 'bg-red-500 text-white hover:bg-red-600';
			break;
		}
		case 'outlined': {
			design_classes = 'outline outline-1 outline-gray-300 hover:bg-red-50';
			break;
		}
	}
</script>

<button on:click {disabled} {type}
				class="flex justify-center items-center rounded-full transition  {size_classes} {design_classes}">
	<slot />
</button>