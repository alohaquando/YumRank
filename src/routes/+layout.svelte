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
				src={`https://spkuounwjckbvmdirseo.supabase.co/storage/v1/object/sign/avatars/${session.user.user_metadata.avatar_url}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuNTUxNjAxNDE5ODIwNTE4MS5wbmciLCJpYXQiOjE3MDE1MzMzMjIsImV4cCI6MTcwNjcxNzMyMn0.JIKJqv4_R6Y-LESAkZyCJLfbfGicReDlA-2uJqFS9dQ&t=2023-12-02T16%3A08%3A18.309Z`}
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
