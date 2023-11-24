<script>
	let customClass = '';
	export { customClass as class };
</script>

<h2 class="font-sans trim-both text-2xl font-medium {customClass}">
	<slot />
</h2>
