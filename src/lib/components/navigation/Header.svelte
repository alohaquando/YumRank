<script lang="ts">
	import Logo from '$lib/components/logos/Logo.svelte';
	import Image from '$lib/components/media/Image.svelte';

	export let href: string = '/';
	export let userSrc: string;

	export let type: 'default' | 'management' = 'default';
	let customClasses = '';
	export { customClasses as class };
</script>

<div class="h-14 border-b border-gray-200 flex bg-white w-full {customClasses}">
	<div class="container mx-auto flex items-center justify-between pr-6">
		<Logo {href} {type} />
		<Image class="w-8 h-8 rounded-full ring-1 ring-gray-200" alt="Profile image" src={userSrc} />
	</div>
</div>
