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

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>YumRank</title>
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
	<Header class="sticky top-0 z-50" />

	<div class="container mx-auto bg-white px-6 sm:max-w-[48rem]">
		<slot />
	</div>
	<NavBar
		bind:currentLocation={$page.url.pathname}
		class="fixed bottom-0 left-0 w-full"
	/>
</div>
