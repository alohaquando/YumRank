<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Review from '$lib/components/reviews/Review.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { faQrcode } from '@fortawesome/pro-solid-svg-icons';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';
	import Body from '$lib/components/typography/Body.svelte';

	export let data;
</script>

<!-- TODO: Link button function -->
<div class="flex flex-col space-y-8">
	{#if data.owner}
		<Button
			width="full"
			href="/places/{data.placeName}/check-ins/generate-qr"
		>
			<Fa
				icon={faQrcode}
				slot="icon"
			/>
			Generate QR code for check-in
		</Button>
		<Divider />
	{/if}
	{#if data.checkIns}
		<div class="flex flex-col space-y-8 py-8">
			{#if data.checkIns.length > 0}
				{#each data.checkIns as checkIn}
					<!-- TODO: Test -->
					<Review
						userSrc={checkIn.profiles.avatar_url}
						userFullName={checkIn.profiles.full_name}
						reviewHref="/places/{checkIn.restaurants.name}/check-ins/{checkIn.id}"	
						timeStamp={convertTimestampToLocale(checkIn.created_at)}
						content={checkIn.text}
						rating={checkIn.rating}
					/>
				{/each}
			{:else}
				<Body class="text-center opacity-50">No check-ins yet</Body>
			{/if}
		</div>
	{/if}
</div>
