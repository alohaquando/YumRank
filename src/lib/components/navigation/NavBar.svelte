<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import NavItem from '$lib/components/navigation/NavItem.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { faUserCheck } from '@fortawesome/pro-solid-svg-icons';
	import { NavDestinations } from '$lib/data/NavDestinations';

	let customClasses = '';
	export { customClasses as class };

	export let currentLocation: string;

	let currentNavDestination: NavDestinations;
	$: if (currentLocation === '/') {
		currentNavDestination = NavDestinations.home;
	} else if (currentLocation.startsWith('/discover')) {
		currentNavDestination = NavDestinations.discover;
	} else if (currentLocation.startsWith('/me')) {
		currentNavDestination = NavDestinations.me;
	}
</script>

<div class="h-16 border-t border-gray-200 flex bg-white {customClasses}">
	<div class="container mx-auto px-6 space-x-3 flex justify-between">
		<div class="flex">
			<NavItem
				active={currentNavDestination === NavDestinations.home}
				destination={NavDestinations.home}
			/>
			<NavItem
				active={currentNavDestination === NavDestinations.discover}
				destination={NavDestinations.discover}
			/>
			<NavItem
				active={currentNavDestination === NavDestinations.me}
				destination={NavDestinations.me}
			/>
		</div>

		<div class="flex items-center">
			<IconButton
				class="!rounded-2xl !h-12 !w-12"
				design="tonal"
			>
				<Fa icon={faUserCheck} />
			</IconButton>
		</div>
	</div>
</div>
