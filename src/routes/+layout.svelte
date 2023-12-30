<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import bg from '$lib/assets/bg/bg.avif';
	import Button from '$lib/components/buttons/Button.svelte';
	import Body from '$lib/components/typography/Body.svelte';

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

	const publicUrl = supabase.storage
		.from('avatars')
		.getPublicUrl(session?.user.user_metadata.avatar_url);

	let title = 'The Red Cafe';
	let restaurantSrc =
		'https://bcassetcdn.com/public/blog/wp-content/uploads/2019/07/18094833/the-red-cafe.png';
	let userSrc =
		'https://m.media-amazon.com/images/M/MV5BNDM1YjNkZjEtNTllMC00M2M3LTg4OGYtMjYyYTRmMzNjNjRjXkEyXkFqcGdeQXVyNDY5MjMyNTg@._V1_.jpg';

	let debug: boolean = true;
	let signIn = data.session;
	let email: string = '';
</script>

<svelte:head>
	<title>YumRank</title>
</svelte:head>

<Image
	alt="Background"
	class="hidden sm:block fixed top-0 bottom-0 left-0 right-0 -z-50 object-cover ring h-screen w-full"
	src={bg}
/>
{#if debug}
	<div class="fixed h-screen w-screen top-0 left-0 p-2">
		<div
			class="space-y-4 w-fit p-4 rounded-2xl items-end justify-center bg-white flex-col flex ml-auto max-w-lg"
		>
			<Image
				class="w-8 h-8 rounded-full"
				src={publicUrl.data.publicUrl}
			/>
			<Body>Signed {signIn ? 'in as \n' + data.session?.user.user_metadata.user_name : 'out'}</Body>
			{#if signIn}
				<Button
					width="full"
					design="tonal">Sign out</Button
				>
			{:else}
				<Button
					width="full"
					design="tonal">Sign in</Button
				>
			{/if}
		</div>
	</div>
{/if}
<div class="hidden sm:block bg-red-500/50 fixed top-0 bottom-0 left-0 right-0 -z-40" />
<div class="hidden sm:block bg-white/80 fixed top-0 bottom-0 left-0 right-0 -z-30" />

<div class="sm:w-[40rem] shadow-2xl min-h-screen mx-auto bg-white relative">
	<Header
		class="sticky top-0 z-50"
		userSrc={session?.user.app_metadata.provider === 'email'
			? publicUrl.data.publicUrl
			: session?.user.user_metadata.avatar_url}
	/>
	<!--	<RestaurantSwitcher {title} {restaurantSrc} />-->
	<!--	<TabBarManagement />-->

	<div class=" mx-auto px-6 bg-white">
		<slot />
	</div>

	<!-- Spacing to avoid bottom nav bar-->
	<div class="h-20 bg-white" />
	<NavBar class="fixed bottom-0 w-full sm:w-[40rem]" />
</div>

<!--<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">-->
<!--	<a href="/">Home</a>-->
<!--	{#if session}-->
<!--		<a href="/app">App</a>-->
<!--		<a href="/admin">Admin</a>-->
<!--		{#if session.user.app_metadata.provider == 'email'}-->
<!--			<img-->
<!--				style="width: 32px; height: 32px; border-radius: 9999px;"-->
<!--				src={publicUrl.data.publicUrl}-->
<!--				alt="person_avatar"-->
<!--			/>-->

<!--		{:else}-->
<!--			<img-->
<!--				style="width: 32px; height: 32px; border-radius: 9999px;"-->
<!--				src={session.user.user_metadata.avatar_url}-->
<!--				alt="person_avatar"-->
<!--			/>-->
<!--		{/if}-->

<!--	{:else}-->
<!--		<a href="/auth">Login</a>-->
<!--	{/if}-->
<!--</nav>-->
