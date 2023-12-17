<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import { page } from '$app/stores';
	let webSocketEstablished = false;
	let ws: WebSocket | null = null;
	let log: string[] = [];

	export let data;

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	export const establishWebSocket = () => {
		if (webSocketEstablished) return;
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);

		ws.addEventListener('open', (event) => {
			webSocketEstablished = true;
			console.log('[websocket] connection open', event);
			logEvent('[websocket] connection open');

		});
		ws.addEventListener('close', (event) => {
			console.log('[websocket] connection closed', event);
			logEvent('[websocket] connection closed');
		});
		ws.addEventListener('message', (event) => {
			console.log('[websocket] message received', event);
			logEvent(`${event.data}`);
		});
	};
	
	const urlParams = $page.url.pathname.split('/').slice(2).join('/');
	
	export const requestData = async () => {
		// if (webSocketEstablished) return;
		// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		// ws = new WebSocket(`${protocol}//${window.location.host}/websocket`);

		// ws.addEventListener('open', (event) => {
		// 	webSocketEstablished = true;
		// 	console.log('[websocket] connection open', event);
		// 	logEvent('[websocket] connection open');
		// });
		// ws.addEventListener('close', (event) => {
		// 	console.log('[websocket] connection closed', event);
		// 	logEvent('[websocket] connection closed');
		// });
		// ws.addEventListener('message', (event) => {
		// 	console.log('[websocket] message received', event);
		// 	logEvent(event.data);
		// });
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

<div>
	{#if data.restaurant}
		{#each data.restaurant as item}
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
		{/each}
	{/if}
</div>

<main>
	<Button disabled={webSocketEstablished} on:click={() => establishWebSocket()}>
		Establish WebSocket connection
	</Button>

	<Button  on:click={() => requestData()}>
		check-in (will send back qr hard-coded for n)
	</Button>

	<ul>
		{#each log as event}
			{#if event.includes('image/png')}
				<img src={event} alt="QR" />
			{/if}
			<li>{event}</li>
		{/each}
	</ul>
</main>

<style>
	main {
		font-family: sans-serif;
	}
</style>
