<script lang="ts">
	let customClasses = '';
	export { customClasses as class };
</script>

<div
	class="h-14 border-b border-gray-200  bg-white w-full flex ">
	<div class="container px-6 mx-auto flex overflow-x-scroll items-center space-x-3 scrollbar-none {customClasses}">
		<slot />
	</div>
</div>