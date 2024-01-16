<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faStar } from '@fortawesome/pro-solid-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';

	export let rating: number = 0;
	export let thisMarker: HTMLElement;
</script>

<div bind:this={thisMarker} class="w-fit flex items-center flex-col -space-y-0.5 z-10">
	<div class="px-4 w-fit text-white py-3 bg-red-500 rounded-xl space-x-2 flex items-center ">
		<Fa icon={faStar} />
		<Body class="font-medium ">
		{rating}
		</Body>
	</div>
	<div class="w-4
  border-l-[8px] border-l-transparent
  border-t-[8px] border-t-red-500
  border-r-[8px] border-r-transparent" />
</div>