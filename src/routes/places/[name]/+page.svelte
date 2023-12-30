<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import Title from '$lib/components/typography/Title.svelte';
	import PlaceDetailTitleBlock from '$lib/components/details/PlaceDetailTitleBlock.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import StatsSummary from '$lib/components/details/StatsSummary.svelte';
	import Review from '$lib/components/reviews/Review.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import {
		ratingExample,
		reviewContentExample,
		timeStampExample,
		userFullNameExample,
		userSrcExample,
		rankExample,
		placeSrcExample,
		placeNameExample,
		hrefExample,
		postContentExample,
		dishSrcExample
	} from '$lib/data/exampleData';
	import Post from '$lib/components/posts/Post.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
	import { faQrcode } from '@fortawesome/pro-thin-svg-icons';

	let webSocketEstablished = false;
	let ws: WebSocket | null = null;
	let log: string[] = [];

	export let data;

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	// export const establishWebSocket = () => {
	// 	if (webSocketEstablished) return;
	// 	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	// 	ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);

	// 	ws.addEventListener('open', (event) => {
	// 		webSocketEstablished = true;
	// 		console.log('[websocket] connection open', event);

	// 		logEvent('[websocket] connection open');

	// 	});
	// 	ws.addEventListener('close', (event) => {
	// 		console.log('[websocket] connection closed', event);
	// 		logEvent('[websocket] connection closed');
	// 	});
	// 	ws.addEventListener('message', (event) => {
	// 		console.log('[websocket] message received', event);
	// 		logEvent(`${event.data}`);
	// 	});
	// };

	const urlParams = $page.url.pathname.split('/').slice(2).join('/');

	export const requestData = async () => {
		if (webSocketEstablished) return;
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);

		ws.addEventListener('open', (event) => {
			webSocketEstablished = true;
			console.log('[websocket] connection open', event);
		});
		ws.addEventListener('close', (event) => {
			console.log('[websocket] connection closed', event);
		});
		ws.addEventListener('message', (event) => {
			console.log('[websocket] message received', event);
			logEvent(event.data);
		});
		const res = await fetch(`/places/${urlParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// const data = await res.json();
		// logEvent(`[GET] data received: ${data.ownerId}`);
	};

</script>

<!--		<ul>-->
<!--{#each log as event}-->
<!--	{#if event.includes('image/png')}-->
<!--		<img src={event} alt="QR" />-->
<!--	{/if}-->
<!--	<li>{event}</li>-->
<!--{/each}-->
<!--		</ul>-->

<div>
	{#if data.restaurant}
		{#if data.owner}
			<AlertCard>
				<Fa
					icon={faInfoCircle}
					slot="icon"
				/>
				<Title slot="title">You are the manager of this site</Title>
				<Button
					slot="body"
					width="full"
					href="/places/{data.placeName}/check-ins/generate-qr"
				>
					<Fa
						icon={faQrcode}
						slot="icon"
					/>
					Generate QR code for check-in
				</Button>
			</AlertCard>
		{/if}

		<div class="flex flex-col space-y-8 py-8">
			<!--TODO: bind:isFavorite={...} to the PlaceDetailTitleBlock @Khai-->
			<!--TODO: favoriteButtonOnClick() @Khai -->
			<PlaceDetailTitleBlock
				placeName={data.restaurant.name}
				placeImagesSrcs={data.restaurant.res_images}
				placeLogoSrc={data.restaurant.logo_url}
				desc={data.restaurant.description}
				address={data.restaurant.address}
				checkInButtonOnClick={() => requestData()}
				favoriteButtonOnClick={() => {
						window.alert("Favorite button clicked")
					}}
				checkInButtonDisabled={data.owner}
			/>
		</div>

		<!-- TODO: Implement filter? @Khai -->
		<LargePageTitle>
			Ranking this
			<TitleDropdown
				name="time_selected"
				id="time_selected"
				slot="trailing"
				value="week"
			/>
		</LargePageTitle>

		<!-- TODO: Get rank and favorites count. @Khai -->
		<StatsSummary
			checkIns={data.restaurant.numReviews}
			rating={data.restaurant.avgRating}
			rank={$rankExample}
			favorites={0}
		/>

		<div class="flex flex-col space-y-0 py-8">
			<Title>Check-ins • {data.restaurant.numReviews} check-ins</Title>
			<div class="flex flex-col space-y-8 py-8">
				{#each { length: 3 } as _}
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
			<Button
				href="{data.restaurant.name}/check-ins"
				width="full"
				design="outlined">View all check-ins
			</Button
			>
		</div>

		<div class="flex flex-col space-y-0 py-8">
			<Title>Posts</Title>
			<div class="flex flex-col space-y-9 py-8">
				{#each { length: 3 } as _}
					<!-- TODO: Get posts. @Khai -->
					<Post
						placeSrc={$placeSrcExample}
						placeName={$placeNameExample}
						placeHref={$hrefExample}
						content={$postContentExample}
						timeStamp={$timeStampExample}
						imageSrc={$dishSrcExample}
					/>
				{/each}
			</div>
			<Button
				href="{data.restaurant.name}/posts"
				width="full"
				design="outlined">View all posts
			</Button
			>
		</div>
	{/if}
</div>

