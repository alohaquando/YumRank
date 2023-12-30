<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import PlaceItems from '$lib/components/place/PlaceItems.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import CreateReview from '$lib/components/reviews/CreateReview.svelte';
</script>

<LargePageTitle>How was your experience at</LargePageTitle>

<PlaceItems
	address="Address"
	name="Wasabi by Morimoto"
	src="https://via.placeholder.com/64x64"
/>

<div class="mt-4">
	<Divider />
</div>

<div class="mt-4">
	<CreateReview
		placeholder="How was your experience here?"
		userFullName="John Doe"
		userSrc="https://via.placeholder.com/64x64"
	/>
</div>

<div class="mt-4">
	<div class="mt-4">
		<Button
			href="/"
			type="submit"
			width="full"
		>
			Complete check-in
		</Button>
	</div>
	<div class="mt-4">
		<Button
			design="outlined"
			href="/"
			width="full"
		>
			Cancel
		</Button>
	</div>
</div>
