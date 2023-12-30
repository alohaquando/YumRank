<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Fa from 'svelte-fa';
	import { faFaceSmileWink, faHeart, faInfoCircle, faSignOut, faUserCircle } from '@fortawesome/pro-regular-svg-icons';
	import Body from '$lib/components/typography/Body.svelte';
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';

	import SectionTitle from '$lib/components/layouts/SectionTitle.svelte';

	import { href, restaurantLogoSrc, restaurantName, userFullName, userSrc } from '$lib/data/exampleData';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import ListItem from '$lib/components/lists/ListItem.svelte';

	export let data;
</script>

{#if !data.session}
	<div class="flex flex-col ">
		<LargePageTitle>
			<Image class="h-10 w-10 rounded-full" slot="leading">
				<Fa class="opacity-50 text-2xl text-red-500" icon={faFaceSmileWink} />
			</Image>
			<span class="opacity-50">Not signed in</span>
		</LargePageTitle>
		<div class=" flex text-center flex-col space-y-6 py-6">
			<Body class="">Sign in with a YumRank account to check-in to your favorites places!</Body>
			<Button class="w-full" href="/sign-in">Sign in</Button>
		</div>
	</div>
{:else}
	<div class="flex flex-col">
		<LargePageTitle>
			<Image class="h-10 w-10 rounded-full" slot="leading" src={$userSrc}>
			</Image>
			<span class="">{$userFullName}</span>
		</LargePageTitle>

		<div>
			<SectionTitle>
				Managed places
			</SectionTitle>
			<div class="flex flex-col space-y-6">
				{#each { length: 3 } as _, i}
					<TitleItem href="/" trailingMoreIcon={true} title={$restaurantName} src={$restaurantLogoSrc}>

					</TitleItem>
				{/each}
				<!--				<Body class="text-center opacity-50">You are not managing any places</Body>-->
				<Button design="outlined" width="full" href="/me/managed-places">View all</Button>
			</div>
		</div>

		<div class="space-y-2 pt-8">
			<Divider />

			<ListItem href={$href}>
				<Fa icon={faHeart} slot="leading" />
				<Body slot="text">Favorite places</Body>
			</ListItem>

			<Divider />

			<ListItem href={$href}>
				<Fa icon={faUserCircle} slot="leading" />
				<Body slot="text">Account settings</Body>
			</ListItem>

			<form action="?/signout" method="POST">
				<Button class="w-full" type="submit">Sign out</Button>
			</form>
		</div>
	</div>
{/if}


