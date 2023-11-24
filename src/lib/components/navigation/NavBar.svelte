<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import NavItem from '$lib/components/navigation/NavItem.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faUserCheck } from '@fortawesome/pro-solid-svg-icons';

	let customClasses = '';
	export { customClasses as class };
</script>

<div class="h-16 border-t border-gray-200 flex bg-white w-full {customClasses}">
	<div class="container mx-auto px-6 space-x-2 flex justify-between">

		<div class="flex">
			<NavItem destination="home" />
			<NavItem destination="discover" />
			<NavItem destination="me" />
		</div>

		<div class="flex items-center">
			<IconButton class="!rounded-2xl !h-12 !w-12" design="tonal">
				<Fa icon={faUserCheck} />
			</IconButton>
		</div>
	</div>
</div>