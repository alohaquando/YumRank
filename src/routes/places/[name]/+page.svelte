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
	import { rankExample } from '$lib/data/exampleData';
	import Post from '$lib/components/posts/Post.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import { faInfoCircle, faQrcode } from '@fortawesome/pro-solid-svg-icons';
	import convertTimestampToLocale from '$lib/data/convertTimestampToLocale';
	import Body from '$lib/components/typography/Body.svelte';
	import Headline from '$lib/components/typography/Headline.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// let webSocketEstablished = false;
	// let ws: WebSocket | null = null;
	// let log: string[] = [];

	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	// const logEvent = (str: string) => {
	// 	log = [...log, str];
	// };

	const urlParams = $page.url.pathname.split('/').slice(2).join('/');

	// export const requestData = async () => {
	// 	if (webSocketEstablished) return;
	// 	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	// 	ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);

	// 	ws.addEventListener('open', (event) => {
	// 		webSocketEstablished = true;
	// 		console.log('[websocket] connection open', event);
	// 	});
	// 	ws.addEventListener('close', (event) => {
	// 		console.log('[websocket] connection closed', event);
	// 	});
	// 	ws.addEventListener('message', (event) => {
	// 		console.log('[websocket] message received', event);
	// 		logEvent(event.data);
	// 	});
	// 	const res = await fetch(`/places/${urlParams}`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	});
	// 	// const data = await res.json();
	// 	// logEvent(`[GET] data received: ${data.ownerId}`);
	// };

	let isFavorite = true;

	onMount(async () => {
		await checkFavoriteStatus();
	});

	async function checkIn() {
		const { data: checkin, error } = await supabase
			.from('notifications')
			.insert([
				{
					restaurant_id: data.restaurant.id,
					sender_id: session?.user.id,
					type: 'checkin',
					seen: false
				}
			]);
		if (error) {
			console.log(error);
		} else {
			goto(`/places/${urlParams}/checking-in/confirm`);
		}
	}

	async function checkFavoriteStatus() {
		const response = await fetch(`${urlParams}?/status`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const data = await response.json();
			isFavorite = data.isFavorite;
		} else {
			const data = await response.json();
			console.log(data.message);
		}
	}

	async function handleFavoriteToggle() {
		const endpoint = isFavorite ? `${urlParams}?/unfavorite` : `${urlParams}?/favorite`;

		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ placeId: data.restaurant.id })
		});

		if (!response.ok) {
			console.log(response);
			const data = await response.json();
		} else {
			isFavorite = !isFavorite; // Toggle isFavorite state
		}
	}
</script>

<!-- <ul>
	{#each log as event}
		{#if event.includes('image/png')}
			<img src={event} alt="QR" />
		{:else}
			<p>{event}</p>
		{/if}
	{/each}
</ul> -->

<div>
	{#if data.restaurant}
		{#if data.owner}
			<AlertCard>
				<Fa
					icon={faInfoCircle}
					slot="icon"
				/>
				<Title slot="title">You are the manager of this site</Title>
				<!--				<Button-->
				<!--					slot="body"-->
				<!--					width="full"-->
				<!--					href="/places/{data.placeName}/check-ins/generate-qr"-->
				<!--				>-->
				<!--					<Fa-->
				<!--						icon={faQrcode}-->
				<!--						slot="icon"-->
				<!--					/>-->
				<!--					Generate QR code for check-in-->
				<!--				</Button>-->
			</AlertCard>
		{/if}

		<div class="flex flex-col space-y-8 py-4">
			<!--TODO: bind:isFavorite={...} to the PlaceDetailTitleBlock @Khai-->
			<!--TODO: favoriteButtonOnClick() @Khai -->
			<PlaceDetailTitleBlock
				placeName={data.restaurant.name}
				placeImagesSrcs={data.restaurant.res_images}
				placeLogoSrc={data.restaurant.logo_url}
				desc={data.restaurant.description}
				address={data.restaurant.address}
				checkInButtonOnClick={() => checkIn()}
				bind:isFavorite
				favoriteButtonOnClick={handleFavoriteToggle}
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

		<!-- TODO: Get rank and favorites count. @Khai-->
		<StatsSummary
			checkIns={data.restaurant.numReviews}
			rating={data.restaurant.avgRating}
			rank={data.placeRanking}
			favorites={data.restaurant.favorite_count}
			class="mb-8"
		/>

		<div class="flex flex-col space-y-0 py-4">
			{#if data.checkIns}
				<Headline
				>Check-ins • {data.checkIns.length} check-in{data.checkIns.length !== 1
					? 's'
					: ''}</Headline
				>
				<div class="flex flex-col space-y-8 py-8">
					{#if data.checkIns.length > 0}
						{#each data.checkIns.slice(0, 3) as checkIn}
							<!-- TODO: Test -->
							<Review
								userSrc={checkIn.profiles.avatar_url}
								userFullName={checkIn.profiles.full_name}
								reviewHref="/places/{checkIn.restaurants.name}/check-ins/{checkIn.id}"
								timeStamp={convertTimestampToLocale(checkIn.created_at)}
								content={checkIn.text}
								rating={checkIn.rating}
							/>
						{/each}
						<Button
							href="{data.restaurant.name}/check-ins"
							width="full"
							design="outlined"
						>View all check-ins
						</Button>
					{:else}
						<Body class="text-center opacity-50">No check-ins yet</Body>
					{/if}
				</div>
			{/if}
		</div>

		<div class="flex flex-col space-y-0 py-4">
			{#if data.posts}
				<Headline>Posts • {data.posts.length} post{data.posts.length !== 1 ? 's' : ''}</Headline>
				<div class="flex flex-col space-y-9 py-8">
					{#if data.posts.length > 0}
						{#each data.posts.slice(0, 3) as post}
							<!-- TODO: Test -->
							<Post
								content={post.content}
								imageSrcs={post.post_image_urls}
								postHref="/places/{post.restaurants.name}/posts/{post.id}"
								placeName={post.restaurants.name}
								placeSrc={post.restaurants.logo_url}
								timeStamp={convertTimestampToLocale(post.created_at)}
							/>
						{/each}
						<Button
							href="{data.restaurant.name}/posts"
							width="full"
							design="outlined"
						>View all posts
						</Button>
					{:else}
						<Body class="text-center opacity-50">No posts yet</Body>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
