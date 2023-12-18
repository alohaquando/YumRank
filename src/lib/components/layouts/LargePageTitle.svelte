<script lang="ts">
	import Display from '$lib/components/typography/Display.svelte';
	import BackButton from '$lib/components/navigation/BackButton.svelte';

	export let showBackButton: boolean = false;

	let flexClasses: string;
	if ($$slots.leading) {
		flexClasses = 'items-center';
	}
	if ($$slots.trailing) {
		flexClasses = 'items-baseline';
	}
</script>


<div class="flex flex-row flex-wrap space-x-2 mb-8 {flexClasses} {showBackButton ? '' : 'mt-12'}">
	{#if showBackButton}
		<BackButton />
	{/if}
	<slot name="leading" />
	<Display>
		<slot />
	</Display>
	<slot name="trailing" />
</div>
