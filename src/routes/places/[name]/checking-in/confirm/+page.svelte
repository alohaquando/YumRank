<script lang="ts">
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import PlaceItems from '$lib/components/place/PlaceItems.svelte';
	import Button from '$lib/components/buttons/Button.svelte';

	export let data;
</script>

<LargePageTitle showBackButton>Checking in at</LargePageTitle>

<div class="flex-col flex space-y-4">
	<PlaceItems
		address={data.restaurant.address}
		name={data.restaurant.name}
		src={data.restaurant.logo_url}
	/>

	<div class="w-full h-80 rounded-3xl overflow-clip">
		<Image
			alt="Thumbnail"
			class="w-full h-80"
			src={data.restaurant.res_images[0]}
		/>
	</div>

	<div class="flex-col flex space-y-4 pt-8">
		<Button
			class="w-full"
			href="/places/{data.restaurant.name}/checking-in/leave-review"
			>Continue
		</Button>

		<Button
			class="w-full"
			design="outlined"
			href="/places/{data.restaurant.name}"
		>
			Cancel
		</Button>
	</div>
</div>
