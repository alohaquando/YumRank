<script lang="ts">
	import Logo from '$lib/components/logos/Logo.svelte';

	export let href: string = '/';

	export let type: 'default' | 'management' = 'default';
	let customClasses = '';
	export { customClasses as class };
</script>

<div class="h-14 border-b border-gray-200 flex bg-white w-full {customClasses}">
	<div class="container mx-auto flex items-center justify-start pr-6">
		<Logo
			{href}
			{type}
		/>
	</div>
</div>
