<!-- src/routes/+layout.svelte -->
<script>
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import RestaurantSwitcher from '$lib/components/navigation/RestaurantSwitcher.svelte';
	import TabBarManagement from '$lib/components/navigation/TabBarManagement.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

<svelte:head>
	<title>YumRank</title>
</svelte:head>

<div class="hidden sm:block bg-mesh fixed top-0 bottom-0 left-0 right-0 -z-50 " />

<div class="hidden sm:block bg-black/50 fixed top-0 bottom-0 left-0 right-0 -z-40 " />

<div class="sm:w-[40rem] shadow-2xl min-h-screen mx-auto bg-white relative  ">
	<Header class="sticky top-0 z-50" />
	<RestaurantSwitcher />
	<TabBarManagement />

	<div class=" mx-auto px-6 bg-white ">
		<slot />
	</div>

	<!-- Spacing to avoid bottom nav bar-->
	<div class="h-20 bg-white" />
	<NavBar class="fixed bottom-0 w-full sm:w-[40rem]" />
</div>

<style>
	.bg-mesh {
      background-color: #ef4444;
      background-image: radial-gradient(at 44% 71%, hsl(346, 89%, 69%) 0, hsla(252, 89%, 69%, 0) 50%),
      radial-gradient(at 19% 0%, hsl(0, 83%, 47%) 0, hsla(305, 90%, 59%, 0) 50%),
      radial-gradient(at 25% 99%, hsl(345, 100%, 68%) 0, hsla(222, 89%, 59%, 0) 50%),
      radial-gradient(at 36% 29%, hsla(108, 87%, 55%, 1) 0, hsla(108, 87%, 55%, 0) 50%),
      radial-gradient(at 28% 47%, hsla(63, 91%, 54%, 1) 0, hsla(63, 91%, 54%, 0) 50%),
      radial-gradient(at 35% 74%, hsla(9, 88%, 62%, 1) 0, hsla(9, 88%, 62%, 0) 50%),
      radial-gradient(at 78% 18%, hsla(349, 92%, 70%, 1) 0, hsla(349, 92%, 70%, 0) 50%);
	}
</style>