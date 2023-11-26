<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	export let name: string | undefined | null = 'Restaurant Name';
	export let src: string | undefined | null = ' ';

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden')
	}
</script>

<div class="flex flex-row space-x-2 items-center">
	<div class="w-8 h-8 bg-red-50 rounded-xl overflow-clip">
		<img bind:this={imgEle} class="w-8 h-8 rounded-xl" alt="Logo of {name}" {src} on:error={handleError} loading="lazy" />
	</div>
	<Title>{name}</Title>
</div>