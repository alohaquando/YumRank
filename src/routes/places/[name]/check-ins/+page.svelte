<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Review from '$lib/components/reviews/Review.svelte';
	import {
		hrefExample,
		ratingExample,
		reviewContentExample,
		timeStampExample,
		userFullNameExample,
		userSrcExample
	} from '$lib/data/exampleData';
	import Button from '$lib/components/buttons/Button.svelte';
	import { faQrcode } from '@fortawesome/pro-solid-svg-icons';
	import Divider from '$lib/components/layouts/Divider.svelte';

	export let data;
</script>

<!-- TODO: Link button function -->
<div class="flex flex-col space-y-8">
	{#if data.owner}
		<Button
			width="full"
			href={$hrefExample}
		>
			<Fa
				icon={faQrcode}
				slot="icon"
			/>
			Generate QR code for check-in
		</Button>
		<Divider></Divider>
	{/if}
	{#each { length: 5 } as _}
		<!-- TODO: Get check-ins. @Khai -->
		<Review
			userSrc={$userSrcExample}
			userFullName={$userFullNameExample}
			timeStamp={$timeStampExample}
			content={$reviewContentExample}
			rating={$ratingExample}
		/>
	{/each}
</div>
