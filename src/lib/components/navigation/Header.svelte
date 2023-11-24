<script lang="ts">
	import Logo from '$lib/components/logos/Logo.svelte';
	export let href: string = "/";
	export let type: "default" | "management" = "default"
</script>

<div class="h-14 border-b border-gray-200 flex">

	<div class="container mx-auto flex">
		<Logo {href} {type} />
	</div>
</div>