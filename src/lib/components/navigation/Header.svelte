<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Logo from '$lib/components/logos/Logo.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faBell } from '@fortawesome/pro-regular-svg-icons';

	let customClasses = '';
	export { customClasses as class };

	export let notificationButtonOnClick = () => {};
	export let badgeNotificationButton: boolean = true;
</script>

<div class="h-14 border-b border-gray-200 flex bg-white w-full {customClasses}">
	<div class="container mx-auto flex items-center justify-between pr-6">
		<Logo href="/" />
		<div class="relative">
			<IconButton
				design="text"
				on:click={() => {
					notificationButtonOnClick();
				}}
			>
				<Fa
					class="text-lg"
					icon={faBell}
				/>
			</IconButton>
			{#if badgeNotificationButton}
				<div class="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
				<div class="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping" />
			{/if}
		</div>
	</div>
</div>
