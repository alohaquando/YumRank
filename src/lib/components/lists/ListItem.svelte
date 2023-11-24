<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';

	export let href: string | undefined | null = undefined;
	let customClasses = "";
	export {customClasses as class}
</script>

<svelte:element
	class="flex min-h-[56px] items-center justify-between w-full relative group {href ? '' : '!font-medium'} {customClasses}"
	{href}
	on:click
	role="button"
	tabindex="0"
	this={href ? 'a' : 'button'}>
	<div class="flex items-center space-x-2">
		<slot name="leading" />
		<slot name="text" />
	</div>
	<slot name="trailing">
		{#if href}
			<Fa icon={faChevronRight} class="text-xs" />
		{/if}
	</slot>

	<div class="absolute top-0 bottom-0 -left-4 -right-4 bg-white group-hover:bg-red-50 rounded-full transition -z-10"></div>
</svelte:element>

<!--Example-->
<!--<ListItem class="text-red-500"  on:click={() => {window.alert('hi')}}>-->
<!--	<Fa icon={faInfoCircle} slot="leading" />-->
<!--	<Body slot="text">My account</Body>-->
<!--</ListItem>-->