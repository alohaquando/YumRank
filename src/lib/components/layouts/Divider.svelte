<script lang="ts">
	export let full: boolean = false;

	let widthClasses: string;
	if (full) {
		widthClasses = ' -translate-x-6 w-screen sm:sm:w-[40rem]';
	} else {
		widthClasses = 'w-full';
	}
</script>

<div class=" h-px bg-gray-200 {widthClasses}" />
