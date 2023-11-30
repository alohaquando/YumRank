<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import SocialButton from '$lib/components/buttons/SocialButton.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import BasicCard from '$lib/components/cards/BasicCard.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import Body from '$lib/components/typography/Body.svelte';
</script>

<LargePageTitle>Welcome back</LargePageTitle>

<div class="flex flex-col space-y-8">
	<SocialButton href="/" provider="google" />

	<Divider />

	<form class="flex-col flex space-y-6 items-center">
		<TextField id="email" name="email" placeholder="Email" type="email" />
		<TextField id="password" name="password" placeholder="Password" type="password" />
		<Button type="submit" width="full">Sign in</Button>
		<ActionChip href="/">Reset my passwords</ActionChip>
	</form>

	<Divider />

	<div class="flex-col flex space-y-4 items-center">
		<Title>Are you new here?</Title>
		<ActionChip href="/management/sign-up">Create an account</ActionChip>
	</div>

	<Divider full />

	<BasicCard>
		<Title slot="start">Not on YumRank yet?</Title>
		<Body slot="center">Add your place to YumRank today to get verified customer visits</Body>
		<Button href="/management/register-place" slot="end" width="full">Verify your place now</Button>
	</BasicCard>
</div>
