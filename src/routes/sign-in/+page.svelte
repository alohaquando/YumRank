<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import SocialButton from '$lib/components/buttons/SocialButton.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import ErrorCard from '$lib/components/cards/FormStatusCard.svelte';

	export let form;
</script>

<LargePageTitle>Welcome back</LargePageTitle>

<div class="flex flex-col space-y-8">
	<!--	TODO: Show error message -->
	{#if form}
		<ErrorCard
			title="Failed to sign in"
			message={form.message}
			failed={form.failed}
		/>
	{/if}
	<form
		action="?/signin"
		method="POST"
	>
		<SocialButton
			name="provider"
			provider="github"
			value="github"
		/>
	</form>

	<Divider />

	<form
		action="?/signin"
		class="flex-col flex space-y-6 items-center"
		method="POST"
	>
		<TextField
			id="email"
			name="email"
			placeholder="Email"
			type="email"
		/>
		<TextField
			id="password"
			name="password"
			placeholder="Password"
			type="password"
		/>
		<Button
			type="submit"
			width="full"
			>Sign in
		</Button>
		<ActionChip
			formaction="?/forgot"
			href="/reset-password"
			>Reset my password
		</ActionChip>
	</form>

	<Divider />

	<div class="flex-col flex space-y-4 items-center">
		<Title>Are you new here?</Title>
		<ActionChip href="/sign-up">Create an account</ActionChip>
	</div>

	<!--	<Divider full />-->

	<!--	<BasicCard>-->
	<!--		<Logo slot="start" type="management" />-->
	<!--		<Body slot="center">Manage your restaurant on YumRank for Restaurant</Body>-->
	<!--		<Button hrefExample="/management/sign-in" slot="end" width="full">Go to management portal</Button>-->
	<!--	</BasicCard>-->
</div>

<!--<form method="POST" action="?/signin">-->
<!--	<input name="email" placeholder="email" type="email" value={form?.data?.email ?? ""}>-->
<!--	<input name="password" placeholder="password" type="password">-->
<!--	<button style="margin-top: 12px;">Login</button>-->
<!--	<button formaction="?/signup" style="margin-top: 12px;">Signup</button>-->
<!--	<button formaction="?/forgot" style="margin-top: 12px;">Reset password</button>-->
<!--</form>-->
<!--<form method="POST" action="?/signin">-->
<!--	<button style="margin-top: 12px;" name="provider" value="github">Login with GitHub</button>-->
<!--</form>-->

<!--{#if form?.message}-->
<!--	<p>{form.message}</p>-->
<!--{/if}-->
<!--{#if form?.error}-->
<!--	<p>{form.error}</p>-->
<!--{/if}-->
