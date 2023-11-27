<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
	import type { IconDefinition } from '@fortawesome/sharp-light-svg-icons';
	import Title from '$lib/components/typography/Title.svelte';
	import GoogleG from '$lib/assets/logos/GoogleG.svelte';

	export let href: string;
	export let provider: 'facebook' | 'google' | 'apple';
	export let isNew: boolean = false;

	let bgClasses: string, providerName: string, icon: IconDefinition, textStyleClasses: string;
	switch (provider) {
		case 'facebook': {
			bgClasses = 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800';
			providerName = 'Facebook';
			icon = faFacebook;
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


<a class="{bgClasses} px-6 h-10 rounded-full justify-start items-center gap-4 flex transition" {href}>
	<div class="{textStyleClasses} text-xl w-5 flex justify-center ">
		{#if provider === 'google'}
			<GoogleG />
		{:else }
			<Fa icon={icon} />
		{/if}
	</div>
	<Title class="grow text-center {textStyleClasses}">{authenticationTypeText} {providerName}</Title>
</a>

<!--Example-->
<!--<SocialButton isNew provider="facebook" href="/"/>-->
<!--<SocialButton isNew provider="apple" href="/"/>-->
<!--<SocialButton isNew provider="google" href="/"/>-->
