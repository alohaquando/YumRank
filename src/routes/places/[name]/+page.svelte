<script lang="ts">
	import { page } from '$app/stores';
	import TabBarPlaceDetail from '$lib/components/navigation/TabBarPlaceDetail.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import PlaceDetailTitleBlock from '$lib/components/details/PlaceDetailTitleBlock.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import StatsSummary from '$lib/components/details/StatsSummary.svelte';
	import Review from '$lib/components/reviews/Review.svelte';
	import Post from '$lib/components/posts/Post.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import Fa from 'svelte-fa';
	import { faInfoCircle, faQrcode } from '@fortawesome/pro-solid-svg-icons';

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

	let options = ['week', 'month', 'year'];

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

	// let restaurantName = 'Wasabi by Morimoto';
	// let restaurantSrc =
	// 	'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png';
	// let restaurantHref = '/';
	// let imageSrc =
	// 	'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	// let address = '503 Le Quy Don, Ward 8, District 3, HCMC';
	// let date = '2023-01-01';
	//
	// let options = {
	// 	week: { value: 'week', title: 'week' },
	// 	month: { value: 'month', title: 'month' },
	// 	year: { value: 'year', title: 'year' }
	// };
	//
	// let rank = 1;
	// let checkIns = 8575;
	// let favorites = 1234;
	// let rating = 4.8;
	//
	// let userSrc = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	// let userFullName = 'Kristin Watson';
	// let time = '2023-01-01';
	// let reviewContent = 'The menu at Savor Delights is a testament to the chef\'s creativity and commitment to using fresh, high-quality ingredients.';


</script>
<div>
	{#if data.restaurant}
		{#each data.restaurant as item}
			<TabBarPlaceDetail />

			<div class="flex flex-col space-y-8 py-8">
				<PlaceDetailTitleBlock
					restaurantName={item.name}
					imageSrc={item.res_images != null ? item.res_images[0] : ''}
					desc={item.description}
					address={item.address}
					checkInButtonOnClick={() => requestData()}
					checkInButtonDisabled={data.owner}
				/>
			</div>

			<LargePageTitle>
				Ranking this
				<TitleDropdown
					name="time_selected"
					id="time_selected"
					slot="trailing"
					{options}
					value="week"
				/>
			</LargePageTitle>

			<!--			<StatsSummary {rank} {checkIns} {favorites} {rating} />-->

			<!--			<div class="flex flex-col space-y-0 py-8">-->
			<!--				<Title>Check-ins • 45 check-ins</Title>-->
			<!--				<div class="flex flex-col space-y-8 py-8">-->
			<!--					{#each { length: 2 } as _, i}-->
			<!--						<Review {userSrc} {userFullName} {time} content={reviewContent} rating={4} />-->
			<!--					{/each}-->
			<!--				</div>-->
			<!--				<Button href='/place-detail/place-checkin' width='full' design='outlined'>View all</Button>-->
			<!--			</div>-->

			<!--			<div class="flex flex-col space-y-0 py-8">-->
			<!--				<Title>Posts</Title>-->
			<!--				<div class="flex flex-col space-y-9 py-8">-->
			<!--					{#each { length: 5 } as _, i}-->
			<!--						<Post {restaurantSrc} {restaurantName} {restaurantHref} {imageSrc} desc="" {date} />-->
			<!--					{/each}-->
			<!--				</div>-->
			<!--				<Button href='/place-detail/place-posts' width='full' design='outlined'>View all</Button>-->
			<!--			</div>-->

			<p>{item.id}</p>
			<p>{item.created_at}</p>
			<p>{item.owner_id}</p>
			<p>{item.name}</p>
			<p>{item.description}</p>
			<p>{item.is_verified}</p>
			<p>{item.res_images}</p>
			<p>{item.menu_images}</p>
			<p>{item.cuisine}</p>
			<p>{item.address}</p>
			<p>{item.logo_url}</p>
			{#if data.owner}
				<Button on:click={() => requestData()}>Check Notification</Button>
			{:else}
				<Button on:click={() => requestData()}>Check-in</Button>
			{/if}

			{#if data.owner}
				<AlertCard class="mt-4">
					<Fa
						icon={faInfoCircle}
						slot="icon"
					/>
					<Title slot="title">You are the manager of this site</Title>
					<Button
						slot="body"
						width="full"
					>
						<Fa
							icon={faQrcode}
							slot="icon"
						/>
						Generate QR code for check-in
					</Button>
				</AlertCard>
			{/if}

			<!--		<ul>-->
			<!--{#each log as event}-->
			<!--	{#if event.includes('image/png')}-->
			<!--		<img src={event} alt="QR" />-->
			<!--	{/if}-->
			<!--	<li>{event}</li>-->
			<!--{/each}-->
			<!--		</ul>-->
		{/each}
	{/if}
</div>
