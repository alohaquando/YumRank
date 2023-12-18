<script>
	import Divider from '$lib/components/layouts/Divider.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Display from '$lib/components/typography/Display.svelte';
	import Post from '$lib/components/posts/Post.svelte';

	let restaurantName = 'The Red Cafe';
	let discountValue = 'đ1.000.000';
	let discountCondition = 'all dishes above đ500.000';
	let isDiscountSaved = false;
	let restaurantSrc =
		'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png';
	let restaurantHref = '/';
	let imageSrc =
		'https://images.unsplash.com/photo-1608835291093-394b0c943a75?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	let content = 'Come and experience our new dish! The salmon delicioso!';
	let date = 'Jul 10';
</script>

<div class="py-8">
	<TextField id="search" name="search" placeholder="Search" type="search" />
</div>

<Divider full />

<!--<div class="py-8">-->

<!--	<div-->
<!--		class="flex flex-row space-x-4 w-screen sm:sm:w-[40rem] -translate-x-6 scroll-px-6 px-6 py-2 overflow-x-scroll"-->
<!--	>-->
<!--		{#each { length: 5 } as _, i}-->
<!--			<Coupon-->
<!--				{restaurantName}-->
<!--				{restaurantSrc}-->
<!--				{discountValue}-->
<!--				{discountCondition}-->
<!--				{isDiscountSaved}-->
<!--				{restaurantHref}-->
<!--			/>-->
<!--		{/each}-->
<!--	</div>-->
<!--</div>-->

<!--<Divider full />-->

<div class="flex flex-col space-y-8 py-8">
	<Display class="">Discover</Display>
	<Post {content} {date} {imageSrc} {restaurantHref} {restaurantName} {restaurantSrc} />
	<Post {content} {date} {imageSrc} {restaurantHref} {restaurantName} {restaurantSrc} />
	<Post {content} {date} {imageSrc} {restaurantHref} {restaurantName} {restaurantSrc} />
	<Post {content} {date} {imageSrc} {restaurantHref} {restaurantName} {restaurantSrc} />
	<Post {content} {date} {imageSrc} {restaurantHref} {restaurantName} {restaurantSrc} />


</div>
