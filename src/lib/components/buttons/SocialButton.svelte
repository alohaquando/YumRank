<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	import { faApple, faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
	import type { IconDefinition } from '@fortawesome/sharp-light-svg-icons';
	import Title from '$lib/components/typography/Title.svelte';
	import GoogleG from '$lib/assets/icons/GoogleG.svelte';

	export let provider: 'facebook' | 'google' | 'apple' | 'github';
	export let isNew: boolean = false;
	export let name: string;
	export let value: string;

	let bgClasses: string, providerName: string, icon: IconDefinition, textStyleClasses: string;
	switch (provider) {
		case 'facebook': {
			bgClasses = 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800';
			providerName = 'Facebook';
			icon = faFacebook;
			textStyleClasses = 'text-white';
			break;
		}
		case 'github': {
			bgClasses = 'bg-violet-700 hover:bg-violet-800 active:bg-violet-900';
			providerName = 'GitHub';
			icon = faGithub;
			textStyleClasses = 'text-white';
			break;
		}
		case 'google': {
			bgClasses = 'bg-white border border-gray-200 hover:bg-neutral-200 active:bg-neutral-300';
			providerName = 'Google';
			icon = faGoogle;
			textStyleClasses = 'text-black text-opacity-60';
			break;
		}
		case 'apple': {
			bgClasses = 'bg-black hover:bg-neutral-900 active:bg-neutral-800';
			providerName = 'Apple';
			icon = faApple;
			textStyleClasses = 'text-white';
			break;
		}
	}

	let authenticationTypeText: string;
	if (isNew) {
		authenticationTypeText = 'Sign up with';
	} else {
		authenticationTypeText = 'Continue with';
	}
</script>

<button class="{bgClasses} px-6 h-10 rounded-full w-full justify-start items-center gap-4 flex transition self-stretch"
				{name}
				type="submit"
				{value}
>
	<div class="{textStyleClasses} text-xl w-5 flex justify-center">
		{#if provider === 'google'}
			<GoogleG />
		{:else}
			<Fa {icon} />
		{/if}
	</div>
	<Title class="grow text-center {textStyleClasses}">{authenticationTypeText} {providerName}</Title>
</button>

<!--Example-->
<!--<SocialButton isNew provider="facebook" href="/"/>-->
<!--<SocialButton isNew provider="apple" href="/"/>-->
<!--<SocialButton isNew provider="google" href="/"/>-->
