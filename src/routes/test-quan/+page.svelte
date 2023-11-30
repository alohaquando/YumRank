<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import Review from '$lib/components/reviews/Review.svelte';
	import StatsSummary from '$lib/components/details/StatsSummary.svelte';
	import { faStar as faStarFilled } from '@fortawesome/pro-solid-svg-icons';
	import { faStar } from '@fortawesome/pro-regular-svg-icons';
	import Fa from 'svelte-fa';

	let options = {
		day: { value: 'day', title: 'day' },
		week: { value: 'week', title: 'week' },
		month: { value: 'month', title: 'month' },
		year: { value: 'year', title: 'year' }
	};

</script>

<LargePageTitle>
	Testing page
	<TitleDropdown
		id="time_selected"
		name="time_selected"
		{options}
		slot="dropdown"
		value="week" />
</LargePageTitle>



<div class="flex flex-col space-y-2">
	{#each { length: 15 } as _, i}
		<StatsSummary rank={i + 1}/>

	{/each}
</div>
