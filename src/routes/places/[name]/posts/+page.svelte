<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Post from '$lib/components/posts/Post.svelte';
	import {
		dishSrcExample,
		hrefExample,
		placeNameExample,
		placeSrcExample,
		postContentExample,
		timeStampExample
	} from '$lib/data/exampleData';
	import { faPlus } from '@fortawesome/pro-solid-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';

	export let data;
</script>

<div class="flex flex-col space-y-8">
	{#if data.owner}
		<Button
			width="full"
			href="/management/places/{data.placeName}/create-post"
		>
			<Fa
				icon={faPlus}
				slot="icon"
			/>
			Add a post
		</Button>
		<Divider></Divider>
	{/if}
	{#each { length: 3 } as _}
		<!-- TODO: Get posts. @Khai -->
		<Post
			placeSrc={$placeSrcExample}
			placeName={$placeNameExample}
			placeHref={$hrefExample}
			content={$postContentExample}
			timeStamp={$timeStampExample}
			imageSrc={$dishSrcExample}
		/>
	{/each}
</div>
