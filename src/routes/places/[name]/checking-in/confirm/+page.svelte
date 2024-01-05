<script
	lang="ts"
	src="jsQr.js"
>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import PlaceItems from '$lib/components/place/PlaceItems.svelte';
	import Fa from 'svelte-fa';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import { faCamera, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Headline from '$lib/components/typography/Headline.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import jsQR from 'jsqr';

	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	let video: any;
	let canvas: any;
	let context: any;

	onMount(async () => {
		video = document.getElementById('video');
		canvas = document.getElementById('canvas');
		context = canvas.getContext('2d');

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
				video.srcObject = stream;
				video.play();
			});
		}
	});
	async function scanQR() {
		context.drawImage(video, 0, 0, 640, 480);
		let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		let code = jsQR(imageData.data, imageData.width, imageData.height);
		if (code) {
			console.log(code.data);
			// let { data, error } = await supabase.from('places').select('*').eq('qr_code', code.data);
			// if (data && data.length > 0) {
			// 	goto('/check-in');
			// }
		}
	}
</script>

<LargePageTitle showBackButton>Checking in at</LargePageTitle>

<div class="flex-col flex space-y-4">
	<video
		id="video"
		width="640"
		height="480"
		style="display:none;"
	>
		<track kind="captions" />
	</video>
	<canvas
		id="canvas"
		width="640"
		height="480"
		style="display:none;"
	/>
	<button on:click={scanQR}>Open Camera</button>

	<PlaceItems
		address={data.restaurant.address}
		name={data.restaurant.name}
		src={data.restaurant.logo_url}
	/>

	<div class="w-full h-80 rounded-3xl overflow-clip">
		<Image
			alt="Thumbnail"
			class="w-full h-80"
			src={data.restaurant.res_images[0]}
		/>
	</div>

	<div class="flex flex-col space-y-8">
		<AlertCard>
			<Fa
				icon={faCamera}
				slot="icon"
			/>
			<Title slot="title">Open your camera app</Title>
			<Body
				class="px-8"
				slot="body"
				>You can use the camera app on your phone to scan the QR code provided by the service member
			</Body>
		</AlertCard>

		<Divider />
	</div>
</div>
