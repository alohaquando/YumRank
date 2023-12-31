<script lang="ts">
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';

	export let placeSrc: string | undefined | null;
	export let placeName: string | undefined | null;
	export let placeHref: string | undefined | null;
	export let imageSrcs: string | undefined | null;
	export let content: string | undefined | null;
	export let timeStamp: string | undefined | null;
</script>

<!-- TODO: Delete, Edit  -->

<div class="flex-col flex space-y-4">
	<TitleItem
		href={placeHref}
		src={placeSrc}
		title={placeName}
	/>
	<!--	<div class="w-full aspect-[2/1] bg-red-50 rounded-2xl overflow-clip">-->
	<!--		<Image-->
	<!--			alt="Post"-->
	<!--			class="h-full w-full"-->
	<!--			src={imageSrc}-->
	<!--		/>-->
	<!--	</div>-->
	<div
		class=" relative flex-none w-full p-0 grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-2 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2"
	>
		{#if imageSrcs !== undefined && imageSrcs !== null}
			{#each imageSrcs as src}
				<Image
					alt="Images of {placeName}"
					class="aspect-[2/1] rounded-3xl snap-start snap-always w-auto h-auto"
					{src}
				/>
			{/each}
		{/if}
	</div>

	<div class="flex-col flex space-y-3">
		<Body>{content}</Body>
		<Body class="opacity-50">{timeStamp}</Body>
	</div>
</div>
