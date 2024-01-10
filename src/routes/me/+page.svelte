<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import Button from '$lib/components/buttons/Button.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import { faFaceSmileWink, faHeart, faUserCircle } from '@fortawesome/pro-regular-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import SectionTitle from '$lib/components/layouts/SectionTitle.svelte';
	import { hrefExample } from '$lib/data/exampleData';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';
	import Map from '$lib/components/map/Map.svelte';

	export let data;
</script>

<!-- IF not signed in -->
{#if !data.session}
	<div class="flex flex-col">
		<LargePageTitle>
			<Image
				class="h-10 w-10 rounded-full"
				slot="leading"
			>
				<Fa
					class="opacity-50 text-2xl text-red-500"
					icon={faFaceSmileWink}
				/>
			</Image>
			<span class="opacity-50">Not signed in</span>
		</LargePageTitle>
		<div class=" flex text-center flex-col space-y-6 py-6">
			<Body class=""
			>Sign in with a YumRank account to check-in to your favoritesExample places!
			</Body>
			<Button
				class="w-full"
				href="/sign-in"
			>Sign in
			</Button>
		</div>
	</div>
	<!--	IF signed in -->
{:else if data.myProfile}
	<div class="flex flex-col">
		<LargePageTitle>
			<Image
				class="h-10 w-10 rounded-full"
				slot="leading"
				src={data.myProfile.avatar_url}
			/>
			<span class="">{data.myProfile.full_name}</span>
		</LargePageTitle>

		<div>
			<SectionTitle>Check-ins</SectionTitle>
			<div class="flex flex-col space-y-6">
				<Body class="opacity-50 text-center">
				You haven't check-in anywhere yet. <br />
				Check-in to a place to see your it on the map
				</Body>
				<Map />
				<Button
					class="w-full"
					href="/me/map"
				>View my check-ins
				</Button>
				<Divider />
			</div>
		</div>


		<div>
			<SectionTitle>Managed places</SectionTitle>
			<div class="flex flex-col space-y-6">
				{#if data.myPlaces}
					{#each data.myPlaces as place}
						<TitleItem
							href="/places/{place.name}"
							trailingMoreIcon={true}
							title={place.name}
							src={place.logo_url}
						/>
					{/each}
				{:else}
					<Body class="text-center opacity-50">You are not managing any places</Body>
				{/if}
				<Button
					design="outlined"
					width="full"
					href="/me/managed-places"
				>View all
				</Button>
			</div>
		</div>

		<div class="space-y-2 pt-8">
			<Divider />

			<ListItem href="/me/favorite-places">
				<Fa
					icon={faHeart}
					slot="leading"
				/>
				<Body slot="text">Favorite places</Body>
			</ListItem>

			<Divider />

			<ListItem href="/me/account-settings">
				<Fa
					icon={faUserCircle}
					slot="leading"
				/>
				<Body slot="text">Account settings</Body>
			</ListItem>

			<!-- TODO: Confirm dialog -->

			<form
				action="?/signout"
				method="POST"
			>
				<Button
					class="w-full"
					type="submit"
				>Sign out
				</Button>
			</form>
		</div>
	</div>
{/if}
