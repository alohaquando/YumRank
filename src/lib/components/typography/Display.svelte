<script>
	let customClass = '';
	export { customClass as class };
</script>

<h1 class="font-sans trim-both text-3xl font-semibold {customClass}">
	<slot />
</h1>
