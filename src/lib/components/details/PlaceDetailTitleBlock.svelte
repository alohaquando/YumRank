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

	export let placeName: string | undefined | null;
	export let placeImagesSrcs: string[] | undefined | null;
	export let placeLogoSrc: string | undefined | null;
	export let desc: string | undefined | null;
	export let address: string | undefined | null;
	export let checkInButtonDisabled: boolean = false;
	export let isFavorite: boolean = false;
	export let favoriteButtonForm: string;
	export let checkInButtonOnClick: () => void;
	export let favoriteButtonOnClick: () => void;
</script>

<div
	class="flex flex-row overflow-x-scroll gap-x-4 scrollbar-none snap-x snap-mandatory scroll-px-6 absolute left-0 w-screen px-6 md:relative md:flex-none md:w-full md:p-0 md:grid md:grid-flow-row md:grid-cols-4 md:gap-2 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2"
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
		class="w-20 h-fit aspect-square rounded-3xl snap-start snap-always	"
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
		class="transition"
		design={isFavorite ? 'tonal' : 'outlined'}
		form={favoriteButtonForm}
		on:click={() => favoriteButtonOnClick()}
		type="submit">
		<Fa
			class={isFavorite ? 'text-red-500' : ''}
			icon={isFavorite ? faHeartFilled : faHeartOutlined}
		/>
	</IconButton>
</div>