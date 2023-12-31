<script lang="ts">
	export let full: boolean = false;

	let widthClasses: string;
	if (full) {
		widthClasses = ' -translate-x-6 w-screen container';
	} else {
		widthClasses = 'w-full';
	}
</script>

<div class=" h-px bg-gray-200 {widthClasses}" />
