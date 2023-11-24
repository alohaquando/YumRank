<script lang="ts">
	import { faGlobe, faHome, faUserCircle } from '@fortawesome/pro-regular-svg-icons';
	import Fa from 'svelte-fa';
	import type { IconDefinition } from '@fortawesome/sharp-light-svg-icons';

	export let href: string = '/';
	export let state: 'default' | 'active' = 'default';
	export let icon: 'home' | 'globe' | 'user' = 'home';

	let chosenIcon: IconDefinition;
	switch (icon) {
		case 'home': {
			chosenIcon = faHome;
			break;
		}
		case 'globe': {
			chosenIcon = faGlobe;
			break;
		}
		case 'user': {
			chosenIcon = faUserCircle;
			break;
		}
	}

	let stateClasses: string;
	// noinspection JSUnreachableSwitchBranches
	switch (state) {
		case 'default': {
			stateClasses = 'text-gray-400';
			break;
		}
		case 'active': {
			stateClasses = 'text-red-500 font-semibold';
			break;
		}
	}
</script>

<a {href} class="flex flex-col ring-2 ring-blue-400 w-16 justify-center items-center space-y-1 {stateClasses} ">
	<div class="text-xl">
		<Fa icon={chosenIcon} />
	</div>
	<label class="text-xs">
		<slot />
	</label>
</a>