<script lang="ts">
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import TitleItem from '$lib/components/building_blocks/TitleItem.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import { faEllipsisV } from '@fortawesome/pro-regular-svg-icons';
	import { faPen, faTrash } from '@fortawesome/pro-solid-svg-icons';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { fade } from 'svelte/transition';

	export let placeSrc: string | undefined | null;
	export let placeName: string | undefined | null;
	export let postHref: string | undefined | null;
	export let postEditHref: string | undefined | null;
	export let postDeleteFormId: string | undefined | null;
	export let imageSrcs: string | string[];
	export let content: string | undefined | null;
	export let timeStamp: string | undefined | null;
	export let showMenuButton: boolean = true;

	let showMenu: boolean = false;
</script>


<div class="flex-col flex space-y-4">
	<div class="relative">
		<TitleItem
			href={postHref}
			src={placeSrc}
			title={placeName}
		>
			{#if showMenuButton}
				<IconButton design="text" on:click={() => {
					showMenu = !showMenu
				}}>
					<Fa
						icon={faEllipsisV}
					/>
				</IconButton>
			{/if}
		</TitleItem>

		{#if showMenu}
			<div
				class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg border border-gray-200 w-44 absolute top-12 right-0"
				id="dropdown"
				transition:fade={{ duration: 50 }}>
				<ul aria-labelledby="dropdownDefaultButton" class="py-2 text-sm text-gray-700 ">
					<li>
						<a class=" px-4 py-4 hover:bg-red-50 transition flex flex-nowrap space-x-2 items-center cursor-pointer"
							 href={postEditHref}>
							<Fa icon={faPen} />
							<Body>Edit</Body>
						</a>
					</li>
					<!--					<li>-->
					<!--						<button-->
					<!--							class="w-full px-4 py-4 hover:bg-red-50 transition flex flex-nowrap space-x-2 items-center text-red-500"-->
					<!--							type="submit"-->
					<!--							form={postEditHref}-->
					<!--						>-->
					<!--							<Fa icon={faTrash} />-->
					<!--							<Body>Delete</Body>-->
					<!--						</button>-->
					<!--					</li>-->
				</ul>
			</div>
		{/if}
	</div>

	<div
		class=" relative flex-none w-full p-0 grid grid-flow-row grid-cols-2 gap-2 {imageSrcs.length > 1 ? 'md:grid-cols-4' : 'md:grid-cols-2'} [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2"
	>
		{#if imageSrcs !== undefined && imageSrcs !== null}
			{#each imageSrcs as src}
				<Image
					alt="Images of {placeName}"
					class="aspect-[2/1] rounded-3xl snap-start snap-always w-auto h-auto"
					{src}
				/>
			{/each}
		{/if}
	</div>

	<div class="flex-col flex space-y-3">
		<Body>{content}</Body>
		<Body class="opacity-50">{timeStamp}</Body>
	</div>
</div>
