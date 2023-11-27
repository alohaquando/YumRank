<script>
	import Button from '$lib/components/buttons/Button.svelte';
</script>

<div class="bg-white rounded-2xl border border-gray-300">
	{#if $$slots.one}
		<div class="py-3 px-4  border-gray-300 rounded-t-2xl">
			<slot name="one" />
		</div>
	{/if}
	{#if $$slots.two}
		<div class="py-3 px-4 border-t border-gray-300 rounded-t-2xl">
			<slot name="two" />
		</div>
	{/if}
	{#if $$slots.three}
		<div class="py-3 px-4 border-t border-gray-300 rounded-t-2xl">
			<slot name="three" />
		</div>
	{/if}
	<div class="flex w-full h-24 items-center justify-center border-t border-gray-300 rounded-t-2xl">
		<Button href="/">
			View all coupons
		</Button>
	</div>
</div>