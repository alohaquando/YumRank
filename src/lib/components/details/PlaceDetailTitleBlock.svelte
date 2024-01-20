<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Headline from '$lib/components/typography/Headline.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faHeart as faHeartOutlined, faUserCheck } from '@fortawesome/pro-regular-svg-icons';
	import { faHeart as faHeartFilled } from '@fortawesome/pro-solid-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	import type { IconDefinition } from '@fortawesome/sharp-light-svg-icons';
	import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons';

	export let placeName: string | undefined | null;
	export let placeImagesSrcs: string[] | undefined | null;
	export let placeLogoSrc: string | undefined | null;
	export let desc: string | undefined | null;
	export let address: string | undefined | null;
	export let checkInButtonDisabled: boolean = false;
	export let isFavorite: boolean = false;
	export let isFavoriteLoading: boolean = false;
	export let favoriteButtonForm: string;
	export let checkInButtonOnClick: () => void;

	let favoriteIcon: IconDefinition;
	$: if (isFavoriteLoading) {
		favoriteIcon = faSpinnerThird;
	} else {
		if (isFavorite) {
			favoriteIcon = faHeartFilled;
		} else {
			favoriteIcon = faHeartOutlined;
		}
	}
</script>

<div
	class="flex flex-row overflow-x-scroll gap-x-4 scrollbar-none snap-x snap-mandatory scroll-px-6 absolute left-0 w-screen px-6 md:relative md:flex-none md:w-full md:p-0 md:grid md:grid-flow-row {placeImagesSrcs.length > 1 ? 'md:grid-cols-4' : 'md:grid-cols-2'} md:gap-2 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2"
>
	{#if placeImagesSrcs !== undefined && placeImagesSrcs !== null}
		{#each placeImagesSrcs as src}
			<Image
				alt="Images of {placeName}"
				class="w-[86vw] h-64 aspect-[2/1] rounded-3xl snap-start snap-always md:w-auto md:h-auto"
				{src}
			/>
		{/each}
	{/if}
</div>

<div class="h-56 md:hidden" />

<div class="flex w-full justify-between">
	<div class="flex-col flex space-y-1.5 pt-2">
		<Headline class="overflow-ellipsis">{placeName}</Headline>
		<Title class="overflow-ellipsis">{address}</Title>
		<Body class="opacity-80">{desc}</Body>
	</div>
	<Image
		alt="Images of {placeName}"
		class="w-20 h-fit rounded-3xl shrink-0"
		src={placeLogoSrc}
	/>
</div>

<div class="flex space-x-4">
	<Button
		disabled={checkInButtonDisabled}
		on:click={checkInButtonOnClick}
		width="full"
	>
		<Fa
			icon={faUserCheck}
			slot="icon"
		/>
		Check in
	</Button>

	<IconButton
		class="transition group {isFavoriteLoading ? 'animate-spin' : ''}"
		design={isFavorite ? 'tonal' : 'outlined'}
		disabled={isFavoriteLoading}
		form={favoriteButtonForm}
		type="submit">
		<Fa
			class="{isFavorite ? 'text-red-500 group-hover:text-white' : ''} {isFavoriteLoading ? '!text-gray-500 group-hover:!text-gray-500' : ''}"
			icon={favoriteIcon}
		/>
	</IconButton>
</div>