<script lang="ts">
	import { onMount } from 'svelte';
	import Map from '$lib/components/map/Map.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';

	// import Button from '$lib/components/buttons/Button.svelte';


	async function searchTextQuery(query: string) {
		const url = 'https://places.googleapis.com/v1/places:searchText';
		const apiKey = 'AIzaSyAmfUrL4XL1BvkX3ua_vy0F-p84phgX8fI';

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

	// function getLocation() {
	// 	console.log('hi');
	// 	return new Promise((resolve, reject) => {
	// 		if (typeof navigator !== 'undefined' && navigator.geolocation) {
	// 			navigator.geolocation.getCurrentPosition(
	// 				(position) => {
	// 					const { latitude, longitude } = position.coords;
	// 					console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
	// 					resolve({ latitude, longitude });
	// 				},
	// 				(error) => {
	// 					console.error(`Geolocation Error: ${error.message}`);
	// 					reject(error);
	// 				}
	// 			);
	// 		} else {
	// 			console.error('Geolocation is not supported by this browser.');
	// 			reject(new Error('Geolocation is not supported.'));
	// 		}
	// 	});
	// }

	onMount(async () => {
		console.log('hi');
		try {

			const placesQuery = await searchTextQuery('107 ');
			console.log(placesQuery);
		} catch (error) {
			console.error('An error occurred:', error);
		}
	});

	export let data;
</script>

<LargePageTitle showBackButton>
	My check-ins
</LargePageTitle>


<div class="h-[65vh] py-2">
	<Map heightClasses="h-full" markersData={[]} />
</div>
