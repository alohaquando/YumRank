<script lang="ts">
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import { faStar } from '@fortawesome/pro-regular-svg-icons';
	import { faStar as faStarFilled } from '@fortawesome/pro-solid-svg-icons';
	import Fa from 'svelte-fa';
	import textarea from '$lib/components/inputs/TextArea.svelte';
	import Rating from '$lib/components/reviews/Rating.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';

	let rating: number | null = null;
	export let userSrc: string;
	export let userFullName: string;
</script>

