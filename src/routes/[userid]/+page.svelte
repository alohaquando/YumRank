<script lang="ts">
	import { onMount } from 'svelte';
	import Map from '$lib/components/map/Map.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Body from '$lib/components/typography/Body.svelte';

	let placeName: string;
	let allPlace = [];
	let dataloaded = false;

	// import Button from '$lib/components/buttons/Button.svelte';


	async function searchTextQuery(query: string) {
		const url = 'https://places.googleapis.com/v1/places:searchText';
		const apiKey = 'AIzaSyBGJm4FHAYg8fs_xcFKPbXn5E9xXz-HDyU';

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-Api-Key': apiKey,
					'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.location'
				},
				body: JSON.stringify({
					textQuery: query
				})
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data.places;
		} catch (error) {
			throw new Error(`An error occurred in searchTextQuery: ${error}`);
		}
	}

	export let data;
	let markersData = [];


	onMount(async () => {
		try {
			for (const review of data.myReviews) {
				const mapsInfo = await searchTextQuery(review.restaurants.address);
				const latitude = mapsInfo[0].location.latitude;
				const longitude = mapsInfo[0].location.longitude;
				const restaurantName = review.restaurants.name;
				const merged = { ...review, latitude, longitude, restaurantName };
				await markersData.push(merged);
			}
			dataloaded = true;
		} catch (error) {
			console.error('An error occurred:', error);
		}
	});


</script>

<LargePageTitle showBackButton>
	<Image
		class="h-10 w-10 rounded-full"
		slot="leading"
		src={data.profile.avatar_url}
	/>
	{data.profile.full_name}'s check-ins
</LargePageTitle>


<div class="h-[65vh] py-2">
	{#if dataloaded}
	<Map heightClasses="h-full" {markersData} />
	{:else}
	<Body class="opacity-50 text-center">
		You haven't check-in anywhere yet. <br />
		Check-in to a place to see your it on the map
	</Body>
	{/if}
</div>