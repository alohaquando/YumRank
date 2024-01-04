<script lang="ts">
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import { faStar } from '@fortawesome/pro-regular-svg-icons';
	import { faStar as faStarFilled } from '@fortawesome/pro-solid-svg-icons';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	export let userSrc: string;
	export let reviewHref: string | undefined | null;
	export let userFullName: string;
	export let timeStamp: string;
	export let content: string;
	export let rating: number;
</script>

<div class="flex flex-col space-y-4">
	<TitleItem
		href={reviewHref}
		src={userSrc}
		title={userFullName}
		trailingText={timeStamp}
	/>
	<div class="flex-row flex space-x-2">
		{#each { length: 5 } as _, i}
			{#if i + 1 <= rating}
				<Fa
					icon={faStarFilled}
					class="text-red-500"
				/>
			{:else}
				<Fa
					icon={faStar}
					class="opacity-50"
				/>
			{/if}
		{/each}
	</div>
	<Body>{content}</Body>
</div>
