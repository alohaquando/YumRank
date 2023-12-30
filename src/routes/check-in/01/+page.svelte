<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import Fa from 'svelte-fa';
	import { faCamera, faSlotMachine, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import Title from '$lib/components/typography/Title.svelte';
</script>

<LargePageTitle>Let's check you in</LargePageTitle>

<div class="mt-4">
	<Body class="text-center opacity-100">
		Please scan the QR code provided to you by the service member
	</Body>
</div>

<div class="flex space-x-4 mt-4">
	<Button width="full">
		<Fa
			icon={faCamera}
			slot="icon"
		/>
		Scan QR code
	</Button>
</div>

<div class="p-5">
	<AlertCard>
		<Fa
			icon={faInfoCircle}
			slot="icon"
		/>
		<Title slot="title">Pro-tip</Title>
		<Body slot="body">You can scan the QR code directly through the camera app as well</Body>
	</AlertCard>
</div>

<div class="mt-4">
	<Divider />
</div>

<div class="mt-4">
	<body>
		<p class="text-center opacity-100">Not sure what to do?</p>
	</body>
	<body>
		<p class="text-center opacity-50">
			A service member should provide a QR code to let you check in.
		</p>
	</body>
	<body>
		<p class="text-center opacity-50">Please let them know!</p>
	</body>
</div>
