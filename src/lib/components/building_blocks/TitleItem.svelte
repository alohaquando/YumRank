<script lang="ts">
	import Title from '$lib/components/typography/Title.svelte';
	import Image from '$lib/components/media/Image.svelte';
	export let title: string | undefined | null = 'Title';
	export let src: string | undefined | null = ' ';

</script>

<div class="flex flex-row space-x-2 items-center">
		<Image class="w-8 h-8 rounded-xl" alt="Logo of {title}" {src} />
	<Title>{title}</Title>
</div>