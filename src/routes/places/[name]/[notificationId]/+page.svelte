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
	import { goto } from '$app/navigation';
	import Button from '$lib/components/buttons/Button.svelte';

	// let isScanned = false;
	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let webSocketEstablished = false;
	let ws: WebSocket | null = null;
	let log: string[] = [];

	let qrGenerated = false;

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	const urlParts = $page.url.pathname.split('/');
	urlParts.pop(); // Remove the last part
	const urlParams = urlParts.slice(2).join('/');

	export const requestData = async () => {
		if (webSocketEstablished) return;
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${window.location.host}/websocket:8080`);

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

	async function newQR() {
		const upsertData = {
			restaurant_id: data.noti?.restaurant_id,
			user_id: data.noti?.sender_id,
			qr_code_exp: new Date(Date.now() + 2 * 60 * 1000).toISOString()
		};
		const { error } = await supabase
			.from('qrscanning')
			.upsert(upsertData, { onConflict: ['restaurant_id', 'user_id'] });

		if (error) {
			console.log(error);
		} else {
			requestData();
			qrGenerated = true;
		}
	}
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

	{#if data.noti.type === 'checkin'}
		<Title class="text-center max-w-md mx-auto">
			{#if !qrGenerated}
				Click the button to generate a QR code for checking in
			{:else }
				Inform {data.noti?.profiles?.username} to scan the QR code to check-in {data.noti?.restaurants?.name}
			{/if}
		</Title>

		{#if !qrGenerated}
			<Button design="filled" on:click={() => newQR()} class="w-full">Generate QR code</Button>
		{/if}

		<ul>
			{#each log as event}
				{#if event.includes('image/png')}
					<img src={event} alt="QR" class="w-full aspect-square max-h-[50vh] object-contain" />
				{/if}
			{/each}
		</ul>

	{:else}
		<Headline class="text-center max-w-md mx-auto"
		>{data.noti?.profiles?.username} left a review for {data.noti?.restaurants
			?.name}</Headline
		>
	{/if}


</div>
