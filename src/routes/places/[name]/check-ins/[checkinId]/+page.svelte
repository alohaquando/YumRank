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
	<LargePageTitle showBackButton>Review's detail</LargePageTitle>
	<div class="flex flex-col space-y-0 py-4">
		{#if data.review} 
            <Review
                userSrc={data.review.profiles.avatar_url}
                userFullName={data.review.profiles.full_name}
                reviewHref=""
                timeStamp={convertTimestampToLocale(data.review.created_at)}
                content={data.review.text}
                rating={data.review.rating}
            />

		{:else}
			<Body class="text-center opacity-50">Not exist</Body>
		{/if}
	</div>
</div>
