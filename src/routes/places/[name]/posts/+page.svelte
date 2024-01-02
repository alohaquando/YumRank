<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Post from '$lib/components/posts/Post.svelte';
	import { faPlus } from '@fortawesome/pro-solid-svg-icons';
	import Button from '$lib/components/buttons/Button.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';
	import Body from '$lib/components/typography/Body.svelte';

	export let data;
</script>

<div class="flex flex-col space-y-8">
	{#if data.owner}
		<Button
			width="full"
			href="/places/{data.placeName}/posts/add-post"
		>
			<Fa
				icon={faPlus}
				slot="icon"
			/>
			Add a post
		</Button>
		<Divider />
	{/if}
	{#if data.posts}
		<div class="flex flex-col space-y-9 py-8">
			{#if data.posts.length > 0}
				{#each data.posts as post}
					<!-- TODO: Test -->
					<Post
						content={post.content}
						imageSrcs={post.post_image_urls}
						placeHref="/places/{post.restaurants.name}/posts/{post.id}"
						placeName={post.restaurants.name}
						placeSrc={post.restaurants.logo_url}
						timeStamp={convertTimestampToLocale(post.created_at)}
					/>
				{/each}
			{:else}
				<Body class="text-center opacity-50">No posts yet</Body>
			{/if}
		</div>
	{/if}
</div>
