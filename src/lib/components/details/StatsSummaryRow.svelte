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

<div class="flex flex-row space-x-2 items-baseline">
	<Fa
		class="w-5"
		{icon}
		slot="icon"
	/>
	<div class="flex-wrap flex space-y-1 items-baseline space-x-2">
		<Title>{title}</Title>
		<Body>{subtitle}</Body>
	</div>
</div>
