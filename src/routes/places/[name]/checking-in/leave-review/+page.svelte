<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import PlaceItems from '$lib/components/place/PlaceItems.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import CreateReview from '$lib/components/reviews/CreateReview.svelte';
	import { enhance } from '$app/forms';
	import Rating from '$lib/components/reviews/Rating.svelte';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	export let form;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let isLoading = false;

	let rating: number = 0;
	let reviewText: string = '';

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	};
</script>

<LargePageTitle>How was your experience at</LargePageTitle>

<div class="flex flex-col space-y-4">
	<PlaceItems
		address={data.restaurant.address}
		name={data.restaurant.name}
		src={data.restaurant.logo_url}
	/>

	<Divider />

	<form
		action="?/create"
		class="flex flex-col space-y-6 pt-4"
		method="POST"
		use:enhance={handleSubmit}
	>
		<TitleItem
			src={data.myProfile?.avatar_url}
			title={data.myProfile?.full_name}
		/>

		<div class="flex items-center space-x-4">
			<Rating bind:rating />

			{#if rating > 0}
				<Title class="text-xl">{rating} star{rating === 1 ? '' : 's'}</Title>
			{/if}

			<input
				bind:value={rating}
				class="hidden"
				id="rating"
				name="rating"
				required
				type="number"
			/>
		</div>

		<TextArea
			bind:value={reviewText}
			id="text"
			name="text"
			placeholder="Write about your experience here..."
			required
		/>

		<div class="flex-col flex space-y-4 pt-8">
			<!-- TODO: Implement -->
			<Button
				class="w-full"
				disabled={rating === 0 || reviewText === ''}
				type="submit"
			>
				Submit
			</Button>

			<Button
				class="w-full"
				design="outlined"
				href="/places/{data.restaurant.name}"
			>
				Cancel
			</Button>
		</div>
	</form>
</div>
