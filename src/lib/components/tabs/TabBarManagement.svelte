<script>
import LinkChip from '$lib/components/chips/LinkChip.svelte';
import TabBar from '$lib/components/tabs/TabBar.svelte';
</script>

<TabBar>
	<LinkChip width="fit" href="/">
		Today
	</LinkChip>
	<LinkChip width="fit" href="/">
		Posts
	</LinkChip>
	<LinkChip width="fit" href="/">
		Discounts
	</LinkChip>
	<LinkChip width="fit" href="/">
		All check-ins
	</LinkChip>
	<LinkChip width="fit" href="/">
		Settings
	</LinkChip>
</TabBar>