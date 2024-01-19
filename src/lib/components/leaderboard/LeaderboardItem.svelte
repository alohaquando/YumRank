<script lang="ts">
	import Rank from '$lib/components/building_blocks/Rank.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import InfoChip from '$lib/components/chips/InfoChip.svelte';
	import { faHeart, faStar, faUserCheck } from '@fortawesome/pro-regular-svg-icons';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	export let rank: number;
	export let restaurantSrc: string;
	export let restaurantName: string;
	export let checkIns: number;
	export let rating: number;
	export let favorites: number;
	export let href: string;

	export let showRank: boolean = true;

	let prominent: boolean = rank <= 5;
</script>

<a
	data-sveltekit-preload-data="tap"
	class="flex w-full overflow-auto space-x-4"
	{href}
>
	{#if showRank}
		<div class="pt-2">
			<Rank {rank} />
		</div>
	{/if}
	<div class="flex grow {prominent ? 'flex-col space-y-3' : 'flex-row space-x-4'}">
		<div class="relative">
			<Image
				alt={restaurantName}
				class="{prominent ? 'w-full aspect-[2/1] h-auto' : 'w-20 h-20'} rounded-3xl"
				src={restaurantSrc}
				viewable={false}
			/>
		</div>
		<div class="flex-col flex space-y-3 {prominent ? '' : 'pt-4'}">
			<Title class="overflow-ellipsis">{restaurantName}</Title>
			<div class="flex w-fit overflow-clip space-x-4">
				<InfoChip>
					<Fa
						icon={faUserCheck}
						slot="icon"
					/>
					{checkIns}
				</InfoChip>
				<InfoChip>
					<Fa
						icon={faHeart}
						slot="icon"
					/>
					{favorites}
				</InfoChip>
				<InfoChip>
					<Fa
						icon={faStar}
						slot="icon"
					/>
					{rating}
				</InfoChip>
			</div>
		</div>
	</div>
</a>

<!--Example-->
<!--<LeaderboardItem rank={1} href="/" placeName="Example Restaurant" dishName="Example Dish" checkIns={5468} rating={4.5} favorites={85} restaurantSrcExample="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3" dishSrcExample="https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>-->
<!--<LeaderboardItem rank={6} href="/" placeName="Example Restaurant" dishName="Example Dish" checkIns={5468} rating={4.5} favorites={85} restaurantSrcExample="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3" dishSrcExample="https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>-->

<!--With dish name-->
<!--<a-->
<!--	class="flex w-full overflow-auto space-x-4"-->
<!--	{href}-->
<!--&gt;-->
<!--	<div class="pt-2">-->
<!--		<Rank {rank} />-->
<!--	</div>-->
<!--	<div class="flex grow {prominent ? 'flex-col space-y-3' : 'flex-row space-x-4'}">-->
<!--		<div class="relative">-->
<!--			<Image-->
<!--				alt={placeName}-->
<!--				class="{prominent ? 'w-full h-40' : 'w-16 h-16'} rounded-3xl"-->
<!--				src={restaurantSrcExample}-->
<!--			/>-->
<!--			{#if prominent}-->
<!--				<div-->
<!--					class="absolute right-0 bottom-0 h-20 w-20 overflow-clip rounded-full ring-white ring-[0.5rem]"-->
<!--				>-->
<!--					<Image-->
<!--						alt={dishName}-->
<!--						class="h-20 w-20"-->
<!--						src={dishSrcExample}-->
<!--					/>-->
<!--				</div>-->
<!--			{/if}-->
<!--		</div>-->
<!--		<div class="flex flex-col space-y-1.5">-->
<!--			<Title class="overflow-ellipsis">{placeName}</Title>-->
<!--			<Body class="opacity-80">{dishName}</Body>-->
<!--			<div class="flex w-fit overflow-clip space-x-4">-->
<!--				<InfoChip>-->
<!--					<Fa-->
<!--						icon={faUserCheck}-->
<!--						slot="icon"-->
<!--					/>-->
<!--					{checkIns}-->
<!--				</InfoChip>-->
<!--				<InfoChip>-->
<!--					<Fa-->
<!--						icon={faHeart}-->
<!--						slot="icon"-->
<!--					/>-->
<!--					{favorites}-->
<!--				</InfoChip>-->
<!--				<InfoChip>-->
<!--					<Fa-->
<!--						icon={faStar}-->
<!--						slot="icon"-->
<!--					/>-->
<!--					{rating}-->
<!--				</InfoChip>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--</a>-->
