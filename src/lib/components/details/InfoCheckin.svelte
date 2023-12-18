<script lang="ts">
    import Headline from '$lib/components/typography/Headline.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import { faHeart, faStar, faUserCheck } from '@fortawesome/pro-regular-svg-icons';

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
</script>

<div class="flex-col flex space-y-2">
	<div class="w-full h-[11rem] bg-red-50 rounded-2xl overflow-clip">
		<Image alt="Post" on:error={handleError} src={imageSrc} />
	</div>
</div>

<div class="flex-col flex space-y-1.5">
    <Headline class="overflow-ellipsis" src={restaurantSrc} title={restaurantName}>{restaurantName}</Headline>
	<Title class="overflow-ellipsis">{address}</Title>
	<Body class="opacity-80">{content}</Body>
</div>

<div>
    <IconButton class="w-full">Check in</IconButton>
</div>