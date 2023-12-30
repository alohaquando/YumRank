<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import Image from '$lib/components/media/Image.svelte';
	import Headline from '$lib/components/typography/Headline.svelte';
	import Body from '$lib/components/typography/Body.svelte';
	import ActionChip from '$lib/components/chips/ActionChip.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faCheck, faPlus } from '@fortawesome/pro-regular-svg-icons';

	export let restaurantName: string;
	export let restaurantSrc: string;
	export let discountValue: string;
	export let discountCondition: string;
	export let isDiscountSaved: boolean;
	export let restaurantHref: string;
</script>

<div class="relative drop-shadow-sm max-w-xs h-[8.75rem]">
	<svg
		class="-z-10 absolute top-0 bottom-0 left-0 right-0"
		fill="none"
		viewBox="0 0 336 148"
		xmlns="http://www.w3.org/2000/svg"
	>
		<mask
			fill="#fff"
			id="a"
		>
			<path
				clip-rule="evenodd"
				d="M0 18C0 8.059 8.059 0 18 0h300c9.941 0 18 8.059 18 18v35.047c0 1.59-.962 2.998-2.323 3.82C327.878 60.368 324 66.73 324 74c0 7.269 3.878 13.632 9.677 17.133 1.361.822 2.323 2.23 2.323 3.82V130c0 9.941-8.059 18-18 18H18c-9.941 0-18-8.059-18-18V94.953c0-1.59.962-2.998 2.323-3.82C8.123 87.632 12 81.27 12 74c0-7.269-3.878-13.632-9.677-17.133C.963 56.045 0 54.637 0 53.047V18Z"
				fill-rule="evenodd"
			/>
		</mask>
		<path
			clip-rule="evenodd"
			d="M0 18C0 8.059 8.059 0 18 0h300c9.941 0 18 8.059 18 18v35.047c0 1.59-.962 2.998-2.323 3.82C327.878 60.368 324 66.73 324 74c0 7.269 3.878 13.632 9.677 17.133 1.361.822 2.323 2.23 2.323 3.82V130c0 9.941-8.059 18-18 18H18c-9.941 0-18-8.059-18-18V94.953c0-1.59.962-2.998 2.323-3.82C8.123 87.632 12 81.27 12 74c0-7.269-3.878-13.632-9.677-17.133C.963 56.045 0 54.637 0 53.047V18Z"
			fill="#fff"
			fill-rule="evenodd"
		/>
		<path
			d="m2.323 91.133-.517-.856.517.856Zm331.354 0 .517-.856-.517.856Zm0-34.266.517.856-.517-.856ZM18-1C7.507-1-1 7.507-1 18h2C1 8.611 8.611 1 18 1v-2Zm300 0H18v2h300v-2Zm19 19c0-10.493-8.507-19-19-19v2c9.389 0 17 7.611 17 17h2Zm0 35.047V18h-2v35.047h2ZM325 74c0-6.904 3.682-12.95 9.194-16.277l-1.034-1.712C327.073 59.686 323 66.367 323 74h2Zm9.194 16.277C328.682 86.95 325 80.904 325 74h-2c0 7.633 4.073 14.314 10.16 17.99l1.034-1.713ZM337 130V94.953h-2V130h2Zm-19 19c10.493 0 19-8.507 19-19h-2c0 9.389-7.611 17-17 17v2Zm-300 0h300v-2H18v2Zm-19-19c0 10.493 8.507 19 19 19v-2c-9.389 0-17-7.611-17-17h-2Zm0-35.047V130h2V94.953h-2ZM11 74c0 6.904-3.682 12.95-9.194 16.277L2.84 91.99C8.927 88.314 13 81.633 13 74h-2ZM1.806 57.723C7.318 61.05 11 67.096 11 74h2c0-7.633-4.073-14.314-10.16-17.99l-1.034 1.713ZM-1 18v35.047h2V18h-2Zm3.84 38.01C1.714 55.33 1 54.218 1 53.048h-2c0 2.01 1.21 3.712 2.806 4.676L2.84 56.01ZM1 94.954c0-1.17.714-2.284 1.84-2.964l-1.034-1.712C.21 91.241-1 92.944-1 94.953h2Zm332.16-2.964c1.126.68 1.84 1.794 1.84 2.964h2c0-2.01-1.21-3.712-2.806-4.676l-1.034 1.712ZM335 53.047c0 1.17-.714 2.284-1.84 2.964l1.034 1.712c1.596-.964 2.806-2.667 2.806-4.676h-2Z"
			fill="#E5E7EB"
			mask="url(#a)"
		/>
	</svg>

	<div class="py-4 px-6 w-full h-full">
		<div class="w-full h-full flex flex-row divide-x divide-dashed">
			<a
				href={restaurantHref}
				class="w-32 pr-4 flex flex-col space-y-2 items-center justify-center"
			>
				<Image
					class="w-14 h-14 rounded-2xl ring-1 ring-gray-200"
					alt="Logo of {restaurantName}"
					src={restaurantSrc}
				/>
				<Title class="text-center line-clamp-2">{restaurantName}</Title>
			</a>
			<div class=" pl-4 grow flex flex-col space-y-2 justify-between">
				<div class="flex flex-col space-y-2">
					<div class="flex flex-row flex-nowrap space-x-2 items-end">
						<Headline>{discountValue}</Headline>
						<Title>off</Title>
					</div>
					<Body class="opacity-60 !text-sm line-clamp-2">{discountCondition}</Body>
				</div>
				{#if isDiscountSaved}
					<ActionChip design="tonal">
						<Fa
							icon={faCheck}
							slot="icon"
						/>
						Saved
					</ActionChip>
				{:else}
					<ActionChip>
						<Fa
							icon={faPlus}
							slot="icon"
						/>
						Save
					</ActionChip>
				{/if}
			</div>
		</div>
	</div>
</div>
