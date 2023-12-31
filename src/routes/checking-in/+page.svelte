<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';
	import { faCamera, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Headline from '$lib/components/typography/Headline.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import { faSearch } from '@fortawesome/pro-regular-svg-icons';
</script>

<LargePageTitle>Let's check you in</LargePageTitle>

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

	<div class="flex flex-col space-y-4">
		<Headline>Manual check-in</Headline>
		<Body>Search for the place you're in and check-in from there</Body>
		<div class="pt-2">
			<Button
				design="outlined"
				href="/discover/search"
				width="full"
			>
				<Fa
					icon={faSearch}
					slot="icon"
				/>
				Search
			</Button>
		</div>
	</div>
</div>
