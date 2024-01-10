<script lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';
	import RatingMarker from '$lib/components/map/RatingMarker.svelte';
	import { goto } from '$app/navigation';

	export let initialLat: number = 10.777499861979388;
	export let initialLong: number = 106.69538241308348;
	export let zoom: number = 12;

	export let heightClasses = 'h-96';

	let customClasses = '';
	export { customClasses as class };

	let mapElement: HTMLElement;

	export let markersData;

	let markers: HTMLElement[] = new Array(markersData.length);

	onMount(async () => {
		let loader = new Loader({
			apiKey: 'AIzaSyBGJm4FHAYg8fs_xcFKPbXn5E9xXz-HDyU',
			version: 'weekly'
		});

		await loader.importLibrary('maps');
		await loader.importLibrary('marker');

		const { Map } = await google.maps.importLibrary('maps');
		const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

		const map = new Map(mapElement, {
			center: { lat: initialLat, lng: initialLong },
			zoom: zoom,
			disableDefaultUI: true,
			mapId: 'lol'
		});

		setTimeout(() => {
			for (let i = 0; i < markersData.length; i++) {
				console.log(markersData[i].latitude, markersData[i].longitude, markersData[i].rating);
				const marker = new AdvancedMarkerElement({
					map,
					position: { lat: markersData[i].latitude, lng: markersData[i].longitude },
					content: markers[i]
				});

				marker.addListener('click', async () => {
					await goto(`/places/${markersData[i].restaurantName}/check-ins/${markersData[i].id}`);
				});
			}
		}, 100);
	});
</script>


<div bind:this={mapElement} class="{customClasses} {heightClasses} w-full rounded-3xl overflow-clip">
	{#each markers as marker, i}
		<RatingMarker bind:thisMarker={marker} rating={markersData[i].rating}>
		</RatingMarker>
	{/each}
</div>





