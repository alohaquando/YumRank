<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import faviconPNG from '$lib/assets/icons/favicons/favicon.png';
	import faviconSVG from '$lib/assets/icons/favicons/icon.svg';
	import faviconApple from '$lib/assets/icons/favicons/apple-touch-icon.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { faBell, faTimes } from '@fortawesome/pro-regular-svg-icons';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	let notifications: any[] = [];

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		async () => {
			if (data.session) {
				console.log('Fetching notifications');
				const { data: noti, error } = await supabase
					.from('notifications')
					.select('*')
					.eq('sender_id', data.session.user.id);

				if (error) {
					console.error(error);
				} else {
					notifications = noti;
				}
			}
		};

		return () => subscription.unsubscribe();
	});

	let showNotificationsDialog = false;
	let badgeNotificationButton = false;

	let toggleNotificationDialog = () => {
		if (showNotificationsDialog) {
			// Change status to seen
		}
		showNotificationsDialog = !showNotificationsDialog;
	};
</script>

<svelte:head>
	<title
		>{$page.url.pathname.split('/').pop() !== ''
			? $page.url.pathname
					.split('/')
					.pop()
					?.replace(/%20|-/g, ' ')
					.replace(/^\w/, function (match) {
						return match.toUpperCase();
					})
			: 'YumRank'}</title
	>
	<link
		href={faviconPNG}
		rel="icon"
		sizes="32x32"
	/>
	<link
		href={faviconSVG}
		rel="icon"
		type="image/svg+xml"
	/>
	<link
		href={faviconApple}
		rel="apple-touch-icon"
	/>
</svelte:head>

<div class="relative mx-auto min-h-screen bg-white pb-20">
	<!--	TODO: Implement notification badging -->
	<Header
		bind:badgeNotificationButton
		class="sticky top-0 z-50"
		notificationButtonOnClick={toggleNotificationDialog}
	/>
	<div class="container mx-auto bg-white px-6 sm:max-w-[48rem]">
		<slot />
	</div>
	<NavBar
		bind:currentLocation={$page.url.pathname}
		class="fixed bottom-0 left-0 w-full"
	/>
</div>

{#if showNotificationsDialog && data.session}
	<div
		transition:fade={{ duration: 100 }}
		class="fixed top-0 left-0 z-50 h-screen w-screen bg-white ring will-change-transform"
	>
		<div class="container mx-auto px-6 sm:max-w-[48rem] pt-6">
			<IconButton
				design="outlined"
				on:click={toggleNotificationDialog}
				class="order-last md:order-first"
			>
				<Fa icon={faTimes} />
			</IconButton>
			<LargePageTitle>Notifications</LargePageTitle>
			<div class="flex flex-col space-y-4">
				<!-- TODO: Implement notifications -->

				{#each notifications as notification}
					<ListItem
						href="/"
						on:click={toggleNotificationDialog}
					>
						<Fa
							icon={faBell}
							slot="leading"
						/>
						<Body slot="text">{notification.sender_id}</Body>
						<Body slot="trailing">{notification.restaurant_id}</Body>
					</ListItem>
				{/each}
			</div>
		</div>
	</div>
{/if}
