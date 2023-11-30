<script>
	import Display from '$lib/components/typography/Display.svelte';
</script>

<div class="flex flex-row items-baseline space-x-2 pt-6 pb-8">
	<Display>
		<slot />
	</Display>
	<slot name="dropdown"/>
</div>