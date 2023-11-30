<script lang="ts">
	export let src: string | undefined | null;
	export let alt: string | undefined | null;
	export let eager: boolean = false;
	let customClasses: string = '';
	export { customClasses as class };

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};
</script>

<div class="bg-red-50 {customClasses}">
	<img
		bind:this={imgEle}
		class=" {customClasses} object-cover object-center"
		{alt}
		{src}
		on:error={handleError}
		loading={eager ? 'eager' : 'lazy'}
	/>
</div>
