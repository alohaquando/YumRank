<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import SocialButton from '$lib/components/buttons/SocialButton.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import BasicCard from '$lib/components/cards/BasicCard.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Logo from '$lib/components/logos/Logo.svelte';
	import Body from '$lib/components/typography/Body.svelte';

	export let form;
</script>

<LargePageTitle>Welcome</LargePageTitle>

<div class="flex flex-col space-y-8 items-center">
	<form method="POST" action="?/signup">
		<SocialButton provider="github" name="provider" value="github"/>
	</form>

	<Divider />

	{#if form?.message}
		<p>{form.message}</p>
	{/if}
	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<form class="flex-col flex space-y-6 items-center w-full" method="POST" action="?/signup">
		<TextField id="email" name="email" placeholder="Email" type="email" value={form?.data?.email ?? ""}/>
		<TextField id="password" name="password" placeholder="Password" type="password" />
		<Button type="submit" width="full">Sign up</Button>
	</form>

	<Divider />

	<div class="flex-col flex space-y-4 items-center">
		<Title>Already have an account?</Title>
		<ActionChip href="/sign-in">Sign in</ActionChip>
	</div>

	<Divider full />

	<BasicCard>
		<Logo slot="start" type="management" />
		<Body slot="center">Manage your restaurant on YumRank for Restaurant</Body>
		<Button href="/management/sign-up" slot="end" width="full">Go to management portal</Button>
	</BasicCard>
</div>
