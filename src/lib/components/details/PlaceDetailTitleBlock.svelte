<script lang="ts">
	import Headline from '$lib/components/typography/Headline.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faHeart as faHeartOutlined, faUserCheck } from '@fortawesome/pro-regular-svg-icons';
	import { faHeart as faHeartFilled } from '@fortawesome/pro-solid-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	export let restaurantName: string | undefined | null;
	export let imageSrc: string | undefined | null;
	export let desc: string | undefined | null;
	export let address: string | undefined | null;
	export let checkInButtonOnClick = () => {}
	export let favoriteButtonOnClick = () => {}
	export let checkInButtonDisabled: boolean = false;
	export let isFavorite: boolean = false;

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};


</script>

<div class="flex-col flex space-y-2">
	<div class="w-full h-[11rem] bg-red-50 rounded-2xl overflow-clip">
		<Image alt="Post" on:error={handleError} src={imageSrc} />
	</div>
</div>

<div class="flex-col flex space-y-1.5">
	<Headline class="overflow-ellipsis">{restaurantName}</Headline>
	<Title class="overflow-ellipsis">{address}</Title>
	<Body class="opacity-80">{desc}</Body>
</div>

<div class="flex space-x-4">
	<Button width="full" on:click={() => checkInButtonOnClick()} disabled={checkInButtonDisabled}>
		<Fa icon={faUserCheck} slot="icon" />
		Check in
	</Button>

	{#if isFavorite}
		<IconButton design="tonal" class="transition" on:click={() => favoriteButtonOnClick()}>
			<Fa icon={faHeartFilled} class="text-red-500" />
		</IconButton>
	{:else}
		<IconButton design="outlined" class="transition" on:click={() => favoriteButtonOnClick()}>
			<Fa icon={faHeartOutlined} />
		</IconButton>
	{/if}

</div>