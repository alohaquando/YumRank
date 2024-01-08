<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';

	export let title: string | undefined | null = 'Title';
	export let src: string | undefined | null = '';
	export let trailingText: string | undefined | null = undefined;
	export let trailingMoreIcon: boolean = false;
	export let href: string | undefined | null = undefined;
</script>

<div class="flex flex-nowrap flex-row space-x-4 items-center place-content-between w-full">
	<svelte:element
		class="flex flex-nowrap flex-row space-x-4 items-center place-content-between w-full"
		{href}
		this={href ? 'a' : 'div'}
	>
		<div class="flex flex-row space-x-2 items-center">
			<Image
				alt={title}
				class="w-8 h-8 rounded-xl ring-1 ring-gray-200"
				{src}
				viewable={false}
			/>
			<Title class="truncate hover:text-red-500 transition duration-100">{title}</Title>
		</div>
		<div />
		{#if trailingText}
			<Body class="opacity-50 truncate">{trailingText}</Body>
		{/if}
		{#if trailingMoreIcon}
			<Fa
				icon={faChevronRight}
				class="text-xs opacity-50"
			/>
		{/if}

	</svelte:element>

	<slot />
</div>