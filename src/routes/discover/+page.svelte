<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Display from '$lib/components/typography/Display.svelte';
	import Post from '$lib/components/posts/Post.svelte';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';
	import { faSearch } from '@fortawesome/pro-regular-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';

	export let data;
</script>

<div class="py-8">
	<Button
		design="outlined"
		href="/discover/search"
		width="full"
	>
		<Fa icon={faSearch} slot="icon" />
		Search
	</Button>
</div>

<Divider full />

<div class="flex flex-col space-y-8 py-8">
	<Display class="">Discover</Display>
	{#if data.posts}
		{#each data.posts as post}
			<Post
				content={post.content}
				imageSrcs={post.post_image_urls}
				placeHref="places/{post.restaurants.name}"
				placeName={post.restaurants.name}
				placeSrc={post.restaurants.logo_url}
				timeStamp={convertTimestampToLocale(post.created_at)}
			/>
		{/each}
	{/if}
</div>


<!--<div class="py-8">-->

<!--	<div-->
<!--		class="flex flex-row space-x-4 w-screen sm:sm:w-[40rem] -translate-x-6 scroll-px-6 px-6 py-2 overflow-x-scroll"-->
<!--	>-->
<!--		{#each { length: 5 } as _, i}-->
<!--			<Coupon-->
<!--				{placeName}-->
<!--				{restaurantSrcExample}-->
<!--				{discountValue}-->
<!--				{discountCondition}-->
<!--				{isDiscountSaved}-->
<!--				{restaurantHref}-->
<!--			/>-->
<!--		{/each}-->
<!--	</div>-->
<!--</div>-->

<!--<Divider full />-->