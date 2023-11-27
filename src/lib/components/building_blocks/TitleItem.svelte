<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Body from '$lib/components/typography/Body.svelte';

	export let title: string | undefined | null = 'Title';
	export let src: string | undefined | null = '';
	export let trailingText: string | undefined | null = undefined;
	export let href: string | undefined | null = undefined;
</script>

<svelte:element
	this={href?'a' : 'div'}
	{href}
	class="flex flex-nowrap flex-row space-x-4 items-center place-content-between">
	<div class="flex flex-row space-x-2 items-center">
		<Image alt="{title}" class="w-8 h-8 rounded-xl ring-1 ring-gray-200" {src} />
		<Title>{title}</Title>
	</div>
	<div />
	{#if trailingText}
		<Body class="opacity-50">{trailingText}</Body>
	{/if}
</svelte:element>