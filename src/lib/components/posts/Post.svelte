<script lang="ts">
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';

	export let placeSrc: string | undefined | null;
	export let placeName: string | undefined | null;
	export let placeHref: string | undefined | null;
	export let imageSrc: string | undefined | null;
	export let content: string | undefined | null;
	export let timeStamp: string | undefined | null;

	let imgEle: HTMLElement;
	const handleError = () => {
		imgEle.classList.add('hidden');
	};
</script>

<div class="flex-col flex space-y-4">
	<TitleItem
		href={placeHref}
		src={placeSrc}
		title={placeName}
	/>
	<div class="w-full aspect-[2/1] bg-red-50 rounded-2xl overflow-clip">
		<Image
			alt="Post"
			class="h-full w-full"
			on:error={handleError}
			src={imageSrc}
		/>
	</div>
	<div class="flex-col flex space-y-3">
		<Body>{content}</Body>
		<Body class="opacity-50">{timeStamp}</Body>
	</div>
</div>
