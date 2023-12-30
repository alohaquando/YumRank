<script lang="ts">
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import { faStar } from '@fortawesome/pro-regular-svg-icons';
	import { faStar as faStarFilled } from '@fortawesome/pro-solid-svg-icons';
	import Fa from 'svelte-fa';
	import textarea from '$lib/components/inputs/TextArea.svelte';
	import Rating from '$lib/components/reviews/Rating.svelte';

	let rate: number | null = null;
	let textInput = '';
	export let userSrc: string;
	export let userFullName: string;
	export let placeholder: string;
</script>

<div class="flex flex-col space-y-4">
	<TitleItem
		title={userFullName}
		src={userSrc}
	/>
	<div class="flex-row flex space-x-2">
		<Rating bind:rating={rate} />
	</div>
	<textarea
		class="w-full h-32 border-2 border-grey-300 rounded-lg"
		bind:value={textInput}
		{placeholder}
	/>
</div>
