<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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
</script>

<svelte:head>
	<title>YumRank</title>
</svelte:head>

<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
	<a href="/">Home</a>
	{#if session}
		<a href="/app">App</a>
		<a href="/admin">Admin</a>
		{#if session.user.app_metadata.provider == 'email'}
			<img
				style="width: 32px; height: 32px; border-radius: 9999px;"
				src={publicUrl.data.publicUrl}
				alt="person_avatar"
			/>
		
		{:else}
			<img
				style="width: 32px; height: 32px; border-radius: 9999px;"
				src={session.user.user_metadata.avatar_url}
				alt="person_avatar"
			/>
		{/if}
		<form method="POST" action="auth?/signout">
			<button>Logout</button>
		</form>
	{:else}
		<a href="/auth">Login</a>
	{/if}
</nav>

<slot />
