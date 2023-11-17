<!-- src/routes/+layout.svelte -->
<script>
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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

<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>