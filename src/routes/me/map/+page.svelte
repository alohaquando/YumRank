<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Button from '$lib/components/buttons/Button.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import { faFaceSmileWink, faHeart, faUserCircle } from '@fortawesome/pro-regular-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import SectionTitle from '$lib/components/layouts/SectionTitle.svelte';
	import { hrefExample } from '$lib/data/exampleData';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		if (typeof navigator !== 'undefined' && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;
				console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
			}, (error) => {
				console.error(`Error: ${error.message}`);
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	});

    export let data;
</script>