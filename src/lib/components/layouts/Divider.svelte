<script lang="ts">
	export let full: boolean = false;

	let widthClasses: string;
	if (full) {
		widthClasses = "w-screen -translate-x-6"
	} else {
		widthClasses = "w-full"
	}
</script>

<div class=" h-px bg-gray-200 {widthClasses}"></div>