<script lang="ts">
	import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	import Fa from 'svelte-fa';

	export let href: string | undefined | null = undefined;
</script>
<div class="w-full py-6">
	<ActionChip design="text" {href} on:click={() => {history.back()}}>
		<Fa icon={faChevronLeft} slot="icon" />
		Back
	</ActionChip>
</div>