<script lang="ts">
    import TabBarPlaceDetail from '$lib/components/navigation/TabBarPlaceDetail.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
    import Title from '$lib/components/typography/Title.svelte';
	import Display from '$lib/components/typography/Display.svelte';
    import InfoCheckin from '$lib/components/details/InfoCheckin.svelte';
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
		'https://images.unsplash.com/photo-1608835291093-394b0c943a75?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
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

    let userSrc = 'data:image/jpeg;base64,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';
	let userFullName = 'Kristin Watson';
	let time = '2023-01-01';
	let rv_content = 'The menu at Savor Delights is a testament to the chef\'s creativity and commitment to using fresh, high-quality ingredients.';
	let rv_rating = 4;

</script>

<TabBarPlaceDetail />

<Divider full />

<div class="flex flex-col space-y-8 py-8">
	<InfoCheckin {restaurantSrc} {restaurantName} {restaurantHref} {imageSrc} {content} {address}/>
</div>

<LargePageTitle>
	Ranking this
	<TitleDropdown id="time_selected" name="time_selected" {options} slot="dropdown" value="week" />
</LargePageTitle>

<StatsSummary {rank} {checkIns} {favorites} {rating} />

<div class="flex flex-col space-y-0 py-8">
    <Title>Check-ins • 45 check-ins</Title>
    <div class="flex flex-col space-y-8 py-8">
	    {#each { length: 2 } as _, i}
		    <Review {userSrc} {userFullName} {time} {rv_content} {rv_rating} />
	    {/each}
    </div>
    <Button href='/place-detail/place-checkin'>View all</Button>
</div>

<div class="flex flex-col space-y-0 py-8">
    <Title>Posts</Title>
    <div class="flex flex-col space-y-9 py-8">
        {#each { length: 5 } as _, i}
		    <Post {restaurantSrc} {restaurantName} {restaurantHref} {imageSrc} {content} {date} />
	    {/each}
    </div>
    <Button href='/place-detail/place-posts'>View all</Button>
</div>