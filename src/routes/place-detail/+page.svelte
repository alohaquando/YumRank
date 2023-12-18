<script lang="ts">
	import TabBarPlaceDetail from '$lib/components/navigation/TabBarPlaceDetail.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Display from '$lib/components/typography/Display.svelte';
	import PlaceDetailTitleBlock from '$lib/components/details/PlaceDetailTitleBlock.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import StatsSummary from '$lib/components/details/StatsSummary.svelte';
	import Review from '$lib/components/reviews/Review.svelte';
	import Post from '$lib/components/posts/Post.svelte';
	import Button from '$lib/components/buttons/Button.svelte';

	let restaurantName = 'Wasabi by Morimoto';
	let restaurantSrc =
		'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png';
	let restaurantHref = '/';
	let imageSrc =
		'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	let content = 'Family-run restaurant and cafe, with a specialty in sweets and desserts.';
	let address = '503 Le Quy Don, Ward 8, District 3, HCMC';
	let date = '2023-01-01';

	let options = {
		week: { value: 'week', title: 'week' },
		month: { value: 'month', title: 'month' },
		year: { value: 'year', title: 'year' }
	};

	let rank = 1;
	let checkIns = 8575;
	let favorites = 1234;
	let rating = 4.8;

	let userSrc = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	let userFullName = 'Kristin Watson';
	let time = '2023-01-01';
	let reviewContent = 'The menu at Savor Delights is a testament to the chef\'s creativity and commitment to using fresh, high-quality ingredients.';
	let rv_rating = 4;

</script>

<TabBarPlaceDetail />

<Divider full />

<div class="flex flex-col space-y-8 py-8">
	<PlaceDetailTitleBlock {restaurantSrc} {restaurantName} {restaurantHref} {imageSrc} {content} {address} />
</div>

<LargePageTitle>
	Ranking this
	<TitleDropdown name="time_selected" id="time_selected" slot="trailing" {options} value="week" />
</LargePageTitle>

<StatsSummary {rank} {checkIns} {favorites} {rating} />

<div class="flex flex-col space-y-0 py-8">
	<Title>Check-ins • 45 check-ins</Title>
	<div class="flex flex-col space-y-8 py-8">
		{#each { length: 2 } as _, i}
			<Review {userSrc} {userFullName} {time} content={reviewContent} rating={4} />
		{/each}
	</div>
	<Button href='/place-detail/place-checkin' width='full' design='outlined'>View all</Button>
</div>

<div class="flex flex-col space-y-0 py-8">
	<Title>Posts</Title>
	<div class="flex flex-col space-y-9 py-8">
		{#each { length: 5 } as _, i}
			<Post {restaurantSrc} {restaurantName} {restaurantHref} {imageSrc} {content} {date} />
		{/each}
	</div>
	<Button href='/place-detail/place-posts' width='full' design='outlined'>View all</Button>
</div>