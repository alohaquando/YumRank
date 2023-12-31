<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faImage, faTimes } from '@fortawesome/pro-regular-svg-icons';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { fade } from 'svelte/transition';

	export let src: string | undefined | null = null;
	export let alt: string | undefined | null = undefined;
	export let eager: boolean = false;
	export let viewable: boolean = true;
	let showImageDialog: boolean = false;

	let customClasses: string = '';
	export { customClasses as class };

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};

	const imageOnClick = () => {
		if (viewable) {
			showImageDialog = !showImageDialog;
		}
	};
</script>

<div class="bg-red-50 {customClasses} border border-gray-200 flex items-center justify-center">
	{#if src != null}
		<img
			{alt}
			bind:this={imgEle}
			class=" {customClasses} object-cover object-center transition duration-200 {viewable
				? 'hover:brightness-90 cursor-pointer'
				: ''}"
			loading={eager ? 'eager' : 'lazy'}
			on:error={handleError}
			on:click={imageOnClick}
			on:keypress={imageOnClick}
			tabindex="0"
			{src}
		/>
	{:else}
		<Fa
			icon={faImage}
			class="text-xl text-red-300"
		/>
	{/if}
	<slot />
</div>

{#if showImageDialog}
	<div
		transition:fade={{ duration: 100 }}
		class="fixed top-0 left-0 z-50 h-screen w-screen bg-white ring will-change-transform"
	>
		<div class="flex h-full w-full flex-col items-center justify-center gap-8">
			<img
				{alt}
				bind:this={imgEle}
				class="rounded-3xl w-[96%]"
				loading="lazy"
				{src}
			/>
			<IconButton
				design="outlined"
				on:click={imageOnClick}
				class="order-last md:order-first"
			>
				<Fa icon={faTimes} />
			</IconButton>
		</div>
	</div>
{/if}
