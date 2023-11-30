<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Body from '$lib/components/typography/Body.svelte';
	import Title from '$lib/components/typography/Title.svelte';
	import type { IconDefinition } from '@fortawesome/sharp-light-svg-icons';

	export let title: string;
	export let subtitle: string;
	export let icon: IconDefinition;
</script>

<div class="flex flex-row flex-nowrap space-x-2 items-end">
	<Fa icon={icon} slot="icon" class="w-5 "/>
	<Title>{title}</Title>
	<Body>{subtitle}</Body>
</div>