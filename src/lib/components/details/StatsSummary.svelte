<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import { faHeart, faStar, faUserCheck } from '@fortawesome/pro-regular-svg-icons';
	import Rank from '$lib/components/building_blocks/Rank.svelte';
	import StatsSummaryRow from '$lib/components/details/StatsSummaryRow.svelte';

	export let rank: number = 1;
	export let checkIns: number;
	export let favorites: number;
	export let rating: number;

	let rankFlavorText: string;
	if (rank > 0 && rank <= 3) {
		rankFlavorText = 'This is the place to be!';
	} else if (rank > 3 && rank <= 5) {
		rankFlavorText = 'So popular right now!';
	} else if (rank > 5 && rank <= 10) {
		rankFlavorText = 'Come and check it out!';
	} else if (rank > 10) {
		rankFlavorText = 'Could be a worth a visit!';
	}
</script>


<div class="relative drop-shadow-sm w-full py-5 px-6 rounded-2xl border border-gray-200">
	<div class="w-full h-full flex flex-row divide-x divide-dashed">
		<div class="w-36 pr-4 flex flex-col space-y-2 items-center justify-center">
			<Rank rank={rank} />
			<Title class="text-center line-clamp-2">{rankFlavorText}
			</Title>
		</div>
		<div class=" pl-4 grow flex flex-col space-y-4 justify-between py-2">
			<StatsSummaryRow icon={faUserCheck} subtitle="new check-ins" title={checkIns?.toString()} />
			<StatsSummaryRow icon={faHeart} subtitle="new favorites" title={favorites?.toString()} />
			<StatsSummaryRow icon={faStar} subtitle="/ 5" title={rating?.toString()} />
		</div>
	</div>
</div>
