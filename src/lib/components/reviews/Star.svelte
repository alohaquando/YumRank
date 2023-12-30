<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';

	import { faStar } from '@fortawesome/pro-regular-svg-icons';
	import { faStar as faStarFilled } from '@fortawesome/pro-solid-svg-icons';

	export let title: string = 'star';
	export let filled: boolean = false;
	export let starId: number;
</script>

<div class="flex justify-center items-center">
	<Fa
		icon={filled ? faStarFilled : faStar}
		class="w-10 text-center text-red-500 text-4xl font-black"
		on:mouseover
		on:mouseleave
		on:click
		data-starid={starId}
		{title}
	/>
</div>
