<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import PlaceItems from '$lib/components/place_items/PlaceItems.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import CreateReview from '$lib/components/reviews/CreateReview.svelte';
</script>

<LargePageTitle>How was your experience at</LargePageTitle>

<PlaceItems
	name="Wasabi by Morimoto"
	address="Address"
	src="https://via.placeholder.com/64x64"
/>

<div class="mt-4">
	<Divider />
</div>

<div class="mt-4">
	<CreateReview
		userSrc="https://via.placeholder.com/64x64"
		userFullName="John Doe"
		placeholder="How was your experience here?"
	/>
</div>

<div class="mt-4">
	<div class="mt-4">
		<Button
			width="full"
			href="/"
			type="submit"
		>
			Complete check-in</Button
		>
	</div>
	<div class="mt-4">
		<Button
			width="full"
			design="outlined"
			href="/"
		>
			Cancel</Button
		>
	</div>
</div>
