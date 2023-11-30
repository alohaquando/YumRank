<script>
	import Display from '$lib/components/typography/Display.svelte';
</script>

<div class="flex flex-row items-baseline flex-wrap space-x-2 mt-12 mb-8">
	<Display>
		<slot />
	</Display>
	<slot name="dropdown" />
</div>
