<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TitleDropdown from '$lib/components/inputs/TitleDropdown.svelte';
	import Avatar from '../create-account/Avatar.svelte';

	let options = {
		day: { value: 'day', title: 'day' },
		week: { value: 'week', title: 'week' },
		month: { value: 'month', title: 'month' },
		year: { value: 'year', title: 'year' }
	};
</script>

<LargePageTitle>
	Testing page
	<TitleDropdown id="time_selected" name="time_selected" {options} slot="dropdown" value="week" />
</LargePageTitle>

<Avatar
	on:upload={() => {
			}}
	size={10}
/>