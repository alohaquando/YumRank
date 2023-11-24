<script>
	let customClass = '';
	export { customClass as class };
</script>

<h1 class="font-sans trim-both text-2xl font-medium {customClass}">
	<slot />
</h1>
