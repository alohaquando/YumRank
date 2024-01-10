<script lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';


	let mapElement: HTMLElement;

	onMount(async () => {
		let loader = new Loader({
			apiKey: 'AIzaSyBGJm4FHAYg8fs_xcFKPbXn5E9xXz-HDyU',
			version: 'weekly'
		});

		await loader.importLibrary('maps');

		const { Map } = await google.maps.importLibrary('maps');

		new Map(mapElement, {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8
		});

	});
</script>

<div bind:this={mapElement} class="h-96 h-96"></div>