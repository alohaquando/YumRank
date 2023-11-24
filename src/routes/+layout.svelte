<!-- src/routes/+layout.svelte -->
<script>
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '$lib/components/navigation/Header.svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';

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

<Header class="sticky top-0 z-50" />

<div class="container mx-auto px-6">
	<slot />
</div>

<!-- Spacing to avoid bottom nav bar-->
<div class="h-16"/>

<NavBar class="fixed bottom-0 left-0 z-50"/>