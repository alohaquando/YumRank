<!-- src/routes/+layout.svelte -->
<script>
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import RestaurantSwitcher from '$lib/components/navigation/RestaurantSwitcher.svelte';
	import TabBarManagement from '$lib/components/navigation/TabBarManagement.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import bg from '$lib/assets/bg/bg.avif';

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

	let title = 'The Red Cafe';
	let restaurantSrc =
		'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png';
	let userSrc =
		'https://m.media-amazon.com/images/M/MV5BNDM1YjNkZjEtNTllMC00M2M3LTg4OGYtMjYyYTRmMzNjNjRjXkEyXkFqcGdeQXVyNDY5MjMyNTg@._V1_.jpg';
</script>

<svelte:head>
	<title>YumRank</title>
</svelte:head>

<Image
	class="hidden sm:block fixed top-0 bottom-0 left-0 right-0 -z-50 object-cover ring h-screen"
	alt="Background"
	src={bg}
/>
<div class="hidden sm:block bg-red-500/50 fixed top-0 bottom-0 left-0 right-0 -z-40" />
<div class="hidden sm:block bg-black/50 fixed top-0 bottom-0 left-0 right-0 -z-30" />

<div class="sm:w-[40rem] shadow-2xl min-h-screen mx-auto bg-white relative">
	<Header class="sticky top-0 z-50" {userSrc} />
	<RestaurantSwitcher {title} {restaurantSrc} />
	<TabBarManagement />

	<div class=" mx-auto px-6 bg-white">
		<slot />
	</div>

	<!-- Spacing to avoid bottom nav bar-->
	<div class="h-20 bg-white" />
	<NavBar class="fixed bottom-0 w-full sm:w-[40rem]" />
</div>
