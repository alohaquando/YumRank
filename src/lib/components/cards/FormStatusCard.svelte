<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faCheck, faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import AlertCard from '$lib/components/cards/AlertCard.svelte';

	export let failed = false;
	export let success = false;
	export let title: string | undefined = undefined;
	export let message: string | undefined = undefined;
	let design: 'default' | 'gray' | 'green' | undefined = 'default';

	if (success) {
		design = 'green';
		if (title === undefined) title = 'Success';
		if (message === undefined) message = 'Your action is completed successfully';
	}
	if (failed) {
		if (title === undefined) title = 'Error';
		if (message === undefined) message = 'Something went wrong. Please try again.';
	}
</script>

<AlertCard {design}>
	<Fa
		icon={success ? faCheck : faExclamationCircle}
		slot="icon"
	/>
	<Title slot="title">{title}</Title>
	{#if message}
		<Body slot="body">{message}</Body>
	{/if}
</AlertCard>
