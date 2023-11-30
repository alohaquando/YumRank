<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faFire } from '@fortawesome/pro-solid-svg-icons';

	export let rank: number;

	let rankStyle: string;
	if (rank > 0 && rank <= 3) {
		rankStyle = 'text-red-500';
	} else if (rank > 3 && rank <= 5) {
		rankStyle = 'text-red-700';
	} else if (rank > 5 && rank <= 10) {
		rankStyle = 'text-red-900';
	} else if (rank > 10) {
		rankStyle = 'text-black/60';
	}
</script>

<div class=" w-[2.625rem] h-12 relative {rankStyle}">
	{#if rank <= 10}
		<Fa class="text-5xl " icon={faFire} />
	{:else}
		<div
			class="absolute bottom-0 rounded-full w-[2.5rem] h-[2.5rem] bg-gray-300 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
		/>
	{/if}
	<div
		class="absolute bottom-1.5 rounded-full w-7 h-7 bg-white left-1/2 transform -translate-x-1/2 flex items-center justify-center"
	>
		<p class="select-none font-semibold text-sm text-center trim-both">{rank}</p>
	</div>
</div>
