<script>
	import Button from '$lib/components/buttons/Button.svelte';
	// noinspection ES6UnusedImports
	import Fa from 'svelte-fa';
	import { faQrcode } from '@fortawesome/pro-regular-svg-icons';
	import Divider from '$lib/components/layouts/Divider.svelte';
	import Review from '$lib/components/reviews/Review.svelte';
	import Title from '$lib/components/typography/Title.svelte';

	let count = 10;
	let userSrc =
		'https://m.media-amazon.com/images/M/MV5BNDM1YjNkZjEtNTllMC00M2M3LTg4OGYtMjYyYTRmMzNjNjRjXkEyXkFqcGdeQXVyNDY5MjMyNTg@._V1_.jpg';
	let userFullName = 'Lee Ik-joon';
	let time = 'Jul 10';
	let content = "This is the most delicious thing I've ever eaten. I love this restaurant ❤️";
</script>

<div class="flex flex-col space-y-8 pt-8">
	<Button width="full" href="/management/generate-qr">
		<Fa icon={faQrcode} slot="icon" />
		Generate QR code
	</Button>

	<Divider />

	<Title>{count} check-ins today</Title>
	{#each { length: count } as _, i}
		<Review {userSrc} {userFullName} {time} {content} rating={Math.floor(Math.random() * 5) + 1} />
	{/each}
</div>
