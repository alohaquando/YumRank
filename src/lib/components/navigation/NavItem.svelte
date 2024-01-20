<!--suppress JSUnreachableSwitchBranches -->
<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faGlobe, faHome, faUserCircle } from '@fortawesome/pro-regular-svg-icons';
	import {
		faGlobe as faGlobeSolid,
		faHome as faHomeSolid,
		faUserCircle as faUserCircleSolid
	} from '@fortawesome/pro-solid-svg-icons';
	import type { IconDefinition } from '@fortawesome/sharp-light-svg-icons';
	import { NavDestinations } from '$lib/data/NavDestinations';

	export let active: boolean = false;
	export let destination: NavDestinations = NavDestinations.home;

	let chosenIcon: IconDefinition;
	let label: string;
	let href: string;
	$: switch (destination) {
		case NavDestinations.home: {
			active ? (chosenIcon = faHomeSolid) : (chosenIcon = faHome);
			label = 'Home';
			href = '/';
			break;
		}
		case NavDestinations.discover: {
			active ? (chosenIcon = faGlobeSolid) : (chosenIcon = faGlobe);
			label = 'Discover';
			href = '/discover';
			break;
		}
		case NavDestinations.me: {
			active ? (chosenIcon = faUserCircleSolid) : (chosenIcon = faUserCircle);
			label = 'Me';
			href = '/me';
			break;
		}
	}

	let stateClasses: string;
	$: switch (active) {
		case false: {
			stateClasses = 'text-gray-400';
			break;
		}
		case true: {
			stateClasses = 'text-red-500 font-semibold';
			break;
		}
	}
</script>

<a
	class="flex flex-col w-16 justify-center items-center space-y-1 transition {stateClasses}"
	{href}
>
	<div class="text-xl">
		<Fa icon={chosenIcon} />
	</div>
	<p class="text-xs">
		{label}
	</p>
</a>
