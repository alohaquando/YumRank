<script lang="ts">
	import Image from '$lib/components/media/Image.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Title from '$lib/components/typography/Title.svelte';

	export let name: string | undefined | null = 'Name';
	export let address: string | undefined | null = 'Address';
	export let src: string | undefined | null;
</script>

<div class="flex flex-nowrap flex-row space-x-4 items-center place-content-between">
	<div class="flex flex-row space-x-2 items-center">
		<Image
			alt={name}
			class="w-16 h-16 rounded-3xl ring-1 ring-gray-200 shrink-0"
			{src}
		/>
		<div class="flex flex-col space-y-1">
			<Title>{name}</Title>
			<Body>{address}</Body>
		</div>
	</div>
</div>
