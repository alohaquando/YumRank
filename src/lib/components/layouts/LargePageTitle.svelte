<script>
	import Display from '$lib/components/typography/Display.svelte';
</script>

<div class="flex flex-row items-baseline flex-wrap space-y-6 space-x-2  pt-2 pb-6">
	<Display class="truncate">
		<slot />
	</Display>
	<slot name="dropdown"/>
</div>