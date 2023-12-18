<script lang="ts">
	import Headline from '$lib/components/typography/Headline.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faHeart as faHeartOutlined, faStar, faUserCheck } from '@fortawesome/pro-regular-svg-icons';
	import { faHeart as faHeartFilled } from '@fortawesome/pro-solid-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	import Fa from 'svelte-fa';

	export let restaurantSrc: string | undefined | null;
	export let restaurantName: string | undefined | null;
	export let restaurantHref: string | undefined | null;
	export let imageSrc: string | undefined | null;
	export let content: string | undefined | null;
	export let address: string | undefined | null;

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};

	let isFavorite: boolean = true;
</script>

<div class="flex-col flex space-y-2">
	<div class="w-full h-[11rem] bg-red-50 rounded-2xl overflow-clip">
		<Image alt="Post" on:error={handleError} src={imageSrc} />
	</div>
</div>

<div class="flex-col flex space-y-1.5">
	<Headline class="overflow-ellipsis" title={restaurantName}>{restaurantName}</Headline>
	<Title class="overflow-ellipsis">{address}</Title>
	<Body class="opacity-80">{content}</Body>
</div>

<div class="flex space-x-4">
	<Button width="full">
		<Fa icon={faUserCheck} slot="icon" />
		Check in
	</Button>

	{#if isFavorite}
		<IconButton design="tonal" class="transition">
			<Fa icon={faHeartFilled} class="text-red-500" />
		</IconButton>
	{:else}
		<IconButton design="outlined" class="transition">
			<Fa icon={faHeartOutlined} />
		</IconButton>
	{/if}

</div>