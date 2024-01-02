<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import Title from '$lib/components/typography/Title.svelte';
	import PlaceDetailTitleBlock from '$lib/components/details/PlaceDetailTitleBlock.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import StatsSummary from '$lib/components/details/StatsSummary.svelte';
	import Review from '$lib/components/reviews/Review.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { rankExample } from '$lib/data/exampleData';
	import Post from '$lib/components/posts/Post.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import { faInfoCircle, faQrcode } from '@fortawesome/pro-solid-svg-icons';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';
	import Body from '$lib/components/typography/Body.svelte';
	import Headline from '$lib/components/typography/Headline.svelte';

	export let data;
</script>

<div>
	<div class="flex flex-col space-y-0 py-4">
		{#if data.post} 
			<Post
				content={data.post[0].content}
				imageSrcs={data.post[0].post_image_urls}
				placeHref=""
				placeName={data.restaurant_name}
				placeSrc=''
				timeStamp={convertTimestampToLocale(data.post[0].created_at)}
			/>

			<Button
				href="{data.restaurant.name}/posts"
				width="full"
				design="outlined"
				>Delete
			</Button>
		{:else}
			<Body class="text-center opacity-50">No posts yet</Body>
		{/if}
	</div>
</div>
