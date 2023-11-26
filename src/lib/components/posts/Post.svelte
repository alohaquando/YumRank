<script lang="ts">
	import RestaurantTitleItem from '$lib/components/building_blocks/RestaurantTitleItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';

	export let restaurantSrc: string | undefined | null;
	export let restaurantName: string | undefined | null;
	export let restaurantHref: string | undefined | null;
	export let imageSrc: string | undefined | null;
	export let content: string | undefined | null;
	export let date: string | undefined | null;

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};
</script>

<div class="flex-col flex space-y-2">
	<a href={restaurantHref}>
		<RestaurantTitleItem name={restaurantName} src={restaurantSrc}></RestaurantTitleItem>
	</a>
	<div class="w-full h-[11rem] bg-red-50 rounded-2xl overflow-clip">
		<img alt="Post" bind:this={imgEle} class="" loading="lazy" on:error={handleError}
				 src={imageSrc} />
	</div>
	<div class="flex-col flex space-y-1">
		<Body>{content}</Body>
		<Body class="opacity-50">{date}</Body>
	</div>
</div>