<script lang="ts">
	import LogoIcon from '$lib/assets/icons/LogoIcon.svelte';

	export let type: 'default' | 'management' = 'default';
	export let href: string = '/';
</script>

<a
	data-sveltekit-preload-data="tap"
	class="flex flex-row space-x-2 place-items-center px-6"
	{href}
>
	<LogoIcon class="fill-red-500" />
	<h1 class="text-xl font-sans trim-both text-red-500 flex">
		YumRank
		{#if type === 'management'}
			<h1 class="pl-1.5 text-gray-900">management</h1>
		{/if}
	</h1>
</a>
