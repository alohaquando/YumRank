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
</script>

<LargePageTitle>Welcome</LargePageTitle>

<div class="flex flex-col space-y-8">
	<SocialButton href="/" provider="google" />

	<Divider />

	<form class="flex-col flex space-y-6 items-center">
		<TextField id="email" name="email" placeholder="Email" type="email" />
		<Button type="submit" width="full">Continue with email</Button>
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
