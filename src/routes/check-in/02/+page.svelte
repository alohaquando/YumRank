<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import PlaceItems from '$lib/components/place/PlaceItems.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
</script>

<LargePageTitle>Checking in at</LargePageTitle>

<div class="flex-col flex space-y-2">
	<PlaceItems
		address="Address"
		name="Wasabi by Morimoto"
		src="https://via.placeholder.com/64x64"
	/>
	<div class="w-full h-80 rounded-2xl overflow-clip">
		<Image
			alt="Thumbnail"
			class="w-full h-80"
			src="https://via.placeholder.com/64x64"
		/>
	</div>
	<div class="mt-4">
		<div class="mt-4">
			<Button
				class="w-full"
				href="/check-in/03"
				>This is correct, continue
			</Button>
		</div>
		<div class="mt-4">
			<Button
				class="w-full"
				design="outlined"
				>Scan again
			</Button>
		</div>
	</div>
</div>
