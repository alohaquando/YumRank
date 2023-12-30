<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import TabBarPlaceDetail from '$lib/components/navigation/TabBarPlaceDetail.svelte';
	import Review from '$lib/components/reviews/Review.svelte';

	let userSrc =
		'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	let userFullName = 'Kristin Watson';
	let time = '2023-01-01';
	let content =
		'The menu at Savor Delights is a testament to the chef\'s creativity and commitment to using fresh, high-quality ingredients.';
	let rating = 4;
</script>

<TabBarPlaceDetail />
<div class="flex flex-col space-y-8 py-8">
	{#each { length: 5 } as _, i}
		<Review
			{userSrc}
			{userFullName}
			{time}
			{content}
			{rating}
		/>
	{/each}
</div>
