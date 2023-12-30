<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import TabBarPlaceDetail from '$lib/components/navigation/TabBarPlaceDetail.svelte';
	import Post from '$lib/components/posts/Post.svelte';

	let restaurantName = 'Wasabi by Morimoto';
	let restaurantSrc =
		'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png';
	let restaurantHref = '/';
	let imageSrc =
		'https://images.unsplash.com/photo-1608835291093-394b0c943a75?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	let content = 'Family-run restaurant and cafe, with a specialty in sweets and desserts.';
	let date = '2023-01-01';
</script>

<TabBarPlaceDetail />
<div class="flex flex-col space-y-8 py-8">
	{#each { length: 5 } as _, i}
		<Post
			{restaurantName}
			{restaurantSrc}
			{restaurantHref}
			{imageSrc}
			{content}
			{date}
		/>
	{/each}
</div>
