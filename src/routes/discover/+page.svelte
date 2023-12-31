<script lang="ts">
	import Divider from '$lib/components/layouts/Divider.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Display from '$lib/components/typography/Display.svelte';
	import Post from '$lib/components/posts/Post.svelte';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';

	export let data;
</script>

<div class="py-8">
	<TextField
		id="search"
		name="search"
		placeholder="Search"
		type="search"
	/>
</div>

<Divider full />

<div class="flex flex-col space-y-8 py-8">
	<Display class="">Discover</Display>
	{#if data.posts}
		{#each data.posts as post}
			<Post
				content={post.context}
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