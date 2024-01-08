<script lang="ts">
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import { faCheck, faChevronLeft, faSpinner } from '@fortawesome/pro-regular-svg-icons';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Headline from '$lib/components/typography/Headline.svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';

	let isScanned = false;
	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let webSocketEstablished = false;
	let ws: WebSocket | null = null;
	let log: string[] = [];

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	const urlParts = $page.url.pathname.split('/');
	urlParts.pop(); // Remove the last part
	const urlParams = urlParts.slice(2).join('/');
	console.log(urlParams);

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

<div class="flex flex-col space-y-6 pt-4">
	<ActionChip
		design="text"
		on:click={function () {
			history.back();
		}}
	>
		<Fa
			icon={faChevronLeft}
			slot="icon"
		/>
		Back
	</ActionChip>

	<Headline class="text-center max-w-md mx-auto"
		>Inform {data.noti?.profiles?.username} to scan the QR code to check-in {data.noti?.restaurants
			?.name}</Headline
	>

	<ul>
		{#each log as event}
			{#if event.includes('image/png')}
				<img
					src={event}
					alt="QR"
				/>
			{/if}
		{/each}
	</ul>

	<!-- <Body
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		class="px-12 max-w-md mx-auto"
		viewBox="0 0 342 342"
	/> -->

	<Button
		on:click={() => requestData()}
		class="!text-sm opacity-70 text-center">Generate</Button
	>

	{#if !isScanned}
		<AlertCard design="gray">
			<Fa
				icon={faSpinner}
				slot="icon"
			/>
			<Title slot="title">Waiting for guests to scan</Title>
		</AlertCard>
	{:else}
		<AlertCard design="green">
			<Fa
				icon={faCheck}
				slot="icon"
			/>
			<Title slot="title">Guest scanned successfully</Title>
			<Body slot="body">This screen will close automatically in 5 seconds</Body>
		</AlertCard>
	{/if}
</div>
