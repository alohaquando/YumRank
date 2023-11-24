<script lang="ts">
	import NavItem from '$lib/components/navigation/NavItem.svelte';

	let customClasses = '';
	export { customClasses as class };
</script>

<div class="h-16 border-t border-gray-200 flex bg-white w-full {customClasses}">
	<div class="container mx-auto px-6 flex ring-amber-600 ring-2 justify-between">


		<div class="flex">
			<NavItem icon="home" href="/" state="active">
				Home
			</NavItem>
			<NavItem icon="globe" href="/">

			</NavItem>
			<NavItem icon="user" href="/">

			</NavItem>
		</div>

		<div class="flex">
			<NavItem href="/">
				Home
			</NavItem>
		</div>
	</div>
</div>