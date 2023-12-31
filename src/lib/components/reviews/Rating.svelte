<script lang="ts">
	import Star from '$lib/components/reviews/Star.svelte';

	export let rating: number | null = null;
	let hoverRating: number | null = null;

	const handleHover = (id: number) => () => {
		hoverRating = id;
	};

	const handleRate = (id: number) => () => {
		rating = id;
	};

	let stars = Array.from({ length: 5 }, (__, i) => i + 1);
</script>

<div class="relative flex space-x-2">
	{#each stars as star (star)}
		<button
			on:mouseover={handleHover(star)}
			on:focus={handleHover(star)}
			on:mouseleave={() => (hoverRating = null)}
			on:click={handleRate(star)}
			class="cursor-pointer"
		>
			<Star
				filled={hoverRating ? hoverRating >= star : rating >= star}
				starId={star}
			/>
		</button>
	{/each}
</div>
