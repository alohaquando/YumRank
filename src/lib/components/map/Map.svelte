<script lang="ts">
	import { Loader } from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';
	import RatingMarker from '$lib/components/map/RatingMarker.svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_GOOGLE_MAPS_API } from '$env/static/public';

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


		(g => {
			var h, a, k, p = 'tsa', c = 'google', l = 'importLibrary', q = '__ib__',
				m = document,
				b = window;
			b = b[c] || (b[c] = {});
			var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams,
				u = () => h || (h = new Promise(async (f, n) => {
					await (a = m.createElement('script'));
					e.set('libraries', [...r] + '');
					for (k in g) e.set(k.replace(/[A-Z]/g, t => '_' + t[0].toLowerCase()), g[k]);
					e.set('callback', c + '.maps.' + q);
					a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
					d[q] = f;
					a.onerror = () => h = n(Error(p + ' could not load.'));
					a.nonce = m.querySelector('script[nonce]')?.nonce || '';
					m.head.append(a);
				}));
			d[l] ? console.warn(p + ' only loads once. Ignoring:', g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
		})({
			key: PUBLIC_GOOGLE_MAPS_API,
			v: 'weekly'
			// Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
			// Add other bootstrap parameters as needed, using camel case.
		});


		const { Map } = await google.maps.importLibrary('maps');
		const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;

		const map = new Map(mapElement, {
			center: { lat: initialLat, lng: initialLong },
			zoom: zoom,
			disableDefaultUI: true,
			mapId: 'lol'
		});

		// setTimeout(() => {
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
		// }, 1);
	});
</script>


<div bind:this={mapElement} class="{customClasses} {heightClasses} w-full rounded-3xl overflow-clip">
	{#each markers as marker, i}
		<RatingMarker bind:thisMarker={marker} rating={markersData[i].rating}>
		</RatingMarker>
	{/each}
</div>





