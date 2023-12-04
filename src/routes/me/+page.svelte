<script>
	import Button from '$lib/components/buttons/Button.svelte';
</script>

<div class="flex flex-col space-y-4 pt-4">
	<Button class="w-full" href="/sign-in">Sign in</Button>

	<form action="auth?/signout" method="POST">
		<Button class="w-full" type="submit">Sign out</Button>
	</form>

	<Button class="w-full" href="/sign-in">Sign in - management</Button>
	<Button class="w-full" href="/sign-in">Sign out - management</Button>
</div>

