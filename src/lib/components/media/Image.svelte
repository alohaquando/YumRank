<script lang="ts">
	export let src: string | undefined | null = null;
	export let alt: string | undefined | null = undefined;
	export let eager: boolean = false;
	let customClasses: string = '';
	export { customClasses as class };

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};
</script>

<div class="bg-red-50 {customClasses} border-2 border-gray-200 flex items-center justify-center">
	{#if src != null}
		<img
			{alt}
			bind:this={imgEle}
			class=" {customClasses} object-cover object-center"
			loading={eager ? 'eager' : 'lazy'}
			on:error={handleError}
			{src}
		/>
	{/if}
	<slot />
</div>
